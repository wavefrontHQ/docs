---
title: NGINX Plus Integration
tags: [integrations list]
permalink: nginxplus.html
summary: Learn about the NGINX Plus Integration.
---
## NGINX Plus Integration

NGINX Plus is a web server, load balancer and content cache built on top of open source NGINX.

This integration installs and configures Telegraf to send NGINX Plus server metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some charts in the NGINX Plus dashboard.

{% include image.md src="images/nginxp_dashboard.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## NGINX Plus Setup



**Note:** This integration provides the most recent dashboard and setup instructions for NGINX Plus. For setup instructions of previous versions, log in to the Wavefront instance and see **NGNIX Plus (Archived)**. 

### Step 1. Ensure the HTTP API Module is Enabled

On each of your NGINX Plus hosts, make sure the `ngx_http_api_module` is enabled. In `/etc/nginx/nginx.conf` specify:
{% raw %}
```
...
http {
...
  server {
    location /api {
      api write=on;
    }
  }
...
}
...
```
{% endraw %}

For details, see [Module ngx_http_api_module docs](http://nginx.org/en/docs/http/ngx_http_api_module.html).

### Step 2. Install the Telegraf Agent

This integration uses the NGINX Plus input plugin for Telegraf to extract metrics from NGINX Plus.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 3. Enable the NGINX Plus input plugin

Create a file called `nginxplus.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
   ```
   # Read Nginx Plus full API information (ngx_http_api_module)
   [[inputs.nginx_plus_api]]
     # Prefix to attach to the measurement name
     name_prefix = "nxp."
     # An array of Nginx API URLs to gather stats.
     urls = ["http://localhost/api"]
     # HTTP response timeout (default: 5s)
     response_timeout = "5s"

   ```
{% endraw %}

You may need to update `http://localhost/api` if you've configured the `ngx_http_api_module` on a different path.

A single Telegraf agent can poll multiple NGINX Plus instances for API information. Specify the addresses of the NGINX instances in the `urls` parameter:
{% raw %}
```
urls = ["http://server1/api","http://server2/api","http://server3/api"]
```
{% endraw %}

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.



