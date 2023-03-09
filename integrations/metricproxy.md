---
title: Metricproxy Integration
tags: [integrations list]
permalink: metricproxy.html
summary: Learn about the Metricproxy Integration.
---
## Metricproxy Integration

Metricproxy is an open source project from SignalFx that can aggregate metrics from multiple sources like Graphite (carbon), collectd, or SignalFx, and send them to servers using the carbon, collectd or SignalFx protocols. This integration describes how to configure Metricproxy to accept the time series data and send them to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).
## Metricproxy Setup
[Metricproxy](https://github.com/signalfx/metricproxy) can be configured to accept metrics in Graphite (carbon), collectd, or SignalFx format, and send them to the Wavefront proxy.

### Step 1. Configure Wavefront Proxy to Listen for Graphite Data

{% include proxy_graphite_config.md %}

### Step 2. Configure Metricproxy

Edit the metricproxy configuration file `/etc/sfdbconfig.conf` as below:{% raw %}
```
{
    "ForwardTo": [
        {
            "Name": "<wavefront proxy name>",
            "type": "carbon",
            "host": "<wavefront proxy IP or Host Name>",
            "port": 2003
        }
    ],
    "ListenFrom": [
        {
            "ListenAddr": "0.0.0.0:12003",
            "Type": "carbon"
        }
    ],
    "LocalDebugServer": "0.0.0.0:6009",
    "LogDir": "-"
}
```
{% endraw %}
See the [sfdbconfig.conf example](https://github.com/signalfx/metricproxy/blob/master/exampleSfdbproxy.conf) for more options.

### Step 3. Restart Metricproxy

Run `/etc/init.d/metricproxy restart`.


