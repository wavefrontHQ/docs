---
title: Apache Solr Integration
tags: [integrations list]
permalink: solr.html
summary: Learn about the Wavefront Apache Solr Integration.
---
## Apache Solr Integration

Apache Solr is a highly scalable and reliable search engine optimized to search large volumes of text-centric data.

This integration installs and configures Telegraf to send Apache Solr server metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some charts in the Apache Solr dashboard.

{% include image.md src="images/solr.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Apache Solr Setup



### Step 1. Install the Telegraf Agent

This integration uses the Solr input plugin for Telegraf to extract metrics from Solr.

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability?utm_source=docs.vmware.com&utm_medium=referral&utm_campaign=docs-front-page){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Enable the Solr input plugin

Create a file called `solr.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
   ```
   [[inputs.solr]]
     ## specify a list of one or more Solr servers
     servers = ["http://localhost:8983"]
     ##
     ## specify a list of one or more Solr cores (default - all)
     # cores = ["main"]

   ```
{% endraw %}
### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.



