---
title: VMware vSphere Integration
tags: [integrations list]
permalink: vsphere.html
summary: Learn about the Wavefront VMware vSphere Integration.
---
## vSphere Integration

The vSphere integration is a full-featured implementation offering pre-defined dashboards and alert conditions and is fully configurable.

### Dashboards

Wavefront provides the following dashboards for vSphere:

- Summary
- Cluster
- Datastore
- ESXi Host Summary
- ESXi Host Detail
- VM Summary
- VM Detail

#### Summary Dashboard

<p>From the Summary dashboard you can easily navigate to all other vSphere dashboards.</p>

{% include image.md src="images/vsphere_summary.png" width="80" %}

#### Host and VM System Metrics
<p>The integration includes system metrics for all ESXi Hosts and VMs part of your environment</p>

{% include image.md src="images/vsphere_vm_summary.png" width="80" %}


### Metrics Configuration

Wavefront ingests vSphere metrics using the vSphere input plugin for Telegraf. For details on the metrics and on how to configure ingestion, see the [vSphere plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/vsphere) details on GitHub.


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## vSphere Setup



vSphere metrics can be extensive, we recommend you use a dedicated VM which will collect data using Telegraf.  
Installing the Wavefront Proxy on the same VM as Telegraf is not required.
This VM needs network connectivity to your vCenter, which can be from a VM deployed within your vCenter environment.

### Step 1. Install the Telegraf Agent

This integration uses the vSphere input plugin for Telegraf. If you've already installed Telegraf, you can skip to Step 2.

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](http://wavefront.com/sign-up/?utm_source=docs.vmware.com&utm_medium=referral&utm_campaign=docs-front-page){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Configure vSphere Input Plugin

Create a file called `vsphere.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.vsphere]]
  ## List of vCenter URLs to be monitored. These three lines must be uncommented
  ## and edited for the plugin to work.
  vcenters = [ "https://vcenter.local/sdk" ]
  username = "user@corp.local"
  password = "secret"

  ## VMs
  ## Typical VM metrics (if omitted or empty, all metrics are collected)
  vm_metric_include = [
    "cpu.demand.average",
    "cpu.idle.summation",
    "cpu.latency.average",
    "cpu.readiness.average",
    "cpu.ready.summation",
    "cpu.run.summation",
    "cpu.usagemhz.average",
    "cpu.used.summation",
    "cpu.wait.summation",
    "mem.active.average",
    "mem.granted.average",
    "mem.latency.average",
    "mem.swapin.average",
    "mem.swapinRate.average",
    "mem.swapout.average",
    "mem.swapoutRate.average",
    "mem.usage.average",
    "mem.vmmemctl.average",
    "net.bytesRx.average",
    "net.bytesTx.average",
    "net.droppedRx.summation",
    "net.droppedTx.summation",
    "net.usage.average",
    "power.power.average",    
    "virtualDisk.numberReadAveraged.average",
    "virtualDisk.numberWriteAveraged.average",
    "virtualDisk.read.average",
    "virtualDisk.readOIO.latest",
    "virtualDisk.throughput.usage.average",
    "virtualDisk.totalReadLatency.average",
    "virtualDisk.totalWriteLatency.average",
    "virtualDisk.write.average",
    "virtualDisk.writeOIO.latest",
    "sys.uptime.latest",
  ]
  # vm_metric_exclude = [] ## Nothing is excluded by default
  # vm_instances = true ## true by default

  ## Hosts 
  ## Typical host metrics (if omitted or empty, all metrics are collected)
  host_metric_include = [
    "cpu.coreUtilization.average",
    "cpu.costop.summation",
    "cpu.demand.average",
    "cpu.idle.summation",
    "cpu.latency.average",
    "cpu.readiness.average",
    "cpu.ready.summation",
    "cpu.swapwait.summation",
    "cpu.usage.average",
    "cpu.usagemhz.average",
    "cpu.used.summation",
    "cpu.utilization.average",
    "cpu.wait.summation",
    "disk.deviceReadLatency.average",
    "disk.deviceWriteLatency.average",
    "disk.kernelReadLatency.average",
    "disk.kernelWriteLatency.average",
    "disk.numberReadAveraged.average",
    "disk.numberWriteAveraged.average",
    "disk.read.average",
    "disk.totalReadLatency.average",
    "disk.totalWriteLatency.average",
    "disk.write.average",
    "mem.active.average",
    "mem.latency.average",
    "mem.state.latest",
    "mem.swapin.average",
    "mem.swapinRate.average",
    "mem.swapout.average",
    "mem.swapoutRate.average",
    "mem.totalCapacity.average",
    "mem.usage.average",
    "mem.vmmemctl.average",
    "net.bytesRx.average",
    "net.bytesTx.average",
    "net.droppedRx.summation",
    "net.droppedTx.summation",
    "net.errorsRx.summation",
    "net.errorsTx.summation",
    "net.usage.average",
    "power.power.average",
    "storageAdapter.numberReadAveraged.average",
    "storageAdapter.numberWriteAveraged.average",
    "storageAdapter.read.average",
    "storageAdapter.write.average",
    "sys.uptime.latest",
  ]
  # host_metric_exclude = [] ## Nothing excluded by default
  # host_instances = true ## true by default

  ## Clusters 
  # cluster_metric_include = [] ## if omitted or empty, all metrics are collected
  # cluster_metric_exclude = [] ## Nothing excluded by default
  # cluster_instances = true ## true by default

  ## Datastores 
  # datastore_metric_include = [] ## if omitted or empty, all metrics are collected
  # datastore_metric_exclude = [] ## Nothing excluded by default
  # datastore_instances = false ## false by default for Datastores

  ## Datacenters
  # datacenter_metric_include = [] ## if omitted or empty, all metrics are collected
  # datacenter_metric_exclude = [] ## Nothing excluded by default
  # datacenter_instances = false ## false by default for Datacenters

  ## Plugin Settings  
  ## separator character to use for measurement and field names (default: "_")
  # separator = "_"

  ## number of objects to retrieve per query for realtime resources (vms and hosts)
  ## set to 64 for vCenter 6.0 (default: 256)
  # max_query_objects = 256

  ## number of metrics to retrieve per query for non-realtime resources (clusters and datastores)
  ## set to 64 for vCenter 6.0 (default: 256)
  # max_query_metrics = 256

  ## number of go routines to use for collection and discovery of objects and metrics
  # collect_concurrency = 1
  # discover_concurrency = 1

  ## whether or not to force discovery of new objects on initial gather call before collecting metrics
  ## when true for large environments this may cause errors for time elapsed while collecting metrics
  ## when false (default) the first collection cycle may result in no or limited metrics while objects are discovered
  # force_discover_on_init = false

  ## the interval before (re)discovering objects subject to metrics collection (default: 300s)
  # object_discovery_interval = "300s"

  ## timeout applies to any of the api request made to vcenter
  # timeout = "20s"

  ## Optional SSL Config
  # ssl_ca = "/path/to/cafile"
  # ssl_cert = "/path/to/certfile"
  # ssl_key = "/path/to/keyfile"
  ## Use SSL but skip chain & host verification
  # insecure_skip_verify = false
```
{% endraw %}

Update the `vcenters`, `username`, and `password` property according to your vCenter setup.

Many vCenter environments use self signed certificates. Ensure to update the bottom portion of the above configuration and provide proper
values for all applicable SSL Config settings per your vSphere environment. In some environments, setting `insecure_skip_verify = true` will be
necessary when the SSL certificates are not available.

Detailed instructions on how to configure the vSphere plugin can be found [here](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/vsphere)

### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.

