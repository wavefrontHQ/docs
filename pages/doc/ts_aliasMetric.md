---
title: aliasMetric Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_aliasMetric.html
summary: Reference to the aliasMetric() function
---

## Summary

```
aliasMetric (<tsExpression>, "<newMetricName>")

aliasMetric (<tsExpression>, [metric|source|{tagk, <pointTagKey>}],
         <zeroBasedNodeIndex> [, "<delimiterDefinition>"])

aliasMetric (<tsExpression>, [metric|source|{tagk, <pointTagKey>}], "<regexSearchPattern>",
         "<replacementPattern>" | "<replacementString>")
```

Replaces the metric name(s) for the specified time series with a specified string, with a single node from a metadata value, or with matched substrings from a metadata value. 


## Parameters

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="35%">Parameter</th><th width="65%">Description</th></tr>
</thead>
<tr>
<td>tsExpression</td>
<td>The expression that describes the time series to be renamed.</td>
</tr>
<tr>
<td>"newMetricName"</td>
<td>String value to replace each metric name with. </td>
</tr>
<tr>
<td>metric&vert;source&vert;&#123;tagk,&lt;pointTagKey&gt;&#125;</td>
<td>Type of metadata value to extract a node or substrings from.
<ul>
<li markdown="span">Specify `metric` to construct the new metric name for a time series from part of its actual metric name.</li>
<li markdown="span">Specify `source` to construct the new metric name for a time series from part of its source name.</li>
<li markdown="span">Specify `tagk, <pointTagKey>` (no brackets or curly braces) to construct the new metric name for a time series from part of the value of a given point tag. 
</li>
</ul>
Omitting this parameter is the same as specifying <code>metric</code>.
</td>
</tr>
<tr>
<td>zeroBasedNodeIndex, "delimiterDefinition"</td>
<td>Replace the metric name for a time series with a single node that is extracted from the source name, metric name, or point tag value. Nodes are delimited by periods ("."), unless you define a different set of delimiters.
<ul>
<li><code>zeroBasedNodeIndex</code> - Index number that identifies the node to be extracted from the metadata value. Nodes are indexed from left to right, starting with 0.  </li>
<li><code>delimiterDefinition</code> - One or more characters to use as node delimiters. Omitting this parameter is the same as specifying <code>"."</code> <br> For example, specify <code>".-_"</code> to subdivide <code>disk.space-total_environment</code> into 4 nodes (numbered 0-3).  </li>
</ul>
</td>
</tr>
<tr>
<td>"regexSearchPattern", "replacementPattern"</td>
<td>Construct the new metric name for a time series from substrings that are extracted from the source name, metric name, or a point tag value.
<ul>
<li><code>"regexSearchPattern"</code> - A regular expression pattern to match against the metadata value.</li>
<li><code>"replacementPattern"</code> - String to use as the new metric name. Use <code>$1</code>, <code>$2</code>, etc., to refer to successive capturing groups of text that are matched by the <code>regexSearchPattern</code>.</li>
</ul>
</td>
</tr>
</tbody>
</table>

## Description

The `aliasMetric()` metadata function lets you replace the metric names of one or more time series described by `tsExpression` by substituting a single new name, or by constructing new names from other metadata values. 

Here are some sample scenarios:
* You want to clarify the columns in a Table chart.
* You want an aggregation function to group by a given parameter that is only found within a metric, source, or point tag value.
* You want to make complex metric names easier for end users to understand.
* You use [derived metrics](derived_metrics.html).



`aliasMetric()` lets you replace metric names with:

* A simple replacement string.
* A replacement string that contains variables.
* A single node that is extracted from an existing metric name, source name, or point tag value. 
* Substrings that are matched by regular expressions from an existing metric name, source name, or point tag value.

### Simple Replacement String

You can specify a simple replacement string if you want to use the same metric name for all time series described by `tsExpression`.
 
Suppose you have a metric `ts("customer.user.total")` in your environment that tracks the number of total users of your product by customer. The series associated with this metric includes a customer point tag key to “group by” when applying an aggregate function:  `sum(ts("customer.user.total"),customer)`. If you want to display this information as a column on a Table chart, the current aggregate metric does not display properly. However, you can use `aliasMetric()` to rename the aggregate metric, and to apply a column header of **Total Users**.

