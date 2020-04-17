---
title: Managing External Links
keywords: external links
tags: [integrations, videos]
sidebar: doc_sidebar
permalink: external_links_managing.html
summary: Learn how to manage external links.
---
External links provide integration between Wavefront and external systems. If you use logging systems such as Scalr, ELK, or Splunk, you can construct a meaningful URL to navigate from Wavefront to a log entry.

Here's a video to get you started:

<p><a href="https://youtu.be/oufjL7nM0LQ"><img src="/images/v_external_links.png" style="width: 700px;"/></a>
</p>

Suppose while analyzing metrics data you find an anomaly such as an unexpected drop in transaction rate. You want to look at corresponding log entries. External links allow you to click through from a Wavefront series directly to a related entry in your
logging system.

External links are general purpose: you can link through to any type of system accessible from a URL, not just logs.


<div markdown="span" class="alert alert-info" role="alert">While every Wavefront user can view external links, you must have [External Links Management permission](permissions_overview.html) to [manage](external_links_managing.html) external links. If you do not have permission, the UI menu selections, buttons, and links you use to perform management tasks are not visible.</div>

## Navigating to an External Link

All users can use the right-click menu on a time series to navigate to an external link.
* By default, the external link shows up on all time series.
* If the creator of the external link specified a filter, the **External Link** menu only shows the link on specified time series.

1. Right-click a series.
1. Select **External Links > \<linkname\>**, where \<linkname\> is the name specified when the link was created.

   ![External links](images/external_link_v2.png)

## Creating an External Link

Users with **External Links** permission can create and modify external links.

