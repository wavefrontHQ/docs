---
title: Configuring Wavefront Proxy Preprocessor Rules
keywords:
tags: [proxies]
sidebar: doc_sidebar
permalink: proxies_preprocessor_rules.html
summary: Learn how to configure Wavefront proxy preprocessor rules.
---
Starting with version 4.1, the Wavefront proxy includes a preprocessor that applies rules before data is sent to Wavefront. We support:
* Point filtering rules
* Point altering rules
* Span filtering rules (new in proxy 4.38)
* Span altering rules (new in proxy 4.38)

The rules make it possible to address data quality issues in the data flow when fixing the problem at the source is not possible. For example, you could have a rule "before the point line is parsed, replace invalid characters with underscores" to allow points that would be rejected to get to the Wavefront service.

## Rule Configuration File

You define the proxy preprocessor rules in a rule configuration file, usually `<wavefront_config_path>/preprocessor_rules.yaml`, using YAML syntax. You can specify rule filenames in your [proxy configuration](proxies_configuring.html#proxy-configuration). An example rule file could look like this:

```yaml
# rules for port 2878
'2878':
  # replace bad characters ("&", "$", "!", "@") with underscores in the entire point line string
  ################################################################
  - rule    : replace-badchars
    action  : replaceRegex
    scope   : pointLine
    search  : "[&\\$!@]"
    replace : "_"

  #  remove "az" point tag if its value starts with "dev"
  ################################################################
  - rule    : drop-az-tag
    action  : dropTag
    tag     : az
    match   : dev.*

# rules for port 4242
'4242':
  #  remove "az" point tag if its value starts with "dev"
  ################################################################
  - rule    : drop-az-tag
    action  : dropTag
    tag     : az
    match   : dev.*

  ...
```

You can define separate rules for each listening port.  The example above defines 2 rules for port 2878 and 1 rule for port 4242.

## Rule Syntax and Parameters

All rules have required parameters listed for each rule below.

### Parameters

Every rule must have
* A `rule` parameter that contains the rule ID. Rule IDs can contain alphanumeric characters, dashes, and underscores and should be descriptive and unique within the same port. In the example above, the `drop-az-tag` rule is defined with the same identifier for both ports, 2878 and 4242.
* An `action` parameter that contains the action to perform

Additional parameters depend on the rule you're defining, for example, a `whitelistregex` rule must have a `scope` and a `match` parameter.

### Scope for Metrics

If a rule for metrics has a `scope` parameter, the preprocessor applies the rule to metrics as follows:

* `pointLine` -- Rule applies to the whole point line before it's parsed (can be used with Wavefront and Graphite formats only)
* `metricName` -- Rule applies only to the *metric name* after the point is parsed
* `sourceName` -- Rule applies only to the *source name* after the point is parsed
* point tag -- Rule applies to the value of a point tag with this name, after the point is parsed.


### Scope for Spans

If a rule for spans has a `scope` or `source` parameter, the preprocessor applies the rule to spans as follows:

* `spanName` -- Rule applies only to *span name* of the span.
* `sourceName` -- Rule applies only to the *source name* of span.
* tag -- If you specify any other value for the `scope` parameter the rule applies to span annotations/tag keys.



### Regex Notes

-   Backslashes in regex patterns must be double-escaped. For example, to match a dot character ("."), use `\\.`.
-   Regex patterns in the `match` parameter are a full match. For example, a regex to block the point line that contains `stage` substring is `.*stage.*`.
-   Regex patterns in the `replaceRegex` rule `search` parameter are a substring match. If `search` is "A" and `replace` is "B", all A's are replaced with B's.

## Enabling the Preprocessor

To enable the preprocessor:
1. Add (or uncomment) the `preprocessorConfigFile` property in the [Wavefront proxy configuration file](proxies_configuring.html)
2. Set `preprocessorConfigFile` to a valid path to the rules configuration file.

### Validation

The rules file is validated when the proxy starts and the start-up process is aborted if any of the rules are not valid. A detailed error message is provided for every rule that fails validation.

### Metrics for Rules

For every rule the Wavefront proxy reports a counter metric  that shows how often the rule has been successfully applied. The rule ID becomes part of the proxy metric `~agent.preprocessor.<ruleID>.count`, for example, `~agent.preprocessor.replace-badchars.count`. For information on proxy metrics, see [Monitoring Wavefront Proxies](monitoring_proxies.html).

## Point Filtering Rules

Point filtering rules support a more flexible version of the proxy [`whitelistRegex` and `blacklistRegex`](proxies_configuring.html#proxy-configuration) properties, and is fully backwards compatible.

### blacklistRegex

Defines a regex that points must match to be filtered out.

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
<td>blacklistRegex. Required. </td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>pointLine&mdash;Applies to the whole point line before it's parsed (can be used with Wavefront and Graphite formats only) </li>
<li>metricName&mdash;Applies only to the metric name after the point is parsed</li>
<li>sourceName&mdash;Applies only to the source name after the point is parsed</li>
<li>&lt;point tag&gt;&mdash;Any other value of the &quot;scope&quot; parameter applies to the value of a point tag with this name, after the point is parsed.</li>
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
  # block all points with sourceName that starts with qa-statsd
  ###############################################################
  - rule    : example-block-qa-statsd
    action  : blacklistRegex
    scope   : sourceName
    match   : "qa-statsd.*"

  # block all points where "datacenter" point tag value starts with "west"
  ###############################################################
  - rule    : example-block-west
    action  : blacklistRegex
    scope   : datacenter
    match   : "west.*"
```

### whitelistRegex

Points must match the `whitelistRegex` to be accepted. Multiple `whitelistRegex` rules are allowed. A point must match all rules.

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
<td>whitelistRegex. Required.</td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>pointLine&mdash;Applies to the whole point line before it's parsed (can be used with Wavefront and Graphite formats only) </li>
<li>metricName&mdash;Applies only to the metric name after the point is parsed</li>
<li>sourceName&mdash;Applies only to the source name after the point is parsed</li>
<li>&lt;point tag&gt;&mdash;Any other value of the &quot;scope&quot; parameter applies to the value of a point tag with this name, after the point is parsed.</li>
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
  # only allow points that contain "prod" substring anywhere in the point line
  ###############################################################
  - rule    : example-allow-only-prod
    action  : whitelistRegex
    scope   : pointLine
    match   : ".*prod.*"

  # only allow points that have a "datacenter" point tag and its value starts with "west"
  ###############################################################
  - rule    : example-allow-only-west
    action  : whitelistRegex
    scope   : datacenter
    match   : "west.*"
```

## Point Altering Rules


Point altering rules allow you to:
* Replace text in the point line. The point line uses the Wavefront data format input format:
  `<metricName> <metricValue> [<timestamp>] source=<source> [pointTags]`
* Add, remove, or update point tags.

### replaceRegex


Replaces arbitrary text in the point line or any of its components:

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
<td>replaceRegex. Required.</td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>pointLine&mdash;Applies to the whole point line before it's parsed (can be used with Wavefront and Graphite formats only) </li>
<li>metricName&mdash;Applies only to the metric name after the point is parsed</li>
<li>sourceName&mdash;Applies only to the source name after the point is parsed</li>
<li>&lt;point tag&gt;&mdash;Any other value of the &quot;scope&quot; parameter applies to the value of a point tag with this name, after the point is parsed.</li>
</ul></td>
</tr>
<tr>
<td>search</td>
<td>Search pattern. All substrings matching this pattern are replaced with the replacement string.</td>
</tr>
<tr>
<td>replace</td>
<td>Replacement string. The empty string is allowed. To refer to a capturing group by its number, use &quot;$1&quot;.</td>
</tr>
<tr>
<td>match (optional)</td>
<td>Regular expression. If specified, extract the tag only if &quot;scope&quot; (point line, source name, metric name or point tag value) matches this regular expression.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Examples</strong></font>

```yaml
# for "exampleCluster" point tag replace all "-" characters with dots
###############################################################
- rule    : example-cluster-name
  action  : replaceRegex
  scope   : exampleCluster
  search  : "-"
  replace : "."

# replace bad characters ("&", "$", "!") with underscores in the entire point line string
################################################################
- rule    : example-replace-badchars
  action  : replaceRegex
  scope   : pointLine
  search  : "[&\\$!]"
  replace : "_"
```

### addTag

Adds a point tag with the specified value to all points. If the point tag already exists, its existing value is replaced with the new value.

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
<td>addTag. Required. </td>
</tr>
<tr>
<td>tag</td>
<td>New point tag name.</td>
</tr>
<tr>
<td>value</td>
<td>New point tag value.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Example</strong></font>

```yaml
  # add "env=prod" point tag to all metrics sent through this port
  ################################################################
  - rule    : tag-all-metrics
    action  : addTag
    tag     : env
    value   : "prod"
```

### addTagIfNotExists

Adds a point tag with the specified value to all points. If the point tag already exists, its existing value is preserved.

<font size="3"><strong>Parameters</strong></font>

<table width="100%">
<colgroup>
<col width="15%" />
<col width="85%" />
</colgroup>
<thead>
<tr>
<th>Parameter</th>
<th>Value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>action</td>
<td>addTagIfNotExists</td>
<td></td>
</tr>
<tr>
<td>tag</td>
<td>&lt;new point tag key&gt;</td>
<td>New point tag name.</td>
</tr>
<tr>
<td>value</td>
<td>&lt;new value&gt;</td>
<td>New point tag value.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Example</strong></font>

```yaml
  # add "env=prod" point tag to all metrics sent through this port unless already tagged with "env"
  ################################################################
  - rule    : tag-all-metrics
    action  : addTagIfNotExists
    tag     : env
    value   : "prod"
```

### dropTag

Removes a point tag.

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
<td>dropTag. Required.</td>
</tr>
<tr>
<td>tag</td>
<td>Point tag key (or a regex matching the tag key).</td>
</tr>
<tr>
<td>match (optional)</td>
<td>Regular expression. If specified, remove a tag if its value matches this regular expression.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Examples</strong></font>

```yaml
  #  remove "dc" point tag from all points
  ################################################################
  - rule    : drop-dc-tag
    action  : dropTag
    tag     : dc

  #  remove "az" point tag if its value starts with "dev"
  ################################################################
  - rule    : drop-az-tag
    action  : dropTag
    tag     : az
    match   : dev.*
```

### extractTag

Creates a new point tag based on a metric name, source name, or another point tag value.

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
<td>extractTag. Required.</td>
</tr>
<tr>
<td>source</td>
<td>Any of the following:
<ul>
<li>metricName&mdash;Applies only to the metric name after the point is parsed</li>
<li>sourceName&mdash;Applies only to the source name after the point is parsed</li>
<li>&lt;point tag&gt;&mdash;Any other value of the &quot;scope&quot; parameter applies to the value of a point tag with this name, after the point is parsed.</li>
</ul></td>
</tr>
<tr>
<td>tag</td>
<td>New name for the point tag.</td>
</tr>
<tr>
<td>search</td>
<td>Regex pattern for the value to replace.</td>
</tr>
<tr>
<td>replace</td>
<td>Replacement string or pattern (empty string is allowed) that will be used as a value for the new point tag. To refer to a capturing group in &quot;search&quot; regex by its number, use &quot;$1&quot;.</td>
</tr>
<tr>
<td>match (optional)</td>
<td>Regular expression. If specified, extract a tag only if &quot;source&quot; (source name, metric name or point tag value) matches this regular expression.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Example</strong></font>

```yaml
  # extract a "datacenter" point tag from the source name based on '.dc-' substring.
  # it will extract datacenter=west01 tag from source host0001.web.dc-west01.corp
  ####################################################################################
  - rule    : extract-datacenter
    action  : extractTag
    source  : sourceName
    tag     : datacenter
    search  : "^.*\\.dc-(.*)\\..*"
    replace : "$1"
```

### renameTag

Renames a point tag, preserving its value.

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
<td>renameTag. Required</td>
</tr>
<tr>
<td>tag</td>
<td>Point tag to be renamed.</td>
</tr>
<tr>
<td>newtag</td>
<td>New name for the point tag.</td>
</tr>
<tr>
<td>match (optional)</td>
<td>Regular expression. If specified, rename a tag if its value matches this regular expression.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Examples</strong></font>

```yaml
  # rename a "dc" point tag to "datacenter" (unconditional)
  ###############################################################
  - rule    : rename-dc-to-datacenter
    action  : renameTag
    tag     : dc
    newtag  : datacenter

  # rename a point tag if its value is numeric. so oldTag=123 would be renamed to numericTag=123, but oldTag=text123 would not be changed.
  ###############################################################
  - rule    : rename-numeric-tag
    action  : renameTag
    tag     : oldTag
    match   : "^\\d*$"
    newtag  : numericTag
```

### forceLowercase

Convert a point's component (metric name, source, point tag value) to lowercase.

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
<td>Any of the following:
<ul>
<li>pointLine&mdash;Applies to the whole point line before it's parsed (can be used with Wavefront and Graphite formats only) </li>
<li>metricName&mdash;Applies only to the metric name after the point is parsed</li>
<li>sourceName&mdash;Applies only to the source name after the point is parsed</li>
<li>&lt;point tag&gt;&mdash;Any other value of the &quot;scope&quot; parameter applies to the value of a point tag with this name, after the point is parsed.</li>
</ul></td>
</tr>
<tr>
<td>match (optional)</td>
<td>Regular expression. If specified, remove a tag if its value matches this regular expression.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Example</strong></font>

```yaml
  # force lowercase on metric name (with optional regex match)
  ################################################################
  - rule    : example-force-lowercase
    action  : forceLowercase
    scope   : metricName
    match   : "^UPPERCASE.*$"
```

### limitLength

Enforces custom string length limits for data point components (metric name, source, point tag value). Available action sub-types are `truncate`, `truncateWithEllipsis`, and `drop`.

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
<td>limitLength. Required. </td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>pointLine&mdash;Applies to the whole point line before it's parsed (can be used with Wavefront and Graphite formats only) </li>
<li>metricName&mdash;Applies only to the metric name after the point is parsed</li>
<li>sourceName&mdash;Applies only to the source name after the point is parsed</li>
<li>&lt;point tag&gt;&mdash;Any other value of the &quot;scope&quot; parameter applies to the value of a point tag with this name, after the point is parsed.</li>
</ul></td>
</tr>
<tr>
<td>actionSubtype</td>
<td>Allows you determine how we limit length:
<ul>
<li>DROP drops requested scope if value is greater than maxLength. You can't use DROP with metricName or sourceName. RK>>WHAT CAN I USE IT WITH?? DOES IT HAVE TO BE ALL CAPS??</li>
<li>TRUNCATE truncates requested scope if value is greater than maxLength.</li>
<li>TRUNCATE_WITH_ELLIPSIS truncates the requested scope if the value is greater than maxLength but preserving ellipsis (three dots). maxLength' must be at least 3 for this action type)</li>
</ul></td>
</tr>
<tr>
<td>maxLength</td>
<td>The maximum length of the input metricName, sourceName, or pointTag. The length of the input must be greater than maxLength for rule to be applied.</td>
</tr>
<tr>
<td>match (optional)</td>
<td>Regular expression. If specified, remove a tag if its value matches this regular expression.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Example</strong></font>

```yaml
# Truncate the length of all metric names starting with  "metric"
# i.e. from "metric.name.2.test" to "metric.2.name..."
################################################################
- rule : limit-metric-name-length
  action : limitLength
  scope : metricName
  actionSubtype : truncateWithEllipsis
  maxLength : 16
  match : "^metric.*"
```

## Span Filtering Rules

Span filtering rules allow you to specify a black list or white list.

### blacklistRegex

Defines a regex that points must match to be filtered out. In the example below, we don't allow spans with a sourceName that matches `qa-service`.

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
<td>blacklistRegex. </td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>spanName&mdash;Rule applies only to span name of the span.</li>
<li>sourceName&mdash;Rule applies only to the source name after the span is parsed</li>
<li>&lt;span tag&gt;&mdash;If you specify any other value for scope, the rule applies to span tags (annotations).</li>
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
# block all spans with sourceName that starts with qa-service
###############################################################
- rule    : example-span-block-qa-services
  action  : spanBlacklistRegex
  scope   : sourceName
  match   : "qa-service.*"
```

### spanWhitelistRegex

Points must match the `whitelistRegex` to be accepted. Multiple `spanWhitelistRegex` rules are allowed. A point must match all rules.

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
<td>spanWhitelistRegex. Required.</td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>spanName&mdash;Rule applies only to span name of the span.</li>
<li>sourceName&mdash;Rule applies only to the source name after the span is parsed</li>
<li>&lt;span tag&gt;&mdash;If you specify any other value for scope, the rule applies to span tags (annotations).</li>
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
# only allow spans that contain the "prod" substring anywhere in the source
###############################################################
- rule    : example-span-allow-only-prod
  action  : spanWhitelistRegex
  scope   : sourceName
  match   : ".*prod.*"
```

## Span Altering Rules


Span altering rules allow you to:
* Replace text in the span line. The span line uses the span input format:
  `<operationName> source=<source> <spanTags> <start_milliseconds> <duration_milliseconds>`

RK>>I don't see span line as an argument anywhere. why??
* Add, remove, or update span tags.

### spanReplaceRegex

Replaces arbitrary text in the span line or any of its components.

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
<td>spanReplaceRegex</td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>pointLine&mdash;Applies to the whole point line before it's parsed (can be used with Wavefront and Graphite formats only) </li>
<li>metricName&mdash;Applies only to the metric name after the point is parsed</li>
<li>sourceName&mdash;Applies only to the source name after the point is parsed</li>
<li>&lt;point tag&gt;&mdash;Any other value of the &quot;scope&quot; parameter applies to the value of a point tag with this name, after the point is parsed.</li>
</ul></td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>spanName&mdash;Rule applies only to span name of the span.</li>
<li>sourceName&mdash;Rule applies only to the source name after the span is parsed</li>
<li>&lt;point tag&gt;&mdash;If you specify any other value for scope, the rule applies to span tags (annotations).</li>
</ul></td>
</tr>
<tr>
<td>search</td>
<td>Search pattern. All substrings matching this pattern are replaced with the replacement string.</td>
</tr>
<tr>
<td>replace</td>
<td>Replacement string. The empty string is allowed. To refer to a capturing group by its number, use &quot;$1&quot;.</td>
</tr>
<tr>
<td>match (optional)</td>
<td>Regular expression. If specified, extract the tag only if &quot;scope&quot; (spanName, sourceName, or span tag) matches this regular expression.</td>
</tr>
<tr>
<td>iterations (optional)</td>
<td>Number of iterations. Recursively check and replace recursively if output string contains the search string until no. of iterations are reached or search string is not found in the output.</td>
</tr>
<tr>
<td>firstMatchOnly</td>
<td>If set to true, replaces only the first occurrence of the search string with replacement string. Default is false.</td>
</tr>
</tbody>
</table>


<font size="3"><strong>Examples</strong></font>

```yaml
# replace special characters ("&", "$", "!") with underscores in the
# entire span name string i.e. from "span.service!frontend" to
# "span.service_frontend"
################################################################
- rule    : example-span-replace-badchars
  action  : spanReplaceRegex
  scope : spanName
  search : "[&\\$!]"
  replace : "_"
  match : "span*"
  firstMatchOnly : false
```

### spanForceLowercase

Convert a span's component (span name, source, span tag value) to lowercase.

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
<td>spanForceLowercase</td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>spanName&mdash;Rule applies only to span name of the span.</li>
<li>sourceName&mdash;Rule applies only to the source name after the span is parsed</li>
<li>&lt;point tag&gt;&mdash;If you specify any other value for scope, the rule applies to span tags (annotations).</li>
</ul></td>
</tr>
<tr>
<td>match (optional)</td>
<td>Regular expression. If specified, remove a tag if its value matches this regular expression.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Example</strong></font>

```yaml
# force lowercase on span name (with optional regex match)
################################################################
- rule    : example-span-force-lowercase
  action  : spanForceLowercase
  scope : spanName
  match : "^UPPERCASE.*$"
  firstMatchOnly : false
```

### spanAddTag

Add a span tag with the specified value to all spans. If the tag already exists, its existing value is replaced with the new value.

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
<td>spanAddTag</td>
</tr>
<tr>
<td>key</td>
<td>New span tag name.</td>
</tr>
<tr>
<td>value</td>
<td>New span tag value.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Example</strong></font>

```yaml
  # add "env=prod" point tag to all spans sent through this port
  ################################################################
  - rule    : example-span-tag-all-metrics
    action  : spanAddTag
    tag     : env
    value   : "prod"
```

### spanAddTagIfNotExists

Add a span annotation with the specified value to all spans. If the annotation already exists, its existing value is preserved.

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
<td>spanAddTagIfNotExists</td>
</tr>
<tr>
<td>key</td>
<td>New span tag name.</td>
</tr>
<tr>
<td>value</td>
<td>New span tag value.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Example</strong></font>

```yaml
# add "env=prod" point tag to all spans sent through this port
# unless already tagged with "env"
################################################################
  - rule    : example-span-tag-all-metrics-if-not-exists
    action  : spanAddTagIfNotExists
    tag     : env
    value   : "prod"
```

### spanDropTag

Removes a span annotation matching a regex string.

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
<td>spanDropTag</td>
</tr>
<tr>
<td>key</td>
<td>Span tag key (or a regex matching the tag key).</td>
</tr>
<tr>
<td>match (optional)</td>
<td>If specified, remove a tag only if its value matches this regular expression.</td>
</tr>
<tr>
<td>firstMatchOnly</td>
<td>If set to true, drops only the first occurrence of the search string. Default is false.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Examples</strong></font>

```yaml
#  remove "az" annotation if its value starts with "dev"
################################################################
- rule    : example-span-drop-az-annotation
  action  : spanDropTag
  tag     : az
  match   : dev.*
  firstMatchOnly : false

```

### spanExtractTag and spanExtractTagIfNotExists

Create a new span tag based on a span name, source name, or another span value.
* For `spanExtractTag`, create the new span.
* For `spanExtractTagIfNotExists`, do not replace the existing value with the new value if the tag already exists.


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
<td>spanExtractTag<br>spanExtractTagIfNotExists</td>
</tr>
<tr>
<td>key</td>
<td>New tag name.</td>
</tr>
<tr>
<td>input</td>
<td>Any of the following:
<ul>
<li>spanName&mdash;Rule applies only to span name of the span.</li>
<li>sourceName&mdash;Rule applies only to the source name after the span is parsed</li>
<li>&lt;span tag&gt;&mdash;If you specify any other value for the input, the rule applies to span tags (annotations).</li>
</ul></td>
</tr>
<tr>
<td>match (optional)</td>
<td>Regular expression. If specified, extract a tag only if the input (source name, span name or span tag value) matches this regular expression.</td>
</tr>
<tr>
<td>search</td>
<td>Regex pattern to extract the value from.</td>
</tr>
<tr>
<td>replace</td>
<td>String or pattern (empty string is allowed) that will be used as a value for the new span tag. To refer to a capturing group in &quot;search&quot; regex by its number, use &quot;$1&quot;. RK>>WHY REPLACE? This function is extract. </td>
</tr>
<tr>
<td>replaceInput (Optional)</td>
<td>Modify the name of the input. To refer to a capturing group in &quot;search&quot; regex by its number, use &quot;$1&quot;.</td>
</tr>
<tr>
<td>firstMatchOnly</td>
<td>If set to true, replaces only the first occurrence of the search string with replacement string. Default is false.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Examples</strong></font>

```yaml
## extract 3rd dot-delimited node from the span name into new
## span tag, and remove it from the metric, i.e. from
## "span.service.frontend.cpu_utilization" span name extract "serviceTag=frontend"
## tag and change metric name to "span.service.cpu_utilization"
################################################################
- rule          : example-extract-tag-from-span
  action        : spanExtractTag
  key           : serviceTag
  input         : spanName
  match         : "span.*"
  search        : "^([^\\.]*\\.[^\\.]*\\.)([^\\.]*)\\.(.*)$"
  replace       : "$2"
  replaceInput  : "$1$3"
  # optional, omit if you plan on just extracting the tag leaving the metric name intact
```

```yaml
## extract 3rd dot-delimited node from the span name into new
## span tag, and remove it from the metric, i.e. from
## "span.service.frontend.cpu_utilization" span name extract "serviceTag=frontend"
## tag and change metric name to "span.service.cpu_utilization"
################################################################
- rule          : example-extract-tag-from-span
  action        : spanExtractTagIfNotExists
  key           : serviceTag
  input         : spanName
  match         : "span.*"
  search        : "^([^\\.]*\\.[^\\.]*\\.)([^\\.]*)\\.(.*)$"
  replace       : "$2"
  replaceInput  : "$1$3"
  # optional, omit if you plan on just extracting the tag leaving the metric name intact
```

### spanlimitLength

Truncate the span name or source name to the given length. Truncate or drop span tags if tag value length exceeds the limit.

Available action sub-types are `truncate`, `truncateWithEllipsis`, and `drop`.

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
<td>spanlimitLength. </td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>spanName&mdash;Rule applies only to span name of the span.</li>
<li>sourceName&mdash;Rule applies only to the source name after the span is parsed</li>
<li>&lt;span tag&gt;&mdash;If you specify any other value for scope, the rule applies to span tags (annotations).</li>
</ul></td>
</tr>
<tr>
<td>actionSubtype</td>
<td>Allows you determine how we limit length:
<ul>
<li>DROP drops requested scope if value is greater than maxLength. You can't use DROP with metricName or sourceName. RK>>WHAT CAN I USE IT WITH?? DOES IT HAVE TO BE ALL CAPS??</li>
<li>TRUNCATE truncates requested scope if value is greater than maxLength.</li>
<li>TRUNCATE_WITH_ELLIPSIS truncates the requested scope if the value is greater than maxLength but preserving ellipsis (three dots). maxLength' must be at least 3 for this action type)</li>
</ul></td>
</tr>
<tr>
<td>maxLength</td>
<td>The maximum length of the input spanName, sourceName, or span tag. The length of the input must be greater than maxLength for rule to be applied.</td>
</tr>
<tr>
<td>match (optional)</td>
<td>Regular expression. If specified, remove a tag if its value matches this regular expression.</td>
</tr>
<tr>
<td>firstMatchOnly</td>
<td>If set to true, replaces only the first occurrence of the search string with replacement string. Default is false.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Example</strong></font>

```yaml
# Truncate the length of all span names starting with  "span"
# i.e. from "span.2.service.test" to "span.2.service.."
################################################################
- rule : limit-metric-name-length
  action : spanLimitLength
  scope : metricName
  actionSubtype : truncateWithEllipsis
  maxLength : 17
  match : "^span.*"
```
