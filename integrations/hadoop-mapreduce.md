---
title: Apache Hadoop MapReduce Integration
tags: [integrations list]
permalink: hadoop-mapreduce.html
summary: Learn about the Apache Hadoop MapReduce Integration.
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

Log in to your product instance and follow the instructions on the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Download the Script to Gather Hadoop MapReduce Metrics

1. Download [mapreduce.py](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/hadoop/mapreduce.py) onto your Telegraf agent server.
2. Test the script execution using this command:{% raw %}
    ```
    python mapreduce.py
    ```
{% endraw %}
    You should get a response similar to this:{% raw %}
    ```
    usage: mapreduce.py [-h] [--username [USERNAME]] [--password [PASSWORD]] [server]
    mapreduce.py: error: server must be provided
    ```
{% endraw %}
    If the script is not executing, adjust the file permission and the Python path.

### Step 3. Configure Telegraf EXEC Input Plugin

First create a file called `hadoop-mapreduce.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.exec]]
  commands = [ "python <script location> <RM web UI address>:8088"]
  tag_keys = ["id","user","name","queue","applicationType","clusterId"]
  timeout = "5s"
  name_override = "hadoop.mapreduce"
  data_format = "json"
```
{% endraw %}

In the `commands` option, specify the location of the Python binary (if necessary), the location of the mapreduce.py script, and the address of the YARN ResourceManager web application (8088 is the default port).

Example:{% raw %}
```
commands = [ "/usr/bin/python /home/telegraf/hadoop/mapreduce.py http://yarn1.foo.com:8088"]
```
{% endraw %}

To monitor multiple Yarn servers, add entries within `commands`:{% raw %}
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



