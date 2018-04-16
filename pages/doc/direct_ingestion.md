---
title: Direct Data Ingestion
keywords: data
tags: [data]
sidebar: doc_sidebar
permalink: direct_ingestion.html
summary: Learn how to send data directly to the Wavefront service.
---

You use the direct data ingestion mechanism to send data directly to the Wavefront service instead of a proxy. While the Wavefront proxy has many [benefits](proxies.html#proxy-benefits), direct data ingestion can be the best approach for some use cases.

**Note:** You need **Direct Data Ingestion** permissions to perform direct data ingestion.

## Background

Wavefront currently expects that your host, application, or custom code send metrics to a Wavefront proxy installed in your environment. The proxy forwards metrics to the Wavefront service. In production environments, two proxies behind a load balancer guarantee availability and prevent data loss.

![proxies behind load balancer](/images/proxy_deployment_load_balancer.svg)

Because some customers told us they'd like to send data directly to the Wavefront service, we're now making this functionality available.

## Example Commands

The following commands illustrate how to send a string, a file, and an octet to Wavefront.
* An [API token](wavefront_api.html#generating-an-api-token) is required. Referred to as `<<TOKEN>>` in the examples.
* You must know your Wavefront domain name, `metrics.wavefront.com` is used in the examples.
* The examples use the [Wavefront Data Format](wavefront_data_format.html) which is named `graphite_v2`.

### Multiple data points

Assuming `wavefront.txt` contained 1 or more lines in the Wavefront data format you could send it to Wavefront like this:

```
cat wavefront.txt | curl -H "Authorization: Bearer <<TOKEN>>" -F file=@- https://metrics.wavefront.com/report?f=graphite_v2
```

### Single data point

Send a single data point:

```
echo "hello.world 1 host=<myhost>" | curl -H "Authorization: Bearer <<TOKEN>>" --data @- https://metrics.wavefront.com/report?f=graphite_v2
```

## Comparing Proxy and Direct Ingestion

Direct ingestion has some benefits, but also some limitations:

* No disk queueing
* No rate limiting
* No blacklist or whitelist
* No preprocessor
* No support for OpenTSB, JSON, and Pickle
* No support for log ingestion

Some limitations, for example supported data formats, might be resolved in the future, but others are benefits of the Wavefront proxy.
