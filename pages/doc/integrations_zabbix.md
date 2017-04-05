---
title: Zabbix Integration
keywords: integrations
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_zabbix.html
summary: Learn how to use Zabbix to ingest metrics into Wavefront.
---

Wavefront provides data adapters for a range of monitoring and data collection tools, including [Zabbix](http://www.zabbix.com/), which allow you to easily send data to the Wavefront system. If you are already using Zabbix for monitoring, then you can use our adapter to send those same metrics to Wavefront without any configuration changes to your existing Zabbix environment.
 
To get started:

1. Install and run the Wavefront proxy.
1. Install and run a Zabbix adapter. We provide two versions of the adapter:
    - Zabbix Database Adapter polls your Zabbix database at a configurable interval (defaulted to 30 seconds) and send any new metrics to Wavefront. Contact us for detailed installation instructions and the adapter source code.
    - Zabbix Interceptor intercepts data that is being transmitted over the network from the Zabbix adapter. It has the advantage of not putting any additional load onto your Zabbix database but requires the use of the Zabbix Proxy. The architecture in this case looks like the following:

      ![zabbix](images/zabbix.png)
1. Start working with your data in Wavefront.
1. [Contact us](mailto:support@wavefront.com) for detailed installation instructions and the adapter source code.

{% include links.html %}
