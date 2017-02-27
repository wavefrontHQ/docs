---
title: Configuring Wavefront Proxy Preprocessor Rules
keywords:
tags: [proxies]
sidebar: doc_sidebar
permalink: proxy_preprocessor_rules.html
summary: This topic describes how to configure Wavefront proxy preprocessor rules.
---
Starting with version 4.1, the Wavefront proxy includes a preprocessor that applies various user-defined point filtering and altering rules before data is sent to Wavefront. One of the main goals of this functionality is to allow addressing correctable data quality issues within the existing data flow, when fixing the problem at the emitting source is not feasible. An example of such rule would be "before the point line is parsed, replace invalid characters with underscores", which allows points that would normally be rejected to flow into the system.

## Rule Configuration File

You define the preprocessor rules in a separate file (using YAML syntax), usually `/etc/wavefront/wavefront-proxy/preprocessor_rules.yaml`. An example rule file:

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

For greater flexibility, you can define rules separately for each listening port.  The example above defines 3 rules, 2 for port 2878 and 1 for port 4242.

Every rule must have a `rule` parameter that contains the rule ID and an `action` parameter that contains the action to perform.

Rule IDs can contain alphanumeric characters, dashes, and underscores and should be descriptive and unique within the same port. In the example above, the **drop-az-tag** rule is defined with the same identifier for both ports, 2878 and 4242.

The Wavefront proxy reports a counter metric for every rule that represents the number of times a rule has been successfully applied, and the rule ID becomes part of the proxy metric **~agent.preprocessor.&lt;rule&gt;.count**. For example, **~agent.preprocessor.replace-badchars.count**. For information on proxy metrics, see Monitoring the Health of a Wavefront Instance.

## Regex Notes

-   Backslashes in regex patterns must be double-escaped. For example, to match a dot character ("."), use "\\\\."
-   Regex patterns in the `match` parameter are a full match. For example, a regex to block the point line that contains "stage" substring is ".\*stage.\*".
-   Regex patterns in the `replaceRegex` rule `search` parameter are a substring match. If `search` is "A" and `replace` is "B", all A's are replaced with B's.

## Enabling the Preprocessor

To enable the preprocessor, add (or uncomment) the `preprocessorConfigFile` property in the [Wavefront proxy configuration file](proxy_configuration) and set to a valid path to the rules configuration file. The rules file is validated when the proxy starts and the start-up process is aborted if any of the rules are not valid. A detailed error message is provided for every rule that fails validation.

## Point Filtering Rules

Point filtering rules support a more flexible version of the Proxy's `whitelistRegex` and `blacklistRegex` properties, and is fully backwards compatible.

### blacklistRegex

Defines a regex that points must match to be filtered out.

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Parameter</strong></th>
<th><strong>Value</strong></th>
<th><strong>Description</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>action</td>
<td>blacklistRegex</td>
<td></td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>pointLine</li>
<li>metricName</li>
<li>sourceName</li>
<li>&lt;point tag&gt;</li>
</ul></td>
<td>&quot;scope&quot; parameter allows filtering points with finer granularity:
<ul>
<li>pointLine applies to the whole point line before it's parsed (can be used with Wavefront and Graphite formats only)</li>
<li>metricName applies only to the metric name after the point is parsed</li>
<li>sourceName applies only to the source name after the point is parsed</li>
<li>any other value of the &quot;scope&quot; parameter applies to the value of a point tag with this name, after the point is parsed</li>
</ul></td>
</tr>
<tr>
<td>match</td>
<td>&lt;regex pattern&gt;</td>
<td>A pattern that input lines must match to be filtered out.</td>
</tr>
</tbody>
</table>

Examples:

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

Defines a regex that points must match to be accepted. Multiple `whitelistRegex` rules are allowed, however a point must satisfy all of the rules; if the point doesn't match at least one of the patterns, it is blocked.

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Parameter</strong></th>
<th><strong>Value</strong></th>
<th><strong>Description</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>action</td>
<td>whitelistRegex</td>
<td></td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>pointLine</li>
<li>metricName</li>
<li>sourceName</li>
<li>&lt;point tag&gt;</li>
</ul></td>
<td>Allows filtering points with finer granularity:
<ul>
<li>pointLine applies to the whole point line before it's parsed (can be used with Wavefront and Graphite formats only)</li>
<li>metricName applies only to the metric name after the point is parsed</li>
<li>sourceName applies only to the source name after the point is parsed</li>
<li>any other value of the &quot;scope&quot; parameter applies to the value of a point tag with this name, after the point is parsed</li>
</ul></td>
</tr>
<tr>
<td>match</td>
<td>&lt;regex pattern&gt;</td>
<td>A pattern that input lines must match to be accepted.</td>
</tr>
</tbody>
</table>

Examples:

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


Point altering rules allow you to replace text in the point line and add, remove, and update point tags.

### replaceRegex


