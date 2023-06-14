---
title: Apache HTTP Integration
tags: [integrations list]
permalink: apache.html
summary: Learn about the Apache HTTP Integration.
---
## Apache HTTP Server Integration

The Apache HTTP Server is a popular open source web server. This integration installs and configures Telegraf to send Apache HTTP Server metrics to Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a Wavefront proxy.

In addition to setting up the metrics flow, this integration also sets up a dashboard.

{% include image.md src="images/apache-dashboard-1.png" width="80" %}
{% include image.md src="images/apache-dashboard-2.png" width="80" %}
{% include image.md src="images/apache-dashboard-3.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Apache HTTP Server Setup



**Note:** This integration is supported with Apache HTTP version 2.4.33 and later.

### Step 1. Install the Telegraf Agent

This integration uses the Apache input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Enable the Apache HTTP Server "mod_status"

This integration requires the [Apache HTTP Server "mod_status"](https://httpd.apache.org/docs/2.4/mod/mod_status.html#enable) to be enabled on the Apache HTTP Server.
{% raw %}
```
<Location "/server-status">
    SetHandler server-status
</Location>
```
{% endraw %}

### Step 3. Configure the Telegraf Apache Input Plugin

Create a file called apache.conf in `/etc/telegraf/telegraf.d`. 

To specify one or more urls to gather metrics from, use `urls`: {% raw %}
```
[[inputs.apache]]
  urls = ["http://<ip>:<port>/server-status?auto"]
```
{% endraw %}

`urls` is an array of URLs. Default is `http://localhost/server-status?auto`. Example: {% raw %}
```
  urls = ["http://localhost/server-status?auto",
          "http://localhost:8080/server-status?auto"]
```
{% endraw %}

To use credentials for basic HTTP authentication use `username` and `password`.Example:{% raw %}
```
username = <user>
password = <password>
```
{% endraw %}

To change the maximum time to receive a response use `response_timeout`. Example:{% raw %}
```
response_timeout = "<time>s"
```
{% endraw %}

To use optional SSL configuration parameters, use the properties in the following example: {% raw %}
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



## Metrics

Information about server activity and performance. Metrics descriptions are collected from the [mod_status Apache Module](https://httpd.apache.org/docs/2.4/mod/mod_status.html).

|Metric Name |Description |
|:--- |:--- |
|apache.BusyWorkers|Number of workers that are serving requests.|
|apache.BytesPerReq|Number of bytes per request.|
|apache.BytesPerSec|Number of bytes transferred per second.|
|apache.CPUChildrenSystem|Jiffs used in User Mode by child processes. |
|apache.CPUChildrenUser|Jiffs used in System Mode by child processes.|
|apache.CPULoad|CPU load of your HTTP server.|
|apache.CPUSystem|CPU processes in System mode. |
|apache.CPUUser|CPU used by the user process.|
|apache.ConnsAsyncClosing|Number of asynchronous connections that are closing.|
|apache.ConnsAsyncKeepAlive|Number of asynchronous connections that are kept alive.|
|apache.ConnsAsyncWriting|Number of asynchronous connections that are writing.|
|apache.ConnsTotal|Total number of connections served by Apache. |
|apache.IdleWorkers|Number of workers that are idling. |
|apache.Load1|Server load over last 1 minute.|
|apache.Load15|Server load over last 15 minutes.|
|apache.Load5|Server load over last 5 minutes.|
|apache.ParentServerConfigGeneration|Number of times the Apache server reread config and restarted child processes.|
|apache.ParentServerMPMGeneration|Number of times the Apache server reread the MPG config and restarted child processes. |
|apache.ReqPerSec|Number of requests per second.|
|apache.ServerUptimeSeconds|Server uptime (in seconds).|
|apache.TotalAccesses|Total number of accesses.|
|apache.TotalkBytes|Number of kilobytes served.|
|apache.Uptime|Total uptime of the server.|
|apache.accesses.total.counter|Total number of times this server was accessed.|
|apache.cpuload.gauge|CPU load for this server. |
|apache.exporter.build.info.gauge|Apache exporter build information.|
|apache.scboard.closing|Number of worker threads that are closing a TCP connection (after serving a response).|
|apache.scboard.dnslookup|Number of worker threads currently performing a DNS lookup.|
|apache.scboard.finishing|Number of worker threads finishing (part of server shutdown).|
|apache.scboard.idle.cleanup|Number of idle worker threads that are ready for cleanup.|
|apache.scboard.keepalive|Number of worker threads that keep the connection alive (expecting another request on the same connection).|
|apache.scboard.logging|Number of worker threads writing to the log file.|
|apache.scboard.open|Number of open worker slots. |
|apache.scboard.reading|Number of workers receiving requests.|
|apache.scboard.sending|Number of workers sending responses.|
|apache.scboard.starting|Number of workers in the process of starting.|
|apache.scboard.waiting|Number of workers waiting for incoming requests.|
|apache.scoreboard.gauge|Scoreboard gauge. |
|apache.sent.kilobytes.total.counter|Total number of kilobytes sent.|
|apache.up.gauge|Shows whether server could be reached.|
|apache.uptime.seconds.total.counter|Total uptime, in seconds.|
|apache.workers.gauge|Apache worker status.|

