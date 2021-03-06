---
title: Metadata Functions
keywords: query language
tags: [query language]
sidebar: doc_sidebar
published: false
permalink: query_language_metadata_functions.html
summary: Learn how to use metadata functions in Wavefront Query Language expressions to rename metrics and sources and create point tags.
---

Metadata functions allow you to extract information from an existing set of data, to rename a metric or source, or create a new synthetic point tag. We support 3 metadata functions: `aliasSource()`, `aliasMetric()`, and `taggify()`. This pages gives an in-depth explanation of each function and examples.

## The aliasSource() Function

`aliasSource()` lets you replace one or more existing source names in a ts() expression with a string extracted from the metric name(s), source name(s), or point tag value(s).  For example, let's say you have a set of metrics that includes the customer name:

```
cpu.loadavg-customerA.1m
cpu.loadavg-customerB.1m
cpu.loadavg-customerA.5m
cpu.loadavg-customerB.5m
```

The data for this set of metrics is being reported by 1 source (e.g. `source1`). The data is present, but what if you wanted to aggregate the data and group by customer? You could create two separate ts() expressions, or you could use `aliasSource()` to update the `<source1>` name to `customerA` or `customerB`. You could then group by source and get the answer you need from a single expression.

The `aliasSource()` function supports 3 ways of replacing source names in a ts() expression: zeroBasedNodeIndex, regular expression replacement, simple string replacement.

### zeroBasedNodeIndex Approach

When you use the zeroBasedNodeIndex approach for `aliasSource()`, you extract a single node from an existing source name, metric name, or point tag value for the purpose of renaming a source. Nodes in existing source name(s), metric name(s), or point tag value(s) are separated by delimiters. For example, let's say that you have the following metric name:

```
disk.space.total.environment
```

In the metric name above, each node is assigned a number:

```
disk = 0
space = 1
total = 2
environment = 3
```

The numbers listed above would be associated with the `zeroBasedNodeIndex` parameter. By default, Wavefront identifies each node separated by a (".") delimiter. So if the above metric name was:

```
disk.space-total_environment
```

Then each node would be assigned the following number:

```
disk = 0
space-total_environment = 1
```

If the data you want to extract a node from include delimiters such as a hyphen ("-") or underscore ("_"), then you can use the `"delimiterDefinition"` parameter to identify those as delimiters.

The syntax for `aliasSource()` using the zeroBasedNodeIndex approach is:

