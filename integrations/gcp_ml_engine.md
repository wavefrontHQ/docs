---
title: Google ML Engine Integration
tags: [integrations list]
permalink: gcp_ml_engine.html
summary: Learn about the Google ML Engine Integration.
---

This page provides an overview of what you can do with the Google ML Engine integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Google ML Engine integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Google ML Engine** tile. 
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
|gcp.ml.prediction.error_count| The cumulative count of prediction errors. |
|gcp.ml.prediction.latencies| The latency of overhead, model, or user type. |
|gcp.ml.prediction.online.accelerator.duty_cycle| The average fraction of time over the past sample period during which the accelerators were actively processing. |
|gcp.ml.prediction.online.accelerator.memory.bytes_used| The amount of accelerator memory allocated by the model replica. |
|gcp.ml.prediction.online.cpu.utilization| The fraction of CPU allocated by the model replica and currently in use. May exceed 100% if the machine type has multiple CPUs. |
|gcp.ml.prediction.online.memory.bytes_used| The amount of memory allocated by the model replica and currently in use. |
|gcp.ml.prediction.online.network.bytes_received| The number of bytes received over the network by the model replica. |
|gcp.ml.prediction.online.network.bytes_sent| The number of bytes sent over the network by the model replica. |
|gcp.ml.prediction.online.replicas| The number of active model replicas. |
|gcp.ml.prediction.online.target_replicas| The aspired number of active model replicas. |
|gcp.ml.prediction.prediction_count| The cumulative count of predictions. |
|gcp.ml.prediction.response_count| The cumulative count of different response codes. |
|gcp.ml.training.accelerator.memory.utilization| The fraction of allocated accelerator memory that is currently in use. |
|gcp.ml.training.accelerator.utilization| The fraction of allocated accelerator that is currently in use. |
|gcp.ml.training.cpu.utilization| The fraction of allocated CPU that is currently in use. |
|gcp.ml.training.memory.utilization| The fraction of allocated memory that is currently in use. |
|gcp.ml.training.network.received_bytes_count| The number of bytes received by the training job over the network. |
|gcp.ml.training.network.sent_bytes_count| The number of bytes sent by the training job over the network. |

