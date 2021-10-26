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
|zabbix.agent.ping||
|zabbix.kernel.maxfiles||
|zabbix.kernel.maxproc||
|zabbix.net.if.in.ens160||
|zabbix.net.if.out.ens160||
|zabbix.preprocessing_queue||
|zabbix.proc.num||
|zabbix.proc.num.run||
|zabbix.process.alert.manager.avg.busy||
|zabbix.process.alerter.avg.busy||
|zabbix.process.configuration.syncer.avg.busy||
|zabbix.process.discoverer.avg.busy||
|zabbix.process.escalator.avg.busy||
|zabbix.process.history.syncer.avg.busy||
|zabbix.process.housekeeper.avg.busy||
|zabbix.process.http.poller.avg.busy||
|zabbix.process.icmp.pinger.avg.busy||
|zabbix.process.poller.avg.busy||
|zabbix.process.preprocessing.manager.avg.busy||
|zabbix.process.preprocessing.worker.avg.busy||
|zabbix.process.proxy.poller.avg.busy||
|zabbix.process.self-monitoring.avg.busy||
|zabbix.process.task.manager.avg.busy||
|zabbix.process.timer.avg.busy||
|zabbix.process.trapper.avg.busy||
|zabbix.process.unreachable.poller.avg.busy||
|zabbix.queue||
|zabbix.queue.10m||
|zabbix.rcache.buffer.pused||
|zabbix.system.boottime||
|zabbix.system.cpu.intr||
|zabbix.system.cpu.load.percpu.avg1||
|zabbix.system.cpu.load.percpu.avg15||
|zabbix.system.cpu.load.percpu.avg5||
|zabbix.system.cpu.switches||
|zabbix.system.cpu.util.guest||
|zabbix.system.cpu.util.guest_nice||
|zabbix.system.cpu.util.idle||
|zabbix.system.cpu.util.interrupt||
|zabbix.system.cpu.util.iowait||
|zabbix.system.cpu.util.nice||
|zabbix.system.cpu.util.softirq||
|zabbix.system.cpu.util.steal||
|zabbix.system.cpu.util.system||
|zabbix.system.cpu.util.user||
|zabbix.system.localtime||
|zabbix.system.swap.size.free||
|zabbix.system.swap.size.pfree||
|zabbix.system.swap.size.total||
|zabbix.system.uptime||
|zabbix.system.users.num||
|zabbix.vcache.buffer.pused||
|zabbix.vcache.cache.hits||
|zabbix.vcache.cache.misses||
|zabbix.vcache.cache.mode||
|zabbix.vfs.file.cksum.etc.passwd||
|zabbix.vfs.fs.inode.pfree||
|zabbix.vfs.fs.size.free||
|zabbix.vfs.fs.size.pfree||
|zabbix.vfs.fs.size.total||
|zabbix.vfs.fs.size.used||
|zabbix.vm.memory.size.available||
|zabbix.vm.memory.size.total||
|zabbix.wcache.history.pused||
|zabbix.wcache.index.pused||
|zabbix.wcache.trend.pused||
|zabbix.wcache.values||
|zabbix.wcache.values.float||
|zabbix.wcache.values.log||
|zabbix.wcache.values.not.supported||
|zabbix.wcache.values.str||
|zabbix.wcache.values.text||
|zabbix.wcache.values.uint||

