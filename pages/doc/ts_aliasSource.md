---
title: aliasSource Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_aliasSource.html
summary: Reference to the aliasSource() function
---

## Summary

```
aliasSource (<expression>, [metric|source|{tagk, <pointTagKey>},]
            <zeroBasedNodeIndex> [, "<delimiterDefinition>"])

aliasSource (<expression>, [metric|source|{tagk, <pointTagKey>},]
            “<regexSearchPattern>”, "<replacementPattern>")

aliasSource (<expression>, "<newSourceName>")
```

Replace one or more source names in a ts() expression with a string extracted from the metric name(s), source name(s), or point tag value(s).

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
<td>The set of data to extract the new source name from.
<ul>
<li>Use &#123;tagk, &lt;pointTagKey&gt;&#125; if you want to extract a node from an existing point tag value. To use this approach, enter <code>tagk</code> followed by the point tag key. <div>For example, if you have point tag <code>Region=us-west-2b</code>, and you want to replace the existing metric name with the entire point tag value, enter <code>tagk, Region</code> and set <code>zeroBasedNodeIndex</code> to 0.</div></li>
<li>If you don't specify (<code>metric</code>, <code>source</code>, or <code>tagk</code>), this parameter defaults to <code>source</code>.</li>
</ul>
</td>
</tr>
<tr>
<td>zeroBasedNodeIndex, "delimiterDefinition"</td>
<td>Use these parameters if you want to extract a single node from an existing source name, metric name, or point tag value and use it as the new source name.
<ul>
<li><code>zeroBasedNodeIndex</code> - Node to extract from the selected source name, metric name, or point tag value. This node is then used as the new source name. </li>
<li><code>delimiterDefinition</code> - Use this optional parameter to specify a delimiter other than period ("."). For example, to extract <code>total_environment</code> from <code>disk.space-total_environment</code>, set <code>zeroBasedNodeIndex</code> to 2 and <code>"delimiterDefinition"</code> to "-". If no <code>"delimiterDefinition"</code> is specified, then only periods (".") are considered delimiters.</li>
</ul>
</td>
</tr>
<tr>
<td>"regexSearchPattern", "replacementPattern"</td>
<td>Use these parameters if you want to use regular expression search and replacement patterns from an existing source name, metric name, or point tag value as the new source name.
<ul>
<li><code>"regexSearchPattern"</code> - A regular expression pattern to match against the source name, metric name or point tag value.</li>
<li><code>"replacementPattern"</code> - The replacement string. If capturing groups are used in regexSearchPattern, they can be referred to as $1, $2, etc.</li>
</ul>
</td>
</tr>
<tr>
<td>"newSourceName"</td>
<td>Use this parameter to specify a new static value to use as the new source name. If more than 1 source is part of <code>expression</code>, a new synthetic point tag named <code>_discriminant</code> will be included in the results to separate each original source.
</td>
</tr>
</tbody>
</table>

## Description

`aliasSource()` lets you replace one or more existing source names in a ts() expression with a string extracted from the metric name(s), source name(s), or point tag value(s).  For example, let's say you have a set of metrics that includes the customer name:

```
cpu.loadavg-customerA.1m
cpu.loadavg-customerB.1m
cpu.loadavg-customerA.5m
cpu.loadavg-customerB.5m
```

The set of metrics is being reported by 1 source (e.g. `source1`) -- what if you wanted to aggregate the data and group by customer? You could create two separate ts() expressions, or you could instead use `aliasSource()` to update the `<source1>` name to `customerA` or `customerB`. You could then group by source and get the answer you need from a single expression.

