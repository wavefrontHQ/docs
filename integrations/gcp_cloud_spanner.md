---
title: Google Cloud Spanner Integration
tags: [integrations list]
permalink: gcp_cloud_spanner.html
summary: Learn about the Wavefront Google Cloud Spanner Integration.
---
## Google Cloud Platform Integration

The Google Cloud Platform integration is full-featured native integration offering agentless data ingestion of GCP metric
data, as well as pre-defined dashboards and alert conditions for certain GCP services.

### Metrics Configuration

[[applicationName]] ingests Google Cloud Platform metrics using the v3 Stackdriver Monitoring APIs. For details on the metrics, see the
[metrics documentation](https://cloud.google.com/monitoring/api/metrics).

Metrics originating from Google Cloud Platform are prefixed with `gcp.` within [[applicationName]]. Once the integration has
been set up, you can browse the available GCP metrics in the metrics browser.

### Dashboards

<p>[[applicationName]] provides Google Cloud Platform dashboards for the following services:</p>

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
|gcp.spanner.api.api_request_count| The Cloud Spanner API requests. |
|gcp.spanner.api.received_bytes_count| The uncompressed request bytes received by Cloud Spanner. |
|gcp.spanner.api.request_count| The rate of Cloud Spanner API requests. |
|gcp.spanner.api.request_latencies| The distribution of server request latencies for a database. This includes latency of request processing in Cloud Spanner backends and API layer. It does not include network or reverse-proxy overhead between clients and servers. |
|gcp.spanner.api.sent_bytes_count| The uncompressed response bytes sent by Cloud Spanner. |
|gcp.spanner.instance.backup.used_bytes| The backup storage used in bytes. |
|gcp.spanner.instance.cpu.smoothed_utilization| The 24-hour smoothed utilization of provisioned CPU. |
|gcp.spanner.instance.cpu.utilization| The percent utilization of provisioned CPU. |
|gcp.spanner.instance.cpu.utilization_by_operation_type| The percent utilization of provisioned CPU, by operation type. Currently, it does not include CPU utilization for system tasks. |
|gcp.spanner.instance.cpu.utilization_by_priority| The percent utilization of provisioned CPU, by priority. |
|gcp.spanner.instance.leader_percentage_by_region| The percentage of leaders by cloud region. |
|gcp.spanner.instance.node_count| The total number of nodes. |
|gcp.spanner.instance.processing_units| The total number of processing units. |
|gcp.spanner.instance.session_count| The number of sessions in use. |
|gcp.spanner.instance.storage.limit_bytes| The storage limit for instance in bytes. |
|gcp.spanner.instance.storage.limit_bytes_per_processing_unit| The storage limit per processing unit in bytes. |
|gcp.spanner.instance.storage.used_bytes| The storage used in bytes. |
|gcp.spanner.instance.storage.utilization| The storage used as a fraction of storage limit. |
|gcp.spanner.lock_stat.total.lock_wait_time| The total lock wait time for lock conflicts recorded for the entire database. |
|gcp.spanner.query_count| The count of queries by database name, status, query type, and used optimizer version. |
|gcp.spanner.query_stat.total.bytes_returned_count| The number of data bytes that the queries returned, excluding transmission encoding overhead. |
|gcp.spanner.query_stat.total.cpu_time| The number of seconds of CPU time Cloud Spanner spent on operations to execute the queries. |
|gcp.spanner.query_stat.total.execution_count| The number of times Cloud Spanner saw queries during the interval. |
|gcp.spanner.query_stat.total.failed_execution_count| The number of times queries failed during the interval. |
|gcp.spanner.query_stat.total.query_latencies| The distribution of total length of time, in seconds, for query executions within the database. |
|gcp.spanner.query_stat.total.returned_rows_count| The number of rows that the queries returned. |
|gcp.spanner.query_stat.total.scanned_rows_count| The number of rows that the queries scanned excluding deleted values. |
|gcp.spanner.read_stat.total.bytes_returned_count| The total number of data bytes that the reads returned excluding transmission encoding overhead. |
|gcp.spanner.read_stat.total.client_wait_time| The number of seconds spent waiting due to throttling. |
|gcp.spanner.read_stat.total.cpu_time| The number of seconds of CPU time Cloud Spanner spent execute the reads excluding prefetch CPU and other overhead. |
|gcp.spanner.read_stat.total.execution_count| The number of times Cloud Spanner executed the read shapesduring the interval. |
|gcp.spanner.read_stat.total.leader_refresh_delay| The number of seconds spent coordinating reads across instances in multi-regionconfigurations. |
|gcp.spanner.read_stat.total.locking_delays| The distribution of total time in seconds spent waiting due to locking. |
|gcp.spanner.read_stat.total.returned_rows_count| The number of rows that the reads returned. |
|gcp.spanner.row_deletion_policy.deleted_rows_count| Count of rows deleted by the policy since the last sample. |
|gcp.spanner.row_deletion_policy.processed_watermark_age| The time between now and the read timestamp of the last successful execution. |
|gcp.spanner.row_deletion_policy.undeletable_rows| The number of rows in all tables in the database that can't be deleted. |
|gcp.spanner.transaction_stat.total.bytes_written_count| The number of bytes written by transactions. |
|gcp.spanner.transaction_stat.total.commit_attempt_count| The number of commit attempts for transactions. |
|gcp.spanner.transaction_stat.total.commit_retry_count| The number of commit attempts that are retries from previously aborted transaction attempts. |
|gcp.spanner.transaction_stat.total.participants| The distribution of total number of participants in each commit attempt. |
|gcp.spanner.transaction_stat.total.transaction_latencies| The distribution of total seconds takenfrom the first operation of the transaction to commit or abort. |

