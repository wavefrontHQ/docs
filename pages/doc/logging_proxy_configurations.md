---
title: Logs Proxy Configurations and Preprocessor Rules
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_proxy_configurations.html
summary: Proxy configuration properties and preprocessor rules for ingesting logs into VMware Tanzu Observability (formerly known as VMware Aria Operations for Applications).
---

{% include important.html content="The Logs feature is enabled only for selected customers. To participate, contact your account representative or [technical support](wavefront_support_feedback.html#support)."%}

Proxy configuration properties let you customize proxy behavior. Proxy preprocessor rules let you block, allow, or replace parts of the incoming traffic. This doc page is a reference to properties specific to the Logs feature. See [Advanced Proxy Configuration](proxies_configuring.html) and [Proxy Preprocessor Rules](proxies_preprocessor_rules.html) for the properties and rule options for other kind of data.

## Proxy Configuration Properties for Logs

If your logs don't use the attributes that our logging solution expects, or if you want to customize proxy behavior otherwise, you can use proxy configuration properties to do that.

We've added the following configuration properties for logs to the already existing [proxy configuration properties](proxies_configuring.html).

### Properties for Changing Log Tags

{% include tip.html content="See [My Logging Solution Doesn't Use the Default Attributes](logging_faq.html#my-logging-solution-doesnt-use-the-default-attributes)."%}

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
<td markdown="log tag"> Comma-separated list of log tag keys that are treated as the timestamp if your logging solution doesn't send a <code>timestamp</code> or <code>log_timestamp</code> tag.
<br/> Default: None.
<br/> Version: Since 11.3</td>
<td> Comma-separated list of tags. Can be a single tag.
<br/>Example: sent_time</td>
</tr>
<tr>
<a name="customMessageTags"></a>
<td>customMessageTags</td>
<td markdown="span">Comma-separated list of log tag keys that are treated as the log message if your logging solution doesn't send a `message` or `text` tag.
<br/> Default: None.
<br/> Version: Since 11.3</td>
<td> Comma-separated list of tags. Can be a single tag.
<br/> Example: debug_log</td>
</tr>
<tr>
<a name="customApplicationTags"></a>
<td>customApplicationTags</td>
<td markdown="span">Comma-separated list of log tag keys that are treated as the application name if your logging solution doesn't send an `application` tag.
<br/> Default: none
<br/> Version: Since 11.3</td>
<td> Comma separated list of log tags. Can be a single tag.
<br/>Example: supermarket</td>
</tr>
<tr>
<a name="customServiceTags"></a>
<td>customServiceTags</td>
<td markdown="span">Comma-separated list of log tag keys that are treated as the service name if your logging solution doesn't send a `service` tag.
<br/> Default: none
<br/> Version: Since 11.3</td>
<td> Comma separated list of tags. Can be a single tag.
<br/>Example: groceries, payment</td>
</tr>
<tr>
<a name="customExceptionTags"></a>
<td>customExceptionTags</td>
<td markdown="span">Comma separated list of log tag keys that are treated as the exception if the logging solution doesn't send a tag named `exception`. 
<br/> Default: exception, error_name
<br/> Version: Since 11.3</td>
<td> Comma separated list of tags. Can be a single tag.
<br/>Example: warn, error</td>
</tr>
<tr>
<a name="customLevelTags"></a>
<td>customLevelTags</td>
<td markdown="span">Comma separated list of log tag keys that are treated as the log level if the logging solution doesn't send a tag named `level`.
<br/> Default: level, log_level
<br/> Version: Since 11.3</td>
<td> Comma separated list of tags. Can be a single tag.
<br/>Example: log_level</td>
</tr>
</tbody>
</table>


