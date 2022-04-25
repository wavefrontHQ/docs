---
title: Telegraf Troubleshooting
keywords:
tags: [data]
sidebar: doc_sidebar
permalink: telegraf_details.html
summary: Troubleshoot your Telegraf installation
---
A common way to collect and send metric data to Tanzu Observability by Wavefront is through the use of a Telegraf agent  configured to relay the metrics to a Wavefront proxy. This doc page has some Telegraf troubleshooting information. See [Proxy Troubleshooting](proxies_troubleshooting.html) for details on resolving proxy problems.

## Telegraf Connection Errors

When sending metrics from a Telegraf agent through a load balancer to a Wavefront proxy, you might see some broken connection messages in the logs. This can happen, for example, if metrics come from an AWS EC2 instance and pass through AWS ELB to a Wavefront proxy over a socket connection.

```
telegraf[xxx]: 2021-03-03T09:25:19Z E! [agent] Error writing to outputs.wavefront: Wavefront sending error: write tcp 192.168.xxx.xxx:36948->192.168.xxx.xx:2878: write: broken pipe
telegraf[xxx]: 2020-03-03T09:26:10Z I! connected to Wavefront proxy at address: 192.168.xxx.xx:2878
```


**Cause**

When the Wavefront output plugin is communicating over a socket connection, it  assumes a stable connection between the Telegraf agent and the Wavefront proxy. If, for example, a load balancer resets the connection after a set period of time (such as 60 seconds), the stable connection requirement is not satisfied.


**Workaround 1: Use HTTP**

Use the HTTP protocol instead of the socket connection. HTTP doesn't require a stable connection.
To change the output plugin to use HTTP mode, specify `url:port` in the `output.wavefront` Telegraf plugin.

For example:

```
[[outputs.wavefront]]
  url = "http://192.168.xxx.xxx:2878"
  metric_separator = "."
  source_override = ["hostname", "agent_host", "node_host"]
  convert_paths = true
```

