---
title: Monitoring Wavefront
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: wavefront_monitoring.html
summary: Learn how to monitor the health of the Wavefront platform.
---

Wavefront collects many internal metrics to help monitor the health of your Wavefront instance. The [System Usage integration](integrations.html#in-product-integrations) provides the System Usage dashboard that displays many of these internal metrics.

## Wavefront Internal Metrics

Wavefront collects several categories of internal metrics. These categories have the following prefixes:

- `~collector` - metrics processed at the collector gateway to the Wavefront instance.
- `~metric` - total unique sources and metrics.  You can compute the rate of metric creation from each source.
- `~proxy` - metric rate received and sent from each Wavefront proxy, blocked and rejected metric rates, buffer metrics, and JVM stats of the proxy. Also includes counts of metrics affected by the proxy preprocessor.
  {% include note.html content="Proxy metrics historically had the prefix `~agent` and queries support both `~proxy` and `~agent`. Query errors still refer to the `~agent` prefix. For example - `No metrics matching - [~agent.points.*.received]`." %}
- `~wavefront` - set of gauges tracking metrics about your use of Wavefront.

If you have an [AWS integration](integrations_aws_metrics.html), metrics with the following prefix are available:

- `~externalservices` - metric rates, API requests, and events from AWS CloudWatch, AWS CloudTrail, and AWS Metrics+.


## System Usage Dashboard

The System Usage dashboard has several sections - Overall Data Rate, Proxy Health and Troubleshooting, Wavefront Stats, AWS Integration, and Ingest Rate by Source. 

### Overall Data Rate
This section shows the overall point rate being processed by the Wavefront servers.

![overall_section](images/overall_section.png)
  
These charts use the following metrics:

- **Data Ingestion Rate** - `~collector.points.reported`, `~externalservices.cloudwatch.points`, and `~externalservices.ec2.points`, counter metrics the per second rate at which new data points are being ingested into Wavefront. The AWS metrics are broken out in [AWS Integration](#aws-integration-metrics).
- **Data Scan Rate** - `~query.summaries_scanned`, the per second rate at which data points are being queried out of Wavefront through dashboards, alerts, custom charts, or API calls.

### Proxy Health

[Wavefront proxies](proxies_managing.html) emit metrics that you can use to check if your Wavefront proxy is behaving as expected. 

The Proxy Health section is the most used section of the dashboard. The most commonly used internal metrics are the `~proxy.points` counter metrics that measure the data traffic on each port of the proxy. These metrics show the rate at which points are being received at each proxy, the rate at which points are being sent from the proxy to the Wavefront server as well as if there are any queued or blocked points.

- `~proxy.points.*.received` - counter showing the total points being received at the proxy. We can look at this as a per second rate. If you want to look at the overall rate of points received across all the ports you can sum up these series and look at the aggregate rate for a proxy. You can also look at the over all rate across all proxies by summing this up further. 

- `~proxy.points.*.queued` - counter showing the number of points being queued to be sent to Wavefront from the proxy. We can look at this as a per second rate. Queueing happens usually for two reasons:

  - The total point rate being collected at Wavefront has reached the maximum allowed capacity. The Wavefront server is pushing back causing data to buffer at the proxy which in turn causes the proxy to queue points.

  - The proxy has reached the threshold of number of points it can process every batch. The maximum points a proxy  can process and push to Wavefront is determined by two factors:
    - number of cores on the machine on which the proxy is running
    - pushFlushMaxPoints - batch size the proxy sends every second. This value is configurable.
    
    The maximum points a proxy can push (without queueing) each second is
    
    ```
    number of cores * pushFlushMaxPoints
    ``` 
    
    The default [setting](proxies_configuring.html) for `pushFlushMaxPoints` is 40,000. If you are running the proxy on a 4 core machine, the maximum points the proxy can send is 160k per second.
    
- `~proxy.buffer.task-count` - gauge of the amount of data that the proxy currently has queued.
- `~proxy.buffer.points-count` - gauge of the number of points currently in the queue.
- `~proxy.points.*.blocked` - counter of the points being blocked at the proxy. We can look at this as a per second rate. If it is above 0 you can look at the charts in the [Proxy Troubleshooting](#proxy-troubleshooting) section of this dashboard to determine if the metrics contain invalid characters, bad timestamps, or are failing configureable regular expressions. We recommend that you look in `/var/log/wavefront/wavefront-blocked-points.log` file to see a sample of the blocked points.

![proxy_health](images/proxy_health.png)

These `~proxy metrics` describe behavior at the Wavefront proxy:

- `~proxy.buffer.fill-rate` - rate at which the proxy buffer is filling up in bytes/min.
- `~proxy.points.*.received` - rate that points are being received at the proxy.
- `~proxy.buffer.bytes-left` - available space (in bytes) on the proxy.
- `~proxy.build.version` - current version number of the proxy.

They are displayed in a tabular chart:

![proxy_table_chart](images/proxy_table_chart.png)

### Proxy Troubleshooting

This section covers the second-level metrics that give you insight into questions such as - why some points are being blocked, file descriptor usage on the proxy JVM, and how long does it take for points to be pushed from the proxy to Wavefront. The metrics used in this section are:

- `~proxy.limiter.permits-denied` - counter of how many points have been queued due to local proxy settings in wavefront.conf, i.e. the proxy rate limiting itself, not the Wavefront service pushing back.
- `~proxy.point.badchars` - count of points blocked due to an illegal character. 
- `~proxy.point.badtime` - count of points blocked due to the timestamp (ex - older than 1 year).
- `~proxy.validationRegex.*.points-rejected` - The points rejected based on the whitelist/blacklist validation applied (using regex) at the Wavefront proxy.
- `~proxy.jvm.fd_usage` - % of file descriptors in use per proxy. If this reaches close to 100% the proxy may have you should increase the uLimit on your system.
- `~proxy.jvm.garbage-collectors.*.time` - garbage collection (GC) activity on the proxy JVM. Anything larger than 200ms is a GC issue, anything near 1s indicates continuous full GCs in the proxy.
- `~proxy.jvm.memory.heapMax/heapUsed` - memory usage by the proxy process.
- `~proxy.push.*.duration.duration.median` - duration taken by points pushed from the proxy to reach to Wavefront. Can help identify network latency issues. You can also graph other percentiles.
- `~proxy.points.*.received.lag.p99` - p99 difference between the timestamp on a point and the time that the proxy received it. High numbers may indicate back-filling old data, or clock drift in sending systems.
- `~proxy.buffer.queue-time.*` - latency introduced by queueing.

For example, this row from that section shows latency metrics using `~proxy.push.*.duration.duration.median`:

![proxy troubleshooting](images/proxy_troubleshooting.png)

### Wavefront Stats

These charts track the number of Wavefront users during various time windows, number of dashboards and alerts, and information about the types of alerts.

![wavefront metrics](images/wavefront_metrics.png)
 
### AWS Integration

If you have an [AWS integration](integrations_aws_metrics.html) and are ingesting AWS CloudWatch, CloudTrail, and API Metrics+ metrics into Wavefront, this section monitors the count of CloudWatch requests, API requests, the point rate, and events coming in from your integration. 
 
![aws_metric_sections](images/aws_metric_sections.png)

The available metrics are:

- `~externalservices.cloudwatch.api-requests` - number of CloudWatch API requests
- `~externalservices.cloudwatch.points`- number of CloudWatch metrics returned
- `~externalservices.ec2.points` - number of AWS Metrics+ metrics returned
- `~externalservices.cloudtrail.events` - number of CloudTrail events returned
- `~externalservices.cloudwatch-cycle-timer` - time in milliseconds CloudWatch requests take to complete
 
### Ingest Rate by Source

This section gives you insight into the shape of your data. It shows the total number of sources reporting. It also monitors the rate of metrics creation and breaks it down by each source.
 
![point_rate breakdown](images/point_rate_breakdown.png)

The metrics used in this section are:

- `~metric.counter` - number of metrics being collected. It can be broken down by the sources sending the metrics. 

 

