---
title: Sources
keywords: sources
tags: [administration]
sidebar: doc_sidebar
permalink: sources_managing.html
summary: Learn about sources and how to manage them.
---

In VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront), a **source** is a unique application, host, container, or instance that emits metrics. The source is explicitly set in the `source` field of an [Operations for Applications data format](wavefront_data_format.html) metric. For AWS integrations, the source is extracted from the [AWS CloudWatch service properties or dimensions](integrations_aws_metrics.html#aws_sources).

* To view and manage sources, click **Browse > Sources** on the toolbar.
* To filter and group in charts, use the Wavefront Query Language. You can filter by source and [filter and group by source tags](tags_overview.html#source-tags).

{% include shared/permissions.html entity="sources" entitymgmt="Source Tag" %}

## Examine Sources in the Source Browser

If you don't see metrics in charts that filter by source, you can examine sources in the Sources browser.

{% include note.html content="The Sources browser doesn't filter out the obsolete sources." %}  

![An annotated screenshot of the sources browser, where what you can do is listed in the bullet list bellow.](/images/sources-browser-page.png)

On the Sources browser, you can:

* Search for sources and apply filters to the sources so that you can narrow down the results.
* Share, save, and clear search results.
* Browse through a list of saved searches.
* Hide or show the filters and the saved searches list displayed on the left by clicking the **Filters** button.
* Show the details for all sources by turning on the **Expand All** toggle. By default, this setting is turned off.
* Show the details for a specific source by clicking the arrow next to the check box of the source.
* Hide a single source or create a maintenance window for the alerts with a particular source by clicking the ellipsis icon and selecting the respective option from the menu.
* Select the check boxes of multiple sources and delete them by clicking the **Delete** button.
* Add or remove source tags.
* Show or hide obsolete and hidden sources.

### Step 1: Find a Source

When you select **Browse > Sources** the Sources browser offers many options to zoom in on the sources you're interested in.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
Filter sources by status.
<ul>
<li><strong>Obsolete</strong>&mdash;Sources that didn't emit metrics for a certain period of time (obsolescence period). (Maps to <code>~status.error</code>.)
{% include note.html content="The obsolescence period (by default 2 weeks) might vary, because it depends on the configuration of your cluster. You can see your current configuration by looking into the Advanced settings of any [chart](ui_charts.html#include-metrics-that-stopped-reporting) or [dashboard](ui_dashboards.html#set-dashboard-display-preferences-and-settings). To change this configuration, contact [Technical Support](wavefront_support_feedback.html)." %}</li>
<li><strong>Recent Metrics</strong>&mdash;Sources with metrics received in the last 2 days. (Maps to <code>~status.new</code> and <code>~status.ok</code>.)</li>
<li><strong>Metrics Stopped</strong>&mdash;Sources with no metrics received in the last 2 days. (Maps to <code>~status.stopped</code>.)</li>
</ul> </td>
<td width="50%"><img src="/images/sources_status.png" alt="hide sources"></td>
</tr>
<tr>
<td width="50%">
<p>Filter sources by tag. In most environments, administrators add source tags. You can <a href="tags_overview.html#source-tags">add source tags</a> from the UI or programmatically.</p>
<p>In the screenshot on the right, we've filtered by the tag `integration.linux`.</p></td>
<td width="50%"><img src="/images/sources_tag_paths.png" alt="multiple tags for selection"></td>
</tr>
</tbody>
</table>

### Step 2: Examine the Source

When you select a source in the Sources browser, you can examine it in more detail on a second page.


![Sources exploration page with 2 sources selected in left panel and charts created. Also highlighting point rate chart and Alerts Fired chart](/images/sources_exploration.png)

## Hide and Show Sources

With more and more companies using dynamic services such as AWS, it's typical to have sources constantly being spun up and shut down.
* In the Sources browser, all sources are included unless you explicitly exclude Obsolete sources.
* In the Metrics browser and Query Editor, obsolete sources are no longer shown in the autocomplete drop-down menu. You can also manually hide sources by using the UI or API.

{% include note.html content="While hidden sources are removed from the autocomplete drop-down menu, you can still use these sources in `ts()` queries when data values are present." %}

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<strong>To hide one or more sources:</strong>
<ol>
<li>Click <strong>Browse > Sources</strong> on the toolbar.</li>
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
<li>Click <strong>Browse > Sources</strong> on the toolbar.</li>
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
<li>Click <strong>Browse > Sources</strong> on the toolbar.</li>
<li>Click the name of the source you're interested in.<p>The page containing details about the source and charts such as <strong>Rate of Metrics Points</strong>, <strong>Alerts Fired</strong>, and so on opens.</p></li>
<li>Click <strong>Add a Description</strong>.</li></ol>
All users can now view the description. </td>
<td width="50%"><img src="/images/add_source_description.png" alt="add a source description"></td>
</tr>
</tbody>
</table>
