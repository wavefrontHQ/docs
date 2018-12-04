---
title: Telegraf Integration
tags: [integrations list]
permalink: telegraf.html
summary: Learn about the Wavefront Telegraf Integration.
---
## Telegraf Integration

Telegraf is a light-weight server process capable of collecting, processing, and aggregating metrics. This integration describes how to install and configure Telegraf to send metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow of the system and the applications, this integration also allows you to monitor the performance of Telegraf and installs a dashboard. Here's a preview of Telegraf dashboard:

**Note:** Telegraf dashboard shows `NO DATA` if the `internal` plugin is not enabled.

{% include image.md src="images/telegraf_dashboard.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Telegraf Setup



You can choose automatic installation or manual installation and configuration.

### Install Wavefront Proxy and Telegraf Agent Automatically

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](http://wavefront.com/sign-up/?utm_source=docs.vmware.com&utm_medium=referral&utm_campaign=docs-front-page){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Install and Configure Wavefront Proxy and Telegraf Agent Manually

*Linux*: Follow the steps under [linux/setup](../linux/setup).

*Mac*: Follow the steps under [mac/setup](../mac/setup).

*Windows*: Follow the steps under [windows/setup](../windows/setup).

### Insights into Telegraf performance (Optional)

If you want to monitor the performance of the Telegraf agent, follow these steps:

Create a `telegraf.conf` file in `/etc/telegraf/telegraf.d` and add the following snippet:
{% raw %}
    ```
    # Collect internal Telegraf statistics
    [[inputs.internal]]
      ## If true, collect Telegraf memory stats.
        collect_memstats = true

        name_prefix = "telegraf."
    ```
{% endraw %}
**Note:** The Telegraf dashboard shows `NO DATA` if this plugin is not enabled.

### Restart Telegraf

{% include telegraf_restart.md %}
