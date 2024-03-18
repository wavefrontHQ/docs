---
title: Google Cloud Platform Overview and Permissions
keywords:
tags: [integrations, dashboards]
sidebar: doc_sidebar
permalink: integrations_gcp_overview.html
summary: Minimum permissions for Google Cloud Platform.
---

When you set up a Google Cloud Platform integration, you have to give the Tanzu Observability (formerly known as VMware Aria Operations for Applications) service permissions to access the data you want to visualize and analyze.


## Access Options

Data flows from GCP to Tanzu Observability only if the account has the required access. You have several options, discussed in detail below

<table style="width: 100%;">
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr>
<td>Assign predefined roles</td>
<td markdown="span">In most cases, it makes sense to give the Tanzu Observability account a small set of predefined roles.</td></tr>
<tr>
<td markdown="span">Create IAM policy to specify limited access</td>
<td markdown="span">Explicitly specify the access settings in a custom IAM policy.</td>
</tr>
</tbody>
</table>


## Assign Predefined Roles

You can assign the following predefined roles, depending on which aspect of GCP you want to monitor:
<table style="width: 100%;">
<colgroup>
<col width="40%" />
<col width="60%" />
</colgroup>
<tbody>
<tr>
<td>Billing</td>
<td markdown="span">Compute Viewer, Storage Admin</td></tr>
<tr>
<td markdown="span">Metrics</td>
<td markdown="span">Monitoring Viewer</td>
</tr>
<tr>
<td markdown="span">To AutoDetect GKE clusters</td>
<td markdown="span">GKEHub Viewer</td>
</tr>
</tbody>
</table>


## Giving Limited Access

Instead of using the roles above, you can predefine a custom role and assign the following permissions.

<table style="width: 100%;">
<colgroup>
<col width="40%" />
<col width="60%" />
</colgroup>
<tbody>
<tr>
<td>Billing</td>
<td markdown="span"><code>
compute.instances.list
compute.zones.list
compute.disks.list
storage.buckets.list
</code></td></tr>
<tr>
<td markdown="span">Metrics</td>
<td markdown="span"><code>
monitoring.metricDescriptors.list
monitoring.timeSeries.list
</code></td>
</tr>
<tr>
<td markdown="span">To AutoDetect GKE clusters</td>
<td markdown="span"><code>gkehub.locations.list
</code></td>
</tr>
</tbody>
</table>
