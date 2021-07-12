---
title: Google Cloud Pub/Sub Integration
tags: [integrations list]
permalink: gcp_pubsub.html
summary: Learn about the Wavefront Google Cloud Pub/Sub Integration.
---
## Google Cloud Platform Integration

The Google Cloud Platform integration is full-featured native integration offering agentless data ingestion of GCP metric
data, as well as pre-defined dashboards and alert conditions for certain GCP services.

### Metrics Configuration

Wavefront ingests Google Cloud Platform metrics using the v3 Stackdriver Monitoring APIs. For details on the metrics, see the
[metrics documentation](https://cloud.google.com/monitoring/api/metrics).

Metrics originating from Google Cloud Platform are prefixed with `gcp.` within Wavefront. Once the integration has
been set up, you can browse the available GCP metrics in the metrics browser.

### Dashboards

<p>Wavefront provides Google Cloud Platform dashboards for the following services:</p>

- Google App Engine
- Google BigQuery
- Google Cloud Billing
- Google Cloud Datastore
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



### Adding a GCP Integration

Adding a Google Cloud Platform (GCP) integration requires establishing a trust relationship between GCP and Wavefront. You do that by creating a service account, giving that account viewer privileges, and downloading a JSON key. Follow the instructions on the left.

### Required Permissions

Minimum required permissions you need depend on the services you are using.

See [Google Cloud Platform Overview and Permissions](http://docs.wavefront.com/integrations_gcp_overview.html) for details.





undefined


## Metrics

See [Google Cloud metrics documentation](https://cloud.google.com/monitoring/api/metrics_gcp) for Metrics descriptions.    

|Metric Name|Description|
| :--- | :--- |
|gcp.pubsub.topic.byte_cost_rate| Cost of operations, measured in bytes. |
|gcp.pubsub.topic.config_updates_count_rate| Cumulative count of configuration changes, grouped by operation type and result. |
|gcp.pubsub.topic.message_sizes.count| Distribution of publish message sizes (in bytes).|
|gcp.pubsub.topic.send_message_operation_count_rate| Cumulative count of publish message operations, grouped by result. |
|gcp.pubsub.topic.send_request_count_rate| Cumulative count of publish requests, grouped by result. |

