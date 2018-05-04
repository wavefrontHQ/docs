---
title: NGINX Integration
tags: [integrations list]
permalink: nginx.html
summary: Learn about the Wavefront NGINX Integration.
---
## NGINX Integration

NGINX is a popular HTTP and reverse proxy server. This integration installs and configures Telegraf to send NGINX server metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of the requests charts in the NGINX dashboard.

{% include image.md src="images/db_nginx_requests.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## NGINX Setup



### Step 1. Ensure the Status Stub Module is Enabled on NGINX

On your NGINX servers, make sure the `ngx_http_stub_status_module` is enabled. In `/etc/nginx/nginx.conf` specify:
{% raw %}
```
...
http {
...
  server {
    location /basic_status {
      stub_status;
    }
  }
...
}
...
```

For details, see [Module ngx_http_stub_status_module docs](https://nginx.org/en/docs/http/ngx_http_stub_status_module.html).

### Step 2. Install the Telegraf Agent

This integration uses the NGINX input plugin for Telegraf. If you've already installed Wavefront Telegraf packages on your server(s), you can skip to Step 3.

Run a command to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy.

### Step 3. Configure NGINX Input Plugin

Create a file called `nginx.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:

```
[[inputs.nginx]]
  urls = ["http://localhost/basic_status"]
```

You may need to update `http://localhost/basic_status` if you've configured the `ngx_http_stub_status_module` on a different path.

You can poll multiple NGINX instances from a single Telegraf agent. Simply configure the `urls` parameter with the addresses of the NGINX instances:

```
urls = ["http://server1/basic_status","http://server2/basic_status","http://server3/basic_status"]
```
{% endraw %}

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.
