---
title: Troubleshooting Kubernetes
keywords: containers, kubernetes
tags: [containers, kubernetes]
sidebar: doc_sidebar
permalink: kubernetes_troubleshooting.html
summary: Get help and troubleshooting instructions when you have problems with your Kubernetes setup.  
---

For an in depth overview of the integration and how it is deployed, navigate to our [GitHub readme page](https://github.com/wavefrontHQ/wavefront-operator-for-kubernetes#readme). 

**Note**: If you currently use the Helm-managed and installed version of the Wavefront proxy and Wavefront Collector for Kubernetes, see our [legacy troubleshooting page](wf_kubernetes_troubleshooting.html) for instructions on how to troubleshoot your integration. 


## No Data Flowing into Tanzu Observability

If you identify that there is a problem with data flowing into Tanzu Observability, follow the steps below. 

### Step 1: Check the Status of the Wavefront Integration Locally

 To verify that the system is healthy, run:
 
 `kubectl get wavefront -n observability-system`
 
 The command returns a result similar to the following example:
 
 ```
 NAME        STATUS    PROXY           CLUSTER-COLLECTOR   NODE-COLLECTOR   LOGGING         AGE    MESSAGE
 wavefront   Healthy   Running (1/1)   Running (1/1)       Running (3/3)    Running (3/3)   3h3m   All components are healthy
```


### Step 2: Verify That the Proxy Is Running

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

* Run `kubectl logs deployment/wavefront-cluster-collector -n observability-system` to see the Wavefront Cluster logs.
* Run `kubectl logs daemonset/wavefront-node-collector -n observability-system` to see the Wavefront Node logs.


### Step 4: Verify That Logging Is Running

Check the logs for errors.

```
kubectl logs daemonset/wavefront-logging -n observability-system
```
## Missing or Incomplete Data Flowing 

If you experience gaps in data, where you can't see expected metrics or expected metric tags, follow the instructions below. 

**Note**: For the out-of-the box **Kubernetes Control Plane** dashboard, certain managed Kubernetes distributions do not support scraping of all control plane elements. For a detailed look at distribution support, see our [supported metrics page](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/main/docs/metrics.md#control-plane-metrics).

### Check the Status of All System Components

Run `kubectl get wavefront -n observability-system` to check the status of the components. 

The command will return a result similar to:

```
NAME        STATUS    PROXY           CLUSTER-COLLECTOR   NODE-COLLECTOR   LOGGING         AGE    MESSAGE
wavefront   Healthy   Running (1/1)   Running (1/1)       Running (3/3)    Running (3/3)   3h3m   All components are healthy
```

If the STATUS is Healthy, then all the components are healthy. If the STATUS is Unhealthy, the component that is causing the issue might not be running.

### Check the Proxy Backlog Status

Check whether the Wavefront proxy has backlog issues by following the instructions in our [Proxy Troubleshooting](https://docs.wavefront.com/proxies_troubleshooting.html#proxy-warn-messages) page. If your proxy is having some backlog issues, try to:

* Filter more metrics -- See the [example scenario](https://github.com/wavefrontHQ/wavefront-operator-for-kubernetes/blob/main/deploy/kubernetes/scenarios/wavefront-collector-filtering.yaml) for filtering metrics.
* Increase limits -- Follow the resolution in our [Proxy Troubleshooting](https://docs.wavefront.com/proxies_troubleshooting.html#proxy-warn-messages) page.

### Check Whether Metrics Are Being Dropped

Check the Wavefront proxy logs. 

```
kubectl logs deployment/wavefront-proxy -n observability-system
```

If, in the proxy logs, you see the error “Too many point tags”, try to:

* Drop tags -- Use `tagExclude` to drop tags. See our [example scenario](https://github.com/wavefrontHQ/wavefront-operator-for-kubernetes/blob/main/deploy/kubernetes/scenarios/wavefront-full-config.yaml) for details.
* Increase limits -- Use the [limitLength](https://docs.wavefront.com/proxies_preprocessor_rules.html#limitlength) proxy preprocessor rule. See our [example scenarios](https://github.com/wavefrontHQ/wavefront-operator-for-kubernetes/blob/main/deploy/kubernetes/scenarios/wavefront-proxy-preprocessor-rules.yaml) on adding proxy preprocessor rules.


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

If the STATUS is Unhealthy, check the Status > Message for any configuration errors.

```
kubectl get wavefront -n observability-system -o=jsonpath='{.items[*].status.message}'
```
