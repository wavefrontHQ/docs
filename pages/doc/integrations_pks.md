---
title: VMware PKS Integration Details
keywords:
tags: [integrations, dashboards]
sidebar: doc_sidebar
permalink: integrations_pks.html
summary: Learn about predefined alerts, code examples, and other PKS details
---
The Wavefront [VMware PKS integration](pks.html) includes an overview and setup instructions.

On this page, we list predefined alerts and give other details about the integration.

## Predefined Alerts for the VMware PKS Integration

The PKS integration provides the following monitoring alerts for PKS. These alerts are predefined, no additional setup is required. You can [create additional alerts](alerts.html#creating-an-alert) from the **Alerts** browser or from charts.

<table>
<tbody>
<thead>
<tr><th width="60%">Name</th><th width="20%">Severity</th><th width="20%">Resolve After (min)</th></tr>
</thead>
<tr>
<td>Node Memory Usage high</td>
<td>WARN</td>
<td>10</td></tr>
<tr>
<td>Node Memory Usage too high</td>
<td>SEVERE</td>
<td>10</td></tr>
<tr>
<td>Node CPU Usage high</td>
<td>WARN</td>
<td>5</td></tr>
<tr>
<td>Node CPU Usage too high</td>
<td>SEVERE</td>
<td>5</td></tr>
<tr>
<td>Node Storage Usage high</td>
<td>WARN</td>
<td>10</td></tr>
<tr>
<td>Node Storage Usage too high</td>
<td>SEVERE</td>
<td>10</td></tr>
<tr>
<td>Too many Pods crashing</td>
<td>SEVERE</td>
<td>5</td></tr>
<tr>
<td>Too many Containers not running</td>
<td>SEVERE</td>
<td>5</td></tr>
<tr>
<td>Node unhealthy</td>
<td>SEVERE</td>
<td>5</td></tr>
</tbody>
</table>

You can [create additional alerts](alerts.html#creating-an-alert) using the Wavefront UI.

## VMware PKS Monitoring Dashboards

Wavefront includes several predefined dashboards for monitoring PKS. You can use these dashboards as is, or [clone and customize them](dashboards_managing.html).

We support dashboards for major functionality including:
* PKS Home dashboard
* Nodes dashboard
* Namespaces dashboard
* Deployments dashboard
* Pods dashbord
* Pod containers dashboard
* Services and Replication Sets dashboard

The screenshots below show some examples. To see the full set of dashboards, sign in your Wavefront instance -- or sign up for a [free trial](http://wavefront.com/sign-up/?utm_source=docs.vmware.com&utm_medium=referral&utm_campaign=docs-front-page){:target="_blank" rel="noopenner noreferrer"}.

**Nodes Dashboard**
![pks nodes](images/pks-04-nodes.png)

**Deployments Dashboard**
![pks namespaces](images/pks-06-deployments.png)

**Pods Dashboard**
![pks pods](images/pks-07-pods.png)

**Pods Containers Dashboard**
![pks containers](images/pks-08-pod-containers.png)

## Architecture

The Wavefront proxy pod includes four containers.
* Heapster monitors your worker kubelets and sends the result to the proxy.
* Telegraf receives metrics about the node, pod, and container status from kube-state-metrics, and sends those metrics to the Wavefront proxy as well.

![pks-arch](images/pks-architecture.png)

Wavefront runs a Wavefront proxy pod inside each PKS-created Kubernetes cluster.

![pks-proxy](images/pks-13-proxy.png)

There are four containers within the Wavefront proxy pod:


## Troubleshooting the VMware PKS Integration

### 401 Unauthorized Error

If PKS tile deployment fails at running the `wavefront-alert-creation` errand with `401 Unauthorized`, the `wavefront-access-token` is invalid.

### No such host/no route to host Error
If you receive a no `such host/no route to host` error, check that the wavefront-api-server can connect to the Internet, as follows:

```
curl -s 'https://vmware.wavefront.com/api/v2/source‘ \
-H 'Authorization: Bearer 1d23d456-XXXX-XXXX-XXXX-f123f12b1c21'| jq .
```
### No Metrics

If you see  no metrics in the Wavefront dashboard, possible causes are:
- 401 unauthorized: check wavefront-access-token validity
- Network connectivity to wavefront-api-server

Check the status of the wavefront-proxy pod:
```
kubectl get pods --all-namespaces
kubectl describe pod wavefront-proxy-pod-name -n kube-system
```

Check wavefront-proxy pod logs:
```
kubectl logs wavefront-proxy-pod-name -n kube-system -c wavefront-proxy
kubectl logs wavefront-proxy-pod-name -n kube-system -c heapster
kubectl logs wavefront-proxy-pod-name -n kube-system -c kube-state-metrics
```
