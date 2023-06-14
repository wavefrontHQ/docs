---
title: Windows Service Integration
tags: [integrations list]
permalink: winserv.html
summary: Learn about the Windows Service Integration.
---
## Windows Services

Microsoft Windows Services are programs that are long running in the background on a Windows system. Services can be configured to kick-start when the system boots, or to be triggered by an event or manually. This integration explains how to install and configure Telegraf to collect Windows Services status data and send it into Wavefront.

### Metrics

This integration generates these metrics for each service:

* `win.services.state` metric, which can have the following values:
    - 1 - stopped
    - 2 - start pending
    - 3 - stop pending
    - 4 - running
    - 5 - continue pending
    - 6 - pause pending
    - 7 - paused


* `win.services.startup.mode` metric, which can have the following values:
    - 0 - boot start
    - 1 - system start
    - 2 - auto start
    - 3 - demand start
    - 4 - disabled   

All metrics have the following point tags:
- service_name
- display_name

### Step 1: Set up the Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network, install a proxy.

### Step 2: Install the Telegraf Agent

{% include windows_telegraf.md %}

### Step 3. Configure Telegraf

Edit the `telegraf.conf` file located in `Program Files\Telegraf` and enter the following snippet:
{% raw %}
```
[[inputs.win_services]]
  service_names = [
    "LanmanServer",
    "TermService",
  ]

```
{% endraw %}

Use `service_names` to specify the names of the services to monitor. Leave `service_names` empty to monitor all available services on the host.
You can find the list of services using the Windows Service Management console.

### Step 4. Restart Telegraf

After any changes restart your Telegraf agent service.{% raw %}
```
net stop telegraf
net start telegraf
```
{% endraw %}

### Step 5. Create an Alert (Optional)

You can create an alert on the `win.services.state` metric.
To create the alert:
1. Select **Alerts** and click the **Create Alert** button, located at the top of the filter bar.
2. Configure the alert properties (notification targets, condition checking frequency, etc.).



