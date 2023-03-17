---
title: Monitor Wavefront Proxies
tags: [administration, proxies]
sidebar: doc_sidebar
permalink: monitoring_proxies.html
summary: Learn how to monitor Wavefront proxies.
---
VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) supports monitoring of your [Wavefront proxies](proxies.html).
* With the Proxies Browser, you can explore a detailed list of all your proxies.
* With the out-of-the-box dashboards that are based on [proxy internal metrics](#proxy-internal-metrics), you can examine the health and the usage of your proxies.

{% include note.html content="To access the Proxies Browser and the individual proxy dashboards, you must have the [**Proxies** permission](permissions_overview.html). If you don't have the **Proxies** permission, you can access only the [**Operations for Applications Service and Proxy Data** dashboard](#examine-the-proxies-health-and-usage-with-the-operations-for-applications-usage-integration) of the Operations for Applications Usage integration." %}

## Explore Your Proxies with the Proxies Browser

With the Proxies Browser, you can examine the status and the details of each proxy.

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
<td>The proxy stopped sending data. The reason can be:
<ul>
<li>The sources stopped sending data to the proxy.</li>
<li>The token has been revoked.</li>
<li>The proxy service has been <a href="proxies_installing.html#start-and-stop-a-proxy">stopped or restarted</a>.
<ul>
<li>If the proxy is non-ephemeral, you can start the stopped proxy service again.</li>
<li>If the proxy is ephemeral, you cannot start the stopped proxy service again. You can install a new proxy.</li>
<li>If the proxy is ephemeral, restarting the proxy service installs a new proxy with a new ID. The old proxy transitions into irreversible orphaned status. </li>
</ul></li>
</ul></td>
</tr>
<tr>
<td><strong>Stopped by Server</strong></td>
<td>The Operations for Applications subscription has ended for the customer.</td>
</tr>
<tr>
<td><strong>Token Expired</strong></td>
<td>The token has expired. You must install a new proxy.</td>
</tr>
</tbody>
</table>

Select **Browser > Proxies** to display the Proxies Browser.

![An annotated screenshot of the Proxies Browser. The annotations are listed below.](images/proxies_browser.png)

On the Proxies Browser page, you can see the details about each proxy - name, hostname, ID, last check-in date and time, status, ingestion rate by data type, version, and the user who created it.

In addition, you can:
* Sort the proxies by name, last check-in time, status, version, or the user who created the proxy.
* Search and, optionally, save and share your search. 
* Filter the proxies by status.
* Hide or show the filters.
* Show **All** or [**Deleted**](proxies_installing.html#delete-a-proxy) proxies list. The **Deleted** proxies list shows the ephemeral proxies that were deleted during the last 24 hours and the non-ephemeral proxies that were deleted during the last 1 month.
* Configure the proxies table columns.
* Open the dashboard of a proxy by clicking the proxy name.
* Go to the **Operations for Applications Service and Proxy Data** dashboard of the Operations for Applications Usage integration by clicking **Usage and Proxies Data Dashboard**.

## Examine the Health and Usage of a Proxy with the Proxy Dashboard

On the Proxies Browser, click the name of a proxy to open its individual dashboard. The proxy dashboard contains charts based on [proxy internal metrics](#proxy-internal-metrics), organized in the following sections:

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Section</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td><strong>Overview</strong></td>
<td>Shows the details of the proxy and charts about:
<ul>
<li>Proxy queue size per data type</li>
<li>Available space</li>
<li>Network latency</li>
<li>Latency by queueing and reasons for queueing</li>
</ul> </td></tr>
<tr>
<td><strong>Metrics</strong></td>
<td>Shows charts about the metric data points that are received, queued, and blocked by the proxy. </td>
</tr>
<tr>
<td><strong>Distributions (Histograms)</strong></td>
<td>Shows charts about the metric distributions that are received, queued, and blocked by the proxy.</td>
</tr>
<tr>
<td><strong>Traces (Spans)</strong></td>
<td>Shows charts about the traces that are received, queued, and blocked by the proxy.</td>
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

## Examine the Proxies Health and Usage with the Operations for Applications Usage Integration

The Operations for Applications Usage integration includes the predefined **Operations for Applications Service and Proxy Data** dashboard, which contains the **Proxies: Overview** and the **Proxy Troubleshooting** sections. These two sections comprise of charts based on the [proxy internal metrics](#proxy-internal-metrics) for examining the health of the proxies in your environment.

You can navigate to this dashboard in two ways:
- Select **Dashboards > All Dashboards** and search for the **Operations for Applications Service and Proxy Data** dashboard.
- On the Proxies Browser page, click **Usage and Proxies Data Dashboard**.

### Proxies Overview

This section of the **Operations for Applications Service and Proxy Data** dashboard includes a number of charts that show general information about the proxies in your environment, such as the rate at which each proxy receives points, the rate at which each proxy sends points to Operations for Applications, any queued or blocked points, and more.

![proxy health](images/proxy_health_example.png)

The proxy statistics are shown in a tabular chart at the end of the section:

![A screenshot of the Proxy Stat chart.](images/proxy_table_chart.png)

### Proxy Troubleshooting

In this section of the **Operations for Applications Service and Proxy Data** dashboard, you can investigate second-level metrics that give you insight into questions, suchh as:
* Why are some points blocked?
* What's the file descriptor usage on the proxy JVM?
* How long does it take for points to be pushed from the proxy to Operations for Applications?

For example, this row from that section shows latency metrics using `~proxy.push.*.duration.duration.median`:

![A screenshot of the P95 Network Latency, P75 Network Latency and Median Network Latency charts.](images/proxy_troubleshooting.png)

In this section of the dashboard, you can also monitor the time a proxy is spending with [preprocessing rules](proxies_preprocessor_rules.html). The charts show the time the JVM spends on the rules and determine the overall effectiveness of the rules. Rules that are not optimized can contribute to data lag. As a result, Operations for Applications will not receive the data in a timely manner. 

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

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Metric</th><th width="70%">Description</th>
</tr>
</thead>
<tr>
<td><code>~proxy.points.*.received</code></td>
<td>Counter showing the total points the proxy receives, as a per-second rate. To look at the overall rate of points received across all the ports, you can sum up these series and look at the aggregate rate for a proxy. You can also look at the overall rate across all proxies by summing this up further.</td>
</tr>
<tr>
<td><code>~proxy.points.*.delivered</code></td>
<td>Counter showing the number of points successfully delivered to Operations for Applications, broken down by listening port.</td>
</tr>
<tr>
<td><code>~proxy.points.*.queued</code></td>
<td>Counter showing the number of points being queued to be sent to Operations for Applications from the proxy, as a per-second rate. Queueing usually happens for one of the following reasons:
<ul>
<li>The total point rate being collected has reached the maximum capacity. The Operations for Applications service is pushing back, causing data to buffer at the proxy and causing the proxy to queue points.</li>
<li>The proxy has reached the threshold of number of points it can process in each batch. The maximum number of points that a proxy can process and push to Operations for Applications is <code>&lt;number_of_cores&gt; * pushFlushMaxPoints</code>, where:
<ul>
<li><code>&lt;number_of_cores&gt;</code> is the number of cores on the machine on which the proxy is running</li>
<li><code>pushFlushMaxPoints</code> is the batch size that the proxy sends every second. This value is configurable. The default setting is 40,000.</li>
</ul></li>
For example, if you are running the proxy on a 4-core machine, by default, the maximum number of points the proxy can send is 160k per second.
</ul></td>
</tr>
<tr>
<td><code>~proxy.buffer.task-count</code></td>
<td>Gauge of the amount of data that the proxy currently has queued.</td>
</tr>
<tr>
<td><code>~proxy.buffer.points-count</code></td>
<td>Gauge of the number of points currently in the queue.</td>
</tr>
<tr>
<td><code>~proxy.points.*.blocked</code></td>
<td>Counter of the points being blocked at the proxy, as a per-second rate. If this rate is above 0, you can look at the charts in the Proxy Troubleshooting section of the Operations for Applications Service and Proxy Data dashboard to determine if the metrics contain invalid characters or bad timestamps, or if they are failing configurable regular expressions. A small sample of blocked points – up to <code>pushBlockedSamples</code> – and a complete list of blocked points is written to the proxy log file. See the <code>/var/log/wavefront/wavefront-blocked-points.log</code> file for a complete list. See <code>/etc/wavefront/wavefront-proxy/log4j2.xml</code> for configuring for details on enabling and configuring the proxy log file.</td>
</tr>
<tr>
<td><code>~proxy.buffer.fill-rate</code></td>
<td>Rate at which the proxy buffer is filling up in bytes/min.</td>
</tr>
<tr>
<td><code>~proxy.points.*.received</code></td>
<td>Rate at which points are being received at the proxy.</td>
</tr>
<tr>
<td><code>~proxy.buffer.bytes-left</code></td>
<td>Available space (in bytes) on the proxy.</td>
</tr>
<tr>
<td><code>~proxy.build.version</code></td>
<td>Current version number of the proxy.</td>
</tr>
<tr>
<td><code>~proxy.limiter.permits-denied</code></td>
<td>Counter that shows how many points have been queued due to local proxy settings in <code>wavefront.conf</code>, i.e. the proxy rate limiting itself, not the Operations for Applications service pushing back.</td>
</tr>
<tr>
<td><code>~proxy.point.badchars</code></td>
<td>Count of points blocked because of an illegal character.</td>
</tr>
<tr>
<td><code>~proxy.point.badtime</code></td>
<td>Count of points blocked because of the timestamp (e.g. older than 1 year).</td>
</tr>
<tr>
<td><code>~proxy.validationRegex.*.points-rejected</code></td>
<td>The points rejected based on the allow list/block list validation (using regex) at the Wavefront proxy.</td>
</tr>
<tr>
<td><code>~proxy.jvm.fd_usage</code></td>
<td>% of file descriptors in use per proxy. If this metric reaches close to 100% of the allowed usage for the proxy, increase the uLimit on your system.</td>
</tr>
<tr>
<td><code>~proxy.jvm.garbage-collectors.*.time</code></td>
<td>Garbage collection (GC) activity on the proxy JVM. Anything larger than 200ms is a GC issue, anything near 1s indicates continuous full GCs in the proxy.</td>
</tr>
<tr>
<td><code>~proxy.jvm.memory.heapMax/heapUsed</code></td>
<td>Memory usage by the proxy process.</td>
</tr>
<tr>
<td><code>~proxy.push.*.duration.duration.median</code></td>
<td>Duration taken by points pushed from the proxy to reach Operations for Applications. Can help identify network latency issues. You can graph other percentiles.</td>
</tr>
<tr>
<td><code>~proxy.points.*.received.lag.p95</code></td>
<td>95th percentile of time differences (in milliseconds) between the timestamp on a point and the time that the proxy received it. Large numbers indicate backfilling old data, or clock drift in the sending systems.</td>
</tr>
<tr>
<td><code>~proxy.points.*.received.lag.p99</code></td>
<td>99th percentile of time differences (in milliseconds) between the timestamp on a point and the time that the proxy received it. Large numbers indicate backfilling old data, or clock drift in the sending systems.</td>
</tr>
<tr>
<td><code>~proxy.buffer.queue-time.*</code></td>
<td>Latency introduced by queueing.</td>
</tr>
</tbody>
</table>