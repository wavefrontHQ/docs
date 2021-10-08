---
title: Google App Engine Integration
tags: [integrations list]
permalink: gcp_app_engine.html
summary: Learn about the Wavefront Google App Engine Integration.
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







## Metrics

See [Google Cloud metrics documentation](https://cloud.google.com/monitoring/api/metrics_gcp) for Metrics descriptions.    

|Metric Name|Description|
| :--- | :--- |
|gcp.appengine.flex.autoscaler.capacity| Utilization capacity multiplied by number of serving VMs.|
|gcp.appengine.flex.autoscaler.connections.current| Number of current reading and writing connections per App Engine flexible environment instance. Intended to be used for autoscaling. |
|gcp.appengine.flex.autoscaler.current_utilization| The sum of the utilization of a specified metric for all serving VMs. |
|gcp.appengine.flex.autoscaler.server.request_count_count| Request counts for an App Engine flexible environment instance.Intended to be used for autoscaling. |
|gcp.appengine.flex.autoscaler.server.request_count_rate| Request rate for an App Engine flexible environment instance.Intended to be used for autoscaling. |
|gcp.appengine.flex.connections.current| Number of current active connections per App Engine flexible environment version. |
|gcp.appengine.flex.cpu.reserved_cores| Total number of CPU cores allocated to an App Engine flexible environment version.|
|gcp.appengine.flex.cpu.utilization| Fractional utilization of allocated CPU across an AppEngine flexible environment version. Values are typically numbers between 0.0 and 1.0 (but some machine types allow bursting above 1.0). Charts display the values as a percentage between 0% and 100% (or more).|
|gcp.appengine.flex.disk.read_bytes_count_count| Delta count of bytes read from disk across an App Engine flexible environment version.|
|gcp.appengine.flex.disk.read_bytes_count_rate| Rate at which the bytes are read from disk across an App Engine flexible environment version. |
|gcp.appengine.flex.disk.write_bytes_count_count| Delta count of bytes written from disk across an App Engine flexible environment version.  |
|gcp.appengine.flex.disk.write_bytes_count_rate| Rate at which the bytes are written from disk across an App Engine flexible environment version. |
|gcp.appengine.flex.instance.connections.current| Number of current active connections per App Engine flexible environment instance.|
|gcp.appengine.flex.instance.cpu.utilization| Fractional CPU utilization for all cores on a single AppEngine flexible instance. Values are typically numbers between 0.0 and 1.0 for a single core (but might exceed 1.0 in total). Charts display the values as a percentage between 0% and 100% (or more).|
|gcp.appengine.flex.instance.network.received_bytes_count_count| Delta count of incoming network bytes in an App Engine flexible instance.|
|gcp.appengine.flex.instance.network.received_bytes_count_rate| Rate of the incoming network bytes in an App Engine flexible instance.|
|gcp.appengine.flex.instance.network.sent_bytes_count_count| Delta count of outgoing network bytes in an App Engine flexible instance.|
|gcp.appengine.flex.instance.network.sent_bytes_count_rate| Rate of the outgoing network bytes in an App Engine flexible instance.|
|gcp.appengine.flex.network.received_bytes_count_count| Delta count of incoming network bytes across all VMs in an App Engine flexible environment version.|
|gcp.appengine.flex.network.received_bytes_count_rate| Rate of the incoming network bytes across all VMs in an App Engine flexible environment version.|
|gcp.appengine.flex.network.sent_bytes_count_count| Delta count of outgoing network bytes across all VMs in an App Engine flexible environment version.|
|gcp.appengine.flex.network.sent_bytes_count_rate| Rate of the outgoing network bytes across all VMs in an App Engine flexible environment version.|
|gcp.appengine.system.instance_count| Number of instances that exist.|
|gcp.appengine.system.memory.usage| Total memory used by running instances.|

