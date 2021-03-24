---
title: Apache Impala Integration
tags: [integrations list]
permalink: impala.html
summary: Learn about the Wavefront Apache Impala Integration.
---
## Apache Impala Integration

Apache Impala is an open source analytic database for the Apache Hadoop ecosystem. It is a massively parallel processing SQL engine for data in a Hadoop cluster.

This integration installs and configures Telegraf to send Apache Impala metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some charts in the Apache Impala dashboard.

{% include image.md src="images/impala1.png" width="80" %}
{% include image.md src="images/impala2.png" width="80" %}
{% include image.md src="images/impala3.png" width="80" %}
{% include image.md src="images/impala4.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Apache Impala Setup



### Step 1. Install the Telegraf Agent

This integration uses the Telegraf Exec input plugin to extract metrics from Impala.
If you do not have the Telegraf agent installed, follow the steps below. Otherwise, continue to step 2.

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability?utm_source=docs.vmware.com&utm_medium=referral&utm_campaign=docs-front-page){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Setup a Script to Extract Apache Impala Metrics

1. Download [impala.py](https://github.com/wavefrontHQ/integrations/blob/master/impala/impala.py) onto each of your Impala nodes.
2. Ensure that the script can run with this command:{% raw %}
   ```
   python impala.py
   ```
{% endraw %}
   You should receive a response similar to the following:{% raw %}
   ```
   usage: impala.py [-h] [server [server ...]]
   impala.py: error: Must specify at least one server address
   ```
{% endraw %}

### Step 3. Configure the Telegraf Exec Input Plugin

Create a file called `impala.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
   ```
   [[inputs.exec]]
     commands = ["python <script location> <Impala server address>:<port> <Impala server2 address>:<port> <Impala server3 address>:<port>"]
     timeout = "5s"
     name_override = "impala"
     data_format = "json"

   ```
{% endraw %}

In the `commands` field, specify the location of the Python binary (if necessary), the location of the `impala.py` script, and the address of the Impala Daemon or Impala Catalog Server, or Impala Statestore depending on which node you are configuring. You may enter more than one server address in the commands field if the node has multiple roles.

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.



