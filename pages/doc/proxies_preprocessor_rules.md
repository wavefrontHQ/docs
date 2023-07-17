---
title: Configuring Wavefront Proxy Preprocessor Rules
keywords:
tags: [proxies]
sidebar: doc_sidebar
permalink: proxies_preprocessor_rules.html
summary: Learn how to write proxy preprocessor rules.
---

For fine-grained control before data are sent to VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront), the Wavefront proxy supports:

* Point filtering and point altering rules
* Span filtering and span altering rules

This page explains how to write these preprocessor rules, and includes many examples.

{% include tip.html content="See the [Metrics Data Format Syntax](wavefront_data_format.html#metrics-data-format-syntax) for some background. A point line uses several elements to describe a metric, for example, `test-spy.objectName 1 source=localhost tagKey=production`. " %}


## Overview

The Wavefront proxy includes a preprocessor that applies rules before data is sent to Operations for Applications. The rules make it possible to address data quality issues in the data flow when it's not possible to fix the problem at the source. For example, you could have a rule "before the point line is parsed, replace invalid characters with underscores" to allow points that would be rejected to get to Operations for Applications.

You can limit when a rule applies using the `if` parameter (proxy 7.0 and later). See [Preprocessor Rule Conditions](proxies_preprocessor_rule_conditions.html) for details.

{% include shared/badge.html content="The span filtering rules and span altering rules apply to data coming from any supported source, including Jaeger and Zipkin." %}

{% include tip.html content="Starting with Proxy 9.x, `*blacklist` has been replaced with `*block` and `*whitelist` has been replaced with `*allow`. The documentation uses the new configuration parameter names. " %}


## Rule Configuration File

You define the proxy preprocessor rules in a rule configuration file, usually `<wavefront_config_path>/preprocessor_rules.yaml`, using YAML syntax.

