---
title: OpenBSD Host Integration
tags: [integrations list]
permalink: openbsd.html
summary: Learn about the OpenBSD Host Integration.
---
## OpenBSD Host Integration

OpenBSD is a free and open-source Unix-like operating system. Monitoring OpenBSD hosts is easy with Wavefront. This integration steps you through installing and configuring the Wavefront proxy and Collectd. Collectd is a Unix daemon capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html) in Graphite data format.

In addition to setting up the metrics flow, this integration also installs a dashboard. Here are the **Summary** and **CPU** sections of a dashboard displaying OpenBSD host metrics.

{% include image.md src="images/db_openbsd_cpu.png" width="80" %}

## OpenBSD Host Setup



### Step 1: Install and Configure the Wavefront Proxy Manually

1. Create a directory `wavefront-proxy` and change the directory:{% raw %}
   ```
   mkdir wavefront-proxy
   cd wavefront-proxy
   ```
{% endraw %}
2. Download the [Wavefront proxy jar](https://wavefront-cdn.s3-us-west-2.amazonaws.com/bsd/proxy-uber.jar):{% raw %}
   ```
   curl -o proxy-uber.jar https://wavefront-cdn.s3-us-west-2.amazonaws.com/bsd/proxy-uber.jar
   ```
{% endraw %}
3. Create a directory `conf` and download the `wavefront.conf`, `log4j2.xml` and `preprocessor_rules.yaml` files into the `conf` directory:{% raw %}
   ```
   mkdir conf
   curl -o ./conf/wavefront.conf https://wavefront-cdn.s3-us-west-2.amazonaws.com/bsd/wavefront.conf
   curl -o ./conf/log4j2.xml https://raw.githubusercontent.com/wavefrontHQ/wavefront-proxy/master/pkg/etc/wavefront/wavefront-proxy/log4j2.xml.default
   curl -o ./conf/preprocessor_rules.yaml https://raw.githubusercontent.com/wavefrontHQ/wavefront-proxy/master/pkg/etc/wavefront/wavefront-proxy/preprocessor_rules.yaml.default
   ```
{% endraw %}
4. **Authentication Configuration** - You can select the authentication type - **OAuth App** or **API token**. This option is available **only** when your service is onboarded to the VMware Cloud Services platform. Otherwise, continue with the steps below. For the most recent instructions, see the steps on the **Setup** tab of the integration in the Operations for Applications user interface.
Open the `conf/wavefront.conf` file in edit mode and add the following proxy properties:{% raw %}
   ```
   server = https://YOUR_CLUSTER.wavefront.com/api/
   Authentication Property = If your service is not onboarded to the VMware Cloud Services platform, provide a valid Operations for Applications API token. If your service is onboarded to the VMware Cloud Services platform, an App ID, App Secret, and Organization ID or a valid API token generated in the VMware Cloud Services Console.
   hostname = "HOSTNAME"
   graphitePorts = 2003
   graphiteFormat = 2
   graphiteDelimiters = _
   ```
{% endraw %}
5. Start the Wavefront proxy service:{% raw %}
   ```
   java -XX:OnOutOfMemoryError="kill -1 %p" \
   -Dlog4j.configurationFile=./conf/log4j2.xml -Djava.util.logging.manager=org.apache.logging.log4j.jul.LogManager \
   -Djavax.net.debug=summary -jar ./proxy-uber.jar \
   -f conf/wavefront.conf \
   --preprocessorConfigFile ./conf/preprocessor_rules.yaml &
   ```
{% endraw %}
   **NOTE:**
   * If Java is not installed, run `pkg install openjdk8` to install jdk and set the path.
   * If the proxy fails to start with an `Error requesting exclusive access to the buffer lock file`, execute the below command and start the proxy (Step 5){% raw %}
      ```
      mkdir -p /var/spool/wavefront-proxy
      ```
{% endraw %}
6. Verify that the proxy has registered with the Wavefront server.

### Step 2: Install and Configure the Collectd Daemon Manually

1. Run the command `pkg_add -v collectd` to install the Collectd package.
2. Open the `/etc/collectd.conf` file for edit, add the following information, and save the file.{% raw %}
   ```
   # Global settings for the daemon.
   Hostname    "HOSTNAME"
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
      <Node "HOSTNAME">
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



