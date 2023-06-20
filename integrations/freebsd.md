---
title: FreeBSD Host Integration
tags: [integrations list]
permalink: freebsd.html
summary: Learn about the FreeBSD Host Integration.
---
## FreeBSD Host Integration

FreeBSD is a free and open-source Unix-like operating system. Monitoring FreeBSD hosts is easy with Wavefront. This integration steps you through installing and configuring the Wavefront proxy and the Telegraf. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here are the **Summary** and **CPU** sections of a dashboard displaying FreeBSD host metrics.

{% include image.md src="images/db_freebsd_cpu.png" width="80" %}

## FreeBSD Host Setup



### Step 1: Install and Configure the Wavefront Proxy Manually

1. Create a directory `wavefront-proxy` and change the directory:{% raw %}
   ```
   mkdir wavefront-proxy
   cd wavefront-proxy
   ```
{% endraw %}
2. Download the [Wavefront proxy jar](https://wavefront-cdn.s3-us-west-2.amazonaws.com/bsd/proxy-uber.jar):{% raw %}
   ```
   curl -o proxy-uber.jar https://wavefront-cdn.s3-us-west-2.amazonaws.com/bsd/proxy-uber.jar
   ```
{% endraw %}
3. Create a directory named `conf` and download the `wavefront.conf`, `log4j2.xml` and `preprocessor_rules.yaml` files in the `conf` directory:{% raw %}
   ```
   mkdir conf
   curl -o ./conf/wavefront.conf https://wavefront-cdn.s3-us-west-2.amazonaws.com/bsd/wavefront.conf
   curl -o ./conf/log4j2.xml https://raw.githubusercontent.com/wavefrontHQ/wavefront-proxy/master/pkg/etc/wavefront/wavefront-proxy/log4j2.xml.default
   curl -o ./conf/preprocessor_rules.yaml https://raw.githubusercontent.com/wavefrontHQ/wavefront-proxy/master/pkg/etc/wavefront/wavefront-proxy/preprocessor_rules.yaml.default
   ```
{% endraw %}
4. [[CSPAuthMethodSelector]]
Open the `conf/wavefront.conf` file in edit mode and update the following list of properties:{% raw %}
   ```
   server = https://YOUR_CLUSTER.wavefront.com/api/
   [[CSPAuthCreds user-token-prefix="token"]]
   hostname = "HOSTNAME"
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
   * If Java is not installed, run `pkg install openjdk8` to install jdk and set the path`.
   * If the proxy fails to start with an `Error requesting exclusive access to the buffer lock file`, execute the below command and start the proxy (Step 5){% raw %}
      ```
      mkdir -p /var/spool/wavefront-proxy
      ```
{% endraw %}
6. Verify that the proxy has registered with the Wavefront server.

### Step 2: Install and Configure the Telegraf Agent Manually

1. Download the Telegraf binary for FreeBSD from https://github.com/influxdata/telegraf/releases.
2. Extract the `telegraf-*.tar.gz` file and change the working directory to the extracted directory:{% raw %}
   ```
   tar xf telegraf-*.tar.gz
   cd telegraf
   ```
{% endraw %}
3. Open the `./etc/telegraf/telegraf.conf` file for edit, and

   a. Comment the `influxdb` output plugin:{% raw %}
      ```
      #[[outputs.influxdb]]
      ```
{% endraw %}
   b. Enable the `wavefront` output plugin by adding below snippet:{% raw %}
      ```
      [[outputs.wavefront]]
        url = "WAVEFRONT_PROXY_HOSTNAME:2878"
        prefix = "bsd."
        metric_separator = "."
        source_override = ["hostname", "agent_host", "node_host"]
        convert_paths = true
      ```
{% endraw %}
   c. Uncomment the `net` input plugin, if commented.{% raw %}
      ```
      # Enable net plugin
      [[inputs.net]]
      ```
{% endraw %}
4. Start the Telegraf agent{% raw %}
   ```
   ./usr/bin/telegraf --config ./etc/telegraf/telegraf.conf
   ```
{% endraw %}



