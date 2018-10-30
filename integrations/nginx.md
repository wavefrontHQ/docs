---
title: NGINX Integration
tags: [integrations list]
permalink: nginx.html
summary: Learn about the Wavefront NGINX Integration.
---
## NGINX Integration

NGINX is a popular HTTP and reverse proxy server and also function as a load balancer for HTTP, TCP, and UDP servers. This integration installs and configures Telegraf to send NGINX server and log metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of the NGINX dashboard.

{% include image.md src="images/nginx_dashboard.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## NGINX Setup



**Note:** If you use vRealize Operations, the application proxy agent sets up the integration for you. See the [setup instructions](https://YOUR_CLUSTER.wavefront.com/integration/vrops/setup). Otherwise, follow the setup steps on this page.

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

This integration uses the NGINX and TAIL input plugins for Telegraf. If you've already installed Wavefront Telegraf packages on your server(s), you can skip to Step 3.

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](http://wavefront.com/sign-up/?utm_source=docs.vmware.com&utm_medium=referral&utm_campaign=docs-front-page){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 3. Configure NGINX Input Plugin

Create a `nginx.conf` file in `/etc/telegraf/telegraf.d` and enter the following snippet:

```
[[inputs.nginx]]
  urls = ["http://<nginx_server>/basic_status"]
```

You may need to update `http://<nginx_server>/basic_status` if you've configured the `ngx_http_stub_status_module` on a different path.

You can poll multiple NGINX instances from a single Telegraf agent. Simply configure the `urls` parameter with the addresses of the NGINX instances:

```
urls = ["http://nginx_server1/basic_status","http://nginx_server2/basic_status","http://nginx_server3/basic_status"]
```

**Note:** The `Tail` plugin requires Telegraf to be installed locally on the same server as NGINX.

### Step 4. Configure TAIL Input Plugin

Create a `tail.conf` file in `/etc/telegraf/telegraf.d` and enter the following snippet:

```
[[inputs.tail]]
   files = ["absolute_path_to_nginx_access_log"]

   ## Read file from beginning.
   from_beginning = false

   ## Whether file is a named pipe
   pipe = false

   ## measurement name prefix (to keep "tail" and "nginx" plugin metrics insync)
   name_prefix = "nginx."

   ## Data format to consume.
   data_format = "grok"

   grok_patterns = ["%{COMBINED_LOG_FORMAT}"]

   ## Add tags to keep in sync with NGINX Server metrics
   [inputs.tail.tags]
     server = "<nginx_server>"
     port = "<port>"
```
{% endraw %}
**Note:** NGINX performs log rotation. Ensure Telegraf has access permission to Nginx `access.log` file.

### Step 5. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.