Starting with release 2018.22, source names are converted to lowercase to maintain consistent behavior for series matching. When you use `aliasSource()` with a static string (e.g. `aliasSource(ts(<metric.name>), "Source.Test")`, source names retain their original case. 

The `aliasSource()` function supports several ways of replacing source names in a ts() expression: zeroBasedNodeIndex, regular expression replacement, simple string replacement.

### zeroBasedNodeIndex Approach

When you use the zeroBasedNodeIndex approach for `aliasSource()`, you extract a single node from an existing source name, metric name, or point tag value and use that node to rename a source.

Nodes in existing source name(s), metric name(s), or point tag value(s) are separated by delimiters. For example, let's say that you have the following metric name:

```
disk.space.total.environment
```

In the metric name above, each node is assigned a number:

|**node**|**node number**
|disk | 0 |
|space | 1 |
|total | 2 |
|environment | 3 |

The node numbers can be associated with the `zeroBasedNodeIndex` parameter.

By default, Wavefront identifies each node separated by a (".") delimiter. If the metric name is:

```
disk.space-total_environment
```

Then each node is assigned the following number:

```
disk = 0
space-total_environment = 1
```

If the data you want to extract a node from include delimiters such as a hyphen ("-") or underscore ("_"), then you can use the `"delimiterDefinition"` parameter to identify those delimiters.

See the examples below for details.

### Regex Approach

You can also use a regular expression with `aliasSource()` to transform an existing source name, metric name, or point tag value.  This approach works as a "search-replace" functionality&mdash;everything that matches `regexSearchPattern` is replaced with `replacementPattern`. See the examples below for details.


## Examples

The following examples show how to use aliasSource with a zeroBasedNodeIndex.

### zeroBasedNodeIndex Example 1 - Renaming source(s) with an existing source name node

Assume that your base expression `ts("requests.failures.num")` has 40 unique sources sending data. Those 40 unique sources are named `app-1`, `app-2`, `app-3`...`app-40`.

![aliasSource_zeroBased_example1](images/aliasSource_zeroBased_example1.png)

In this example, you'd like to ignore the `app` reference in the existing source name, and display only the number as the source name. You can do that with the following expression:

```
aliasSource(ts("requests.failures.num"),1,"-")
```

![aliasSource_zeroBased_example1](images/aliasSource_zeroBased_example2.png)

* You don't need to specify a source parameter because you are extracting a node from an existing source name and the default is source.
* The `"delimiterDefinition"` parameter specifies hyphen (-) as a delimiter because this source name uses hyphens ("-") as delimiters.
* The zeroBasedNodeIndex of 1 extracts only the number and drops the string. The pattern is `app-<number>`, that is, `app = 0` and `<number> = 1`.

### zeroBasedNodeIndex Example 2 - Renaming Source(s) with a Metric Name

This example assumes 1 physical server running 8 virtual machines. Each virtual machine is sending stats into Wavefront.  The source name is the physical server. The unique virtual machine name is only in the metric name:

```
ts(disk.space.total.vm1)
source=phyServ
```

To see the virtual machine name instead of the physical server name as the source name, you can use `aliasSource`:

```
aliasSource(ts(disk.space.total.*),metric, 3)
```

* You set the second parameter to `metric` because you want to extract the string from the metric name.
* You don't have to specify a delimiterDefinition because the metric name uses only periods as delimiters.
* You set `zeroBasedNodeIndex` to 3 because the VM name has that index in `disk.space.total.vm1`.

This approach replaces `phyServ` with vm1, vm2, vm3, etc. for each unique metric.


### zeroBasedNodeIndex Example 3 - Renaming Source(s) with a Point Tag Value

Assume that you have 5 unique servers (server1, server2, server3, etc.) that run multiple applications. A set of general metrics such as `application.latency`, applies to all applications. You apply an `application` point tag to the data format to determine the associated application for each source on a chart. The format of the `application` point tag is:

```
application=<company>.id-<value>_<appName>
```

For this use case, you'd like to replace the existing source names (server1, server2, server3, etc.) with the id value and application name. You use the following expression:

```
aliasSource(ts("application.latency"), tagk, application, 2, ".-")
```

In the example above:
* You want to extract a new source name from an existing point tag value associated with the application point tag key, so you enter `tagk, application` as the source option parameter.
* You want the new source name to be `<value>_<appName>`, so you specify period and hyphen as the `"delimiterDefinition"`. You do not specify underscore ("\_") as a delimiter. If you were to do that, then the zeroBasedNodeIndex approach would no longer extract both the `<value>` and `<appName>` from the existing point tag value(s).
* You set `zeroBasedNodeIndex` to 2. The `delimiterDefinition` choices -- both hyphen and period -- set `<company>` to 0, `id` to 1, and `<value>_<appName>` to 2.


The following set of examples uses the same scenarios as the zeroBasedNodeIndex examples, but uses the regular expression approach.

### RegEx Example 1 - Renaming Source(s) with an Existing Source Name

For this example, you replace the `zeroBasedNodeIndex` in the example above with a regular expression:

```
aliasSource(ts(requests.failures.num), "app-([0-9]*)", "$1")
```

* `"regularExpression"` is set to  `"app-([0-9]*)"`, so you capture everything after the `app-` substring that is a number and put that into capture group 1.
* You can then refer to that capture group as `$1` in the `captureGroupBackReference`.

### RegEx Example 2 - Renaming Source(s) with a Metric Name

The syntax for implementing Example 2 using a regular expression is:

```
aliasSource(ts(disk.space.total.*), metric, "disk.([a-z-0-9]*)..*", "$1")
```

### RegEx Example 3 - Renaming Source(s) with a Point Tag Value

The syntax for implementing Example 3 using a regular expression is:

```
aliasSource(ts("application.latency"), tagk, application, ".*.id-(.*)", "$1")
```

### RegEx Example 4 - Renaming Source(s) with a Source Name

The following example uses `aliasSource()` with a regular expression. For this example, using the regular expression is more straightforward.

Assume you have sources that look like this: `accounts.<company_name>.<group name><numeric value>`

You want to set the source to `<company_name>.<group name>` (i.e., leave off `<numeric value>`)

This table shows the current source and desired source names:


| Current Source | Desired Source
| -
| accounts.foo.bar1 | foo.bar |
| accounts.baz.bar7 | baz.bar |

You can easily do this with `aliasSource()`:

```
aliasSource(ts(requests.failures.num), "accounts.([a-zA-Z.]*)[0-9]*$", "$1")
```
