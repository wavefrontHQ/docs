---
title: Installing Wavefront Proxies
keywords: Ansible
tags: [proxies]
sidebar: doc_sidebar
permalink: proxies_installing.html
summary: Learn how to install and run Wavefront proxies.
---
Before metrics can begin streaming to Wavefront from a host or application you must add a Wavefront proxy to your installation. This article describes several methods for installing a Wavefront proxy: scripted installation and manual installation. Both methods set up a basic configuration. The scripted installation optionally allows you to install and configure a [Telegraf collector agent](integrations_telegraf.html).

{% include shared/permissions_view.html entity="proxies" entitymgmt="Proxy" %}


## Requirements

Before installing a proxy, ensure that you have:

- Wavefront server API URL in the format `https://<wavefront_instance>.wavefront.com/api/`.
- An account on the Wavefront system.
- A host machine that:
  - Has Internet access. Run `timeout 3s curl -fIsS <wavefront_instance>.wavefront.com/api/` from this host and make sure you get a response rather than timing out.
  - Has sufficient memory.  The host machine does not need to be dedicated to running the Wavefront proxy; the proxy does not use a large amount of CPU, memory, or storage. However, we recommend running the proxy on a machine with at least 4GB of free memory.
  - Runs one of the following operating systems:
    - Ubuntu 12.04, 14.04, 16.04
    - CentOS 6.5, 7
    - RHEL 6, 7
    - Debian 7, 8, 9, 10
    - Amazon Linux

    If you do not see your operating system, contact [{{site.support_email}}](mailto:support.wavefront.com).

## Scripted Installation on a Single Host

The Wavefront application has a wizard that guides you through installing a Wavefront proxy and optionally a Telegraf collector agent and setting up a basic configuration using scripts. To run the wizard:

1. Open the Wavefront application UI.
1. Select **Browse > Proxies**.
1. Select **Add > New Proxy** at the top of the filter bar. The Populate Your Data screen displays.
1. Under **WAVEFRONT PROXY**, click Add Now <i class="fa fa-arrow-right"/> - Add a Wavefront proxy and optionally a Telegraf collector agent. A script displays that runs a Wavefront CLI command to install a Wavefront proxy on your machine.
    1. Copy the script and run on your host.
    1. When the installation completes, click **Next**. After the proxy contacts the Wavefront server, the screen adds the proxy name.
    1. Click **Next**. Instructions for running a script to install the Telegraf collector agent display.
    1. Optionally copy the script and run on your host.
    1. Click **Next**, then **Done** twice. The Proxies page displays. Verify that your proxy is listed.

You can also install and run the Wavefront CLI directly. For more information, see [Wavefront CLI](wavefront_cli.html).

## Manual Package Installation on a Single Host
You can manually install a Wavefront proxy .rpm or .deb package available at [Wavefront proxy packages](https://packagecloud.io/wavefront/proxy). The installation packages include an interactive script for configuring the proxy. To install a proxy package and set up a basic configuration:

1. Run one of the scripts that set up the installation process.
1. Go to the Wavefront proxy directory created during the package installation: `cd /opt/wavefront/wavefront-proxy`.
1. Run the interactive configuration script: `bin/autoconf-wavefront-proxy.sh`. The script prompts you for the following properties:
  - **server** - The Wavefront server API URL.
  - **token** - An API token. To get a token, see [Generating an API Token](wavefront_api.html#generating-an-api-token).
  - **hostname** - A name (alphanumeric plus periods) unique across your entire account representing the machine that the proxy is running on. The hostname is not used to tag your data; rather, it's used to tag data internal to the proxy, such as JVM statistics, per-proxy point rates, and so on.
  - **enable graphite** - Indicate whether to enable the Graphite format. See [Sending Graphite Data to Wavefront](integrations_graphite.html#sending-graphite-data-to-wavefront) for details on Graphite configuration.
When the interactive configuration is complete, the Wavefront proxy configuration at `/etc/wavefront/wavefront-proxy/wavefront.conf` is updated with the input that you provided and the wavefront-proxy service is started.
1. [Verify that the proxy has registered](proxies_managing.html#viewing-registered-proxies) with the Wavefront server.

<a name="ansible"></a>

## Installing Proxies on Multiple Hosts

You can automate Wavefront proxy and Telegraf collector agent installation on multiple hosts with Ansible. ![ansible](images/ansible.png)
 
This is useful when you want to automatically deploy multiple proxies and/or agents across your infrastructure at once.

### Requirements

- Wavefront [API token](wavefront_api.html#api-tokens)
- Working knowledge of Ansible
- [The Wavefront Ansible Galaxy Role](https://galaxy.ansible.com/wavefrontHQ/wavefront-ansible/)
 
For detailed instructions, see the [documentation for wavefront-ansible on Ansible Galaxy](https://galaxy.ansible.com/wavefrontHQ/wavefront-ansible/#readme).

## Managing Proxy Services
<a name="restart"></a>

### Starting and Stopping a Proxy
 
To start, stop, or restart a proxy, run the following commands on the host on which the proxy is running:

```shell
$ service wavefront-proxy [start | stop | restart]
```

### Checking Proxy Service Status
 
To check if the proxy is running, run the following command:

```shell
$ service wavefront-proxy status
```

In your Wavefront instance, select **Browse > Proxies** and verify that the proxy is listed there using the hostname set in the proxy configuration file.

On the proxy host machine you can view `/var/log/wavefront/wavefront.log` to see whether there are any connection issues. 

