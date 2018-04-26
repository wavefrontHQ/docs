---
title: Kong Integration
tags: []
permalink: kong.html
summary: Learn about the Wavefront Kong Integration.
---
## Kong Integration

Kong is an open-source Microservice API gateway.
This integration installs and configures Telegraf to send Kong metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the Summary section of the dashboard.
{% include image.md src="images/kong_dashboard-1.png" width="80" %}


To see the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Kong Setup



### Step 1. Install the Telegraf Agent

This integration uses the http input plugin for Telegraf to extract metrics from Kong.

Run a command to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy.

### Step 2. Enable the Kong input plugin

Create a file called `kong.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
   ```
   [[inputs.http]]
   ## One or more URLs from which to read formatted metrics
   urls = [
   "http://<serverip>:8001/status"
   ]
   data_format ="json"
   name_prefix = "kong."
```
{% endraw %}
### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.
