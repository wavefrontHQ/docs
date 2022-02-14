---
title: taggify Function
keywords: query language reference
tags: [query language reference]
sidebar: doc_sidebar
permalink: ts_taggify.html
summary: Reference to the taggify() function
---

## Summary

```
taggify(<expression>, <newPointTagKey>, "<newPointTagValue>")

taggify(<expression>, metric|source|{tagk, <pointTagKey>}, <newPointTagKey>,
         <zeroBasedNodeIndex> [,"<delimiterDefinition>"])

taggify(<expression>, metric|source|{tagk, <pointTagKey>}, <newPointTagKey>,
		 “<regexSearchPattern>”, “<replacementPattern>”)
```

Creates a synthetic point tag with the specified key for each time series. The value of the new tag can be a specified string or derived from existing metadata.



## Parameters

<table>
<tbody>
<thead>
<tr><th width="35%">Parameter</th><th width="65%">Description</th></tr>
</thead>
<tr>
<td>tsExpression</td>
<td>The expression that describes the time series to be tagged.</td>
</tr>
<tr>
<td>newPointTagKey</td>
<td>Key that will be used for the new synthetic point tag.</td>
</tr>
<tr>
<td>"newPointTagValue"</td>
<td>Static string value to use as the point tag value. </td>
</tr>

<tr>
<td>metric&vert;source&vert;&#123;tagk,&lt;pointTagKey&gt;&#125;</td>
<td>Type of metadata value to extract a node or substrings from.
<ul>
<li markdown="span">Specify `metric` to construct the new point tag value based on the metric name.</li>
<li markdown="span">Specify `source` to construct the new point tag value based on the source name.</li>
<li markdown="span">Specify `tagk, <pointTagKey>` (no curly braces) to construct the new point tag value based on an existing point tag value.
</li>
</ul>
</td>
</tr>

<tr>
<td>zeroBasedNodeIndex, "delimiterDefinition"</td>
<td>Use these parameters if you want to extract a single node from an existing source name, metric name, or point tag value and use it as the new point tag value.
<ul>
<li><code>zeroBasedNodeIndex</code> - Index number that identifies the node to be extracted from the metadata value. Nodes are indexed from left to right, starting with 0. </li>
<li><code>delimiterDefinition</code> (optional) - One or more characters to use as node delimiters. Omitting this parameter is the same as specifying <code>"."</code> <br> For example, specify <code>".-_"</code> to subdivide <code>disk.space-total_environment</code> into 4 nodes (numbered 0-3).  </li>
</ul>
</td>
</tr>
<tr>
<td>"regexSearchPattern", "replacementPattern"</td>
<td>Use these parameters if you want to use regular expressions to construct a new point tag value that includes substrings from an existing source name, metric name, or point tag value.
<ul>
<li><code>"regexSearchPattern"</code> - A regular expression pattern to match against the source name, metric name or point tag value.</li>
<li><code>"replacementPattern"</code> - String to use as the point tag value. Use <code>$1</code>, <code>$2</code>, etc., to refer to successive capturing groups of text that are matched by the <code>regexSearchPattern</code></li>
</ul>
</td>
</tr>

</tbody>
</table>

## Description

The `taggify()` metadata function lets you create a synthetic point tag with the specified key for each time series described by `tsExpression`. The value of the tag can be a specified string or derived from the metric name, the source name, an existing point tag value, or a combination of these.


For example, suppose that you have a set of metrics that include a customer name in the actual metric name. Each customer has 3 unique metrics associated with it and all metrics are  being reported by a single source:

```
Source="Customer-Example"

cpu.idle.customerA
cpu.load.customerA
cpu.total.customerA

cpu.idle.customerB
cpu.load.customerB
cpu.total.customerB
```

Based on this dataset, you can aggregate the data, but cannot aggregate based on customer. You can instead use a "group-by" point tag option for aggregate functions. To get the results you want, you:

* Extract the customer name from the metric(s) and apply it as a synthetic point tag.
* Apply an aggregate function.

```
min(taggify(ts("cpu.*"), metric, customer, 2), customer)
```

