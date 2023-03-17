---
title: Varnish Cache Integration
tags: [integrations list]
permalink: varnishcache.html
summary: Learn about the Varnish Cache Integration.
---
## Varnish Cache Integration

Varnish Cache is a web application accelerator. This integration installs and configures Telegraf to send Varnish Cache server metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some charts in the Varnish Cache dashboard.

{% include image.md src="images/varnishcache.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Varnish Cache Setup



### Step 1. Install the Telegraf Agent

This integration uses the Varnish input plugin for Telegraf to extract metrics from Varnish HTTP Cache.

Log in to your product instance and follow the instructions on the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Enable the Varnish input plugin

Create a file called `varnish.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
   ```
   # A plugin to collect stats from Varnish HTTP Cache
 [[inputs.varnish]]
   ## If running as a restricted user you can prepend sudo for additional access:
   use_sudo = false

   ## The default location of the varnishstat binary can be overridden with:
   binary = "/usr/bin/varnishstat"

   ## By default, Telegraf gathers stats for 3 metric points.
   ## Setting stats will override the defaults shown below.
   ## stats may also be set to ["all"], which will collect all stats
   stats = ["*"]

   ## Optional name for the varnish instance (or working directory) to query
   ## Usually appened after -n in Varnish CLI
   #name = instanceName

   ```
{% endraw %}
### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.



