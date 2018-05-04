---
title: Consul Integration
tags: [integrations list]
permalink: consul.html
summary: Learn about the Wavefront Consul Integration.
---
## Consul Integration

Hashicorp Consul allows you to discover and configure services in your environment.
This integration installs and configures Telegraf to send Consul server metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some charts in the Consul dashboard.

{% include image.md src="images/consul.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Consul Setup



### Step 1. Install the Telegraf Agent

This integration uses the Consul input plugin for Telegraf to extract metrics from Consul.

Run a command to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy.

### Step 2. Enable the Consul input plugin

Create a file called `consul.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
   ```
   # # Gather health check statuses from services registered in Consul
   [[inputs.consul]]
   #   ## Most of these values default to the value configured at the Consul agent level.
   #   ## Optional Consul server address (default: "localhost")
   #   # address = "localhost"
   #   ## Optional URI scheme for the Consul server (default: "http")
   #   # scheme = "http"
   #   ## Optional ACL token used in every request (default: "")
   #   # token = ""
   #   ## Optional username used for request HTTP Basic Authentication (default: "")
   #   # username = ""
   #   ## Optional password used for HTTP Basic Authentication (default: "")
   #   # password = ""
   #   ## Optional data center to query (default: "")
   #   # datacentre = ""

   ```
{% endraw %}
### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.
