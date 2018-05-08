---
title: OpenBSD Host Integration
tags: [integrations list]
permalink: openbsd.html
summary: Learn about the Wavefront OpenBSD Host Integration.
---
## OpenBSD Host Integration

OpenBSD is a free and open-source Unix-like operating system. Monitoring OpenBSD hosts is easy with Wavefront. This integration steps you through installing and configuring the Wavefront proxy and Collectd. Collectd is a Unix daemon capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html) in Graphite data format.

In addition to setting up the metrics flow, this integration also installs a dashboard. Here are the **Summary** and **CPU** sections of a dashboard displaying OpenBSD host metrics.

{% include image.md src="images/db_openbsd_cpu.png" width="80" %}

## OpenBSD Host Setup



### Step 1: Install and Configure the Wavefront Proxy Manually

1. Download the [Wavefront proxy jar](https://s3-us-west-2.amazonaws.com/wavefront-cdn/bsd/proxy-4.26-uber.jar) and [Wavefront config file](https://s3-us-west-2.amazonaws.com/wavefront-cdn/bsd/wavefront.conf).
2. Open the `wavefront.conf` file for edit, add the following proxy properties, and save the file:{% raw %}
   ```
   server = http://YOUR_CLUSTER.wavefront.com/api/
   token = YOUR_API_TOKEN
   hostname = HOSTNAME
   graphitePorts = 2003
   graphiteFormat = 2
   graphiteDelimiters = _
   ```
Here, `hostname` represents the machine on which the proxy is running. The name can have alphanumeric characters and periods, and must be unique. Wavefront does not use the hostname to tag your data but uses it to tag data internal to the proxy, such as JVM statistics, per-proxy point rates, and so on.
3. If Java is not installed, run the command `pkg_add -v jdk` to install Java and set the path.
4. Start the Wavefront proxy service:
   ```
   sudo java -cp ./proxy-4.26-uber.jar \
   -Xss2049k -XX:OnOutOfMemoryError="kill -1 %p" \
   -debug com.wavefront.agent.PushAgent -f ./wavefront.conf &
   ```
5. On the Proxies page, verify that the proxy has registered with the Wavefront server.


### Step 2: Install and Configure the Collectd Daemon Manually

1. Run the command `pkg_add -v collectd` to install the Collectd package.
2. Open the `/etc/collectd.conf` file for edit, add the following information, and save the file.
   ```
   # Global settings for the daemon.
   Hostname    "OPENBSD_HOSTNAME"
   FQDNLookup   true
   BaseDir     "/var/collectd"
   PIDFile     "/var/collectd/collectd.pid"
   PluginDir   "/usr/local/lib/collectd"
   TypesDB     "/usr/local/share/collectd/types.db"

   # When enabled, plugins are loaded automatically with the default options.
   AutoLoadPlugin true

   # Enable logging
   <Plugin logfile>
        LogLevel info
        File "/var/log/collectd.log"
        Timestamp true
        PrintSeverity false
   </Plugin>

   # Enable cpu input plugin
   <Plugin cpu>
       ReportByCpu true
       ReportByState true
       ValuesPercentage true
       ReportNumCpu true
   </Plugin>

   # Enable df input plugin
   <Plugin df>
       MountPoint "/"
       ReportByDevice true
       ReportInodes true
       ValuesAbsolute true
       ValuesPercentage true
   </Plugin>

   # Enable disk input plugin
   <Plugin disk>
   </Plugin>

   # Enable interface input plugin
   <Plugin interface>
   </Plugin>

   # Enable load input plugin
   <Plugin load>
       ReportRelative true
   </Plugin>

   # Enable memory input plugin
   <Plugin memory>
       ValuesAbsolute true
       ValuesPercentage true
   </Plugin>

   # Enable processes input plugin
   <Plugin processes>
       CollectContextSwitch true
   </Plugin>

   # Enable swap input plugin
   <Plugin swap>
       ValuesAbsolute true
       ValuesPercentage true
   </Plugin>

   # Enable uptime input plugin
   <Plugin uptime>
   </Plugin>

   # Enable users input plugin
   <Plugin users>
   </Plugin>

   # Enable graphite output plugin
   <Plugin write_graphite>
      <Node "OPENBSD_HOSTNAME">
          Host "WAVEFRONT_PROXY_ADDRESS"
          Port "2003"
          Protocol "tcp"
          ReconnectInterval 10
          LogSendErrors true
          Prefix "openbsd."
          StoreRates false
          AlwaysAppendDS false
          EscapeCharacter "_"
          SeparateInstances true
      </Node>
   </Plugin>
   ```
{% endraw %}

3. Restart the Collectd daemon by running the following command:
   `/etc/rc.d/collectd restart`
