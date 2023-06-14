---
title: StatsD Integration
tags: [integrations list]
permalink: statsd.html
summary: Learn about the StatsD Integration.
---
# StatsD Integration

StatsD is a popular network daemon used for monitoring applications. This integration uses the Telegraf StatsD service plugin that supports point tags. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

This is a custom integration that supports sending custom metrics directly from your application code via a TCP or UDP socket. Using these metrics you can create your own dashboards.


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## StatsD Setup



### Step 1. Install Telegraf

If you've already installed Wavefront Telegraf packages on a host, and want to run StatsD on the same host, skip to Step 2. Otherwise, install Telegraf using these steps:

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Configure the StatsD Service Plugin

1. Create a file called `statsd.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.statsd]]
  service_address = ":8125"
  delete_gauges = false
  delete_counters = false
  delete_sets = false
  delete_timings = true
  percentiles = [90]
  metric_separator = "_"
  allowed_pending_messages = 10000
  percentile_limit = 1000
```
{% endraw %}

### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.

### Step 4. Send Test Metrics
 
The easiest and quickest way to send test metrics to StatsD is to use `netcat`:
{% raw %}
```shell
$ echo "foo.bar.test1:+1|g" | nc -u localhost 8125
```
{% endraw %}

This command creates and increments a gauge named **foo.bar.test1**. After running this command open a chart and enter the query **ts("foo.bar.test1")**. Run the command a few more times and you should see the line increase in value as the gauge is incremented.
 
#### Set Point Tags on Metrics
 
The Telegraf StatsD plugin has built-in support for point tags. Add any tags you want applied to the end of the metric name:
{% raw %}
```shell
$ echo "foo.bar.test2,tag1=val1:+1|g" | nc -u localhost 8125
```
{% endraw %}

This command creates and increment a gauge named **foo.bar.test2** with a tag named **tag1** with value **val1**. You can add multiple tags to your metrics (separated by commas).
 
#### Override the Metric Source
 
By default, Telegraf uses the hostname of the machine running StatsD as the source of the metric. If you have remote applications sending metrics into your StatsD service, you may want to override the source with the hostname of your application. To do this, pass the **hostname** point tag to StatsD with the name of the host running your application.
{% raw %}
```shell
$ echo "foo.bar.test3,hostname=mycustomsource:+1|g" | nc -u localhost 8125
```
{% endraw %}
This command creates and increment a new gauge, but has a different source (`mycustomsource`) from the previous examples.

For reference information about the Telegraf StatsD service plugin, see [Telegraf Service Plugin: statsd](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/statsd).



