---
title: Puppet Server Integration
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_puppet_server.html
summary: Learn how to send data emitted by Puppet Server to Wavefront.
---
[Puppet](https://puppet.com/) is an open-source configuration management tool. It runs on many Unix-like systems as well as on Microsoft Windows, and includes its own declarative language to describe system configuration.
 
You can configure Puppet Server to emit Graphite formatted metrics using the Telegraf tcp_listener input plugin. Wavefront maintains a [Telegraf](integrations_telegraf.html) output plugin that will send metrics to your [Wavefront proxy](proxies_managing.html).
 
## Metric Collection

1. Enable Puppet Server [Graphite metrics support](https://docs.puppet.com/pe/latest/puppet_server_metrics.html#enabling-puppet-servers-graphite-support).
  1. In the Puppet Server console, click **Nodes > Classification**, and in the PE Infrastructure group, select the **PE Master** group.
  1. On the Classes tab, in the puppet_enterprise::profile::master class, add/set these parameters:
      - **metrics_enabled** – Set to true (default value).
      - **metrics_graphite_enabled** – Set to true (false is the default value).
      - **metrics_graphite_host** – Enter the hostname for the agent node on which you're running the telegraf metrics collector.  This should be "localhost".
      - **metrics_graphite_port** – Set to 2003 (default value) or the port the Telegraf collector will be listening on.
      - **metrics_graphite_update_interval_seconds** – Enter a value to set update frequency in seconds. This setting is - optional, and the default value is 60.
      - **metrics_jmx_enabled** – Set to true (default value).
      - **metrics_server_id** – Enter the Puppet master hostname.
      - **profiler_enabled** – Set to true (default value).

      ![puppet_profile](images/puppet_profile.png)
1. [Install Telegraf](integrations_telegraf.html) with the Wavefront output plugin, configured to communicate with your Wavefront proxy.
1. Configure the Telegraf tcp_listener input plugin to receive the Puppet Server metrics. You can use this [10-puppet-server.conf](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/puppet/telegraf/10-puppet-server.conf) file deployed to your Telegraf configuration directory (`/etc/telegraf/telegraf.d` by default).
1. Restart the Telegraf service.
 
## Dashboard
Once you have started collecting metrics from your Puppet Master server, you can deploy this dashboard.

![db puppet](images/db_puppet.png)


