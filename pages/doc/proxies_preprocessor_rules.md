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


The rules make it possible to address data quality issues in the data flow when it's not possible to fix the problem at the source. For example, you could have a rule "before the point line is parsed, replace invalid characters with underscores" to allow points that would be rejected to get to the Wavefront service.

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


### Rule Parameters

Every rule must have
* A `rule` parameter that contains the rule ID. Rule IDs can contain alphanumeric characters, dashes, and underscores and should be descriptive and unique within the same port. In the example above, the `drop-az-tag` rule is defined with the same identifier for both ports, 2878 and 4242.
* An `action` parameter that contains the action to perform

Additional parameters depend on the rule you're defining, for example, a `whitelistregex` rule must have a `scope` and a `match` parameter.

<!---
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
--->



### Regex Notes

-   Backslashes in regex patterns must be double-escaped. For example, to match a dot character ("."), use `\\.`.
-   Regex patterns in the `match` parameter are a full match. For example, a regex to block the point line that contains `stage` substring is `.*stage.*`.
-   Regex patterns in the `replaceRegex` rule `search` parameter are a substring match. If `search` is "A" and `replace` is "B", all A's are replaced with B's.

## Enabling the Preprocessor

To enable the preprocessor:
1. Add (or uncomment) the `preprocessorConfigFile` property in the [Wavefront proxy configuration file](proxies_configuring.html).
2. Set `preprocessorConfigFile` to a valid path to the rules configuration file.

### Validation

The rules file is validated when the proxy starts. The proxy aborts the start-up process if any of the rules is not valid. We provide a detailed error message for every rule that fails validation.

### Metrics for Rules

For every rule the Wavefront proxy reports a counter metric  that shows how often the rule has been successfully applied. The rule ID becomes part of the proxy metric `~agent.preprocessor.<ruleID>.count`, for example, `~agent.preprocessor.replace-badchars.count`. See [Monitoring Wavefront Proxies](monitoring_proxies.html) for details.

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
<td>blacklistRegex. </td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>pointLine&mdash;Rule applies to the whole point line before it's parsed (can be used with Wavefront and Graphite formats only). </li>
<li>metricName&mdash;Rule applies only to the metric name after the point is parsed.</li>
<li>sourceName&mdash;Rule applies only to the source name after the point is parsed.</li>
<li>&lt;point tag&gt;&mdash;For any other value, the rule applies to the value of a point tag with this name after the point is parsed.</li>
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
<td>whitelistRegex. </td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>pointLine&mdash;Rule applies to the whole point line before it's parsed (can be used with Wavefront and Graphite formats only). </li>
<li>metricName&mdash;Rule applies only to the metric name after the point is parsed.</li>
<li>sourceName&mdash;Rule applies only to the source name after the point is parsed.</li>
<li>&lt;point tag&gt;&mdash;For any other value, the rule applies to the value of a point tag with this name after the point is parsed.</li>
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
<td>replaceRegex.</td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>pointLine&mdash;Rule applies to the whole point line before it's parsed (can be used with Wavefront and Graphite formats only). </li>
<li>metricName&mdash;Rule applies only to the metric name after the point is parsed.</li>
<li>sourceName&mdash;Rule applies only to the source name after the point is parsed.</li>
<li>&lt;point tag&gt;&mdash;For any other value, the rule applies to the value of a point tag with this name after the point is parsed.</li>
</ul></td>
</tr>
<tr>
<td>search</td>
<td>Search pattern. All substrings that match this pattern are replaced with the replacement string.</td>
</tr>
<tr>
<td>replace</td>
<td>Replacement string. The empty string is allowed. To refer to a capturing group by its number, use &quot;$1&quot;.</td>
</tr>
<tr>
<td>match (optional)</td>
<td>Regular expression. If specified, extract the tag only if the point line, source name, metric name or point tag value matches this regular expression.</td>
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

### addTag and addTagIfNotExists

