---
title: Zabbix Integration
tags: [integrations list]
permalink: zabbix.html
summary: Learn about the Wavefront Zabbix Integration.
---
## Zabbix Integration

Wavefront provides a data adapter for Zabbix that allows you to easily send data to Wavefront. If you are already using Zabbix for monitoring, then you can use our adapter to send the same metrics to Wavefront without any configuration changes to your existing Zabbix environment. The Zabbix Database Adapter polls your Zabbix database at a configurable interval and sends new metrics to Wavefront.

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a screenshot of the dashboard displaying Zabbix metrics.

{% include image.md src="images/zabbix_dashboard.png" width="80" %}

## Zabbix Setup



### Step 1. Install the Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network, install a proxy.

### Step 2. Install MySQL Connector Library Adapter

- **CentOS**{% raw %}
  ```
  sudo yum install mysql-connector-python
  ```
{% endraw %}
- **Ubuntu**{% raw %}
  ```
  sudo pip3 install mysql-connector-python
  ```
{% endraw %}
If the package is not found, see [Installing Connector/Python from a Binary Distribution](http://dev.mysql.com/doc/connector-python/en/connector-python-installation-binary.html).


### Step 3. Download the Zabbix Adapter Script

Download the [Zabbix Adapter script](https://raw.githubusercontent.com/wavefrontHQ/zabbix/master/zabbix_db_adapter.py).

### Step 4. Configure the Adapter Script Parameters

The `SEND_TO_WF` parameter is set to `False` which causes the script to print the values it reads to standard out rather than sending to Wavefront. Once you configure the Wavefront proxy you should change this parameter to `True` and restart the script.

Set `WAVEFRONT_PROXY_HOST` to the address of the proxy you installed in Step 1.

Modify the `DB_` properties as appropriate for your Zabbix database. The user credentials that you provide can be of a DB user with read-only permission or `SELECT` privilege. Other options can be left with their defaults.

The script pulls up to `LIMIT` values from your **history** and **history_uint** tables every `POLL_INTERVAL` seconds, set to 60 seconds by default. If you modify the `LIMIT` parameter, it limits the reads from both tables.

Metrics in Wavefront are strings separated by a . character, e.g. `system.cpu.load.percpu.avg1`. The `ZABBIX_PREFIX` property allows you to prefix all of the metrics that you retrieve from Zabbix with a common string. We recommend leaving this prefix in place so that metrics collected from other sources are distinguished from Zabbix.

### Step 5. Run the Zabbix Adapter

1. Make the script executable: `chmod +x zabbixDBAdapter.py`
1. Run the script: `./zabbixDBAdapter.py`. Stop the script by pressing **Control+C**.

The script saves the latest clock interval that it has processed in the files `last_history_clock.hist` and `last_historyuint_clock.hist` in the same working directory as the script is run from. The initial clock time is “now”. If you want to start retrieving values from some point in the past, create those files and enter your preferred start time.


## Metrics
  

|Metric Name|Description|
| :--- | :--- |
|zabbix.agent.ping|Zabbix agent ping shown as a unit.|
|zabbix.kernel.maxfiles|Maximum number of opened files supported by OS.|
|zabbix.kernel.maxproc|Maximum number of processes supported by OS.|
|zabbix.net.if.in.ens160|Incoming traffic statistics on network interface.|
|zabbix.net.if.out.ens160|Outgoing traffic statistics on network interface.|
|zabbix.preprocessing_queue|Zabbix preprocessing queue.|
|zabbix.proc.num|Number of processes.|
|zabbix.proc.num.run|Number of running processes.|
|zabbix.process.alert.manager.avg.busy|Average percentage of time alert manager processes have been busy in the last minute.|
|zabbix.process.alerter.avg.busy|Average percentage of time alerter processes have been busy in the last minute.|
|zabbix.process.configuration.syncer.avg.busy|Average percentage of time configuration syncer processes have been busy in the last minute.|
|zabbix.process.discoverer.avg.busy|Average percentage of time discoverer processes have been busy in the last minute.|
|zabbix.process.escalator.avg.busy|Average percentage of time escalator processes have been busy in the last minute.|
|zabbix.process.history.syncer.avg.busy|Average percentage of time history syncer processes have been busy in the last minute.|
|zabbix.process.housekeeper.avg.busy|Average percentage of time housekeeper processes have been busy in the last minute.|
|zabbix.process.http.poller.avg.busy|Average percentage of time http poller processes have been busy in the last minute.|
|zabbix.process.icmp.pinger.avg.busy|Average percentage of time icmp pinger processes have been busy in the last minute.|
|zabbix.process.poller.avg.busy|Average percentage of time poller processes have been busy in the last minute.|
|zabbix.process.preprocessing.manager.avg.busy|Average percentage of time preprocessing manager processes have been busy in the last minute.|
|zabbix.process.preprocessing.worker.avg.busy|Average percentage of time preprocessing worker processes have been busy in the last minute.|
|zabbix.process.proxy.poller.avg.busy|Average percentage of time proxy poller processes have been busy in the last minute|
|zabbix.process.self-monitoring.avg.busy|Average percentage of time self-monitoring processes have been busy in the last minute.|
|zabbix.process.task.manager.avg.busy|Average percentage of time task manager processes have been busy in the last minute.|
|zabbix.process.timer.avg.busy|Average percentage of time timer processes have been busy in the last minute.|
|zabbix.process.trapper.avg.busy|Average percentage of time trapper processes have been busy in the last minute.|
|zabbix.process.unreachable.poller.avg.busy|Average percentage of time unreachable poller processes have been busy in the last minute.|
|zabbix.queue|Number of monitored items in the queue which are delayed at least by 6 seconds.|
|zabbix.queue.10m|Number of monitored items in the queue which are delayed at least by 10 minutes.|
|zabbix.rcache.buffer.pused|Availability statistics of Zabbix configuration cache. Percentage of used buffer.|
|zabbix.system.boottime|System boot time.|
|zabbix.system.cpu.intr|Device interrupts per second.|
|zabbix.system.cpu.load.percpu.avg1|Average CPU load per 1m.|
|zabbix.system.cpu.load.percpu.avg15|Average CPU load per 15m.|
|zabbix.system.cpu.load.percpu.avg5|Average CPU load per 5m.|
|zabbix.system.cpu.switches|Context switches per second.|
|zabbix.system.cpu.util.guest|Guest time (time spent running a virtual CPU for a guest operating system).|
|zabbix.system.cpu.util.guest_nice|Time spent running a niced guest (virtual CPU for guest operating systems under the control of the Linux kernel).|
|zabbix.system.cpu.util.idle|The time the CPU has spent doing nothing.|
|zabbix.system.cpu.util.interrupt|The amount of time the CPU has been servicing hardware interrupts.|
|zabbix.system.cpu.util.iowait|The amount of time the CPU has been waiting for I/O to complete.|
|zabbix.system.cpu.util.nice|The time the CPU has spent running users' processes that have been niced.|
|zabbix.system.cpu.util.softirq|The amount of time the CPU has been servicing software interrupts.|
|zabbix.system.cpu.util.steal|The amount of CPU 'stolen' from this virtual machine by the hypervisor for other tasks (such as running another virtual machine).|
|zabbix.system.cpu.util.system|The time the CPU has spent running the kernel and its processes.|
|zabbix.system.cpu.util.user|The time the CPU has spent running users' processes that are not niced.|
|zabbix.system.localtime|System local time of the host.|
|zabbix.system.swap.size.free|The free space of swap volume/file in bytes.|
|zabbix.system.swap.size.pfree|The free space of swap volume/file in percent.|
|zabbix.system.swap.size.total|The total space of swap volume/file in bytes.|
|zabbix.system.uptime|System uptime in `N days, hh:mm:ss` format.|
|zabbix.system.users.num|Number of users who are currently logged in.|
|zabbix.vcache.buffer.pused|Percentage of free buffer value cache.|
|zabbix.vcache.cache.hits|Number of value cache hits.|
|zabbix.vcache.cache.misses|Number of value cache misses.|
|zabbix.vcache.cache.mode|Value cache operating mode.|
|zabbix.vfs.file.cksum.etc.passwd|Checksum of /etc/passwd.|
|zabbix.vfs.fs.inode.pfree|Percentage of free filesystem inodes.|
|zabbix.vfs.fs.size.free|Free filesystem storage.|
|zabbix.vfs.fs.size.pfree|Percentage of free filesystem storage.|
|zabbix.vfs.fs.size.total|Total size of the filesystem storage.|
|zabbix.vfs.fs.size.used|Used filesystem storage.|
|zabbix.vm.memory.size.available|Available memory. In Linux, available = free + buffers + cache. On other platforms calculation may vary.|
|zabbix.vm.memory.size.total|Total memory in Bytes.|
|zabbix.wcache.history.pused|Percentage of used history buffer.|
|zabbix.wcache.index.pused|Percentage of used history index buffer.|
|zabbix.wcache.trend.pused|Percentage of used trend buffer.|
|zabbix.wcache.values|Total number of values processed by Zabbix server or Zabbix proxy, except unsupported items.|
|zabbix.wcache.values.float|Number of processed float values.|
|zabbix.wcache.values.log|Number of processed log values.|
|zabbix.wcache.values.not.supported|Number of times item processing resulted in item becoming unsupported or keeping that state.|
|zabbix.wcache.values.str|Number of processed character/string values.|
|zabbix.wcache.values.text|Number of processed text values.|
|zabbix.wcache.values.uint|Number of processed unsigned integer values.|