See the [Wavefront Output Plugin on Github](https://github.com/influxdata/telegraf/tree/master/plugins/outputs/wavefront) for background.

**Workaround 2: Increase Load Balancer Timeout Value**

Instead of using HTTP, you can increase the load balancer idle connection timeout value, for example to 120 seconds. How that works depends on the load balancer that you are using.

## Telegraf Agent Tuning

When you send metrics from a Telegraf agent, either directly or through a Wavefront proxy, you can fine tune the agent to remove bottlenecks and to ensure all metrics are delivered in a timely manner.

Typically the absence of a particular metric or intermittent delivery of a metric indicates that you need to change the default Telegraf settings.

### Examine Telegraf Log Messages

Messages in the Telegraf logs might indicate which of the default settings need adjustment to handle all the metrics that are sent.

* **Metrics dropped**: The following message indicates that the buffer has been dropping metrics because the buffer isn't big enough to handle the number of metrics collected.

  To resolve this issue, you can increase the `metric_buffer_limit`.

   ```
   May 17 19:17:00 test-server1 telegraf[1562]: 2021-05-17T15:27:00Z W! [outputs.wavefront] Metric buffer overflow; 1956 metrics have been dropped
   ```

* **Metric batch size to large**: The following message  indicates that the metric_batch_size is too large to be flushed within the configured flush interval.
  To resolve this issue, adjust the flush interval.

   ```
   May 17 11:02:56 test-server2 telegraf[1468]: 2021-05-17T11:02:56Z W! [agent] ["outputs.wavefront"] did not complete within its flush interval
   ```

### Enable Agent Metrics Collection in the Telegraf Integration Dashboard

Set up the Telegraf integration to collect metrics for Telegraf agent performance.

1. Create a `telegraf.conf` file in `/etc/telegraf/telegraf.d`.
2. Add the following snippet
   ```
   # Collect internal Telegraf statistics
   [[inputs.internal]]
   ## If true, collect Telegraf memory stats.
   collect_memstats = true
   name_prefix = "telegraf."
   ```
3. Restart the Telegraf agent.

### Examine Data in Dashboards and Charts

After you've enabled agent metrics collection, you can examine Telegraf statistics:

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
In the GUI, find the integration.
<ol>
<li>Log in to your Wavefront instance. </li>
<li>Select <strong>Integrations</strong>.</li>
<li>Search for Telegraf and select that integration.</li>
</ol></td>
<td width="60%"><img src="/images/install_telegraf_dashboards.png" alt="Integration landing page for Telegraf, Install Dashboards button shows"></td>
</tr>
<tr>
<td width="40%">
Select and explore the dashboard.
<ol>
<li>Select the <strong>Dashboards</strong> tab.</li>
<li>Use the charts on the dashboard to look at plugin metrics that the the integration now gathers by default.</li>
</ol>
</td>
<td width="60%"><img src="images/telegraf_default_stats.png" alt="Gather Statistics screenshot of agent dashboard"><br/>
</td>
</tr>
</tbody>
</table>

### Clone the Default Dashboard and Customize Charts

To drill down even more, you can [clone the dashboard](ui_dashboards.html#edit-or-clone-a-dashboard) and add charts with custom queries in Wavefront Query Language (WQL).

For example:

1. Use queries. The following example query shows the rate of metrics collected for vSphere:

   `rate(ts("telegraf.internal_gather.metrics_gathered", input="vsphere")) * 60`

2. Plot the internal metrics collected from the Telegraf agent on a chart to show trends and help visualize potential areas that need adjustment. The following example chart plots the buffer size, buffer limit, and rate of dropped metrics.

  ![text](images/telegraf_custom_chart.png)

  The chart shows us that the Telegraf agent buffer size is hitting the buffer limit. Metrics are being dropped as a result.

### Fine-Tune Default Settings

The default settings for the input and output plugins are in the `telegraf.conf` file, which is in the following locations by default:
* Windows: `Program Files\Telegraf\telegraf.conf`
* Linux: `/etc/telegraf/telegraf.conf`

The following parameters might need adjustment:

<table style="width: 100%;">
<tbody>
<tr>
<td width="10%">interval</td>
<td width="90%">The default data collection interval for all inputs used by Telegraf. This setting specifies how frequently metric data are collected.</td>
</tr>
<tr>
<td width="10%">flush interval</td>
<td width="90%">Specifies how frequently to flush the collected metric data to the output plugin.</td>
</tr>
<tr>
<td width="10%">metric_batch_size</td>
<td width="90%">Size of the number of metrics that will be written to the output plugin at once.</td>
</tr>
<tr>
<td width="10%">metric_buffer_limit</td>
<td width="90%">If the inputs collected exceed this buffer limit, than all the overflow data will simply be dropped/discarded. The size needs to be large enough for the interval. </td>
</tr>
</tbody>
</table>

## Telegraf Upgrades

Just as the Wavefront proxies, the Telegraf agent is frequently upgraded. Keep both Wavefront proxy and Telegraf agents updated to benefit from security fixes and more. See the [Wavefront Proxy Obsolescence](wavefront_obsolescence_policy.html#wavefront-proxy) information for proxy obsolescense details.

Follow these steps:

1. Upgrade the proxy to the latest available version.
  * See [Upgrade a Proxy](proxies_installing.html#upgrade-a-proxy) for the process.
  * See the [Proxy Release Notes on Github](https://github.com/wavefrontHQ/wavefront-proxy/releases) for recent new features.

2. Upgrade the Telegraf agent by downloading the binaries through https://portal.influxdata.com/downloads/. Installation packages for Linux are also available at https://packagecloud.io/wavefront/telegraf.
   For configuration details, see these links:

   * **Windows**: [Telegraf Configuration Windows](windows.html#install-the-telegraf-agent)
   * **Linux**: [Telegraf Configuration Linux](linux.html#install-and-configure-wavefront-proxy-and-telegraf-agent-manually)
   * **MacOS**: [Telegraf Configuration Mac](mac.html#install-configure-and-restart-the-telegraf-agent)


## See Also

* [Installing Telegraf Manually](proxies_manual_install.html#installing-telegraf-manually)
