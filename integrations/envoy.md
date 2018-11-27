---
title: Envoy Proxy Integration
tags: [integrations list]
permalink: envoy.html
summary: Learn about the Wavefront Envoy Proxy Integration.
---
## Envoy Proxy Integration

Envoy Proxy is a modern, high performance service proxy. It adds resilience and observability to your services. This integration installs and configures Telegraf to send Envoy Proxy metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a section of a dashboard displaying Envoy Proxy metrics:

{% include image.md src="images/envoy_dashboard_1.png" width="80" %}
{% include image.md src="images/envoy_dashboard_2.png" width="80" %}
{% include image.md src="images/envoy_dashboard_3.png" width="80" %}
{% include image.md src="images/envoy_dashboard_4.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Envoy Proxy Setup

This integration uses Telegraf's Prometheus input plugin to fetch the metrics from Envoy Proxy and push them to Wavefront. If you've already installed Telegraf on your server, you can skip to Step 2.



### Step 1: Install the Telegraf Agent

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](http://wavefront.com/sign-up/?utm_source=docs.vmware.com&utm_medium=referral&utm_campaign=docs-front-page){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2: Enable the Prometheus Input Plugin

Create a file called `envoy.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
   ```
    # Read metrics exposed by Envoy Proxy
    [[inputs.prometheus]]
      urls = ["http://<envoy_proxy_admin_server_url>/stats?format=prometheus"]
   ```
{% endraw %}

### Step 3: Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.
  


