---
title: Monitor Wavefront Proxies
tags: [administration, proxies]
sidebar: doc_sidebar
permalink: monitoring_proxies.html
summary: Learn how to monitor Wavefront proxies.
---
Tanzu Observability by Wavefront supports monitoring of your [Wavefront proxies](proxies.html).
* On the Proxies Browser, you can explore a detailed list of all your proxies.
* On the out-of-the-box dashboards that are based on [proxy internal metrics](#proxy-internal-metrics), you can examine the health and the usage of your proxies.

## Explore Your Proxies with the Proxies Browser

On the Proxies Browser, you can examine the status and the details of each proxy in your Tanzu Observability service instance.

A proxy status can be:
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Status</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td><strong>Active</strong></td>
<td>The proxy is running and sending data.</td></tr>
<tr>
<td><strong>Orphaned</strong></td>
<td>The proxy stopped sending data. Either the sources stopped sending data to the proxy or the token has been revoked.</td>
</tr>
<tr>
<td><strong>Stopped by Server</strong></td>
<td>The Tanzu Observability subscription has ended for the customer.</td>
</tr>
<tr>
<td><strong>Token Expired</strong></td>
<td>The token has expired. Depending on the proxy configuration, the proxy might still be running and sending data.</td>
</tr>
</tbody>
</table>

Select **Browser > Proxies** to display the Proxies Browser.

![An annotated screenshot of the Proxies Browser. The annotations are listed below.](images/proxies_browser.png)

On the Proxies Browser, you can see the details of each proxy - name, hostname, ID, last check-in date and time, status, ingestion rate by data type, version, and the user who created it.

To find the proxy you are interested in, you can:
* Sort the proxies by name, last check-in time, status, version, or the user who created the proxy.
* Search and, optionally, save and share your search. 
* Filter the proxies by status.
* Hide or show the filters.
* Show all or deleted proxies.
* Configure the proxies table columns.

From the Proxies Browser, you can also:
* Open the dashboard of a proxy by clicking the proxy name.
* Go to the **Wavefront Service and Proxy Data** dashboard of the Wavefront Usage integration by clicking **Usage and Proxies Data Dashboard**.

## Examine the Health and Usage of a Proxy with the Proxy Dashboard

On the Proxies Browser, click the name of a proxy to open its dashboard. The proxy dashboard contains charts based on [proxy internal metrics](#proxy-internal-metrics), organized in the following sections:

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Section</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td><strong>Overview</strong></td>
<td>Shows the details of the proxy and charts about the proxy queue size per data type, available space, network latency, latency by queueing, and reasons for queueing. </td></tr>
<tr>
<td><strong>Metrics</strong></td>
<td>Shows charts about the metric data points received, queued, and blocked by the proxy. </td>
</tr>
<tr>
<td><strong>Distributions (Histograms)</strong></td>
<td>Shows charts about the metric distributions received, queued, and blocked by the proxy.</td>
</tr>
<tr>
<td><strong>Traces (Spans)</strong></td>
<td>Shows charts about the traces received, queued, and blocked by the proxy.</td>
</tr>
<tr>
<td><strong>Logs</strong></td>
<td>Shows charts about the logs received, queued, blocked, and dropped by the proxy.</td>
</tr>
<tr>
<td><strong>Advanced</strong></td>
<td>Shows charts for troubleshooting the proxy, such as, the proxy memory heap, file descriptor usage, GC events, incoming HTTP requests, data lag, connections, network latency, time spent for the preprocessing rules, queue time, and rate limiter.</td>
</tr>
</tbody>
</table>

## Examine the Proxies Health and Usage with the Wavefront Usage Integration

The Wavefront Usage integration includes the predefined **Wavefront Service and Proxy Data** dashboard, which contains the **Proxies: Overview** and the **Proxy Troubleshooting** sections. These two sections comprise of charts based on the [proxy internal metrics](#proxy-internal-metrics) for examining the health of the proxies in your environment.

You can navigate to this dashboard in two ways:
- Select **Dashboards > All Dashboards** and search for it.
- On the Proxies Browser, click **Usage and Proxies Data Dashboard**.

### Proxies Overview

This section of the **Wavefront Service and Proxy Data** dashboard includes a number of charts that show general information for the proxies in your environment, for example, the rate at which each proxy receives points, the rate at which each proxy sends points to Tanzu Observability, any queued or blocked points, and more.

![proxy health](images/proxy_health_example.png)

The proxy statistics are shown in a tabular chart at the end of the section:

![A screenshot of the Proxy Stat chart.](images/proxy_table_chart.png)

### Proxy Troubleshooting

In this section of the **Wavefront Service and Proxy Data** dashboard, you can investigate second-level metrics that give you insight into questions, for example:
* Why are some points blocked?
* What's the file descriptor usage on the proxy JVM?
* How long does it take for points to be pushed from the proxy to Tanzu Observability?

For example, this row from that section shows latency metrics using `~proxy.push.*.duration.duration.median`:

![A screenshot of the P95 Network Latency, P75 Network Latency and Median Network Latency charts.](images/proxy_troubleshooting.png)

In this section of the dashboard, you can also monitor the time a proxy is spending with [preprocessing rules](proxies_preprocessor_rules.html). The charts show the time the JVM spends on the rules and determine the overall effectiveness of the rules. Rules that are not optimized can contribute to data lag. As a result, Tanzu Observability will not receive the data in a timely manner. 

For best performance, make sure that the expression leverages the [regex best practices for the proxy rules](proxies_preprocessor_rules.html#regex-notes) and that your proxy runs the latest version. 

The following charts help you understand the time a proxy spends on preprocessing rules:

* **Preprocessor Rules: CPU Time per Proxy**

  This chart shows an aggregate view of how long each proxy spends executing all the preprocessing rules.  

* **Preprocessor Rules: CPU Time per Rule**

  This chart shows an aggregate view across all proxies showing how much time it takes to execute each rule for each message. This chart helps you display outliers and identify preprocessing rules which should be optimized.
  
* **Preprocessor Rules: Hit Ratio**
  
  This chart helps you identify preprocessing rules that are no longer in use or impact a high number of metrics being ingested. Use this chart to identify if there are some rules which should be deprecated or possibly fine-tuned.

![A screenshot of the Preprocessor rules: CPU time per proxy, Preprocessor rules: CPU time per rule, and Preprocessor rules: hit ratio, % charts.](images/preprocessor_rules.png)

## Proxy Internal Metrics

The Wavefront proxies emit the `~proxy.` set of internal metrics, which you can use to check if your Wavefront proxy is behaving as expected.

- `~proxy.points.*.received` - Counter showing the total points the proxy receives, as a per-second rate. To look at the overall rate of points received across all the ports, you can sum up these series and look at the aggregate rate for a proxy. You can also look at the overall rate across all proxies by summing this up further.

- `~proxy.points.*.delivered` - Counter showing the number of points successfully delivered to Tanzu Observability, broken down by listening port.

- `~proxy.points.*.queued` - Counter showing the number of points being queued to be sent to Tanzu Observability from the proxy, as a per-second rate. Queueing usually happens for one of the following reasons:

  - The total point rate being collected has reached the maximum capacity. The Wavefront service is pushing back, causing data to buffer at the proxy and causing the proxy to queue points.

  - The proxy has reached the threshold of number of points it can process in each batch. The maximum number of points that a proxy can process and push to Tanzu Observability is `number of cores * pushFlushMaxPoints`, where:
    - `number of cores` - number of cores on the machine on which the proxy is running
    - `pushFlushMaxPoints` - batch size the proxy sends every second. This value is configurable. The default [setting](proxies_configuring.html) is 40,000.

    For example, if you are running the proxy on a 4-core machine, by default, the maximum number of points the proxy can send is 160k per second.

- `~proxy.buffer.task-count` - Gauge of the amount of data that the proxy currently has queued.

- `~proxy.buffer.points-count` - Gauge of the number of points currently in the queue.

- `~proxy.points.*.blocked` - Counter of the points being blocked at the proxy, as a per-second rate. If this rate is above 0, you can look at the charts in the [Proxy Troubleshooting](#proxy-troubleshooting) section of this dashboard to determine if the metrics contain invalid characters or bad timestamps, or if they are failing configurable regular expressions. A small sample of blocked points -- up to `pushBlockedSamples` -- and a complete list of blocked points is written to the proxy log file. See the `/var/log/wavefront/wavefront-blocked-points.log` file  for a complete list. See   `/etc/wavefront/wavefront-proxy/log4j2.xml` for configuring for details on enabling and configuring the proxy log file.

- `~proxy.buffer.fill-rate` - Rate at which the proxy buffer is filling up in bytes/min.

- `~proxy.points.*.received` - Rate at which points are being received at the proxy.

- `~proxy.buffer.bytes-left` - Available space (in bytes) on the proxy.

- `~proxy.build.version` - Current version number of the proxy.

- `~proxy.limiter.permits-denied` - Counter that shows how many points have been queued due to local proxy settings in `wavefront.conf`, i.e. the proxy rate limiting itself, not the Wavefront service pushing back.

- `~proxy.point.badchars` - Count of points blocked because of an illegal character.

- `~proxy.point.badtime` - Count of points blocked because of the timestamp (e.g. older than 1 year).

- `~proxy.validationRegex.*.points-rejected` - The points rejected based on the allow list/block list validation (using regex) at the Wavefront proxy.

- `~proxy.jvm.fd_usage` - % of file descriptors in use per proxy. If this metric reaches close to 100% of the allowed usage for the proxy, increase the `uLimit` on your system.

- `~proxy.jvm.garbage-collectors.*.time` - Garbage collection (GC) activity on the proxy JVM. Anything larger than 200ms is a GC issue, anything near 1s indicates continuous full GCs in the proxy.
- `~proxy.jvm.memory.heapMax/heapUsed` - Memory usage by the proxy process.

- `~proxy.push.*.duration.duration.median` - Duration taken by points pushed from the proxy to reach Tanzu Observability. Can help identify network latency issues. You can graph other percentiles.

- `~proxy.points.*.received.lag.p95` - 95th percentile of time differences (in milliseconds) between the timestamp on a point and the time that the proxy received it. Large numbers indicate backfilling old data, or clock drift in the sending systems.

- `~proxy.points.*.received.lag.p99` - p99 difference between the timestamp on a point and the time that the proxy received it. High numbers can indicate back-filling old data, or clock drift in sending systems.

- `~proxy.buffer.queue-time.*` - Latency introduced by queueing.