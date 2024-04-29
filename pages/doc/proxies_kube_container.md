---
title: Run a Proxy in a Kubernetes Container
keywords:
tags: [proxies]
sidebar: doc_sidebar
permalink: proxies_kube_container.html
summary: Run a Wavefront proxy in a Kubernetes container and customize it.
---
VMware Tanzu Observability (formerly known as VMware Aria Operations for Applications) supports setting up the Wavefront proxy to run [in a Kubernetes container](kubernetes.html#kubernetes-manual-install). However, you cannot rely on a single `wavefront.conf` file. Instead, a ConfigMap file governs deployment.

1. Create a custom ConfigMap file that contains the custom setup, for example preprocessing rules, for your proxy configuration. This doc page creates a `00_proxy-preprocessor-config.yaml` file.
2. Edit `wavefront.yaml` so it points to the ConfigMap file.
3. Test your setup.

## Example: Use a Custom ConfigMap to Include Preprocessor Rules

This section illustrates how to use a custom ConfigMap to block traffic for some metrics via preprocessor rules. You can use the same approach to, for example, have the Wavefront proxy use an HTTPS proxy.

In this section, we first create a custom ConfigMap (`00_proxy-preprocessor-config.yaml`) that includes preprocessor rules to block metrics. Then we customize the `wavefront.yaml` so it points to our Tanzu Observability service instance, includes the proxy authentication, and points to the ConfigMap file.

**1.** Create a file called `00_proxy-preprocessor-config.yaml` with content like the following. This sample file includes some examples of preprocessor rules that block certain metrics.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: proxy-preprocessor-config
  namespace: default
data:
  preprocessor_rules.yaml: |
    # preprocessor rule to drop tag service with empty values
    '2878':
      - rule      : filter-metric-by-name
        action    : block
        if:
          equals:
            scope: metricName
            value: ["illegal.metric"]

      - rule      : filter-metric-by-ip
        action    : block
        if:
          any:
            - startsWith:
                scope: sourceName
                value: "127.0.0."
            - startsWith:
                scope: ip
                value: "127.0.0."
```

**2.** Update your `wavefront.yaml` (your deployment `yaml` for Wavefront proxy).

```yaml
# Change <your_instance> and the values for the proxy authentication parameters depending on your subscription type.

apiVersion: apps/v1
# Kubernetes versions after 1.9.0 should use apps/v1
# Kubernetes version 1.8.x should use apps/v1beta2
# Kubernetes versions before 1.8.0 should use apps/v1beta1
kind: Deployment
metadata:
  labels:
    app: wavefront-proxy
    name: wavefront-proxy
  name: wavefront-proxy
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: wavefront-proxy
  template:
    metadata:
      labels:
        app: wavefront-proxy
    spec:
      containers:
      - name: wavefront-proxy
        image: wavefronthq/proxy:latest
        imagePullPolicy: Always
        env:
        - name: WAVEFRONT_URL
          value: <https://<your_instance>.wavefront.com/api/
        # Uncomment the lines for your subscription type and proxy authentication type.
        # For VMware Cloud services subscriptions and proxy authentication with a server to server OAuth app, uncomment the below lines:
        #- name: CSP_APP_ID
        #  value: <CSP_APP_ID>
        #- name: CSP_APP_SECRET
        #  value: <CSP_APP_SECRET>
        #- name: CSP_ORG_ID
        #  value: <CSP_ORG_ID>
        # For VMware Cloud services subscriptions and proxy authentication with an API token, uncomment the below lines:
        #- name: CSP_API_TOKEN
        #  value: <CSP_API_TOKEN>
        # For original subscriptions:
        #- name: WAVEFRONT_TOKEN
        #  value: <YOUR-API-TOKEN>
        # Uncomment the below lines to consume Zipkin/Istio traces
        #- name: WAVEFRONT_PROXY_ARGS
        #  value: --traceZipkinListenerPorts 9411
        - name: WAVEFRONT_PROXY_ARGS
          value: --preprocessorConfigFile /preprocessor-config/preprocessor_rules.yaml --histogramDistListenerPorts 40000 --traceListenerPorts 2878
        ports:
        - containerPort: 2878
          protocol: TCP
        # Uncomment the below lines to consume Zipkin/Istio traces
        #- containerPort: 9411
        #  protocol: TCP
        - containerPort: 40000
          protocol: TCP
        volumeMounts:
        - name: proxy-preprocessor-config
          mountPath: /preprocessor-config/
          readOnly: true
        securityContext:
          privileged: false
      volumes:
      - name: proxy-preprocessor-config
        configMap:
          name: proxy-preprocessor-config
---
apiVersion: v1
kind: Service
metadata:
  name: wavefront-proxy
  labels:
    app: wavefront-proxy
  namespace: default
spec:
  ports:
  - name: wavefront
    port: 2878
    protocol: TCP
  # Uncomment the below lines to consume Zipkin/Istio traces
  #- name: http
  #  port: 9411
  #  targetPort: 9411
  #  protocol: TCP
  - name: traces
    port: 30000
    protocol: TCP
  - name: histogram
    port: 40000
    protocol: TCP
  selector:
    app: wavefront-proxy
```
**3.** Notice these settings in this `wavefront.yaml` file:

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<pre>
volumes:
- name: proxy-preprocessor-config
  configMap:
    name: proxy-preprocessor-config
</pre>
</td>
<td width="50%" markdown="span">The volumes (coming from the ConfigMap) and volume mounts inside the container that mounts it on as `/preprocessor-config/preprocessor_rules.yaml`</td>
</tr>
<tr>
<td width="50%">
<pre>
- name: WAVEFRONT_PROXY_ARGS
  value: --preprocessorConfigFile /preprocessor-config/preprocessor_rules.yaml
</pre>
</td>
<td width="50%" markdown="span">The `WAVEFRONT_PROXY_ARGS` environment variable sets `--preprocessorConfigFile` to `/preprocessor-config/preprocessor_rules.yaml` to let the proxy know how find the `preprocessor_rules.yaml` file.</td>
</tr>
</tbody>
</table>


**4.** To apply the updated YAML file run `kubectl apply -f`.

## Test Your Setup

To test your setup, look at the log first, then send some data to the proxy.

### Look at the Log

**1.** To get the log of the proxy, run `kubectl logs wavefront-proxy-<id>`

**2.** Check if there are errors during loading of the preprocessor rules. If everything works, you see messages like this:
```
2021-11-16 16:21:20,017 INFO  [PreprocessorConfigManager:loadFromStream] Loaded 2 rules for port :: 2878
2021-11-16 16:21:20,018 INFO  [PreprocessorConfigManager:loadFromStream] Loaded Preprocessor rules for port key :: "2878"
2021-11-16 16:21:20,018 INFO  [PreprocessorConfigManager:loadFromStream] Total Preprocessor rules loaded :: 2
2021-11-16 16:21:20,022 INFO  [proxy:initPreprocessors] Preprocessor configuration loaded from /preprocessor-config/preprocessor_rules.yaml
```

### Send Data to the Proxy

Run an Ubuntu container and send some data to the proxy via the Netcat utility, as follows:

**1.** Create a file named `ubuntu.yaml` and enter the following:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: ubuntu
spec:
  containers:
  - name: ubuntu
    image: ubuntu:latest
    # Just spin & wait forever
    command: [ "/bin/bash", "-c", "--" ]
    args: [ "while true; do sleep 300; done;" ]
```

**2.** Run the following commands to
* Run the Ubuntu container indefinitely
* Install Netcat (`nc`)
* Send metrics to the proxy
(This is a crude approach but fine for testing).

  a. Start:
     ```
     exec
     ```
  b. Get a shell prompt:
     ```
     kubectl exec -it ubuntu /bin/bash
     ```
  c. Install Netcat:
     ```
     apt-get update
     apt-get install -y netcat
     ```
  d. Use a simple command like this to send data into proxy:
     ```
     echo 'test.metric 123 source=test' | nc -C wavefront-proxy 2878
     ```
     The command sends a metric called `test-metric` with source `source-test`.
  e. Test that the preprocessor rule picks up and blocks data:
     ```
     echo 'illegal.metric 234 source=secret' | nc -C wavefront-proxy 2878
     echo 'test.metric 351 source=127.0.0.1' | nc -C wavefront-proxy 2878
     ```


<!---Update me!
## Add the HTTP Proxy CACerts of the Container to the Wavefront Proxy

The HTTP Proxy in the docker container must include CA signed certificates, especially in production environments. You have to add those certificates (PEM files) to the Wavefront proxy as well.

To add the CA certificates:

1. Place all PEM files in one directory.
2. Mount that directory in `/tmp/ca`.
3. Run the following command:
```
docker run -it -e WAVEFRONT_URL=xxxxxxx -e WAVEFRONT_TOKEN=xxxxxx -p 2878:2878 -v /Users/user42/wavefront/ca_certs_test/to_docker:/tmp/ca proxy
```

You have to specify the URL of your instance (e.g. https://example.wavefront.com) and a [Wavefront Token](wavefront_api.html#managing-api-tokens). Creating a service account and using a service account token usually makes sense.
--->

## Learn More!

* KB article: [Configure a Wavefront Proxy Container to Use wavefront.conf](https://vmwaoa.zendesk.com/hc/en-us/articles/21323746500237-Configure-a-VMware-Aria-Operations-for-Applications-Proxy-Container-to-Use-wavefront-conf)
* [Configure Containerized Wavefront Proxy with an HTTPS Proxy](proxies_container.html#configure-a-containerized-wavefront-proxy-with-an-https-proxy) explains CACert setup for a Docker container.
