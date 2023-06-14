---
title: CouchDB Integration
tags: [integrations list]
permalink: couchdb.html
summary: Learn about the CouchDB Integration.
---
## CouchDB Integration

Apache CouchDB is an open source document-oriented NoSQL database. This integration installs and configures Telegraf to send CouchDB metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the Performance Counters section of a dashboard displaying CouchDB metrics:
{% include image.md src="images/couchdb-charts.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## CouchDB Setup

This integration uses the CouchDB input plugin for Telegraf.

**Note:**  This integration was verified with CouchDB 2.x and provides the most recent dashboard and setup instructions for CouchDB. For setup instructions of previous versions, log in to the Wavefront instance and see **CouchDB (Archived)**.



### Step 1. Install the Telegraf Agent

This integration uses the couchdb input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!


### Step 2. Configure CouchDB Input Plugin


Create a file called `couchdb.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.couchdb]]
hosts = ["http://<serverip>:5984/_node/_local/_stats"]
```
{% endraw %}

If the server is accessed with credentials, then enter the following snippet instead:
{% raw %}
```
[[inputs.couchdb]]
hosts = ["http://<username>:<password>@<serverip>:5984/_node/_local/_stats"]
```
{% endraw %}

Replace `serverip` with the IP of your CouchDB instance. Replace `username` and `password` with credentials for the server.

### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.



