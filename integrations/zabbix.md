---
title: Zabbix Integration
tags: [integrations list]
permalink: zabbix.html
summary: Learn about the Wavefront Zabbix Integration.
---
## Zabbix Integration

Wavefront provides a data adapter for Zabbix that allows you to easily send data to Wavefront. If you are already using Zabbix for monitoring, then you can use our adapter to send the same metrics to Wavefront without any configuration changes to your existing Zabbix environment. The Zabbix Database Adapter polls your Zabbix database at a configurable interval and sends new metrics to Wavefront.
## Zabbix Setup

Tested against Zabbix 2.2 with MySQL back end. The script is written in Python and has been tested on Python 2.7.6 and Python 3.4.0.



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
  sudo apt-get install python-mysql.connector
  ```
{% endraw %}
If the package is not found, see [Installing Connector/Python from a Binary Distribution](http://dev.mysql.com/doc/connector-python/en/connector-python-installation-binary.html).


### Step 3. Download the Zabbix Adapter Script

Download the [Zabbix Adapter script](https://raw.githubusercontent.com/wavefrontHQ/zabbix/master/zabbixDBAdapter.py).

### Step 4. Configure the Adapter Script Parameters

The `SEND_TO_WF` parameter is set to `False` which causes the script to print the values it reads to standard out rather than sending to Wavefront. Once you configure the Wavefront proxy you should change this parameter to `True` and restart the script.

Set `WAVEFRONT_PROXY_HOST` to the address of the proxy you installed in Step 1.

Modify the `DB_` properties as appropriate for your Zabbix database. Other options can be left with their defaults.

The script pulls up to `LIMIT` values from your **history** and **history_uint** tables every `POLL_INTERVAL` seconds, set to 60 seconds by default. If you modify the `LIMIT` parameter, it limits the reads from both tables.

Metrics in Wavefront are strings separated by a . character, e.g. `system.cpu.load.percpu.avg1`. The `ZABBIX_PREFIX` property allows you to prefix all of the metrics that you retrieve from Zabbix with a common string. We recommend leaving this prefix in place so that metrics collected from other sources are distinguished from Zabbix.

### Step 5. Run the Zabbix Adapter

1. Make the script executable: `chmod +x zabbixDBAdapter.py`
1. Run the script: `./zabbixDBAdapter.py`. Stop the script by pressing **Control+C**.

The script saves the latest clock interval that it has processed in the files `last_history_clock.hist` and `last_historyuint_clock.hist` in the same working directory as the script is run from. The initial clock time is “now”. If you want to start retrieving values from some point in the past, create those files and enter your preferred start time.
