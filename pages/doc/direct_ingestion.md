---
title: Direct Data Ingestion
keywords: data
tags: [data]
sidebar: doc_sidebar
permalink: direct_ingestion.html
summary: Learn how to send data directly to the Wavefront service.
---

You use the direct data ingestion mechanism to send data directly to the Wavefront service instead of a proxy. While the Wavefront proxy has many [benefits](proxies.html#proxy-benefits), direct data ingestion can be the best approach for some use cases.

{% include shared/badge.html content="You need [Direct Data Ingestion permission](permissions_overview.html) to perform direct data ingestion." %}

## Background

Wavefront currently expects that your host, application, or custom code send metrics to a Wavefront proxy installed in your environment. The proxy forwards metrics to the Wavefront service. In production environments, two proxies behind a load balancer guarantee availability and prevent data loss.

![proxies behind load balancer](/images/proxy_deployment_load_balancer.svg)

Because some customers told us they'd like to send data directly to the Wavefront service, we're now making this functionality available.

## Example Commands

The following examples illustrate how to send data to Wavefront.
* An [API token](wavefront_api.html#generating-an-api-token) is required. Referred to as `<TOKEN>` in the examples.
* You must know your Wavefront domain name. These examples use `mydomain.wavefront.com`.
* Currently, we support only [Wavefront Data Format](wavefront_data_format.html), which is named `wavefront`. If you don't specify `f=wavefront`, we still use that format.

### Multiple Data Points

Assume `wavefront.txt` contains 1 or more lines in the Wavefront data format. You can send it to Wavefront like this:

```
cat wavefront.txt | curl -H "Authorization: Bearer <TOKEN>" -F file=@- https://mydomain.wavefront.com/report
```

### Single Data Point

You can send a single data point like this:
```
echo "hello.world 1 source=<myhost>" | curl -H "Authorization: Bearer <TOKEN>" --data @- https://mydomain.wavefront.com/report
```

### Histogram Distribution

You can perform direct ingestion of [histogram distributions](proxies_histograms.html#sending-histogram-distributions) in histogram distribution format. You cannot perform direct ingestion of histogram data in Wavefront data format.

Here's a simple example:
```
echo '!M #20 30 #10 5 request.latency source=appServer1 region=us-west' | curl -H "Authorization: Bearer <TOKEN>" --data @- https://mydomain.wavefront.com/report?f=histogram
```

Notes:
* Enclose the distribution in single quotes for compatibility with the `!M` syntax. 
* Specify the distribution using the [histogram distribution format](proxies_histograms.html#sending-histogram-distributions).
* Include `f=histogram` at the end of the `--data` argument to ensure the input is treated as a histogram distribution.

### Trace Data (Spans)
You can perform direct ingestion of [trace data](tracing_basics.html#wavefront-trace-data) in Wavefront span format.

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
* If you ingest spans using a direct ingestion command such the example above, you are limited to using [Query Editor](trace_data_query.html#use-query-editor-power-users) when you want to query for traces containing those spans. (Query Builder cannot find spans ingested in this way).


## Comparing Proxy and Direct Ingestion

Direct ingestion has some benefits, but also some limitations:

* No disk queueing
* No rate limiting
* No blacklist or whitelist
* No preprocessor
* Only Wavefront data format is currently supported. No support for OpenTSB, JSON, and Pickle
* No support for log ingestion

Some limitations, for example supported data formats, might be resolved in the future, but other limitations are benefits of the Wavefront proxy.