```
aliasSource(expression, [metric|source|{tagk, <pointTagKey>},] zeroBasedNodeIndex [, "delimiterDefinition"])`
```

- `expression` - The ts() expression to extract a piece of information from.
- `metric|source|{tagk, <pointTagKey>}` - The set of data to extract a node from for the purpose of renaming one or more sources. Use `{tagk, pointTagKey}` if you want to extract a node from an existing point tag value. To use this approach, enter `tagk` followed by the particular `<pointTagKey>` associated with the point tag value. For example, if you have point tag `Region=us-west-2b`, and you want to replace the existing source name with the entire point tag value, then you would enter `tagk, Region` and set the `zeroBasedNodeIndex` to 0. If (`metric`, `source`, `tagk`) is not explicitly entered, then the option is set to `source` by default.
- `zeroBasedNodeIndex` - The node to extract from the source option and use to rename one or more source(s). You must specify this parameter regardless of what you specify in the first option.
- `"delimiterDefinition"` - Use this optional parameter to specify a delimiter other than period ("."). For example, if you want to extract `total_environment` from `disk.space-total_environment`, then set `zeroBasedNodeIndex` to 2 and `"delimiterDefinition"` to ".-". If no `"delimiterDefinition"` is specified, then only periods (".") are considered delimiters.

#### zeroBasedNodeIndex Examples

##### Example 1 - Renaming source(s) with an existing source name node

Base expression `ts("requests.failures.num")` has 40 unique sources sending data. Those 40 unique sources are named `app-1`, `app-2`, `app-3`...`app-40`.

![aliasSource_zeroBased_example1](images/aliasSource_zeroBased_example1.png)

In this scenario, we'd like to ignore the `app` reference in the existing source name, and simply have the associated number displayed as the source name. This can be done with the following expression:

```
aliasSource(ts("requests.failures.num"),1,"-")
```

![aliasSource_zeroBased_example1](images/aliasSource_zeroBased_example2.png)

* Because we are extracting a node from an existing source name, we don't need to specify a source option parameter (the default is source).
* Because the original source name uses hyphens ("-") instead of periods (".") as delimiters, we use the `"delimiterDefinition"` parameter to specify hyphen (-) as delimiters.
* We also specify the zeroBasedNodeIndex we'd like to extract. In this case, the pattern is `app-<number>`, that is, `app = 0` and `<number> = 1`. We specify 1 to show only the number and drop the string `app`.

##### Example 2 - Renaming source(s) with an existing metric name node

Imagine you have 1 physical server running 8 virtual machines. Each virtual machine is sending stats into Wavefront, but the physical server is set as the source name and the unique virtual machine name is in the metric name:

```
ts(disk.space.total.vm1)
source=phyServ
```

If you want to see the virtual machine name instead of the physical server name as the source name, you could do so as follows:

```
aliasSource(ts(disk.space.total.*),metric, 3)
```

* Because you want to extract the string from the metric name, you set the `<source>` option to `metric`.
* The only delimiters used in the metric name are periods, so you don't have to specify a delimiterDefinition.
* You set `zeroBasedNodeIndex` to 3.

This approach replaces `phyServ` with vm1, vm2, vm3, etc. for each unique metric.


##### Example 3 - Renaming source(s) with a point tag value node

Assume that you have 5 unique servers (server1, server2, server3, etc.) that run multiple applications at any given moment. A set of general metrics such as `application.latency`, applies to all applications. You apply an `application` point tag to the data format to determine the associated application for each source on the chart. The format of the `application` point tag is:

```
application=<company>.id-<value>_<appName>
```

For this use case, you'd like to replace the existing source names (server1, server2, server3, etc.) with the id value and application name. You use the following expression:

```
aliasSource(ts("application.latency"), tagk, application, 2, ".-")
```

In the example above:
* You want to extract a new source name from an existing point tag value associated with the application point tag key, so you enter `tagk, application` as the source option parameter.
* You want the new source name to be `<value>_<appName>`, so you specify the `"delimiterDefinition"`. Notice that we do not specify underscore ("\_") as a delimiter. If we were to do that, then the zeroBasedNodeIndex approach would no longer enable us to extract both the `<value>` and `<appName>` from the existing point tag value(s).
* Because `"delimiterDefinition"` us set to periods (".") and hyphens ("-"), you can set `zeroBasedNodeIndex` to 2. This approach sets `<company>` as 0, `id` as 1, and `<value>_<appName>` as 2.

### Regex Approach

You can use a regular expression in `aliasSource()` to transform an existing source name, metric name, or point tag value.  This approach works as a "search-replace" functionality&mdash;everything matching `regexSearchPattern` is replaced with `replacementPattern`. The syntax for this approach is:

```
aliasSource(expression, [metric|source|{tagk, <pointTagKey>},] "regexSearchPattern", "replacementPattern")
```

- `expression` - The ts() expression to extract a piece of information from.
- `metric|source|{tagk, <pointTagKey>}` - The set of data to extract a node from for the purpose of renaming one or more sources. `{tagk, <pointTagKey>}` is used if you want to extract a node from an existing point tag value. To use this approach, enter `tagk` followed by a specific `<pointTagKey>` name.

  For example, if you have point tag `Region=us-west-2b`, and you want to use its value to replace the source name, you can use `tagk, Region` followed by regEx patterns. If (`metric`, `source`, or `tagk`) is not explicitly entered, then the option is set to `source` by default.
- `"regexSearchPattern"` - A regular expression pattern to match against the extraction node specified above (source is the default).
- `"replacementPattern"` - The replacement string. If capturing groups were used in the regexSearchPattern, they can be referred to as "$1", "$2", etc.

#### Regex Examples
This example repeats the examples from the zeroBasedNodeIndex approach.

##### Example 1 - Renaming source(s) with an existing source name node

For this example, you replace the simple `zeroBasedNodeIndex` with a regular expression:

```
aliasSource(ts(requests.failures.num), "app-([0-9]*)", "$1")
```

* `"regularExpression"` is set to  `"app-([0-9]*)"`, so you capture everything after the `app-` substring that is a number and put that into capture group 1.
* You can then refer to that capture group as `$1` in the `captureGroupBackReference`.

##### Example 2 - Renaming source(s) with an existing metric name node

The equivalent `aliasSource()` syntax would be:

```
aliasSource(ts(disk.space.total.*), metric, "disk.([a-z-0-9]*)..*", "$1")
```

##### Example 3 - Renaming source(s) with a point tag value node

The equivalent `aliasSource()` syntax would be:

```
aliasSource(ts("application.latency"), tagk, application, ".*.id-(.*)", "$1")
```

##### Example 4 - Renaming source(s) with a source name node

This is an example of using `aliasSource()` with a regular expression that could not be easily done using the zeroBasedNodeIndex approach.

Assume you have sources that look like: `accounts.<company_name>.<group name><numeric value>`

and you want to set the source to `<company_name>.<group name>` (i.e., leave off `<numeric value>`)

This table shows the current source and desired source names:


| Current Source | Desired Source
| -
| accounts.foo.bar1 | foo.bar |
| accounts.baz.bar7 | baz.bar |

We can easily do this with `aliasSource()`:

```
aliasSource(ts(requests.failures.num), "accounts.([a-zA-Z.]*)[0-9]*$", "$1")
```

## The aliasMetric() Function

`aliasMetric()` lets you replace one or more existing metric names in a ts() expression with a string extracted from the metric name(s), source name(s), or point tag value(s).  For example, assume that you have a metric in your environment that tracks the number of total users of your product by customer:

```
ts("customer.user.total")
```

The series associated with this metric include a customer point tag key to "group by" when applying an aggregate function.

```
sum(ts("customer.user.total"),customer)
```

If you want to display this information as a column on a tabular view chart, the current aggregate metric does not display properly. However, you can use `aliasMetric()` to rename the aggregate metric, and to apply a column header of 'Total Users'.

You can use the `aliasMetric` function using the zeroBasedNodeIndex, regular expression replacement, or simple string replacement approach.

### zeroBasedNodeIndex Approach

If you use the zeroBasedNodeIndex approach for `aliasMetric()`, you extract a single node from an existing source name, metric name, or point tag value for the purpose of renaming a metric. Nodes in existing source name(s), metric name(s), or point tag value(s) are separated by delimiters. Suppose you have the following naming convention for a metric namespace:

```
<datacenter>.<customerName>_latency.<idNumber>
```

e.g. `pdx.customerA_latency.i49f21a72`

In the metric name above, each node is assigned a number:

```
pdx = 0
customerA_latency = 1
i49f21a72 = 2
```

The numbers listed above would be associated with the `zeroBasedNodeIndex` parameter. By default, Wavefront identifies each node separated by a (".") delimiter. This is why `customerA_latency` is considered a single node.

If the data you want to extract a node from includes delimiters such as a hyphen ("-") or underscore ("_"), then you can use the `"delimiterDefinition"` parameter `aliasMetric()` to identify those as delimiters. The syntax for `aliasMetric()` using the zeroBasedNodeIndex approach is:

```
aliasMetric(expression, [metric|source|{tagk, <pointTagKey>},] zeroBasedNodeIndex [, "delimiterDefinition"])
```

- `expression` - The ts() expression to extract a piece of information from.
- `metric|source|{tagk, <pointTagKey>}` - The set of data to extract a node from for the purpose of renaming one or more metrics.
  - Use `{tagk, pointTagKey}` if you want to extract a node from an existing point tag value. To use this approach, enter `tagk` followed by the `<pointTagKey>` that is associated with the point tag value. For example, if you have point tag `Region=us-west-2b`, and you want to replace the existing metric name with the entire point tag value, then you would enter `tagk, Region` and set the `zeroBasedNodeIndex` to 0.
  - If you don't specify (`metric`, `source`, `tagk`) this parameter defaults to `metric`.
- `zeroBasedNodeIndex` - The node to extract from the selected source name(s), metric name(s), or point tag value(s), and to use to rename one or more metric(s). You must specify this parameter.
- `"delimiterDefinition"` - Use this optional parameter to specify a delimiter other than period ("."). For example, if you want to extract `total_environment` from `disk.space-total_environment`, then set `zeroBasedNodeIndex` to 2 and "delimiterDefinition"] to ".-". If no `"delimiterDefinition"` is specified, then only periods (".") are considered delimiters.

#### zeroBasedNodeIndex Example

##### Example - Renaming metric(s) with an existing point tag value node

Assume that you have a set of metric names that are very long and clutter your hover legend:

```
<datacenter>.<version>.<customer>_latency.<id>
```

The information you want from the metric name is `<customer>_latency`. `<datacenter>` and `<version>` are also sent as optional point tag key values, so you don't need them in the hover legend. `aliasMetric()` lets you rename each metric to declutter your hover legend:

```
aliasMetric(ts("<datacenter>.<version>.<customer>_latency.<id>"), 2)
```

In this case, you are extracting from a metric name, so we don't need to specify `',metric'` before applying the `zeroBasedNodeIndex` value.

### Regex Approach

You can also use a regular expression with `aliasMetric()` to transform an existing source name, metric name, or point tag value.  This approach works as a "search-replace" functionality&mdash;everything that matches `regexSearchPattern` is replaced with `replacementPattern`. The syntax for this approach is:

```
aliasMetric(expression, [metric|source|{tagk, <pointTagKey>},] "regexSearchPattern", "replacementPattern")
```

- `expression` - The ts() expression to extract a piece of information from.
- `metric|source|{tagk, <pointTagKey>}` - The set of data to extract a node from for the purpose of renaming a metric. `{tagk, <pointTagKey>}` is used if you want to extract a node from an existing point tag value. To use this approach, enter `tagk` followed by a specific `<pointTagKey>` name. For example, if you have point tag `Region=us-west-2b`, and you want to use its value to replace the metric name, then you would enter `tagk, Region` followed by regEx patterns. If (`metric`, `source`, or `tagk`) is not explicitly entered, then the option is set to `source` by default.
- `"regexSearchPattern"` - A regular expression pattern to match against the extraction node specified above (`source` is the default).
- `"replacementPattern"` - The replacement string. If capturing groups are used in `regexSearchPattern`, they can be referred to as `$1`, `$2`, etc.

## The taggify() Function

`taggify()` lets you extract a string from an existing metric name, source name, or point tag value and create a synthetic point tag key value for that particular query. For example, assume you have a set of metrics that include a customer name in the actual metric name. Each customer has 3 unique metrics associated with it and they are all being reported by a single source:

```
Source="Customer-Example"

