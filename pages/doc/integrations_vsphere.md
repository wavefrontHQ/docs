---
title: VMware vSphere Integration Details
keywords:
tags: [integrations, dashboards]
sidebar: doc_sidebar
permalink: integrations_vsphere.html
summary: Learn details about the vSphere integration.
---
The [vSphere integration](vsphere.html) offers predefined dashboards and predefined alert conditions. The integration is designed for high performance data collection and has been tested with over 7000 virtual machines. This page gives some recommendations for achieving maximum performance.

**Note**: For details on some customization aspects, see the [Telegraf plugin info on Github](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/vsphere).

<!---Out of date>
## Separating Real-time and Historical Metrics
vCenter Server provides real-time and historical metrics:
* **Real-time metrics** are typically stored in ESXi memory and can be accessed very quickly. They have a 20 second time resolution and are normally stored for 24 hours. Real-time metrics are available only for hosts and virtual machines.
* **Historical metrics** are typically stored in 5m, 30m, 2h and 24h rolled-up intervals. Historical metrics are typically kept for up to one year, depending on the roll-up. The Telegraf plugin uses only the 5m data. Because historical metrics are stored in a database, they take considerably longer to query than real-time metrics.

In the default configuration, all metrics are defined in a single instance of the vSphere plugin. Because the default setup mixes real-time and historical metrics, it sometimes has problems collecting the historical metrics within the collection interval, even though the real-time metric collections finish in just a few seconds. If this happens, consider moving some or all of the historical metrics to its own instance of the vSphere plugin. You can define two instances of the plugin:
* The real-time instance of the plugin excludes all historical metrics.
* The historical data instance excludes all real-time metrics.
<!--->

## Setting Collection Concurrency

The data collector is likely to spend most of its time waiting for results from vCenter Server. To make it run more efficiently, we allow concurrent collections. Simply put, if the concurrency is set to 3, we allow 3 collections to run at the same time. In many cases, concurrent collection improves performance.

**Note:** Setting the concurrency value too high can put excessive load on the vCenter Server instance and cause severe problems. Choose the number of concurrent collectors with care!

Collection concurrency is determined by the configuration parameter `collect_concurrency`. A rule of thumb is to set it to the number of VMs divided by 1500, rounded up. For example, if you are planning on monitoring an environment with 4500 VMs, set `collect_concurrency` to 3.

If you're separating real-time and historical metrics, it makes sense to use different values for the  `collect_concurrency` parameter for the two plugin instances.

## Discovery Concurrency

The vSphere plugin periodically performs resource discovery (typically every 5 minutes). This process takes an inventory of all VMs, hosts, datastores, etc. in your environment. In a large environment, resource discovery can take a long time. To increase performance, you can increase the concurrency of discovery through the `discover_concurrency` configuration parameter. Just like the collection concurrency, we recommend a value of the number of VMs divided by 1500.

If you're separating real-time and historical metrics, it makes sense to use different values for the  `discovery_concurrency` parameter for the two plugin instances.

<!---Out of date as per Pierre>
## Example Configuration
Here is an example configuration with separate instances for real-time and historical metrics. For the real-time instance, we enable both concurrent collection and discovery. For the historical instance, we enable concurrent collection but fewer collectors:

```
## Realtime instance
[[inputs.vsphere]]
  interval = "60s"
  vcenters = [ "https://someaddress/sdk" ]
  username = "someuser@vsphere.local"
  password = "secret"

  insecure_skip_verify = true
  force_discover_on_init = true

  # Exclude all historical metrics
  datastore_metric_exclude = ["*"]
  cluster_metric_exclude = ["*"]
  datacenter_metric_exclude = ["*"]

  collect_concurrency = 5
  discover_concurrency = 5

# Historical instance
[[inputs.vsphere]]

  interval = "300s"

  vcenters = [ "https://someaddress/sdk" ]
  username = "someuser@vsphere.local"
  password = "secret"

  insecure_skip_verify = true
  force_discover_on_init = true
  host_metric_exclude = ["*"] # Exclude realtime metrics
  vm_metric_exclude = ["*"] # Exclude realtime metrics

  max_query_metrics = 256
  collect_concurrency = 3
```
<!--->
