---
title: Managing External Logs
keywords: log integrations 
tags: [integrations]
sidebar: doc_sidebar
permalink: log_integration.html
summary: Learn how to manage and view external logs.
---
The log integration lets you drill down from Wavefront to a log entry if you are using a logging systems such as Scalyr, ELK, or Splunk.

Suppose while analyzing metrics data you find an anomaly such as an unexpected drop in transaction rate. You want to look at corresponding log entries. Log integration allow you to click through from a Wavefront series directly to a related entry in your
logging system.

<div markdown="span" class="alert alert-info" role="alert">While every Wavefront user can view external links, you must have [External Links Management permission](permissions_overview.html) to [manage external links](external_links_managing.html) and create log integrations. If you do not have permission, the UI menu selections, buttons, and links you use to perform management tasks are not visible.</div>

## Navigate to External Logs

All users can use the right-click menu on a time series to navigate to an integration log.
* By default, integration logs shows up on all time series.
* If you specify a filter, the **Log Integration** menu only shows up on specified time series.

**To navigate to an external link:**
1. Right-click a series.
1. Select **Log Integration > \<name\>**, where \<name\> is the name specified when the integration log was created.

   ![Integration Logs](images/log_integrations_select.png)

## Create a Log Integration

Users with **External Links** permission can create and modify integration logs.

1. Select **Browse > Create Log Integration**.
1. Specify a link name and description.
1. Specify the Link URL template.
    <ul id="profileTabs" class="nav nav-tabs">
        <li class="active"><a href="#urltemplate" data-toggle="tab">Link URL Template Syntax</a></li>
        <li><a href="#templateexample" data-toggle="tab">Link URL Template Examples</a></li>
    </ul>
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="urltemplate">
          <p>The link URL template uses <a href="https://mustache.github.io/">Mustache syntax</a>". The template supports the properties given below.</p>
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

          <p>You can apply functions to transform the URL. All functions begin with the namespace <code>functions</code>.</p>
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
              <td>Converts epoch milliseconds to an <a href="https://en.wikipedia.org/wiki/ISO_8601#Dates">ISO8601</a> representation.</td>
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
              <td>
              0 for BC, 1 for AD. See <a href="http://joda-time.sourceforge.net/field.html">Joda-Time - Java date and time API</a>.
              </td>
              </tr>
              </tbody>
          </table>
        
        </div>

        <div role="tabpanel" class="tab-pane" id="templateexample">

          <ul>
          <li>Here's the simplest possible example, directing you to the `example.com` domain.

          <pre>
https://example.com/&lcub;&lcub;source&rcub;&rcub;
          </pre>
          </li>
          
          <li>The following external link URL template goes to <code>scalyr.com</code> and passes in the source of the series and the start and end time of the chart if a user right-clicks on a series.

          <pre>
https://www.scalyr.com/events?logSource=&lcub;&lcub;&lcub;source}}}&startTime=&lcub;&lcub;startEpochMillis}}&endTime=&lcub;&lcub;endEpochMillis}}
          </pre>
          </li>
          
          <li>The next external link URL template looks for a service trace in the distributed traces.

          <pre>
https://demo.wavefront.com/tracing/service/&lcub;&lcub;namespace_name}}/&lcub;&lcub;container_name}}#_v01(g:(d:7200,ls:!t,s:&lcub;&lcub;#functions.epochMillisToEpochSeconds}}&lcub;&lcub;startEpochMillis}}&lcub;&lcub;/functions.epochMillisToEpochSeconds}},e:&lcub;&lcub;#functions.epochMillisToEpochSeconds}}&lcub;&lcub;endEpochMillis}}&lcub;&lcub;/functions.epochMillisToEpochSeconds}}),p:(cluster:(v:'*'),shard:(v:'*'),source:(v:'*')))
          </pre>
          </li>
          
          <li>The following external link URL template displays an event on the Events page when you click the event in a chart. Replace <code>&lt;my_instance&gt;</code> with the name of your Wavefront instance.
          <pre>
https://&lt;my_instance&gt;.wavefront.com/events?search=%7B%22searchTerms%22%3A%5B%7B%22type%22%3A%22freetext%22%2C%22value%22%3A%22&lcub;&lcub;alertId}}%22%7D%5D%2C%22sortOrder%22%3A%22ascending%22%2C%22sortField%22%3Anull%2C%22pageNum%22%3A1%2C%22cursor%22%3A%22%22%2C%22direction%22%3A%22forward%22%2C%22timeRange%22%3A%7B%22start%22%3A&lcub;&lcub;startEpochMillis}}%2C%22quickTime%22%3Anull%2C%22end%22%3A&lcub;&lcub;endEpochMillis}}%7D%7D&tagPathTree=%7B%7D
          </pre>
          </li>
          
          <li>The following external link URL template references the point tag name <code>service</code>:
          <pre>
http://&lt;hostname&gt;?time:(from:'&lcub;&lcub;#functions.epochMillisToISO}}&lcub;&lcub;startEpochMillis}}&lcub;&lcub;/functions.epochMillisToISO}}',to:'&lcub;&lcub;#functions.epochMillisToISO}}&lcub;&lcub;endEpochMillis}}&lcub;&lcub;/functions.epochMillisToISO}}'))&&lcub;&lcub;#functions.urlEncode}}host:&lcub;&lcub;source}} AND source:"/mnt/logs/&lcub;&lcub;service}}.log"&lcub;&lcub;/functions.urlEncode}}'))
          </pre>
          </li>
          </ul>

        </div>
      </div>
    
1. (Optional) Specify a filter to limit the integration log from showing on a time series. For example, if you specify a point tag filter of `env=production`, you will only see the specified log integration when you right click on a time series that has data related to that point tag.
    <ul id="profileTabs" class="nav nav-tabs">
        <li class="active"><a href="#filtersyntax" data-toggle="tab">Filter Regex Syntax</a></li>
        <li><a href="#filterexample" data-toggle="tab">Filter Regex Example</a></li>
    </ul>
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="filtersyntax">
        <p>Filters are optional but allow you to show the external link only on certain time series.</p>

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
        </div>

        <div role="tabpanel" class="tab-pane" id="filterexample">
        When you specify a filter, only time series that match the filter show the right-button menu for the log integration.

        The following screenshot shows an example that specifies all three types of filters.
        <img src="images/log_integration_filter_syntax.png" alt="Example filters for log integration"/>
        </div>
      </div>
1. Click **Save**.

## Manage Log Integrations

To update or delete a log integration, click **Browse** > **External Links**. This page lists all the log integrations and [external links](external_links_managing.html) you have created.
Example:
![List of external links and log integrations](images/external_links_list.png)