Adds a point tag with the specified value.
* For `addTag`, if the point tag already exists, its existing value is replaced with the new value.
* For `addTagIfNotExists`, if the point tag already exists, its existing value is preserved.

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
<td>addTag<br>
addTagIfNotExists </td>
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
<td>dropTag.</td>
</tr>
<tr>
<td>tag</td>
<td>Point tag key (or a regex matching the tag key).</td>
</tr>
<tr>
<td>match (optional)</td>
<td>Regular expression. If specified, remove a tag only if its value matches this regular expression.</td>
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

### extractTag and extractTagIfNotExists

Extracts a string from the metric name, source name, or point tag value and creates a new point tag from it.
* For `extractTag` create the new point tag.
* For `extractTagIfNotExists` create the new point tag but do not replace the existing value with the new value if the tag already exists.

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
<td>extractTag <br>
extractTagIfNotExists</td>
</tr>
<tr>
<td>source</td>
<td>Any of the following:
<ul>
<li>pointLine&mdash;Rule applies to the whole point line before it's parsed (can be used with Wavefront and Graphite formats only). </li>
<li>metricName&mdash;Rule applies only to the metric name after the point is parsed.</li>
<li>sourceName&mdash;Rule applies only to the source name after the point is parsed.</li>
<li>&lt;point tag&gt;&mdash;For any other value, the rule applies to the value of a point tag with this name after the point is parsed.</li>
</ul></td>
</tr>
<tr>
<td>tag</td>
<td>Name of the new point tag.</td>
</tr>
<tr>
<td>search</td>
<td>Regex pattern for the value to replace.</td>
</tr>
<tr>
<td>replace</td>
<td>Replacement string or pattern that will be used as a value for the new point tag. Empty string is allowed. To refer to a capturing group in &quot;search&quot; regex by its number, use &quot;$1&quot;.</td>
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
<td>renameTag</td>
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

Converts metric name, source name, or point tag value to lowercase.

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
<li>pointLine&mdash;Rule applies to the whole point line before it's parsed (can be used with Wavefront and Graphite formats only). </li>
<li>metricName&mdash;Rule applies only to the metric name after the point is parsed.</li>
<li>sourceName&mdash;Rule applies only to the source name after the point is parsed.</li>
<li>&lt;point tag&gt;&mdash;For any other value, the rule applies to the value of a point tag with this name after the point is parsed.</li>
</ul></td>
</tr>
<tr>
<td>match (optional)</td>
<td>Regular expression. If specified, convert a tag to lower case only if its value matches this regular expression.</td>
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

Enforces string length limits for a metric name, source name, or point tag value. Available action sub-types are `truncate`, `truncateWithEllipsis`, and `drop`.

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
<li>pointLine&mdash;Rule applies to the whole point line before it's parsed (can be used with Wavefront and Graphite formats only). </li>
<li>metricName&mdash;Rule applies only to the metric name after the point is parsed.</li>
<li>sourceName&mdash;Rule applies only to the source name after the point is parsed.</li>
<li>&lt;point tag&gt;&mdash;For any other value, the rule applies to the value of a point tag with this name after the point is parsed.</li>
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
<td>The maximum length of the input metric name, source name, or point tag. Only if the length of the input is  greater than maxLength, the rule is applied.</td>
</tr>
<tr>
<td>match (optional)</td>
<td>Regular expression. If specified, limitLength applies only to tags with a value that matches this regular expression.RK>>Tags with a value or tags??</td>
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

### spanBlacklistRegex

Defines a regex that spans must match to be filtered out. In the example below, we don't allow spans with a source name that matches `qa-service`.

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
<td>blacklistRegex </td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>spanName&mdash;Rule applies only to span name.</li>
<li>sourceName&mdash;Rule applies only to the source name.</li>
<li>&lt;span tag&gt;&mdash;For any other value, the rule applies to span tags (annotations).</li>
</ul></td>
</tr>
<tr>
<td>match</td>
<td>A regex pattern. If the input matches this regex, it is filtered out.</td>
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

