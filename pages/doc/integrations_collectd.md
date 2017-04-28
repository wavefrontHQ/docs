---
title: collectd Integration
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_collectd.html
summary: Learn how to send data collected by collectd to Wavefront.
---

[collectd](https://collectd.org/) is a daemon that periodically collects system and application performance metrics. This topic describes how to send collected data to Wavefront using the Graphite plugin.

## Configure Wavefront Proxy to Listen for Graphite Data

Follow the process described in [Graphite Integration](integrations_graphite.html) to enable the Wavefront proxy to listen for Graphite data.

## Installing collectd
collectd is typically available in standard Linux distribution repositories but we primarily recommend using these [packages](https://github.com/collectd/collectd-ci/blob/master/README.md). These instructions assume that you are using collectd V5.1 or higher. Wavefront can also work with collectd 4.10.

## Configuring collectd
There are many plugins available with collectd, including SNMP and various databases. In this procedure we leave the plugins at whatever defaults your distribution sets. Typically this means you'll see some information about the local machine such as its CPU load, local network interfaces, and memory and disk usage. Configure the `write_graphite` plugin which will send the data to the Wavefront proxy.
 
 1. Edit your collectd configuration file `/etc/collectd/collectd.conf`.
 1. If the hostname command on this machine returns something very generic like localhost you can explicitly set the host that will appear within Wavefront for this machine by uncommenting the line #Hostname and replacing "localhost" with the desired hostname.
 1. Insert the following lines at the bottom of the file:

    ```conf
    LoadPlugin "write_graphite" 
      <Plugin write_graphite> 
        <Node "example">   
          Host "localhost" Port "2003"
          Prefix "collectd."
          StoreRates false
          SeparateInstances true
          Protocol "tcp"
          LogSendErrors true
          EscapeCharacter "_"
          AlwaysAppendDS false
        </Node> 
      </Plugin>
    ```

See the [write_graphite documentation](https://collectd.org/documentation/manpages/collectd.conf.5.shtml#plugin_write_graphite) for an explanation of the various options. We believe these settings provide the optimal behavior when using Wavefront. If you are running collectd on a different machine from the one where the Wavefront proxy is running, replace `localhost` in the `write_graphite` configuration block. 

The `Prefix` setting causes all the metrics that end up Wavefront to begin with collectd, for example `collectd.cpu.0.cpu.idle`. This can be helpful to allow your collectd metrics to be kept totally separate from those from different sources (for instance [StatsD](integrations_statsd.html) or [JMXTrans](integrations_jmxtrans.html)). However, if you prefer not to have that prefix you can delete or comment out that line in your configuration. If you do that you must also edit `wavefront.conf`, change `graphiteFormat=2` to `graphiteFormat=1`, and restart the [Wavefront proxy](proxies_managing.html).
 
 
## Running collectd
Run collectd: `service collectd start`.

You can alternatively use a Wavefront plugin that allows you to add point tags to metrics. For more information, see [Wavefront collectd plugin](https://github.com/wavefrontHQ/collectd-python-write-wavefront).


