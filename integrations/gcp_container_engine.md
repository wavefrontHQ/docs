---
title: Google Container Engine Integration
tags: [integrations list]
permalink: gcp_container_engine.html
summary: Learn about the Wavefront Google Container Engine Integration.
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
|gcp.container.container.cpu.reserved_cores| Number of cores of CPU reserved for the container. |
|gcp.container.container.cpu.usage_time| Cumulative CPU usage on all cores in seconds. |
|gcp.container.container.cpu.utilization| The percentage of the allocated CPU that is currently in use on the container.|
|gcp.container.container.disk.bytes_total| Total number of bytes of capacity on the disk identified by label ‘device_name’. |
|gcp.container.container.disk.bytes_used| Total number of bytes used on the disk identified by label ‘device_name’. |
|gcp.container.container.memory.bytes_total| Memory limit of the container in bytes. |
|gcp.container.container.memory.bytes_used|Memory usage in bytes, broken down by type: evictable and non-evictable. |
|gcp.container.container.memory.page_fault_count_rate| Number of page faults, broken down by type: major and minor.|
|gcp.container.container.uptime|Number of seconds since the container started. |