```
aliasMetric(sum(ts("customer.user.total"),customer), "Total Users")
```

### Replacement String With Variables

You can specify a replacement string with variables if you want the metric name for each time series to contain one or more metadata values from that series. You can use any combination of variables and embed them in text. The following variables obtain the actual metric name, the source name or the value of a specified point tag:

{% raw %}
`"{{metric}}"  "{{source}}"  "{{<pointTagKey}}"`
{% endraw %}

Suppose you have a metric `ts(aws.instance.price)` that has a `region` point tag, and you want to display a chart in which the name of each time series consists of the value of its `region` tag and its source name, separated by a slash. The following function accomplishes this:

{% raw %}
```handlebars
aliasMetric(ts(aws.instance.price), "{{region}}/{{source}}")
```
{% endraw %}

The specified replacement string acts like a template, in which Wavefront replaces each variable with the string that represents the requested values. If `ts(aws.instance.price)` describes a time series that has `region=us-west-2`, that time series is displayed with a metric name like `us-west-2/mycluster-2c-ha2-i-00e421d1bef7fb88e`.


### Single Extracted Node

A common practice is to use naming conventions that provide structure to metric names, source names, or point tag values. Naming conventions typically subdivide  metadata values into nodes, which are substrings that are delimited by certain characters. By default, Wavefront uses periods (".") as node delimiters, but your naming conventions might use other characters.

You can use `aliasMetric()` with a `zeroBasedNodeIndex` to extract a single node from an existing metadata value and use just the extracted node as the metric name for your time series. For example, you might want to simplify a metric name like `pdx.customerA_latency.i49f21a72` by displaying it as `customerA_latency`. 

`zeroBasedNodeIndex` specifies the node to extract by counting nodes from left to right, starting with 0. By default, `aliasMetric()` extracts the node from the existing metric name. To extract a node from the source name or a specified point tag, you must explicitly include `source` or `tagk, <pointTagKey>`.

For example, suppose you have the following naming convention for a metric namespace, and you use periods (".") as node delimiters: `<datacenter>.<customerName>_latency.<idNumber>` 

Under these conventions, the nodes in `pdx.customerA_latency.i49f21a72` are numbered as follows:

|**node**|**node number**|
|pdx|0|
|customerA_latency|1|
|i49f21a72|2|


Note**:** `customerA_latency` is considered a single node because it does not contain a period (".").

If the data you want to extract a node from includes delimiters such as a hyphen ("-") or underscore ("_"), then you can use the `"delimiterDefinition"` parameter.

You can optionally specify your own set of delimiters. 

See the examples below for details.

### Matched Substrings

You can also use a regular expression with `aliasMetric()` to transform an existing source name, metric name, or point tag value.  This approach works as a "search-replace" functionality&mdash;everything that matches `regexSearchPattern` is replaced with `replacementPattern`. For similar examples, see the [aliasSource](ts_aliasSource.html) page.




## Examples

The following example illustrates the zeroBasedNodeIndex approach. More detailed examples are on the [aliasSource](ts_aliasSource.html) page. The examples for `aliasMetric` are similar.

### aliasMetric Using a zeroBasedNodeIndex - Example

In this example, you rename metric(s) with an existing point tag value.

Assume that you have a set of metric names that are very long and clutter your hover legend:

```
<datacenter>.<version>.<customer>_latency.<id>
```

The information you want from the metric name is `<customer>_latency`. `<datacenter>` and `<version>` are sent as optional point tag key values, so you don't need them in the hover legend. `aliasMetric()` lets you rename each metric to declutter your hover legend:

```
aliasMetric(ts("<datacenter>.<version>.<customer>_latency.<id>"), 2)
```

In this case, you are extracting from a metric name, so you don't need to specify `',metric'` before applying the `zeroBasedNodeIndex` value.

<!---### aliasMetric using a Regular Expression - Example

TBD--->
