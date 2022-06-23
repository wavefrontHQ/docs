---
title: VMware vSphere Integration Details
keywords:
tags: [integrations, dashboards]
sidebar: doc_sidebar
permalink: integrations_vsphere.html
summary: Learn details about the vSphere integration.
---
The [vSphere integration](vsphere.html) offers predefined dashboards and predefined alert conditions. The integration is designed for high performance data collection and has been tested with over 7000 virtual machines. This page gives some recommendations for achieving maximum performance.

**Note**: For details on some customization aspects, see the [Telegraf plugin information on GitHub](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/vsphere).

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
## Best Practices for Metric Collection

vCenter Server keeps two different kinds of metrics, such as real-time and historical metrics.

* **Real-time metrics** which have a 20-second time resolution.

    These metrics are stored in the memory and are very fast to query. A complete set of real-time metrics for 7000 virtual machines can be obtained in less than 20 seconds. Real-time metrics are only available for ESXi hosts and virtual machine resources. They are stored only for 1 hour.

* **Historical metrics** are available at 5-minute (default), 30-minute, 2-hour and 24-hour rolled-up intervals.
 
    The historical metrics are stored in the vCenter Server database and are slow to query. Historical metrics are the only type of metrics available for clusters, datastores, resource pools, and datacenters.


The distinction between real-time and historical metrics has an impact on how Telegraf collects metrics. A single instance of an input plugin can have only one collection interval, which means that you typically set the collection interval based on the most frequently collected metric. 

### Problem

If you set the collection interval to 1 minute, all real-time metrics will be collected every minute. Because the historical metrics are only available on a 5-minute interval, the vSphere Telegraf plugin automatically skips four out of five collection cycles for these metrics. Problems may occur when the collection of historical metrics takes longer than the collection interval. This will cause error messages similar to this in the Telegraf logs:

```
019-01-16T13:41:10Z W! [agent] input "inputs.vsphere" did not complete within its interval
```

The metric collection will be disrupted and can result in missing information. 

### Solution

The best practice is to have two instances of the vSphere input plugin for Telegraf: 

1. An instance for the real-time metrics with a short collection interval.
2. An instance for the historical metrics with a longer collection interval. 

You can use the `*_metric_exclude` to turn off the resources you don't want to collect metrics for in each instance. For example:

```
## Realtime instance
[[inputs.vsphere]]
  interval = "60s"
  vcenters = [ "https://vcenter.local/sdk" ]
  username = "user@corp.local"
  password = "secret"

  insecure_skip_verify = true
  force_discover_on_init = true

  # Exclude all historical metrics
  datastore_metric_exclude = ["*"]
  cluster_metric_exclude = ["*"]
  datacenter_metric_exclude = ["*"]
  resourcepool_metric_exclude = ["*"]

  collect_concurrency = 5
  discover_concurrency = 5

# Historical instance
[[inputs.vsphere]]

  interval = "300s"
  
  vcenters = [ "https://vcenter.local/sdk" ]
  username = "user@corp.local"
  password = "secret"

  insecure_skip_verify = true
  force_discover_on_init = true
  host_metric_exclude = ["*"] # Exclude realtime metrics
  vm_metric_exclude = ["*"] # Exclude realtime metrics

  max_query_metrics = 256
  collect_concurrency = 3
```

## Enable Custom Attributes

Custom attributes are used to assign user-specific values for each object of the custom attribute type. The custom attribute's value is stored with vCenter Server and not with the object, such as a host, a virtual machine, and so on. A custom attribute is always a string.

Custom attributes from vCenter Server can be very useful for queries in order to slice the metrics along different dimension and for forming ad-hoc relationships. By default, custom attributes are disabled, because they can add a considerable number of tags to the resulting metrics. 

To enable custom attributes, simply set `custom_attribute_exclude` to `[]` (empty set) and use `custom_attribute_include` to select the attributes that you want to include.

```
# custom_attribute_include = []
# custom_attribute_exclude = ["*"]
```
