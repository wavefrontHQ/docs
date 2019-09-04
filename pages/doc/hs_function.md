---
title: hs Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: hs_function.html
summary: Reference to the hs() function
---
## Summary
```
hs(<hsMetricName> 
  [,|and|or source=<sourceName>] 
  [,|and|or tag=<sourceTag>] 
  [,|and|or <pointTagKey>=<pointTagValue>] ...)
```

Returns the series of histogram distributions that match the specified histogram metric name, optionally filtered by sources and point tags. 
In a time-series chart, `hs()` displays just the median values of the distributions.


## Parameters


<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">hsMetricName</td>
<td markdown="span">Name of a histogram metric that describes one or more series of histogram distributions. A histogram metric name has an extension (`.m`, `.h`, or `.d`) that indicates the histogram's aggregation interval (minute, hour, or day). For example: `users.settings.numberOfTokens.m`</td></tr>
<tr>
<td>source=&lt;sourceName&gt;</td>
<td markdown="span">Source of the `hsMetricName` distributions to be returned. Distributions from any other sources are filtered out of the result set. Specify any number of sources by combining them with Boolean operators. Omit this parameter to return `hsMetricName` distributions from all sources.</td>
</tr>
<tr>
<td>tag=&lt;sourceTagName&gt;</td>
<td markdown="span">Source tag that designates the sources of the `hsMetricName` distributions to be returned. Distributions from any sources without the source tag are filtered out of the result set. Specify any number of source tags by combining them with Boolean operators. Omit this parameter to ignore source tags.</td>
</tr>
<tr>
<td>&lt;pointTagKey&gt;=&lt;pointTagValue&gt;</td>
<td markdown="span">Point tag key and value that are associated with the `hsMetricName` distributions to be returned. Distributions without the specified key-value pair are filtered out of the result set. Specify any number of point tags by combining them with Boolean operators. Omit this parameter to ignore point tags.</td>
</tr>
</tbody>
</table>


## Description

The `hs()` histogram function returns one or more histogram series, where each histogram series is a sequence of histogram distributions that Wavefront has computed from the data points of a time series. Every distribution in a histogram series is computed from the points that occur in a particular time interval. All distributions in an ingested histogram series occur once a minute, once an hour, or once a day. 

The `hs()` function uses the parameters you specify to select the histogram series to return: 
* Specify just the histogram metric name to return all histogram series that match the name. For example, the following function returns all histogram series for `user.settings.numberOfApiTokens.m`, which might be emitted from multiple sources and have any number of point tags associated with them:

  ```hs(users.settings.numberOfApiTokens.m)```

* Filter the matched series by specifying source names, source tags, or point tags. For example, the following function returns only the histogram series that are from the source `host1` and have a `customer` point tag with the value `qa`:

  ```hs(users.settings.numberOfApiTokens.m, source="host1" and customer="qa")```

You typically use an `hs()` function to specify `hsExpression` input to another histogram query function, for example, `max(hs(users.settings.numberOfApiTokens.m))` 

You can run `hs()` as a top-level query under a time-series chart to display the median values from the distributions in the described histogram series.


## Examples

<!--
The following example shows first the total number of sample requests for 2 sources, `app-2` and `app-20`.

![before aggregation with max](images/ts_max_aggr_before.png)

And here we see what happens when we apply `max()`.

![after aggregation with max](images/ts_max_aggr_after.png)

-->

## See Also

* [Wavefront Histograms](proxies_histograms.html)
