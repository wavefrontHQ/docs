---
title: StatsD Integration
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_statsd.html
summary: Learn how to send data collected by StatsD to Wavefront.
---
StatsD is a very popular statistical aggregator for application metrics. We recommend installing StatsD using the Wavefront CLI or by configuring the Telegraf StatsD service plugin. The StatsD Telegraf plugin has a small server footprint and supports tags - something that the original StatsD does not. For more information about the Telegraf StatsD service plugin, see [Telegraf Service Plugin: statsd](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/statsd).

## Installing and Configuring StatsD
 
1. Install Telegraf. Follow the instructions in [Telegraf Integration](integrations_telegraf)  to install Telegraf on your host machine.
 
1. Configure the StatsD Service plugin
 
There are 2 ways to configure the StatsD service plugin: Wavefront CLI and manually.
 
  - **Configure Using the Wavefront CLI** - If you install Telegraf using the Wavefront CLI you can install the StatsD service plugin by running the command:

    ```shell  
    $ sudo wave integration StatsD install statsd_port=8125
    ```
  This command installs the StatsD service plugin and restarts Telegraf. You can confirm by checking the Telegraf log for the string `inputs.statsd` and by checking for the file `/etc/telegraf/telegraf.d/10-statsd.conf`.
 
 - **Configure Manually** - To manually configure StatsD, add the StatsD plugin information to your Telegraf config file.
     1. Edit the Telegraf config file `/etc/telegraf/telegraf.conf` and add the following:

        ```properties
        [[inputs.statsd]]
          service_address = ":8125"
          delete_gauges = false
          delete_counters = false
          delete_sets = false
          delete_timings = true
          percentiles = [90]
          metric_separator = "_"
          parse_data_dog_tags = false
          allowed_pending_messages = 10000
          percentile_limit = 1000
        ```
     1. Restart Telegraf: `$ sudo service telegraf restart`
 
## Using StatsD
 
### Sending Test Metrics
 
The easiest and quickest way to send test metrics to StatsD is to use `netcat`:

```shell
$ echo "foo.bar.test1:+1|g" | nc -u localhost 8125
```

This command creates and increments a gauge named **foo.bar.test1**. After running this command open a chart and enter the query **ts("foo.bar.test1")**. Run the command a few more times and you should see the line increase in value as the gauge is incremented.
 
### Setting Point Tags on Metrics
 
The Telegraf StatsD plugin has built-in support for point tags. Add any tags you want applied to the end of the metric name:

```shell
$ echo "foo.bar.test2,tag1=val1:+1|g" | nc -u localhost 8125
```

This command creates and increment a gauge named **foo.bar.test2** with a tag named **tag1** with value **val1**. You can add multiple tags to your metrics (separated by commas).
 
## Overriding the Metric Source
 
By default, Telegraf uses the hostname of the machine running StatsD as the source of the metric. If you have remote applications sending metrics into your StatsD service, you may want to override the source with the hostname of your application. To do this, pass the **hostname** point tag to StatsD with the name of the host running your application.

```shell
$ echo "foo.bar.test3,hostname=mycustomsource:+1|g" | nc -u localhost 8125
```
This command creates and increment a new gauge, but it will have a different source (`mycustomsource`) from the previous examples.

{% include links.html %}
