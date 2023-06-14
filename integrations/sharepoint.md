---
title: SharePoint Integration
tags: [integrations list]
permalink: sharepoint.html
summary: Learn about the SharePoint Integration.
---
## SharePoint Integration

SharePoint is a web-based, collaborative platform that integrates with Microsoft Office.
This integration installs and configures Telegraf to send SharePoint metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the WWW(Web) Services section of a dashboard displaying SharePoint metrics:

{% include image.md src="images/sharepoint-metrics.png" width="80" %}

## SharePoint Setup

This integration uses Windows performance counters specific to the SharePoint Telegraf input plugin.



    **Note:**  This integration is supported only on Windows.

### Step 1: Set up a Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network, install a proxy.

### Step 2: Install the Telegraf Agent

{% include windows_telegraf.md %}

### Step 3: Configure the SharePoint Input Plugin

Edit the `telegraf.conf` file located in `Program Files\Telegraf\` and enter the following snippet:
{% raw %}
   ```
   [[inputs.win_perf_counters.object]]
     ObjectName = "SharePoint Foundation"
     Counters = ["Object Cache Hit %", "Executing Sql Queries", "Executing Time/Page Request", "Reject Page Requests Rate", "Incoming Page Requests Rate", "Active Threads"]
     Instances = ["_total"]
     Measurement = "sharepoint.Foundation"

   [[inputs.win_perf_counters.object]]
     ObjectName = "SharePoint Records Management Counters"
     Counters = ["Search results processed / sec"]
     Instances = ["------"]
     Measurement = "sharepoint.RecordsManagementCounters"

   [[inputs.win_perf_counters.object]]
     ObjectName = "SharePoint Publishing Cache"
     Counters = ["Publishing cache hit ratio", "Publishing cache hits / sec", "Publishing cache misses / sec"]
     Instances = ["*"]
     Measurement = "sharepoint.PublishingCache"

   [[inputs.win_perf_counters.object]]
     ObjectName = "SharePoint Disk-Based Cache"
     Counters = ["Blob cache misses / sec", "Blob cache hits / sec", "Blob cache flushes / second"]
     Instances = ["------"]
     Measurement = "sharepoint.DiskBasedCache"

   [[inputs.win_perf_counters.object]]
     ObjectName = "SharePoint Foundation Search Gatherer Projects"
     Counters = ["Crawls in progress", "Filtered Text Rate", "Filtered Office Rate", "Filtered HTML Rate", "Accessed File Rate", "Accessed HTTP Rate", "File Errors Rate", "HTTP Errors Rate"]
     Instances = ["_total"]
     Measurement = "sharepoint.FoundationSearchGathererProjects"

   [[inputs.win_perf_counters.object]]
     ObjectName = "SharePoint Foundation Search Schema Plugin"
     Counters = ["Total Documents"]
     Instances = ["_total"]
     Measurement = "sharepoint.FoundationSearchSchemaPlugin"

   [[inputs.win_perf_counters.object]]
     ObjectName = "SharePoint Foundation BDC Online"
     Counters = ["Total calls failed", "Total calls per second"]
     Instances = ["------"]
     Measurement = "sharepoint.FoundationBDCOnline"

   [[inputs.win_perf_counters.object]]
     ObjectName = "SharePoint Foundation Search Gatherer"
     Counters = ["Changes Processed", "Threads Committing Transactions", "Time Outs", "Active Queue Length", "Idle Threads", "Heartbeats Rate"]
     Instances = ["------"]
     Measurement = "sharepoint.FoundationSearchGatherer"

   [[inputs.win_perf_counters.object]]
     ObjectName = "SharePoint Foundation Search Indexer Plugin"
     Counters = ["Propagation Rate", "Average Query Latency", "Queries Succeeded", "Queries Failed", "Queries"]
     Instances = ["_total"]
     Measurement = "sharepoint.FoundationSearchIndexerPlugin"

   [[inputs.win_perf_counters.object]]
     ObjectName = "SharePoint Foundation Search Query Processor"
     Counters = ["Security Descriptor Cache Misses"]
     Instances = ["------"]
     Measurement = "sharepoint.FoundationSearchQueryProcessor"

   [[inputs.win_perf_counters.object]]
     ObjectName = "SharePoint Foundation Search FAST Content Plugin"
     Counters = ["Batches Failed Timeout", "Submission Timeouts", "Items Failed Total", "Items Failed Timeout"]
     Instances = ["------"]
     Measurement = "sharepoint.FoundationSearchFASTContentPlugin"

   [[inputs.win_perf_counters.object]]
     ObjectName = "SharePoint Foundation Search Archival Plugin"
     Counters = ["Queues Committing", "Queues Waiting", "Queues Filtering", "Queues Available"]
     Instances = ["_total"]
     Measurement = "sharepoint.FoundationSearchArchivalPlugin"

   [[inputs.win_perf_counters.object]]
     ObjectName = "SharePoint Foundation BDC Metadata"
     Counters = ["Cache misses per second", "Cache hits per second"]
     Instances = ["_total"]
     Measurement = "sharepoint.FoundationBDCMetadata"

   [[inputs.win_perf_counters.object]]
     ObjectName = "SharePoint Foundation Search Gatherer Databases"
     Counters = ["Documents in the crawl history", "Documents in the crawl queue"]
     Instances = ["_total"]
     Measurement = "sharepoint.FoundationSearchGathererDatabases"
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



