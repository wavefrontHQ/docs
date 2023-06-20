---
title: NetBSD Host Integration
tags: [integrations list]
permalink: netbsd.html
summary: Learn about the NetBSD Host Integration.
---
## NetBSD Host Integration

NetBSD is a free and open-source Unix-like operating system. Monitoring NetBSD hosts is easy with Wavefront. This integration steps you through installing and configuring the Wavefront proxy and Collectd. Collectd is a Unix daemon capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html) in Graphite data format.

In addition to setting up the metrics flow, this integration also installs a dashboard. Here are the **Summary** and **CPU** sections of a dashboard displaying NetBSD host metrics.

{% include image.md src="images/db_netbsd_cpu.png" width="80" %}

## NetBSD Host Setup



### Step 1: Install and Configure the Wavefront Proxy Manually

1. Create a directory `wavefront-proxy` and change the directory:{% raw %}
   ```
   mkdir wavefront-proxy
   cd wavefront-proxy
   ```
{% endraw %}
2. Download the [Wavefront proxy jar](https://wavefront-cdn.s3-us-west-2.amazonaws.com/bsd/proxy-uber.jar):{% raw %}
   ```
   wget -O proxy-uber.jar https://wavefront-cdn.s3-us-west-2.amazonaws.com/bsd/proxy-uber.jar --no-check-certificate
   ```
{% endraw %}
3. Create a directory `conf` and download the `wavefront.conf`, `log4j2.xml` and `preprocessor_rules.yaml` files into the `conf` directory:{% raw %}
   ```
   mkdir conf
   wget -O ./conf/wavefront.conf https://wavefront-cdn.s3-us-west-2.amazonaws.com/bsd/wavefront.conf --no-check-certificate
   wget -O ./conf/log4j2.xml https://raw.githubusercontent.com/wavefrontHQ/wavefront-proxy/master/pkg/etc/wavefront/wavefront-proxy/log4j2.xml.default --no-check-certificate
   wget -O ./conf/preprocessor_rules.yaml https://raw.githubusercontent.com/wavefrontHQ/wavefront-proxy/master/pkg/etc/wavefront/wavefront-proxy/preprocessor_rules.yaml.default --no-check-certificate
   ```
{% endraw %}
4. [[CSPAuthMethodSelector]]
Open the `conf/wavefront.conf` file in edit mode, update the following proxy properties, and save the file.{% raw %}
   ```
   server = https://YOUR_CLUSTER.wavefront.com/api/
   [[CSPAuthCreds user-token-prefix="token"]]
   hostname = "HOSTNAME"
   graphitePorts = 2003
   graphiteFormat = 2
   graphiteDelimiters = _

   ```
{% endraw %}
5. Start the Wavefront proxy service:{% raw %}
   ```
   java -XX:OnOutOfMemoryError="kill -1 %p" \
   -Dlog4j.configurationFile=./conf/log4j2.xml -Djava.util.logging.manager=org.apache.logging.log4j.jul.LogManager \
   -Djavax.net.debug=summary -jar ./proxy-uber.jar \
   -f conf/wavefront.conf \
   --preprocessorConfigFile ./conf/preprocessor_rules.yaml &
   ```
{% endraw %}
   **NOTE:**
   * If Java is not installed, run the command `pkg_add openjdk8` to install Java and set the path.
   * If the proxy fails to start with an `Error requesting exclusive access to the buffer lock file`, execute the below command and start the proxy (Step 5){% raw %}
      ```
      mkdir -p /var/spool/wavefront-proxy
      ```
{% endraw %}
6. Verify that the proxy has registered with the Wavefront server.

### Step 2: Install and Configure the Collectd Daemon Manually

1. Install the Collectd package:{% raw %}
   ```
   pkg_add -v collectd
   ```
{% endraw %}
3. Open the `/usr/pkg/etc/collectd.conf` file for edit, add the following information and save the file.{% raw %}
   ```
   # Global settings for the daemon.
   Hostname    "HOSTNAME"
   FQDNLookup   true
   BaseDir     "/var/db/collectd"
   PIDFile     "/var/run/collectd.pid"
   PluginDir   "/usr/pkg/lib/collectd"
   TypesDB     "/usr/pkg/share/collectd/types.db"

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
      <Node "HOSTNAME"
          Host "WAVEFRONT_PROXY_ADDRESS"
          Port "2003"
          Protocol "tcp"
          ReconnectInterval 10
          LogSendErrors true
          Prefix "netbsd."
          StoreRates false
          AlwaysAppendDS false
          EscapeCharacter "_"
          SeparateInstances true
      </Node>
   </Plugin>
   ```
{% endraw %}

4. Start the Collectd daemon by running the following command:{% raw %}
   ```
   cp /usr/pkg/share/examples/rc.d/collectd /etc/rc.d/collectd
   service collectd onestart
   ```
{% endraw %}



