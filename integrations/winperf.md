---
title: Windows Performance Counters Integration
tags: [integrations list]
permalink: winperf.html
summary: Learn about the Windows Performance Counters Integration.
---
## Windows performance counters

Performance counters help you explore how well the operating system is performing. You can use performance counter data to find bottlenecks and fine tune system and application performance. This integration explains how to install and configure Telegraf to collect performance counter data and send it into Wavefront.

### Step 1: Set up the Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network, install a proxy.

### Step 2: Install the Telegraf Agent

{% include windows_telegraf.md %}

### Step 3. Configure Telegraf

Edit the `telegraf.conf` file located in `Program Files\Telegraf` and enter the following snippet:{% raw %}
```
[[inputs.win_perf_counters]]

  [[inputs.win_perf_counters.object]]
    ObjectName = "Process"
    Counters = ["% Processor Time","Handle Count","Private Bytes","Thread Count","Virtual Bytes","Working Set"]
    Instances = ["w3wp"]
    Measurement = "win_proc"
    
  [[inputs.win_perf_counters.object]]
    ObjectName = ".NET CLR Security"
    Counters = ["% Time in RT checks","Stack Walk Depth","Total Runtime Checks"]
    Instances = ["w3wp"]
    Measurement = "win_dotnet_security"

```
{% endraw %}

All options except Measurement are required. 


- **ObjectName** -- The object to query for, like `Processor`, `DirectoryServices`, or `LogicalDisk`. For example: `ObjectName = "LogicalDisk"`.
- **Instances** -- An array of one or more instances of a counter you want returned. For example: `Instances = ["C:","D:","E:"]`. If the object you specified with ObjectName does not support instance selection, specify  `Instances = ["------"]`.
- **Counters** -- Array of one or more counters you want returned. For example: `Counters = ["% Idle Time", "% Disk Read Time", "% Disk Write Time"]`.
- **Measurement** -- Optional measurement. Defaults to `win_perf_counters`. For example: `Measurement = "win_disk"`.

You need to add one `[[inputs.win_perf_counters.object]]` section for each counters category.

For more options see the [Telegraf documentation](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/win_perf_counters).

### Step 4. Restart Telegraf

After any changes restart your Telegraf agent service.



