---
title: Query Language Tips and Tricks
keywords: query language
tags: [query language]
sidebar: doc_sidebar
permalink: query_language_tricks.html
summary: Solve your query language problems with these pages
---
This page includes some tips and tricks for using Wavefront Query Language (WQL), and points to additional information to help you drill down.



## Use WQL Examples

The [Query Language Examples](query_language_recipes.html) doc page has sample queries for many use cases. In addition, you can look at our integration dashboards and copy queries from there.

## Learn What to Do

Understand how to improve performance and solve problems:

* [Optimize Query Language Performance](query_language_performance.html)
* [Optimize the Data Shape to Improve Performance](optimize_data_shape.html)
* [Troubleshooting Missing Data](missing_data_troubleshooting.html)

Learn about frequently used functions:

* [Bucketing with align()](query_language_align_function.html)
* [Combining Time Series With join()](query_language_series_joining.html)
* [Metadata (Label Manipulation) Functions](query_language_metadata_functions.html)

Tips and Tricks from the Pros
* [Using Moving and Tumbling Windows to Highlight Trends](query_language_windows_trends.html)
* [Detecting Anomalies With Statistical Functions](query_language_statistical_functions_anomalies.html)


## Learn How WQL Works

To understand potential problems and to become a power user of WQL, the following pages (some with video) can help:

* [Discrete and Continuous Time Series](query_language_discrete_continuous.html)
* [Pairing Up Matching Time Series](query_language_series_matching.html)
* [Aggregating Time Series](query_language_aggregate_functions.html)
* [Point Tags in Queries](query_language_point_tags.html)

## Use AND, OR, and NOT Operators

You can use the following Boolean operators in query expressions:
* AND, and
* OR, or
* NOT, not

### Combining Operators

You can use a combination of AND, OR and NOT operators in query line.

For example:

`ts(my_metric AND source=server_1 OR source=server_2 OR env=prod AND NOT app=my_app)`

is the same as:

`ts(my_metric, source=server_1, source=server_2, env=prod AND NOT app=my_app)`

The comma after the metric name is interpreted as AND. Subsequent commas are interpreted as OR.


### Using AND Operators Between ts() Expressions

AND and OR operators return boolean output when used between `ts()` expressions.

For example;

`ts(my_metric, source=server_1) and ts(my_other_metric, env=prod) and ts(..) and ..`

Returns output as `0` (False) or `1` (True). The value is:
* `1` if values for **all** `ts()` expressions are non-zero
* `0` if  values for **all** ts() expressions are zero

A boolean query is frequently used in alert conditions when you want to trigger alert only when more than one ts() expression condition is true.

For example, suppose the following alert condition is used;

`ts(cpu.percent.metric) > 85 and ts(memory.percent.metric) > 80`

That condition will only become true (boolean "1") when both ts() conditions are true.

### Using OR Operators Between ts() Expressions

You can use OR operators between the ts() expressions, like this:

`ts(my_metric, source=server_1) or ts(my_other_metric, env=prod) or ts(..) or ..`

The output  will be a `0` (False) or  `1` (True).
* `1` if **any** of the ts() expressions have a non-zero value.
* `0` if **all** of the ts() expressions have zero values.

{% include note.html content="You must use `OR` or `or`. A comma does not work." %}


### Using a Comma to mean AND or OR

{% include tip.html content="For improved legibility, we recommend that you spell out the operator (e.g. AND) instead of using the positional comma. We include this information in the doc set to help you understand queries that might be using this syntax." %} 

**Comma can mean AND**

A comma "," immediately after a metric name in a ts() expression is considered an AND operator:

When you use a comma (`,`) used after the metric, the query engine interprets the comma as AND when executing the query.

For example:

`ts(my_metric, source=server_1)`

is same as:

`ts(my_metric AND source=server_1)`

**Comma can mean OR**

A comma "," that is not used right after the metric name but somewhere else in the query line is interpreted as an OR operator.

For example:

`ts(my_metric, source=server_1, env=prod)`

is same as:

`ts(my_metric and source=server_1 or env=prod)`
