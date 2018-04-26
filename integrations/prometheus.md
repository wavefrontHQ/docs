---
title: Prometheus Integration
tags: []
permalink: prometheus.html
summary: Learn about the Wavefront Prometheus Integration.
---
## Prometheus Integration

Prometheus is an open-source monitoring and alerting toolkit. This integration installs and configures Telegraf to collect Prometheus format metrics. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).


To see the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Prometheus Setup



### Step 1. Install the Telegraf Agent

This integration uses the Prometheus input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Run a command to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy.

### Step 2. Configure Prometheus Input Plugin

Create a file called `prometheus.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
# Read metrics from one or many prometheus clients
[[inputs.prometheus]]
  ## An array of urls to scrape metrics from.
  urls = ["http://localhost:9100/metrics"]

  ## Use bearer token for authorization
  # bearer_token = /path/to/bearer/token

  ## Specify timeout duration for slower prometheus clients (default is 3s)
  # response_timeout = "3s"

  ## Optional SSL Config
  # ssl_ca = /path/to/cafile
  # ssl_cert = /path/to/certfile
  # ssl_key = /path/to/keyfile
  ## Use SSL but skip chain & host verification
  # insecure_skip_verify = false
```

Replace the urls with your server address.

```
urls = ["http://[your_server_address]/metrics"]
```
{% endraw %}

### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.
