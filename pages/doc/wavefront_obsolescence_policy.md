---
title: Wavefront Obsolescence Policy
keywords: release notes
tags: [release notes]
sidebar: doc_sidebar
permalink: wavefront_obsolescence_policy.html
summary: Learn about the Wavefront policy for retiring features.
---
Product versions and features move to end-of-life as part of the normal software development lifecycle, security improvements, and other factors. To support planning for upgrades, this document provides information on upcoming lifecycle changes. While every effort is made to provide sufficient notice of changes, security issues or other factors may occasionally lead to accelerated end-of-life dates.

## Lifecycle Stages

To help you plan for end-of-life dates, this page uses the following terms:

* **Deprecated**. Feature, component, platform, or functionality that may no longer be efficient or safe.  Deprecated features are supported but no longer recommended. Wavefront eventually removes deprecated features. Bug fixes are at Wavefront's discretion. In particular, Wavefront may require migration to the new feature in lieu of fixing a bug in a deprecated feature. Wavefront identifies deprecated features in the release notes for the release in which the feature is deprecated. For Wavefront proxy, the table below lists deprecated versions.
*  **End-of-life**. No longer supported. Feature, component, platform, or functionality is no longer supported and may be removed from the product at any time.


## Wavefront Proxy

Upgrade to the **latest GA release** of the Wavefront proxy to get the latest bug fixes and performance enhancements.

The following proxy versions are scheduled to be deprecated or moved to end-of-life.

<table class="width: 100%;">
<thead>
<tr><th width="33%">Version</th><th width="33%">Current Stage</th><th width="34%">End-of-Life Date</th></tr>
</thead>
<tbody>
<tr>
<td>5.x, 6.x, 7.x, 8.x</td>
<td>Deprecated</td>
<td>TBD</td>
</tr>
<tr>
<td>4.x</td>
<td>Deprecated</td>
<td>Dec 31, 2020</td>
</tr>
<tr>
<td>3.24 and lower</td>
<td>End-of-Life</td>
<td>Jun 30, 2017</td>
</tr>
</tbody>
</table>
<p></p>
<h2>Wavefront API</h2>
<table class="width: 100%;">
<thead>
<tr><th width="33%">Version</th><th width="33%">Current Stage</th><th width="34%">End-of-Life Date</th></tr>
</thead>
<tbody>
<tr>
<td>2</td>
<td>Active</td>
<td>TBD</td>
</tr>
<tr>
<td>1</td>
<td>End-of-Life</td>
<td>Dec 31, 2017</td>
</tr>
</tbody>
</table>

<!---
## Delta Counters

Wavefront delta counter behavior changed with [Release 2020.26](2020.26.x_release_notes.html).
* The original delta counter implementation is now obsolete.
* The original delta counter implementation is End of Live March 31, 2021.

--->