cpu.idle.customerA
cpu.load.customerA
cpu.total.customerA

cpu.idle.customerB
cpu.load.customerB
cpu.total.customerB
```

Based on this dataset you could aggregate the data, but you'd be unable to aggregate based on customer. You can instead use a "group-by" point tag option for aggregate functions. To use this functionality, you need to extract the customer name from the metric(s) and apply it as a synthetic point tag. You can accomplish this with the following `taggify()` query:

```
min(taggify(ts("cpu.*"), metric, customer, 2), customer)
```

The query above identifies the customer name, extracts that information as a point tag value, and applies it to a point tag key `customer`.

You then apply an aggregate function, in this case `min()`, and use "group-by" `customer` in the query.

You can use `taggify()` with a simple zeroBasedNodeIndex syntax. If that syntax doesn't solve your use case, use the regex syntax.

### zeroBasedNodeIndex Approach

The zeroBasedNodeIndex approach for `taggify()` refers to extracting a single node from an existing source name, metric name, or point tag value for the purpose of creating a synthetic point tag. Nodes in existing source name(s), metric name(s), or point tag value(s) are separated by delimiters. Suppose you have the following naming convention for a metric namespace:

```
<datacenter>.<customerName>_latency.<idNumber>
```

e.g. `pdx.customerA_latency.i49f21a72`

For the metric name above, each node is assigned a number:

```
pdx = 0
customerA_latency = 1
i49f21a72 = 2
```

The numbers listed above would be associated with the `zeroBasedNodeIndex` parameter. By default, Wavefront identifies each node separated by a (".") delimiter. This is why `customerA_latency` is considered a single node.

If the data you want to extract a node from includes delimiters such as a hyphen ("-") or underscore ("_"), then you can use the `"delimiterDefinition"` parameter. The syntax for `taggify()` using the zeroBasedNodeIndex approach is:

```
taggify(expression, metric|source|{tagk, <pointTagKey>}, newPointTagKey, zeroBasedNodeIndex [, "delimiterDefinition"])
```

- `expression` - The ts() expression to extract a piece of information from.
- `metric|source|{tagk, <pointTagKey>}` - The set of data to extract a node from for the purpose of creating a synthetic point tag. {tagk, pointTagKey} is used if you want to extract a node from an existing point tag value. To use this approach, enter `tagk` followed by the particular `<pointTagKey>` associated with the point tag value. For example, if you have point tag `Region=us-west-2b`, and you want to create a synthetic point tag based on the 1st zeroBasedNodeIndex (e.g. west), then you would enter `tagk, Region` and set the `zeroBasedNodeIndex` to 1. This would also require that you use  `"delimiterDefinition"` to specify a hyphen ("-") as a delimiter.  In contrast to  `aliasSource()` and `aliasMetric()`, you must specify this parameter for `taggify`.
- `newPointTagKey` - The new point tag key.
- `zeroBasedNodeIndex` - The node to extract from the selected source name(s), metric name(s), or point tag value(s), and use to create a new synthetic point tag key-value. You must specify this parameter regardless of whether `metric`, `source`, or `tagk`, `<pointTagKey>` is selected.
- `"delimiterDefinition"` - Use this optional parameter to specify a delimiter other than period ("."). For example, to extract `total_environment` from `disk.space-total_environment`, set `zeroBasedNodeIndex` to 2 and `"delimiterDefinition"` to ".-". If no `"delimiterDefinition"` is specified, then only periods (".") are considered delimiters.

#### zeroBasedNodeIndex Example

Imagine you're a SaaS company that provides multiple versions of your platform. You collect data from each platform your customer(s) are running and you include a version key in the source name(s):

```
source="<app-x>-<machine_type>.<versionKey>"
```

With this approach each customer has several version keys over time. Right now, all customers are broken into 3 categories: `<versionKey1>`, `<versionKey2>`, and `<versionKey3>`.

You want to collect a dataset that helps you understand the difference in performance between the different versions. You can create a synthetic point tag `version` based on `<versionKey>` to aggregate and group by `version` and to see the performance differences. The following query uses the zeroBasedNodeIndex approach to:
* identify `source` as the set of data to extract the `<versionKey>`,
* name `version` as the new point tag key,
* and identify `<versionKey>` as the 1st node.

```
taggify(ts("performance.*.tracker"), source, version, 1)
```

Because hyphens ("-") and underscores ("_") are used in the source name, you could also write this query as in one of the following examples:

- `taggify(ts("performance.*.tracker"), source, version, 4, "-_.")`
- `taggify(ts("performance.*.tracker"), source, version, 3, "-.")`

For any of these queries, your hover legend will show a new column labeled `version` with values `<versionKey1>`, `<versionKey2>`, and `<versionKey3>`.

You can next `taggify` calls. For example,

```
taggify(taggify(default(0, ts(production.infra.aws.ec2.instance.pulldeploy.failed.count.sum, asg="build_secondary*")),source,temp_asg,2,'.'),tagk,temp_asg,my_asg,0,'-')
```

extracts `asg` from the source.

### Regex Approach

You can also use a regular expression in `taggify()` to extract an existing metric name, source name, or point tag value and create a synthetic point tag from the information.  This approach works as a "search-replace" functionality&mdash;everything matching `regexSearchPattern` is replaced with `replacementPattern`. The syntax for this approach is:

```
taggify(expression, metric|source|{tagk, <pointTagKey>}, version, "regexSearchPattern", "replacementPattern")
```

#### Regex Example

To perform the transform shown in the zeroBasedNodeIndex Example with a regular expressions, use the following query:

```
taggify(ts("performance.*.tracker"), source, "regexSearchPattern", "replacementPattern")

```

## Best Practice for Metadata Functions

When using metadata functions, keep the following in mind:

- The query must be able to work with all underlying series or it does not return data. For example, if you extract a string from a source name and specify `zeroBasedNodeIndex` as 2, then all sources reporting data for your query must have at least 3 zeroBased nodes. If one source is named `app.25` (i.e. 0 and 1 zeroBased nodes), then the entire query fails because that source does not have a 2 zeroBased node.
- The series that result from `aliasSource()` and `aliasMetric()` must all be unique, or an error occurs and no data is returned. Series are defined as metric + source + point tags. For example, consider the following query: `aliasSource(ts("requests.latency"),metric,1)`. If no point tags exist for this data and 20 sources are reporting data for `requests.latency`, then the query returns an error because you are renaming each source as `latency`. In the resulting series each point has `metric="requests.latency"` and `source="latency"`. However, if each series has a unique point tag value, the query would work.
