---
title: Metadata Functions
keywords: query language
tags: [query language]
sidebar: doc_sidebar
permalink: query_language_metadata_functions.html
summary: Learn how to use metadata functions  to rename metrics and sources and create point tags.
---

Metadata functions like `aliasSource`, `aliasMetric`, and `taggify` enable users to temporarily rename a source, a metric or create a synthetic point tag for display purposes in charts or dashboards.

This page uses vphere sample metrics to demonstrate how you can change a table column heading and the text in the column. In the screenshots, you might see a metric like `vsphere.host.cpu.used.summation`. The same principles apply for other data and other chart types.


## Overview

All three metadata functions support these options:

* To specify a string,
* To use a numeric zeroBasedNodeIndex
* To use a regex search/replace pattern.

## Parameters

The functions have the following parameters.
```
aliasSource(<tsExpression>, [metric|source|{tagk,<pointTagKey>},]zeroBasedNodeIndex[, "delimiterDefinition"] |"regexSearchPattern", "replacementPattern" |"replacementString")


aliasMetric(<tsExpression>, [metric|source|{tagk,<pointTagKey>},]zeroBasedNodeIndex[, "delimiterDefinition"] |"regexSearchPattern", "replacementPattern" |"replacementString")

taggify(<tsExpression>, metric|source|{tagk,<pointTagKey>}, <newPointTagKey>, zeroBasedNodeIndex[, "delimiterDefinition"] | "regexSearchPattern", "replacementPattern" | "replacementString")
```

## String Replacement Examples

**aliasSource String Replacement**

To change the displayed **source** name to a different name use this syntax:
```
aliasSource(<tsExpression>, "replacementString")
```

For example, you can rename a source from `esxi-11` to `esxi-11-to-be-decommissioned` with:

```
aliasSource(ts("vsphere.host.cpu.used.summation", source="esxi-11"),"esxi-11-to-be-decommissioned")
```

![Output has table header esxi-11-to-be-decommissioned](images/aliasSource.jpeg)

**aliasMetric String Replacement**

To change the displayed **metric** name to a different name, use this syntax:


`aliasMetric(<tsExpression>, "replacementString")`


For example, you can rename a metric from `vsphere.host.cpu.used.summation` to `vsphere-esxi-cpu-used-summation` with:


`aliasMetric(ts("vsphere.host.cpu.used.summation"),"vsphere-esxi-cpu-used-summation")`

![Output has table header vsphere-esxi-cpu-used-summation](images/aliasMetric.jpeg)

**taggify String Replacement**

To add a displayed **point tag** using `taggify`,use this syntax:


`taggify(<expression>, <newPointTagKey>, "<newPointTagValue>")`

For example, you can add a point tag `Physical location`, `Site B` with:

`taggify("vsphere.host.cpu.used.summation" and source="esxi-11", "Physical location", "Site B")`

![Output has table column header Physical location and column values Site B](images/taggify-site.jpeg)


## String Replacement with Variables Examples

You can specify a replacement string using variables from the time series to contain one or more metadata values from that series.

**aliasSource and Variables**

The following example uses **aliasSource** to alter the source  to include the value of the specified point tag for physical location. Here a variable `${A}` is set to `taggify("vsphere.host.cpu.used.summation" and source="esxi-11", "Physical location", "Site B")`.

The table column header becomes `esxi-11-to-be-decomissioned-site-B` with this query:

{% raw %}
```handlebars
aliasSource(${A},"{{source}}-{{Physical location}}")
```
{% endraw %}

![table column header is esxi-11-to-be-decomissioned-site-B, the location for this example](images/esxi-source-pointtag.jpeg)

**aliasMetric and Variables**

The following example uses **aliasMetric** to change the metric name to the value of the specified point tag for physical location. Here a variable `${A}` is set to `taggify("vsphere.host.cpu.used.summation" and source="esxi-11", "Physical location", "Site B")`.

The table column header includes the physical location with this query:

{% raw %}
```handlebars
aliasMetric(${A},"vsphere.host.cpu.used.summation-{{Physical location}}")
```
{% endraw %}