### Properties for Modifying Proxy Behavior

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
<a name="pushRateLimitLogs"></a>
<td>pushRateLimitLogs</td>
<td markdown="span">Limit the outgoing logs rate at the proxy, in MB/s.
<br/> Default: NO_RATE_LIMIT.
<br/> Version: Since 11.3</td>
<td> Positive integer.
<br/>Example: 1</td>
</tr>
<tr>
<a name="pushFlushIntervalLogs"></a>
<td>pushFlushIntervalLogs</td>
<td markdown="span">Milliseconds between sending batches of logs.
<br/> Default: 1000.
<br/> Version: Since 11.3</td>
<td> Number of milliseconds.
<br/>Example: 2000</td>
</tr>
<tr>
<a name="pushFlushMaxLogs"></a>
<td>pushFlushMaxLogs</td>
<td markdown="span"> The maximum size of the log payload that is sent to the server in a single flush. The value needs to be in Bytes. If the log exceeds the value mentioned here, the log is not sent to the server.
<br/> Default: 4194304 (4 MB)
<br/> Version: Since 12.0</td>
<td> A value between 1048576 and 5242880 (1 MB and 5 MB).
<br/>Example: 3145728</td>
</tr>
<tr>
<a name="flushThreadsLogs"></a>
<td>flushThreadsLogs</td>
<td markdown="span"> Number of threads that flush data to the server. This setting is per push listener port.
<br/>If you set a large value, for example 10, then the number of logs that are included in a batch will be small and sending logs will be expensive (e.g. CPU-intensive) because you need to connect to the server several times.
<br/> Default: 4
<br/> Version: Since 11.3</td>
<td> Positive integer.
<br/>Example: 5</td>
</tr>
<tr>
<a name="pushMemoryBufferLimitLogs"></a>
<td>pushMemoryBufferLimitLogs</td>
<td> Maximum number of logs that can stay in the proxy memory buffer before spooling to disk. Change this property based on how much memory capacity for the proxy your system has.
<ul>
<li>
 If the value is higher, the proxy is better able to handle surges. </li>
<li>If the value is lower, it reduces memory usage but will force the proxy to spool to disk more frequently when the logs data points arrive at the proxy in short bursts. </li>
<li>If the limit is the same as the memory heap limit, the proxy ignores the limit you have set here.</li>
 </ul>
<br/> Default: 64
<br/> Version: Since 11.3</td>
<td> Positive integer.
<br/>Example: 70</td>
</tr>
<tr>
<a name="blockedLogsLoggerName"></a>
<td>blockedLogsLoggerName</td>
<td markdown="span"> Logger name for blocked logs in the proxy log.
<br/> Default: RawBlockedLogs
<br/> Version: Since 11.3</td>
<td>A string.
<br/>Example: blockedLogs</td>
</tr>
</tbody>
</table>

### Properties for VMware Cloud Services Subscriptions

{% include note.html content="Starting July 3, 2023, Tanzu Observability is a service on the VMware Cloud services platform. After this date, we support two types of subscriptions: Tanzu Observability subscriptions **onboarded** to the VMware Cloud services platform and **original** subscriptions. Original subscriptions are the existing ones and they remain as is until they migrate to VMware Cloud services. The content in this section is valid for **onboarded** subscribers. For information about original and new subscriptions and the differences between them, see [Subscription Types](subscriptions-differences.html)." %}

VMware Cloud services provides access to both VMware Aria Operations for Logs (SaaS) and Tanzu Observability. Therefore, to send logs data and see the data on the Tanzu Observability Logs Browser, you must configure the proxy with the Operations for Logs URL and token. 


<table style="width: 100%;">
  <thead>
    <tr>
      <th width="30%">Property</th>
      <th width="70%">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <a name="logServerIngestionURL"></a>
      <td>
        logServerIngestionURL
      </td>
      <td markdown="span">
        The URL you use to send data to Operations for Logs.
      </td>
    </tr>
    <tr>
      <a name="logServerIngestionToken"></a>
      <td>
        logServerIngestionToken
      </td>
      <td markdown="span">
        The authorization token that was given by Operations for Logs.
      </td>
    </tr>
  </tbody>
</table>

## Proxy Preprocessor Rules for Logs

The Wavefront proxy includes a preprocessor that applies rules before the log data is sent to our service. Logs store data in tags, that are key-value pairs. The rules listed below, update the log tag value.

