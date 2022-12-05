---
title: Obsolescence and Remediation
keywords: release notes
tags:
sidebar: doc_sidebar
permalink: wavefront_obsolescence_policy.html
summary: Learn about deprecated and EOL features and how to prevent potential problems.
---
Tanzu Observability by Wavefront product features and APIs move to end-of-life as part of the normal software development lifecycle, security improvements, and other factors. To support planning for upgrades, this document provides information on upcoming lifecycle changes. While every effort is made to provide sufficient notice of changes, security issues or other factors may occasionally lead to accelerated end-of-life dates.

## Lifecycle Stages

To help you plan for end-of-life dates, this page uses the following terms:

* **Deprecated**. Feature, component, platform, or functionality that may no longer be efficient or safe.  Deprecated features are supported but no longer recommended. We eventually removes deprecated features. We usually do not fix a bug in a deprecated feature and request that you start using the replacement feature. Deprecated features are identified in the release notes for the release in which the feature is deprecated. For Wavefront proxy, the table below lists deprecated versions.
*  **End-of-life**. No longer supported. Feature, component, platform, or functionality is no longer supported and may be removed from the product at any time.


## Wavefront Proxy

Upgrade to the **latest GA release** of the [Wavefront proxy](https://github.com/wavefrontHQ/wavefront-proxy) to get the latest bug fixes and performance enhancements.

The following proxy versions are scheduled to be deprecated or moved to end-of-life.

<table class="width: 100%;">
<thead>
<tr><th width="33%">Version</th><th width="33%">Current Stage</th><th width="34%">End-of-Life Date</th></tr>
</thead>
<tbody>
<tr>
<td>10.12 and earlier</td>
<td>Deprecated. Wavefront proxy version 10.12 and earlier is impacted by a Log4j vulnerability. Upgrade to at least version 10.14, or to the latest GA release. </td>
<td>Feb 28, 2022</td>
</tr>
<tr>
<td>9.x</td>
<td>Deprecated</td>
<td>Jan 31, 2022</td>
</tr>
<tr>
<td>4.x and lower</td>
<td>End-of-Life</td>
<td>Jun 30, 2017</td>
</tr>
</tbody>
</table>
<p></p>
<h2>Wavefront API</h2>
<table class="width: 100%;">
<thead>
<tr><th width="33%">Version</th><th width="33%">Current Stage</th><th width="34%">End-of-Life Date</th></tr>
</thead>
<tbody>
<tr>
<td>2</td>
<td>Active</td>
<td>TBD</td>
</tr>
<tr>
<td>1</td>
<td>End-of-Life</td>
<td>Dec 31, 2017</td>
</tr>
</tbody>
</table>


## Delta Counters

Delta counter behavior changed with [Release 2020.26](2020.26.x_release_notes.html). The original delta counter implementation was Deprecated with [Release 2020.26](2020.26.x_release_notes.html). We changed delta counter queries to use `cs()` in the Wavefront Usage integration and tracing RED metrics. The original delta counter implementation is End of Life March 31, 2021.

### Automatic Updates and Required Changes

We update system dashboard and integration content to use the new version of delta counters. However, you might have to update custom delta counters.

* **Automatic Updates**. [Tracing RED metrics](trace_data_details.html#red-metrics) and in certain internal `~` metrics [collected by Tanzu Observability](wavefront-internal-metrics.html), such as `~collector.points.reported`, use delta counters. All out-of-the-box dashboards that use these data will be updated for you.
* **User Updates**. If you have cloned any out-of-the-box dashboards that use delta counters or have created any custom dashboards, charts, or alerts, you are responsible for updating the queries in related charts and alerts yourself.


### How to Find Queries that Might Need Modification

1. Find delta counters from the UI or using Spy.
    * Log into your Wavefront instance, click **Browse > Delta Counters** and examine your data.
    * From your Web browser, use [Delta Counter Spy](wavefront_monitoring_spy.html#get-ingested-delta-counters-with-spy) to view live delta counter ingestion.
2. [Search](wavefront_searching.html#search-field) for those named counters in alerts and dashboards.
   * Search on the **Alerts** page to find alerts that use the counter metric.
   * Search on the **All Dashboards** page for dashboards. You might have to select **Metrics** to get the relevant result.

### How to Modify the Queries

1. Replace `ts()` with `cs()` if the query targets delta counter data. Filtering works as before, so nothing within the parentheses needs to change.
2. Remove `rate()` or `ratediff()` functions from your delta counter queries.

   Any `cs()` query tracks the total increments per minute, so `cs()` data is already a 1-minute rate and doesn't require the `rate()` function. If you do want to know the per-second rate of change, divide the result by 60.

   You do not need to do anything differently if you are using a `timeWindow` parameter in your `rate()` function. The purpose of that parameter is to account for cumulative counter resets, but delta counters do not have resets.

3. Remove `align()` from your delta counter queries unless you picked an `align()` time window that's larger than 1 minute.

   `cs()` data is always minutely aligned and [raw or standard aggregations](query_language_aggregate_functions.html#aggregating-when-data-points-do-not-line-up) give the same results.

### Examples

In the following examples, `errors.count` is a delta counter:

<table class="width: 100%;">
<thead>
<tr><th width="30%">Original Query</th><th width="30%">New Query</th><th width="40%">Explanation</th></tr>
</thead>
<tbody>
<tr>
<td><code>ts(errors.count)</code></td>
<td><code>cs(errors.count)</code></td>
<td>In the simplest case, just change <code>ts()</code> to <code>cs()</code></td>
</tr>
<tr>
<td><code>rate(ts(errors.count))</code></td>
<td><code>cs(errors.count) / 60</code></td>
<td>To produce per-second rate of change like the <code>rate()</code> function the <code>cs()</code> divide by 60.</td>
</tr>
<tr>
<td><code>ratediff(ts(errors.count))</code></td>
<td><code>cs(errors.count)</code></td>
<td markdown="span">For <code>ratediff()</code>, no per-second conversion is done. Remove the <code>ratediff()</code> function from the query.</td>
</tr>
<tr>
<td><code>align(1m, ts(errors.count))</code></td>
<td><code>cs(errors.count)</code></td>
<td markdown="span">Remove `align()` from your query unless you picked an `align()` time window that's larger than 1 minute.</td>
</tr>
</tbody>
</table>

<!--- The following example for 67.x and later:
`rawsum(align(1m, rate(ts(errors.count))))` becomes `sum(cs(errors.count)) / 60` - In this case the query can be simplified as raw aggregate functions and `align()` are not necessary. However, `rawsum(align(1m, cs(errors.count))) / 60` would still be a valid query.--->

### Background: Original and New Delta Counter Implementation

[Delta counters](delta_counters.html) allow you to measure the number of times something occurred over time without needing to keep track of the number of occurrences to date yourself.

At ingestion time, a delta counter must have a ∆ character at the beginning. Just like any other measurement data in a delta counter series is uniquely identified by its name, source, and any point tags.

#### Example Scenario

For example, imagine we are trying to track the total number of errors that occur across lambda functions running in a given AWS region. Each invocation of the function would measure how many errors occurred during that run and would emit that to the Wavefront service.

If 5 errors were encountered during a given run, a Lambda running in the `us-west-2` region would send: `∆errors.count 5 source=lambda region=us-west-2`. We automatically aggregate any increments received for that same counter, allowing you to know the total number of errors that occurred over time, across any number of lambda invocations without any function needing to keep track of that overall state!

#### Original Implementation

Before release 2020.26, delta values were stored internally as regular metrics emitted every minutes.

For the above example if the data measured across 3 minutes had been a total of: 10 errors in minute 1, 15 errors in minute 2, and 5 errors in minute 3 then if you queried `ts(errors.count)` for that time range you would see a monotonically increasing count showing 10, 25, 30 across those 3 minutes.

#### New Implementation

Starting with release 2020.26, a new data type for storing delta counters is part of the product. Data ingestion of delta counters remains unchanged, and a delta (∆) is still required to indicate a delta counter, but the data is now queried via `cs()` instead of `ts()`. The original delta counters still report minutely, but instead of maintaining a monotonically increasing count they report the total number of increments that occurred within each minute. In our example, `cs(errors.count)` displays values of 10, 15, and 5. See [Counters and Delta Counters](delta_counters.html#counters-and-delta-counters-basics) for details and examples.

## Kubernetes Integration

Starting with the 2022-48.x release, we introduce a new Kubernetes Operator, which helps simplifying the management and configuration of the Kubernetes Observability integration and all of the deployed components (such as Wavefront Collector for Kubernetes, Wavefront proxy, Logs (Beta), and so on). The Kubernetes Operator replaces the functionality of the deprecated Helm or manually installed Wavefront Collector for Kubernetes and Wavefront proxy for all Kubernetes Distributions - except for OpenShift Container Platform. 

If you are currently leveraging the Helm or manually-installed Wavefront Collector for Kubernetes and Wavefront proxy, the deprecation will NOT affect you and you won't experience any disruptions. However, support (including bug fixes, security vulnerabilities, new functionality, etc.) will be discontinued on **Jan 31, 2023**, for the legacy collector and proxy installation methods.

**Note**: You should begin migrating to the Kubernetes Observability Operator as soon as possible to ensure that you the most secure and up-to-date Kubernetes Observability experience.
