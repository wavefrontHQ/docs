---
title: Apache Hadoop YARN Integration
tags: [integrations list]
permalink: hadoop-yarn.html
summary: Learn about the Apache Hadoop YARN Integration.
---
## Apache Hadoop YARN

Hadoop YARN is a clustering platform for managing resources and scheduling tasks.

In addition to setting up the metrics flow, this integration also sets up a dashboard.
{% include image.md src="images/hadoop-yarn-metrics.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Apache Hadoop YARN



### Step 1. Install the Telegraf Agent

If you don't have the Telegraf agent installed, follow the steps below. Otherwise, continue to step 2.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Configure Telegraf HTTPJSON Input Plugin

First create a file called `hadoop-yarn.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.httpjson]]
name_prefix = "hadoop.yarn."
servers = ["http://localhost:8088/ws/v1/cluster/metrics"]
```
{% endraw %}

Then, specify your Yarn server URL as the `servers` value. Specify your server(s) with URL matching.

Format:{% raw %}
```
servers = ["http://<address>:<port>/ws/v1/cluster/metrics"]
```
{% endraw %}
Example:{% raw %}
```
servers = ["http://localhost:8088/ws/v1/cluster/metrics"]
```
{% endraw %}

To monitor multiple Yarn servers, add `servers` entries:{% raw %}
```
servers = ["http://yarn1.foo.com:8088/ws/v1/cluster/metrics","http://yarn2.foo.com:8088/ws/v1/cluster/metrics"]
```
{% endraw %}

### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.



