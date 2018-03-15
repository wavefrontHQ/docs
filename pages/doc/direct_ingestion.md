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

Wavefront currently expect that your host, application, or custom code send metrics to a Wavefront proxy installed in your environment. The proxy forwards metrics to the Wavefront service. In production environments, two proxies behind a load balancer guarantee availability and prevent data loss.

![proxies behind load balancer](/images/proxy_deployment_load_balancer.svg)

Because some customers told us they'd like to send data directly to the Wavefront service, we're now making this functionality available.

## Example Commands

The following commands illustrate how to send a string, a file, and an octet to Wavefront.
* A token is required.
* The examples use graphite format, but that's not a requirement.

### String

Send the text string "hello.world":

```
echo "hello.world 1 host=<myhost>"|curl -H "Content-Type:text/plain" --data @-http://localhost:8080/report?f=graphite_v2\&t=token
```

### File

Send the file named `hello.world`:

```
echo "hello.world 1 host=<myhost>"|curl -F file=@-http://localhost:8080/report?f=graphite_v2\&t=token
```

### Octet

Send the octet stream `hello.world`:

```
echo "hello.world 1 host=<myhost>"|curl --data @-http://localhost:8080/report?f=graphite_v2\&t=token
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
