---
title: Microsoft Hyper-V Integration
tags: [integrations list]
permalink: hyperv.html
summary: Learn about the Microsoft Hyper-V Integration.
---
## Microsoft Hyper-V Integration

Microsoft Hyper-V is a server virtualization platform that provides virtualization services through hypervisor-based emulations.

This integration installs and configures Telegraf to send Hyper-V metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some charts in the Hyper-V dashboard.

{% include image.md src="images/hyperv-dashboard1.png" width="80" %}
{% include image.md src="images/hyperv-dashboard2.png" width="80" %}
{% include image.md src="images/hyperv-dashboard3.png" width="80" %}

## Microsoft Hyper-V Setup



### Step 1: Set up a Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network, install a proxy.

### Step 2: Install the Telegraf Agent

{% include windows_telegraf.md %}

### Step 3. Configure the Hyper-V Input Plugin

Edit the `telegraf.conf` file located in `Program Files\Telegraf\` and enter the following snippet:
{% raw %}
   ```
   [[inputs.win_perf_counters.object]]
     ObjectName = "Hyper-V Virtual Machine Health Summary"
     Instances = ["------"]
     Measurement = "hyperv.vm.health"
     Counters = ["Health Ok", "Health Critical"]

   [[inputs.win_perf_counters.object]]
     ObjectName = "Hyper-V Dynamic Memory VM"
     Instances = ["*"]
     Measurement = "hyperv.vm.memory"
     Counters = ["Physical Memory", "Added Memory", "Guest Visible Physical Memory"]

   [[inputs.win_perf_counters.object]]
     ObjectName = "Hyper-V Hypervisor Virtual Processor"
     Instances = ["*"]
     Measurement = "hyperv.hypervisor.virtual.processor"
     Counters = ["% Guest Run Time", "% Hypervisor Run Time", "% Total Run Time"]

   [[inputs.win_perf_counters.object]]
     ObjectName = "Hyper-V Hypervisor Root Virtual Processor"
     Instances = ["*"]
     Measurement = "hyperv.hypervisor.root.virtual.processor"
     Counters = ["% Guest Run Time", "% Hypervisor Run Time", "% Total Run Time"]
     IncludeTotal = true

   [[inputs.win_perf_counters.object]]
     ObjectName = "Hyper-V Virtual IDE Controller (Emulated)"
     Instances = ["*"]
     Measurement = "hyperv.virtual.ide.controller"
     Counters = ["Write Bytes/sec", "Read Bytes/sec", "Written Sectors/sec", "Read Sectors/sec"]

   [[inputs.win_perf_counters.object]]
     ObjectName = "Hyper-V Virtual Network Adapter"
     Instances = ["*"]
     Measurement = "hyperv.virtual.net.adapter"
     Counters = ["Bytes/sec", "Bytes Received/sec", "Bytes Sent/Sec", "Packets Sent/sec", "Packets Received/sec", "Packets/sec"]

   [[inputs.win_perf_counters.object]]
     ObjectName = "Hyper-V Legacy Network Adapter"
     Instances = ["*"]
     Measurement = "hyperv.legacy.net.adapter"
     Counters = ["Bytes Dropped", "Bytes Received/sec", "Bytes Sent/Sec"]

   [[inputs.win_perf_counters.object]]
     ObjectName = "Hyper-V Hypervisor Partition"
     Instances = ["*"]
     Measurement = "hyperv.hypervisor.partition"
     Counters = ["Virtual Processors"]

   [[inputs.win_perf_counters.object]]
     ObjectName = "Hyper-V Virtual Storage Device"
     Instances = ["*"]
     Measurement = "hyperv.virtual.storage.device"
     Counters = [
               "Maximum Bandwidth", "Read Bytes/sec", "Write Bytes/sec", "Queue Length",
               "Lower Latency", "Minimum IO Rate", "Maximum IO Rate", "Latency", "Throughput",
               "Lower Queue Length", "Queue Length", "Normalized Throughput", "Write Operations/Sec",
               "Read Operations/Sec", "Write Bytes/sec", "Read Bytes/sec", "Error Count",
               "Flush Count", "Write Count", "Read Count"
             ]

   [[inputs.win_perf_counters.object]]
     ObjectName = "Processor"
     Instances = ["*"]
     Counters = ["% Idle Time", "% Interrupt Time", "% Privileged Time", "% Processor Time", "% User Time", "Interrupts/sec"]
     Measurement = "hyperv.host.cpu"
     IncludeTotal = true

   [[inputs.win_perf_counters.object]]
     ObjectName = "LogicalDisk"
     Instances = ["*"]
     Counters = ["% Disk Read Time", "% Disk Write Time", "% Free Space", "% Idle Time", "Avg. Disk Bytes/Read", "Avg. Disk Bytes/Write", "Avg. Disk Queue Length", "Avg. Disk sec/Read", "Avg. Disk sec/Write", "Avg. Disk Write Queue Length", "Free Megabytes", "Split IO/Sec"]
     Measurement = "hyperv.host.disk"
     IncludeTotal = true

   [[inputs.win_perf_counters.object]]
     ObjectName = "Memory"
     Counters = ["Available Bytes", "Cache Bytes", "Committed Bytes", "Cache Faults/sec", "Demand Zero Faults/sec", "Page Faults/sec", "Pages/sec", "Transition Faults/sec", "Pool Nonpaged Bytes", "Pool Paged Bytes"]
     Instances = ["------"]
     Measurement = "hyperv.host.mem"

   [[inputs.win_perf_counters.object]]
     ObjectName = "Network Interface"
     Counters = ["Bytes Received/sec", "Bytes Sent/sec", "Packets Outbound Discarded", "Packets Outbound Errors", "Packets Received Discarded", "Packets Received Errors", "Packets Received/sec", "Packets Sent/sec", "Bytes Total/sec", "Current Bandwidth", "Output Queue Length"]
     Instances = ["*"] 
     Measurement = "hyperv.host.net"
     IncludeTotal = true

   [[inputs.win_perf_counters.object]]
     ObjectName = "System"
     Counters = ["Context Switches/sec", "Processes", "Processor Queue Length", "System Calls/sec", "System Up Time", "Threads"]
     Instances = ["------"]
     Measurement = "hyperv.host.system"

   [[inputs.win_perf_counters.object]]
     ObjectName = "Process"
     Counters = ["% Privileged Time", "% Processor Time", "% User Time", "Elapsed Time", "Handle Count", "IO Read Bytes/sec", "IO Read Operations/sec", "IO Write Bytes/sec", "IO Write Operations/sec", "Private Bytes", "Thread Count", "Virtual Bytes", "Working Set", "Working Set - Private"]
     Instances = ["_Total"]
     Measurement = "hyperv.host.process"
   ```
{% endraw %}
### Step 4. Restart Telegraf

Restart Telegraf from the Windows Services Management Console or run the following commands from the command prompt:
{% raw %}
   ```
   net stop telegraf
   net start telegraf
   ```
{% endraw %}



