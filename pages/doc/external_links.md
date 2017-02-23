---
title: External Links
keywords: external links
tags: [integrations]
sidebar: doc_sidebar
permalink: external_links.html
summary: This topic describes how to use external links.
---
{% include help/externallinks_intro.md %}

## Creating an External Link

1. Select **Browse > External Links**.
1. Click **Create External Link**.
1. Specify a link name and description.
1. Optionally specify metric name, source name, and point tag value filters as Javascript regular expressions that the series must match.
    <table>
    <tbody>
    <tr><th>Type</th><th>Description</th><th>Example</th></tr>
    <tr>
    <td>Metric Filter Regex</td>
    <td>A regular expression that metric names must match.</td>
    <td>jvm\.memory\.heap\w+</td>
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
    <tbody>
    <tr><th width="40%">Property</th><th width="60%">Description</th></tr>
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
    <tbody>
    <tr><th width="60%">Function</th><th width="40%">Description</th></tr>
    <tr>
    <td markdown="span">`urlEncode`</td>
    <td>URL Encoder</td>
    </tr>
    <tr>
    <td markdown="span">`epochMillisToEpochSeconds`</td>
    <td>Converts epoch milliseconds to epoch seconds.</td>
    </tr>
    <tr>
    <td markdown="span">`epochMillisToISO`</td>
    <td markdown="span">Converts epoch milliseconds to an [ISO8601](https://en.wikipedia.org/wiki/ISO_8601#Dates) representation.</td>
    </tr>
    <tr><td markdown="span">`epochMillisEra,epochMilliscenturyOfEra,
     epochMillisyearOfEra,epochMillisYearOfCentury,
     epochMillisYear,epochMillisMonthOfYear,
     epochMillisDayOfYear,epochMillisDayOfMonth,
     epochMillisWeekyear,epochMillisWeekOfWeekyear,
     epochMillisDayOfWeek,epochMillisHalfDayOfDay,
     epochMillisClockHourOfHalfday,epochMillisClockHourOfDay,
     epochMillisHourOfHalfday,epochMillisHourOfDay,
     epochMillisMinuteOfDay,epochMillisMinuteOfHour,
     epochMillisSecondOfDay,epochMillisSecondOfMinute,
     epochMillisMillisOfDay,epochMillisMillisOfSecond`
    </td>
    <td markdown="span">
    0 for BC, 1 for AD. See [Joda-Time - Java date and time API](http://joda-time.sourceforge.net/field.html).
    </td>
    </tr>
    </tbody>
    </table>
1. Click **Save**.

## Example
{% raw %}
```handlebars
http://<hostname>?time:(from:'{{#functions.epochMillisToISO}}{{startEpochMillis}}{{/functions.epochMillisToISO}}',to:'{{#functions.epochMillisToISO}}{{endEpochMillis}}{{/functions.epochMillisToISO}}'))&{{#functions.urlEncode}}host:{{source}} AND source:"/mnt/logs/{{service}}.log"{{/functions.urlEncode}}'))
```
{% endraw %}


{% include links.html %}
