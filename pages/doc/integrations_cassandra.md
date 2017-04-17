---
title: Cassandra 3 Integration
keywords:
tags: [integrations, proxies]
sidebar: doc_sidebar
permalink: integrations_cassandra.html
summary: Learn how to send data collected by Cassandra to Wavefront.
---

[Apache Cassandra](http://cassandra.apache.org/) is a popular, distributed, NoSQL database system. 
 
Cassandra is a Java application and uses JMX to report metrics about its health. There are several JMX collectors&mdash;such as [Telegraf](integrations_telegraf), [collectd](https://github.com/collectd/collectd), and [JMXTrans](integrations_jmxtrans)&mdash;that work with Wavefront. There are also JMX reporters for Cassandra that will push JMX metrics in [Graphite data format](integrations_graphite) to the Wavefront proxy. This guide covers how to configure Jolokia and Telegraf to collect metrics.
 
## Download and Set up Jolokia

1. Jolokia is JVM agent that exposes JMX data as JSON on an HTTP port (8778 by default). Download Jolokia from [Jolokia – Download](https://jolokia.org/download.html). Jolokia 1.3.5 is the current version as of this writing.
1. Save Jolokia to your Cassandra node in `/opt/jolokia` or any location accessible to Cassandra.
1. Configure Cassandra to use Jolokia.
    1. Add the following line to `/etc/cassandra/cassandra-env.sh`:

            JVM_OPTS="$JVM_OPTS -javaagent:/opt/jolokia/jolokia-jvm-1.3.5-agent.jar"
    1. Change `/opt/jolokia` if you saved it elsewhere.
    1. Restart the Cassandra node.
    1. Verify that you can access Jolokia on port 8778 by running:

            curl http://localhost:8778/jolokia/

       If you receive a JSON response then Jolokia is working.

## Configure Telegraf

1. Add this [config snippet](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/cassandra3/telegraf/10-cassandra.conf) to your Telegraf config. This config collects all JMX metrics needed for the [example dashboard](#dashboard) and more. Use it as a starting point for collecting Cassandra metrics. See the [Cassandra docs](https://wiki.apache.org/cassandra/Metrics) for a full list of all available metrics.
2. Restart Telegraf. 

## Validate Your Metrics
1. Select **Browse > Metrics**. You should see an entry for `cassandra`. If you do not see Cassandra metrics after a minute or two, check your Telegraf logs in `/var/log/telegraf/telegraf.log`.
 
## Dashboard
Once you have started collecting Cassandra metrics, you can [deploy](dashboards_managing#deploying-a-dashboard) this [example dashboard](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/cassandra3/dashboards/cassandra-telegraf.json) as a starting point for monitoring your Cassandra cluster. The dashboard has detailed sections on Read Latency, Write Latency, Disk, Garbage Collection, and Errors and Overruns.

![cassandra db](images/db_cassandra.png)


