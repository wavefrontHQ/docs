---
title: Convox Integration
tags: [integrations list]
permalink: convox.html
summary: Learn about the Convox Integration.
---
## Convox Integration

Convox simplifies managing infrastructure and applications. This integration installs and configures Telegraf to send Convox metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here are sections of a dashboard displaying Convox metrics:

{% include image.md src="images/convox_dashboard_1.png" width="80" %}
{% include image.md src="images/convox_dashboard_2.png" width="80" %}
{% include image.md src="images/convox_dashboard_3.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Convox Setup



### Step 1: Install the Telegraf Agent
This integration uses Telegraf's Exec input plugin to fetch the metrics from Convox.
If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your product instance and follow the instructions on the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2: Download the Script

1. Download [convox-metrics-collector](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/convox/convox.py) onto your server.
2. Add the execute permissions to the downloaded file, e.g `chmod +x <convox-metrics-collector>`

### Step 3: Get the Convox API Key
1. Log in to your Convox account and select **Account > API Key**. 
2. Click on the **Generate API Key** button to generate the API Key.

### Step 4: Enable the Exec Input Plugin

Create a file called `convox.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
   ```
      # # Read metrics from convox 
      [[inputs.exec]]
        ## Collecting metrics from only one Convox account is supported.
        ## Specify the command to collect the metrics from Convox.
        commands = ["<path_to_convox-metrics-collector> -a <convox_api_key>"]

        ## Timeout for each command to complete.
        timeout = "30s"

        ## measurement name prefix
        name_prefix = "convox_"

        ## Data format to consume.
        data_format = "json"

        ## List of tag names to extract from top-level of JSON server response
        tag_keys = [
          "organization","rack","name","app","id","type","description","logs",
          "process","release","reason","status","started","ended"
        ]

      # Configuration for telegraf agent
      [agent]
        ## Default data collection interval for all inputs
        interval = "10m"
   ```
{% endraw %}

### Step 5. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.




