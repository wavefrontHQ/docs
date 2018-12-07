---
title: JMX Integrations
keywords:
tags: [integrations, proxies]
sidebar: doc_sidebar
permalink: integrations_jmx.html
published: false
summary: Learn how to send JMX data to Wavefront.
---

You can monitor Java applications that use JMX by setting up Jolokia and Telegraf. Jolokia exposes JMX data as JSON on an HTTP port (8778 by default). You download and set up Jolokia, and configure the Jolokia input plugin in Telegraf.

## Download and Set up Jolokia

1. Download the **JVM-Agent** artifact from [Jolokia – Download](https://jolokia.org/download.html). Jolokia 1.3.6 is the current version as of this writing.
1. Save Jolokia to `/opt/jolokia` or any location accessible to the application.
1. Configure the application to use Jolokia.
   1. Add the following line to the application startup script:
      ```
      JVM_OPTS="$JVM_OPTS -javaagent:/opt/jolokia/jolokia-jvm-1.3.6-agent.jar"
      ```
      Change `/opt/jolokia` if you saved it elsewhere.
   1. Restart the node running the application.
   1. Verify that you can access Jolokia on port 8778 by running:
      ```
      curl http://localhost:8778/jolokia/
      ```
      If you receive a JSON response then Jolokia is working.

## Configure Telegraf

1. Add the application configuration to your [Telegraf configuration](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia).
2. Restart Telegraf.
