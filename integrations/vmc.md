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
- VM Detail

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



vSphere metrics can be extensive. We recommend that you use a dedicated VM that will collect data using Telegraf.  
This VM needs network connectivity to your vCenter Server. It can be from a VM deployed within your vCenter environment. Installing the Wavefront proxy on the same VM as Telegraf is not required.

**Note**: Do not install the vSphere integration components on your vCenter Server instance. 

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

Update the `vcenters`, `username`, and `password` properties according to your vCenter setup.

Many vCenter environments use self-signed certificates. Be sure to update the bottom portion of the above configuration and provide proper
values for all applicable SSL Config settings that apply in your vSphere environment. In some environments, setting `insecure_skip_verify = true` will be
necessary when the SSL certificates are not available.

To ensure consistent collection in larger vSphere environments you may need to increase concurrency for the plugin. Use the `collect_concurrency` setting to control concurrency.

Set `collect_concurrency` to the number of virtual machines divided by 1500 and rounded up to the nearest integer. For example, for 1200 VMs use 1 and for 2300 VMs use 2.

If you don't want to collect instance information, such as CPU per core, use the `vm_instances` setting to control this collection. The setting defaults to `true`.

See [VMware vSphere Integration Details](https://docs.wavefront.com/integrations_vsphere.html) for other recommendations.

### Step 3. Setup Telegraf internal plugin

This step is optional, but highly recommended to monitor the health of Telegraf as it collects vSphere metrics at scale.  Follow the instructions to 
setup the Telegraf internal plugin.

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.

### Step 5. Tune Telegraf settings

After data is flowing into Wavefront, you may need to further tune Telegraf settings for buffer and batch sizes. This plugin is capable to
collect hundreds of thousands of metrics per cycle and can overwhelm default Telegraf agent settings.

If you setup the Telegraf internal plugin (step 3), use this chart query 
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

## Metrics for vSphere vSAN

If your environment is set up to use vSAN, you might see the following metrics. For some additional information see the [vSAN Diagnostics and Troubleshooting Reference Manual](https://www.vmware.com/content/dam/digitalmarketing/vmware/en/pdf/products/vsan/vsan-troubleshooting-reference-manual.pdf).

|Metric Name|Description|
| :--- | :--- |
|vsphere.vsan.performance.cachedisk.*|Metrics for vSAN cachedisk performance. |
|vsphere.vsan.performance.cachedisk.advt.data.destage.rate.avg| |
|vsphere.vsan.performance.cachedisk.advt.data.destage.rate.cur| |
|vsphere.vsan.performance.cachedisk.advt.zero.destage.rate.avg| |
|vsphere.vsan.performance.cachedisk.advt.zero.destage.rate.cur| |
|vsphere.vsan.performance.cachedisk.blk.attr.cche.hit.rt| |
|vsphere.vsan.performance.cachedisk.blk.attr.cche.sz| |
|vsphere.vsan.performance.cachedisk.commit.tbl.cnt| |
|vsphere.vsan.performance.cachedisk.data.p| |
|vsphere.vsan.performance.cachedisk.elev.start.thresh| |
|vsphere.vsan.performance.cachedisk.elev.unthrottle.thresh| |
|vsphere.vsan.performance.cachedisk.io.count.dev.read| |
|vsphere.vsan.performance.cachedisk.io.count.dev.write| |
|vsphere.vsan.performance.cachedisk.io.count.rc.read| |
|vsphere.vsan.performance.cachedisk.io.count.rc.write| |
|vsphere.vsan.performance.cachedisk.io.count.wb.read| |
|vsphere.vsan.performance.cachedisk.io.count.wb.write| |
|vsphere.vsan.performance.cachedisk.iops.dev.read| |
|vsphere.vsan.performance.cachedisk.iops.dev.write| |
|vsphere.vsan.performance.cachedisk.iops.rc.read| |
|vsphere.vsan.performance.cachedisk.iops.rc.write| |
|vsphere.vsan.performance.cachedisk.iops.wb.read| |
|vsphere.vsan.performance.cachedisk.iops.wb.write| |
|vsphere.vsan.performance.cachedisk.latency.dev.d.avg| |
|vsphere.vsan.performance.cachedisk.latency.dev.g.avg| |
|vsphere.vsan.performance.cachedisk.latency.dev.k.avg| |
|vsphere.vsan.performance.cachedisk.latency.dev.read| |
|vsphere.vsan.performance.cachedisk.latency.dev.write| |
|vsphere.vsan.performance.cachedisk.latency.rc.rd.q| |
|vsphere.vsan.performance.cachedisk.latency.rc.read| |
|vsphere.vsan.performance.cachedisk.latency.rc.write| |
|vsphere.vsan.performance.cachedisk.latency.rc.wrt.q| |
|vsphere.vsan.performance.cachedisk.latency.wb.rd.q| |
|vsphere.vsan.performance.cachedisk.latency.wb.read| |
|vsphere.vsan.performance.cachedisk.latency.wb.write| |
|vsphere.vsan.performance.cachedisk.latency.wb.wrt.q| |
|vsphere.vsan.performance.cachedisk.lgcl.cap.cons.prep| |
|vsphere.vsan.performance.cachedisk.lgcl.cap.cons.usage| |
|vsphere.vsan.performance.cachedisk.lgcl.cap.fs.metadata| |
|vsphere.vsan.performance.cachedisk.lgcl.cap.reserved| |
|vsphere.vsan.performance.cachedisk.lgcl.cap.unmap| |
|vsphere.vsan.performance.cachedisk.lgcl.cap.unrsvrd| |
|vsphere.vsan.performance.cachedisk.lgcl.cap.used| |
|vsphere.vsan.performance.cachedisk.llog.data| |
|vsphere.vsan.performance.cachedisk.llog.data.space| |
|vsphere.vsan.performance.cachedisk.llog.log| |
|vsphere.vsan.performance.cachedisk.llog.log.space| |
|vsphere.vsan.performance.cachedisk.llog.recovery.process.time| |
|vsphere.vsan.performance.cachedisk.llog.recovery.read.time| |
|vsphere.vsan.performance.cachedisk.log.p| |
|vsphere.vsan.performance.cachedisk.mem.p| |
|vsphere.vsan.performance.cachedisk.num.llog.recovery.reads| |
|vsphere.vsan.performance.cachedisk.num.plog.recovery.reads| |
|vsphere.vsan.performance.cachedisk.phy.cap.cf| |
|vsphere.vsan.performance.cachedisk.phy.cap.rsrvd| |
|vsphere.vsan.performance.cachedisk.phy.cap.rsrvd.used| |
|vsphere.vsan.performance.cachedisk.phy.cap.t2| |
|vsphere.vsan.performance.cachedisk.phy.cap.used| |
|vsphere.vsan.performance.cachedisk.plog.cuml.enc.rd.lat| |
|vsphere.vsan.performance.cachedisk.plog.cuml.enc.wr.lat| |
|vsphere.vsan.performance.cachedisk.plog.data| |
|vsphere.vsan.performance.cachedisk.plog.data.space| |
|vsphere.vsan.performance.cachedisk.plog.dg.data.usage| |
|vsphere.vsan.performance.cachedisk.plog.elev.cycles| |
|vsphere.vsan.performance.cachedisk.plog.help.rd.q.depth| |
|vsphere.vsan.performance.cachedisk.plog.help.rd.q.lat| |
|vsphere.vsan.performance.cachedisk.plog.help.wr.q.depth| |
|vsphere.vsan.performance.cachedisk.plog.help.wr.q.lat| |
|vsphere.vsan.performance.cachedisk.plog.log| |
|vsphere.vsan.performance.cachedisk.plog.log.space| |
|vsphere.vsan.performance.cachedisk.plog.md.data.usage| |
|vsphere.vsan.performance.cachedisk.plog.num.commit.logs| |
|vsphere.vsan.performance.cachedisk.plog.num.elev.md.writes| |
|vsphere.vsan.performance.cachedisk.plog.num.elev.ssd.reads| |
|vsphere.vsan.performance.cachedisk.plog.num.freed.commit.logs| |
|vsphere.vsan.performance.cachedisk.plog.num.freed.logs| |
|vsphere.vsan.performance.cachedisk.plog.num.md.reads| |
|vsphere.vsan.performance.cachedisk.plog.num.rc.reads| |
|vsphere.vsan.performance.cachedisk.plog.num.ssd.reads| |
|vsphere.vsan.performance.cachedisk.plog.num.total.reads| |
|vsphere.vsan.performance.cachedisk.plog.num.vmfs.reads| |
|vsphere.vsan.performance.cachedisk.plog.num.write.logs| |
|vsphere.vsan.performance.cachedisk.plog.read.q.latency| |
|vsphere.vsan.performance.cachedisk.plog.recovery.process.time| |
|vsphere.vsan.performance.cachedisk.plog.recovery.read.time| |
|vsphere.vsan.performance.cachedisk.plog.ssd.bytes.drained| |
|vsphere.vsan.performance.cachedisk.plog.total.bytes.drained| |
|vsphere.vsan.performance.cachedisk.plog.total.bytes.read| |
|vsphere.vsan.performance.cachedisk.plog.total.bytes.read.by.rc| |
|vsphere.vsan.performance.cachedisk.plog.total.bytes.read.by.vmfs| |
|vsphere.vsan.performance.cachedisk.plog.total.bytes.read.from.md| |
|vsphere.vsan.performance.cachedisk.plog.total.bytes.read.from.ssd| |
|vsphere.vsan.performance.cachedisk.plog.total.cf.bytes| |
|vsphere.vsan.performance.cachedisk.plog.total.cs.bytes| |
|vsphere.vsan.performance.cachedisk.plog.total.del.bytes| |
|vsphere.vsan.performance.cachedisk.plog.total.fs.bytes| |
|vsphere.vsan.performance.cachedisk.plog.total.fs.unmap.bytes| |
|vsphere.vsan.performance.cachedisk.plog.total.zero.bytes| |
|vsphere.vsan.performance.cachedisk.plog.write.q.latency| |
|vsphere.vsan.performance.cachedisk.plog.zero.bytes.drained| |
|vsphere.vsan.performance.cachedisk.plogtotal.rd.lat| |
|vsphere.vsan.performance.cachedisk.plogtotal.wr.lat| |
|vsphere.vsan.performance.cachedisk.prep.tbl.cnt| |
|vsphere.vsan.performance.cachedisk.quota.evictions| |
|vsphere.vsan.performance.cachedisk.rc.hit.rate| |
|vsphere.vsan.performance.cachedisk.ssd.p| |
|vsphere.vsan.performance.cachedisk.throughput.dev.read| |
|vsphere.vsan.performance.cachedisk.throughput.dev.write| |
|vsphere.vsan.performance.cachedisk.time.to.sleep.ms| |
|vsphere.vsan.performance.cachedisk.total.llog.recovery.time| |
|vsphere.vsan.performance.cachedisk.total.plog.recovery.time| |
|vsphere.vsan.performance.cachedisk.war.evictions| |
|vsphere.vsan.performance.cachedisk.wb.free.pct| |
|vsphere.vsan.performance.cachedisk.zero.p| |
|vsphere.vsan.performance.capacitydisk.*|Metrics for the vSAN capacity disk performance.|
|vsphere.vsan.performance.capacitydisk.blk.attr.flsh.time| |
|vsphere.vsan.performance.capacitydisk.capacity.used| |
|vsphere.vsan.performance.capacitydisk.cf.time| |
|vsphere.vsan.performance.capacitydisk.checksum.errors| |
|vsphere.vsan.performance.capacitydisk.commit.flusher.components.to.flush| |
|vsphere.vsan.performance.capacitydisk.commit.flusher.extent.size.processed| |
|vsphere.vsan.performance.capacitydisk.commit.flusher.extents.processed| |
|vsphere.vsan.performance.capacitydisk.dg.transient.capacity.used| |
|vsphere.vsan.performance.capacitydisk.disk.transient.capacity.used| |
|vsphere.vsan.performance.capacitydisk.elev.md.write.latency| |
|vsphere.vsan.performance.capacitydisk.elev.ssd.read.latency| |
|vsphere.vsan.performance.capacitydisk.io.count.dev.read| |
|vsphere.vsan.performance.capacitydisk.io.count.dev.write| |
|vsphere.vsan.performance.capacitydisk.io.count.read| |
|vsphere.vsan.performance.capacitydisk.io.count.write| |
|vsphere.vsan.performance.capacitydisk.iops.dev.read| |
|vsphere.vsan.performance.capacitydisk.iops.dev.write| |
|vsphere.vsan.performance.capacitydisk.iops.read| |
|vsphere.vsan.performance.capacitydisk.iops.write| |
|vsphere.vsan.performance.capacitydisk.latency.dev.d.avg| |
|vsphere.vsan.performance.capacitydisk.latency.dev.g.avg| |
|vsphere.vsan.performance.capacitydisk.latency.dev.k.avg| |
|vsphere.vsan.performance.capacitydisk.latency.dev.read| |
|vsphere.vsan.performance.capacitydisk.latency.dev.write| |
|vsphere.vsan.performance.capacitydisk.latency.read| |
|vsphere.vsan.performance.capacitydisk.latency.write| |
|vsphere.vsan.performance.capacitydisk.lgcl.cap.cons.prep| |
|vsphere.vsan.performance.capacitydisk.lgcl.cap.cons.usage| |
|vsphere.vsan.performance.capacitydisk.lgcl.cap.fs.metadata| |
|vsphere.vsan.performance.capacitydisk.lgcl.cap.reserved| |
|vsphere.vsan.performance.capacitydisk.lgcl.cap.unmap| |
|vsphere.vsan.performance.capacitydisk.lgcl.cap.unrsvrd| |
|vsphere.vsan.performance.capacitydisk.lgcl.cap.used| |
|vsphere.vsan.performance.capacitydisk.llog.data.space| |
|vsphere.vsan.performance.capacitydisk.llog.log.space| |
|vsphere.vsan.performance.capacitydisk.num.cf.act| |
|vsphere.vsan.performance.capacitydisk.num.cksum.flsh| |
|vsphere.vsan.performance.capacitydisk.num.compressions| |
|vsphere.vsan.performance.capacitydisk.num.plog.i.os| |
|vsphere.vsan.performance.capacitydisk.num.uncompressions| |
|vsphere.vsan.performance.capacitydisk.num.vrst.bar| |
|vsphere.vsan.performance.capacitydisk.phy.cap.cf| |
|vsphere.vsan.performance.capacitydisk.phy.cap.rsrvd| |
|vsphere.vsan.performance.capacitydisk.phy.cap.rsrvd.used| |
|vsphere.vsan.performance.capacitydisk.phy.cap.t2| |
|vsphere.vsan.performance.capacitydisk.phy.cap.used| |
|vsphere.vsan.performance.capacitydisk.plog.cuml.enc.rd.lat| |
|vsphere.vsan.performance.capacitydisk.plog.cuml.enc.wr.lat| |
|vsphere.vsan.performance.capacitydisk.plog.data.space| |
|vsphere.vsan.performance.capacitydisk.plog.dg.data.usage| |
|vsphere.vsan.performance.capacitydisk.plog.elev.cycles| |
|vsphere.vsan.performance.capacitydisk.plog.help.rd.q.depth| |
|vsphere.vsan.performance.capacitydisk.plog.help.rd.q.lat| |
|vsphere.vsan.performance.capacitydisk.plog.help.wr.q.depth| |
|vsphere.vsan.performance.capacitydisk.plog.help.wr.q.lat| |
|vsphere.vsan.performance.capacitydisk.plog.io.time| |
|vsphere.vsan.performance.capacitydisk.plog.log.space| |
|vsphere.vsan.performance.capacitydisk.plog.md.data.usage| |
|vsphere.vsan.performance.capacitydisk.plog.num.commit.logs| |
|vsphere.vsan.performance.capacitydisk.plog.num.elev.md.writes| |
|vsphere.vsan.performance.capacitydisk.plog.num.elev.ssd.reads| |
|vsphere.vsan.performance.capacitydisk.plog.num.freed.commit.logs| |
|vsphere.vsan.performance.capacitydisk.plog.num.freed.logs| |
|vsphere.vsan.performance.capacitydisk.plog.num.md.reads| |
|vsphere.vsan.performance.capacitydisk.plog.num.rc.reads| |
|vsphere.vsan.performance.capacitydisk.plog.num.ssd.reads| |
|vsphere.vsan.performance.capacitydisk.plog.num.total.reads| |
|vsphere.vsan.performance.capacitydisk.plog.num.vmfs.reads| |
|vsphere.vsan.performance.capacitydisk.plog.num.write.logs| |
|vsphere.vsan.performance.capacitydisk.plog.read.q.latency| |
|vsphere.vsan.performance.capacitydisk.plog.ssd.bytes.drained| |
|vsphere.vsan.performance.capacitydisk.plog.total.bytes.drained| |
|vsphere.vsan.performance.capacitydisk.plog.total.bytes.read| |
|vsphere.vsan.performance.capacitydisk.plog.total.bytes.read.by.rc| |
|vsphere.vsan.performance.capacitydisk.plog.total.bytes.read.by.vmfs| |
|vsphere.vsan.performance.capacitydisk.plog.total.bytes.read.from.md| |
|vsphere.vsan.performance.capacitydisk.plog.total.bytes.read.from.ssd| |
|vsphere.vsan.performance.capacitydisk.plog.total.cf.bytes| |
|vsphere.vsan.performance.capacitydisk.plog.total.cf.unmap.bytes| |
|vsphere.vsan.performance.capacitydisk.plog.total.cs.bytes| |
|vsphere.vsan.performance.capacitydisk.plog.total.del.bytes| |
|vsphere.vsan.performance.capacitydisk.plog.total.fs.bytes| |
|vsphere.vsan.performance.capacitydisk.plog.total.fs.unmap.bytes| |
|vsphere.vsan.performance.capacitydisk.plog.total.zero.bytes| |
|vsphere.vsan.performance.capacitydisk.plog.write.q.latency| |
|vsphere.vsan.performance.capacitydisk.plog.zero.bytes.drained| |
|vsphere.vsan.performance.capacitydisk.throughput.dev.read| |
|vsphere.vsan.performance.capacitydisk.throughput.dev.write| |
|vsphere.vsan.performance.capacitydisk.virsto.dirty.map.blocks| |
|vsphere.vsan.performance.capacitydisk.virsto.free.map.blocks| |
|vsphere.vsan.performance.capacitydisk.virsto.instance.heap.utilization| |
|vsphere.vsan.performance.capacitydisk.virsto.invalid.map.blocks| |
|vsphere.vsan.performance.capacitydisk.virsto.map.block.cache.evictions.per.sec| |
|vsphere.vsan.performance.capacitydisk.virsto.map.block.cache.hits.per.sec| |
|vsphere.vsan.performance.capacitydisk.virsto.map.block.cache.misses.per.sec| |
|vsphere.vsan.performance.capacitydisk.virsto.metadata.flushed.per.run| |
|vsphere.vsan.performance.capacitydisk.virsto.metadata.flusher.pending.buffers| |
|vsphere.vsan.performance.capacitydisk.virsto.metadata.flusher.runs.per.sec| |
|vsphere.vsan.performance.capacitydisk.virsto.valid.map.blocks| |
|vsphere.vsan.performance.capacitydisk.vrst.barr.time| |
|vsphere.vsan.performance.capacitydisk.zeros.in.flight| |
|vsphere.vsan.performance.clusterdom*.*|Metrics for vSAN DOM (distributed object manager) performance. DOM clients are in-memory states inside vSAN that show the distribution of object clients around the cluster. Users have no control over this. These metrics show related information.  |
|vsphere.vsan.performance.clusterdomclient.congestion| |
|vsphere.vsan.performance.clusterdomclient.iops.read| |
|vsphere.vsan.performance.clusterdomclient.iops.write| |
|vsphere.vsan.performance.clusterdomclient.latency.avg.read| |
|vsphere.vsan.performance.clusterdomclient.latency.avg.write| |
|vsphere.vsan.performance.clusterdomclient.oio| |
|vsphere.vsan.performance.clusterdomclient.throughput.read| |
|vsphere.vsan.performance.clusterdomclient.throughput.write| |
|vsphere.vsan.performance.clusterdomcompmgr.congestion| |
|vsphere.vsan.performance.clusterdomcompmgr.iops.read| |
|vsphere.vsan.performance.clusterdomcompmgr.iops.rec.write| |
|vsphere.vsan.performance.clusterdomcompmgr.iops.resync.read| |
|vsphere.vsan.performance.clusterdomcompmgr.iops.write| |
|vsphere.vsan.performance.clusterdomcompmgr.lat.avg.resync.read| |
|vsphere.vsan.performance.clusterdomcompmgr.latency.avg.read| |
|vsphere.vsan.performance.clusterdomcompmgr.latency.avg.rec.write| |
|vsphere.vsan.performance.clusterdomcompmgr.latency.avg.write| |
|vsphere.vsan.performance.clusterdomcompmgr.oio| |
|vsphere.vsan.performance.clusterdomcompmgr.throughput.read| |
|vsphere.vsan.performance.clusterdomcompmgr.throughput.rec.write| |
|vsphere.vsan.performance.clusterdomcompmgr.throughput.write| |
|vsphere.vsan.performance.clusterdomcompmgr.tput.resync.read| |
|vsphere.vsan.performance.cmmdsworldcpu.*|Performance metrics for vSAN CMMDS (cluster monitoring, membership, and directory services).|
|vsphere.vsan.performance.cmmdsworldcpu.ready.pct| |
|vsphere.vsan.performance.cmmdsworldcpu.used.pct| |
|vsphere.vsan.performance.diskgroup.*|Performance metrics for vSAN performance disk groups. |
|vsphere.vsan.performance.diskgroup.all.evictions| |
|vsphere.vsan.performance.diskgroup.bytes.per.second.bandwidth| |
|vsphere.vsan.performance.diskgroup.capacity| |
|vsphere.vsan.performance.diskgroup.capacity.reserved| |
|vsphere.vsan.performance.diskgroup.capacity.used| |
|vsphere.vsan.performance.diskgroup.comp.congestion| |
|vsphere.vsan.performance.diskgroup.component.congestion.read.sched| |
|vsphere.vsan.performance.diskgroup.component.congestion.write.sched| |
|vsphere.vsan.performance.diskgroup.compress.pct| |
|vsphere.vsan.performance.diskgroup.compression.time| |
|vsphere.vsan.performance.diskgroup.cur.bytes.to.sync.decom| |
|vsphere.vsan.performance.diskgroup.cur.bytes.to.sync.fix.comp| |
|vsphere.vsan.performance.diskgroup.cur.bytes.to.sync.policy| |
|vsphere.vsan.performance.diskgroup.cur.bytes.to.sync.rebalance| |
|vsphere.vsan.performance.diskgroup.current.drain.rate| |
|vsphere.vsan.performance.diskgroup.current.incoming.rate| |
|vsphere.vsan.performance.diskgroup.current.over.write.factor| |
|vsphere.vsan.performance.diskgroup.current.true.wb.fill.rate| |
|vsphere.vsan.performance.diskgroup.data.write.time| |
|vsphere.vsan.performance.diskgroup.ddp.free.cap| |
|vsphere.vsan.performance.diskgroup.ddp.total.cap| |
|vsphere.vsan.performance.diskgroup.dedup.cche.hit.rt| |
|vsphere.vsan.performance.diskgroup.dedup.pct| |
|vsphere.vsan.performance.diskgroup.deduped.bytes| |
|vsphere.vsan.performance.diskgroup.diskgroup.congestion.read.sched| |
|vsphere.vsan.performance.diskgroup.diskgroup.congestion.write.sched| |
|vsphere.vsan.performance.diskgroup.drain.rate.moving.avg| |
|vsphere.vsan.performance.diskgroup.hash.calc.time| |
|vsphere.vsan.performance.diskgroup.hashed.bytes| |
|vsphere.vsan.performance.diskgroup.io.count.rc.read| |
|vsphere.vsan.performance.diskgroup.io.count.rc.write| |
|vsphere.vsan.performance.diskgroup.io.count.wb.read| |
|vsphere.vsan.performance.diskgroup.io.count.wb.write| |
|vsphere.vsan.performance.diskgroup.iops.avg.of.all.io| |
|vsphere.vsan.performance.diskgroup.iops.congestion| |
|vsphere.vsan.performance.diskgroup.iops.delay.pct.sched| |
|vsphere.vsan.performance.diskgroup.iops.direct.sched| |
|vsphere.vsan.performance.diskgroup.iops.rc.mem.reads| |
|vsphere.vsan.performance.diskgroup.iops.rc.rawar| |
|vsphere.vsan.performance.diskgroup.iops.rc.read| |
|vsphere.vsan.performance.diskgroup.iops.rc.ssd.reads| |
|vsphere.vsan.performance.diskgroup.iops.rc.total.read| |
|vsphere.vsan.performance.diskgroup.iops.rc.write| |
|vsphere.vsan.performance.diskgroup.iops.read| |
|vsphere.vsan.performance.diskgroup.iops.read.comp.mgr| |
|vsphere.vsan.performance.diskgroup.iops.recovery.unmap.comp.mgr| |
|vsphere.vsan.performance.diskgroup.iops.recovery.write.comp.mgr| |
|vsphere.vsan.performance.diskgroup.iops.resync.read| |
|vsphere.vsan.performance.diskgroup.iops.resync.read.decom| |
|vsphere.vsan.performance.diskgroup.iops.resync.read.fix.comp| |
|vsphere.vsan.performance.diskgroup.iops.resync.read.policy| |
|vsphere.vsan.performance.diskgroup.iops.resync.read.rebalance| |
|vsphere.vsan.performance.diskgroup.iops.resync.write| |
|vsphere.vsan.performance.diskgroup.iops.resync.write.decom| |
|vsphere.vsan.performance.diskgroup.iops.resync.write.fix.comp| |
|vsphere.vsan.performance.diskgroup.iops.resync.write.policy| |
|vsphere.vsan.performance.diskgroup.iops.resync.write.rebalance| |
|vsphere.vsan.performance.diskgroup.iops.sched| |
|vsphere.vsan.performance.diskgroup.iops.sched.queue.meta| |
|vsphere.vsan.performance.diskgroup.iops.sched.queue.ns| |
|vsphere.vsan.performance.diskgroup.iops.sched.queue.rec| |
|vsphere.vsan.performance.diskgroup.iops.sched.queue.vm| |
|vsphere.vsan.performance.diskgroup.iops.unmap.comp.mgr| |
|vsphere.vsan.performance.diskgroup.iops.wb.read| |
|vsphere.vsan.performance.diskgroup.iops.wb.write| |
|vsphere.vsan.performance.diskgroup.iops.write| |
|vsphere.vsan.performance.diskgroup.iops.write.comp.mgr| |
|vsphere.vsan.performance.diskgroup.iops.write.le| |
|vsphere.vsan.performance.diskgroup.lat.resync.read| |
|vsphere.vsan.performance.diskgroup.lat.resync.read.decom| |
|vsphere.vsan.performance.diskgroup.lat.resync.read.fix.comp| |
|vsphere.vsan.performance.diskgroup.lat.resync.read.policy| |
|vsphere.vsan.performance.diskgroup.lat.resync.read.rebalance| |
|vsphere.vsan.performance.diskgroup.lat.resync.write| |
|vsphere.vsan.performance.diskgroup.lat.resync.write.decom| |
|vsphere.vsan.performance.diskgroup.lat.resync.write.fix.comp| |
|vsphere.vsan.performance.diskgroup.lat.resync.write.policy| |
|vsphere.vsan.performance.diskgroup.lat.resync.write.rebalance| |
|vsphere.vsan.performance.diskgroup.latency.avg.of.all.io| |
|vsphere.vsan.performance.diskgroup.latency.avg.read| |
|vsphere.vsan.performance.diskgroup.latency.avg.write| |
|vsphere.vsan.performance.diskgroup.latency.delay.sched| |
|vsphere.vsan.performance.diskgroup.latency.rc.read| |
|vsphere.vsan.performance.diskgroup.latency.rc.write| |
|vsphere.vsan.performance.diskgroup.latency.read.comp.mgr| |
|vsphere.vsan.performance.diskgroup.latency.recovery.unmap.comp.mgr| |
|vsphere.vsan.performance.diskgroup.latency.recovery.write.comp.mgr| |
|vsphere.vsan.performance.diskgroup.latency.sched| |
|vsphere.vsan.performance.diskgroup.latency.sched.queue.meta| |
|vsphere.vsan.performance.diskgroup.latency.sched.queue.ns| |
|vsphere.vsan.performance.diskgroup.latency.sched.queue.rec| |
|vsphere.vsan.performance.diskgroup.latency.sched.queue.vm| |
|vsphere.vsan.performance.diskgroup.latency.unmap.comp.mgr| |
|vsphere.vsan.performance.diskgroup.latency.wb.read| |
|vsphere.vsan.performance.diskgroup.latency.wb.write| |
|vsphere.vsan.performance.diskgroup.latency.write.comp.mgr| |
|vsphere.vsan.performance.diskgroup.latency.write.le| |
|vsphere.vsan.performance.diskgroup.log.congestion| |
|vsphere.vsan.performance.diskgroup.mem.congestion| |
|vsphere.vsan.performance.diskgroup.metadata.backpressure.congestion.read.sched| |
|vsphere.vsan.performance.diskgroup.metadata.backpressure.congestion.write.sched| |
|vsphere.vsan.performance.diskgroup.metadata.throughput.read.sched| |
|vsphere.vsan.performance.diskgroup.metadata.throughput.write.sched| |
|vsphere.vsan.performance.diskgroup.namespace.backpressure.congestion.read.sched| |
|vsphere.vsan.performance.diskgroup.namespace.backpressure.congestion.write.sched| |
|vsphere.vsan.performance.diskgroup.namespace.throughput.read.sched| |
|vsphere.vsan.performance.diskgroup.namespace.throughput.write.sched| |
|vsphere.vsan.performance.diskgroup.num.bitmap.rd| |
|vsphere.vsan.performance.diskgroup.num.bitmap.wrt| |
|vsphere.vsan.performance.diskgroup.num.hashmap.rd| |
|vsphere.vsan.performance.diskgroup.num.hashmap.wrt| |
|vsphere.vsan.performance.diskgroup.num.x.map.rd| |
|vsphere.vsan.performance.diskgroup.num.x.map.wrt| |
|vsphere.vsan.performance.diskgroup.oio.read.comp.mgr| |
|vsphere.vsan.performance.diskgroup.oio.rec.write| |
|vsphere.vsan.performance.diskgroup.oio.rec.write.size| |
|vsphere.vsan.performance.diskgroup.oio.recovery.unmap.comp.mgr| |
|vsphere.vsan.performance.diskgroup.oio.recovery.write.comp.mgr| |
|vsphere.vsan.performance.diskgroup.oio.unmap.comp.mgr| |
|vsphere.vsan.performance.diskgroup.oio.write| |
|vsphere.vsan.performance.diskgroup.oio.write.comp.mgr| |
|vsphere.vsan.performance.diskgroup.oio.write.size| |
|vsphere.vsan.performance.diskgroup.oob.log.congestion.iops| |
|vsphere.vsan.performance.diskgroup.outstanding.bytes.sched| |
|vsphere.vsan.performance.diskgroup.over.write.factor.moving.avg| |
|vsphere.vsan.performance.diskgroup.pending.txn.replay.yields| |
|vsphere.vsan.performance.diskgroup.plog.invalidated| |
|vsphere.vsan.performance.diskgroup.plog.invalidation.bit.not.set| |
|vsphere.vsan.performance.diskgroup.plog.patched| |
|vsphere.vsan.performance.diskgroup.plog.rcl.not.found| |
|vsphere.vsan.performance.diskgroup.quota.evictions| |
|vsphere.vsan.performance.diskgroup.rc.hit.rate| |
|vsphere.vsan.performance.diskgroup.rc.miss.rate| |
|vsphere.vsan.performance.diskgroup.rc.partial.miss.rate| |
|vsphere.vsan.performance.diskgroup.rc.size| |
|vsphere.vsan.performance.diskgroup.read.count| |
|vsphere.vsan.performance.diskgroup.read.count.decom| |
|vsphere.vsan.performance.diskgroup.read.count.fix.comp| |
|vsphere.vsan.performance.diskgroup.read.count.policy| |
|vsphere.vsan.performance.diskgroup.read.count.rebalance| |
|vsphere.vsan.performance.diskgroup.read.invalidated.bytes.patched| |
|vsphere.vsan.performance.diskgroup.read.invalidated.bytes.rawar| |
|vsphere.vsan.performance.diskgroup.read.invalidated.bytes.wasted.patched| |
|vsphere.vsan.performance.diskgroup.rec.write.count.decom| |
|vsphere.vsan.performance.diskgroup.rec.write.count.fix.comp| |
|vsphere.vsan.performance.diskgroup.rec.write.count.policy| |
|vsphere.vsan.performance.diskgroup.rec.write.count.rebalance| |
|vsphere.vsan.performance.diskgroup.regulator.iops.read.sched| |
|vsphere.vsan.performance.diskgroup.regulator.iops.write.sched| |
|vsphere.vsan.performance.diskgroup.resync.backpressure.congestion.read.sched| |
|vsphere.vsan.performance.diskgroup.resync.backpressure.congestion.write.sched| |
|vsphere.vsan.performance.diskgroup.resync.throughput.read.sched| |
|vsphere.vsan.performance.diskgroup.resync.throughput.write.sched| |
|vsphere.vsan.performance.diskgroup.slab.congestion| |
|vsphere.vsan.performance.diskgroup.ssd.bytes.drained| |
|vsphere.vsan.performance.diskgroup.ssd.congestion| |
|vsphere.vsan.performance.diskgroup.throughput.avg.of.all.io| |
|vsphere.vsan.performance.diskgroup.throughput.read| |
|vsphere.vsan.performance.diskgroup.throughput.read.comp.mgr| |
|vsphere.vsan.performance.diskgroup.throughput.recovery.unmap.comp.mgr| |
|vsphere.vsan.performance.diskgroup.throughput.recovery.write.comp.mgr| |
|vsphere.vsan.performance.diskgroup.throughput.sched| |
|vsphere.vsan.performance.diskgroup.throughput.sched.queue.meta| |
|vsphere.vsan.performance.diskgroup.throughput.sched.queue.ns| |
|vsphere.vsan.performance.diskgroup.throughput.sched.queue.rec| |
|vsphere.vsan.performance.diskgroup.throughput.sched.queue.vm| |
|vsphere.vsan.performance.diskgroup.throughput.unmap.comp.mgr| |
|vsphere.vsan.performance.diskgroup.throughput.write| |
|vsphere.vsan.performance.diskgroup.throughput.write.comp.mgr| |
|vsphere.vsan.performance.diskgroup.throughput.write.le| |
|vsphere.vsan.performance.diskgroup.tput.resync.read| |
|vsphere.vsan.performance.diskgroup.tput.resync.read.decom| |
|vsphere.vsan.performance.diskgroup.tput.resync.read.fix.comp| |
|vsphere.vsan.performance.diskgroup.tput.resync.read.policy| |
|vsphere.vsan.performance.diskgroup.tput.resync.read.rebalance| |
|vsphere.vsan.performance.diskgroup.tput.resync.write| |
|vsphere.vsan.performance.diskgroup.tput.resync.write.decom| |
|vsphere.vsan.performance.diskgroup.tput.resync.write.fix.comp| |
|vsphere.vsan.performance.diskgroup.tput.resync.write.policy| |
|vsphere.vsan.performance.diskgroup.tput.resync.write.rebalance| |
|vsphere.vsan.performance.diskgroup.txn.build.time| |
|vsphere.vsan.performance.diskgroup.txn.replay.alloc.mem.time| |
|vsphere.vsan.performance.diskgroup.txn.replay.bg.write.i.os| |
|vsphere.vsan.performance.diskgroup.txn.replay.bitmap.time| |
|vsphere.vsan.performance.diskgroup.txn.replay.fg.write.i.os| |
|vsphere.vsan.performance.diskgroup.txn.replay.hashmap.time| |
|vsphere.vsan.performance.diskgroup.txn.replay.insert.req.time| |
|vsphere.vsan.performance.diskgroup.txn.replay.memcpy.time| |
|vsphere.vsan.performance.diskgroup.txn.replay.read.io.hits| |
|vsphere.vsan.performance.diskgroup.txn.replay.time| |
|vsphere.vsan.performance.diskgroup.txn.replay.xmap.time| |
|vsphere.vsan.performance.diskgroup.txn.write.time| |
|vsphere.vsan.performance.diskgroup.vmdisk.backpressure.congestion.read.sched| |
|vsphere.vsan.performance.diskgroup.vmdisk.backpressure.congestion.write.sched| |
|vsphere.vsan.performance.diskgroup.vmdisk.throughput.read.sched| |
|vsphere.vsan.performance.diskgroup.vmdisk.throughput.write.sched| |
|vsphere.vsan.performance.diskgroup.war.evictions| |
|vsphere.vsan.performance.diskgroup.wb.free.pct| |
|vsphere.vsan.performance.diskgroup.wb.size| |
|vsphere.vsan.performance.diskgroup.write.count| |
|vsphere.vsan.performance.diskgroup.zero.bytes.drained| |
|vsphere.vsan.performance.domworldcpu.*|vSAN performance metrics for distributed object manager (DOM) CPU. |
|vsphere.vsan.performance.domworldcpu.ready.pct| |
|vsphere.vsan.performance.domworldcpu.used.pct| |
|vsphere.vsan.performance.hostcpu.*|vSAN performance metrics for host CPU. |
|vsphere.vsan.performance.hostcpu.core.util.pct| |
|vsphere.vsan.performance.hostcpu.pcpu.used.pct| |
|vsphere.vsan.performance.hostcpu.pcpu.util.pct| |
|vsphere.vsan.performance.hostdomclient.*|vSAN performance metrics for host distributed object manager (DOM) client. |
|vsphere.vsan.performance.hostdomclient.client.cache.hit.rate| |
|vsphere.vsan.performance.hostdomclient.client.cache.hits| |
|vsphere.vsan.performance.hostdomclient.congestion| |
|vsphere.vsan.performance.hostdomclient.io.count| |
|vsphere.vsan.performance.hostdomclient.iops| |
|vsphere.vsan.performance.hostdomclient.iops.read| |
|vsphere.vsan.performance.hostdomclient.iops.unmap| |
|vsphere.vsan.performance.hostdomclient.iops.write| |
|vsphere.vsan.performance.hostdomclient.latency.avg| |
|vsphere.vsan.performance.hostdomclient.latency.avg.read| |
|vsphere.vsan.performance.hostdomclient.latency.avg.unmap| |
|vsphere.vsan.performance.hostdomclient.latency.avg.write| |
|vsphere.vsan.performance.hostdomclient.latency.stddev| |
|vsphere.vsan.performance.hostdomclient.latency.stddev.read| |
|vsphere.vsan.performance.hostdomclient.latency.stddev.unmap| |
|vsphere.vsan.performance.hostdomclient.latency.stddev.write| |
|vsphere.vsan.performance.hostdomclient.num.oio| |
|vsphere.vsan.performance.hostdomclient.oio| |
|vsphere.vsan.performance.hostdomclient.read.congestion| |
|vsphere.vsan.performance.hostdomclient.read.count| |
|vsphere.vsan.performance.hostdomclient.throughput| |
|vsphere.vsan.performance.hostdomclient.throughput.read| |
|vsphere.vsan.performance.hostdomclient.throughput.unmap| |
|vsphere.vsan.performance.hostdomclient.throughput.write| |
|vsphere.vsan.performance.hostdomclient.unmap.congestion| |
|vsphere.vsan.performance.hostdomclient.unmap.count| |
|vsphere.vsan.performance.hostdomclient.write.congestion| |
|vsphere.vsan.performance.hostdomclient.write.count| |
|vsphere.vsan.performance.hostdomcompmgr.*|vSAN performance metrics for the component manager that's part of host distributed object manager (DOM).|
|vsphere.vsan.performance.hostdomcompmgr.component.congestion| |
|vsphere.vsan.performance.hostdomcompmgr.congestion| |
|vsphere.vsan.performance.hostdomcompmgr.io.count| |
|vsphere.vsan.performance.hostdomcompmgr.iops| |
|vsphere.vsan.performance.hostdomcompmgr.iops.read| |
|vsphere.vsan.performance.hostdomcompmgr.iops.rec.unmap| |
|vsphere.vsan.performance.hostdomcompmgr.iops.rec.write| |
|vsphere.vsan.performance.hostdomcompmgr.iops.resync.read| |
|vsphere.vsan.performance.hostdomcompmgr.iops.unmap| |
|vsphere.vsan.performance.hostdomcompmgr.iops.write| |
|vsphere.vsan.performance.hostdomcompmgr.lat.avg.resync.read| |
|vsphere.vsan.performance.hostdomcompmgr.latency.avg| |
|vsphere.vsan.performance.hostdomcompmgr.latency.avg.read| |
|vsphere.vsan.performance.hostdomcompmgr.latency.avg.rec.unmap| |
|vsphere.vsan.performance.hostdomcompmgr.latency.avg.rec.write| |
|vsphere.vsan.performance.hostdomcompmgr.latency.avg.unmap| |
|vsphere.vsan.performance.hostdomcompmgr.latency.avg.write| |
|vsphere.vsan.performance.hostdomcompmgr.latency.stddev| |
|vsphere.vsan.performance.hostdomcompmgr.latency.stddev.read| |
|vsphere.vsan.performance.hostdomcompmgr.latency.stddev.unmap| |
|vsphere.vsan.performance.hostdomcompmgr.latency.stddev.write| |
|vsphere.vsan.performance.hostdomcompmgr.metadata.dispatched.cost.read| |
|vsphere.vsan.performance.hostdomcompmgr.metadata.dispatched.cost.write| |
|vsphere.vsan.performance.hostdomcompmgr.metadata.queue.depth.read| |
|vsphere.vsan.performance.hostdomcompmgr.metadata.queue.depth.write| |
|vsphere.vsan.performance.hostdomcompmgr.namespace.dispatched.cost.read| |
|vsphere.vsan.performance.hostdomcompmgr.namespace.dispatched.cost.write| |
|vsphere.vsan.performance.hostdomcompmgr.namespace.queue.depth.read| |
|vsphere.vsan.performance.hostdomcompmgr.namespace.queue.depth.write| |
|vsphere.vsan.performance.hostdomcompmgr.num.oio| |
|vsphere.vsan.performance.hostdomcompmgr.oio| |
|vsphere.vsan.performance.hostdomcompmgr.read.congestion| |
|vsphere.vsan.performance.hostdomcompmgr.read.count| |
|vsphere.vsan.performance.hostdomcompmgr.rec.unmap.congestion| |
|vsphere.vsan.performance.hostdomcompmgr.rec.unmap.count| |
|vsphere.vsan.performance.hostdomcompmgr.rec.write.congestion| |
|vsphere.vsan.performance.hostdomcompmgr.rec.write.count| |
|vsphere.vsan.performance.hostdomcompmgr.regulator.iops.read| |
|vsphere.vsan.performance.hostdomcompmgr.regulator.iops.write| |
|vsphere.vsan.performance.hostdomcompmgr.resync.dispatched.cost.read| |
|vsphere.vsan.performance.hostdomcompmgr.resync.dispatched.cost.write| |
|vsphere.vsan.performance.hostdomcompmgr.resync.queue.depth.read| |
|vsphere.vsan.performance.hostdomcompmgr.resync.queue.depth.write| |
|vsphere.vsan.performance.hostdomcompmgr.resync.read.congestion| |
|vsphere.vsan.performance.hostdomcompmgr.resync.read.count| |
|vsphere.vsan.performance.hostdomcompmgr.shared.congestion| |
|vsphere.vsan.performance.hostdomcompmgr.throughput| |
|vsphere.vsan.performance.hostdomcompmgr.throughput.read| |
|vsphere.vsan.performance.hostdomcompmgr.throughput.rec.unmap| |
|vsphere.vsan.performance.hostdomcompmgr.throughput.rec.write| |
|vsphere.vsan.performance.hostdomcompmgr.throughput.unmap| |
|vsphere.vsan.performance.hostdomcompmgr.throughput.write| |
|vsphere.vsan.performance.hostdomcompmgr.tput.resync.read| |
|vsphere.vsan.performance.hostdomcompmgr.unmap.congestion| |
|vsphere.vsan.performance.hostdomcompmgr.unmap.count| |
|vsphere.vsan.performance.hostdomcompmgr.vmdisk.dispatched.cost.read| |
|vsphere.vsan.performance.hostdomcompmgr.vmdisk.dispatched.cost.write| |
|vsphere.vsan.performance.hostdomcompmgr.vmdisk.queue.depth.read| |
|vsphere.vsan.performance.hostdomcompmgr.vmdisk.queue.depth.write| |
|vsphere.vsan.performance.hostdomcompmgr.write.congestion| |
|vsphere.vsan.performance.hostdomcompmgr.write.count| |
|vsphere.vsan.performance.hostdomowner.*|Distributed object manager owner performance metrics. |
|vsphere.vsan.performance.hostdomowner.avg.resync.parallelism| |
|vsphere.vsan.performance.hostdomowner.congestion| |
|vsphere.vsan.performance.hostdomowner.io.count| |
|vsphere.vsan.performance.hostdomowner.iops| |
|vsphere.vsan.performance.hostdomowner.iops.read| |
|vsphere.vsan.performance.hostdomowner.iops.rec.unmap| |
|vsphere.vsan.performance.hostdomowner.iops.rec.write| |
|vsphere.vsan.performance.hostdomowner.iops.resync.read| |
|vsphere.vsan.performance.hostdomowner.iops.unmap| |
|vsphere.vsan.performance.hostdomowner.iops.write| |
|vsphere.vsan.performance.hostdomowner.latency.avg| |
|vsphere.vsan.performance.hostdomowner.latency.avg.read| |
|vsphere.vsan.performance.hostdomowner.latency.avg.rec.unmap| |
|vsphere.vsan.performance.hostdomowner.latency.avg.rec.write| |
|vsphere.vsan.performance.hostdomowner.latency.avg.resync.read| |
|vsphere.vsan.performance.hostdomowner.latency.avg.unmap| |
|vsphere.vsan.performance.hostdomowner.latency.avg.write| |
|vsphere.vsan.performance.hostdomowner.latency.stddev| |
|vsphere.vsan.performance.hostdomowner.latency.stddev.read| |
|vsphere.vsan.performance.hostdomowner.latency.stddev.unmap| |
|vsphere.vsan.performance.hostdomowner.latency.stddev.write| |
|vsphere.vsan.performance.hostdomowner.num.complete.resync.ops| |
|vsphere.vsan.performance.hostdomowner.num.complete.resync.rwr.batches| |
|vsphere.vsan.performance.hostdomowner.num.complete.rwr.ops| |
|vsphere.vsan.performance.hostdomowner.num.oio| |
|vsphere.vsan.performance.hostdomowner.oio| |
|vsphere.vsan.performance.hostdomowner.read.congestion| |
|vsphere.vsan.performance.hostdomowner.read.count| |
|vsphere.vsan.performance.hostdomowner.read.leaf.owner.latency| |
|vsphere.vsan.performance.hostdomowner.rec.unmap.count| |
|vsphere.vsan.performance.hostdomowner.rec.write.count| |
|vsphere.vsan.performance.hostdomowner.recovery.unmap.congestion| |
|vsphere.vsan.performance.hostdomowner.recovery.unmap.leaf.owner.latency| |
|vsphere.vsan.performance.hostdomowner.recovery.write.congestion| |
|vsphere.vsan.performance.hostdomowner.recovery.write.leaf.owner.latency| |
|vsphere.vsan.performance.hostdomowner.resync.read.count| |
|vsphere.vsan.performance.hostdomowner.throughput| |
|vsphere.vsan.performance.hostdomowner.tput.read| |
|vsphere.vsan.performance.hostdomowner.tput.rec.unmap| |
|vsphere.vsan.performance.hostdomowner.tput.rec.write| |
|vsphere.vsan.performance.hostdomowner.tput.resync.read| |
|vsphere.vsan.performance.hostdomowner.tput.unmap| |
|vsphere.vsan.performance.hostdomowner.tput.write| |
|vsphere.vsan.performance.hostdomowner.unmap.congestion| |
|vsphere.vsan.performance.hostdomowner.unmap.count| |
|vsphere.vsan.performance.hostdomowner.unmap.leaf.owner.latency| |
|vsphere.vsan.performance.hostdomowner.write.congestion| |
|vsphere.vsan.performance.hostdomowner.write.count| |
|vsphere.vsan.performance.hostdomowner.write.leaf.owner.latency| |
|vsphere.vsan.performance.hostmemoryheap.*|Host memory heap vSAN performance metrics. |
|vsphere.vsan.performance.hostmemoryheap.heap.alloc.failures| |
|vsphere.vsan.performance.hostmemoryheap.heap.util| |
|vsphere.vsan.performance.hostmemoryslab.slab.alloc.failures| |
|vsphere.vsan.performance.hostmemoryslab.slab.util| |
|vsphere.vsan.performance.lsomworldcpu.*|vSAN performance metrics related to LSOM (Local Log Stuctured Object Management). |
|vsphere.vsan.performance.lsomworldcpu.ready.pct| |
|vsphere.vsan.performance.lsomworldcpu.used.pct| |
|vsphere.vsan.performance.nicworldcpu.*| |
|vsphere.vsan.performance.nicworldcpu.ready.pct| |
|vsphere.vsan.performance.nicworldcpu.used.pct| |
|vsphere.vsan.performance.systemmem.*|System memory performance metrics for vSAN. |
|vsphere.vsan.performance.systemmem.overcommit.ratio| |
|vsphere.vsan.performance.systemmem.pct.mem.used| |
|vsphere.vsan.performance.systemmem.total.mb.mem.used| |
|vsphere.vsan.performance.virtualdisk.*|vSAN metrics for virtual disk performance. |
|vsphere.vsan.performance.virtualdisk.iops.limit| |
|vsphere.vsan.performance.virtualdisk.niops| |
|vsphere.vsan.performance.virtualdisk.niops.delayed| |
|vsphere.vsan.performance.virtualmachine.*|vSAN metrics for virtual machine performance. |
|vsphere.vsan.performance.virtualmachine.iops.read| |
|vsphere.vsan.performance.virtualmachine.iops.write| |
|vsphere.vsan.performance.virtualmachine.latency.read| |
|vsphere.vsan.performance.virtualmachine.latency.write| |
|vsphere.vsan.performance.virtualmachine.read.count| |
|vsphere.vsan.performance.virtualmachine.throughput.read| |
|vsphere.vsan.performance.virtualmachine.throughput.write| |
|vsphere.vsan.performance.virtualmachine.write.count| |
|vsphere.vsan.performance.vsanclustercapacity.*|vSAN performance metrics for cluster capacity. |
|vsphere.vsan.performance.vsanclustercapacity.dedup.ratio| |
|vsphere.vsan.performance.vsanclustercapacity.free| |
|vsphere.vsan.performance.vsanclustercapacity.saved.by.dedup| |
|vsphere.vsan.performance.vsanclustercapacity.total| |
|vsphere.vsan.performance.vsanclustercapacity.used| |
|vsphere.vsan.performance.vsanhostnet.*|vSAN performance metrics related to the vSAN host network. |
|vsphere.vsan.performance.vsanhostnet.io.chain.rxdrops| |
|vsphere.vsan.performance.vsanhostnet.io.chain.txdrops| |
|vsphere.vsan.performance.vsanhostnet.port.rx.drops| |
|vsphere.vsan.performance.vsanhostnet.port.rxpkts| |
|vsphere.vsan.performance.vsanhostnet.port.tx.drops| |
|vsphere.vsan.performance.vsanhostnet.port.txpkts| |
|vsphere.vsan.performance.vsanhostnet.rx.packets| |
|vsphere.vsan.performance.vsanhostnet.rx.packets.loss.rate| |
|vsphere.vsan.performance.vsanhostnet.rx.throughput| |
|vsphere.vsan.performance.vsanhostnet.tcp.rx.err.rate| |
|vsphere.vsan.performance.vsanhostnet.tcp.rx.packets| |
|vsphere.vsan.performance.vsanhostnet.tcp.tx.packets| |
|vsphere.vsan.performance.vsanhostnet.tcp.tx.rexmit.rate| |
|vsphere.vsan.performance.vsanhostnet.tx.packets| |
|vsphere.vsan.performance.vsanhostnet.tx.packets.loss.rate| |
|vsphere.vsan.performance.vsanhostnet.tx.throughput| |
|vsphere.vsan.performance.vsanpnicnet.*|vSAN performance metrics related to physical NIC operations.|
|vsphere.vsan.performance.vsanpnicnet.io.chain.drops| |
|vsphere.vsan.performance.vsanpnicnet.io.chain.rxdrops| |
|vsphere.vsan.performance.vsanpnicnet.io.chain.txdrops| |
|vsphere.vsan.performance.vsanpnicnet.pause.count| |
|vsphere.vsan.performance.vsanpnicnet.port.rx.drops| |
|vsphere.vsan.performance.vsanpnicnet.port.rxpkts| |
|vsphere.vsan.performance.vsanpnicnet.port.tx.drops| |
|vsphere.vsan.performance.vsanpnicnet.port.txpkts| |
|vsphere.vsan.performance.vsanpnicnet.rx.packets| |
|vsphere.vsan.performance.vsanpnicnet.rx.packets.loss.rate| |
|vsphere.vsan.performance.vsanpnicnet.rx.throughput| |
|vsphere.vsan.performance.vsanpnicnet.tx.packets| |
|vsphere.vsan.performance.vsanpnicnet.tx.packets.loss.rate| |
|vsphere.vsan.performance.vsanpnicnet.tx.throughput| |
|vsphere.vsan.performance.vsanvnicnet.*|vSAN performance metrics related to virtual NIC (vnic) operations.|
|vsphere.vsan.performance.vsanvnicnet.io.chain.drops| |
|vsphere.vsan.performance.vsanvnicnet.io.chain.rxdrops| |
|vsphere.vsan.performance.vsanvnicnet.io.chain.txdrops| |
|vsphere.vsan.performance.vsanvnicnet.ip.errs| |
|vsphere.vsan.performance.vsanvnicnet.ip.total| |
|vsphere.vsan.performance.vsanvnicnet.ip6.errs| |
|vsphere.vsan.performance.vsanvnicnet.ip6.total| |
|vsphere.vsan.performance.vsanvnicnet.port.rx.drops| |
|vsphere.vsan.performance.vsanvnicnet.port.rxpkts| |
|vsphere.vsan.performance.vsanvnicnet.port.tx.drops| |
|vsphere.vsan.performance.vsanvnicnet.port.txpkts| |
|vsphere.vsan.performance.vsanvnicnet.rx.packets| |
|vsphere.vsan.performance.vsanvnicnet.rx.packets.loss.rate| |
|vsphere.vsan.performance.vsanvnicnet.rx.throughput| |
|vsphere.vsan.performance.vsanvnicnet.tcp.errs| |
|vsphere.vsan.performance.vsanvnicnet.tcp.halfopen.drop.rate| |
|vsphere.vsan.performance.vsanvnicnet.tcp.rcvdupack.rate| |
|vsphere.vsan.performance.vsanvnicnet.tcp.rcvduppack.rate| |
|vsphere.vsan.performance.vsanvnicnet.tcp.rcvoopack.rate| |
|vsphere.vsan.performance.vsanvnicnet.tcp.rx.err.rate| |
|vsphere.vsan.performance.vsanvnicnet.tcp.rx.packets| |
|vsphere.vsan.performance.vsanvnicnet.tcp.rx.throughput| |
|vsphere.vsan.performance.vsanvnicnet.tcp.sack.rcv.blocks.rate| |
|vsphere.vsan.performance.vsanvnicnet.tcp.sack.rexmits.rate| |
|vsphere.vsan.performance.vsanvnicnet.tcp.sack.send.blocks.rate| |
|vsphere.vsan.performance.vsanvnicnet.tcp.snd.zero.win| |
|vsphere.vsan.performance.vsanvnicnet.tcp.timeout.drop.rate| |
|vsphere.vsan.performance.vsanvnicnet.tcp.tx.packets| |
|vsphere.vsan.performance.vsanvnicnet.tcp.tx.rexmit.rate| |
|vsphere.vsan.performance.vsanvnicnet.tcp.tx.throughput| |
|vsphere.vsan.performance.vsanvnicnet.tx.packets| |
|vsphere.vsan.performance.vsanvnicnet.tx.packets.loss.rate| |
|vsphere.vsan.performance.vsanvnicnet.tx.throughput| |
|vsphere.vsan.performance.vscsi.*|vSAN performance metrics related to virtual SCSI. |
|vsphere.vsan.performance.vscsi.iops.read| |
|vsphere.vsan.performance.vscsi.iops.write| |
|vsphere.vsan.performance.vscsi.latency.read| |
|vsphere.vsan.performance.vscsi.latency.write| |
|vsphere.vsan.performance.vscsi.read.count| |
|vsphere.vsan.performance.vscsi.throughput.read| |
|vsphere.vsan.performance.vscsi.throughput.write| |
|vsphere.vsan.performance.vscsi.write.count| |

