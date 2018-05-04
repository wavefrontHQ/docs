---
title: Apache Hadoop MapReduce Integration
tags: [integrations list]
permalink: hadoop-mapreduce.html
summary: Learn about the Wavefront Apache Hadoop MapReduce Integration.
---
## Apache Hadoop MapReduce

Hadoop MapReduce is a Yarn-based system for parallel processing of large data sets.

This integration installs and configures Telegraf and a custom Python script to send Hadoop MapReduce metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a Wavefront proxy. The custom script uses the Hadoop HTTP REST API to gather metrics. 

In addition to setting up the metrics flow, this integration also sets up a dashboard.
{% include image.md src="images/hadoop-mapreduce-metrics.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Apache Hadoop MapReduce



### Step 1. Install the Telegraf Agent

If you don't have the Telegraf agent installed, follow the steps below. Otherwise, continue to step 2.

Run a command to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy.

### Step 3. Create a Script to Gather Hadoop MapReduce Metrics

1. Download [mapreduce.py](https://github.com/wavefrontHQ/wavefront-hadoop/raw/master/mapreduce.py) onto your Telegraf agent server.
2. Test the script execution using this command:{% raw %}
    ```
    python mapreduce.py
    ```
    You should get a response similar to this:
    ```
    usage: mapreduce.py [-h] [--username [USERNAME]] [--password [PASSWORD]] [server]
    mapreduce.py: error: server must be provided
    ```
    If the script is not executing, adjust the file permission and the Python path.

### Step 3. Configure Telegraf EXEC Input Plugin

First create a file called `hadoop-mapreduce.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:

```
[[inputs.exec]]
  commands = [ "python /home/telegraf/hadoop/mapreduce.py http://10.152.25.144:8088"]
  tag_keys = ["id","user","name","queue","applicationType","clusterId"]
  timeout = "5s"
  name_override = "hadoop.mapreduce"
  data_format = "json"
```

Then, specify your command and your Yarn server URL as the `commands` value. Specify your server(s) with URL matching.

Format:
```
commands = [ "<python bin> <mapreduce.py script path> http://<address>:<port>"]
```

Example:
```
commands = [ "/usr/bin/python /home/telegraf/hadoop/mapreduce.py http://yarm1.foo.com:8088"]
```

To monitor multiple Yarn servers, add `commands` entries:
```
commands = [
  "/usr/bin/python /home/telegraf/hadoop/mapreduce.py http://yarn1.foo.com:8088",
  "/usr/bin/python /home/user/hadoop/mapreduce.py http://yarn2.foo.com:8088",
  "/usr/bin/python /root/hadoop/mapreduce.py http://yarn3.foo.com:8088"
]
```
{% endraw %}

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.