![table column header shows the location](images/metric-variable.jpeg)

**taggify and Variables**

The following example uses `taggify` to add a new point tag. The example uses an existing point tag in combination with the source, for source and physical location. The variable is set to `taggify("vsphere.host.cpu.used.summation" and source="esxi-11", "Physical location", "Site B"))`.

The table column header shows `Host/Site` and the column itself combines the source with the physical location.

{% raw %}
```handlebars
taggify(${A},"Host/Site","{{source}}/{{Physical location}}")
```
{% endraw %}

![table column header and column are updated by taggify](images/host-site.jpeg)

## Examples that Use zeroBasedNodeIndex

When using any of the metadata function, you can extract a single element (node) from an existing source name, metric name, or point tag value and use the element as a new value.

Nodes are indexed from left to right, starting with 0. A delimiter (".") separates the nodes. For example:
* Sample metric: `vsphere.host.cpu.used.summation`
* Node 0: `vsphere`
* Node 2: `cpu`
* Node 3: `used`
* Node 4: `summation`

**Source Name Replacement with zeroBasedNodeIndex**

To change the displayed **source name** to a different name, use `zeroBasedNodeIndex` in this syntax of `aliasSource`:

```
aliasSource(<tsExpression>, [metric|source|{tagk, <pointTagKey>},] <zeroBasedNodeIndex> [, "<delimiterDefinition>"]) is used.
```

For example, you can rename a source from `version.7.esxi101` to `esxi101`.
* The delimiter is a period.
* We use the index 2 to use the 3rd node from the left.
```
aliasSource(ts("vsphere.host.cpu.used.summation", source="version.7.esxi101"), 2).
```

![table shows `esxi101`](images/version-7-esxi.jpeg)


If the delimiter is not a period, you can include the delimiter definition in the query. For example, assume the source uses hyphens (`version-7-esxi101`). You use the following query to rename the source:
```
aliasSource(ts("vsphere.host.cpu.used.summation", source="version-7-esxi101"), 2,"-").
```
![table shows `esxi101`](images/version7-delim.jpeg)


You can use elements of the metric name to rename the source. For example, Assume the metric name is `vsphere-version7-esxi150-cpu-used` and you want to rename the source to the third element in the metric name `esxi150`. You can use this query:
```
aliasSource("vsphere-version7-esxi150-cpu-used"),metric, 2,"-").
```
![table chart shows `esxi101`](images/aliasSourceMetricName.jpeg)

You can use elements of a point tag to rename the source name from a point tag specify the point tag with `tagK` and the point tag name. For example
* The point tag `hostname` has a value `esxi1750.vmware.com`
* You want to rename the source to `esxi1750` using zeroBasedNodeIndex.
Use this query (where node 0 is esxi1750):
```
aliasSource(ts("vsphere.host.cpu.used.summation",tagK,hostname,0)
```
![table chart shows `esxi1750`](images/aliasSourcePointtag.jpeg)

If the query references a node that doesn't exist, an error results. For example, assume the following query:
```
aliasSource(ts("vsphere.host.cpu.used.summation",tagK,hostname,5)
```
Because the source only has 5 element and index 5 goes to element 6, the following error message results:
```
globalFilter() removed all query keys
Cannot access node: 5 from source value: vsphere.host.cpu.used.summation
```

## Regex Search and Replace Pattern Examples

Regex patterns in `aliasSource`, `aliasMetric`, and `taggify` work perform a search and replace. If there is no match during the search, there is nothing to replace, so the original displayed values remain.

**Replace Source Name with Regex (aliasSource)**

You can change source name displayed in charts to an alternative name using a search and replace regex. Use this syntax:
```
aliasSource(<tsExpression>, [metric|source|{tagk,<pointTagKey>},"regexSearchPattern", "replacementPattern" )
```

For example, assume you want to:
* Rename all the sources beginning with "perf18" to "Performance-Machine-#"
* Capture everything after the perf18 that is a number and put that into the capture group.

