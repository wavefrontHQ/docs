---
title: VMware Cloud on AWS Integration
tags: [integrations list]
permalink: vmc.html
summary: Learn about the Wavefront VMware Cloud on AWS Integration.
---
## vSphere Integration

The vSphere integration is a full-featured implementation offering pre-defined dashboards and pre-defined alert conditions. The integration is fully configurable.

### Dashboards

Wavefront provides the following dashboards for vSphere:

- Summary
- Cluster
- Datastore
- ESXi Host Summary
- ESXi Host Detail
- VM Summary
- VM Details

#### Summary Dashboard

<p>From the Summary dashboard you can easily navigate to all other vSphere dashboards.</p>

{% include image.md src="images/vsphere_summary.png" width="80" %}

#### Host and VM System Metrics
<p>The integration includes system metrics for all ESXi Hosts and VMs that are part of your environment.</p>

{% include image.md src="images/vsphere_vm_summary.png" width="80" %}


### Metrics Configuration

Wavefront ingests vSphere metrics using the vSphere input plugin for Telegraf. For details on the metrics and on how to configure ingestion, see the [vSphere plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/vsphere) details on GitHub.


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## vSphere Setup



vSphere metrics can be extensive. Use a dedicated VM that will collect data by using Telegraf. Make sure that this VM has network connectivity to your vCenter Server instance. The VM can also be deployed within your vSphere environment.

Installing the Wavefront proxy on the same VM as Telegraf is not required.

**Note**: If you want to monitor a vSphere environment running vSphere 6.0 - 6.7, do not install the vSphere integration components on the same machine on which your vCenter Server instance runs.

See [vSphere Integration Details](https://docs.wavefront.com/integrations_vsphere.html) for guidance on optimizing performance, e.g. separating real-time and historical metrics.

### Step 1. Install the Telegraf Agent

This integration uses the vSphere input plugin for Telegraf. If you've already installed Telegraf, you can skip to Step 2.

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability?utm_source=docs.vmware.com&utm_medium=referral&utm_campaign=docs-front-page){:target="_blank" rel="noopenner noreferrer"} to check it out!

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

  ## Custom attributes from vCenter can be very useful for queries in order to slice the metrics along
  ## different dimension and for forming ad-hoc relationships. They are enabled by default.To disable 
  ## set custom_attribute_exclude to [*] and use custom_attribute_include to select the specific 
  ## attributes to be included.
  custom_attribute_include = []
  #custom_attribute_exclude = ["*"]

  ## Optional SSL Config
  # ssl_ca = "/path/to/cafile"
  # ssl_cert = "/path/to/certfile"
  # ssl_key = "/path/to/keyfile"
  ## Use SSL but skip chain & host verification
  # insecure_skip_verify = false