{% include note.html content="For details on how to configure the rules, see [Rule Configuration File](proxies_preprocessor_rules.html#rule-configuration-file)." %}



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
<td>Regular expression. If specified, extract the tag only if the log tag matches this regular expression.</td>
</tr>
<tr>
<td>iterations (optional)</td>
<td>Number of iterations. Recursively check and recursively replace if the output string contains the search string until the number of iterations is reached.</td>
</tr>
<tr>
<td>firstMatchOnly (optional)</td>
<td>If set to true, performs string replacement only on the first matching log tag’s value. Only applicable when scope is a log tag. Default is false.</td>
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
<td>logForceLowercase</td>
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

### logAddTag and logAddTagIfNotExists

Add a log tag to all logs.
* `logAddTag` adds the new log tag and assigns the new value to it. If you want to update the value of a log tag, you need to [drop the log tag](#logdroptag) and add it again.
* `logAddTagIfNotExists` adds the log tag only if it does not already exist.

{% include note.html content="You can add up to 100 log tags. Contact your account representative if this does not meet your requirements." %}

<font size="3"><strong>Parameters</strong></font>

<table width="100%">
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
<td>logAddTag <br>
logAddTagIfNotExists</td>
</tr>
<tr>
<td>key</td>
<td>New log tag name.</td>
</tr>
<tr>
<td>value</td>
<td>New log tag value.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Example</strong></font>

```yaml
# adds customTag1:val1 to all the log data.
- rule          : test-logaddannotation
  action        : logAddTag
  key           : customTag1
  value         : "val1"

################################################################

# adds customTag2:val2 if customTag1 does not already exist
# this rule will not be active because customTag1 was added in previous rule
- rule          : test-logaddTagifnotexists
 action        : logAddTagIfNotExists
 key           : customTag1
 value         : "val2"

```

### logDropTag

Removes a log tag that matches a regex string.

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
<td>logDropTag</td>
</tr>
<tr>
<td>key</td>
<td>Log tag name (or a regex matching the tag name).</td>
</tr>
<tr>
<td>match (optional)</td>
<td>If specified, remove a tag only if its value matches this regular expression.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Examples</strong></font>

```yaml
# drops the datacenter tag if the value matches az4, az5, az6.
 - rule          : test-logDropTag
   action        : logDropTag
   key           : datacenter
   match         : "az[4-6]"

```

### logExtractTag and logExtractTagIfNotExists

Extract a string from a log tag name, or a tag tag value and create a new log tag from that string.
* For `logExtractTag`, create the new log tag.
* For `logExtractTagIfNotExists`, do not create the new log tag if at least one tag with this name already exists.

<font size="3"><strong>Parameters</strong></font>

<table>
<colgroup>
<col width="15%" />
<col width="85%" />
</colgroup>
<thead>
<tr>
<th>Parameter</th>
<th>Description<br />
</th>
</tr>
</thead>
<tbody>
<tr>
<td>action</td>
<td>logExtractTag<br>logExtractTagIfNotExists</td>
</tr>
<tr>
<td>key</td>
<td>New tag name.</td>
</tr>
<tr>
<td>input</td>
<td>Rule applies to the value of the specified log tag (annotation) key.</li>
</ul></td>
</tr>
<tr>
<td>match (optional)</td>
<td>Regular expression. If specified, extract a tag only if the log tag value matches this regular expression.</td>
</tr>
<tr>
<td>search</td>
<td>Regex pattern to extract the value from.</td>
</tr>
<tr>
<td>replace</td>
<td>String or pattern that will be used as a value for the new log tag. An empty string is allowed. Refer to a capturing group in the search regex using $ and its number (starting from 1). For example, use $1 to refer to the first group. </td>
</tr>
<tr>
<td>replaceInput (optional)</td>
<td>Modify the name of the input. Refer to a capturing group in the search regex using $ and its number (starting from 1). For example, use $1 to refer to the first group.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Examples</strong></font>

```yaml
# turns tagtoExtract:foobar to tagToExtract:fooar and extractedTag:b
 - rule          : test-logExtractAnnotation
   action        : logExtractAnnotation
   key           : extractedTag
   input         : tagToExtract
   search        : "(foo)(b)(ar)"
   replace       : "$2"
   replaceInput  : "$1$3"

```

```yaml
# same as logExtractAnnotation. if tagToExtract already exist, this rule never runs because the tag is already there.
- rule          : test-logextracttagifnotexists
  action        : logExtractAnnotationIfNotExists
  key           : extractedTag
  input         : tagToExtract
  search        : "(foo)(b)(ar)"
  replace       : "$1"
  replaceInput  : "$2$3"
```


### logRenameTag

Renames a log tag. The renaming does not affect the values stored in a log.

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
<td>logRenameTag</td>
</tr>
<tr>
<td>key</td>
<td>The log tag to be renamed.</td>
</tr>
<tr>
<td>newkey</td>
<td>The new name for the log tag.</td>
</tr>
<tr>
<td>match (optional)</td>
<td>If specified, renames a log tag if its value matches this regular expression.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Example</strong></font>

```yaml
# replaces the tag name myDevice with device
- rule          : test-logrenameannotation
 action        : logRenameAnnotation
 key           : myDevice
 newkey        : device
```

### logLimitLength

Truncate or drop log tags if tag value length exceeds the limit.

Available action subtypes are `truncate`, `truncateWithEllipsis`, and `drop`.

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
<td>loglimitLength </td>
</tr>
<tr>
<td>scope</td>
<td>Rule applies to the value of the specified log tag (annotation) key.</td>
</tr>
<tr>
<td>actionSubtype</td>
<td>Allows you to determine how we limit length:
<ul>
<li><strong>drop</strong>&mdash;Drops requested scope if the value is greater than maxLength. You can't use DROP with the source name.</li>
<li><strong>truncate</strong>&mdash;Truncates requested scope if the value is greater than maxLength.</li>
<li><strong>truncateWithEllipsis</strong>&mdash;Truncates the requested scope if the value is greater than maxLength but preserves the ellipsis (three dots). maxLength must be at least 3 for this action type.</li>
</ul></td>
</tr>
<tr>
<td>maxLength</td>
<td>The maximum length of a log tag value. The length of the input must be greater than the maxLength for rule to be applied.</td>
</tr>
<tr>
<td>match (optional)</td>
<td>Regular expression. If specified, remove a tag if its value matches this regular expression.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Example</strong></font>

```yaml
# Truncate messages longer than 1000 characters
- rule          : test-loglimitlength
  action        : logLimitLength
  maxLength     : 1000
  scope         : message
  actionSubtype : truncate
```

### logBlock

Defines a regex that the log tags must match to be filtered out.

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
<td>logBlock </td>
</tr>
<tr>
<td>scope</td>
<td> Rule applies to the value of the specified log tag key after the value is parsed.</li>
</ul></td>
</tr>
<tr>
<td>match</td>
<td>A regex pattern that input lines must match to be filtered out.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Examples</strong></font>

```yaml
# reject all logs that contain tagToBlockList:[only lower case alphabets]
- rule          : test-logBlock
  action        : logBlock
  match         : "^[a-z]+"
  scope         : tagToBlockList
```

### logAllow

Points must match the `allow` list to be accepted. Multiple `allow` rules are allowed. A log tag must match all rules.

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
<td>logAllow</td>
</tr>
<tr>
<td>scope</td>
<td>Rule applies to the value of the specified log tag key after the value is parsed.</li>
</ul></td>
</tr>
<tr>
<td>match</td>
<td>A regex pattern that input lines must match to be accepted.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Examples</strong></font>

```yaml
# only allow logs that contain tagToWhiteList:[only numbers]
 - rule          : test-logAllowRegex
   action        : logAllow
   match         : "^[0-9]+"
   scope         : tagToAllowList
​
# removes all annotations not in the specified list
 - rule: test-logAllowAnnotations
   action: logAllow
   allow:
     - customTag1
     - tagToExtract
     - extractedTag
     - device
     - tagToAllowList
```

## Learn More!

* [Get started with logs](logging_overview.html).
* [Send logs](logging_send_logs.html).
* [View and browse logs](logging_log_browser.html).
* See [Logs troubleshooting](logging_faq.html).

