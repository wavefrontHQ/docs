---
title: Google Cloud Bigtable Integration
tags: [integrations list]
permalink: gcp_bigtable.html
summary: Learn about the Google Cloud Bigtable Integration.
---
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
|gcp.bigtable.backup.bytes_used| Backup storage used in bytes.|
|gcp.bigtable.cluster.cluster.autoscaling.max_node_count| Maximum number of nodes in an autoscaled cluster.|
|gcp.bigtable.cluster.cluster.autoscaling.min_node_count| Minimum number of nodes in an autoscaled cluster.|
|gcp.bigtable.cluster.cluster.autoscaling.recommended_node_count_for_cpu| Recommended number of nodes in an autoscaled cluster based on CPU usage.|
|gcp.bigtable.cluster.cluster.autoscaling.recommended_node_count_for_storage| Recommended number of nodes in an autoscaled cluster based on storage usage.|
|gcp.bigtable.cluster.cpu_load| CPU load of a cluster.|
|gcp.bigtable.cluster.cpu_load_by_app_profile_by_method_by_table| CPU load of a cluster split by app profile, method, and table.|
|gcp.bigtable.cluster.cpu_load_hottest_node| CPU load of the busiest node in a cluster.|
|gcp.bigtable.cluster.disk_load| Utilization of the HDD disks in a cluster.|
|gcp.bigtable.cluster.node_count| Number of nodes in a cluster.|
|gcp.bigtable.cluster.storage_utilization| Storage used as a fraction of the total storage capacity.|
|gcp.bigtable.disk.bytes_used| Amount of compressed data for tables stored in a cluster.|
|gcp.bigtable.disk.per_node_storage_capacity| Capacity of compressed data for tables that can be stored per node in the cluster.|
|gcp.bigtable.disk.storage_capacity| Capacity of compressed data for tables that can be stored in a cluster.|
|gcp.bigtable.replication.latency| Distribution of replication request latencies for a table. Includes only requests that have been received by the destination cluster.|
|gcp.bigtable.replication.max_delay| Upper bound for replication delay between clusters of a table.|
|gcp.bigtable.server.error_count| Number of server requests for a table that failed with an error.|
|gcp.bigtable.server.latencies| Distribution of server request latencies for a table, measured when calls reach Cloud Bigtable.|
|gcp.bigtable.server.modified_rows_count| Number of rows modified by server requests for a table.|
|gcp.bigtable.server.multi_cluster_failovers_count| Number of failovers during multi-cluster requests.|
|gcp.bigtable.server.received_bytes_count| Number of uncompressed bytes of request data received by servers for a table.|
|gcp.bigtable.server.request_count| Number of server requests for a table.|
|gcp.bigtable.server.returned_rows_count| Number of rows returned by server requests for a table.|
|gcp.bigtable.server.sent_bytes_count| Number of uncompressed bytes of response data sent by servers for a table.|
|gcp.bigtable.table.bytes_used| Amount of compressed data stored in a table.|