```
{% endraw %}

1. Update the `vcenters`, `username`, and `password` properties according to your vCenter Server setup.
   
   To collect metrics, you must have at least read-only access on the vSphere objects.
   For example, in a vCenter Server environment, where the machine on which vCenter Server runs is with an IP address 10.162.175.178, create a user with read-only access on the vSphere objects. The username is wavefront@vsphere.local and the password is secret. Then, set the properties in the `vsphere.conf` file as follows:
   
   vcenters = [ "https://10.162.175.178/sdk" ]
   
   username = "wavefront@vsphere.local"
  
   password = "secret"


2. Many vSphere environments use self-signed certificates. Update the bottom portion of the above configuration and under Optional SSL Config provide the values of the SSL configuration settings that apply to your vSphere environment. 
   
    In some environments, where the SSL certificates are not available, set `insecure_skip_verify = true`.


3. To ensure consistent collection in larger vSphere environments you may need to increase concurrency for the plugin. Use the `collect_concurrency` setting to control concurrency.

    Set `collect_concurrency` to the number of virtual machines divided by 1500 and rounded up to the nearest integer. For example, for 1200 VMs use 1 and for 2300 VMs use 2.


4. If you don't want to collect VM instance information, such as CPU per core, use the `vm_instances` setting. By default, the setting is set to `true`.

See [VMware vSphere Integration Details](https://docs.wavefront.com/integrations_vsphere.html) for other recommendations.

### Step 3. Set up the Telegraf internal plugin

This step is optional, but highly recommended, so that you can monitor the health of Telegraf as it collects vSphere metrics at scale.  Follow the instructions to 
set up the Telegraf internal plugin.

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.

### Step 5. Tune Telegraf settings

After data is flowing into Wavefront, you may need to further tune Telegraf settings for buffer and batch sizes. This plugin is capable to
collect hundreds of thousands of metrics per cycle and can overwhelm default Telegraf agent settings.

If you set up the Telegraf internal plugin (step 3), use this chart query 
to see how many metrics per cycle Telegraf is collecting:
`rate(ts("telegraf.internal.gather.metrics.gathered", input="vsphere")) * 60`  

Edit the `/etc/telegraf/telegraf.conf` to modify Telegraf agent level settings:  
1. Set `metric_buffer_limit` to be slightly larger than the # of metrics collected by the plugin as determined by the above query.  
2. Set `metric_batch_size` to 3000
3. Set `flush_interval` to 5s

### Step 6.  Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.



## Metrics for vSphere

The following table lists metrics that the integration collected from a specific environment, and gives a good overview of what to expect. Your environment might include fewer metrics or additional metrics, depending on setup.

|Metric Name|Description|
| :--- | :--- |
|vsphere.cluster.clusterServices.failover.latest|Latest failover.|
|vsphere.cluster.vmop.*|Virtual machine operations metrics for a cluster.|
|vsphere.cluster.vmop.numChangeDS.latest| |
|vsphere.cluster.vmop.numChangeHost.latest| |
|vsphere.cluster.vmop.numChangeHostDS.latest| |
|vsphere.cluster.vmop.numClone.latest| |
|vsphere.cluster.vmop.numCreate.latest| |
|vsphere.cluster.vmop.numDeploy.latest| |
|vsphere.cluster.vmop.numDestroy.latest| |
|vsphere.cluster.vmop.numPoweroff.latest| |
|vsphere.cluster.vmop.numPoweron.latest| |
|vsphere.cluster.vmop.numRebootGuest.latest| |
|vsphere.cluster.vmop.numReconfigure.latest| |
|vsphere.cluster.vmop.numRegister.latest| |
|vsphere.cluster.vmop.numReset.latest| |
|vsphere.cluster.vmop.numSVMotion.latest| |
|vsphere.cluster.vmop.numShutdownGuest.latest| |
|vsphere.cluster.vmop.numStandbyGuest.latest| |
|vsphere.cluster.vmop.numSuspend.latest| |
|vsphere.cluster.vmop.numUnregister.latest| |
|vsphere.cluster.vmop.numVMotion.latest| |
|vsphere.cluster.vmop.numXVMotion.latest| |
|vsphere.datacenter.vmop.*|Virtual machine operations metrics for a data center.|
|vsphere.datacenter.vmop.numChangeDS.latest| |
|vsphere.datacenter.vmop.numChangeHost.latest| |
|vsphere.datacenter.vmop.numChangeHostDS.latest| |
|vsphere.datacenter.vmop.numClone.latest| |
|vsphere.datacenter.vmop.numCreate.latest| |
|vsphere.datacenter.vmop.numDeploy.latest| |
|vsphere.datacenter.vmop.numDestroy.latest| |
|vsphere.datacenter.vmop.numPoweroff.latest| |
|vsphere.datacenter.vmop.numPoweron.latest| |
|vsphere.datacenter.vmop.numRebootGuest.latest| |
|vsphere.datacenter.vmop.numReconfigure.latest| |
|vsphere.datacenter.vmop.numRegister.latest| |
|vsphere.datacenter.vmop.numReset.latest| |
|vsphere.datacenter.vmop.numSVMotion.latest| |
|vsphere.datacenter.vmop.numShutdownGuest.latest| |
|vsphere.datacenter.vmop.numStandbyGuest.latest| |
|vsphere.datacenter.vmop.numSuspend.latest| |
|vsphere.datacenter.vmop.numUnregister.latest| |
|vsphere.datacenter.vmop.numVMotion.latest| |
|vsphere.datacenter.vmop.numXVMotion.latest| |
|vsphere.datastore.disk.*|Datastore metrics. |
|vsphere.datastore.disk.capacity.latest| |
|vsphere.datastore.disk.provisioned.latest| |
|vsphere.datastore.disk.unshared.latest| |
|vsphere.datastore.disk.used.latest| |
|vsphere.host.datastore.*|Metrics for the ESXi host datastores.|
|vsphere.host.datastore.datastoreMaxQueueDepth.latest| |
|vsphere.host.datastore.datastoreNormalReadLatency.latest| |
|vsphere.host.datastore.datastoreNormalWriteLatency.latest| |
|vsphere.host.datastore.datastoreReadBytes.latest| |
|vsphere.host.datastore.datastoreReadIops.latest| |
|vsphere.host.datastore.datastoreReadLoadMetric.latest| |
|vsphere.host.datastore.datastoreReadOIO.latest| |
|vsphere.host.datastore.datastoreVMObservedLatency.latest| |
|vsphere.host.datastore.datastoreWriteBytes.latest| |
|vsphere.host.datastore.datastoreWriteIops.latest| |
|vsphere.host.datastore.datastoreWriteLoadMetric.latest| |
|vsphere.host.datastore.datastoreWriteOIO.latest| |
|vsphere.host.mem.state.latest|ESXi host mem state.  |
|vsphere.host.sys.uptime.latest|ESXi host uptime. |
|vsphere.vm.sys.uptime.latest|VM system uptime |
|vsphere.vm.virtualDisk.readOIO.latest|VM virtual disk reads. |
|vsphere.vm.virtualDisk.writeOIO.latest|VM virtual disk writes.  |
