---
title: MongoDB Integration
tags: [integrations list]
permalink: mongodb.html
summary: Learn about the MongoDB Integration.
---
## mongoDB Integration

mongoDB is an open source NoSQL, cross-platform document-oriented database. This integration installs and configures Telegraf to send mongoDB metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a screen shot of an example dashboard with statistics collected from mongoDB.
{% include image.md src="images/mongodb-dashboard-1.png" width="80" %}
{% include image.md src="images/mongodb-dashboard-2.png" width="80" %}
{% include image.md src="images/mongodb-dashboard-3.png" width="80" %}
{% include image.md src="images/mongodb-dashboard-4.png" width="80" %}



To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## mongoDB Setup



### Step 1. Install the Telegraf Agent

This integration uses the monodb input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your product instance and follow the instructions on the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Configure mongoDB Input Plugin

1. Create a file called `mongodb.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
    ```
    # Read metrics from one or many mongodb servers
    [[inputs.mongodb]]
      ## An array of URLs of the form:
      ##   "mongodb://" [user ":" pass "@"] host [ ":" port]
      ## For example:
      ##   mongodb://user:auth_key@10.10.3.30:27017,
      ##   mongodb://10.10.3.33:18832,
      servers = ["mongodb://127.0.0.1:27017"]

      fielddrop = ["member_status", "state", "type"]
      
      ##Collects metrics exposed by db.stats
      gather_perdb_stats = true 

      ## Optional SSL Config
      # ssl_ca = "/etc/telegraf/ca.pem"
      # ssl_cert = "/etc/telegraf/cert.pem"
      # ssl_key = "/etc/telegraf/key.pem"
      ## Use SSL but skip chain & host verification
      # insecure_skip_verify = false
    ```
{% endraw %}
Replace the `servers` value  above with the URL of your mongoDB server.

### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.



