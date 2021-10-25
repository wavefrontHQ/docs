---
title: Managing External Links
keywords: external links
tags: [integrations, videos]
sidebar: doc_sidebar
permalink: external_links_managing.html
summary: Learn how to manage external links.
---
External links provide integration between Wavefront and external systems.
* **External links** are general purpose: you can link through to any type of system accessible from a URL.
* The **Log integration** lets you drill down from a Wavefront time series to a log entry in a logging system such as Scalyr, ELK, or Splunk. See [Access and Examine External Logs](log_integration.html) for details.


Here's a video to get you started with external links:

<p><a href="https://youtu.be/oufjL7nM0LQ"><img src="/images/v_external_links.png" style="width: 700px;"/></a>
</p>


<div markdown="span" class="alert alert-info" role="alert">While every Wavefront user can view external links, you must have the [**External Links Management** permission](permissions_overview.html) to manage external links. If you do not have permission, the UI menu selections, buttons, and links you use to perform management tasks are not visible.</div>

## Navigate to an External Link

All users can use the right-click menu on a time series to navigate to an external link.
* By default, the external link shows up on all the time series.
* If the creator of the external link specified a filter, the **External Link** menu only shows the link on specified time series.

**To navigate to an external link:**
1. Right-click a series.
1. Select **External Links > \<linkname\>**, where \<linkname\> is the name specified when the link was created.

   ![External links](images/external_link_v2.png)

## Create an External Link

Users with **External Links** permission can create and modify external links.

1. Select **Browse > External Links**.
1. Click **Create External Link**.
1. Specify a link name and description.
2. Specify the [Link URL template](#link-url-template-syntax).
3. (Optional) Specify a filter to limit the external link from showing on a time series. For example, if you specify a point tag filter of `env=production`, you will only see the specified external link when you right click on a time series that has data related to that point tag.
4. Click **Save**.

### Link URL Template Syntax

The link URL template uses [Mustache syntax](https://mustache.github.io/). The template supports these properties:
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
    <td>Start time of the chart window, in Epoch time.</td>
    </tr>
    <tr>
    <td>endEpochMillis</td>
    <td>End time of the chart window, in Epoch time.</td>
    </tr>
    <tr>
    <td>&lt;pointTagName1&gt;, &lt;pointTagName2&gt;,...</td>
    <td>One or more point tag names associated with the series.</td>
    </tr>
    </tbody>
</table>

You can apply functions to transform the URL. All functions begin with the namespace `functions`. Simple examples are in the next section. 
<table>
    <thead>
    <tr><th width="50%">Function</th><th width="50%">Description</th></tr>
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
    <td>dateTimeFormat</td>
    <td markdown="span">Takes an Epoch time and formats it according to the format specified in format using Java's joda Date Time Format. </td>
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


### Link URL Template Examples

Here's the simplest possible example, directing you to the `example.com` domain.
{% raw %}
```handlebars
https://example.com/{{source}}
```
{% endraw %}

The following external link URL template goes to `scalyr.com` and passes in the source of the series and the start and end time of the chart if a user right-clicks on a series.

{% raw %}
```handlebars
https://www.scalyr.com/events?logSource={{{source}}}&startTime={{startEpochMillis}}&endTime={{endEpochMillis}}
```
{% endraw %}

The next external link URL template looks for a service trace in the distributed traces.

{% raw %}
```handlebars
https://demo.wavefront.com/tracing/service/{{namespace_name}}/{{container_name}}#_v01(g:(d:7200,ls:!t,s:{{#functions.epochMillisToEpochSeconds}}{{startEpochMillis}}{{/functions.epochMillisToEpochSeconds}},e:{{#functions.epochMillisToEpochSeconds}}{{endEpochMillis}}{{/functions.epochMillisToEpochSeconds}}),p:(cluster:(v:'*'),shard:(v:'*'),source:(v:'*')))
```
{% endraw %}

The following external link URL template displays an event on the Events page when you click the event in a chart.

Replace `<my_instance>` with the name of your Wavefront instance.

{% raw %}
```handlebars
https://<my_instance>.wavefront.com/events?search=%7B%22searchTerms%22%3A%5B%7B%22type%22%3A%22freetext%22%2C%22value%22%3A%22{{alertId}}%22%7D%5D%2C%22sortOrder%22%3A%22ascending%22%2C%22sortField%22%3Anull%2C%22pageNum%22%3A1%2C%22cursor%22%3A%22%22%2C%22direction%22%3A%22forward%22%2C%22timeRange%22%3A%7B%22start%22%3A{{startEpochMillis}}%2C%22quickTime%22%3Anull%2C%22end%22%3A{{endEpochMillis}}%7D%7D&tagPathTree=%7B%7D
```
{% endraw %}

The following external link URL template references the point tag name `service`:

{% raw %}
```handlebars
http://<hostname>?time:(from:'{{#functions.epochMillisToISO}}{{startEpochMillis}}{{/functions.epochMillisToISO}}',to:'{{#functions.epochMillisToISO}}{{endEpochMillis}}{{/functions.epochMillisToISO}}'))&{{#functions.urlEncode}}host:{{source}} AND source:"/mnt/logs/{{service}}.log"{{/functions.urlEncode}}'))
```
{% endraw %}

To get a date in this format: `2020-07-16T21:00:00.000Z` you could do this:
```handlebars
{% raw %}
{{#functions.dateTimeFormat}}
  {{#functions.format}}YYYY-MM-dd'T':HH:mm:ss.SSS'Z'{{/functions.format}}
  {{startEpochMillis}}
{{/functions.dateTimeFormat}}
```
{% endraw %}


### Filter Regex Syntax

Filters are optional but allow you to show the external link only on certain time series.

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
    <td>Regular expression that metric names must match.</td>
    <td>jvm.memory.heap\w+</td>
    </tr>
    <tr>
    <td>Source Filter Regex</td>
    <td>Regular expression that source names must match.</td>
    <td>co-2a-app[0-9]+-i-\d+</td>
    </tr>
    <tr>
    <td>Point Tag Filter Regexes</td>
    <td>Point tag key and a regular expression that point tag values must match. Click the plus sign after you specify the regex. </td>
    <td><strong>Tag Key</strong>=env<br/><strong>Filter Regex</strong>=prod\w+</td></tr></tbody>
</table>

### Filter Regex Example

When you specify a filter, only time series that match the filter shows the external link option.

The following screenshot shows an example that specifies all three types of filters.

![Example filters for external links](images/edit_external_links_example.png)
