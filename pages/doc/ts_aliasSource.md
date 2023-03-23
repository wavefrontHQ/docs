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
aliasSource(<tsExpression>, "<newSourceName>")

aliasSource(<tsExpression>, [metric|source|{tagk, <pointTagKey>},]
            <zeroBasedNodeIndex> [, "<delimiterDefinition>"])

aliasSource(<tsExpression>, [metric|source|{tagk, <pointTagKey>},]
            “<regexSearchPattern>”, "<replacementPattern>")
```

Replaces the source name for each time series with an alias, which can be a specified string or derived from existing metadata.

To replace the metric name with an alias, use [aliasMetric()](ts_aliasMetric.html).

## Parameters

<table>
<tbody>
<thead>
<tr><th width="35%">Parameter</th><th width="65%">Description</th></tr>
</thead>
<tr>
<td>tsExpression</td>
<td>Expression that describes the time series to be given new source names.</td>
</tr>
<tr>
<td>"newSourceName"</td>
<td>Static string value to replace each source name with. If <code>tsExpression</code> describes multiple time series, a new synthetic point tag named <code>_discriminant</code> will be included in the results to separate each original source.
</td>
</tr>
<tr>
<td>metric&vert;source&vert;&#123;tagk,&lt;pointTagKey&gt;&#125;</td>
<td>Type of metadata value to extract a node or substrings from.
<ul>
<li markdown="span">Specify `metric` to construct the new source name for a time series based on its metric name.</li>
<li markdown="span">Specify `source` to construct the new source name for a time series based on its original source name.</li>
<li markdown="span">Specify `tagk, <pointTagKey>` (no curly braces) to construct the new source name for a time series based on the value of a given point tag.
</li>
</ul>
Omitting this parameter is the same as specifying <code>source</code>.
</td>
</tr>

<tr>
<td>zeroBasedNodeIndex, "delimiterDefinition"</td>
<td>Replace the source name for a time series with a single node that is extracted from the source name, metric name, or point tag value. Nodes are delimited by periods ("."), unless you define a different set of delimiters.
<ul>
<li><code>zeroBasedNodeIndex</code> - Index number that identifies the node to be extracted from the metadata value. Nodes are indexed from left to right, starting with 0.  </li>
<li><code>delimiterDefinition</code> - One or more characters to use as node delimiters. Omitting this parameter is the same as specifying <code>"."</code> <br> For example, specify <code>".-_"</code> to subdivide <code>disk.space-total_environment</code> into 4 nodes (numbered 0-3).  </li>
</ul>
</td>
</tr>

<tr>
<td>"regexSearchPattern", "replacementPattern"</td>
<td>Construct the new source name for a time series from substrings that are extracted from the source name, metric name, or a point tag value.
<ul>
<li><code>"regexSearchPattern"</code> - A regular expression pattern to match against the metadata value.</li>
<li><code>"replacementPattern"</code> - String to use as the new source name. Use <code>$1</code>, <code>$2</code>, etc., to refer to successive capturing groups of text that are matched by the <code>regexSearchPattern</code>.</li>
</ul>
</td>
</tr>

</tbody>
</table>

## Description

The `aliasSource()` metadata function lets you replace the source name of each time series described by `tsExpression` with an alias. The alias can be a specified string or a string that is derived from the metric name, the source name, an existing point tag value, or a combination of these.


For example, let's say you have a set of metrics that includes the customer name, for example, `cpu.loadavg-customerA.1m`, `cpu.loadavg-customerB.5m`, and so on. All of these metrics are reported by a source named `source1`.
What if you wanted to aggregate the data and group by customer? You could create two separate ts() expressions, or you could instead use `aliasSource()` to replace `source1` with a name like `customerA` or `customerB`. You could then group by source and get the answer you need from a single expression.


`aliasSource()` lets you replace source names with:

* A simple replacement string.
* A replacement string that contains variables.
* A single node that is extracted from the metric name, the original source name, or a point tag value.
* Substrings that are matched by regular expressions from the metric name, the original source name, or a point tag value.

### Simple Replacement String

You can specify a simple replacement string if you want to use the same source name for all time series described by `tsExpression`.

```
aliasSource(ts("sample.db.connections.*"), "Source.Test")
```

**Note:** Starting with release 2018.22, source names are converted to lowercase to maintain consistent behavior for series matching. When you use `aliasSource()` with a static string, source names retain the case you specify.

### Replacement String With Variables

You can specify a replacement string with variables if you want the new source name for each time series to contain one or more metadata values from that series. You can use any combination of variables and embed them in text. The following variables obtain the metric name, the original source name, or the value of a specified point tag:

{% raw %}
`"{{metric}}"  "{{source}}"  "{{<pointTagKey>}}"`
{% endraw %}

Suppose you have a metric that has a `region` point tag, and you want to display a chart in which the source of each time series consists of the string `Price`, followed by the value of the `region` tag and the source name, separated by slashes. The following function accomplishes this:

{% raw %}
```handlebars
aliasSource(ts(aws.instance.price), "Price/{{region}}/{{source}}")
```
{% endraw %}

The specified replacement string acts like a template, in which VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) replaces each variable with the requested string value. If a time series has a point tag `region=us-west-2`, that time series is displayed with a source name like `Price/us-west-2/mycluster-2c-ha2-i-00e421d1bef7fb88e`.

### Single Extracted Node

A common practice is to use naming conventions that provide structure to metric names, source names, or point tag values. Naming conventions typically subdivide  metadata values into nodes, which are substrings that are delimited by certain characters. By default, Operations for Applications uses periods (".") as node delimiters, but your naming conventions might use other characters.

You can use `aliasSource()` with a `zeroBasedNodeIndex` to extract a single node from an existing metadata value and use just the extracted node as the metric name for your time series. For example, you might want to simplify a source name like `dev.host1_appA.0fd795b1700` by displaying it as `host1_appA`.

`zeroBasedNodeIndex` specifies the node to extract by counting nodes from left to right, starting with 0. By default, `aliasSource()` extracts the node from the original source name. To extract a node from the metric name or a specified point tag value, you must explicitly include `metric` or `tagk, <pointTagKey>`.

For example, suppose you use the following naming convention for a source namespace, and you consider periods (".") to be node delimiters: `<environment>.<hostN>_<appN>.<idNumber>`

Under these conventions, the nodes in the source name `dev.host1_appA.0fd795b1700` are numbered as follows:

|**node**|**node number**|
|dev|0|
|host1_appA|1|
|0fd795b1700|2|

The following query extracts `host1_appA` from the original source name and uses it as the new source name:
```
aliasSource(ts(disk.space.total.environment), 1)
```

`host1_appA` is a single node because it does not contain a period ("."), which is the default delimiter. You can specify a nondefault set of delimiters to change how names are divided into nodes. For example, if you redefine the delimiter set to include both periods (".") and underscores ("_"), then `appA` becomes node 2. The following query extracts just `appA` from the existing source name and uses it as the new source name:

```
aliasSource(ts(disk.space.total.environment), 2, "._")
```


### Matched Substrings

You can use `aliasSource()` with a regular expression `"regexSearchPattern"` to match one or more substrings from an existing metadata value, and then construct the new metric name `"replacementPattern"` from one or more matched substrings. You can combine these substrings with text and [variables](#replacement-string-with-variables).

By default, `aliasSource()` applies the regular expression to the original source name. To apply the regular expression to the metric name or to a specified point tag value, you must explicitly include `metric` or `tagk, <pointTagKey>`.

For example, assume your source names follow the pattern `db-1`, `db-2`, and so on. The following query renames the source for each time series by combining the numeric part of the original source name with the value of the `env` point tag and prefixes it with the the string `src`:

{% raw %}
```
aliasSource(ts(~sample.db.connections.*), "db-([0-9]*)", "src$1-{{env}}")
```
{% endraw %}



## Examples

The following examples show how to use aliasSource with a zeroBasedNodeIndex.

### Extracted Node Example 1 - Renaming source(s) with an existing source name node

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

### Extracted Node Example 2 - Renaming Source(s) with a Metric Name

This example assumes 1 physical server running 8 virtual machines. Each virtual machine is sending stats into Operations for Applications.  The source name is the physical server. The unique virtual machine name is only in the metric name:

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


### Extracted Node Example 3 - Renaming Source(s) with a Point Tag Value

Assume that you have 5 unique servers (server1, server2, server3, etc.) that run multiple applications. A set of general metrics such as `application.latency`, applies to all applications. You apply an `appId` point tag to the data format to determine the associated application for each source on a chart. The format of the `appId` point tag is:

```
appId=<company>.id-<value>_<appName>
```

For this use case, you'd like to replace the existing source names (server1, server2, server3, etc.) with the numeric `id-` value and the application name. You use the following expression:

```
aliasSource(ts("application.latency"), tagk, appId, 2, ".-")
```

In the example above:
* You want to extract a new source name from an existing point tag value associated with the `appId` point tag key, so you enter `tagk, appId` as the source option parameter.
* You want the new source name to be `<value>_<appName>`, so you specify period and hyphen as the `"delimiterDefinition"`. You do not specify underscore ("\_") as a delimiter. If you were to do that, then the zeroBasedNodeIndex approach would no longer extract both the `<value>` and `<appName>` from the existing point tag value(s).
* You set `zeroBasedNodeIndex` to 2. The `delimiterDefinition` choices -- both hyphen and period -- set `<company>` to 0, `id` to 1, and `<value>_<appName>` to 2.


The following set of examples uses the same scenarios as the zeroBasedNodeIndex examples, but uses the regular expression approach.

### RegEx Example 1 - Renaming Source(s) with an Existing Source Name

For this example, you replace the `zeroBasedNodeIndex` in the example above with a regular expression:

```
aliasSource(ts(requests.failures.num), "app-([0-9]*)", "$1")
```

* `"regularExpression"` is set to  `"app-([0-9]*)"`, so you capture everything after the `app-` substring that is a number and put that into capture group 1.
* You can then refer to that capture group as `$1` in the `replacementPattern`.

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


## Learn More!

* For an in-depth exploration with examples, see [Metadata (Label Manipulation) Functions](query_language_metadata_functions.html)
