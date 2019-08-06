---
title: Sources
keywords: sources
tags: [administration]
sidebar: doc_sidebar
permalink: sources_managing.html
summary: Learn about sources and how to manage them.
---
A source is a unique application, host, container, or instance that emits metrics. The source is explicitly set in the `source` field of a [Wavefront data format](wavefront_data_format.html) metric. For AWS integrations, the source is extracted from [AWS service properties or dimensions](integrations_aws_metrics.html#aws_sources).


[Wavefront Query Language](query_language_reference.html) supports filtering by source and filtering by source tags.



To view and manage sources, select **Browse > Sources**.

{% include shared/permissions.html entity="sources" entitymgmt="Source Tag" %}

## Source Browser

You can view and manage sources from the source browser. It is possible to hide sources. While hidden sources are removed from autocomplete, they can still be used in a query when data values are present.


<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<strong>To browse and manage source</strong>
<ol>
<li>Select <strong>Browse > Sources</strong></li>
<li>Use the options on the left to narrow down your search.</li></ol></td>
<td width="60%"><img src="/images/browse_sources.png" alt="browse sources"></td>
</tr>
</tbody>
</table>

## Add and Edit Source Descriptions

Source descriptions are a great way to add details, such as the role, availability zone, or running applications, to a source.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<strong>To add or edit a source description</strong>
<ol>
<li>Select <strong>Browse > Sources</strong></li>
<li>Select a source</li>
<li>Click <strong>Add a Description</strong></li></ol>
All users can now view the description. </td>
<td width="60%"><img src="/images/add_source_description.png" alt="add a source description"></td>
</tr>
</tbody>
</table>


## Hiding and Unhiding Sources

With more and more companies using dynamic services such as AWS, it's typical to have sources constantly being spun up and shut down. When applying source filters to the Metrics browser or a ts() expression, this can lead to several sources being included in the autocomplete dropdown even when they are no longer reporting data. After 4 weeks of inactivity we remove those sources from the autocomplete dropdown, but you can also manually hide them from the UI or API.

**Note:** While hidden sources are removed from the autocomplete dropdown, those sources can still be used in a ts() query when data values are present.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<strong>To hide one or more sources:</strong>
<ol>
<li>Select <strong>Browse > Sources</strong></li>
<li>Select one or more sources and click <strong>Hide</strong></li></ol> </td>
<td width="60%"><img src="/images/hide_sources.png" alt="hide sources"></td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<strong>To view hidden sources</strong>
<ol>
<li>Select <strong>Browse > Sources</strong></li>
<li>Use the toggle in the top right of the Sources browser.</li></ol> </td>
<td width="60%"><img src="/images/show_hidden_sources.png" alt="add a source description"></td>
</tr>
</tbody>
</table>

## Managing Source Tags

See [Organizing with Tags](tags_overview.html).
