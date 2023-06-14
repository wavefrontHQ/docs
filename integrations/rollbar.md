---
title: Rollbar Integration
tags: [integrations list]
permalink: rollbar.html
summary: Learn about the Rollbar Integration.
---
## Rollbar Integration

Rollbar provides a live error feed from applications that includes complete stack traces and contextual data. You can find errors quickly and track who is affected by each error. This integration installs and configures Telegraf to send Rollbar events into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. For example, here's the Overview section of a dashboard that displays Rollbar metrics.

{% include image.md src="images/Rollbar_Dashboard.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Rollbar Setup



### Step 1. Install the Telegraf Agent

This integration uses the Webhooks input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Configure Telegraf Webhooks Input Plugin

Create a file called `rollbar.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:

{% raw %}
```
# # A Webhooks Event collector
[[inputs.webhooks]]
#   ## Address and port to host Webhook listener on
  service_address = ":1619"
#
  [inputs.webhooks.rollbar]
     path = "/rollbar"

```
{% endraw %}

Refer to [Telegraf documentation](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/webhooks) for more details on the configuration.


### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.

### Setp 4. Configure Rollbar Webhooks Services

To capture events from Rollbar:

    1. Log in to the Rollbar web interface.
    2. In the Notifications section, select Webhook.

See the [Rollbar documentation](https://rollbar.com/docs/webhooks/) for details on configuring the Rollbar webhook.



