---
title: Troubleshooting Kubernetes
keywords: containers, kubernetes
tags: [containers, kubernetes]
sidebar: doc_sidebar
permalink: kubernetes_troubleshooting.html
summary: Get help and troubleshooting instructions when you have problems with your Kubernetes setup.  
---

{% include note.html content="This doc page is intended to help you troubleshoot issues only with your Kubernetes Operator for Tanzu Observability setup." %}

For an in depth overview of the Kubernetes integration and how it is deployed, navigate to our [GitHub readme page](https://github.com/wavefrontHQ/wavefront-operator-for-kubernetes#readme). 

{% include note.html content="If you currently use the Helm-managed and installed version of the Wavefront proxy and Wavefront Collector for Kubernetes, see our [legacy troubleshooting page](wf_kubernetes_troubleshooting.html) for instructions on how to troubleshoot your integration." %}


## Not Enough Instances of Tanzu Observability Components

You might see a message containing information that there are not enough instances of the Wavefront components, such as:

* Wavefront proxy
* Wavefront cluster collector
* Wavefront node collector
* Wavefront logging

In such as case, upon initial deployment, allow some time for the integration components to complete installing. This issue is observed more often in more resource-constrained environments, such as `kind` and `minikube`.

If the issue persists, check the logs for more details:

* For the Wavefront proxy logs, run:

  ```
  kubectl logs deployment/wavefront-proxy -n observability-system
  ```
* For the Wavefront node collector logs, run:

  ```
  kubectl logs daemonset/wavefront-node-collector -n observability-system
  ```
* For the Wavefront cluster collector logs, run:
  ```
  kubectl logs deployment/wavefront-cluster-collector -n observability-system
  ```
* For the Wavefront logging logs, run:
  ```
  kubectl logs daemonset/wavefront-logging -n observability-system
  ```
  
## No Data Flowing into Tanzu Observability

If you identify that there is a problem with data flowing into Tanzu Observability, follow the steps below. 

### Step 1: Check the Status of the Wavefront Integration Locally

To verify that the system is healthy, run:
 
 ```
 kubectl get wavefront -n observability-system
 ```
 
 The command returns a result with information, such as:

<table style="width: 100%;">
<tr>
<td width="10%">NAME</td>
<td width="10%">STATUS</td>
<td width="10%">PROXY</td>
<td width="15%">CLUSTER-COLLECTOR</td>
<td width="15%">NODE-COLLECTOR</td>
<td width="10%">LOGGING</td>
<td width="10%">AGE</td>
<td width="20%">MESSAGE</td>
</tr>
<tr>
<td>wavefront</td>
<td>Healthy</td>
<td>Running (1/1)</td>
<td>Running (1/1)</td>
<td>Running (3/3)</td>
<td>Running (3/3)</td>
<td>3h3m</td>
<td>All components are healthy</td>
</tr>
</table>

### Step 2: Verify That the Proxy Is Running

The Wavefront proxy forwards logs, metrics, traces, and spans from all components to Tanzu Observability. If no data is flowing into Tanzu Observability might mean that the proxy is not running.

To check the Wavefront proxy logs for errors, run:

```
kubectl logs deployment/wavefront-proxy -n observability-system  | grep ERROR
```

The most common Wavefront proxy log errors are:

**HTTP 401 Unauthorized**

1. If you see this error, run the following command to get your current API token and confirm that it is correctly configure: 

   ```
   kubectl get secrets wavefront-secret -n observability-system -o json | jq '.data' | cut -d '"' -f 4 | tr -d '{}' | base64 --decode
   ```

2. Follow the resolution steps from [HTTP 401 Unauthorized ERROR Message](proxies_troubleshooting.html#proxy-error-messages).


**Unknown Host or Unable to Check In**

* Without an HTTP Proxy
  
  If you see an error of this type and you don't use an HTTP proxy, verify that you have specified the correct Wavefront URL address in your Wavefront CR:

  ```
  kubectl -n observability-system get wavefront -o=jsonpath='{.items[*].spec.wavefrontUrl}'
  ```
* With an HTTP Proxy
  
  If you see an error of this type and you use an HTTP proxy, follow these steps:
  
  1. Verify that the proxy recognizes your HTTP proxy configuration.

     ```
     kubectl logs deployment/wavefront-proxy -n observability-system | grep proxyHost
     ```
     The value after `--proxyHost` must match what you have configured as the `http-url` in your HTTP proxy secret.
  2. Determine the name of your HTTP proxy secret.
  
      ```
      kubectl -n observability-system get wavefront -o=jsonpath='{.items[*].spec.dataExport.wavefrontProxy.httpProxy.secret}'
      ```
  3. Verify that the secret has the proper keys and values. Check out our example.
  
      ```
      kubectl -n observability-system get secret http-proxy-secret -o=json | jq -r '.data | to_entries[] | "echo \(.key|@sh) $(echo \(.value|@sh) | base64 --decode)"' | xargs -I{} sh -c {}
      
      ```
   4. Check your HTTP proxy logs for warnings and errors.
   
### Step 3: Verify That the Cluster or Node Collector Are Running

Check the logs for errors:

* To see the Wavefront cluster collector logs, run: 
  
  ```
  kubectl logs deployment/wavefront-cluster-collector -n observability-system
  ```
* To see the Wavefront node collector logs, run:

   ```
   kubectl logs daemonset/wavefront-node-collector -n observability-system
   ```


### Step 4: Verify That Logging Is Running

Check the logs for errors.

```
kubectl logs daemonset/wavefront-logging -n observability-system
```
## Missing or Incomplete Data Flowing 

If you experience gaps in data, where you can't see expected metrics or expected metric tags, follow the instructions below. 

**Note**: For the out-of-the box **Kubernetes Control Plane** dashboard, certain managed Kubernetes distributions do not support scraping of all control plane elements. For a detailed look at distribution support, see our [supported metrics page](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/main/docs/metrics.md#control-plane-metrics).

### Check the Status of All System Components

Check the status of the components:

```
kubectl get wavefront -n observability-system
```

 The command returns a result with information, such as:

<table style="width: 100%;">
<tr>
<td width="10%">NAME</td>
<td width="10%">STATUS</td>
<td width="10%">PROXY</td>
<td width="15%">CLUSTER-COLLECTOR</td>
<td width="15%">NODE-COLLECTOR</td>
<td width="10%">LOGGING</td>
<td width="10%">AGE</td>
<td width="20%">MESSAGE</td>
</tr>
<tr>
<td>wavefront</td>
<td>Healthy</td>
<td>Running (1/1)</td>
<td>Running (1/1)</td>
<td>Running (3/3)</td>
<td>Running (3/3)</td>
<td>3h3m</td>
<td>All components are healthy</td>
</tr>
</table>

If the STATUS is Healthy, then all the components are healthy. If the STATUS is Unhealthy, the component that is causing the issue might be not running.

### Check the Proxy Backlog Status

Check whether the Wavefront proxy has backlog issues by following the instructions in our [Proxy Troubleshooting](proxies_troubleshooting.html#proxy-warn-messages) page. If your proxy is having some backlog issues, try to:

* Filter more metrics -- See the [example scenario](https://github.com/wavefrontHQ/wavefront-operator-for-kubernetes/blob/main/deploy/kubernetes/scenarios/wavefront-collector-filtering.yaml) for filtering metrics.
* Increase limits -- Follow the resolution in our [Proxy Troubleshooting](proxies_troubleshooting.html#proxy-warn-messages) page.

### Check Whether Metrics Are Being Dropped

Check the Wavefront proxy logs. 

```
kubectl logs deployment/wavefront-proxy -n observability-system
```

If, in the proxy logs, you see the error `Too many point tags`, try to:

* Drop tags -- Use `tagExclude` to drop tags. See our [example scenario](https://github.com/wavefrontHQ/wavefront-operator-for-kubernetes/blob/main/deploy/kubernetes/scenarios/wavefront-full-config.yaml) for details.


### Check Whether Metrics Are Being Filtered

Check the custom resource configuration to see the metrics that are being filtered. 
```
kubectl describe wavefront -n observability-system
```
If you want to change the metrics being filtered, follow the steps in our [example scenario](https://github.com/wavefrontHQ/wavefront-operator-for-kubernetes/blob/main/deploy/kubernetes/scenarios/wavefront-collector-filtering.yaml).


### Check Whether the Custom Resource Config File Is Configured Correctly

Check the status of Wavefront components.

```
kubectl get wavefront -n observability-system
```

If there are any configuration or validation errors, the MESSAGE column in the results will describe the error.


## Running Workloads Are Not Discovered or Monitored

* Check the **Wavefront Collector Troubleshooting** dashboard in the Kubernetes integration for collection errors. You can use the **Collection Errors per Type** and **Collection Errors per Endpoint** charts to find the sources with metrics that are not being collected.
* See the [example scenario](https://github.com/wavefrontHQ/wavefront-operator-for-kubernetes/blob/main/deploy/kubernetes/scenarios/wavefront-full-config.yaml) for configuring sources for metric collection.
* Check the cluster collector logs to verify that the source was configured so that the metrics can be collected.
  ```
  kubectl logs deployment/wavefront-cluster-collector -n observability-system
  ```
