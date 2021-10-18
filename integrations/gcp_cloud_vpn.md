---
title: Google Cloud VPN Integration
tags: [integrations list]
permalink: gcp_cloud_vpn.html
summary: Learn about the Wavefront Google Cloud VPN Integration.
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



### Add a GCP Integration

Adding a Google Cloud Platform (GCP) integration requires establishing a trust relationship between GCP and Wavefront. You do that by creating a service account, giving that account viewer privileges, and downloading a JSON key. Click **How to get the JSON key** and follow the instructions on the left.

**Required Permissions**

Minimum required permissions you need depend on the services you are using.

See [Google Cloud Platform Overview and Permissions](http://docs.wavefront.com/integrations_gcp_overview.html) for details.





undefined


## Metrics

See [Google Cloud metrics documentation](https://cloud.google.com/monitoring/api/metrics_gcp) for Metrics descriptions.  

|Metric Name|Description|
| :--- | :--- |
|gcp.vpn.network.dropped_received_packets_count_count| Ingress (received from peer VPN) packets dropped for tunnel. |
|gcp.vpn.network.dropped_received_packets_count_rate| Rate at which the ingress (received from peer VPN) packets were dropped for tunnel. |
|gcp.vpn.network.dropped_sent_packets_count_count| Egress (directed to peer VPN) packets dropped for tunnel. |
|gcp.vpn.network.dropped_sent_packets_count_rate| Rate at which the Egress (directed to peer VPN) packets were dropped for tunnel. |
|gcp.vpn.network.received_bytes_count_count| Ingress (received from peer VPN) bytes for tunnel. |
|gcp.vpn.network.received_bytes_count_rate| Rate at which Ingress (received from peer VPN) bytes for tunnel. |
|gcp.vpn.network.received_packets_count_count| Ingress (received from peer VPN) packets for tunnel. |
|gcp.vpn.network.received_packets_count_rate| Rate at which Ingress (received from peer VPN) packets for tunnel. |
|gcp.vpn.network.sent_bytes_count_count| Egress (directed to peer VPN) bytes for tunnel.|
|gcp.vpn.network.sent_bytes_count_rate| Rate at which Egress (directed to peer VPN) bytes for tunnel.|
|gcp.vpn.network.sent_packets_count_count| Egress (directed to peer VPN) packets for tunnel. |
|gcp.vpn.network.sent_packets_count_rate| Rate at which Egress (directed to peer VPN) packets for tunnel. |
|gcp.vpn.tunnel_established| Indicates successful tunnel establishment if > 0. |

