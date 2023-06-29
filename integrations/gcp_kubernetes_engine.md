---
title: Google Kubernetes Engine Integration
tags: [integrations list]
permalink: gcp_kubernetes_engine.html
summary: Learn about the Google Kubernetes Engine Integration.
---

This page provides an overview of what you can do with the Google Kubernetes Engine integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Google Kubernetes Engine integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Google Kubernetes Engine** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Google Cloud Platform Integration

The Google Cloud Platform integration is full-featured native integration offering agentless data ingestion of GCP metric
data, as well as pre-defined dashboards and alert conditions for certain GCP services.

### Metrics Configuration

Operations for Applications ingests Google Cloud Platform metrics using the v3 Stackdriver Monitoring APIs. For details on the metrics, see the
[metrics documentation](https://cloud.google.com/monitoring/api/metrics).

Metrics originating from Google Cloud Platform are prefixed with `gcp.` within Operations for Applications. Once the integration has
been set up, you can browse the available GCP metrics in the metrics browser.

### Dashboards

<p>Operations for Applications provides Google Cloud Platform dashboards for the following services:</p>

- Google App Engine
- Google BigQuery
- Google Cloud Bigtable
- Google Cloud Billing
- Google Cloud Datastore
- Google Cloud Dataproc
- Google Cloud Functions
- Google Cloud Logging
- Google Cloud Pub/Sub
- Google Cloud Router
- Google Cloud Spanner
- Google Cloud Storage
- Google Cloud VPN
- Google Compute Engine
- Google Container Engine
- Google Firebase
- Google Kubernetes Engine
- Google ML Engine

### Alerts

The Google Cloud Platform integration dashboard contains predefined alert conditions. These conditions are embedded as queries in the dashboard's charts. For example:

{% include image.md src="images/alert_condition.png" width="50" %}

To create the alert, click the **Create Alert** link under the query and configure the [alert properties](https://docs.wavefront.com/alerts_manage.html) (notification targets, condition checking frequency, etc.).


## Google Cloud Platform Integration



### Add a GCP Integration

Adding a Google Cloud Platform (GCP) integration requires establishing a trust relationship between GCP and VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront). Minimum required permissions you need depend on the services that you are using. See [Google Cloud Platform Overview and Permissions](http://docs.wavefront.com/integrations_gcp_overview.html) for details.

The overall process involves the following:

* Creating a service account in Google Cloud
* Giving that account viewer privileges 
* Downloading a JSON private key

To register a Google Cloud Platform integration:

1. In the **Name** text box, enter a meaningful name.
2. In the **JSON key** text box, enter your JSON key to give read-only access to a GCP project.
   **Note**: The JSON key is securely stored and never exposed except for read-only access to the GCP APIs. 
3. (Optional) Select the categories to fetch.
4. (Optional) In the **Metric Allow List** text box, you can add metrics to an allow list by entering a regular expression. 
    
    For example, to monitor all the CPU metrics coming from the Compute Engine, enter <code>^gcp.compute.instance.cpu.*$</code>.
    
   <strong>Note:</strong> Metric names consist of the actual metric name and a suffix (starting with an underscore ("_") or a dot (".")). The suffix represents an aggregation type. In the regular expression, you must use the actual metric names without the aggregation types, such as: <code>count</code>, <code>rate</code>, <code>min</code>, <code>max</code>, <code>sumOfSquaredDeviation</code>, <code>mean</code>, and so on.

   For example, for the Google Cloud Pub/Sub Engine, we collect a number of metrics, and some of them contain a suffix:

   Push request latencies metrics:

    * <code>gcp.pubsub.subscription.push_request_latencies.bucket</code>
    * <code>gcp.pubsub.subscription.push_request_latencies.count</code>
    * <code>gcp.pubsub.subscription.push_request_latencies.mean</code>
    * <code>gcp.pubsub.subscription.push_request_latencies.sumOfSquaredDeviation</code>
   
   Here, the actual metric name is <code>gcp.pubsub.subscription.push_request_latencies</code>, while <code>bucket</code>, <code>count</code>, <code>mean</code>, and <code>sumOfSquaredDeviation</code> are the aggregation types. When you create the regular expression, you must use only <code>gcp.pubsub.subscription.push_request_latencies</code>. For example, <code>^gcp.pubsub.subscription.push_request_latencies$</code>.


   Cumulative count of messages acknowledged by Acknowledge requests, grouped by delivery type:
   
    * <code>gcp.pubsub.subscription.ack_message_count_count</code>
    * <code>gcp.pubsub.subscription.ack_message_count_rate</code>

   Here, the actual metric name is <code>gcp.pubsub.subscription.ack_message_count</code>, while <code>_count</code> and <code>_rate</code> are the aggregation types. When you create the regular expression, you must use only <code>gcp.pubsub.subscription.ack_message_count</code>. For example, <code>^gcp.pubsub.subscription.ack_message_count$</code>.

5. (Optional) In the **Additional Metric Prefixes** text box, enter a comma separated list of additional metrics prefixes. 
   The metrics names that start with these prefixes will be imported in addition to what you have selected as categories.
6. (Optional) Change the **Service Refresh Rate**. The default is `5` minutes.
7. (Optional) Select to enable **Detailed Histogram Metrics**, **Delta Counts**, and **Pricing & Billing** information.
   **Note**: Enabling **Detailed Histogram Metrics** and **Delta Counts** will increase your ingestion rate and costs. 
   
   If you select to enable the **Pricing & Billing** information, you must also provide an API key.

8. Click **Register**.







|Metric Name|Description|
| :--- | :--- |
|gcp.kubernetes.autoscaler.container.cpu.per_replica_recommended_request_cores| The number of CPU cores for the recommended CPU request for a single replica of the workload. | 
|gcp.kubernetes.autoscaler.container.memory.per_replica_recommended_request_bytes| The recommended memory request for a single replica of the workload, in bytes. |
|gcp.kubernetes.container.accelerator.duty_cycle| The percent of time over the past sample period (10s) during which the accelerator was actively processing. |
|gcp.kubernetes.container.accelerator.memory_total| The total accelerator memory in bytes. |
|gcp.kubernetes.container.accelerator.memory_used| The total accelerator memory allocated in bytes. |
|gcp.kubernetes.container.accelerator.request| The number of accelerator devices requested by the container. |
|gcp.kubernetes.container.cpu.core_usage_time| The cumulative CPU usage on all cores used by the container in seconds. |
|gcp.kubernetes.container.cpu.limit_cores| CPU cores limit of the container. |
|gcp.kubernetes.container.cpu.limit_utilization| The fraction of the CPU limit that is currently in use on the instance. This value cannot exceed 1 as usage cannot exceed the limit. |
|gcp.kubernetes.container.cpu.request_cores| The number of CPU cores requested by the container. |
|gcp.kubernetes.container.cpu.request_utilization| The fraction of the requested CPU that is currently in use on the instance. This value can be greater than 1 as usage can exceed the request. |
|gcp.kubernetes.container.ephemeral_storage.limit_bytes| The local ephemeral storage limit in bytes. |
|gcp.kubernetes.container.ephemeral_storage.request_bytes| The local ephemeral storage request in bytes. |
|gcp.kubernetes.container.ephemeral_storage.used_bytes| The local ephemeral storage usage in bytes. |
|gcp.kubernetes.container.memory.limit_bytes| Memory limit of the container in bytes. |
|gcp.kubernetes.container.memory.limit_utilization| The fraction of the memory limit that is currently in use on the instance. |
|gcp.kubernetes.container.memory.page_fault_count| The number of page faults, broken down by type: major and minor. |
|gcp.kubernetes.container.memory.request_bytes| Memory request of the container in bytes. |
|gcp.kubernetes.container.memory.request_utilization| The fraction of the requested memory that is currently in use on the instance. |
|gcp.kubernetes.container.memory.used_bytes| Memory usage in bytes. |
|gcp.kubernetes.container.restart_count| The number of times the container has restarted. |
|gcp.kubernetes.container.uptime| Time in seconds that the container has been running. |
|gcp.kubernetes.node.accelerator.duty_cycle| The percent of time over the past sample period (10s) during which the accelerator was actively processing. |
|gcp.kubernetes.node.accelerator.memory_total| The total accelerator memory in bytes. |
|gcp.kubernetes.node.accelerator.memory_used| The total accelerator memory allocated in bytes. |
|gcp.kubernetes.node.cpu.allocatable_cores| The number of allocatable CPU cores on the node. |
|gcp.kubernetes.node.cpu.allocatable_utilization| The fraction of the allocatable CPU that is currently in use on the instance. |
|gcp.kubernetes.node.cpu.core_usage_time| Cumulative CPU usage on all cores used on the node in seconds. |
|gcp.kubernetes.node.cpu.total_cores| The total number of CPU cores on the node. |
|gcp.kubernetes.node.ephemeral_storage.allocatable_bytes| Local ephemeral storage bytes allocatable on the node. |
|gcp.kubernetes.node.ephemeral_storage.inodes_free| Free number of inodes on local ephemeral storage. |
|gcp.kubernetes.node.ephemeral_storage.inodes_total| The total number of inodes on local ephemeral storage. |
|gcp.kubernetes.node.ephemeral_storage.total_bytes| The total ephemeral storage bytes on the node. |
|gcp.kubernetes.node.ephemeral_storage.used_bytes| Local ephemeral storage bytes used by the node. |
|gcp.kubernetes.node.memory.allocatable_bytes| The cumulative memory bytes used by the node. |
|gcp.kubernetes.node.memory.allocatable_utilization| The fraction of the allocatable memory that is currently in use on the instance. |
|gcp.kubernetes.node.memory.total_bytes| The number of bytes of memory allocatable on the node. |
|gcp.kubernetes.node.memory.used_bytes| The cumulative memory bytes used by the node. |
|gcp.kubernetes.node.network.received_bytes_count| The cumulative number of bytes received by the node over the network. |
|gcp.kubernetes.node.network.sent_bytes_count| The cumulative number of bytes transmitted by the node over the network. |
|gcp.kubernetes.node.pid_limit| The max PID of OS on the node. |
|gcp.kubernetes.node.pid_used| The number of running process in the OS on the node. |
|gcp.kubernetes.node_daemon.cpu.core_usage_time| The cumulative CPU usage on all cores used by the node level system daemon in seconds. |
|gcp.kubernetes.node_daemon.memory.used_bytes| The memory usage by the system daemon in bytes. |
|gcp.kubernetes.pod.ephemeral_storage.used_bytes| The pod ephemeral storage usage in bytes. |
|gcp.kubernetes.pod.network.policy_event_count| The change in the number of network policy events seen in the dataplane. |
|gcp.kubernetes.pod.network.received_bytes_count| The cumulative number of bytes received by the pod over the network. |
|gcp.kubernetes.pod.network.sent_bytes_count| The cumulative number of bytes transmitted by the pod over the network. |
|gcp.kubernetes.pod.volume.total_bytes| The total number of disk bytes available to the pod. |
|gcp.kubernetes.pod.volume.used_bytes| The number of disk bytes used by the pod. |
|gcp.kubernetes.pod.volume.utilization| The fraction of the volume that is currently being used by the instance. |

