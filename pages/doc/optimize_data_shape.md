---
title: Optimizing the Data Shape to Improve Performance
keywords: getting started
tags: [getting started, cardinality, videos, best practices]
sidebar: doc_sidebar
permalink: optimize_data_shape.html
summary: Learn how to optimize your data in high-cardinality environments.
---
This page explains how you can optimize performance by making smart choices about how you send data to Wavefront.

* [Data cardinality](cardinality.html) is the number of values in a set. Wavefront supports high cardinality for time series data and infinite cardinality for distributed tracing. Eventually high cardinality can cause system slowdown and metrics retrieval issues.
* Data shape refers to how each component of a time series is designed and formatted.

## Video

In the following video Wavefront co-founder Clement Pang explains cardinality and why it's important.

<a href="https://youtu.be/8wKPkrIiXKw" target="_blank"><img src="/images/v_cardinality.png" style="width: 700px;" alt="about cardinality"/></a>

## Shaping Your Data Effectively

The first two actions you can take have to do with how much data you sent and how that data is structured.

**Action: Don't send more time series than necessary**

Making sure that we don't introduce more time series than necessary will also improve query performance.

**Action: Be smart about data point elements**

Tanzu Observability by Wavefront has several indexes for retrieving data.
* One of the main indexes uses the metric name and source name combination.
* Another index allows retrieval of data based on the point tag key and values combination.
If we can be smart about using both of these indexes in our data shaping, the query engine can return results faster.




### Step 1: Check if the data is a time series

Wavefront is an observability platform that supports time series data. Time series because track some behavior over time. Each data point is a measurement at a particular point in time. We can connect and graph data points because we know that they are measuring the same behavior at different moments in time. For example, you might want to measure the CPU load for one data source over time.

Wavefront can identify which data points are measuring the same behavior through the various components of each data point (metric name, source name, and point tag name/value). The unique combination of these components describes what we are measuring. For example, Wavefront sees that the CPU load for source-1 is different from the CPU load for source-2 and shows 2 time series in the chart. Or, if point tags are associated by the data then Wavefront can track different Kubernetes Pods separately.

However, if your data is tracking very unique behavior such that no two data points (or very few of them) belong to the same time series, it's difficult to graph that time series. Ensure that you have a true time series -- maybe using [Distributed Tracing](tracing_basics.html).

To detect if data has this unique data shape, query the raw data on a line chart. If you see a bunch of dots rather than lines, you know that each data point belongs to a different series and therefore, you actually do not have true time series data.

Data is stored as time series, that is, data that belong to the same series are stored together. Increasing the number of time series slows down data retrieval because
* More time series may need to be scanned to find all the time series that need to be retrieved.
* More time series have to be retrieved. Each dot represents a time series, and if a different query would result in a different set of dots representing time series, all those time series have to be scanned.


## Step 2: Ask how data will be queried and optimize

Understanding how the data is to be ingested and how it will be queried is key to optimizing the data shape. This will help with determining what should make up each **component** of the data points. Components include the metric name, source name, and point tags. The key consideration is to optimize for the most frequent/common situation so we start with source name and metric name, one of the indexes.


### Source Name

Think about:
* How the metric will be queried?
* What will be the main (or most frequently used) dimension for filtering or grouping the data? This dimension will often be the best candidate to use as the source name.

If you ask these questions, you'll make good use of the metric name/source name index and you'll improve the retrieval speed of the data we care about (and query performance).

**Example: Set the optimal source name**

Suppose I have an application with multiple services and I want to have a time series metric tracking request count.

* **Efficient data shape**. Suppose that most of the time I want to see request counts by service i.e. I need the request count for each of my services. In that case it makes sense to set the service name as the source name of each data point as part of preprocessing. In my queries, I can then to easily see data for each of my services by using the service name as the source filter.

* **Wasteful data shape**. Suppose, instead, that I set the source name as the host name of the server that is collecting the request count data. If I do that I need to add a point tag to specify the service. When I run my queries to find request counts for a particular service, I have to filter by point tag. This approach has two problems:
  - The source name information (hostname) is effectively useless.
  - The metric name/source name index is not sufficient to retrieve the data I'm interested in and the query engine has to scan more data to find the information I need.
A better solution is to design my data shape to make the most efficient use of all components.



### Metric Name

Carefully thinking about the metric name is also important.
* It's helpful if the metric name reflects data that is comparable across various sources.
* It's important that the metric name is not too broad and that it shards the data in a way that makes sense.

**Example: Decide on efficient metric names**

Suppose I have a metric that is tracking response code counts. I want to compare how many responses each service had. In most situations, I want to compare specific sets of response codes. For instance, I may want to compare just the error response codes.

* **Wasteful data shape**: If I name my metric `response_code`, then I have to use a point tag to track the individual response codes (ie. 202, 400, 401, 500, etc). Because I actually need to compare counts of a **specific** response code across services, my queries have to filter by metric name, by source name, and by point tag. This is not an efficient use of the metric name and source name index.

  Because the metric name itself is too broad, this index doesn't allow us to directly retrieve the data we're interested in. Additional filtering is needed.

* **Efficient data shape**: Suppose, instead, that my metric name is `response_code.<code>` (e.g. `response_code.202`, `response_code.400`, etc.). We can still compare how often we see each response code for each service (source), but we're using the metric name/source name index more efficiently. We can now directly retrieve the data of interest without needing further filtering.

In most cases, additional filtering is required in your queries. But it's useful to start out with an efficient query instead of using a wasteful data shape.


## Step 3: Check data points aren't highly unique?

Often, the first instinct is to store every attribute that you need for a particular set of data as a separate point tag key and value. However, it's important to consider how frequently the values of the point tags change.
* If the value changes rarely, e.g. with the point tag env that can have values `az="us-west-1"` and `az="us-west-2"` it makes sense to use a point tag because many (or all!) data points will have one or the other value for `az`.
* If the value changes with each data point, this would make a very poor point tag because it would result in a very large number of time series, each with just a single data point. For example, if you want to use a timestamp or other unique identifier, each data point has a different unique value. This slows down data retrieval and therefore, query performance.

The same concept applies to metric names and source names. None of the components of a data point that describe what is being measured should be so unique that each data point is its own time series. Therefore, things like timestamps or unique IDs should not be used in metric names, source names, or point tags.

There are valid situations where it's appropriate to capture ephemeral information with point tags. But if possible, avoid using unique values in metric names, source names, or point tags.


## Learn More!

Our Customer Success team has prepared several KB articles that give additional detail.
* [How to optimize and format the shape of your data for query performance](https://help.wavefront.com/hc/en-us/articles/360061261412-How-to-optimize-and-format-the-shape-of-your-Data-for-query-performance-).
* [Common time limits and best practices](https://help.wavefront.com/hc/en-us/articles/360058716512-Common-Tanzu-Observability-time-limits-and-best-practices).
* [Understand your time series data shape](https://help.wavefront.com/hc/en-us/articles/360050098952-Understand-your-time-series-data-shape).
* [Monitoring Metric Data Quality](https://help.wavefront.com/hc/en-us/articles/360055613191-Monitoring-metric-data-quality).
