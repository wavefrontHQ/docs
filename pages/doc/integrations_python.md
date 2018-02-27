---
title: Visualizing Metrics with Python
keywords: integrations
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_python.html
summary: Learn how to use Python to visualize metrics in Wavefront.
---

The Wavefront system offers a variety of layers that can handle your real-time, high-frequency data&mdash;fast ingestion, fast querying, fast analytics, visualization, and alerting. [Wavefront Query Language](query_language_reference.html) is capable of performing most of the transformations you'll need for daily monitoring. However, there are cases when you may want to perform computations that the query language doesn't currently offer, or leverage a set of libraries you've already written in Python to do analytics. In these cases, you may want to run Python as a separate analytics layer on top of your Wavefront account.

With Python+Wavefront, you should be able to do just about any sort of analysis or visualization you can imagine. Want to see a histogram of your metric at an arbitrary bin width? Or a heat map of the correlations between your metrics? Model your metrics for trends, seasonality, noise, and make a forecast about future behavior? We'll show you how in this document.

## Installation and Setup

To set up the Python integration, follow the [instructions on the github page](https://github.com/wavefrontHQ/docs/blob/master/pages/doc/integrations_python.md).

## Getting Data Into Python

The Wavefront Python library allows you to perform the exact same queries through Python that you would normally perform in the source field of the Wavefront chart, along with the same control over the time range. For example, you might normally enter `ts(requests.latency)` to grab the metric `requests.latency` over your 20 hosts:

![query.jpeg](images/query.jpeg)

In Wavefront Python you enter that query expression verbatim to retrieve the same data in numerical format, as a Python Pandas dataframe:

```python
df = wfquery(base, token, wfnow() - wfhours(2), wfnow() - wfminutes(1), 'ts(requests.latency)', clab='h')
```

Let's look at this query in more detail. The `base` and `token` variables were set in the prerequisites, and allow Wavefront to know where to query and how to authenticate that query. The third and fourth fields are the start and end times for the query, in epoch second format. The fifth field is the actual ts() query, and the final field is an option that tells the query to set the column labels ("clab" for short) of the resulting dataframe to the h(ost) for that time series. Schematically, the function is:

```python
df = wfquery(serverURL, wavefrontAccountToken, startTime, endTime, query)
```

The wfnow() function is a convenience function for the most recent time, so the range that we're requesting is from `wfnow() - wfhours(2)`, or two hours ago, to `wfnow() - wfminutes(1)`, or one minute ago. This should give us exactly 120 observations (one per minute) over however many hosts were emitting the `requests.latency` metric.
Let's look at the result now. The dataframe returned has one column per returned time series, as well as an initial column named `time`, which contains the epoch seconds for that row. For example, in the call above, the dataframe has 120 (time) observations of 21 (time+host) variables; here's the top of that dataframe:

![dframe.png](images/dframe.png)

This dataframe can be manipulated like any other within Python.
If you wanted to see the request latencies divided by 100, or an average across all of the hosts, or the data from a month ago, you would do so in exactly the same way as you do from the Wavefront web site:

```python
d = wfquery(base, token, wfnow() - wfhours(2), wfnow() - wfminutes(1), 'ts(requests.latency) / 100', clab='h')
d = wfquery(base, token, wfnow() - wfhours(2), wfnow() - wfminutes(1), 'avg(ts(requests.latency))', clab='h')
d = wfquery(base, token, wfnow() - wfhours(2), wfnow() - wfminutes(1), 'lag("one month ago", avg(ts(requests.latency)))', clab='h')
```

Note the single quotes ('') around the query field, while internal strings (such as the first argument to `lag`) are expressed with double quotes (""). You can even divide metrics by each other and then perform functions (such as `lag`) on the result:

```python
df = wfquery(base, token, wfnow() - wfhours(2), wfnow() - wfminutes(1), 'lag("one month ago", ts(requests.failures.num) / ts(requests.total.num))', clab='h')
```

All of the above queries have looked at the most recent 2 hour period of data, taken at the minute granularity. However, you can look at longer periods of data with coarser granularity. For example, here is the most recent week of data, taken at the hour granularity `(granularity='h'`):

```python
df = wfquery(base, token, wfnow() - wfdays(7), wfnow(), 'ts(requests.latency)', clab='h', granularity='h')
```

The resulting dataframe has 169 observations (1 for each hour over the last week) over the 21 variables (1 time column, and 20 host columns):

![gran.png](images/gran.png)

The time rows are now spaced apart by 3600 seconds, rather than 60 seconds. If you pick a long time range and a short granularity, the request will eventually time out with no data returned. For most use cases either using a coarser granularity or a `lag()` on top of a short window will fulfill your needs.

## Visualizing Data in Python
Now that you've gotten your Wavefront data into Python, you can do some interesting visualizations on it. First run a query against Wavefront to pull some data into a dataframe:

```python
# Grab requests.latency over the last 2 hours
df = wfquery(base, token, wfnow() - wfhours(2), wfnow() - wfminutes(1), 'ts(requests.latency)', clab='h')
# Remove any missing data
d = na.omit(d)
```

### Histograms

```python
# Show a histogram
ggplot(d, aes(d$"app-1")) + geom_histogram(aes(y = ..density.., fill = ..count..), binwidth=5) + geom_density()
```
![histogram.jpeg](images/histogram.jpeg)

### Heat Maps: Correlation Matrix

```python
# Show a heat map of cross-correlations of all the app servers over the full 2h window
qplot(d$"app-1", d$"app-2") + geom_point(color="red", size=3)
cord = cor(d)
for (index in 1:length(d)) cord[index,index] = 0
d.m = melt(cord)
ggplot(d.m, aes(Var1, Var2)) + geom_tile(aes(fill=value), colour="white") + scale_fill_gradient(low="white", high="steelblue")
```

![heatmap.png](images/heatmap.png)

## Analyzing Data in Python
Beyond visualizing data, you may want to perform more complicated analysis on the data than is possible within the Wavefront Query Language. Here is a linear regression example:

![linearregression.jpeg](images/linearregression.jpeg)

### Example

```python
queries = c('ts(mem.used.percentage,source=app-1)','ts(cpu.loadavg.1m,source=app-1)')
dataset = wfqueryvl(base,token, wfnow() - wfhours(2), wfnow() - wfminutes(1),queries) # dataframe containing data from both queries along with timestamp
scatterdata = data.frame(Mem = dataset[[2]],Cpu = dataset[[4]]) # only metric values from both queries mapped based on timestamp
ggplot(scatterdata,aes(x=Mem,y=Cpu)) + geom_point(shape=19) +geom_smooth(method=lm)
```

![scatterplot.jpeg](images/scatterplot.jpeg)

## Resources
If you're just getting started with Python, there are a few resources to help you out.

- [Pandas](http://pandas.pydata.org/)
- [Python for Data Analysis](http://shop.oreilly.com/product/0636920023784.do)