The query above:
1. Identifies the customer name.
2. Extracts that information as a point tag value.
3. Applies it to a point tag key `customer`.
4. Applies an aggregate function, in this case `min()`.
5. Groups by customer (see [Grouping](query_language_reference.html#grouping))

`taggify()` lets you specify a new point tag value as:

* A simple string.
* A string that contains variables.
* A single node that is extracted from the original metric name, the source name, or a point tag value.
* Substrings that are matched by regular expressions from the original metric name, the source name, or a point tag value.

**Note:** You can nest `taggify` calls.

### Simple String

You can specify a simple string if you want to use the same point tag value for all time series described by `tsExpression`.

### String With Variables

You can specify a string with variables if you want the point tag value for each time series to contain one or more metadata values from that series. You can use any combination of variables and embed them in text. The following variables obtain the actual metric name, the source name, or the value of a specified point tag:

{% raw %}
`"{{metric}}"  "{{source}}"  "{{<pointTagKey}}"`
{% endraw %}

Suppose you have a metric with a `region` point tag, and you want to display a chart with a new point tag called `location` that consists of the string `Price`, followed by the value of the `region` tag and the source name, separated by slashes. The following function accomplishes this:

{% raw %}
```handlebars
aliasMetric(ts(aws.instance.price), "Price/{{region}}/{{source}}")
```
{% endraw %}

The specified replacement string acts like a template, in which Wavefront replaces each variable with the requested string value. If `ts(aws.instance.price)` describes a time series that has a point tag `region=us-west-2`, that time series is displayed with a metric name like `Price/us-west-2/mycluster-2c-ha2-i-00e421d1bef7fb88e`.



### Single Extracted Node

A common practice is to use naming conventions that provide structure to metric names, source names, or point tag values. Naming conventions typically subdivide  metadata values into nodes, which are substrings that are delimited by certain characters. By default, Wavefront uses periods (".") as node delimiters, but your naming conventions might use other characters.

You can use `taggify()` with a `zeroBasedNodeIndex` to extract a single node from an existing metadata value and use just the extracted node as point tag values for your time series. For example, if you have a time series with a metric name like `pdx.customerA_latency.i49f21a72`, you could use `taggify()` to display it with a point tag like `cust=customerA_latency`.

`zeroBasedNodeIndex` specifies the node to extract by counting nodes from left to right, starting with 0. You must specify the type of value to extract the node from by including `metric`, `source` or `tagk, <pointTagKey>`.

For example, suppose you use the following naming convention for a metric namespace, and you consider periods (".") to be node delimiters: `<datacenter>.<customerName>_latency.<idNumber>`

Under these conventions, the nodes in the metric name `pdx.customerA_latency.i49f21a72` are numbered as follows:

|**node**|**node number**|
|pdx|0|
|customerA_latency|1|
|i49f21a72|2|

The following query extracts `customerA_latency` from the metric name and uses it as the value for a new point tag called `cust`:
```
taggify(ts(pdx.customerA_latency.i49f21a72), metric, cust, 1)
```

`customerA_latency` is a single node because it does not contain a period ("."), which is the default delimiter. You can specify a nondefault set of delimiters to change how names are divided into nodes. For example, the following query extracts just `customerA` from the metric name by redefining the delimiter set to include both periods (".") and underscores ("_"):

```
taggify(ts(pdx.customerA_latency.i49f21a72), metric, cust, 1, "._")
```
### Matched Substrings

You can use `taggify()` with a regular expression `"regexSearchPattern"` to match one or more substrings from an existing metadata value, and then construct the new metric name `"replacementPattern"` from one or more matched substrings. You can combine these substrings with text and [variables](#replacement-string-with-variables).

You must include `metric`, `source` or `tagk, <pointTagKey>` to specify the type of value that you want to apply the regular expression to.

For example, assume:
* your time series comes from sources whose names follow the pattern `db-1`, `db-2`, and so on,
* you want a tabular chart that sorts the series by strings such as `dev-3`, which combine the value of the `env` point tag with the numeric part of the source name.

In the following example, `$1` references the `db-([0-9]*)` capture group. The query constructs the strings and assigns them to a point tag called `sortBy`.

{% raw %}
```
taggify(ts(~sample.db.connections.), source, sortBy, "db-([0-9])", "{{env-$1}}")
```
{% endraw %}



## Examples

Imagine you're a SaaS company that provides multiple versions of your platform. You collect data from each platform your customer(s) are running and you include a version key in the source name(s):

```
source="<app_x>-<machine_type>-<versionKey>"
```

With this approach each customer has several version keys over time. Right now, all customers are broken into 3 categories: `<versionKey1>`, `<versionKey2>`, and `<versionKey3>`.

You want to collect a dataset that helps you understand the difference in performance between the different versions. You can create a synthetic point tag `version` based on `<versionKey>` to aggregate and group by `version` and to see the performance differences.

You can accomplish this with `taggify()` either by extracting a node or by applying a regular expression.

### Extracted Node Example - Adding a new point tag

The following query:
* Identifies `source` as the type of metadata to extract the `<versionKey>` from.
* Adds a synthetic point tag called `version`.
* Identifies `<versionKey>` as node 2 of the source name, when hyphens are defined as delimiters.
* Uses the node as the value of the new `version` point tag.

```
taggify(ts("performance.*.tracker"), source, version, 2, "-")
```


### RegEx Example - Adding a new point tag

The following query:

* Identifies `source` as the type of metadata to extract the `<versionKey>` from.
* Adds a synthetic point tag called `version`.
* Matches `<versionKey>` as the 3rd capture group in the source name (between the last hyphen and the end of the name).
* Uses the 3rd capture group to specify the value of the new `version` point tag.

```
taggify(ts("performance.*.tracker"), source, version,  "^(.*)-(.*)-(.*)$", "$3")
```

## Caveats

### Using a taggify() Result in a Separate Query

When you use the `taggify()` function, it creates a synthetic point tag, not an actual one. You cannot call that synthetic point tag in a separate query. You might be able to use the `retainSeries()` function to retain only the series that have the synthetic point tag that you define.

### Getting Duplicate Return Values with taggify()
When you use `taggify()` with a regular expression, you might encounter a  behavior that exists in most regex engines - a "greedy" regular expression in the "." search pattern matches the entire string, but it also matches the empty string at the end of input, so it substitutes the value twice, as in the following example:

``
taggify(highpass(80, align(15m, mean, ts(metricname),tagk,tenant,grouping,".*","ProblematicTenant") ...
``

Use ".+", "^." or ".*$" as your search pattern to match the entire string only once.


## Learn More!

* For additional examples, see the [aliasSource() Function](ts_aliasSource.html).

* See the KB article [Working with metadata functions - aliasSource, aliasMetric and taggify](https://help.wavefront.com/hc/en-us/articles/360057122452-Working-with-metadata-functions-aliasSource-aliasMetric-and-taggify)
