---
title: Pivotal Container Service Integration Details
keywords:
tags: [integrations, dashboards]
sidebar: doc_sidebar
permalink: integrations_pks.html
summary: Learn about predefined alerts, code examples, and other PKS details
---
The Wavefront [Pivotal Container Service integration](pks.html) includes an overview and setup instructions.

On this page, we give some code examples and other details about the integration.

## Predefined Alerts for the PKS Integration

The PKS integration provides the following monitoring alerts for PKS. These alerts are predefined, no additional setup is required.

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

## Architecture

Wavefront runs a Wavefront proxy pod inside each PKS-created Kubernetes cluster.
![pks-proxy](images/pks-13-proxy.png)

There are four containers within the Wavefront proxy pod:
![pks-arch](images/pks-14-arch.png)

## Troubleshooting the PKS Integration

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

## PKS Monitoring Dashboards

Wavefront includes several predefined dashboards for monitoring PKS. You can use these dashboards as is, or [clone and customize them](dashboards_managing.html).

### PKS Home Dashboard
![dashboard home](images/pks-03-home.png)

### Nodes Dashboard
![pks nodes](images/pks-04-nodes.png)

### Namespaces Dashboard
![pks namespaces](images/pks-05-namespaces.png)

### Deployments Dashboard
![pks namespaces](images/pks-06-deployments.png)

### Pods Dashboard
![pks pods](images/pks-07-pods.png)

### Pod Containers Dashboard
![pks pods](images/pks-08-pod-containers.png)

### Services and Replication Sets Dashboard
![pks services](images/pks-09-services-reps.png)
