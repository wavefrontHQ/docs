---
title: CouchDB Integration
tags: [integrations list]
permalink: couchdb.html
summary: Learn about the Wavefront CouchDB Integration.
---
## CouchDB Integration

Apache CouchDB is an open source document-oriented NoSQL database. This integration installs and configures Telegraf to send CouchDB metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the Performance Counters section of a dashboard displaying CouchDB metrics:
{% include image.md src="images/couchdb-http-charts.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## CouchDB Setup

This integration uses the CouchDB input plugin for Telegraf.

**Note:**  This integration was verified with CouchDB 1.x.



### Step 1. Install the Telegraf Agent

This integration uses the monodb input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](http://wavefront.com/sign-up/?utm_source=docs.vmware.com&utm_medium=referral&utm_campaign=docs-front-page){:target="_blank" rel="noopenner noreferrer"} to check it out!


### Step 2. Configure CouchDB Input Plugin


Create a file called `couchdb.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.couchdb]]
hosts = ["http://<serverip>:5984/_stats"]
```
{% endraw %}
Replace `serverip` with the IP of your CouchDB instance.

### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.