1. Select **Browse > External Links**.
1. Click **Create External Link**.
1. Specify a link name and description.
1. (Optional) If you want to limit which series show the external link, you can specify a Javascript regular expression that the series must match. For example, if you specify a point tag filter of `env=production`, then only series with that point tag filter show that external link option on the right-button menu. 
    <table>
    <colgroup>
    <col width="20%" />
    <col width="50%" />
    <col width="30%" />
    </colgroup>
    <thead>
    <tr><th>Type</th><th>Description</th><th>Example</th></tr>
    </thead>
    <tbody>
    <tr>
    <td>Metric Filter Regex</td>
    <td>A regular expression that metric names must match.</td>
    <td>jvm.memory.heap\w+</td>
    </tr>
    <tr>
    <td>Source Filter Regex</td>
    <td>A regular expression that source names must match.</td>
    <td>co-2a-app[0-9]+-i-\d+</td>
    </tr>
    <tr>
    <td>Point Tag Filter Regexes</td>
    <td>A point tag key and a regular expression that point tag values must match. Click the plus sign after you specify the regex. </td>
    <td><strong>Tag Key</strong>=env<br/><strong>Filter Regex</strong>=prod\w+</td></tr></tbody></table>

    Specify the external link URL template. The template employs [Mustache syntax](https://mustache.github.io/). The template supports these properties:
    <table>
    <thead>
    <tr><th width="40%">Property</th><th width="60%">Description</th></tr>
    </thead>
    <tbody>
    <tr>
    <td>source</td>
    <td>Source of the series.</td>
    </tr>
    <tr>
    <td>startEpochMillis</td>
    <td>Starting time of the chart window, in milliseconds from the UNIX epoch.</td>
    </tr>
    <tr>
    <td>endEpochMillis</td>
    <td>Ending time of the chart window, in milliseconds from the UNIX epoch.</td>
    </tr>
    <tr>
    <td>&lt;pointTagName1&gt;, &lt;pointTagName2&gt;,...</td>
    <td>One or more point tag names associated with the series.</td>
    </tr>
    </tbody>
    </table>

    You can apply functions to transform the URL. All functions begin with the namespace `functions`.
    <table>
    <thead>
    <tr><th width="60%">Function</th><th width="40%">Description</th></tr>
    </thead>
    <tbody>
    <tr>
    <td>urlEncode</td>
    <td>URL Encoder</td>
    </tr>
    <tr>
    <td>epochMillisToEpochSeconds</td>
    <td>Converts epoch milliseconds to epoch seconds.</td>
    </tr>
    <tr>
    <td>epochMillisToISO</td>
    <td markdown="span">Converts epoch milliseconds to an [ISO8601](https://en.wikipedia.org/wiki/ISO_8601#Dates) representation.</td>
    </tr>
    <tr>
    <td>epochMillisEra,epochMilliscenturyOfEra,
     epochMillisyearOfEra,epochMillisYearOfCentury,
     epochMillisYear,epochMillisMonthOfYear,
     epochMillisDayOfYear,epochMillisDayOfMonth,
     epochMillisWeekyear,epochMillisWeekOfWeekyear,
     epochMillisDayOfWeek,epochMillisHalfDayOfDay,
     epochMillisClockHourOfHalfday,epochMillisClockHourOfDay,
     epochMillisHourOfHalfday,epochMillisHourOfDay,
     epochMillisMinuteOfDay,epochMillisMinuteOfHour,
     epochMillisSecondOfDay,epochMillisSecondOfMinute,
     epochMillisMillisOfDay,epochMillisMillisOfSecond
    </td>
    <td markdown="span">
    0 for BC, 1 for AD. See [Joda-Time - Java date and time API](http://joda-time.sourceforge.net/field.html).
    </td>
    </tr>
    </tbody>
    </table>
1. Click **Save**.



## Example URL Templates

The following 2 templates go to a specified URL when the user right-clicks a time series and selects the external link.

### Template Passing in Source

The following URL template goes to `scalyr.com` and passes in the source of the series and the start and end time of the chart if a user right-clicks on a series.

```
https://www.scalyr.com/events?logSource={{{source}}}&startTime={{startEpochMillis}}&endTime={{endEpochMillis}}
```

### Template Using Point Tag Name
The following external link URL template references the point tag name `service`:

{% raw %}
```handlebars
http://<hostname>?time:(from:'{{#functions.epochMillisToISO}}{{startEpochMillis}}{{/functions.epochMillisToISO}}',to:'{{#functions.epochMillisToISO}}{{endEpochMillis}}{{/functions.epochMillisToISO}}'))&{{#functions.urlEncode}}host:{{source}} AND source:"/mnt/logs/{{service}}.log"{{/functions.urlEncode}}'))
```
{% endraw %}

This template contains the substring:

{% raw %}
```handlebars
{{#functions.urlEncode}}host:{{source}} AND source:"/mnt/logs/{{service}}.log"{{/functions.urlEncode}}
```
{% endraw %}

Assuming `source=test` and `service=alerting`, the template evaluates to:

{% raw %}
```handlebars
{{#functions.urlEncode}}host:test AND source:"/mnt/logs/alerting.log"{{/functions.urlEncode}}
```
{% endraw %}

The string inside the function delimiters is URL encoded as:

{% raw %}
```handlebars
host%3Atest%20AND%20source%3A%22%2Fmnt%2Flogs%2Falerting.log%22
```
{% endraw %}

## Example Filters

When you specify a filter, only time series that match the filter show the right-button menu for the external link. Here are some examples.

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr><th>Example</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td>Metric Filter Regex: jvm&#92;.memory&#92;.heap\w+</td>
<td>Matches time series with a metric that includes <code>jvm.memory.heap</code> and an arbitrary number of characers. Uses backslash to escape the period (.) special characters.</td>
</tr>
<tr>
<td>Source Filter Regex: wavefront-2a-app[0-9]+-i-&#92;d+</td>
<td>Matches time series with a source that includes the string wavefront-2a-app, followed by numeric characters.</td>
</tr>
<tr>
<td>Point Tag Filter Regexes -- Tag Key: <strong>az</strong> Filter Regex<strong>us-west-2</strong></td>
<td>Matches any time series that includes a point tag <strong>az</strong> that has a value <strong>us-west-2<strong>. You must click the + after the Filter Regex to add the filter. </td>
<</tr></tbody></table>
