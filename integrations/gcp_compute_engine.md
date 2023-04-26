---
title: Google Compute Engine Integration
tags: [integrations list]
permalink: gcp_compute_engine.html
summary: Learn about the Google Compute Engine Integration.
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
|gcp.compute.firewall.dropped_bytes_count_rate| Delta count of incoming bytes dropped by the firewall. |
|gcp.compute.firewall.dropped_packets_count_rate|Delta count of incoming packets dropped by the firewall.|
|gcp.compute.instance.cpu.reserved_cores|Number of vCPUs reserved on the host of the instance.|
|gcp.compute.instance.cpu.scheduler_wait_time_rate|Wait time is the time a vCPU is ready to run, but unexpectedly not scheduled to run. |
|gcp.compute.instance.cpu.usage_time_rate| Delta vCPU usage for all vCPUs, in vCPU-seconds.|
|gcp.compute.instance.cpu.utilization| Fractional utilization of allocated CPU on this instance. |
|gcp.compute.instance.disk.max_read_bytes_count|Disk's maximum per-second read throughput over a period of time specified by the user.|
|gcp.compute.instance.disk.max_read_ops_count|Disk's maximum per-second read requests count over a period of time specified by the user. |
|gcp.compute.instance.disk.max_write_bytes_count| Disk's maximum per-second write throughput over a period of time specified by the user. |
|gcp.compute.instance.disk.max_write_ops_count| Disk's maximum per-second write requests count over a period of time specified by the user.|
|gcp.compute.instance.disk.read_bytes_count_rate| Delta count of bytes read from disk. Sampled every 60 seconds.|
|gcp.compute.instance.disk.read_ops_count_rate| Delta count of disk read IO operations.|
|gcp.compute.instance.disk.throttled_read_bytes_count_rate| Delta count of bytes in throttled read operations.|
|gcp.compute.instance.disk.throttled_read_ops_count_rate| Delta count of throttled read operations.|
|gcp.compute.instance.disk.throttled_write_bytes_count_rate| Delta count of bytes in throttled write operations.|
|gcp.compute.instance.disk.throttled_write_ops_count_rate| Delta count of throttled write operations.|
|gcp.compute.instance.disk.write_bytes_count_rate| Delta count of bytes written to disk.|
|gcp.compute.instance.disk.write_ops_count_rate| Delta count of disk write IO operations. |
|gcp.compute.instance.integrity.early_boot_validation_status| The validation status of early boot integrity policy.|
|gcp.compute.instance.integrity.late_boot_validation_status| The validation status of late boot integrity policy.|
|gcp.compute.instance.memory.balloon.ram_size| The total amount of memory in the VM. |
|gcp.compute.instance.memory.balloon.ram_used| Memory currently used in the VM.|
|gcp.compute.instance.memory.balloon.swap_in_bytes_count_rate| The amount of memory read into the guest from its own swap space.|
|gcp.compute.instance.memory.balloon.swap_out_bytes_count_rate| The amount of memory written from the guest to its own swap space.|
|gcp.compute.instance.network.received_bytes_count_rate| Delta count of bytes received from the network.|
|gcp.compute.instance.network.received_packets_count_rate| Delta count of packets received from the network. |
|gcp.compute.instance.network.sent_bytes_count_rate| Delta count of bytes sent over the network.|
|gcp.compute.instance.network.sent_packets_count_rate| Delta count of packets sent over the network.|
|gcp.compute.instance.uptime_rate| How long the VM has been running, in seconds.|
|gcp.compute.instance_group.size| The number of VMs in the instance group.|
|gcp.compute.mirroring.dropped_packets_count_rate| Delta count of dropped mirrored packets.|
|gcp.compute.mirroring.mirrored_bytes_count_rate| Delta count of mirrored bytes.|
|gcp.compute.mirroring.mirrored_packets_count_rate| Delta count of mirrored packets.|

