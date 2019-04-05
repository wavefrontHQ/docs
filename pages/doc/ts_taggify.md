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
taggify (<expression>, metric|source|{tagk, <pointTagKey>}, <newPointTagKey>,
         [<zeroBasedNodeIndex> [,"<delimiterDefinition>"])

taggify (<expression>, metric|source|{tagk, <pointTagKey>}, <newPointTagKey>,
		 “<regexSearchPattern>”, “<replacementPattern>”)

taggify (<expression>, <newPointTagKey>, "<newPointTagValue>")
```

Lets you extract a string from an existing metric name, source name, or point tag value and create a synthetic point tag key value for that query.

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
<td>The set of data to extract the new metric name from. Use &#123;tagk, &lt;pointTagKey&gt;&#125; if you want to extract a node from an existing point tag value. To use this approach, enter <code>tagk</code> followed by the point tag key. For example, if you have point tag <code>Region=us-west-2b</code>, and you want to replace the existing metric name with the entire point tag value, enter <code>tagk, Region</code> and set <code>zeroBasedNodeIndex</code> to 0.
</td>
</tr>
<tr>
<td>newPointTagKey</td>
<td>Key that will be used for the new synthetic point tag.</td>
</tr>
<tr>
<td>zeroBasedNodeIndex, "delimiterDefinition"</td>
<td>Use these parameters if you want to extract a single node from an existing source name, metric name, or point tag value and use it as the new point tag value.
<ul>
<li><code>zeroBasedNodeIndex</code> - Node to extract from the selected source name, metric name, or point tag value. This node is then used as the new point tag value. </li>
<li><code>delimiterDefinition</code> - Use this optional parameter to specify a delimiter other than period ("."). For example, to extract <code>total_environment</code> from <code>disk.space-total_environment</code>, set <code>zeroBasedNodeIndex</code> to 2 and <code>"delimiterDefinition"</code> to "-". If no <code>"delimiterDefinition"</code> is specified, then only periods (".") are considered delimiters.</li>
</ul>
</td>
</tr>
<tr>
<td>"regexSearchPattern", "replacementPattern"</td>
<td>Use these parameters if you want to use regular expression search and replacement patterns from an existing source name, metric name, or point tag value as the new point tag value.
<ul>
<li><code>"regexSearchPattern"</code> - A regular expression pattern to match against the source name, metric name or point tag value.</li>
<li><code>"replacementPattern"</code> - The replacement string. If capturing groups are used in regexSearchPattern, they can be referred to as $1, $2, etc.</li>
</ul>
</td>
</tr>
<tr>
<td>"newPointTagValue"</td>
<td>Use this parameter to specify a new static value to use as the new point tag value.</td>
</tr>
</tbody>
</table>

## Description

`taggify()` lets you extract a string from an existing metric name, source name, or point tag value and create a synthetic point tag key value for that query.

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

You can use `taggify()` with a zeroBasedNodeIndex syntax. If that syntax doesn't solve your use case, use the regex syntax.

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
