---
title: Fluentd Integration
tags: [integrations list]
permalink: fluentd.html
summary: Learn about the Wavefront Fluentd Integration.
---
## Fluentd Integration

Fluentd is an open source data collector for a unified logging layer. This integration installs and configures Telegraf to send Fluentd metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a section of a dashboard displaying Fluentd metrics:

{% include image.md src="images/fluentd_dashboard.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Fluentd Setup

  This integration uses Telegraf's Fluentd input plugin to fetch the metrics from Fluentd and push them to Wavefront.

  



### Step 1: Install the Telegraf Agent

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability?utm_source=docs.vmware.com&utm_medium=referral&utm_campaign=docs-front-page){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2: Ensure the monitor_agent plugin is configured on Fluentd

  In the Fluentd configuration file `/etc/td-agent/td-agent.conf`, ensure that the monitor_agent plugin is configured as in the example below:
{% raw %}
  ```
  <source>
    @type monitor_agent
    bind 0.0.0.0
    port 24220
  </source>
  ```
{% endraw %}

### Step 3: Configure the Fluentd Input Plugin on Telegraf

  Create a `fluentd.conf` file in `/etc/telegraf/telegraf.d` and enter the Fluentd plugin configuration as in the following example snippet:
{% raw %}
   ```
# Read metrics exposed by fluentd monitor_agent plugin
[[inputs.fluentd]]
  ## This plugin reads information exposed by fluentd (using /api/plugins.json endpoint).
  ##
  ## Endpoint:
  ## - only one URI is allowed
  ## - https is not supported
  endpoint = "http://example.com:24220/api/plugins.json"

  ## Define which plugins have to be excluded (based on "type" field - e.g. monitor_agent)
  exclude = [
          "monitor_agent",
          "dummy"
  ]
   ```
{% endraw %}
### Step 4: Restart Telegraf

  Run `sudo service telegraf restart` to restart your Telegraf agent.





