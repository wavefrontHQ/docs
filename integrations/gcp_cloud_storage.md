---
title: Google Cloud Storage Integration
tags: [integrations list]
permalink: gcp_cloud_storage.html
summary: Learn about the Wavefront Google Cloud Storage Integration.
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
- Google Cloud Bigtable
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

Adding a Google Cloud Platform (GCP) integration requires establishing a trust relationship between GCP and Tanzu Observability by Wavefront. Minimum required permissions you need depend on the services that you are using. See [Google Cloud Platform Overview and Permissions](http://docs.wavefront.com/integrations_gcp_overview.html) for details.

The overall process involves the following:

* Creating a service account
* Giving that account viewer privileges 
* Downloading a JSON private key

To register a Google Cloud Platform integration:

1. In the **Name** text box, enter a meaningful name.
2. In the **JSON key** text box, enter your JSON key to give read-only access to a GCP project.
   **Note**: The JSON key is securely stored and never exposed except for read-only access to the GCP APIs. 
3. (Optional) Select the categories to fetch.
4. (Optional) In the **Metric Allow List** text box, you can add metrics to an allow list by entering a regular expression. 
    
    For example, to monitor all the CPU metrics coming from the Compute Engine, enter <code>^gcp.compute.instance.cpu.*$</code>.
    
5. (Optional) In the **Additional Metric Prefixes** text box, enter a comma separated list of additional metrics prefixes. 
   The metrics names that start with these prefixes will be imported in addition to what you have selected as categories.
6. (Optional) Change the **Service Refresh Rate**. The default is `5` minutes.
7. (Optional) Select to enable **Detailed Histogram Metrics**, **Delta Counts**, and **Pricing & Billing** information.
   **Note**: Enabling **Detailed Histogram Metrics** and **Delta Counts** will increase your ingestion rate and costs. 
   
   If you select to enable the **Pricing & Billing** information, you must also provide an API key.

8. Click **Register**.








|Metric Name|Description|
| :--- | :--- |
|gcp.storage.api.request_count_rate| Delta count of API calls, grouped by the API method name and response code.|
|gcp.storage.authn.authentication_count_rate| Count of HMAC/RSA signed requests grouped by authentication method and access ID.|
|gcp.storage.authz.acl_based_object_access_count_rate| Delta count of requests that result in an object being granted access solely due to object ACLs.|
|gcp.storage.authz.acl_operations_count_rate| Usage of ACL operations broken down by type.|
|gcp.storage.authz.object_specific_acl_mutation_count_rate| Delta count of changes made to object specific ACLs.|
|gcp.storage.network.received_bytes_count_rate| Delta count of bytes received over the network, grouped by the API method name and response code. |
|gcp.storage.network.sent_bytes_count_rate| Delta count of bytes sent over the network, grouped by the API method name and response code.|
|gcp.storage.storage.object_count| Total number of objects per bucket, grouped by storage class.|
|gcp.storage.storage.total_byte_seconds| Total daily storage in byte*seconds used by the bucket, grouped by storage class.|
|gcp.storage.storage.total_bytes| Total size of all objects in the bucket, grouped by storage class.|

