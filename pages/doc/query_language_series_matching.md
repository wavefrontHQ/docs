---
title: Series Matching
keywords: query language
tags: [query language]
sidebar: doc_sidebar
permalink: query_language_series_matching.html
summary: Learn how operators and functions affect the evaluation of Wavefront Query Language expressions.
---
Series matching is a process that occurs when you apply the following operators and functions:
 
- Arithmetic operators (+, -, /, *)
- Comparison operators (>, <, =, >=, <=, !=)
- Filter functions (highpass, lowpass, min, max)
- Exponential and trigonometric functions

to two or more unique ts() expressions, each representing two or more unique metric\|source\|point tag value tuples.

If [point tags](#point_tags) are present in your time series, then series matching takes them into account. 
 
For example, when you enter the ts() expression 

```
ts("stats.servers.MemTotal", tag="dc1") - ts("stats.servers.MemFree", tag="east")
```

Wavefront determines which time series match up and subtracts the value for `stats.servers.MemTotal` from `stats.servers.MemFree` for each matching series. The source tags `dc1` and `east` have three sources that match up (`app-3`, `app-4`, `app-5`), and four sources that don't (`app-1`, `app-2`, `app-6`, `app-7`) therefore only data associated with `app-3`, `app-4`, and `app-5` are displayed on the chart, while `app-1`, `app-2`, `app-6`, and `app-7` are discarded.

![series matching](images/series_matching.png)

There are cases when you apply functions to expressions, but no series matching occurs. This happens when one of the evaluated ts() expression is a constant value, such as 1, or represents a single time series, such as a single source or aggregated data with no "group by". 

For example, if you replaced `tag="east"` with `source="app-4"`, then the value associated with `app-4` in the second expression at each time slice is subtracted from each represented source in the first expression at each time slice. If you still want series matching to occur in the previous example, then you can wrap the operator or function with an inner join (i.e. `[+]`).

## Examples
In the examples below, the results listed to the right of = represents the set of series that would be displayed.
 
### Series Matching Occurs

- `(A,B,C) * (B,C,D) = (B,C)`
  - Only series B and C match up
 
- `(A,B,C) and (X,Y,Z) = NO DATA`
  - No series match up which results in no data
 
- `(A,B,C) [>] (A) = (A)`
  - With the second argument being A only there would be no series matching, but the inner join around > forces series matching.
 
### Series Matching Does Not Occur

- `(A,B,C) / 3 = (A,B,C)`
  - The number 3 is a single constant value and is applied to A, B, and C
 
- `(D) * (A,B,C) = (A,B,C)`
  - D is a single series value and is applied to A, B, and C
 
- `(B,D,F) + sum(A,B,C) = (B,D,F)`
  - While B is the only series in both arguments, A, B, and C are aggregated into a single value with sum() and applied to B, D, and F

<a name="point_tags"></a>

## Series Matching with Point Tags

Consider the following ts() query:
 
```
ts(disk.space.total, tag=az-1 and env=*) - ts(disk.space.used, tag=az-1 and env=*)
```
 
In this example, the `env` point tag key takes the values `production` and `development`. If source `app-1` includes the `env` value `development` in the first ts() call, but includes the `env` value `production` in the second ts() call, they will not match up; they must be exact matches in order for series matching to occur. This also means that if two series have the same source\|metric\|point tag but one of the series includes an additional point tag that the other series does not have, series matching does not include these series in the results.

