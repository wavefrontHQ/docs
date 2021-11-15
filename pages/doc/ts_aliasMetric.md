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
aliasMetric(<tsExpression>, "<newMetricName>")

aliasMetric(<tsExpression>, [metric|source|{tagk, <pointTagKey>}],
         <zeroBasedNodeIndex> [, "<delimiterDefinition>"])

aliasMetric(<tsExpression>, [metric|source|{tagk, <pointTagKey>}],
        "<regexSearchPattern>", "<replacementPattern>")
```

Replaces the metric name for each time series with an alias, which can be a specified string or derived from existing metadata.

To replace the source name with an alias, use [aliasSource()](ts_aliasSource.html).


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
<td>Static string value to replace each metric name with. </td>
</tr>
<tr>
<td>metric&vert;source&vert;&#123;tagk,&lt;pointTagKey&gt;&#125;</td>
<td>Type of metadata value to extract a node or substrings from.
<ul>
<li markdown="span">Specify `metric` to construct the new metric name for a time series based on its actual metric name.</li>
<li markdown="span">Specify `source` to construct the new metric name for a time series based on its source name.</li>
<li markdown="span">Specify `tagk, <pointTagKey>` (no curly braces) to construct the new metric name for a time series based on the value of a given point tag.
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

The `aliasMetric()` metadata function lets you replace the metric name of each time series described by `tsExpression` with an alias. The alias can be a specified string or a string that is derived from the metric name, the source name, an existing point tag value, or a combination of these.

Here are some sample scenarios:
* You want to clarify the column headings in a Table chart.
* You want an aggregation function to group by a given parameter that is only found within a metric, source, or point tag value.
* You want to make complex metric names easier for end users to understand.
* You use [derived metrics](derived_metrics.html).

`aliasMetric()` lets you replace metric names with:

* A simple replacement string.
* A replacement string that contains variables.
* A single node that is extracted from the original metric name, the source name, or a point tag value.
* Substrings that are matched by regular expressions from the original metric name, the source name, or a point tag value.

### Simple Replacement String

You can specify a simple replacement string if you want to use the same metric name for all time series described by `tsExpression`.

Suppose you have a metric `ts("customer.user.total")` in your environment that tracks the number of total users of your product by customer. The series associated with this metric includes a customer point tag key to “group by” when applying an aggregate function:  `sum(ts("customer.user.total"),customer)`. If you want to display this information as a column on a Table chart, the current aggregate metric does not display properly. However, you can use `aliasMetric()` to rename the aggregate metric, and to apply a column header of **Total Users**.

```
aliasMetric(sum(ts("customer.user.total"),customer), "Total Users")
```

### Replacement String With Variables

You can specify a replacement string with variables if you want the new metric name for each time series to contain one or more metadata values from that series. You can use any combination of variables and embed them in text. The following variables obtain the actual metric name, the source name, or the value of a specified point tag:

{% raw %}
`"{{metric}}"  "{{source}}"  "{{<pointTagKey}}"`
{% endraw %}

Suppose you have a metric `ts(aws.instance.price)` that has a `region` point tag, and you want to display a chart in which the metric name of each time series consists of the string `Price`, followed by the value of the `region` tag and the source name, separated by slashes. The following function accomplishes this:

{% raw %}
```handlebars
aliasMetric(ts(aws.instance.price), "Price/{{region}}/{{source}}")
```
{% endraw %}

The specified replacement string acts like a template, in which Wavefront replaces each variable with the requested string value. If `ts(aws.instance.price)` describes a time series that has a point tag `region=us-west-2`, that time series is displayed with a metric name like `Price/us-west-2/mycluster-2c-ha2-i-00e421d1bef7fb88e`.


### Single Extracted Node

A common practice is to use naming conventions that provide structure to metric names, source names, or point tag values. Naming conventions typically subdivide  metadata values into nodes, which are substrings that are delimited by certain characters. By default, Wavefront uses periods (".") as node delimiters, but your naming conventions might use other characters.

You can use `aliasMetric()` with a `zeroBasedNodeIndex` to extract a single node from an existing metadata value and use just the extracted node as the metric name for your time series. For example, you might want to simplify a metric name like `pdx.customerA_latency.i49f21a72` by displaying it as `customerA_latency`.

`zeroBasedNodeIndex` specifies the node to extract by counting nodes from left to right, starting with 0. By default, `aliasMetric()` extracts the node from the existing metric name. To extract a node from the source name or a specified point tag value, you must explicitly include `source` or `tagk, <pointTagKey>`.

For example, suppose you use the following naming convention for a metric namespace, and you consider periods (".") to be node delimiters: `<datacenter>.<customerName>_latency.<idNumber>`

Under these conventions, the nodes in the metric name `pdx.customerA_latency.i49f21a72` are numbered as follows:

|**node**|**node number**|
|pdx|0|
|customerA_latency|1|
|i49f21a72|2|

The following query extracts `customerA_latency` from the existing metric name and uses it as the new metric name:
```
aliasMetric(ts(pdx.customerA_latency.i49f21a72), 1)
```

`customerA_latency` is a single node because it does not contain a period ("."), which is the default delimiter. You can specify a nondefault set of delimiters to change how names are divided into nodes. For example, the following query extracts just `customerA` from the existing metric name by redefining the delimiter set to include both periods (".") and underscores ("_"):

```
aliasMetric(ts(pdx.customerA_latency.i49f21a72), 1, "._")
```

### Matched Substrings

You can use `aliasMetric()` with a regular expression `"regexSearchPattern"` to match one or more substrings from an existing metadata value, and then construct the new metric name `"replacementPattern"` from one or more matched substrings. You can combine these substrings with text and [variables](#replacement-string-with-variables).

By default, `aliasMetric()` applies the regular expression to the existing metric name. To apply the regular expression to the source name or to a specified point tag value, you must explicitly include `source` or `tagk, <pointTagKey>`.

For example, assume your metric comes from sources whose names follow the pattern `db-1`, `db-2`, and so on. The following query renames the metric for each time series by combining the numeric part of the source name with the value of the `env` point tag, and prefixing it with the string `connect`:

{% raw %}
```
aliasMetric(ts(~sample.db.connections.*), source, "db-([0-9]*)", "connect-$1-{{env}}")
```
{% endraw %}


## Examples

Here is a summary of the sample `aliasMetric()` queries from the examples in the sections above.

* [Replace metric names with a simple string:](#simple-replacement-string)

  ```
  aliasMetric(sum(ts("customer.user.total"),customer), "Total Users")
  ```

* [Replace the metric name with a string that contains metadata variables:](#replacement-string-with-variables)

  {% raw %}
  ```
  aliasMetric(ts(aws.instance.price), "{{region}}/{{source}}")
  ```
  {% endraw %}

* [Replace the metric name with a single node extracted from it:](#single-extracted-node)

  ```
   aliasMetric(ts(pdx.customerA_latency.i49f21a72), 1)
   aliasMetric(ts(pdx.customerA_latency.i49f21a72), 1, "._")
