---
title: Monitoring Wavefront Proxies
tags: [administration, proxies]
sidebar: doc_sidebar
permalink: monitoring_proxies.html
summary: Learn how to monitor Wavefront proxies.
---

## Monitoring Proxy Health with the System Usage Dashboard

[Wavefront proxies](proxies_managing.html) emit metrics that you can use to check if your Wavefront proxy is behaving as expected.

The Proxy Health section of the System Usage dashboard is the most used section of the dashboard. The most commonly used internal metrics are the `~proxy.points` counter metrics that measure the data traffic on each port of the proxy. These metrics show the rate at which points are being received at each proxy, the rate at which points are being sent from the proxy to the Wavefront server as well as if there are any queued or blocked points.

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

## Proxy Troubleshooting

You can also investigate second-level metrics that give you insight into questions such as - why some points are being blocked, file descriptor usage on the proxy JVM, and how long does it take for points to be pushed from the proxy to Wavefront. The metrics used in this section are:

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
