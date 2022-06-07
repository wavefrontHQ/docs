---
title: collectd Integration
tags: [integrations list]
permalink: collectd.html
summary: Learn about the Wavefront collectd Integration.
---
## collectd Integration

[collectd](https://collectd.org/) is a daemon that periodically collects system and application performance metrics. This integration describes how to send collected data to Wavefront using the Graphite plugin.

For step-by-step instructions for using collectd as the collector agent with Apache, Cassandra, Memcached, MySQL, NGiNX, Redis, and Zookeeper, see [our documentation pages](https://docs.wavefront.com/integrations_collectd.html). 

## collectd Setup

### Step 1. Configure Wavefront Proxy to Listen for Graphite Data

{% include proxy_graphite_config.md %}

### Step 2. Install collectd

collectd is typically available in standard Linux distribution repositories but we primarily recommend using these [packages](https://github.com/collectd/collectd-ci/blob/master/README.md). These instructions assume that you are using collectd V5.1 or higher. Wavefront can also work with collectd 4.10.

### Step 3. Configure collectd

There are many plugins available with collectd, including SNMP and various databases. In this procedure we leave the plugins at whatever defaults your distribution sets. Typically this means you'll see some information about the local machine such as its CPU load, local network interfaces, and memory and disk usage. Configure the `write_graphite` plugin which will send the data to the Wavefront proxy.
 
 1. Edit the collectd configuration file `/etc/collectd/collectd.conf`.
 1. If the hostname command on this machine returns something very generic like localhost you can explicitly set the host that will appear within Wavefront for this machine by uncommenting the line #Hostname and replacing "localhost" with the desired hostname.
 1. Insert the following lines at the bottom of the file:
{% raw %}
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
{% endraw %}

See the [write_graphite documentation](https://collectd.org/documentation/manpages/collectd.conf.5.shtml#plugin_write_graphite) for an explanation of the various options. We believe these settings provide the optimal behavior when using Wavefront. If you are running collectd on a different machine from the one where the Wavefront proxy is running, replace `localhost` in the `write_graphite` configuration block. 

The `Prefix` setting causes all the metrics that end up Wavefront to begin with collectd, for example `collectd.cpu.0.cpu.idle`. This can be helpful to allow your collectd metrics to be kept totally separate from those from different sources. However, if you prefer not to have that prefix you can delete or comment out that line in your configuration. If you do that you must also edit `wavefront.conf`, change `graphiteFormat=2` to `graphiteFormat=1`, and restart the [Wavefront proxy](https://docs.wavefront.com/proxies_installing.html#start-and-stop-a-proxy).
 
 
### Step 4. Run collectd

Run `sudo service collectd start`.

You can alternatively use a Wavefront plugin that allows you to add point tags to metrics. For more information, see [Wavefront collectd plugin](https://github.com/wavefrontHQ/collectd-python-write-wavefront).