Replaces arbitrary text in the point line or any of its components:

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Parameter</strong></th>
<th><strong>Value</strong></th>
<th><strong>Description</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>action</td>
<td>replaceRegex</td>
<td></td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>pointLine</li>
<li>metricName</li>
<li>sourceName</li>
<li>&lt;point tag&gt;</li>
</ul></td>
<td>Allows finer control over where the replacement is applied:
<ul>
<li>pointLine applies to the whole point line before it's parsed (can be used with Wavefront and Graphite formats only)</li>
<li>metricName applies only to the metric name after the point is parsed</li>
<li>sourceName applies only to the source name after the point is parsed</li>
<li>any other value of the &quot;scope&quot; parameter applies to the value of a point tag with this name, after the point is parsed</li>
</ul>
Any substitutions that address data quality issues that would normally make the data point unparseable, must be applied to the &quot;pointLine&quot; scope.</td>
</tr>
<tr>
<td>search</td>
<td>&lt;regex pattern&gt;</td>
<td>Search pattern. All substrings matching this pattern are replaced with the replacement string.</td>
</tr>
<tr>
<td>replace</td>
<td>&lt;replacement string&gt;</td>
<td>Replacement string. The empty string is allowed. To refer to a capturing group by its number, use &quot;\\1&quot;.</td>
</tr>
<tr>
<td>match (optional)</td>
<td>&lt;regex pattern&gt;</td>
<td>If specified, extract the tag only if &quot;scope&quot; (point line, source name, metric name or point tag value) matches this regular expression.</td>
</tr>
</tbody>
</table>

Examples:

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


Add a point tag with the specified value to all points. If the point tag already exists, its existing value is replaced with the new value.

<table width="100%">
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Parameter</strong></th>
<th><strong>Value</strong></th>
<th><strong>Description</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>action</td>
<td>addTag</td>
<td></td>
</tr>
<tr>
<td>tag</td>
<td>&lt;new tag key&gt;</td>
<td>New point tag name.</td>
</tr>
<tr>
<td>value</td>
<td>&lt;new value&gt;</td>
<td>New point tag value.</td>
</tr>
</tbody>
</table>

Example:

```yaml
  # add "env=prod" point tag to all metrics sent through this port
  ################################################################
  - rule    : tag-all-metrics
    action  : addTag
    tag     : env
    value   : "prod"
```

### addTagIfNotExists

Add a point tag with the specified value to all points. If the point tag already exists, its existing value is preserved.

<table width="100%">
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Parameter</strong></th>
<th><strong>Value</strong></th>
<th><strong>Description</strong></th>
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
<td>&lt;new tag key&gt;</td>
<td>New point tag name.</td>
</tr>
<tr>
<td>value</td>
<td>&lt;new value&gt;</td>
<td>New point tag value.</td>
</tr>
</tbody>
</table>

Example:

```yaml
  # add "env=prod" point tag to all metrics sent through this port unless already tagged with "env"
  ################################################################
  - rule    : tag-all-metrics
    action  : addTagIfNotExists
    tag     : env
    value   : "prod"
```

### dropTag
-

Remove a point tag.

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Parameter</strong></th>
<th><strong>Value</strong></th>
<th><strong>Description</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>action</td>
<td>dropTag</td>
<td></td>
</tr>
<tr>
<td>tag</td>
<td>&lt;tag name&gt; or &lt;tag name regex&gt;</td>
<td>Point tag key (or a regex matching the tag key).</td>
</tr>
<tr>
<td>match (optional)</td>
<td>&lt;regex pattern&gt;</td>
<td>If specified, remove a tag if its value matches this regular expression.</td>
</tr>
</tbody>
</table>

Examples:

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
-

Create a new point tag based on a metric name, source name, or another point tag value.

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Parameter</strong></th>
<th><strong>Value<br />
</strong></th>
<th><strong>Description<br />
</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>action</td>
<td>extractTag</td>
<td></td>
</tr>
<tr>
<td>source</td>
<td>Any of the following:
<ul>
<li>metricName</li>
<li>sourceName</li>
<li>&lt;point tag&gt;</li>
</ul></td>
<td>The base for the new point tag value: metric name, source name, or another point tag value.</td>
</tr>
<tr>
<td>tag</td>
<td>&lt;new tag name&gt;</td>
<td>New name for the point tag.</td>
</tr>
<tr>
<td>search</td>
<td>&lt;regex pattern&gt;</td>
<td>Regex pattern to extract the value.</td>
</tr>
<tr>
<td>replace</td>
<td>&lt;replacement string&gt;</td>
<td>String or pattern (empty string is allowed) that will be used as a value for the new point tag. To refer to a capturing group in &quot;search&quot; regex by its number, use either of the following constructs: &quot;\\1&quot; or &quot;$1&quot;.</td>
</tr>
<tr>
<td>match (optional)</td>
<td>&lt;regex pattern&gt;</td>
<td>If specified, extract a tag only if &quot;source&quot; (source name, metric name or point tag value) matches this regular expression.</td>
</tr>
</tbody>
</table>

Example:

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


Rename a point tag, preserving its value.

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</strong></th>
<th>Value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>action</td>
<td>renameTag</td>
<td></td>
</tr>
<tr>
<td>tag</td>
<td>&lt;tag name&gt;</td>
<td>Point tag to be renamed.</td>
</tr>
<tr>
<td>newtag</td>
<td>&lt;new tag name&gt;</td>
<td>New name for the point tag.</td>
</tr>
<tr>
<td>match (optional)</td>
<td>&lt;regex pattern&gt;</td>
<td>If specified, rename a tag if its value matches this regular expression.</td>
</tr>
</tbody>
</table>

Examples:

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

{% include links.html %}