Points must match the `spanWhitelistRegex` to be accepted. Multiple `spanWhitelistRegex` rules are allowed. A point must match all rules.

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
<td>spanWhitelistRegex. </td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>spanName&mdash;Rule applies only to the span name.</li>
<li>sourceName&mdash;Rule applies only to the source name. </li>
<li>&lt;span tag&gt;&mdash;For any other value, the rule applies to span tags (annotations).</li>
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

Span altering rules allow you to add, remove, or update span tags.

### spanReplaceRegex

Replaces arbitrary text in the span name, span source name, or a span tag.

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
<li>spanName&mdash;Rule applies only to the span name.</li>
<li>sourceName&mdash;Rule applies only to the source name.</li>
<li>&lt;point tag&gt;&mdash;For any other value, the rule applies to span tags (annotations).</li>
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
<td>Regular expression. If specified, extract the tag only if the span name, source name, or span tag matches this regular expression.</td>
</tr>
<tr>
<td>iterations (optional)</td>
<td>Number of iterations. Recursively check and recursively replace if the output string contains the search string until the number of iterations is reached.</td>
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
# entire span name string e.g. replace "span.service!frontend" with
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

Convert a span name, source name, or span tag name to lowercase.

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
<li>spanName&mdash;Rule applies only to the span name.</li>
<li>sourceName&mdash;Rule applies only to the source name.</li>
<li>&lt;span tag&gt;&mdash;For any other value, the rule applies to span tags (annotations).</li>
</ul></td>
</tr>
<tr>
<td>match (optional)</td>
<td>Regular expression. If specified, force lower case only if the value matches this regular expression.</td>
<tr>
<td>firstMatchOnly</td>
<td>If set to true, change only the first occurrence to lower case. Default is false.</td>
</tr>
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

### spanAddTag and spanAddTagIfNotExists

Add a span tag to all spans.
* For `spanAddTag`, if the tag already exists, its existing value is replaced with the new value.
* For `spanAddTagIfNotExists`, do not replace the value of an existing tag.

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
<td>spanAddTag <br>
spanAddTagIfNotExists</td>
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

  # add "env=prod" point tag to all spans sent through this port
  # unless already tagged with "env"
  ################################################################
  - rule    : example-span-tag-all-metrics-if-not-exists
    action  : spanAddTagIfNotExists
    tag     : env
    value   : "prod"
```


### spanDropTag

Removes a span tag that matches a regex string.

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
<td>Span tag name (or a regex matching the tag name).</td>
</tr>
<tr>
<td>match (optional)</td>
<td>If specified, remove a tag only if its value matches this regular expression.</td>
</tr>
<tr>
<td>firstMatchOnly</td>
<td>If set to true, remove only the first occurrence of the search string. Default is false.</td>
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

Extract a string from a span name, source name, or a span tag value and create a new span tag from that string.
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
<li>spanName&mdash;Rule applies only to the span name.</li>
<li>sourceName&mdash;Rule applies only to the source name.</li>
<li>&lt;span tag&gt;&mdash;For any other value, the rule applies to span tags (annotations).</li>
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
<td>String or pattern that will be used as a value for the new span tag. Empty string is allowed. To refer to a capturing group in the &quot;search&quot; regex by its number, use &quot;$1&quot;. </td>
</tr>
<tr>
<td>replaceInput (Optional)</td>
<td>Modify the name of the input. To refer to a capturing group in &quot;search&quot; regex by its number, use &quot;$1&quot;.</td>
</tr>
<tr>
<td>firstMatchOnly</td>
<td>If set to true, replaces only the first occurrence of the search string with a replacement string. Default is false.</td>
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
<td>spanlimitLength </td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>spanName&mdash;Rule applies only to the span name of the span.</li>
<li>sourceName&mdash;Rule applies only to the source name of the span.</li>
<li>&lt;span tag&gt;&mdash;For any other value, the rule applies to span tags (annotations).</li>
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
<td>The maximum length of the input span name, source name, or span tag. The length of the input must be greater than maxLength for rule to be applied.</td>
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