If you want to change the name of the preprocessor rule file, you can specify the filename using the `preprocessorConfigFile` parameter in your [proxy configuration file](proxies_configuring.html#configuration-properties).

### Example

An example rule file could look like this:

```yaml
# rules for port 2878
'2878':
  ## replace bad characters ("&", "$", "*") with underscores in the entire point line string
  #################################################################
  - rule    : example-replace-badchars
    action  : replaceRegex
    scope   : pointLine
    search  : "[&\\$\\*]"
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

### Rule Parameters

Every rule must have
* A `rule` parameter that contains the rule ID. Rule IDs can contain alphanumeric characters, dashes, and underscores and should be descriptive and unique within the same port. In the example above, the `drop-az-tag` rule is defined with the same identifier for both ports, 2878 and 4242.
* An `action` parameter that contains the action to perform. Also the rule name.

Additional parameters depend on the rule that you're defining, for example, an `allow` rule must have a `scope` and a `match` parameter.

### Regex Notes

The Wavefront proxy uses Java-style regex pattern. For details see [the Java documentation](https://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html).

-   Backslashes in regex patterns must be double-escaped. For example, to match a dot character ("."), use `\\.`.
-   Regex patterns in the `match` parameter are a full match. For example, a regex to block the point line that contains `stage` substring is `.*stage.*`.
-   Regex patterns in the `replaceRegex` rule `search` parameter are a substring match. If `search` is "A" and `replace` is "B", all A's are replaced with B's.

### Applying Rules to Multiple Ports

A preprocessor rule typically specifies rules for a specific port. The example above specifies the rule for port 2878. Starting with proxy v7.x, you can:
* Use the `global` keyword to specify rules that should apply for all explicitly specified ports. Additionally, global rules must be specified at the bottom of the preprocessor rule file. For example:

```
   # rules that apply to all ports explicitly specified above. Global rules must be at the end of the file.
   'global':

     # Example no-op rule
     #################################################################
     - rule    : example-rule-do-nothing
       action  : count
```

* Specify rules for multiple ports with a comma-separated list. For example:

```
   ## Multiport preprocessor rules
   ## The following rules will apply to ports 2979, 2980 and 4343

   '2979, 2980, 4343':

     ## Add k8s cluster name point tag for all points across multiple ports.
     #- rule    : example-rule-delete-merenametag-k8s-cluster
     #  action  : addTag
     #  tag     : k8scluster
     #  value   : eks-dev
```

## Enabling the Preprocessor

To enable the preprocessor:
1. Add (or uncomment) the `preprocessorConfigFile` property in the [Wavefront proxy configuration file](proxies_configuring.html).
<!---HELP again, need to be clearer on file name/location & possible rename--->
2. Set `preprocessorConfigFile` to a valid path to the rules configuration file.

### Validation and Changes to the Preprocessor File

The rules file is validated when the proxy starts. The proxy aborts the start-up process if any of the rules is not valid. We provide a detailed error message for every rule that fails validation.

Starting with proxy version 5.0, changes to the preprocessor file take effect shortly after you save the file.

For earlier versions of the proxy, you have to [restart the proxy](proxies_installing.html#start-and-stop-a-proxy) before the changes take effect.

### Interactive Testing of Preprocessor Rules

You can test a preprocessor rule before sending data to your Operations for Applications service using `-testPreprocessorForPort <port>`.

How you run the proxy in test mode depends on whether you're using the JVM bundled with the Wavefront proxy. In that case, if the proxy installer detects that java v8, 9, 10 or, 11 already exists in the users path that version of Java is used.

To run in test mode with the bundled VM:
```shell
java -jar  /opt/wavefront/wavefront-proxy/bin/wavefront-push-agent.jar -f /etc/wavefront/wavefront-proxy/wavefront.conf --testPreprocessorForPort 2878
```

To run in test mode and specify the path explicitly:
```shell
/opt/wavefront/wavefront-proxy/proxy-jre/bin/java -jar /opt/wavefront/wavefront-proxy/bin/wavefront-push-agent.jar \
  -f /etc/wavefront/wavefront-proxy/wavefront.conf --testPreprocessorForPort 2878
```

### Metrics for Rules

For every rule, the Wavefront proxy reports the counter metric`~proxy.preprocessor.<ruleID>.count`. The rule ID becomes part of the proxy metric, for example, `~proxy.preprocessor.replace-badchars.count`. See [Monitoring Wavefront Proxies](monitoring_proxies.html) for details.

## Point Filtering Rules

Point filtering rules support a more flexible version of the proxy [`allow` list and `block` list](proxies_configuring.html#configuration-properties) properties, and is fully backwards compatible.

### block

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
<td>block </td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>pointLine&mdash;Rule applies to the whole point line before it's parsed (can be used with Operations for Applications and Graphite data formats only). </li>
<li>metricName&mdash;Rule applies only to the metric name after the point is parsed.</li>
<li>sourceName&mdash;Rule applies only to the source name after the point is parsed.</li>
<li>&lt;point tag&gt;&mdash;Rule applies to the value of the specified point tag key after the point is parsed.</li>
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
    action  : block
    scope   : sourceName
    match   : "qa-statsd.*"

  # block all points where "datacenter" point tag value starts with "west"
  ###############################################################
  - rule    : example-block-west
    action  : block
    scope   : datacenter
    match   : "west.*"
```

### allow

Points must match the `allow` list to be accepted. Multiple `allow` rules are allowed. A point must match all rules.

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
<td>allow </td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>pointLine&mdash;Rule applies to the whole point line before it's parsed (can be used with Operations for Applications and Graphite data formats only). </li>
<li>metricName&mdash;Rule applies only to the metric name after the point is parsed.</li>
<li>sourceName&mdash;Rule applies only to the source name after the point is parsed.</li>
<li>&lt;point tag&gt;&mdash;Rule applies to the value of the specified point tag key after the point is parsed.</li>
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
    action  : allow
    scope   : pointLine
    match   : ".*prod.*"

  # only allow points that have a "datacenter" point tag and its value starts with "west"
  ###############################################################
  - rule    : example-allow-only-west
    action  : allow
    scope   : datacenter
    match   : "west.*"
```

### metricsFilter

Enables you to pass only metrics that are provided in a `preprocessor_rules.yaml` file to the server. All other metrics are dropped.

{% include note.html content="Only one metricsFilter rule is allowed per port." %}


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
<td>metricsFilter </td>
</tr>
<tr>
<td>function</td>
<td><ul>
<li>allow -- Sends only metrics that match one of the entries listed in <code>names</code> to the Operations for Applications service. All other metrics are dropped.</li>
<li>drop -- Drops all metrics that match one of the entries listed in <code>names</code>. All other metrics are sent on to the Operations for Applications service.</li></ul></td>
</tr>
<tr>
<td>names</td>
<td>List of exact metric names or regular expressions. The list specifies which metrics are sent to the Operations for Applications service or which are dropped. Regular expressions must start and end with `/`.
</td>
</tr>
<tr>
<td>opts</td>
<td>Allows you to define the maximum size of the internal cache with the  <code>cacheSize</code> option (1.000.000 by default). A bigger cache makes the proxy run faster but consumes more memory. You can examine the size of the cache with the <code>~proxy.preprocessor.[ruleName].regexCache.size</code> metric.
</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Example</strong></font>

```yaml
  # only allow points listed under "names"
  ###############################################################
  - rule: allow-selected-metrics
    action: metricsFilter
    function: allow
    opts:
      cacheSize: 10000
    names:
      - "metrics.1"
      - "/metrics\.2.*/"
      - "/.*.ok$/"
```
The example:
* allows a metric called `metrics.1` but drops `metrics.1.test`
* allows any metric that starts with  `metrics.2`
* allows any metric that ends with  `.ok`

## Point Altering Rules


Point altering rules allow you to:
* Replace text in the point line. The point line uses the Operations for Applications data format input format:
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
<li>pointLine&mdash;Rule applies to the whole point line before it's parsed (can be used with Operations for Applications and Graphite data formats only). </li>
<li>metricName&mdash;Rule applies only to the metric name after the point is parsed.</li>
<li>sourceName&mdash;Rule applies only to the source name after the point is parsed.</li>
<li>&lt;point tag&gt;&mdash;Rule applies to the value of the specified point tag key after the point is parsed.</li>
</ul></td>
</tr>
<tr>
<td>search</td>
<td>Search pattern. All substrings that match this pattern are replaced with the replacement string.</td>
</tr>
<tr>
<td>replace</td>
<td>Replacement string. The empty string is allowed. Refer to a capturing group in the search regex using $ and its number (starting from 1). For example, use $1 to refer to the first group.</td>
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

  # replace bad characters ("&", "$", "*") with underscores in the entire point line string
  #################################################################
  - rule    : example-replace-badchars
    action  : replaceRegex
    scope   : pointLine
    search  : "[&\\$\\*]"
    replace : "_"
```

### addTag and addTagIfNotExists

Adds a point tag with the specified value.
* For `addTag`, if the point tag already exists, its existing value is replaced with the new value.
* For `addTagIfNotExists`, if the point tag already exists, its existing value is preserved.

{% include note.html content="You can add up to 20 point tags. Contact [support@wavefront.com](mailto:support@wavefront.com) if this does not meet your requirements." %}

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

Extracts a string from the metric name, source name, point line, or point tag value and creates a new point tag from it.
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
<li>pointLine&mdash;Rule applies to the whole point line before it's parsed (can be used with Operations for Applications and Graphite data formats only). </li>
<li>metricName&mdash;Rule applies only to the metric name after the point is parsed.</li>
<li>sourceName&mdash;Rule applies only to the source name after the point is parsed.</li>
<li>&lt;point tag&gt;&mdash;Rule applies to the value of the specified point tag key after the point is parsed.</li>
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
<td>Replacement string or pattern that will be used as a value for the new point tag. Empty string is allowed. Refer to a capturing group in the search regex using $ and its number (starting from 1). For example, use $1 to refer to the first group.</td>
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
<li>pointLine&mdash;Rule applies to the whole point line before it's parsed (can be used with Operations for Applications and Graphite data formats only). </li>
<li>metricName&mdash;Rule applies only to the metric name after the point is parsed.</li>
<li>sourceName&mdash;Rule applies only to the source name after the point is parsed.</li>
<li>&lt;point tag&gt;&mdash;Rule applies to the value of the specified point tag key after the point is parsed.</li>
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
<li>pointLine&mdash;Rule applies to the whole point line before it's parsed (can be used with Operations for Applications and Graphite data formats only). </li>
<li>metricName&mdash;Rule applies only to the metric name after the point is parsed.</li>
<li>sourceName&mdash;Rule applies only to the source name after the point is parsed.</li>
<li>&lt;point tag&gt;&mdash;Rule applies to the value of the specified point tag key after the point is parsed.</li>
</ul></td>
</tr>
<tr>
<td>actionSubtype</td>
<td>Allows you determine how we limit length:
<ul>
<li><strong>drop</strong>&mdash;Drops requested scope if value is greater than maxLength. You can't use DROP with the metric name or source name.</li>
<li><strong>truncate</strong>&mdash;Truncates requested scope if value is greater than maxLength.</li>
<li><strong>truncateWithEllipsis</strong>&mdash;Truncates the requested scope if the value is greater than maxLength but preserving ellipsis (three dots). maxLength must be at least 3 for this action type.</li>
</ul></td>
</tr>
<tr>
<td>maxLength</td>
<td>The maximum length of the input metric name, source name, or point tag. Only if the length of the input is  greater than maxLength, the rule is applied.</td>
</tr>
<tr>
<td>match (optional)</td>
<td>Regular expression. If specified, limitLength applies only to tags with a value that matches this regular expression.v</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Examples</strong></font>

```yaml
  # truncate the length of all metric names starting with "metric"
  # i.e. from "metric.name.2.test" to "metric.2.name..."
  ################################################################
  - rule          : limit-metric-name-length
    action        : limitLength
    scope         : metricName
    actionSubtype : truncateWithEllipsis
    maxLength     : 16
    match         : "^metric.*"
```

The following example illustrates using a `limitLength` for a point tag. The limit applies to the key-value **combination**. That means even if you set `maxLength` to 235, and if the point tag key has 235 characters, the service might reject what the proxy is sending if the point tag value has 22 characters (235 + 22 = 257).

```yaml
  # Make sure that the limit that you are setting is not higher
  # than the default Operations for Applications limit.
  ################################################################
  - rule          : limit-point-tag-length
    action        : limitLength
    scope         : "my_point_tag"
    actionSubtype : truncateWithEllipsis
    maxLength     : 235
```

## Span Filtering Rules

[Operations for Applications distributed tracing](tracing_basics.html) gives you end-to-end visibility into an entire request across application services by allowing you to examine traces and spans. Span filtering rules allow you to specify a block list or allow list that determines which spans the proxy sends to Operations for Applications.

{% include tip.html content="The span filtering rules and span altering rules apply to data coming from any supported source, including Jaeger and Zipkin." %}

### spanBlock

Defines a regex that spans must match to be filtered out. In the example below, we don't allow spans with a source name that starts with `qa-service`.

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
<td>spanBlock </td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>spanName&mdash;Rule applies only to span name.</li>
<li>sourceName&mdash;Rule applies only to the source name.</li>
<li>&lt;span tag&gt;&mdash;Rule applies to the value of the specified span tag (annotation) key.</li>
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
    action  : spanBlock
    scope   : sourceName
    match   : "qa-service.*"
```

### spanAllow

Points must match the `spanAllow` list to be accepted. Multiple `spanAllow` rules are allowed. A point must match all rules.

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
<td>spanAllow </td>
</tr>
<tr>
<td>scope</td>
<td>Any of the following:
<ul>
<li>spanName&mdash;Rule applies only to the span name.</li>
<li>sourceName&mdash;Rule applies only to the source name. </li>
<li>&lt;span tag&gt;&mdash;Rule applies to the value of the specified span tag (annotation) key.</li>
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
    action  : spanAllow
    scope   : sourceName
    match   : ".*prod.*"
```

## Span Altering Rules

Span altering rules allow you to add, remove, or update span tags.

{% include tip.html content="The span filtering rules and span altering rules apply to data coming from any supported source, including Jaeger and Zipkin." %}

{% include important.html content="RED metrics data is not automatically updated when you update the span data, such as the span name, source name, and point tags, using preprocessor rules. Therefore, make sure to update the RED metrics data similar to the span data using preprocessor rules. See [tracing FAQs](tracing_faq.html#why-arent-my-red-metrics-updated-after-updating-spans) for details."%}


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
<li>&lt;span tag&gt;&mdash;Rule applies to the value of the specified span tag (annotation) key.</li>
</ul></td>
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
  # replace dashes with with underscores in the span name
  # if span name starts with "app", i.e. change "app.span-service-frontend" to
  # "app.span_service_frontend"
  ################################################################
  - rule    : example-app-span-replace-dashes
    action  : spanReplaceRegex
    scope   : spanName
    search  : "-"
    replace : "_"
    match   : "^app.*"
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
<li>&lt;span tag&gt;&mdash;Rule applies to the value of the specified span tag (annotation) key.</li>
</ul></td>
</tr>
<tr>
<td>match (optional)</td>
<td>Regular expression. If specified, force lower case only if the value matches this regular expression.</td>
<tr>
<td>firstMatchOnly (optional)</td>
<td>If set to true, performs string replacement only on the first matching span tag’s value. Only applicable when scope is a span tag. Default is false.</td>
</tr>
</tr>
</tbody>
</table>

<font size="3"><strong>Example</strong></font>

```yaml
  # force lowercase on span name (with optional regex match)
  ################################################################
  - rule          : example-span-force-lowercase
    action        : spanForceLowercase
    scope         : spanName
    match         : "^UPPERCASE.*$"
    firstMatchOnly: false
```

### spanAddTag and spanAddTagIfNotExists

Add a span tag to all spans.
* `spanAddTag` adds the new span tag and assigns the new value to it. Spans do not restrict you from adding tags with the same name. If you want to update the value of a span tag, you need to [drop the span tag](#spandroptag) and add it again.
* `spanAddTagIfNotExists` adds the span tag only if it does not already exist.

{% include note.html content="You can add up to 20 span tags. Contact [support@wavefront.com](mailto:support@wavefront.com) if this does not meet your requirements." %}

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
    key     : env
    value   : "prod"

  # add "env=prod" point tag to all spans sent through this port
  # unless already tagged with "env"
  ################################################################
  - rule    : example-span-tag-all-metrics-if-not-exists
    action  : spanAddTagIfNotExists
    key     : env
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
<td>firstMatchOnly (optional)</td>
<td>If set to true, removes only the first matching tag. Default is false.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Examples</strong></font>

```yaml
  #  remove "az" annotation if its value starts with "dev"
  ################################################################
  - rule           : example-span-drop-az-annotation
    action         : spanDropTag
    key            : az
    match          : dev.*

  # remove first "bindTo" tag where a value starts with "dev"
  # i.e. `bindTo=prod1 bindTo=dev1 bindTo=prod2 bindTo=dev2` will become
  # `bindTo=prod1 bindTo=prod2 bindTo=dev2`
  ################################################################
  - rule           : example-span-drop-bindto-dev-tags
    action         : spanDropTag
    key            : bindTo
    match          : ^dev.*
    firstMatchOnly : true
```

### spanExtractTag and spanExtractTagIfNotExists

Extract a string from a span name, source name, or a span tag value and create a new span tag from that string.
* For `spanExtractTag`, create the new span tag.
* For `spanExtractTagIfNotExists`, do not create the new span tag if at least one tag with this name already exists.

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
<li>&lt;span tag&gt;&mdash;Rule applies to the value of the specified span tag (annotation) key.</li>
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
<td>String or pattern that will be used as a value for the new span tag. Empty string is allowed. Refer to a capturing group in the search regex using $ and its number (starting from 1). For example, use $1 to refer to the first group. </td>
</tr>
<tr>
<td>replaceInput (optional)</td>
<td>Modify the name of the input. Refer to a capturing group in the search regex using $ and its number (starting from 1). For example, use $1 to refer to the first group.</td>
</tr>
<tr>
<td>firstMatchOnly (optional)</td>
<td>If set to true, performs string replacement only on the first matching span tag’s value. Only applicable when <strong>input</strong> is a span tag and <strong>replaceInput</strong> is specified. Default is false.</td>
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

### spanRenameTag
Renames a span tag. The renaming does not affect the values stored in a span.

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
<td>spanRenameTag</td>
</tr>
<tr>
<td>key</td>
<td>The span tag to be renamed.</td>
</tr>
<tr>
<td>newkey</td>
<td>The new name for the span tag.</td>
</tr>
<tr>
<td>match (optional)</td>
<td>If specified, renames a span tag if its value matches this regular expression.</td>
</tr>
<tr>
<td>firstMatchOnly (optional)</td>
<td>If set to true, renames only the first matching span tag. Default is false.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Example</strong></font>

```yaml
  ## rename the "guid:x-request-id" span tag to "guid-x-request-id" by
  ## removing the invalid punctuation (":") to prevent it from being blocklisted.
  ################################################################
  - rule   : rename-span-tag-x-request-id
    action : spanRenameTag
    key    : guid:x-request-id
    newkey : guid-x-request-id

  ## rename a span tag if its value is numeric. For example, myDevice=123 is renamed to device=123,
  ## but myDevice=text123 is not changed.
  ################################################################
  - rule   : rename-numeric-span-tag
    action : spanRenameTag
    key    : myDevice
    newkey : device
    match  : "^\\d*$"
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
<li>&lt;span tag&gt;&mdash;Rule applies to the value of the specified span tag (annotation) key.</li>
</ul></td>
</tr>
<tr>
<td>actionSubtype</td>
<td>Allows you determine how we limit length:
<ul>
<li><strong>drop</strong>&mdash;Drops requested scope if value is greater than maxLength. You can't use DROP with the metric name or source name.</li>
<li><strong>truncate</strong>&mdash;Truncates requested scope if value is greater than maxLength.</li>
<li><strong>truncateWithEllipsis</strong>&mdash;Truncates the requested scope if the value is greater than maxLength but preserving ellipsis (three dots). maxLength must be at least 3 for this action type.</li>
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
<td>firstMatchOnly (optional)</td>
<td>If set to true, applies only to the first matching span tag. Only applicable when the scope is a span tag. Default is false.</td>
</tr>
</tbody>
</table>

<font size="3"><strong>Example</strong></font>

```yaml
  ## truncate 'db.statement' annotation value at 128 characters,
  ## replace last 3 characters with '...'.
  ################################################################
  - rule          : example-limit-db-statement
    action        : spanLimitLength
    scope         : "db.statement"
    actionSubtype : truncateWithEllipsis
    maxLength     : "128"
```
## Next Steps
To apply the Wavefront proxy preprocessor rules when certain conditions are met, [add preprocessor rule conditions](proxies_preprocessor_rule_conditions.html)

## Learn More!

To monitor the time a proxy is spending with preprocessing rules, examine the [**Proxy Troubleshooting**](monitoring_proxies.html#proxy-troubleshooting) section on the **Operations for Applications Service and Proxy Data** dashboard.
