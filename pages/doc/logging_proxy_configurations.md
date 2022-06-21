---
title: Logs Poroxy Configurations (Beta)
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_proxy_configurations.html
summary: Learn about the Tanzu Observability proxy configurations and preprocessor rules.
---

Configure the Wavefront proxy to receive your log data and customize the data you send using preprocessor rules.

## Configure the Proxy

This section gives details on proxy configuration properties used for Tanzu Observability logs.

### Configure the properties

Follow these steps: 

1. [Install the Wavefront Proxy](proxies_installing.html).
    If you have already installed the Wavefront proxy, make sure it is version 11 or later. 
1. Open the [`wavefront.conf` file](proxies_configuring.html#proxy-file-paths):
    1. Uncomment the `pushListnerPorts` and set it to a preferred port. It is set to 2878 by default to receive both HTTP and TCP data. For details on the proxy configurations, see [Advanced Proxy Configuration](Advanced Proxy Configuration).
    1. Optionally, uncomment or add the other configurations listed below.
    1. Save the file.
1. [Start the proxy](proxies_installing.html#start-and-stop-a-proxy).

### Proxy Configurations for Logs

See the Wavefront proxy configuration used for logs:

<table style="width: 100%;">
<thead>
<tr>
<th width="27%">Property</th>
<th width="43%">Purpose</th>
<th width="30%">Format /Example </th>
</tr>
</thead>
<tbody>
<tr>
<a name="customTimestampTags"></a>
<td>customTimestampTags</td>
<td markdown="span"> A comma-separated list of log tag keys that needs to be treated as the timestamp if the `timestamp` or `log_timestamp` tag is missing.
<br/> Default: None.
<br/> Version: Since 11.0</td>
<td> Comma-separated list of tags. Can be a single tag.
<br/>Example:sent_time</td>
</tr>
<tr>
<a name="customMessageTags"></a>
<td>customMessageTags</td>
<td markdown="span">A comma-separated list of log tag keys that needs to be treated as the message if the `message` or `text` tag is missing.
<br/> Default: None.
<br/> Version: Since 11.0</td>
<td> Comma-separated list of tags. Can be a single tag.
<br/> Example:debug_log</td>
</tr>
<tr>
<a name="pushFlushMaxLogs"></a>
<td>pushFlushMaxLogs</td>
<td markdown="span">Maximum number of logs in a single flush.
<br/> Default: 50.
<br/> Version: Since 11.0</td>
<td> Number from 0-50.</td>
</tr>
<tr>
<a name="pushRateLimitLogs"></a>
<td>pushRateLimitLogs</td>
<td markdown="span">Limit the outgoing logs rate at the proxy.
<br/> Default: NO_RATE_LIMIT.
<br/> Version: Since 11.0</td>
<td> Positive integer.
<br/>Example: 10000</td>
</tr>
<tr>
<a name="pushFlushIntervalLogs"></a>
<td>pushRateLimitLogs</td>
<td markdown="span">Milliseconds between sending batches of logs.
<br/> Default: 1000.
<br/> Version: Since 11.0</td>
<td> Number of milliseconds.
<br/>Example: 2000</td>
</tr>
<tr>
<a name="flushThreadsLogs"></a>
<td>flushThreadsLogs</td>
<td markdown="span"> Number of threads that flush data to the server. This setting is per push listener port. 
<br/>If you set a large value, the number of logs that are included in a batch will be small, and it will be expensive because you need to connect to the server several times.
<br/> Default: 4
<br/> Version: Since 11.0</td>
<td> Positive integer.
<br/>Example: 5</td>
</tr>
<tr>
<a name="pushMemoryBufferLimitLogs"></a>
<td>pushMemoryBufferLimitLogs</td>
<td markdown="span"> Maximum number of logs that can stay in the proxy memory buffers before spooling to disk. Defaults to 16 times pushFlushMaxLogs. The minimum value you can set is the value your defined for pushFlushMaxLogs. If the value is lower than the default value, it reduces memory usage but will force the proxy to spool to disk more frequently when the logs data points arrive at the proxy in short bursts.
<br/> Default: 16*pushFlushMaxLogs
<br/> Version: Since 11.0</td>
<td> Positive integer.
<br/>Example: 17</td>
</tr>
<tr>
<a name="blockedLogsLoggerName"></a>
<td>blockedLogsLoggerName</td>
<td markdown="span"> Logger name for blocked logs.
<br/> Default: RawBlockedLogs
<br/> Version: Since 11.0</td>
<td> A string.</td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="proxies_configuring.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## Proxy Preprocessor Rules for Logs

The Wavefront proxy includes a preprocessor that applies rules before the log data is sent to Tanzu Observability. Logs store data in tags, that are key value pairs. The rules listed below, update the log tag key and values.
For details on how to configure the rules, see Rule Configuration File](proxies_preprocessor_rules.html#rule-configuration-file).

### logReplaceRegex

Replaces content in the tag value.

<font size="3"><strong>Parameters</strong></font>

<table>
<colgroup>
<col width="15%" />
<col width="85%" />
</colgroup>
<thead>
<tr>
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>action</td>
<td>logReplaceRegex</td>
</tr>
<tr>
<td>scope</td>
<td>Rule applies to the value of the specified log tag key</td>
</tr>
<tr>
<td>search</td>
<td>Search pattern. All substrings matching this pattern are replaced with the replacement string.</td>
</tr>
<tr>
<td>replace</td>
<td>Replacement string. The empty string is allowed. Refer to a capturing group in the search regex using $ and its number (starting from 1). For example, use $1 to refer to the first group.</td>
</tr>
<tr>
<td>match (optional)</td>
<td>Regular expression. If specified, extract the tag only if the span name, source name, or span tag matches this regular expression.</td>
</tr>
<tr>
<td>iterations (optional)</td>
<td>Number of iterations. Recursively check and recursively replace if the output string contains the search string until the number of iterations is reached.</td>
</tr>
<tr>
<td>firstMatchOnly (optional)</td>
<td>If set to true, performs string replacement only on the first matching span tag’s value. Only applicable when scope is a span tag. Default is false.</td>
</tr>
</tbody>
</table>


<font size="3"><strong>Examples</strong></font>

```yaml
# searches for the word foo on the tag value if the tag key is message, and replaces the word foo with bar.
- rule          : test-logreplaceregex
  action        : logReplaceRegex
  scope         : message
  search        : foo
  replace       : bar
```

### logForceLowercase
Converts the tag key to lowercase.

<font size="3"><strong>Parameters</strong></font>

<table>
<colgroup>
<col width="15%" />
<col width="85%" />
</colgroup>
<thead>
<tr>
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>action</td>
<td>forceLowercase</td>
</tr>
<tr>
<td>scope</td>
<td>Rule applies to the value of the specified log tag key.</td>
</tr>
<tr>
<td>match (optional)</td>
<td>Regular expression. If specified, convert a tag to lower case only if its value matches this regular expression.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Example</strong></font>

```yaml

# forces the sourceName tag key to lowercase: (sourcename)
 - rule          : test-logforcelowercase
   action        : logForceLowercase
   scope         : sourceName
```

### logAddAnnotation

### logAddAnnotationIfNotExists

### logDropAnnotation

### logExtractAnnotation

### logExtractAnnotationIfNotExists

### logRenameAnnotation

### logLimitLength

### logBlacklistRegex

### logWhitelistRegex

### logAllowAnnotation
