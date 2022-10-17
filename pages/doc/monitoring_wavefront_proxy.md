---
title: Monitor Wavefront Proxies
tags: [administration, proxies]
sidebar: doc_sidebar
permalink: monitoring_proxies.html
summary: Learn how to monitor Wavefront proxies.
---

Tanzu Observability by Wavefront supports monitoring of your Wavefront proxies. The Wavefront Usage integration includes a **Wavefront Service and Proxy Data** dashboard that includes several sections with dashboards for examining proxy health.

![proxy health](images/proxy_health_example.png)

## Monitoring Proxy Health with the Usage Dashboard

[Wavefront proxies](proxies.html) emit metrics that you can use to check if your Wavefront proxy is behaving as expected.

The **Proxies Overview** section of the **Wavefront Service and Proxy Data** dashboard includes commonly used internal metrics, such as the `~proxy.points` counter metrics, which measure the data traffic on each port of the proxy. These metrics show the rate at which each proxy receives points, the rate at which the proxy sends points to Tanzu Observability, and any queued or blocked points. Here's an overview of the metrics on this dashboard:

- `~proxy.points.*.received` - Counter showing the total points the proxy receives, as a per-second rate. To look at the overall rate of points received across all the ports, you can sum up these series and look at the aggregate rate for a proxy. You can also look at the overall rate across all proxies by summing this up further.

- `~proxy.points.*.delivered` - Counter showing the number of points successfully delivered to Tanzu Observability, broken down by listening port.

- `~proxy.points.*.queued` - Counter showing the number of points being queued to be sent to Tanzu Observability from the proxy, as a per-second rate. Queueing usually happens for one of the following reasons:

  - The total point rate being collected has reached the maximum capacity. The Wavefront service is pushing back, causing data to buffer at the proxy and causing the proxy to queue points.

  - The proxy has reached the threshold of number of points it can process in each batch. The maximum number of points that a proxy can process and push to Tanzu Observability is determined by these factors:
    - Number of cores on the machine on which the proxy is running
    - `pushFlushMaxPoints` - batch size the proxy sends every second. This value is configurable.

    The maximum points a proxy can push each second without queueing  is:

    ```
    number of cores * pushFlushMaxPoints
    ```

    The default [setting](proxies_configuring.html) for `pushFlushMaxPoints` is 40,000. If you are running the proxy on a 4-core machine, the maximum number of points the proxy can send is 160k per second.

- `~proxy.buffer.task-count` - Gauge of the amount of data that the proxy currently has queued.
- `~proxy.buffer.points-count` - Gauge of the number of points currently in the queue.
- `~proxy.points.*.blocked` - Counter of the points being blocked at the proxy, as a per-second rate. If this rate is above 0, you can look at the charts in the [Proxy Troubleshooting](#proxy-troubleshooting) section of this dashboard to determine if the metrics contain invalid characters or bad timestamps, or if they are failing configurable regular expressions. A small sample of blocked points -- up to `pushBlockedSamples` -- and a complete list of blocked points is written to the proxy log file. See the `/var/log/wavefront/wavefront-blocked-points.log` file  for a complete list. See   `/etc/wavefront/wavefront-proxy/log4j2.xml` for configuring for details on enabling and configuring the proxy log file.


These `~proxy metrics` describe behavior at the Wavefront proxy:

- `~proxy.buffer.fill-rate` - Rate at which the proxy buffer is filling up in bytes/min.
- `~proxy.points.*.received` - Rate at which points are being received at the proxy.
- `~proxy.buffer.bytes-left` - Available space (in bytes) on the proxy.
- `~proxy.build.version` - Current version number of the proxy.

These metrics are displayed in a tabular chart:

![A screenshot of the Proxy Stat chart.](images/proxy_table_chart.png)

## Proxy Troubleshooting

In this section, you can also investigate second-level metrics that give you insight into questions, for example:
* Why are some points blocked?
* What's the file descriptor usage on the proxy JVM?
* How long does it take for points to be pushed from the proxy to Tanzu Observability?

The metrics used in this section are:

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

For example, this row from that section shows latency metrics using `~proxy.push.*.duration.duration.median`:

![A screenshot of the P95 Network Latency, P75 Network Latency and Median Network Latency charts.](images/proxy_troubleshooting.png)

### Monitor the Time a Proxy Is Spending with Preprocessing Rules

In the **Proxy Troubleshooting** section of the **Wavefront Service and Proxy Data** dashboard, you can also monitor the time a proxy is spending with [preprocessing rules](proxies_preprocessor_rules.html). The charts show the time the JVM spends on the rules and determine the overall effectiveness of the rules. Rules that are not optimized can contribute to data lag. As a result, Tanzu Observability will not receive the data in a timely manner. 

For best performance, make sure that the expression leverages the [regex best practices for the proxy rules](proxies_preprocessor_rules.html#regex-notes) and that your proxy runs the latest version. 

The following charts help you understand the time a proxy spends on preprocessing rules:

* **Preprocessor rules: CPU time per proxy**

  This chart shows an aggregate view of how long each proxy spends executing all the preprocessing rules.  

* **Preprocessor rules: CPU time per rule**

  This chart shows an aggregate view across all proxies showing how much time it takes to execute each rule for each message. This chart helps you display outliers and identify preprocessing rules which should be optimized.
  
* **Preprocessor rules: hit ratio, %**
  
  This chart helps you identify preprocessing rules that are no longer in use or impact a high number of metrics being ingested. Use this chart to identify if there are some rules which should be deprecated or possibly fine-tuned.

![A screenshot of the Preprocessor rules: CPU time per proxy, Preprocessor rules: CPU time per rule, and Preprocessor rules: hit ratio, % charts.](images/preprocessor_rules.png)
