---
title: Series Matching
keywords: query language
tags: [query language]
sidebar: doc_sidebar
permalink: query_language_series_matching.html
summary: Learn how operators and functions affect the evaluation of Wavefront Query Language expressions.
---
Series matching is a process that occurs when when you apply operators and functions to two or more unique ts() expressions, each representing two or more unique source\|metric\|\[pointTagValues\] pairs, are evaluated:
 
- Arithmetic operators (+, -, /, *)
- Comparison operators (>, <, =, >=, <=, !=)
- Boolean operators (highpass, lowpass, min, max)
- Exponential and trigonometric functions

If point tags are present in your data, then series matching takes them into account. 
 
When you enter the ts() expression `ts("stats.servers.MemTotal", tag="dc1") - ts("stats.servers.MemFree", tag="east")`, Wavefront determines which series match up and subtracts the value for `stats.servers.MemTotal` from `stats.servers.MemFree` for each of those series. Tags `dc1` and `east` have three sources that match up (app-3, app-4, app-5), and four sources that don't (app-1, app-2, app-6, app-7). In this example, only data associated with app-3, app-4, and app-5 are displayed on the chart, while app-1, app-2, app-6, and app-7 are discarded.

![series matching](images/series_matching.png)

There are cases when advanced functions are applied to expressions, but no series matching occurs. This happens when one of the evaluated ts() expression is a constant value, such as 1, or represents a single time series, such as a single source or aggregated data with no `group by`. For example, if you replaced `tag="east"` with `source="app-4"`, then the value associated with app-4 at each time slice in the second expression is subtracted from each represented source in the first expression at each time slice. If you still want series matching to occur in the previous example, then you can wrap the advanced function with an inner join (i.e. `\[+\]`).

## Additional Examples
In the examples below, the results listed the right of = represents the set of series that would be displayed on the chart.
 
### Series Matching Occurs

- `(A,B,C) * (B,C,D) = (B,C)`
  - Only Series B and C match up
 
- `(A,B,C) and (X,Y,Z) = NO DATA`
  - No series match up which results in no data
 
- `(A,B,C) \[>\] (A) = (A)`
  - There would be no series matching with the second argument being A only, but the inner join around > forces series matching.
 
### Series Matching Does Not Occur

- `(A,B,C) / 3 = (A,B,C)`
  - The number 3 is a single constant value and is applied to A, B, and C
 
- `(D) * (A,B,C) = (A,B,C)`
  - D is a single series value and is applied to A, B, and C
 
- `(B,D,F) + sum(A,B,C) = (B,D,F)`
  - While B is the only series in both arguments, A, B, and C are aggregated into a single value with sum() and applied to B, D, and F
 
## Series Matching with Point Tags
If point tags are present in your data, then series matching takes them into account. Consider the following ts() query:
 
`ts(disk.space.total, tag=az-1 and env=\*) - ts(disk.space.used, tag=az-1 and env=*)`
 
In this example, the `env` point tag key includes point tag values `production` and `development`. If source `app-1` includes the `env` value `development` in the first ts() call, but includes the `env` value `production` in the second ts() call, they will not match up; they must be exact matches in order for series matching to occur. This also means that if two series have the same source\|metric\|point tag but one of the series includes an additional point tag that the other series does not have, then series matching does not include these series in the results.

