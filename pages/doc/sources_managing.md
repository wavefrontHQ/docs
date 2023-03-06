---
title: Sources
keywords: sources
tags: [administration]
sidebar: doc_sidebar
permalink: sources_managing.html
summary: Learn about sources and how to manage them.
---
In VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront), a **source** is a unique application, host, container, or instance that emits metrics. The source is explicitly set in the `source` field of an [Operations for Applications data format](wavefront_data_format.html) metric. For AWS integrations, the source is extracted from [AWS Cloud Watch service properties or dimensions](integrations_aws_metrics.html#aws_sources).

* To view and manage sources, select **Browse > Sources**.
* To filter and group in charts, use the Wavefront query language. You can filter by source and [filter and group by source tags](tags_overview.html#source-tags).

{% include shared/permissions.html entity="sources" entitymgmt="Source Tag" %}

## Examine Sources in the Source Browser

If you don't see metrics in charts that filter by source, you can examine sources in the Source browser.

{% include note.html content="The Sources browser doesn't filter out the obsolete sources." %}

### Step 1: Find a Source

When you select **Browse > Sources** the Sources browser offers many options to zoom in on the sources you're interested in.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
Filter sources by status.
<ul>
<li><strong>Obsolete</strong>&mdash;Sources that didn't emit metrics for a certain period (obsolescence period). (Maps to <code>~status.error</code>.)
{% include note.html content="By default, the obsolescence period for metrics and sources is 4 weeks. You can see your current configuration by looking into the Advanced settings of any [chart](ui_charts.html#include-metrics-that-stopped-reporting) or [dashboard](ui_dashboards.html#set-dashboard-display-preferences-and-settings). To change this configuration, contact [Technical Support](wavefront_support_feedback.html)." %}</li>
<li><strong>Recent Metrics</strong>&mdash;Sources with metrics received in the last 2 days. (Maps to <code>~status.new</code> and <code>~status.ok</code>.)</li>
<li><strong>Metrics Stopped</strong>&mdash;Sources with no metrics received in the last 2 days. (Maps to <code>~status.stopped</code>.)</li>
</ul> </td>
<td width="50%"><img src="/images/sources_status.png" alt="hide sources"></td>
</tr>
<tr>
<td width="50%">
<p>Filter sources by tag. In most environments, administrators add source tags. You can <a href="tags_overview.html#source-tags">add source tags</a> from the UI or programmatically.</p>
<p>In the screenshot on the right, we've filtered by the tag wavefront.aws.billing and selected Recent Metrics (which shows as <strong>ok</strong> in the search bar).</p></td>
<td width="50%"><img src="/images/sources_tag_paths.png" alt="multiple tags for selection"></td>
</tr>
</tbody>
</table>

### Step 2: Examine the Source

When you select a source in the Sources browser, you can examinine it in more detail on a second page.


![Sources exploration page with 2 sources selected in left panel and charts created. Also highlighting point rate chart and Alerts Fired chart](/images/sources_exploration.png)

## Hide and Unhide Sources

With more and more companies using dynamic services such as AWS, it's typical to have sources constantly being spun up and shut down.
* In the Sources browser, all sources are included unless you explicitly exclude Obsolete sources.
* In the Metrics browser and Query Editor, obsolete sources are no longer shown in the autocomplete dropdown. You can also manually hide sources by using the UI or API.

{% include note.html content="While hidden sources are removed from the autocomplete dropdown, you can still use these sources in `ts()` queries when data values are present." %}

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<strong>To hide one or more sources:</strong>
<ol>
<li>Select <strong>Browse > Sources</strong>.</li>
<li>Select one or more sources and click <strong>Hide</strong>.</li></ol> </td>
<td width="50%"><img src="/images/hide_sources.png" alt="hide sources"></td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<strong>To view hidden sources</strong>
<ol>
<li>Select <strong>Browse > Sources</strong>.</li>
<li>Use the toggle in the top right of the Sources browser.</li></ol> </td>
<td width="50%"><img src="/images/show_hidden_sources.png" alt="show hidden sources"></td>
</tr>
</tbody>
</table>


## Add and Edit Source Descriptions

Source descriptions are a great way to add details, such as the role, availability zone, or running applications, to a source.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<strong>To add or edit a source description:</strong>
<ol>
<li>Select <strong>Browse > Sources</strong>.</li>
<li>Select a source.</li>
<li>Click <strong>Add a Description</strong>.</li></ol>
All users can now view the description. </td>
<td width="50%"><img src="/images/add_source_description.png" alt="add a source description"></td>
</tr>
</tbody>
</table>