```

* [Replace the metric name by combining text, a matched substring, and a point tag value:](#matched-substrings)

  {% raw %}
  ```
  aliasMetric(ts(~sample.db.connections.*), source, "db-([0-9]*)", "connect-$1-{{env}}")
  ```
  {% endraw %}


## Learn More!

* For additional examples, see the [aliasSource() Function](ts_aliasSource.html).

* See the KB article [Working with metadata functions - aliasSource, aliasMetric and taggify](https://help.wavefront.com/hc/en-us/articles/360057122452-Working-with-metadata-functions-aliasSource-aliasMetric-and-taggify)

<!--- Need to fix this example

### aliasMetric Using a zeroBasedNodeIndex - Example

In this example, you rename metric(s) to eliminate nodes that contain redundant information.

Assume that you have a set of metric names that are very long and clutter your hover legend:

```
<datacenter>.<version>.<customer>_latency.<id>
```

The information you want from the metric name is `<customer>_latency`. `<datacenter>` and `<version>` are sent as optional point tag key values, so you don't need them in the hover legend. `aliasMetric()` lets you rename each metric to declutter your hover legend:

```
aliasMetric(ts("<datacenter>.<version>.<customer>_latency.<id>"), 2)
```

In this case, you are extracting from a metric name, so you don't need to specify `',metric'` before applying the `zeroBasedNodeIndex` value.
--->

<!---### aliasMetric using a Regular Expression - Example

TBD--->
