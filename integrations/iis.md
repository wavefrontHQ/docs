---
title: IIS Integration
tags: [integrations list]
permalink: iis.html
summary: Learn about the IIS Integration.
---
## IIS Integration

Internet Information Services (IIS) for Windows® Server is a flexible, secure and manageable Web server for internet hosting.
This integration installs and configures Telegraf to send IIS metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the WWW(Web) Services section of a dashboard displaying IIS metrics:

{% include image.md src="images/iis-www-services.png" width="80" %}

## IIS Setup

This integration uses Windows performance counters specific to the IIS Telegraf input plugin.



Supported IIS Version(s): IIS 6.0 & later{% raw %}
```
This integration is supported only on Windows.
```
{% endraw %}

### Step 1: Set up a Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network, install a proxy.

### Step 2: Install the Telegraf Agent

{% include windows_telegraf.md %}

### Step 3: Configure the IIS Input Plugin

Edit the `telegraf.conf` file located in `Program Files\Telegraf\` and enter the following snippet:
{% raw %}
   ```
   [[inputs.win_perf_counters]]
     [[inputs.win_perf_counters.object]]
       # IIS, Web Service
       ObjectName = "Web Service"
       Counters = [
                    "Service Uptime", "Current Connections", "Bytes Sent/sec", "Total Bytes Sent",
                    "Bytes Received/sec", "Total Bytes Received", "Bytes Total/sec", "Total Bytes Transferred",
                    "Get Requests/sec","Total Get Requests", "Post Requests/sec","Total Post Requests",
                    "Put Requests/sec","Total Put Requests", "Delete Requests/sec","Total Delete Requests",
                    "Anonymous Users/sec", "NonAnonymous Users/sec", "Files Sent/sec", "Total Files Sent",
                    "Files Received/sec", "Total Files Received", "Files/sec", "Total Files Transferred",
                    "Not Found Errors/sec", "Locked Errors/sec", "Total Method Requests/sec"
                  ]
       Instances = ["*"]
       Measurement = "iis.websvc"
       IncludeTotal=true #Set to false to not include _Total instance.

     [[inputs.win_perf_counters.object]]
       # Web Service Cache / IIS
       ObjectName = "Web Service Cache"
       Counters = [
                    "Current Files Cached", "Active Flushed Entries", "Total Files Cached", "Total Flushed Files",
                    "File Cache Hits", "File Cache Misses", "File Cache Hits %", "File Cache Flushes",
                    "Current File Cache Memory Usage", "Maximum File Cache Memory Usage", "Current URIs Cached",
                    "Total URIs Cached", "Total Flushed URIs", "URI Cache Hits", "URI Cache Misses", "URI Cache Hits %",
                    "URI Cache Flushes", "Current Metadata Cached", "Total Metadata Cached", "Total Flushed Metadata",
                    "Metadata Cache Hits", "Metadata Cache Misses", "Metadata Cache Hits %", "Metadata Cache Flushes",
                    "Kernel: Current URIs Cached", "Kernel: Total URIs Cached", "Kernel: Total Flushed URIs",
                    "Kernel: URI Cache Hits", "Kernel: Uri Cache Hits/sec", "Kernel: URI Cache Misses", "Kernel: URI Cache Hits %",
                    "Kernel: URI Cache Flushes"
                  ]
       Instances = ["*"]
       Measurement = "iis.websvc.cache"
       IncludeTotal=true #Set to false to not include _Total instance.

     [[inputs.win_perf_counters.object]]
       # IIS, ASP.NET
       ObjectName = "ASP.NET"
       Counters = [
                    "Application Restarts", "Requests Queued",
                    "Requests Rejected"
                  ]
       Instances = ["*"]
       Measurement = "iis.aspnet"
       #IncludeTotal=false #Set to true to include _Total instance when querying for all (*).

     [[inputs.win_perf_counters.object]]
       # IIS, ASP.NET Applications
       ObjectName = "ASP.NET Applications"
       Counters = [
                    "Requests/Sec", "Errors Total",
                    "Cache Total Entries", "Cache Total Turnover Rate",
                    "Cache Total Hits", "Cache Total Misses",
                    "Cache Total Hit Ratio", "Pipeline Instance Count"
                  ]
       Instances = ["*"]
       Measurement = "iis.aspnet.app"
       #IncludeTotal=false #Set to true to include _Total instance when querying for all (*).

     [[inputs.win_perf_counters.object]]
       ObjectName = ".NET CLR Exceptions"
       Counters = ["# of Exceps Thrown", "# of Exceps Thrown / Sec", "# of Filters / Sec", "# of Finallys / Sec", "Throw to Catch Depth / Sec"]
       Instances = ["w3wp"]
       Measurement = "iis.dotnet.exception"

     [[inputs.win_perf_counters.object]]
       # HTTP Service request queues in the Kernel before being handed over to User Mode.
       ObjectName = "HTTP Service Request Queues"
       Instances = ["*"]
       Counters = ["CurrentQueueSize","RejectedRequests"]
       Measurement = "iis.http.queues"
       #IncludeTotal=false #Set to true to include _Total instance when querying for all (*).
   ```
{% endraw %}
   
**Note:** On `IIS` dashboard, the **System Performance** section uses Windows system metrics configured by default in Telegraf. 

To see data in the **Avg Disk Latency** chart, make sure the following properties for `LogicalDisk` object are set in the Telegraf config file:
* `Avg. Disk sec/Read` and `Avg. Disk sec/Write` in `Counters` section.
* `IncludeTotal = true`.

Example:
{% raw %}
```
[[inputs.win_perf_counters.object]]
ObjectName = "LogicalDisk"
Instances = ["*"]
Counters = ["% Disk Read Time", "% Disk Write Time", "% Free Space", "% Idle Time", "Avg. Disk Bytes/Read", "Avg. Disk Bytes/Write", "Avg. Disk Queue Length", "Avg. Disk sec/Read", "Avg. Disk sec/Write", "Avg. Disk Write Queue Length", "Free Megabytes", "Split IO/Sec"]
Measurement = "win.disk"
IncludeTotal = true
```
{% endraw %}

### Step 4: Restart the Telegraf service

Use the `Windows Services Management Console` or execute the following from the command prompt:
{% raw %}
   ```
   net stop telegraf
   net start telegraf
   ```
{% endraw %}







## Metrics


|Metric Name|Description|
| :--- | :--- |
|iis.aspnet.Application.Restarts|Application restarts by IIS ASP.NET.|
|iis.aspnet.Requests.Queued|Queued requests. |
|iis.aspnet.Requests.Rejected|Rejected requests. |
|iis.aspnet.app.Cache.*|Application cache metrics. The caching classes in the `System.Runtime.Caching` namespace provide functionality for caching data in ASP.NET.|
|iis.aspnet.app.Cache.Total.Entries||
|iis.aspnet.app.Cache.Total.Hit.Ratio||
|iis.aspnet.app.Cache.Total.Hits||
|iis.aspnet.app.Cache.Total.Misses||
|iis.aspnet.app.Cache.Total.Turnover.Rate||
|iis.aspnet.app.Errors.Total|Total ASP.NET application errors.|
|iis.aspnet.app.Pipeline.Instance.Count|Instance count for the application pipeline.|
|iis.aspnet.app.Requests.persec|ASP.NET application requests per seconds.|
|iis.dotnet.exception.-.of.Exceps.Thrown|Metrics for IIS .NET exceptions |
|iis.dotnet.exception.-.of.Exceps.Thrown||
|iis.dotnet.exception.-.of.Exceps.Thrown.-.Sec||
|iis.dotnet.exception.-.of.Filters.-.Sec||
|iis.dotnet.exception.-.of.Finallys.-.Sec||
|iis.dotnet.exception.Throw.to.Catch.Depth.-.Sec||
|iis.http.queues.*|Metrics related to IIS HTTP queues.|
|iis.http.queues.CurrentQueueSize||
|iis.http.queues.RejectedRequests||
|iis.websvc.Anonymous.*|IIS web server metrics.|
|iis.websvc.Anonymous.Users.persec||
|iis.websvc.Bytes.Received.persec||
|iis.websvc.Bytes.Sent.persec||
|iis.websvc.Bytes.Total.persec||
|iis.websvc.Current.Connections||
|iis.websvc.Delete.Requests.persec||
|iis.websvc.Files.Received.persec||
|iis.websvc.Files.Sent.persec||
|iis.websvc.Files.persec||
|iis.websvc.Get.Requests.persec||
|iis.websvc.Locked.Errors.persec||
|iis.websvc.NonAnonymous.Users.persec||
|iis.websvc.Not.Found.Errors.persec||
|iis.websvc.Post.Requests.persec||
|iis.websvc.Put.Requests.persec||
|iis.websvc.Service.Uptime||
|iis.websvc.Total.Bytes.Received||
|iis.websvc.Total.Bytes.Sent||
|iis.websvc.Total.Bytes.Transferred||
|iis.websvc.Total.Delete.Requests||
|iis.websvc.Total.Files.Received||
|iis.websvc.Total.Files.Sent||
|iis.websvc.Total.Files.Transferred||
|iis.websvc.Total.Get.Requests||
|iis.websvc.Total.Method.Requests.persec||
|iis.websvc.Total.Post.Requests||
|iis.websvc.Total.Put.Requests||
|iis.websvc.cache.*|IIS web service cache metrics. |
|iis.websvc.cache.Active.Flushed.Entries||
|iis.websvc.cache.Current.File.Cache.Memory.Usage||
|iis.websvc.cache.Current.Files.Cached||
|iis.websvc.cache.Current.Metadata.Cached||
|iis.websvc.cache.Current.URIs.Cached||
|iis.websvc.cache.File.Cache.Flushes||
|iis.websvc.cache.File.Cache.Hits||
|iis.websvc.cache.File.Cache.Hits.Percent||
|iis.websvc.cache.File.Cache.Misses||
|iis.websvc.cache.Kernel-.Current.URIs.Cached||
|iis.websvc.cache.Kernel-.Total.Flushed.URIs||
|iis.websvc.cache.Kernel-.Total.URIs.Cached||
|iis.websvc.cache.Kernel-.URI.Cache.Flushes||
|iis.websvc.cache.Kernel-.URI.Cache.Hits||
|iis.websvc.cache.Kernel-.URI.Cache.Hits.Percent||
|iis.websvc.cache.Kernel-.URI.Cache.Misses||
|iis.websvc.cache.Kernel-.Uri.Cache.Hits.persec||
|iis.websvc.cache.Maximum.File.Cache.Memory.Usage||
|iis.websvc.cache.Metadata.Cache.Flushes||
|iis.websvc.cache.Metadata.Cache.Hits||
|iis.websvc.cache.Metadata.Cache.Hits.Percent||
|iis.websvc.cache.Metadata.Cache.Misses||
|iis.websvc.cache.Total.Files.Cached||
|iis.websvc.cache.Total.Flushed.Files||
|iis.websvc.cache.Total.Flushed.Metadata||
|iis.websvc.cache.Total.Flushed.URIs||
|iis.websvc.cache.Total.Metadata.Cached||
|iis.websvc.cache.Total.URIs.Cached||
|iis.websvc.cache.URI.Cache.Flushes||
|iis.websvc.cache.URI.Cache.Hits||
|iis.websvc.cache.URI.Cache.Hits.Percent||
|iis.websvc.cache.URI.Cache.Misses||

