---
title: Telegraf Integration
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_telegraf.html
summary: Learn how to send data collected by Telegraf to Wavefront.
---
Telegraf is a popular, plugin-driven, collector agent. It is very similar to collectd but has a [few advantages](https://www.wavefront.com/collectd-vs-telegraf-comparing-metric-collection-agents/):

- It supports point tags out-of-the-box which can make for cleaner metric namespaces in many cases.
- All plugins ship as part of a single binary meaning you don't have to worry about installing dependencies in most cases (exception: JMX).
- It also works out-of-the-box with Wavefront via the OpenTSDB output plugin (port 4242) or the Wavefront output plugin (port 2878).

## Automated Installation and Configuration

Wavefront provides an [automated installation](proxies_installing) for Telegraf and the Wavefront proxy. 
 
If you do an automated installation of Telegraf, the Wavefront output plugin is configured for you in `/etc/telegraf/telegraf.d/10-wavefront.conf`. Here is the script to install the Telegraf agent:

```shell
$ sudo bash -c "$(curl -sL https://wavefront.com/install)" -- install \
    --agent \
    --proxy-address localhost \
    --proxy-port 2878
```

Be sure to update the `localhost` option in the example above if your Wavefront proxy is not installed on the local machine.
 
## Manual Installation and Configuration
You can also install Telegraf manually from our [package cloud repository](https://packagecloud.io/wavefront/telegraf). If you install it using this method, you must configure the Wavefront output plugin:

 1. Edit /etc/telegraf/telegraf.conf and add the following in the `outputs` section:

    ```properties
    [[outputs.wavefront]]
    host = "YOUR_WAVEFRONT_PROXY_ADDRESS"
    port = 2878
    metric_separator = "."
    source_override = ["hostname", "snmp_host", "node_host"]
    convert_paths = true
    use_regex = false
    ```

## Dashboard
Once you've installed Telegraf, you can [deploy](dashboards_managing#deploying-a-dashboard) [the Telegraf dashboard](https://github.com/wavefrontHQ/integrations/tree/master/telegraf/dashboards) to begin monitoring your server metrics from Telegraf in Wavefront.

![db_telegraf](images/db_telegraf.png)
 

{% include links.html %}
