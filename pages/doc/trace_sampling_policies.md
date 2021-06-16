---
title: Trace Sampling Policy
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: trace_sampling_policies.html
summary: Learn how to sample your trace data and see them in Wavefront using trace sampling policies.
---

Couldn't find traces in Wavefront because it was sampled out due to [intelligent sampling](trace_data_sampling.html)? Now, You can create a trace sampling policy and let Wavefront know that you want to keep specific traces in wavefront. Creating a trace sampling policy affects your costs as you store more data within Wavefront [LINK to the costs page]. Let's look at how you can create a trace sampling policy and get familiar with the policy expressions.

{% include note.html content="Only a [Super Admin user](authorization.html#who-is-the-super-admin-user) or users with [Applications permissions](permissions_overview.html) can create trace sampling policies." %}

## Create a Trace Sampling Policy



## Add a Policy Expression

Define a policy expression to let Wavefront know about the traces you want to keep. This expression needs to be in the YAML format and includes the following attributes.

Let's look at a trace expression that asks Wavefront to store traces if the application name is beachshirts.
![](images/trace_sampling_expression.png)

<table style="width: 100%;">
  <th>
    <tr>
      Attribute
    </tr>
    <tr>
      Description
    </tr>
  </th>
  <tr>
    <td width="20%">
      <b>Key</b>
    </td>
    <td width="80%">
      A source needs to be defined between <code>&#123;&#123;&#125;&#125;</code> . The source you define is considered a <a href="trace_data_details.html#span-tags">span tag key</a>.
      
      <br/>For example, you can pass the following values as a source and any span tag key: <code>&#123;&#123;spanName&#125;&#125;</code>, <code>&#123;&#123;sourceName&#125;&#125;</code>, <code>&#123;&#123;startMillis&#125;&#125;</code>, <code>&#123;&#123;duration&#125;&#125;</code>, and more.
    </td>
  </tr>
  <tr>
    <td width="20%">
      <b>Operation</b>
    </td>
    <td width="80%">
      The following operations are supported:
      
      <br/><br/><b>Operations that are case sensitive:</b> These operations consider the case sensitivity in the values you provide.
        <ul>
          <li>
            <code>=</code>, <code>></code>, <code><</code>, <code><=</code>, <code>>=</code>, <code>!=</code>
          </li>
          <li>
            <code>equals</code>, <code>startsWith</code>, <code>contains</code>, <code>endsWith</code>, <code>matches</code>
          </li>
          <li>
            <code>and</code>, <code>or</code>
          </li>
          <li>
            <code>not</code>
          </li>
          <li>
            <code>in</code>
          </li>
        </ul>
        
      <b>Operations that are not case sensitive:</b> These operations ignore the case sensitivity in the values you provide.
        <ul>
          <li>
            <code>equalsIgnoreCase</code>
          </li>
          <li>
            <code>startsWithIgnoreCase</code>
          </li>
          <li>
            <code>endsWithIgnoreCase</code>
          </li>
          <li>
            <code>containsIgnoreCase</code>
          </li>
          <li>
            <code>matchesIgnoreCase</code>
          </li>
        </ul>
      
    </td>
  </tr>
  <tr>
    <td width="20%">
      <b>Value</b>
    </td>
    <td width="80%">
      The value needs to be defined between <code>""</code>.
    </td>
  </tr>
</table>

<p><span style="font-size: large; font-weight: 500">Example</span></p>

The policy expression creates a trace sampling policy to keep all spans from the `beachshirts` application where the operation starts with `Shopping`, the source contains `prod`, and the status code is `400` or `404`.
<pre>
&#123;&#123;application&#125;&#125; = "beachshirts" and 
&#123;&#123;spanName&#125;&#125; startsWith "Shopping." and 
&#123;&#123;sourceName&#125;&#125; contains "prod" and 
&#123;&#123;http.status_code&#125;&#125; in ("400", "404")
</pre>
