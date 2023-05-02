---
title: Apache Impala Integration
tags: [integrations list]
permalink: impala.html
summary: Learn about the Apache Impala Integration.
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

This integration uses the Telegraf input plugin to extract metrics from Impala.
If you do not have the Telegraf agent installed, follow the steps below. Otherwise, proceed with Step 2.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Configure the Telegraf Input Plugins

Create a file called `impala.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
   ```
   [[inputs.http]]
     urls = ["<IMPALA-SERVER-1:PORT>/metrics?json", "<IMPALA-SERVER-2:PORT>/metrics?json", "<IMPALA-SERVER-3:PORT>/metrics?json"]
     fielddrop = ["description", "human_readable"]
     data_format = "xpath_json"
     xpath_native_types = true
     [[inputs.http.xpath]]
       metric_name = "'impala_metrics'"
       metric_selection = "//metrics/*"
       field_selection = "child::*"
       [inputs.http.xpath.tags]
         prefix = "/__common__/process-name"

   [[processors.starlark]]
     namepass = ["impala_*"]
     source = '''
   def apply(metric):
     n = metric.fields.pop("name").removeprefix("impala.").removeprefix("impala_")
     metric.name = "impala." + metric.tags.pop("prefix") + '.' + n
     kind = metric.fields.pop("kind", "")
     if kind == "HISTOGRAM":
       for k, v in metric.fields.items():
         if k.endswith("th %-ile"):
           metric.fields.pop(k)
           k = "P" + k.removesuffix("th %-ile").replace(".","")
           metric.fields[k] = v
     elif "value" in metric.fields.keys():
       value = metric.fields.pop("value")
       if value == True:
         metric.fields["value"] = 1
       elif value == False:
         metric.fields["value"] = 0
       elif type(value) == "int" or type(value) == "float":
         metric.fields["value"] = value
       else:
         metric.fields.clear()

     if "units" in metric.fields.keys():
       metric.tags["unit"] = metric.fields.pop("units").lower()
     return metric
   '''

   ```
{% endraw %}

In the `urls` parameter field, update the placeholder `<IMPALA-SERVER-*:PORT>` with the address of the Impala Daemon, Impala Catalog Server, or Impala Statestore, depending on which node you want to monitor. If you want to monitor multiple servers, you can enter more than one server address in the `urls` parameter field.

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.



