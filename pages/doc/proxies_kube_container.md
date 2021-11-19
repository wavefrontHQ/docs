---
title: Run a Proxy in a Kubernetes Container
keywords:
tags: [proxies]
sidebar: doc_sidebar
permalink: proxies_kube_container.html
summary: Configure Wavefront proxy and Telegraf in a Kubernetes container
---
You can set up a proxy to run in a Kubernetes container by following these high-level steps:

1. Get a configmap that contains the preprocessing rule
2. Set up the deployment YAML of Wavefront proxy to mounting the volume and using it to power its preprocessing rule.
3. Test your setup

## Set up the configmap for Wavefront proxy

**1.** Create a file called `00_proxy-preprocessor-config.yaml` with content like the following. This sample file includes some examples for blocking certain metrics.

```
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

**2.** Update your `wavefront.yaml` (your deployment yaml for Wavefront proxy) as follows:

```
# Need to change YOUR_CLUSTER and YOUR_API_TOKEN accordingly

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
          value: <https://<cluster_name>.wavefront.com/api/
        - name: WAVEFRONT_TOKEN
          value: <wavefront_token_goes here>
        # Uncomment the below lines to consume Zipkin/Istio traces
        #- name: WAVEFRONT_PROXY_ARGS
        #  value: --traceZipkinListenerPorts 9411
        - name: WAVEFRONT_PROXY_ARGS
          value: --preprocessorConfigFile /preprocessor-config/preprocessor_rules.yaml --histogramDistListenerPorts 40000 --traceListenerPorts 30000
        ports:
        - containerPort: 2878
          protocol: TCP
        # Uncomment the below lines to consume Zipkin/Istio traces
        #- containerPort: 9411
        #  protocol: TCP
        - containerPort: 30000
          protocol: TCP
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
**3.** Notice these settings:

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
<td width="50%" markdown="span">The volumes (coming from the config map) and volume mounts inside the container that mounts it on as `/preprocessor-config/preprocessor_rules.yaml`</td>
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


**4.** To apply the yaml run `kubectl apply -f`.

## Test Your Setup

To test your setup, look at the log first, then send some data to the proxy.

### Look at the Log

**1.** To get the log of the proxy, run `kubectl logs wavefront-proxy-<id>`

**2.** Check if there are errors during loading preprocessor rules. If everything is working fine, you see messages that looks like this:
```
2021-11-16 16:21:20,017 INFO  [PreprocessorConfigManager:loadFromStream] Loaded 2 rules for port :: 2878
2021-11-16 16:21:20,018 INFO  [PreprocessorConfigManager:loadFromStream] Loaded Preprocessor rules for port key :: "2878"
2021-11-16 16:21:20,018 INFO  [PreprocessorConfigManager:loadFromStream] Total Preprocessor rules loaded :: 2
2021-11-16 16:21:20,022 INFO  [proxy:initPreprocessors] Preprocessor configuration loaded from /preprocessor-config/preprocessor_rules.yaml
```

### Send Data to the Proxy

You can run a simple Ubuntu container and send some data via netcat to the proxy by doing the following.

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

**2.** Run the following commands to run the Ubuntu container indefinitely, install netcat, and send metrics to the proxy. (This is a crude approach but fine for testing).

Start:
```
exec
```

Get a shell prompt:
```
kubectl exec -it ubuntu /bin/bash
```

Get netcat installed and available:
```
apt-get update
apt-get install -y netcat
```

Use a simple command like this to send data into proxy:
```
echo 'test.metric 123 source=test' | nc -C wavefront-proxy 2878
```

The command should produce a metric in your tenant. Now, test that the preprocessor rule picks up and blocks data:
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

You have to specify the URL of your instance (e.g. https://example.wavefront.com) and a [Wavefront Token](wavefront_api.html#generating-an-api-token). Creating a service account and using a service account token usually makes sense.
--->

## Learn More!

* KB article: [Configure a Wavefront Proxy Container to Use wavefront.conf](https://help.wavefront.com/hc/en-us/articles/4409333245460-Configure-a-Wavefront-Proxy-Container-to-Use-wavefront-conf)
* [Configure Wavefront Proxy with an HTTP/HTTPS proxy](proxies_container.html#configure-wavefront-proxy-with-an-https-proxy) explains CACertsetup for a Docker container.
