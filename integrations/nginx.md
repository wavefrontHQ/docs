---
title: NGINX Integration
tags: [integrations list]
permalink: nginx.html
summary: Learn about the NGINX Integration.
---
## NGINX Integration

NGINX is a popular HTTP and reverse proxy server and also function as a load balancer for HTTP, TCP, and UDP servers. This integration installs and configures Telegraf to send NGINX server and log metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of the NGINX dashboard.

{% include image.md src="images/nginx_dashboard.png" width="80" %}


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
{% endraw %}

For details, see [Module ngx_http_stub_status_module docs](https://nginx.org/en/docs/http/ngx_http_stub_status_module.html).

### Step 2. Install the Telegraf Agent

This integration uses the NGINX and TAIL input plugins for Telegraf. If you've already installed Wavefront Telegraf packages on your server(s), you can skip to Step 3.

Log in to your product instance and follow the instructions on the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 3. Configure NGINX Input Plugin

Create a `nginx.conf` file in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.nginx]]
  urls = ["http://<nginx_server>/basic_status"]
```
{% endraw %}

You may need to update `http://<nginx_server>/basic_status` if you've configured the `ngx_http_stub_status_module` on a different path.

You can poll multiple NGINX instances from a single Telegraf agent. Simply configure the `urls` parameter with the addresses of the NGINX instances:
{% raw %}
```
urls = ["http://nginx_server1/basic_status","http://nginx_server2/basic_status","http://nginx_server3/basic_status"]
```
{% endraw %}

**Note:** The `Tail` plugin requires Telegraf to be installed locally on the same server as NGINX.

### Step 4. Configure TAIL Input Plugin

Create a `tail.conf` file in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
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






## Metrics


|Metric Name|Description|
| :--- | :--- |
|nginx.accepts|Total number of accepted client connections.|
|nginx.active|Current number of active client connections including `Waiting` connections|
|nginx.cache.bytes|Total number of bytes read from the proxy.|
|nginx.cache.requests|Total number of requests. |
|nginx.handled|Total number of handled connections.|
|nginx.ingress.controller.bytes.sent.*|Statistics: count, sum|
|nginx.ingress.controller.bytes.sent.bucket||
|nginx.ingress.controller.config.*|Controller config metrics.|
|nginx.ingress.controller.config.hash||
|nginx.ingress.controller.config.hash.gauge||
|nginx.ingress.controller.config.last.reload.successful||
|nginx.ingress.controller.config.last.reload.successful.gauge||
|nginx.ingress.controller.config.last.reload.successful.timestamp.seconds||
|nginx.ingress.controller.config.last.reload.successful.timestamp.seconds.gauge||
|nginx.ingress.controller.errors||
|nginx.ingress.controller.ingress.upstream.latency.seconds.*|Statistics: count, sum|
|nginx.ingress.controller.leader.election.status.gauge||
|nginx.ingress.controller.nginx.process.*|Metrics for controller processes. |
|nginx.ingress.controller.nginx.process.connections||
|nginx.ingress.controller.nginx.process.connections.gauge||
|nginx.ingress.controller.nginx.process.connections.total||
|nginx.ingress.controller.nginx.process.connections.total.counter||
|nginx.ingress.controller.nginx.process.cpu.seconds.total||
|nginx.ingress.controller.nginx.process.cpu.seconds.total.counter||
|nginx.ingress.controller.nginx.process.num.procs||
|nginx.ingress.controller.nginx.process.num.procs.gauge||
|nginx.ingress.controller.nginx.process.oldest.start.time.seconds||
|nginx.ingress.controller.nginx.process.oldest.start.time.seconds.gauge||
|nginx.ingress.controller.nginx.process.read.bytes.total||
|nginx.ingress.controller.nginx.process.read.bytes.total.counter||
|nginx.ingress.controller.nginx.process.requests.total||
|nginx.ingress.controller.nginx.process.requests.total.counter||
|nginx.ingress.controller.nginx.process.resident.memory.bytes||
|nginx.ingress.controller.nginx.process.resident.memory.bytes.gauge||
|nginx.ingress.controller.nginx.process.virtual.memory.bytes||
|nginx.ingress.controller.nginx.process.virtual.memory.bytes.gauge||
|nginx.ingress.controller.nginx.process.write.bytes.total||
|nginx.ingress.controller.nginx.process.write.bytes.total.counter||
|nginx.ingress.controller.request.*|Metrics releated to ingress controller requests. |
|nginx.ingress.controller.request.duration.seconds.*|Statistics: count, sum|
|nginx.ingress.controller.request.duration.seconds.bucket||
|nginx.ingress.controller.request.size.*|Statistics: count, sum|
|nginx.ingress.controller.request.size.bucket||
|nginx.ingress.controller.requests||
|nginx.ingress.controller.requests.counter||
|nginx.ingress.controller.response.*|Metrics related to ingress controller responses.|
|nginx.ingress.controller.response.duration.seconds.*|Statistics: count, sum|
|nginx.ingress.controller.response.duration.seconds.bucket||
|nginx.ingress.controller.response.size.*|Statistics: count, sum|
|nginx.ingress.controller.response.size.bucket||
|nginx.ingress.controller.ssl.expire.time.*|Expiration time for SSL for ingress controller. |
|nginx.ingress.controller.ssl.expire.time.seconds||
|nginx.ingress.controller.ssl.expire.time.seconds.gauge||
|nginx.ingress.controller.*|Ingress controller success metrics.|
|nginx.ingress.controller.success||
|nginx.ingress.controller.success.counter||
|nginx.reading|Number of connections that are reading client requests.|
|nginx.requests|NGINX request metrics.|
|nginx.server.*|NGINX server metrics. |
|nginx.server.bytes||
|nginx.server.cache||
|nginx.server.connections||
|nginx.server.info||
|nginx.server.requestMsec||
|nginx.server.requests||
|nginx.tail.*|NGNIX `tail` metrics|
|nginx.tail.http.version||
|nginx.tail.resp.bytes||
|nginx.upstream.*|Metrics for NGINX upstream.|
|nginx.upstream.bytes||
|nginx.upstream.requestMsec||
|nginx.upstream.requests||
|nginx.upstream.responseMsec||
|nginx.vts.exporter.build.info||
|nginx.waiting|Number of keep-alive connections waiting for work.|
|nginx.writing|Number of connections that are waiting for upstream responses and/or writing responses.|

