---
title: Apache Kudu Integration
tags: [integrations list]
permalink: kudu.html
summary: Learn about the Apache Kudu Integration.
---
## Apache Kudu Integration

Apache Kudu is an open source column-oriented data store compatible with most of the processing frameworks in the Apache Hadoop ecosystem. It enables fast analytics on fast data.

This integration installs and configures Telegraf to send Apache Kudu server metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some charts in the Apache Kudu dashboard.

{% include image.md src="images/kudu1.png" width="80" %}
{% include image.md src="images/kudu2.png" width="80" %}
{% include image.md src="images/kudu3.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Apache Kudu Setup



### Step 1. Install the Telegraf Agent

This integration uses the Telegraf Exec input plugin to extract metrics from Kudu.
If you do not have the Telegraf agent installed, follow the steps below. Otherwise, continue to step 2.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Setup a Script to Extract Apache Kudu Metrics

1. Download [kudu.py](https://github.com/wavefrontHQ/integrations/blob/master/kudu/kudu.py) onto each of your Kudu nodes.
2. Ensure that the script can run with this command:{% raw %}
   ```
   python kudu.py
   ```
{% endraw %}
   You should receive a response similar to the following:{% raw %}
   ```
   usage: kudu.py [-h] [server [server ...]]
   kudu.py: error: Must specify at least one server address
   ```
{% endraw %}

### Step 3. Configure the Telegraf Exec Input Plugin

Create a file called `kudu.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
   ```
   [[inputs.exec]]
     commands = ["python <script location> <Kudu tablet server address>:8050 <Kudu master server address>:8051"]
     timeout = "5s"
     name_override = "kudu"
     data_format = "json"
     tag_keys = ["table"]

   ```
{% endraw %}

In the `commands` field, specify the location of the Python binary (if necessary), the location of the kudu.py script, and the address of the Kudu Tablet Server or Master, depending on which node you are configuring. You may enter more than one server address in the commands field if the node has multiple roles.

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.



