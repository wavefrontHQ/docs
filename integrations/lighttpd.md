---
title: Lighttpd Integration
tags: [integrations list]
permalink: lighttpd.html
summary: Learn about the Lighttpd Integration.
---
## Lighttpd Integration

Lighttpd is a fast, secure, and flexible web server that has been optimized for high-performance environments.

This integration installs and configures Telegraf to send Lighttpd server metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some charts in the Lighttpd dashboard.

{% include image.md src="images/lighttpd_dashboard1.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Lighttpd Setup



### Step 1. Install the Telegraf Agent

This integration uses the Apache input plugin for Telegraf to extract metrics from Lighttpd. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your product instance and follow the instructions on the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Ensure the Status Module is Enabled

On each of your Lighttpd nodes, make sure the `mod_status` is enabled. In `/etc/lighttpd/lighttpd.conf` specify:
{% raw %}
```
...
server.modules = ( ..., "mod_status", ... )
status.status-url = "/server-status"
...
```
{% endraw %}

For details, see the docs for the Lighttpd [mod_status Module](https://redmine.lighttpd.net/projects/1/wiki/Docs_ModStatus).

### Step 3. Enable the Apache Input Plugin

Create a file called `lighttpd.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
   ```
    # Read Lighttpd status information (mod_status)
    [[inputs.apache]]
      #Prefix to attach to the measurement name
      name_prefix = "lighttpd."

      ## An array of URLs to gather from; must be directed at the machine
      ## readable version of the mod_status page including the auto query string.
      ## Default is "http://localhost/server-status?auto".
      urls = ["http://localhost/server-status?auto"]

      ## Credentials for basic HTTP authentication.
      # username = "myuser"
      # password = "mypassword"

      ## Maximum time to receive response.
      # response_timeout = "5s"

      ## Optional SSL Config
      # ssl_ca = "/etc/telegraf/ca.pem"
      # ssl_cert = "/etc/telegraf/cert.pem"
      # ssl_key = "/etc/telegraf/key.pem"
      ## Use SSL but skip chain & host verification
      # insecure_skip_verify = false

   ```
{% endraw %}

You may need to update `http://localhost/server-status?auto` if you've configured the `mod_status` on a different path.

A single Telegraf agent can poll multiple Lighttpd instances for status information if you configure the `urls` parameter with the addresses of the Lighttpd instances:
{% raw %}
```
urls = ["http://server1/server-status?auto","http://server2/server-status?auto","http://server3/server-status?auto"]
```
{% endraw %}

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.



