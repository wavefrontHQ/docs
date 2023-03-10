---
title: Pingdom Integration
tags: [integrations list]
permalink: pingdom.html
summary: Learn about the Pingdom Integration.
---
## Pingdom Integration

Pingdom lets you monitor the uptime and performance of your website and server. This integration installs and configures Telegraf to send Pingdom metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here are sections of a dashboard displaying Pingdom metrics:

{% include image.md src="images/pingdom_dashboard_1.png" width="80" %}
{% include image.md src="images/pingdom_dashboard_2.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Pingdom Setup



### Step 1: Install the Telegraf Agent
This integration uses Telegraf's Exec input plugin to fetch the metrics from Pingdom.
If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your product instance and follow the instructions on the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2: Download the Script

1. Download [pingdom-metrics-collector](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/pingdom/pingdom.py) onto your server.
2. Add the execute permissions to the downloaded file, e.g. `chmod +x <pingdom-metrics-collector>`

### Step 3: Get the Application Key
1. Log in to your Pingdom account and select **Integrations > The Pingdom API**. 
2. Click on the **Register Application** button to register new application.
3. Copy the application KEY.

### Step 4: Edit the Wavefront Output Plugin

Comment out the `source_override` property in the Wavefront output plugin.

### Step 5: Enable the Exec Input Plugin

Create a file called `pingdom.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
## Read metrics from Pingdom
[[inputs.exec]]
  ## Collecting metrics from only one Pingdom account is supported.
  ## Specify the command to collect the metrics from Pingdom.
  commands = ["python <path_to_pingdom-metrics-collector> -u <pingdom_user_name> -p <pingdom_password> -a <application-key"]

  ## Timeout for each command to complete.
  timeout = "2m"

  ## measurement name prefix
  name_prefix = "pingdom_"

  ## Data format to consume.
  data_format = "json"

  ## List of tag names to extract from top-level of JSON server response
  tag_keys = ["id","name","hostname","status","type","created","to","recurrencetype","repeatevery","from","description"]

## Configuration for telegraf agent
[agent]
  ## Default data collection interval for all inputs
  interval = "5m"
```
{% endraw %}

### Step 6. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.