The replacement pattern can us a variable, `$1` in this example, to append the number to  `"Performance-Machine"` as in this example:
```
aliasSource(ts("vsphere.vm.cpu.usagemhz.average",source=perf18*), "perf([0-9]*)", "Performance-Machine-$1")
```

![table chart shows performance-machine-18-acct-1 and performance-machine-18-acct-2](images/vm-perf.jpeg)

**Replace Metric Name with Regex (aliasMetric)**

You can change the displayed metric name to a differen name using a search/replace regex. Use this syntax:

```
aliasMetric(<tsExpression>, [metric|source|{tagk,<pointTagKey>},"regexSearchPattern", "replacementPattern")
```

For example, assume you want to rename the metric `CPU-Used-VM-11-verylongmetricname` to `CPU-Used-VM-11` The following regex:
* Searches/captures the 1st 14 characters of the metric.
* Uses those 14 characters in the replacement metric.
In this example, `${Original metric}` is `ts("CPU-Used-VM-11-verylongmetricname")`.
```
aliasMetric(${Original metric},"(.{0,14}).*", "$1")
```
![table chart with long metric name and CP-used-vm-11 below that](images/vm-longmetricname.jpeg)



**Replace Point Tag Name with Regex (taggify)**

You can change the displayed point tags `taggify` and a search and replace regex. Use this syntax:
```
taggify(<tsExpression>, [metric|source|{tagk,<pointTagKey>},"regexSearchPattern", "replacementPattern" )
```

For example, to search and replace the values for point tag `clustername`, from `Test-cluster` to `Test_cluster`, use the expression:

```
taggify(${A}, tagk, clustername, clustername, "-", "_") ,
```

In this example, variable `${A` is `ts("vsphere.host.cpu.used.summation` and `source="esxi-150"`. The `taggify` search/replace operated on the point tag `clustername` and the result is test-cluster and test_cluster.

![table chart with clusternames test-cluster and the revised test_cluster](images/clustername.jpeg)


You can also use the search/replace on a point tag and create a new point tag from the results, for example to create a new point tag called "clustertype" using point tag values found in "clustername", like this:

```
taggify(${B}, tagk, clustername, clustertype, "(.{0,4}).*", "$1"),
```

Here, variable `${B}` is `taggify(${A}, tagk, clustername, clustername, "-", "_")`.

![table chart with clustertype Test](images/clustertype.jpeg)

## Nesting Metadata Functions

Metadata functions (`aliasSource`, `aliasMetric`, and `taggify`) can be nested to provide flexible manipulation of the content displayed on screen in the charts and dashboards.

{% include tip.html content="Build queries one at a time until your chart shows what you want to show."%}

For example, consider the metric `~sample.cpu.usage.user.percentage`, which has sources `db-[0-9]` and `app[0-9]`. Assume you want to do this:
* Alter the displayed sources so that they display as `app-x-production`, `db-x-dev` etc
* Show the metric name as `CPU.Usage.Production.User.Percentage` along with some additional point tags like build version:11.3
* Abbreviate `env` point tag

You can use the following sequence of queries.

* A: `aliasSource(ts(~sample.cpu.usage.user.percentage), "app-([0-9]*)", "app$1-{{env}}")`

* B: `aliasSource(${A}, "db-([0-9]*)", "db$1-{{env}}")`

* C: `aliasMetric(${B},"CPU.Usage.Production.User.Percentage")`

* D: `taggify(${C},"Build Version", "11.3")`

* E: `taggify(${D},tagK,env,env,"(.{0,4}).*", "$1")`

Here's what gets done:

* Expression A converts the source names for application machines, `app-[0-9]` to `app-[0-9]-dev`, `app-[0-9]-production` etc.

* Expression B converts the source names for the db machines, `db-[0-9]` to `db-[0-9]-dev`, `db-[0-9]-production` etc.

* Expression C converts the metric name `~sample.cpu.usage.user.percentage` to `CPU.Usage.Production.User.Percentage`.

* Expression D adds a `Build Version` point tag (value 11.3)

* Expression E shortens the `env` point tag to max 4 characters.

![Screenshot shows results of each query in a table chart](images/nested.jpeg)
