---
title: Google Apigee Integration
tags: [integrations list]
permalink: gcp_apigee.html
summary: Learn about the Wavefront Google Apigee Integration.
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

Adding a Google Cloud Platform (GCP) integration requires establishing a trust relationship between GCP and Tanzu Observability by Wavefront. Minimum required permissions you need depend on the services you are using. See [Google Cloud Platform Overview and Permissions](http://docs.wavefront.com/integrations_gcp_overview.html) for details.


The overall process involves the following:

    * Creating a service account
    * Giving that account viewer privileges 
    * Downloading a JSON key

1. In the **Name** text box, enter a meaningful name.
2. In the **JSON key** text box, enter your JSON key to give read-only access to a GCP project.
3. (Optional) Select the categories to fetch.
4. (Optional) In the **Metric Allow List** text box, you can add metrics to an allow list by entering a regular expression. 
5. (Optional) In the **Additional Metric Prefixes** text box, enter a comma separated list of additional metrics prefixes. 
   The metrics names that start with these prefixes will be imported in addition to what you have selected as categories.
6. (Optional) Change the **Service Refresh Rate**. The default is `5` minutes.
7. (Optional) Select to enable **Detailed Histogram Metrics**, **Delta Counts**, and **Pricing and Billing** information.
   
   Note that enabling **Detailed Histogram Metrics** and **Delta Counts** will increase your ingestion rate and costs.

8. Click **Register**.








## Metrics

See [Google Cloud metrics documentation](https://cloud.google.com/monitoring/api/metrics_gcp) for Metrics descriptions.    

|Metric Name|Description|
| :--- | :--- |
|gcp.apigee.proxyv2.request_count| Total number of requests received by the Apigee API proxy.|
|gcp.apigee.proxyv2.response_count| Total number of responses sent by the Apigee API proxy. |
|gcp.apigee.proxyv2.latencies_percentile| Percentile of Apigee proxy response latencies. |
|gcp.apigee.targetv2.request_count| Total number of requests received by the Apigee API proxy target. |
|gcp.apigee.targetv2.response_count| Total number of responses sent by the Apigee API proxy target. |
|gcp.apigee.targetv2.latencies_percentile| Percentile of Apigee proxy target response latencies. |
