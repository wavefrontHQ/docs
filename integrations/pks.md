---
title: Pivotal Container Service Integration
tags: [integrations list]
permalink: pks.html
summary: Learn about the Wavefront Pivotal Container Service Integration.
---
## Pivotal Container Service Integration

Pivotal Container Service (PKS) enables operators to provision, operate, and manage enterprise-grade Kubernetes clusters on Pivotal Cloud Foundry (PCF). This integration uses [Heapster](https://github.com/kubernetes/heapster), a collector agent that runs natively in Kubernetes and [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics), a simple service that listens to the Kubernetes API server and generates metrics. The integration collects detailed metrics about the containers, namespaces, nodes, pods, deployments, services and the cluster itself and sends them to a Wavefront.

This integration explains how to configure PKS monitoring with Wavefront from the PKS tile present in PCF Ops Manager. After you've completed the integration setup, you can use Wavefront to monitor the PKS cluster.

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of **Overview** and **Nodes** section of the dashboard.

{% include image.md src="images/db_overview.png" width="80" %}

## Verify Prerequisites 

PKS integration with Wavefront is supported in PKS versions 1.1 and above. Check the [PKS documentation](https://docs.vmware.com/en/VMware-Pivotal-Container-Service/index.html) for details.

## Get Access to Wavefront

To get started with Wavefront, go to https://www.wavefront.com/ and sign up, or get enabled as a user with your Wavefront instance.

## Configure Wavefront Monitoring for PKS

Use PCF Ops Manager to integrate Wavefront with PKS. You do this by enabling Wavefront monitoring in the PKS tile, providing the Wavefront API location and credentials, and creating errands for alerts. 

1. Log in to PCF Ops Manager.
2. Select the **Pivotal Container Service** tile in Installation Dashboard.
3. In the Settings tab, click **Monitoring**.
4. Select **Yes** to enable **Wavefront Integration**.
5. Enter your Wavefront account information:
   
   **Wavefront URL**				https://YOUR_CLUSTER.wavefront.com/api
   URL of your Wavefront Subscription, such as: https://vmware.wavefront.com/api
   
   **Wavefront Access Token**		`YOUR_API_TOKEN`
   API token for your Wavefront Subscription (get from Wavefront > User Profile > API Access).
   
   **Wavefront Alert Recipient**	`List of Email addresses, Wavefront Target IDs`
   Comma-separated list of e-mail addresses and/or Wavefront target IDs to which triggered alerts will be sent. 

6. Select the **Errands** tab in Ops Manaer.
7. Enable the **Create pre-defined Wavefront alerts** errand and the **Delete pre-defined Wavefront alerts** errand. 
8. Click **Save** to save the Wavefront configuration.
9. Navigate to the Installation dashboard and click **Apply Changes**. 
Wavefront monitoring will be active for any clusters created after you have saved the configuration settings and applied changes. 

{% include image.md src="images/pks-01-monitoring" width="80" %}
{% include image.md src="images/pks-02-errands" width="80" %}

## Predefined Alerts for PKS

Once configured Wavefront provides the following monitoring alerts for PKS.

**Name** | **Severity** | **resolveAfterMin**
---------|--------------|--------------------
Node Memory Usage high | WARN | 10
Node Memory Usage too high | SEVERE | 10
Node CPU Usage high | WARN | 5
Node Memory Usage too high | SEVERE | 5
Node Storage Usage high | WARN | 10
Node Storage Usage too high | SEVERE | 10
Too many Pods crashing | SEVERE | 5
Too many Containers not running | SEVERE | 5
Node unhealthy | SEVERE | 5

## JSON Examples

Node Memory Usage High

```
{
	"name": "node memory usage high",
	"target": "user@example.com",
	"condition": "(ts(pks.heapster.node.memory.usage)-ts(pks.heapster.node.memory.cache)) /ts(pks.heapster.node.memory.node_allocatable) > 0.7",
	"displayExpression": "(ts(pks.heapster.node.memory.usage) – ts(pks.heapster.node.memory.cache)) / ts(pks.heapster.node.memory.node_allocatable)",
	"minutes": 10,
	"resolveAfterMinutes": 10,
	"severity": "WARN"
}
```

Node CPU Usage Too High

```
{
	"name": "node CPU usage too high",
	"target": "user@example.com",
	"condition": "ts(heapster.node.cpu.node_utilization) > 0.9",
	"displayExpression": "ts(heapster.node.cpu.node_utilization)",
	"minutes": 5,
	"resolveAfterMinutes": 5,
	"severity": "SEVERE"  
}
```

## PKS Monitoring Dashboards

Once configured Wavefront provides several dashboards for monitoring PKS.

PKS dashboard home
{% include image.md src="images/pks-03-home" width="80" %}

Nodes
{% include image.md src="images/pks-04-nodes" width="80" %}

Namespaces
{% include image.md src="images/pks-05-namespaces" width="80" %}

Deployments
{% include image.md src="images/pks-06-deployments" width="80" %}

Pods
{% include image.md src="images/pks-07-pods" width="80" %}

Pod Containers
{% include image.md src="images/pks-08-pod-containers" width="80" %}

Services and Replication Sets
{% include image.md src="images/pks-09-services-reps" width="80" %}

## PKS-Wavefront Architecture

Wavefront operates by running a Wavefront proxy pod inside each PKS-created Kubernetes cluster.

{% include image.md src="images/pks-13-proxy" width="80" %}

There are four containers within the Wavefront proxy pod:

{% include image.md src="images/pks-14-arch" width="80" %}

## Troubleshooting PKS-Wavefront Integration

If PKS tile deployment fails at running wavefront-alert-creation errand with "401 Unauthorized," the wavefront-access-token is invalid.

If you receive a no such host/no route to host error, check network connectivity to the internet (wavefront-api-server).

To check API access:

```
curl -s 'https://vmware.wavefront.com/api/v2/source‘ \
-H 'Authorization: Bearer 1d23d456-XXXX-XXXX-XXXX-f123f12b1c21'| jq .
```

If there are no metrics in the Wavefront web UI, possible causes are:
- 401 unauthorized: check wavefront-access-token validity
- Network connectivity to wavefront-api-server 

Check the status of the wavefront-proxy pod:

```
kubectl get pods --all-namespaces
```

{% include image.md src="images/pks-10-tsa" width="80" %}


```
kubectl describe pod wavefront-proxy-pod-name -n kube-system
```

{% include image.md src="images/pks-11-tsb" width="80" %}

Check wavefront-proxy pod logs:

```
kubectl logs wavefront-proxy-pod-name -n kube-system -c wavefront-proxy
kubectl logs wavefront-proxy-pod-name -n kube-system -c heapster
kubectl logs wavefront-proxy-pod-name -n kube-system -c kube-state-metrics
```

{% include image.md src="images/pks-12-tsc" width="80" %}

