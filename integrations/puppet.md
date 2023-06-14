---
title: Puppet Server Integration
tags: [integrations list]
permalink: puppet.html
summary: Learn about the Puppet Server Integration.
---
## Puppet Server Integration

Puppet is an open-source configuration management tool. It runs on many Unix-like systems as well as on Microsoft Windows, and includes its own declarative language to describe system configuration.

You can configure Puppet Server to emit Graphite formatted metrics using the Telegraf tcp_listener input plugin. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of the dashboard.

{% include image.md src="images/db_puppet.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Puppet Server Setup



### Step 1. Enable Puppet Server Graphite Support

1. In the Puppet Server console, click **Nodes > Classification**, and in the PE Infrastructure group, select the **PE Master** group.
1. On the Classes tab, in the `puppet_enterprise::profile::master` class, add/set these parameters:
    - **metrics_enabled** – Set to true (default value).
    - **metrics_graphite_enabled** – Set to true (false is the default value).
    - **metrics_graphite_host** – Enter the hostname for the agent node on which you're running the telegraf metrics collector.  This should be "localhost".
    - **metrics_graphite_port** – Set to 2003 (default value) or the port the Telegraf collector will be listening on.
    - **metrics_graphite_update_interval_seconds** – Enter a value to set update frequency in seconds. This setting is - optional, and the default value is 60.
    - **metrics_jmx_enabled** – Set to true (default value).
    - **metrics_server_id** – Enter the Puppet master hostname.
    - **profiler_enabled** – Set to true (default value).

   {% include image.md src="images/puppet_profile.png" width="80" %}

### Step 2. Install the Telegraf Agent

This integration uses the tcp_listener input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 3.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 3. Configure tcp_listener Input Plugin

Configure the Telegraf tcp_listener input plugin to receive the Puppet Server metrics. Create a file called `puppet-server.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.tcp_listener]]
  service_address = ":2003"
  allowed_pending_messages = 10000
  max_tcp_connections = 250
  data_format = "graphite"

  ## this line may need to be changed depending on how many dots in host name
  templates = ["puppetlabs.measurement.host.host.host.field*"]

  fielddrop = ["puppetdb.query.\\[*"]
  tagexclude = ["puppetlabs"]

  [inputs.tcp_listener.tags]
    ## optional point tags for all metrics
    puppet = "server1"
```
{% endraw %}

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.



