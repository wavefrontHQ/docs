---
title: Direct Data Ingestion
keywords: data
tags: [data]
sidebar: doc_sidebar
permalink: direct_ingestion.html
summary: Learn how to send data directly to the Wavefront service.
---

Tanzu Observability by Wavefront supports mechanisms to send data to the Wavefront service directly (direct ingestion) or to use the Wavefront proxy.

* **Direct data ingestion** can be the best approach at the beginning and during a POC.

  {% include note.html content="You must have the [**Direct Data Ingestion** permission](permissions_overview.html) to perform direct data ingestion." %}

  {% include note.html content="If you're using Tanzu Observability as part of a free trial or Freemium offering, there are limits on how much data you can send to the Wavefront service using direct ingestions. Contact support@wavefront.com if you need a higher limit. " %}

* In larger environments, most users like to take advantage of **proxy benefits**:
  * **Prevent data loss, optimize network bandwidth** – The proxy buffers and manages data traffic. Even if there’s a connectivity problem, you don’t lose data points.
  * **Simple firewall configuration** – The proxy receives metrics from many agents on different hosts and forwards those metrics to the Wavefront service. You don’t need to open internet access for each of the agents.
  * **Enrich or filter data** – You can set up the proxy preprocessor to filter data before it’s sent to the Wavefront service.
  * **Examine bottlenecks** – Each proxy generates its own metrics. You can [learn about incoming and outgoing data](monitoring_proxies.html) in the **Wavefront Service and Proxy** dashboard of the **Wavefront Usage** integration.




## Background

Most customers set up their environment so that the host, application, or custom code sends metrics to a [Wavefront proxy](proxies.html) installed in their environment. The proxy forwards metrics to the Wavefront service. In production environments, two proxies behind a load balancer guarantee availability and prevent data loss.

![proxies behind load balancer](/images/proxy_deployment_load_balancer.png)

Because some customers wanted to send data directly to the Wavefront service, we made this functionality available.

## Direct Ingestion Example Commands

The following examples illustrate how to send data directly to the Wavefront service.
* An [API token](wavefront_api.html#managing-api-tokens) is required. Referred to as `<TOKEN>` in the examples.
* You must know your Wavefront instance name. This doc page uses `mydomain.wavefront.com`.
* Currently, direct ingestion supports only [Wavefront Data Format](wavefront_data_format.html), which is named `wavefront`. If you don't specify `f=wavefront`, we still use that format.

### Multiple Data Points

Assume `wavefront.txt` contains 1 or more lines in the Wavefront data format. You can send the data to the Wavefront service like this:

```
cat wavefront.txt | curl -H "Authorization: Bearer <TOKEN>" -F file=@- https://mydomain.wavefront.com/report
```

### Single Data Point

You can send a single data point like this:
```
echo "hello.world 1 source=<myhost>" | curl -H "Authorization: Bearer <TOKEN>" --data @- https://mydomain.wavefront.com/report
```

### Histogram Distribution

You can perform direct ingestion of [histogram distributions](proxies_histograms.html#sending-histogram-distributions) in histogram data format. You cannot perform direct ingestion of histogram data in Wavefront data format.

Here's a simple example:
```
echo '!M #20 30 #10 5 request.latency source=appServer1 region=us-west' | curl -H "Authorization: Bearer <TOKEN>" --data @- https://mydomain.wavefront.com/report?f=histogram
```

Notes:
* Enclose the distribution in single quotes for compatibility with the `!M` syntax.
* Specify the distribution using the [histogram data format](proxies_histograms.html#sending-histogram-distributions).
* Include `f=histogram` at the end of the `--data` argument to ensure the input is treated as a histogram distribution.

### Trace Data (Spans)
You can perform direct ingestion of trace data in Wavefront [span format](trace_data_details.html#spans).

Here's a simple example:
```
echo "getAllUsers source=localhost traceId=7b3bf470-9456-11e8-9eb6-529269fb1459 spanId=0313bafe-9457-11e8-9eb6-529269fb1459 parent=2f64e538-9457-11e8-9eb6-529269fb1459 application=Wavefront service=istio cluster=none shard=none http.method=GET <start_milliseconds> <duration_milliseconds>" | curl -H "Authorization: Bearer <TOKEN>" --data @- https://mydomain.wavefront.com/report?f=trace
```

Notes:
* In the example, you:
  - Specify the span using [Wavefront span format](trace_data_details.html#wavefront-span-format).
  - Include `f=trace` at the end of the `--data` argument to ensure the input is treated as trace data.
  - Include `cluster=none` and `shard=none` for a span that does not have values for the `cluster` and `shard` span tags.
  - Replace `<start_milliseconds>` and `<duration_milliseconds>` with numbers indicating the span's start time and duration.
* If you ingest spans using a direct ingestion command such the example above, you are limited to using [Query Editor](trace_data_query.html#trace-queries-in-query-editor) when you want to query for traces containing those spans. (Query Builder cannot find spans ingested in this way).


## Proxy or Direct Ingestion?

Direct ingestion has some benefits, but also some limitations:

* No disk queueing
* No rate limiting
* No block list or allow list
* No preprocessor
* Only Wavefront data format is currently supported. No support for OpenTSB, JSON, and Pickle
* No support for log ingestion

When you use direct ingestion, you might see 406 responses, which means that the Wavefront service pushed back the data. Direct ingestion drops those data -- and if you code your client to retry, you're actually starting to rebuild the proxy.

It's typical that the Wavefront service doesn't accept a small amount of data. This pushback doesn't cause any issues with proxies. Consider this example:
* The data rate smoothed out over a minute is 100k pps.
* The Wavefront cluster is sized to 150k pps (plenty of headroom).
* However, the client (customer) sends all the data for each minute on the minute. The client might send 6M pps points in 1 second, than nothing for 59 seconds, then repeat.

Wavefront doesn't size your Wavefront cluster for 6M pps when the smoothed-out traffic is really 100k. Instead, the Wavefront service relies on the proxy to smooth out the traffic over the minute. Proxies retry queued points, so even with just one proxy you won't see dropped points.

With direct ingestion you might lose data. In most cases, using a proxy will therefore give you more reliable results.
