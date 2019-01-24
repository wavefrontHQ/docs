---
title: Managing Source Tags
keywords:
tags: [data, proxies]
sidebar: doc_sidebar
permalink: source_tags.html
summary: Learn about adding source tags from the UI, API, or CLI.
---

You can use source tags to group sources, for example, to examine only production hosts but not development hosts.


Watch the following video for an introduction to point tags and source tags:

<p><a href="https://www.youtube.com/watch?v=9tt4orZHQts&index=3&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K"><img src="/images/v_tagging_clement.png" style="width: 700px;" alt="tagging"/></a>
</p>

## Source Tag Overview

This page explains how to add source tags explicitly from the UI, CLI, or API.

Here's some background info:
* Any Wavefront metric includes a source name. If source names change frequently or if you want to filter sources, a source tag can help.
* Point tags are key-value pairs, in contrast, source tags are just strings -- you can only choose the value.
* Your use case determines how to use source tags:
  - Use a source tag hierarchy, that is, have source tags dot-delimited, for example `env.cluster.role.role1`.
  In that case, your query might include `... and tag=env.cluster.role.*`
  - Use source tags as intersection sets, that is, use multiple tags (e.g. `env`, `cluster`, `role`, etc).
  In that case, your query might include`... and tag=env and tag=cluster`.


## Adding Source Tags from the API

You can add source tags using the [Wavefront REST API](wavefront_api.html).  The API supports getting and setting source tag values.

For details about the APIs, click the gear icon in your Wavefront instance and select **API Documentation**.

## Adding Source Tags from the UI

To add a source tag from the UI:
1. Click **Browse>Sources**.
2. Select one or more sources and click **+Tag** or click the **+** icon below the source. You can add an existing source tag or create a new source tag.

## Adding Source Tags and Source Descriptions 

You can use the `SourceTag` and `SourceDescription` properties to add source tags and source descriptions before the metrics reach Wavefront. Starting with proxy version 4.24, you send these properties to the same listening port as regular metrics (`pushListenerPorts` setting, 2878 by default).

To send a source tag or source description to a proxy, you can include commands like a following:

```
@SourceTag action=save source=app-1 highPriority
```

<table>
<thead>
<tr>
<th width="15%">Property</th>
<th width="40%">Purpose</th>
<th width="45%">Example </th>
</tr>
</thead>
<tbody>
<tr>
<td>SourceTag</td>
<td>Save or delete a source tag. For example, you use this property to inject a source tag into a database on a host. Use <code>SourceTag</code> with <code>action=</code> and <code>source=</code> arguments.  NOTE: Use quotes if any of the values includes spaces or special characters.
<ul>
<li><code>action</code> is either save or delete.</li>
<li><code>source</code> takes the source name as the first value, followed by a source tag to save or delete.</li>
</ul>
</td>
<td>Ex:<code> &#64;SourceTag action=save source=host_42 db1</code>
<div>Ex:<code> &#64;SourceTag action=delete source=host_42 sourceTag1</code></div>
</td>
</tr>
<tr>
<td>SourceDescription</td>
<td>Save or delete a description on the specified source. You can use this property to add a description or delete an existing description. Use `SourceDescription` with <code>action=</code>, <code>source=</code>, and <code>description=</code> arguments. NOTE: Use quotes if any of the values includes spaces or special characters.
<ul>
<li><code>action</code> is either save or delete.</li>
<li><code>source</code> takes the source as the first value, followed by a descriptor.</li>
<li><code>description</code> allows you to specify a description for the tag.</li>
</ul>
</td>
<td>Ex:<code>&#64;SourceDescription action=save source="sourceId" description=A Description</code>
<div>Ex:<code>&#64;SourceDescription action=delete source="sourceId"</code></div></td>
</tr>
</tbody>
</table>
