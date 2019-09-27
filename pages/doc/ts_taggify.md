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
taggify (<expression>, <newPointTagKey>, "<newPointTagValue>")

taggify (<expression>, metric|source|{tagk, <pointTagKey>}, <newPointTagKey>,
         [<zeroBasedNodeIndex> [,"<delimiterDefinition>"])

taggify (<expression>, metric|source|{tagk, <pointTagKey>}, <newPointTagKey>,
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
<li markdown="span">Specify `metric` to construct the new point tag value from part of the metric name.</li>
<li markdown="span">Specify `source` to construct the new point tag value from part of the source name.</li>
<li markdown="span">Specify `tagk, <pointTagKey>` (no curly braces) to construct the new point tag value from an existing point tag value. 
</li>
</ul>
</td>
</tr>

<tr>
<td>zeroBasedNodeIndex, "delimiterDefinition"</td>
<td>Use these parameters if you want to extract a single node from an existing source name, metric name, or point tag value and use it as the new point tag value.
<ul>
<li><code>zeroBasedNodeIndex</code> - Index number that identifies the node to be extracted from the metadata value. Nodes are indexed from left to right, starting with 0. </li>
<li><code>delimiterDefinition</code> - One or more characters to use as node delimiters. Omitting this parameter is the same as specifying <code>"."</code> <br> For example, specify <code>".-_"</code> to subdivide <code>disk.space-total_environment</code> into 4 nodes (numbered 0-3).  </li>
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

### Simple String

You can specify a simple string if you want to use the same point tag value for all time series described by `tsExpression`.
 
### String With Variables

You can specify a string with variables if you want the point tag value for each time series to contain one or more metadata values from that series. You can use any combination of variables and embed them in text. The following variables obtain the actual metric name, the source name, or the value of a specified point tag:

{% raw %}
`"{{metric}}"  "{{source}}"  "{{<pointTagKey}}"`
{% endraw %}

Suppose you have a metric with a `region` point tag, and you want to display a chart with a new point tag called `location` that consists of the value of its `region` tag and its source name, separated by a slash. The following function accomplishes this:

{% raw %}
```handlebars
aliasMetric(ts(aws.instance.price), location, "{{region}}/{{source}}")
```
{% endraw %}

The specified replacement string acts like a template, in which Wavefront replaces each variable with the requested string value. If `ts(aws.instance.price)` describes a time series that has a point tag `region=us-west-2`, that time series is displayed with a metric name like `us-west-2/mycluster-2c-ha2-i-00e421d1bef7fb88e`.



### zeroBasedNodeIndex Approach

The zeroBasedNodeIndex approach for `taggify()` refers to extracting a single node from an existing source name, metric name, or point tag value to create synthetic point tag.

Nodes in existing source name(s), metric name(s), or point tag value(s) are separated by delimiters. Suppose you have the following naming convention for a metric namespace:

```
<datacenter>.<customerName>_latency.<idNumber>
```
e.g. `pdx.customerA_latency.i49f21a72`

For the example metric name above, each node is assigned a number:

```
pdx = 0
customerA_latency = 1
i49f21a72 = 2
```

By default, Wavefront assumes nodes are separated by a (".") delimiter. This is why `customerA_latency` is considered a single node. If the data you want to extract a node from includes other delimiters, such as a hyphen ("-") or underscore ("_"), then you can use the `"delimiterDefinition"` parameter. The syntax for `taggify()` using the zeroBasedNodeIndex approach is:

```
taggify(expression, metric|source|{tagk, <pointTagKey>}, newPointTagKey,
   zeroBasedNodeIndex [, "delimiterDefinition"])
```

### Regex Approach

You can use a regular expression in `taggify()` to extract an existing metric name, source name, or point tag value and create a synthetic point tag from the information.  This approach works like search and replace &mdash;everything matching `regexSearchPattern` is replaced with `replacementPattern`. The syntax for this approach is:

```
taggify(expression, metric|source|{tagk, <pointTagKey>}, version,
   "regexSearchPattern", "replacementPattern")
```


## Examples

Imagine you're a SaaS company that provides multiple versions of your platform. You collect data from each platform your customer(s) are running and you include a version key in the source name(s):

```
source="<app-x>-<machine_type>.<versionKey>"
```

With this approach each customer has several version keys over time. Right now, all customers are broken into 3 categories: `<versionKey1>`, `<versionKey2>`, and `<versionKey3>`.

You want to collect a dataset that helps you understand the difference in performance between the different versions. You can create a synthetic point tag `version` based on `<versionKey>` to aggregate and group by `version` and to see the performance differences.

### Using taggify with a zeroBasedNodeIndex Example

The following query uses the zeroBasedNodeIndex approach to:
* identify `source` as the set of data to extract the `<versionKey>`,
* name `version` as the new point tag key,
* and identify `<versionKey>` as the 1st node.

```
taggify(ts("performance.*.tracker"), source, version, 1)
```

You can nest `taggify` calls.

### Using taggify with a Regular Expression

To perform the transform shown in the zeroBasedNodeIndex example with a regular expressions, use the following query:

```
taggify(ts("performance.*.tracker"), source, version, "regexSearchPattern", "replacementPattern")
```

## Caveats

### Using a taggify() Result in a Separate Query

When you use the `taggify()` function, it creates a synthetic point tag, not an actual one. You cannot call that synthetic point tag in a separate query. You might be able to use the `retainSeries()` function to retain only the series that have the synthetic point tag that you define.

### Getting Duplicate Return Values with taggify()
When you use `taggify` with a regular expression, you might encounter a  behavior that exists in most regex engines - a "greedy" regular expression in the "." search pattern matches the entire string, but it also matches the empty string at the end of input, so it substitutes the value twice, as in the following example:

``
taggify(highpass(80, align(15m, mean, ts(metricname),tagk,tenant,grouping,".*","ProblematicTenant") ...
``

Use ".+", "^." or ".*$" as your search pattern to match the entire string only once.
