---
title: Metadata Functions
keywords: query language
tags: [query language]
sidebar: doc_sidebar
permalink: query_language_metadata_functions.html
summary: Learn how to use metadata functions in Wavefront Query Language expressions to rename metrics and sources and create point tags.
---

Metadata functions allow you to extract information from an existing set of data to rename a metric or source, or create a new synthetic point tag. This category includes 3 functions: `aliasSource()`, `aliasMetric()`, and `taggify()`. This document provides an in-depth review of each function and how they can be used to solve several use cases.

## The aliasSource() Function
 
`aliasSource()` lets you replace one or more existing source names in a ts() expression with a string extracted from the metric name(s), source name(s), or point tag value(s).  For example, let's say you have a set of metrics with a customer name string included in them:

```
cpu.loadavg-customerA.1m
cpu.loadavg-customerB.1m
cpu.loadavg-customerA.5m
cpu.loadavg-customerB.5m
```
 
However, the data for this set of metrics is being reported by 1 source (e.g. `source1`). The data is present, but what if you wanted to aggregate the data and "group by" customer? You could create two separate ts() expressions to accomplish this, or you could use `aliasSource()` to update the `<source1>` name to `customerA` or `customerB`. At that point you could "group by" source and get the answer you needed from a single expression.
 
There are two sets of applicable syntax for this function: zeroBasedNodeIndex and Regex. The option you should select should be based on whether a simple zeroBasedNodeIndex approach solves your use case or whether a more detailed Regex approach is needed. 
 
### zeroBasedNodeIndex Approach 
 
The zeroBasedNodeIndex approach for `aliasSource()` refers to extracting a single node from an existing source name, metric name, or point tag value for the purpose of renaming a source. Nodes in existing source name(s), metric name(s), or point tag value(s) are separated by delimiters. For example, let's say that you have the following metric name:

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

If the data you want to extract a node from includes delimiters such as a hyphen ("-") or underscore ("_"), then you can use the `"delimiterDefinition"` parameter to identify those as delimiters. The syntax for `aliasSource()` using the zeroBasedNodeIndex approach is:

