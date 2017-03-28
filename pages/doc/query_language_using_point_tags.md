---
title: Using Point Tags in Queries
keywords: query language
tags: [query_language]
datatable: true
sidebar: doc_sidebar
permalink: query_language_using_point_tags.html
summary: This topic describes how to use point tags in Wavefront Query Language queries.
---
Point tags are key-value pairs (strings) that are associated with a point. Point tags provide additional context for your data. They can be used, for example, to label a point's datacenter, version, etc. You can add point tags when sending points in through the Wavefront proxy and later query them in Wavefront Query Language expressions. Query fan-out is based on metric and source combinations; Wavefront recommends that point tag cardinality stays below 1000 unique pairs per metric and source.
 
Suppose you send the following points, all from a single source cache1, over a 5 minute period:

```
test.request.latency 30 1394740020 source=cache1 clientService="API" 
test.request.latency 25 1394740080 source=cache1 clientService="API" 
test.request.latency 34 1394740140 source=cache1 clientService="API" 
test.request.latency 37 1394740200 source=cache1 clientService="API" 
test.request.latency 16 1394740240 source=cache1 clientService="API" 
test.request.latency 45 1394740020 source=cache1 clientService="web" 
test.request.latency 53 1394740080 source=cache1 clientService="web" 
test.request.latency 25 1394740140 source=cache1 clientService="web" 
test.request.latency 60 1394740200 source=cache1 clientService="web" 
test.request.latency 30 1394740240 source=cache1 clientService="web"
```
The first 5 points are request latencies from API calls, while the last 5 points are request latencies from web calls. If you query **ts(test.request.latency**), you'll see two lines:

![Two lines](images/two_lines.png)

The orange line is associated with the point tag **clientService=web**, while the blue line is associated with the point tag **clientService=API**. 

If you have multiple point tags on a given point, you'll see all of the point tags. For example, the points in the green line contain three point tags: **clientService**, **clientApp**, and **hw**. Note that they are all visible in the legend:

![Three lines](images/three_lines.png)

### Filtering Queries Using Point Tags

To see the request latencies that have the **clientService="API"** point tag use the query: **ts(test.request.latency, clientService="API")**:

![One point tag](images/one_point_tag.png)

One line is returned because all points share the same point tag key-value pairs. 
 
Suppose 5 points have the **clientService="batch"** point tag, but also various other point tags:

```
test.request.latency 45 1394740020 source=cache1 clientService="batch" clientApp="dailyReport" hw="vm045.wavefront.com" 
test.request.latency 47 1394740080 source=cache1 clientService="batch" clientApp="dailyReport" hw="vm045.wavefront.com" 
test.request.latency 44 1394740140 source=cache1 clientService="batch" clientApp="dailyReport"  
test.request.latency 25 1394740200 source=cache1 clientService="batch" clientApp="hourlyReport" 
test.request.latency 52 1394740240 source=cache1 clientService="batch" clientApp="hourlyReport"
```

You can query for all 5 points using **ts(test.request.latency, clientService="batch")**:

![Three point tags](images/three_point_tags.png)

The query retrieves all of the points, but they aren't charted as a single line because they don't represent the same exact set of point tag key-value pairs.
 
Finally, if you add another point tag to the query to further filter: **ts(test.request.latency, clientService="batch" and clientApp="hourlyReport")**

![Both point tags](images/both_point_tags.png)
 
only a single a series that matches both point tags displays; all of the other series (with different point tags) are filtered out.
 
Point tags offer you a powerful way of labeling your data so that you can slice and dice it in almost any way you can imagine.

{% include links.html %}