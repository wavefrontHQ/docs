---
title: Preprocessor Rule Conditions
keywords:
tags: [proxies]
sidebar: doc_sidebar
permalink: proxies_preprocessor_rule_conditions.html
summary: Learn how to add conditions on Wavefront proxy preprocessor rules.
---
You can set up your environment to apply a [proxy preprocessor rule](proxies_preprocessor_rules.html) only when multiple conditions are met or when certain conditions are met and other conditions are not met.

{% include tip.html content="Starting with Proxy 9.x, `*blacklist` has been replaced with `*block` and `*whitelist` has been replaced with `*allow`. This documentation page uses the new configuration parameter names. " %}

## Example

For example, you might want to block list spans only if it
* has span tags that match both `"span.kind"="server"` and (`"http.status_code"="302"` or `"http.status_code"="404"`)
* and has no span tags that match `debug=true`

You can use the `if` parameter to fine-tune when a rule applies. For the example above, you can create a rule like this.

<ul id="profileTabs" class="nav nav-tabs">
    <li class="active"><a href="#current" data-toggle="tab">Current Format</a></li>
    <li><a href="#beta" data-toggle="tab">Proxy 9 and Later</a></li>
</ul>
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="current">
        <pre>
## drop spans that match the following:
## "span.kind"="server" and ("http.status_code"="302" or "http.status_code"="404")
'2878':
  - rule: test-block-list
    action: spanBlock
    if:
      all:
        - equals:
            scope: http.status_code
            value: ["302, 404"]
        - equals:
            scope: span.kind
            value: "server"
        - none:
          - equals:
              scope: debug
              value: "true"

        </pre>
    </div>

    <div role="tabpanel" class="tab-pane" id="beta">
    <p> The new format, which is in BETA, is a simpler version on how to use the <code>if</code> parameter to fine-tune when a rule applies.</p>
      <pre>
## drop spans that match the following:
## "span.kind"="server" and ("http.status_code"="302" or "http.status_code"="404")
'2878':
    - rule: test-block-list
      action: spanBlock
      if: >
        &#123;&#123;http.status_code&#125;&#125; in ("302", "404") and &#123;&#123;span.kind&#125;&#125; = "server"
        and not &#123;&#123;debug&#125;&#125; = "true"
    </pre>
    </div>
  </div>


The `if` parameter is always followed by just one operator, one of the following:
* Comparison operators with scope and value for each.
* Logical operators followed by comparison operators with scope and value for each.

## Comparison Operators

With each comparison operator you specify the scope and the value.

<p><span style="font-size: medium; font-weight: 600">Example</span></p>

```
## Block list spans that have a tag "http.status_code"="302" or "http.status_code"="404"
'2878':
  - rule: test-spanblock-list
    action: spanBlock
    if:
      equals:
        scope: http.status_code
        value: ["302, 404"]
```
<p><span style="font-size: medium; font-weight: 600">Scope</span></p>

The scope is one of the following:

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Scope</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metricName</td>
<td>Compares the specified value with the metric name for a point. </td></tr>
<tr>
<td markdown="span">sourceName</td>
<td>Compares the specified value with the source for a point.</td></tr>
<tr>
<td markdown="span">&lt;pointTagKey&gt;</td>
<td>Compares the specified value with the value of the specified point tag key for a point.</td></tr>
<tr>
<td markdown="span">spanName</td>
<td>Compares the specified value with the span name. </td></tr>
<tr>
<td markdown="span">&lt;spanTagKey&gt;</td>
<td>Compares the specified value with the value of the specified span tag key.</td></tr>
</tbody>
</table>

The value can be a string or a list of string values.

<p><span style="font-size: medium; font-weight: 600">Definition</span></p>

Comparison operators work exactly the way they do in Java.

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Operator</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>equals</td>
<td>Tests if the metricName, sourceName, etc. is equal to the value.</td></tr>
<tr>
<td>startsWith</td>
<td>Tests if the metricName, sourceName, etc. starts with the value.</td></tr>
<tr>
<td>endsWith</td>
<td>Tests if the metricName, sourceName, etc. ends with the value.</td></tr>
<tr>
<td>contains</td>
<td>Tests if the metricName, sourceName, etc. contains the value.</td></tr>
<tr>
<td>regexMatch</td>
<td>Allows you to define a Java regex to match the value.</td></tr>
</tbody>
</table>

## Logical Operators

Logical operators support nesting in any proxy preprocessor rule. The logical operator always requires comparison operators with a scope and a value, as shown in the following example of nested operators.

In the example below, the rule applies only if at least one of the specified conditions are met:
* The sourceName has the value `prod` and a metricName has the value `mymetric.`.
* The metricName starts with the string `mymetric.prod.`
* The env point tag is equal to `prod`

```
## Example showing nested predicates: The below rule allows all "prod" metrics.
'2878':
  - rule: test-allow-list
    action: allow
    if:
      any:
        - all:
          - contains:
              scope: sourceName
              value: "prod"
          - startsWith:
              scope: metricName
              value: "mymetric."
        - startsWith:
            scope: metricName
            value: "mymetric.prod."
        - equals:
            scope: env
            value: "prod"
```

Here are examples for each logical operator:

<table style="width: 100%;">
<thead>
<tr><th width="15%">Operator</th><th width="85%">Example</th></tr>
</thead>
<tbody>
<tr>
<td>all</td>
<td>Rule applies if a point's sourceName contains <strong>prod</strong> or <strong>staging</strong>, AND the point's metricName starts with <strong>mymetric.</strong>:
<code>
all:
    - contains:
        scope: sourceName
        value: &lbrack;"prod", "staging"&rbrack;
    - startsWith
        scope: metricName
        value: "mymetric."
</code></td></tr>
<tr>
<td>any</td>
<td>
Rule applies if sourceName contains <strong>prod</strong> OR metricName starts with <strong>mymetric.</strong>:
<code>
any:
    - contains:
        scope: sourceName
        value: "prod"
    - startsWith
        scope: metricName
        value: "mymetric."
</code></td></tr>
<tr>
<td>none</td>
<td>Rule DOES NOT apply if either of the conditions is met. That means either the span’s sourceName contains the substring <strong>prod</strong> or the spanName starts with <strong>dev</strong>.
<code>
none:
    - contains:
        scope: sourceName
        value: “prod”
    - endsWith
        scope: spanName
        value: "dev."
</code></td></tr>
<tr>
<td>ignore</td>
<td>This operator doesn't have an effect but can be used to temporarily disable a section of the rule.
<code>
ignore:
     - contains:
         scope: debug
         value: “true”
</code></td></tr>
</tbody>
</table>
