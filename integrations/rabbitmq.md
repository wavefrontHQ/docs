---
title: RabbitMQ Integration
tags: [integrations list]
permalink: rabbitmq.html
summary: Learn about the Wavefront RabbitMQ Integration.
---
## RabbitMQ Integration

RabbitMQ is a popular open source message broker. This integration installs and configures Telegraf to send RabbitMQ metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the node section of a dashboard displaying RabbitMQ metrics:

{% include image.md src="images/rabbitmq_node.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## RabbitMQ Setup



### Step 1. Install the Telegraf Agent

This integration uses the RabbitMQ input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Run a command to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy.

### Step 2. Enable the RabbitMQ Management Plugin

This integration requires the [RabbitMQ Management Plugin](https://www.rabbitmq.com/management.html) to be enabled on the RabbitMQ server.

To enable the management plugin:{% raw %}
```
rabbitmq-plugins enable rabbitmq_management
```

### Step 3. Configure RabbitMQ Input Plugin

Create a file called `rabbitmq.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:

```
 [[inputs.rabbitmq]]
  url = "http://your.rabbitmq.server:15672"
  username = "guest"
  password = "guest"
```

Modify the `url`, `username` and `password` properties appropriately.

**Note:** The RabbitMQ Management API is accessed over port `15672` by default. Modify the port in the `url` if different.

To monitor specific nodes, include the `nodes` property. For example:
```
  nodes = ["rabbit@node1", "rabbit@node2"]
```
{% endraw %}
If not specified metrics for all nodes are gathered.

Configure additional `[[inputs.rabbitmq]]` entries to monitor multiple RabbitMQ instances.  

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.
