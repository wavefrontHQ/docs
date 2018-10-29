---
title: FreeBSD Host Integration
tags: [integrations list]
permalink: freebsd.html
summary: Learn about the Wavefront FreeBSD Host Integration.
---
## FreeBSD Host Integration

FreeBSD is a free and open-source Unix-like operating system. Monitoring FreeBSD hosts is easy with Wavefront. This integration steps you through installing and configuring the Wavefront proxy and the Telegraf. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here are the **Summary** and **CPU** sections of a dashboard displaying FreeBSD host metrics.

{% include image.md src="images/db_freebsd_cpu.png" width="80" %}

## FreeBSD Host Setup



### Step 1: Install and Configure the Wavefront Proxy Manually

1. Download the [Wavefront proxy jar](https://s3-us-west-2.amazonaws.com/wavefront-cdn/bsd/proxy-4.26-uber.jar) and [Wavefront config file](https://s3-us-west-2.amazonaws.com/wavefront-cdn/bsd/wavefront.conf).
2. Open the `wavefront.conf` file for edit, add the following proxy properties and save the file:{% raw %}
   ```
   server = https://YOUR_CLUSTER.wavefront.com/api/
   token = YOUR_API_TOKEN
   hostname = HOSTNAME
   ``` 
   Here, the `hostname` field is for the machine on which the proxy is running. The name can have alphanumeric characters and periods, and must be unique. Wavefront does not use the hostname to tag your data but uses it to tag data internal to the proxy, such as JVM statistics, per-proxy point rates, and so on.
5. Start the Wavefront proxy service:
   ```
   sudo java -cp ./proxy-4.26-uber.jar \
   -XX:+AggressiveHeap -Xss2049k -XX:OnOutOfMemoryError="kill -1 %p" \
   -debug com.wavefront.agent.PushAgent -f ./wavefront.conf &
   ```
**NOTE:** If Java is not installed, run `pkg install openjdk8`.
6. Verify that the proxy has registered with the Wavefront server.

### Step 2: Install and Configure the Telegraf Agent Manually

1. Download the Telegraf package: [amd64](https://dl.influxdata.com/telegraf/releases/telegraf-1.5.2_freebsd_amd64.tar.gz) / [i386](https://dl.influxdata.com/telegraf/releases/telegraf-1.5.2_freebsd_i386.tar.gz)
2. Extract the `telegraf-*.tar.gz` file and change the working directory to the extracted directory:
   `cd telegraf`
3. Open the `./etc/telegraf/telegraf.conf` file for edit, add the following information and save the file.
   ```
   [[outputs.wavefront]]
     host = "WAVEFRONT_PROXY_ADDRESS"
     port = 2878
     metric_separator = "."
     source_override = ["hostname", "agent_host", "node_host"]
     convert_paths = true

   # Enable net plugin
   [[inputs.net]]
   ```
4. Start the Telegraf agent
   ```
   ./usr/bin/telegraf --config ./etc/telegraf/telegraf.conf
   ```
{% endraw %}
