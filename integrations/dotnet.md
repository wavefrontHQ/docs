---
title: .NET Integration
tags: [integrations list]
permalink: dotnet.html
summary: Learn about the Wavefront .NET Integration.
---
## .NET Integration

The .NET Framework provides tools for building networked applications, distributed web services and web applications.
This integration installs and configures Telegraf to send .NET performance metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the Overview section of a dashboard displaying .NET metrics:

{% include image.md src="images/dotnet_dashboard.png" width="80" %}

## .NET Setup

This integration uses Windows performance counters specific to the .NET framework's Telegraf input plugin for CLR and managed code.



Supported .NET Version(s): 3.5 & later

    **Note:**  This integration is supported only on Windows.

### Step 1: Set up a Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network, install a proxy.

### Step 2: Install the Telegraf Agent

{% include windows_telegraf.md %}

### Step 3: Configure the .NET Input Plugin

Edit the `telegraf.conf` file located in `Program Files\Telegraf\` and enter the following snippet:
{% raw %}
   ```
  [[inputs.win_perf_counters.object]]
    # .NET CLR Exceptions, in this case for IIS only
    ObjectName = ".NET CLR Exceptions"
    Counters = [
                "# of Exceps Thrown", "# of Exceps Thrown / Sec", "# of Filters / Sec",
                "# of Finallys / Sec", "Throw to Catch Depth / Sec"
               ]
    Instances = ["w3wp"]
    Measurement = "dotnet_exceptions"
    #IncludeTotal=false #Set to true to include _Total instance when querying for all (*).

  [[inputs.win_perf_counters.object]]
    # .NET CLR Exceptions, in this case for IIS only
    ObjectName = ".NET CLR Interop"
    Counters = [
                "# of CCWs","# of marshaling","# of Stubs","# of TLB exports / sec","# of TLB imports / sec"
               ]
    Instances = ["w3wp"]
    Measurement = "dotnet_interop"
    #IncludeTotal=false #Set to true to include _Total instance when querying for all (*).
	
  [[inputs.win_perf_counters.object]]
    # .NET CLR Jit, in this case for IIS only
    ObjectName = ".NET CLR Jit"
    Counters = [
                "# of IL Bytes JITted","# of Methods JITted","% Time in Jit","IL Bytes Jitted / sec",
                "Standard Jit Failures","Total # of IL Bytes Jitted"
               ]
    Instances = ["w3wp"]
    Measurement = "dotnet_jit"
    #IncludeTotal=false #Set to true to include _Total instance when querying for all (*).

  [[inputs.win_perf_counters.object]]
    # .NET CLR Loading, in this case for IIS only
    ObjectName = ".NET CLR Loading"
    Counters = [
                "% Time Loading","Assembly Search Length","Bytes in Loader Heap","Current appdomains","Current Assemblies",
                "Current Classes Loaded","Rate of appdomains","Rate of appdomains unloaded","Rate of Assemblies",
                "Rate of Classes Loaded","Rate of Load Failure","Total # of Load Failures","Total Appdomains",
                "Total appdomains unloaded","Total Assemblies","Total Classes Loaded"
               ]
    Instances = ["w3wp"]
    Measurement = "dotnet_loading"
    #IncludeTotal=false #Set to true to include _Total instance when querying for all (*).

  [[inputs.win_perf_counters.object]]
    # .NET CLR LocksAndThreads, in this case for IIS only
    ObjectName = ".NET CLR LocksAndThreads"
    Counters = [
                "# of current logical Threads","# of current physical Threads","# of current recognized threads",
                "# of total recognized threads","Contention Rate / Sec","Current Queue Length","Queue Length / sec",
                "Queue Length Peak","rate of recognized threads / sec","Total # of Contentions"
               ]
    Instances = ["w3wp"]
    Measurement = "dotnet_locks"
    #IncludeTotal=false #Set to true to include _Total instance when querying for all (*).

  [[inputs.win_perf_counters.object]]
    # .NET CLR Memory, in this case for IIS only
    ObjectName = ".NET CLR Memory"
    Counters = [
                "% Time in GC","# Bytes in all Heaps","# Gen 0 Collections","# Gen 1 Collections","# Gen 2 Collections",
                "# Induced GC","Allocated Bytes/sec","Finalization Survivors","Gen 0 heap size","Gen 1 heap size",
                "Gen 2 heap size","Large Object Heap size","# of Pinned Objects","# GC Handles","# of Sink Blocks in use",
                "# Total committed Bytes","# Total reserved Bytes","Finalization Survivors","Gen 0 Promoted Bytes/Sec",
                "Gen 1 Promoted Bytes/Sec","Large Object Heap size","Process ID","Promoted Finalization-Memory from Gen 0",
                "Promoted Memory from Gen 0","Promoted Memory from Gen 1"
               ]
    Instances = ["w3wp"]
    Measurement = "dotnet_mem"
    #IncludeTotal=false #Set to true to include _Total instance when querying for all (*).

  [[inputs.win_perf_counters.object]]
    # .NET CLR Security, in this case for IIS only
    ObjectName = ".NET CLR Security"
    Counters = [
                "# Link Time Checks","% Time in RT checks","% Time Sig Authenticating","Stack Walk Depth","Total Runtime Checks"
               ]
    Instances = ["w3wp"]
    Measurement = "dotnet_security"
    #IncludeTotal=false #Set to true to include _Total instance when querying for all (*).
	
  [[inputs.win_perf_counters.object]]
    ObjectName = "Thread"
    Counters = [
                "Thread State","Priority Base","Priority Current","Context Switches/sec","% Processor Time",
                "% Privileged Time","% User Time"
               ]
    Instances = ["*"]
    Measurement = "dotnet.thread"
   ```
{% endraw %}
**Note:** In the `Overview` section of the dashboard, the `Process Working Set` chart lists all Windows process metrics by default. To show only processes related to .NET, add `Instances = ["w3wp"]` for ObjectName `Process`. 


### Step 4: Restart the Telegraf service

Use the `Windows Services Management Console` or execute the following from the command prompt:
{% raw %}
   ```
   net stop telegraf
   net start telegraf
   ```
{% endraw %}


