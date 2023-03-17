---
title: Mac Host Integration
tags: [integrations list]
permalink: mac.html
summary: Learn about the Mac Host Integration.
---
## Mac Host Integration

Monitoring Mac hosts is easy with Wavefront. This integration installs and configures Telegraf to send host metrics
into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. For example, here's the CPU section of a dashboard displaying Mac host metrics.

{% include image.md src="images/mac_db.png" width="80" %}

## Mac Host Setup



This integration uses various Telegraf input plugins. You can install the Wavefront proxy and Telegraf agent on the same host or on separate hosts. For proxy installation prerequisites, see the [Proxy Host Requirements](https://docs.wavefront.com/proxies_installing.html#proxy-host-requirements). You can choose automatic installation or manual installation and configuration.

Supported Version(s): MacOS Catalina (10.15) or later

### Install Automatically

Log in to your product instance and follow the instructions on the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

Check `/usr/local/var/log/wavefront/wavefront.log` and `/usr/local/var/log/telegraf.log` to verify the installation.

### Install and Configure Manually

You install the Wavefront proxy and Telegraf manually via [Homebrew](https://brew.sh/).

First install the Wavefront tap by running `brew tap wavefrontHQ/wavefront` on each host where you want to install either the proxy or agent.

#### Install, Configure, and Restart the Wavefront Proxy

To run the Wavefront proxy on a host:

1. Run `brew install wfproxy`.  
   **Note:** You may be prompted to install Xcode and Java.
1. Edit the file `/usr/local/etc/wavefront/wavefront-proxy/wavefront.conf` and configure the `server` and `token` properties:{% raw %}
   ```
   server=https://YOUR_CLUSTER.wavefront.com/api/
   token=YOUR_API_TOKEN
   ```
{% endraw %}
1. Run `brew services restart wfproxy`.
1. Check `/usr/local/var/log/wavefront/wavefront.log` to verify the installation.

**NOTE:** For wavefront-proxy version 7.0 and later, you will see a warning dialog when the proxy service starts or restarts. The dialog prompts you to accept incoming network connections for Java applications. Click **Allow** and the proxy service starts.

{% include image.md src="images/network_access.png" width="40" %}

#### Install, Configure, and Restart the Telegraf Agent

To run the Telegraf agent on a host:

1. Run `brew install telegraf`.
1. Create a file called `10-wavefront.conf` in `/usr/local/etc/telegraf.d` and enter the following, configuring the `host` property:{% raw %}
   ```
   [[outputs.wavefront]]
      host = "WAVEFRONT_PROXY_ADDRESS"
      port = 2878
      metric_separator = "."
      source_override = ["hostname", "agent_host", "node_host", "server"]
      convert_paths = true
   ```
{% endraw %}
   where WAVEFRONT_PROXY_ADDRESS is the IP address or hostname where your Wavefront proxy has been installed.
1. Edit the `telegraf.conf` file in `/usr/local/etc/` and enter the snippet `name_prefix = "mac."` to the following inputs:{% raw %}
   ```
   [[inputs.cpu]]
   [[inputs.disk]]
   [[inputs.diskio]]
   [[inputs.kernel]]
   [[inputs.mem]]
   [[inputs.net]]
   [[inputs.processes]]
   [[inputs.swap]]
   [[inputs.system]]
   ```
{% endraw %}
1. Run `brew services restart telegraf`.
1. Check `/usr/local/var/log/telegraf.log` to verify the installation.

### Upgrade the Wavefront Proxy and Telegraf Agent
Once installed, to upgrade the Wavefront Proxy and Telegeraf to the latest version:
1. Run `brew update`
2. Run `brew upgrade wfproxy` to upgrade the Wavefront Proxy
3. Run `brew upgrade telegraf` to upgrade Telegraf

### Uninstall the Wavefront Proxy and Telegraf Agent

To uninstall the Wavefront proxy and Telegraf agent, run:{% raw %}
```
bash -c "$(curl -s https://raw.githubusercontent.com/wavefrontHQ/homebrew-wavefront/master/sh/uninstall.sh)"
```
{% endraw %}



