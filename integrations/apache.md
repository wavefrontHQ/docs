---
title: Apache HTTP Integration
tags: [integrations list]
permalink: apache.html
summary: Learn about the Wavefront Apache HTTP Integration.
---
## Apache HTTP Server Integration

The Apache HTTP Server is a popular open source web server. This integration installs and configures Telegraf to send Apache HTTP Server metrics to Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a Wavefront proxy.

In addition to setting up the metrics flow, this integration also sets up a dashboard.

{% include image.md src="images/apache.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Apache HTTP Server Setup



**Note:** If you use vRealize Operations, the application proxy agent sets up the integration for you. See the [setup instructions](http://YOUR_CLUSTER.wavefront.com/integration/vrops/setup). Otherwise, follow the setup steps on this page.

### Step 1. Install the Telegraf Agent

This integration uses the Apache input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](http://wavefront.com/sign-up/?utm_source=docs.vmware.com&utm_medium=referral&utm_campaign=docs-front-page){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Enable the Apache HTTP Server "mod_status"

This integration requires the [Apache HTTP Server "mod_status"](https://httpd.apache.org/docs/2.4/mod/mod_status.html#enable) to be enabled on the Apache HTTP Server.
{% raw %}
```
<Location "/server-status">
    SetHandler server-status
</Location>
```

### Step 3. Configure the Telegraf Apache Input Plugin

Create a file called apache.conf in `/etc/telegraf/telegraf.d`. 

To specify one or more urls to gather metrics from, use `urls`: 
```
[[inputs.apache]]
  urls = ["http://<ip>:<port>/server-status?auto"]
```

`urls` is an array of URLs. Default is `http://localhost/server-status?auto`. Example: 
```
  urls = ["http://localhost/server-status?auto",
          "http://localhost:8080/server-status?auto"]
```

To use credentials for basic HTTP authentication use `username` and `password`.Example:
```
username = <user>
password = <password>
```

To change the maximum time to receive a response use `response_timeout`. Example:
```
response_timeout = "<time>s"
```

To use optional SSL configuration parameters, use the properties in the following example: 
```
ssl_ca = "/etc/telegraf/ca.pem"
ssl_cert = "/etc/telegraf/cert.pem"
ssl_key = "/etc/telegraf/key.pem"
# Use SSL but skip chain & host verification
insecure_skip_verify = false
```
{% endraw %}

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart the Telegraf agent.
