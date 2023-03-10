---
title: Hashicorp Vault Integration
tags: [integrations list]
permalink: vault.html
summary: Learn about the Hashicorp Vault Integration.
---
## Hashicorp Vault Integration

Hashicorp Vault provides a unified interface for securely storing and accessing secrets such as API keys, passwords, or certificates

This integration installs and configures Telegraf to send Hashicorp Vault metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some charts in the Hashicorp Vault dashboard.

{% include image.md src="images/hashicorp-vault-dashboard.PNG" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Hashicorp Vault Setup



### Step 1: Install the Telegraf Agent

This integration uses the statsd input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your product instance and follow the instructions on the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!


### Step 2. Configure the statsd Input Plugin for getting Vault metrics

Edit the telegraf.conf file located in the Telegraf install directory and enter the following snippet:
{% raw %}
```
# Statsd Server
[[inputs.statsd]]
  protocol = "udp"
## Address and port to host UDP listener on
  service_address = ":8125"
## Delete gauges every interval (default=false)
  delete_gauges = true
## Delete counters every interval (default=false)
  delete_counters = true
## Delete sets every interval (default=false)
  delete_sets = true
## Delete timings & histograms every interval (default=true)
  delete_timings = true
## Percentiles to calculate for timing & histogram stats
  percentiles = [90]
  name_prefix = "vault."

## Parses tags in the datadog statsd format
## http://docs.datadoghq.com/guides/dogstatsd/
  parse_data_dog_tags = true

## Statsd data translation templates, more info can be read here:
## https://github.com/influxdata/telegraf/blob/master/docs/DATA_FORMATS_INPUT.md#graphite
  templates = [
    "vault.vault_vault_1.* .hostname.measurement.field.*",
    "vault.vault_vault_2.* .hostname.measurement.field.*",
    "vault.vault_vault_3.* .hostname.measurement.field.*",
    "vault.* .measurement.field*"
]
## separator to use between elements of a statsd metric
  metric_separator = "_"

## Number of UDP messages allowed to queue up, once filled,
## the statsd server will start dropping packets
  allowed_pending_messages = 10000

## Number of timing/histogram values to track per-measurement in the
## calculation of percentiles. Raising this limit increases the accuracy
## of percentiles but also increases the memory usage and cpu time.
  percentile_limit = 1000

[[inputs.procstat]]
  pattern = "%vault%"
  pid_finder = "native"

```
{% endraw %}

### Step 3. Restart Telegraf

Run the below command to restart the Telegraf agent{% raw %}
```
sudo service telegraf restart
```
{% endraw %}

### Step 4. Configure Hashicorp Vault to Send Telemetry Data to Telegraf

Edit the Hashicorp Vault configuration file located in the Vault install directory and enter the following snippet:
Replace <HOSTNAME> with the name of the host where the Telegraf instance is running.
{% raw %}
```
telemetry {
  dogstatsd_addr = "<HOSTNAME>:8125"
  disable_hostname = false
  }
```
{% endraw %}



