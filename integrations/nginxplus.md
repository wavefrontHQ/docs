---
title: NGINX Plus Integration
tags: [integrations list]
permalink: nginxplus.html
summary: Learn about the Wavefront NGINX Plus Integration.
---
## NGINX Plus Integration

NGINX Plus is a web server, load balancer and content cache built on top of open source NGINX.

This integration installs and configures Telegraf to send NGINX Plus server metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some charts in the NGINX Plus dashboard.

{% include image.md src="images/nginxp_dashboard1.png" width="80" %}
{% include image.md src="images/nginxp_dashboard2.png" width="80" %}
{% include image.md src="images/nginxp_dashboard3.png" width="80" %}
{% include image.md src="images/nginxp_dashboard4.png" width="80" %}
{% include image.md src="images/nginxp_dashboard5.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## NGINX Plus Setup



### Step 1. Ensure the HTTP Status Module is Enabled

On each of your NGINX Plus hosts, make sure the `ngx_http_status_module` is enabled. In `/etc/nginx/nginx.conf` specify:
{% raw %}
```
...
http {
...
  server {
    location /status {
      status;
    }
  }
...
}
...
```

For details, see [Module ngx_http_status_module docs](http://nginx.org/en/docs/http/ngx_http_status_module.html).

### Step 2. Install the Telegraf Agent

This integration uses the NGINX Plus input plugin for Telegraf to extract metrics from NGINX Plus.

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](http://wavefront.com/sign-up/?utm_source=docs.vmware.com&utm_medium=referral&utm_campaign=docs-front-page){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 3. Enable the NGINX Plus input plugin

Create a file called `nginxplus.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:

   ```
   # Read Nginx Plus full status information (ngx_http_status_module)
   [[inputs.nginx_plus]]
     # Prefix to attach to the measurement name
     name_prefix = "nxp."
     ## An array of ngx_http_status_module or status URI to gather stats.
     urls = ["http://localhost/status"]

     # HTTP response timeout (default: 5s)
     response_timeout = "5s"

   ```

You may need to update `http://localhost/status` if you've configured the `ngx_http_status_module` on a different path.

A single Telegraf agent can poll multiple NGINX Plus instances for status information. Specify the addresses of the NGINX instances in the `urls` parameter:

```
urls = ["http://server1/status","http://server2/status","http://server3/status"]
```
{% endraw %}

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.