```
aliasSource(expression, [metric|source|{tagk, <pointTagKey>},] zeroBasedNodeIndex [, "delimiterDefinition"])`
```

- `expression` - The ts() expression to extract a piece of information from.
- `metric|source|{tagk, <pointTagKey>}` - The set of data to extract a node from for the purpose of renaming one or more sources. Use `{tagk, pointTagKey}` if you want to extract a node from an existing point tag value. To use this approach, enter `tagk` followed by the particular `<pointTagKey>` associated with the point tag value. For example, if you have point tag `Region=us-west-2b`, and you want to replace the existing source name with the entire point tag value, then you would enter `tagk, Region` and set the `zeroBasedNodeIndex` to 0. If (`metric`, `source`, `tagk`) is not explicitly entered, then the option is set to `source` by default.
- `zeroBasedNodeIndex` - The node to extract from the source option and use to rename one or more source(s). Regardless of whether `metric`, `source`, or `tagk, <pointTagKey>` is selected, that option must exist.
- `"delimiterDefinition"` - A delimiter other than period ("."). For example, if you want to extract `total_environment` from `disk.space-total_environment`, then set `zeroBasedNodeIndex` to 2 and `"delimiterDefinition"` to ".-". If no `"delimiterDefinition"` is specified, then only periods (".") are considered delimiters.
 
#### zeroBasedNodeIndex Examples
 
##### Example 1 - Renaming source(s) with an existing source name node
 
Base expression `ts("requests.failures.num")` has 40 unique sources sending data. Those 40 unique sources are named `app-1`, `app-2`, `app-3`...`app-40`.
 
![aliasSource_zeroBased_example1](images/aliassource_zerobased_example1.png)
 
In this scenario, we'd like to ignore the `app` reference in the existing source name, and simply have the associated number displayed as the source name. This can be done with the following expression:

``` 
aliasSource(ts("requests.failures.num"),1,"-")
``` 

![aliasSource_zeroBased_example1](images/aliassource_zerobased_example1.png)
 
Since we are extracting a node from an existing source name, we don't need to specify a source option parameter as the default is source. With the original source name using hyphens ("-") as delimiters instead of periods ("."), we use the `"delimiterDefinition"` parameter to identify hyphens as delimiters. Once hyphens are defined as delimiters, then we need to specify which zeroBasedNodeIndex we'd like to extract. In this case, app = 0 and `<number> = 1`, so specifying 1 gives us the results we desire.

##### Example 2 - Renaming source(s) with an existing metric name node
 
Imagine you have 1 physical server running 8 virtual machines. Each virtual machine is sending stats into Wavefront, but the data format being sent to Wavefront has the physical server set as the source name and the unique virtual machine located in the metric name:

```
ts(disk.space.total.vm1)
source=phyServ
```

If you are interested in replacing the physical server with the virtual machine as the source name, then you could do so with the following approach:

```
aliasSource(ts(disk.space.total.*),metric, 3)
```

Since we are extracting the string from a metric name, the source option parameter needs to be set as metric. This is also an easy case because the only delimiters used in the metric name are periods ("."). Therefore we only need to set `zeroBasedNodeIndex` to 3. This approach would replace `phyServ` with vm1, vm2, vm3, etc. based on each unique metric.


##### Example 3 - Renaming source(s) with a point tag value node
 
Assume that you have 5 unique servers (server1, server2, server3, etc.) running multiple applications at any given moment. There are a set of general metrics that apply to all applications, such as `application.latency`. An `application` point tag is applied to the data format to determine which application each source on the chart is associated with. The format of the `application` point tag is:

```
application=<company>.id-<value>_<appName>
```

For this use case, we'd like to replace the existing source names (server1, server2, server3, etc.) with the id value and application name. We can do so with the following expression:

```
aliasSource(ts("application.latency"), tagk, application, 2, ".-")
```

In the example above, we must specify that we want to extract a new source name from an existing point tag value associated with the application point tag key, so we enter `tagk, application` as the source option parameter. Based on the use case, we want the new source name to be `<value>_<appName>`, so we need to specify the `"delimiterDefinition"`. Notice that we do not specify underscore ("\_") as a delimiter. If we were to do that, then the zeroBasedNodeIndex approach would no longer enable us to extract both the `<value>` and `<appName>` from the existing point tag value(s). Since only periods (".") and hyphens ("-") are specified, we can `zeroBasedNodeIndex` to 2. This approach sets `<company>` as 0, `id` as 1, and `<value>_<appName>` as 2.
 
### Regex Approach
 
You can also use a regular expression in `aliasSource()` to transform an existing source name, metric name, or point tag value for the purpose of renaming a source.  This approach works as a "search-replace" functionality&mdash;everything matching `regexSearchPattern` is replaced with `replacementPattern`. The syntax for this approach is:

```
aliasSource(expression, [metric|source|{tagk, <pointTagKey>},] "regexSearchPattern", "replacementPattern")
```

- `expression` - The ts() expression to extract a piece of information from.
- `metric|source|{tagk, <pointTagKey>}` - The set of data to extract a node from for the purpose of renaming one or more sources. ``{tagk, <pointTagKey>}`` is used if you want to extract a node from an existing point tag value. To use this approach, enter `tagk` followed by a specific `<pointTagKey>` name. For example, if you have point tag `Region=us-west-2b`, and you want to use its value to replace the source name, then you would enter `tagk, Region` followed by regEx patterns. If (`metric`, `source`, or `tagk`) is not explicitly entered, then the option is set to `source` by default.
- `"regexSearchPattern"` - A regular expression pattern to match against the extraction node specified above (source is the default). 
- `"replacementPattern"` - The replacement string. If capturing groups were used in the regexSearchPattern, they can be referred to as "$1", "$2", etc.
 
#### Regex Examples
We repeat the same examples from the zeroBasedNodeIndex approach.
 
##### Example 1 - Renaming source(s) with an existing source name node
 
For this example, we replace the simple `zeroBasedNodeIndex` with a regular expression:

```
aliasSource(ts(requests.failures.num), "app-([0-9]*)", "$1")
```

With `"regularExpression"` set to  `"app-([0-9]*)"`, we capture everything after the `app-` substring that is a number and put that into capture group 1.  That capture group can then be referred to as `$1` in the `captureGroupBackReference`.

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
 
For example, this simple table shows the current source and desired source names:


| Current Source | Desired Source 
| -
| accounts.foo.bar1 | foo.bar |
| accounts.baz.bar7 | baz.bar |

We can easily do this with `aliasSource()`:

```
aliasSource(ts(requests.failures.num), "accounts.([a-zA-Z.]*)[0-9]*$", "$1")
```
 
## The aliasMetric() Function
 
`aliasMetric()` lets you replace one or more existing metric names in a ts() expression with a string extracted from the metric name(s), source name(s), or point tag value(s).  For example, let's say that you have a metric in your environment that tracks the number of total users of your product by customer:

```
ts("customer.user.total")
```

Imagine that the series associated with this metric include a customer point tag key to "group by" when applying an aggregate function.

```
sum(ts("customer.user.total"),customer)
```

If you wanted to display this information as a column on a Tabular View Chart, the current aggregate metric would not display properly. However, by using `aliasMetric()` to rename the aggregate metric, we can apply a column header of 'Total Users'.
 
There are two sets of syntax for this function: zeroBasedNodeIndex and Regex. The option you should select should be based on whether a simple zeroBasedNodeIndex approach solves your use case or whether a more detailed Regex approach is needed.
 
### zeroBasedNodeIndex Approach
 
The zeroBasedNodeIndex approach for `aliasMetric()` refers to extracting a single node from an existing source name, metric name, or point tag value for the purpose of renaming a metric. Nodes in existing source name(s), metric name(s), or point tag value(s) are separated by delimiters. Suppose you have the following naming convention for a metric namespace:

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
- `metric|source|{tagk, <pointTagKey>}` - The set of data to extract a node from for the purpose of renaming one or more metrics. `{tagk, pointTagKey}` is used if you want to extract a node from an existing point tag value. To use this approach, enter `tagk` followed by the particular `<pointTagKey>` associated with the point tag value. For example, if you have point tag `Region=us-west-2b`, and you want to replace the existing metric name with the entire point tag value, then you would enter `tagk, Region` and set the `zeroBasedNodeIndex` to 0. If (`metric`, `source`, `tagk`) is not explicitly entered, then the option is set to `metric` by default.
- `zeroBasedNodeIndex` - The node to extract from the selected source name(s), metric name(s), or point tag value(s), and use to rename one or more metric(s). Regardless of whether `metric`, `source`, or `tagk`, `<pointTagKey>` is selected, this option must be included.
- `"delimiterDefinition"` - A delimiter other than period ("."). For example, if you want to extract `total_environment` from `disk.space-total_environment`, then set `zeroBasedNodeIndex` to 2 and "delimiterDefinition"] to ".-". If no `"delimiterDefinition"` is specified, then only periods (".") are considered delimiters.
 
#### zeroBasedNodeIndex Example
 
##### Example - Renaming metric(s) with an existing point tag value node
 
Imagine that you have a set of metric names that are very long and tend to clutter up your hover legend:

```
<datacenter>.<version>.<customer>_latency.<id>
```

The main information you wish to gather from the metric name is `<customer>_latency` since `<datacenter>` and `<version>` are also sent as optional point tag key-values. `aliasMetric()` lets you rename each metric to declutter your hover legend:

```
aliasMetric(ts("<datacenter>.<version>.<customer>_latency.<id>"), 2)
```

In this case, we are extracting from a metric name, so we do not need to specify `',metric'` before applying the `zeroBasedNodeIndex` value.
 
### Regex Approach
 
You can also use a regular expression in `aliasMetric()` to transform an existing source name, metric name, or point tag value for the purpose of renaming a metric.  This approach works as a "search-replace" functionality&mdash;everything matching `regexSearchPattern` is replaced with `replacementPattern`. The syntax for this approach is:

```
aliasMetric(expression, [metric|source|{tagk, <pointTagKey>},] "regexSearchPattern", "replacementPattern")
```

- `expression` - The ts() expression to extract a piece of information from.
- `metric|source|{tagk, <pointTagKey>}` - The set of data to extract a node from for the purpose of renaming a metric. `{tagk, <pointTagKey>}` is used if you want to extract a node from an existing point tag value. To use this approach, enter `tagk` followed by a specific `<pointTagKey>` name. For example, if you have point tag `Region=us-west-2b`, and you want to use its value to replace the metric name, then you would enter `tagk, Region` followed by regEx patterns. If (`metric`, `source`, or `tagk`) is not explicitly entered, then the option is set to `source` by default.
- `"regexSearchPattern"` - A regular expression pattern to match against the extraction node specified above (`source` is the default). 
- `"replacementPattern"` - The replacement string. If capturing groups are used in `regexSearchPattern`, they can be referred to as `$1`, `$2`, etc.
  
## The taggify() Function
 
`taggify()` lets you extract a string from an existing metric name, source name, or point tag value and create a synthetic point tag key-value for that particular query. For example, if you have a set of metrics that include a customer name in the actual metric name. Each customer has 3 unique metrics associated with it and they are all being reported by a single source:

```
Source="Customer-Box"

