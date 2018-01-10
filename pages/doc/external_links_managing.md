---
title: Managing External Links
keywords: external links
tags: [integrations, videos]
sidebar: doc_sidebar
permalink: external_links_managing.html
summary: Learn how to manage external links.
---
External links provide integration between Wavefront and external systems. If you use logging systems such as ELK and Splunk, you can easily construct a meaningful URL to navigate from Wavefront to a log entry.

Suppose while analyzing metrics data you find an anomaly such as an unexpected drop in transaction rate
and you want to navigate to logs to look for entries that could shed light on why the transaction rate drop occurred. External links allow you to click through from a Wavefront series directly to a related entry in your
logging system.

External links are general purpose: you can link through to any type of system, not just logs.

To view and manage external links, select **Browse > External Links**.

<div markdown="span" class="alert alert-info" role="alert">While every Wavefront user can view external links, you must have [External Links Management permission](permissions_overview.html) to [manage](external_links_managing.html) external links. If you do not have permission, the UI menu selections, buttons, and links you use to perform management tasks are not visible.</div>

## Navigating to an External Link

1. Right-click a series. The series context menu displays.
1. Select **External Links > \<linkname\>**, where \<linkname\> is the name specified when the link was created. Only series that match all the filters specified when the link was created display \<linkname\> in the External Links context menu. For example:

   ![External links](images/elk_external_link.png)

## Creating an External Link

1. Select **Browse > External Links**.
1. Click **Create External Link**.
1. Specify a link name and description.
1. Optionally specify metric name, source name, and point tag value filters as Javascript regular expressions that the series must match.
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
    <td>A point tag key and a regular expression that point tag values must match.</td>
    <td><strong>Tag Key</strong>=env<br/><strong>Filter Regex</strong>=prod\w+</td></tr></tbody></table>
    Specify the external link URL template. The template employs [Mustache syntax](https://mustache.github.io/). The properties supported by the template are:
    <table>
    <thead>
    <tr><th width="40%">Property</th><th width="60%">Description</th></tr>
    </thead>
    <tbody>
    <tr>
    <td>source</td>
    <td>The source of the series.</td>
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
    You can apply functions to transform their enclosed sections. All functions begin with the namespace `functions`.
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

## Example URL Template

Consider the following external link URL template, which references the point tag name `service`:

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

## Video Overview

Here's a video overview:

[Using External Links](https://youtu.be/oufjL7nM0LQ)
