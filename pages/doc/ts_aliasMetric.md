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
aliasMetric (<expression>, [metric|source|{tagk, <pointTagKey>}],
         [<zeroBasedNodeIndex> [, "<delimiterDefinition>"])

aliasMetric (<expression>, [metric|source|{tagk, <pointTagKey>}], “<regexSearchPattern>”,
         “<replacementPattern>” | "<replacementString>")

aliasMetric (<expression>, "<newMetricName>")
```


Extract a string from an existing metric name, source name, or point tag value and rename the metric in `expression` with that string. If you don't specify the second parameter (`metric|source|{tagk, <pointTagKey>}`), it defaults to `metric`.

Here are some sample scenarios:
* You want to group by a given parameter that is only found within a metric, source, or point tag value.
* You want to clean up the view of the Tabular View chart columns
* The complexity of your metric name is too much for the end users and you want to make it easier for them to digest what is being captured.
* You use [derived metrics](derived_metrics.html)

## Parameters

<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td>expression</td>
<td>The <code>ts()</code> expression to extract a string from.</td>
</tr>
<tr>
<td>metric&vert;source&vert;&#123;tagk,&lt;pointTagKey&gt;&#125;</td>
<td>The set of data to extract the new metric name from.
<ul>
<li>Use &#123;tagk, &lt;pointTagKey&gt;&#125; if you want to extract a node from an existing point tag value. To use this approach, enter <code>tagk</code> followed by the point tag key. <div>For example, if you have point tag <code>Region=us-west-2b</code>, and you want to replace the existing metric name with the entire point tag value, enter <code>tagk, Region</code> and set <code>zeroBasedNodeIndex</code> to 0.</div></li>
<li>If you don't specify (<code>metric</code>, <code>source</code>, or <code>tagk</code>), this parameter defaults to <code>metric</code>.</li>
</ul>
</td>
</tr>
<tr>
<td>zeroBasedNodeIndex, "delimiterDefinition"</td>
<td>Use these parameters if you want to extract a single node from an existing source name, metric name, or point tag value and use it as the new metric name.
<ul>
<li><code>zeroBasedNodeIndex</code> - Node to extract from the selected source name, metric name, or point tag value. This node is then used as the new metric name. </li>
<li><code>delimiterDefinition</code> - Use this optional parameter to specify a delimiter other than period ("."). For example, to extract <code>total_environment</code> from <code>disk.space-total_environment</code>, set <code>zeroBasedNodeIndex</code> to 2 and <code>"delimiterDefinition"</code> to "-". If no <code>"delimiterDefinition"</code> is specified, then only periods (".") are considered delimiters.</li>
</ul>
</td>
</tr>
<tr>
<td>"regexSearchPattern", "replacementPattern"</td>
<td>Use these parameters if you want to use regular expression search and replacement patterns from an existing source name, metric name, or point tag value as the new metric name.
<ul>
<li><code>"regexSearchPattern"</code> - A regular expression pattern to match against the source name, metric name or point tag value.</li>
<li><code>"replacementPattern"</code> - The replacement string. If capturing groups are used in regexSearchPattern, they can be referred to as $1, $2, etc.</li>
</ul>
</td>
</tr>
<tr>
<td>"newMetricName"</td>
<td>Use this parameter to specify a new static value to use as the new metric name.</td>
</tr>
</tbody>
</table>

## Description

`aliasMetric()` lets you replace one or more existing metric names in a ts() expression with a string extracted from metric name(s), source name(s), or point tag value(s). For example, let's say you have a metric in your environment that tracks the number of total users of your product by customer:

`ts("customer.user.total")`

The series associated with this metric includes a customer point tag key to “group by” when applying an aggregate function.

`sum(ts("customer.user.total"),customer)`

If you want to display this information as a column on a tabular view chart, the current aggregate metric does not display properly. However, you can use `aliasMetric()` to rename the aggregate metric, and to apply a column header of **Total Users**.

You can use the `aliasMetric()` function using the zeroBasedNodeIndex, regular expression replacement, or simple string replacement approach.

### zeroBasedNodeIndex Approach

If you use the zeroBasedNodeIndex approach for `aliasMetric()`, you extract a single node from an existing source name, metric name, or point tag value for the purpose of renaming a metric. Nodes are separated by delimiters such as periods or hyphens. Suppose you have the following naming convention for a metric namespace:

```
<datacenter>.<customerName>_latency.<idNumber>
```

e.g. `pdx.customerA_latency.i49f21a72`

The `aliasMetric()` function assigns a number to each node. The node numbers are associated with the `zeroBasedNodeIndex` parameter. For the example above:

|**node**|**node number**|
|pdx|0|
|customerA_latency|1|
|i49f21a72|2|


By default, Wavefront identifies items separated by a (".") delimiter as nodes. This is why `customerA_latency` is considered a single node.

If the data you want to extract a node from includes delimiters such as a hyphen ("-") or underscore ("_"), then you can use the `"delimiterDefinition"` parameter.

See the examples below for details.

### Regex Approach

You can also use a regular expression with `aliasMetric()` to transform an existing source name, metric name, or point tag value.  This approach works as a "search-replace" functionality&mdash;everything that matches `regexSearchPattern` is replaced with `replacementPattern`. See the examples below for details.


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