cpu.idle.customerA
cpu.load.customerA
cpu.total.customerA
 
cpu.idle.customerB
cpu.load.customerB
cpu.total.customerB
```

Based on this dataset you could aggregate the data, but you'd be unable to aggregate based on customer. However, we do offer a "group-by" point tag option for aggregate functions. In order to use this functionality though, you'd need to extract the customer name from the metric(s) and apply it as a synthetic point tag. You can accomplish this with the following `taggify()` query:

```
min(taggify(ts("cpu.*"), metric, customer, 2), customer)
```

The query above identifies the customer name, extracts that information as a point tag value, and applies it to a point tag key `customer`. We then apply an aggregate function, in this case `min()`, and add a "group-by" `customer` to the query.

There are two sets of syntax for this function: zeroBasedNodeIndex and Regex. The option you should select should be based on whether a simple zeroBasedNodeIndex approach solves your use case or whether a more detailed regex approach is needed.
 
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
 
If the data you want to extract a node from includes delimiters such as a hyphen ("-") or underscore ("_"), then you can use the `"delimiterDefinition"` parameter to identify those as delimiters. The syntax for `taggify()` using the zeroBasedNodeIndex approach is:

```
taggify(expression, metric|source|{tagk, <pointTagKey>}, newPointTagKey, zeroBasedNodeIndex [, "delimiterDefinition"])
```

- `expression` - The ts() expression to extract a piece of information from.
- `metric|source|{tagk, <pointTagKey>}` - The set of data to extract a node from for the purpose of creating a synthetic point tag. {tagk, pointTagKey} is used if you want to extract a node from an existing point tag value. To use this approach, enter `tagk` followed by the particular `<pointTagKey>` associated with the point tag value. For example, if you have point tag `Region=us-west-2b`, and you want to create a synthetic point tag based on the 1st zeroBasedNodeIndex (e.g. west), then you would enter `tagk, Region` and set the `zeroBasedNodeIndex` to 1. This would also require that you use  `"delimiterDefinition"` to specify a hyphen ("-") as a delimiter.  Unlike `aliasSource()` and `aliasMetric()`, one of these options must be selected for the query to execute properly.
- `newPointTagKey` - The new point tag key.
- `zeroBasedNodeIndex` - The node to extract from the selected source name(s), metric name(s), or point tag value(s), and use to create a new synthetic point tag key-value. Regardless of whether `metric`, `source`, or `tagk`, `<pointTagKey>` is selected, this option must be included.
- `"delimiterDefinition"` - A delimiter other than period ("."). For example, to extract `total_environment` from `disk.space-total_environment`, set `zeroBasedNodeIndex` to 2 and `"delimiterDefinition"` to ".-". If no `"delimiterDefinition"` is specified, then only periods (".") are considered delimiters.
 
#### zeroBasedNodeIndex Example
 
Imagine you're a SaaS company that provides multiple versions of your platform. You collect data from each platform you're customer(s) are running and include a version key in the source name(s):

```
source="<app-x>-<machine_type>.<versionKey>"
```

This approach means that each customer will have several version keys over time, and at the current moment all customers are broken into 3 categories: `<versionKey1>`, `<versionKey2>`, and `<versionKey3>`.  With the dataset you're collecting, you want to understand the difference in performance between each version key. Creating a synthetic point tag `version` based on `<versionKey>` lets you aggregate and "group by" `version` to see the performance differences between each version. The following query identifies `source` as the set of data to extract the `<versionKey>`, names `version` as the new point tag key, and identifies `<versionKey>` as the 1st node using the zeroBasedNodeIndex approach:

```
taggify(ts("performance.*.tracker"), source, version, 1)
```

Since hyphens ("-") and underscores ("_") are used in the source name, the query could also be written like either of the following:

- `taggify(ts("performance.*.tracker"), source, version, 4, "-_.")`
- `taggify(ts("performance.*.tracker"), source, version, 3, "-.")`

For any of these queries, your hover legend will show a new column labeled `version` with values `<versionKey1>`, `<versionKey2>`, and `<versionKey3>`.

### Regex Approach
 
You can also use a regular expression in `taggify()` to transform an existing metric name, source name, or point tag value for the purpose of creating a synthetic point tag.  This approach works as a "search-replace" functionality&mdash;everything matching `regexSearchPattern` is replaced with `replacementPattern`. The syntax for this approach is:

```
taggify(expression, metric|source|{tagk, <pointTagKey>}, version, "regexSearchPattern", "replacementPattern")
```

#### Regex Example

To do the same transform applied in the zeroBasedNodeIndex Example using regular expressions, use the following query:

```
taggify(ts("performance.*.tracker"), source, "regexSearchPattern", "replacementPattern")

```


## Important Notes
 
When using metadata functions, keep the following in mind:
 
- When specifying the string to extract, the query must be able to work with all underlying series for data to be returned. For example, if you are extracting a string from a source name and specify `zeroBasedNodeIndex` as 2, then all sources reporting data for your query must have at least 3 zeroBased nodes. If one source is named `app.25` (i.e. 0 and 1 zeroBased nodes), then the entire query will fail because that source does not have a 2 zeroBased node.
- The series resulting from `aliasSource()` and `aliasMetric()` must all be unique, otherwise an error will occur and no data is returned. Series are defined as metric + source + point tags. Take the following query for example: `aliasSource(ts("requests.latency"),metric,1)`. If no point tags exist for this data and there are 20 sources reporting data for `requests.latency`, then this query would return an error because you are renaming each source as `latency`. The resulting series would collide because each point would have metric="requests.latency" and source="latency". However, if each series had a unique point tag value, the query would work.


