---
title: Monitor Tanzu Mission Control Clusters with Tanzu Observability
keywords:
tags: [integrations, kubernetes]
sidebar: doc_sidebar
permalink: integrations_tmc_howto.html
summary: Monitor Tanzu Mission Control clusters using Tanzu Observability by Wavefront
---

[VMware Tanzu Mission Control](https://docs.vmware.com/en/VMware-Tanzu-Mission-Control/services/tanzumc-concepts/GUID-E2B5BE05-596E-4999-9B21-1CDB875A1BBF.html) provides a centralized management platform for consistently operating and securing your Kubernetes infrastructure and modern applications across multiple teams and clouds.

This document explains
* How to set up and enable the integration from Tanzu Mission Control to Tanzu Observability by Wavefront (Wavefront).
* How to monitor your Kubernetes environment with pre-defined Wavefront dashboards, and how to clone and customize those dashboards.
* How to clone and customize Wavefront alerts for your Kubernetes clusters.
* How to troubleshoot common problems.

<!---
If you want to monitor Tanzu Mission Control with Wavefront, you have two options:
* Set up an integration from Tanzu Mission Control (preferred). The integrations establishes a credentials exchange and makes it easy to monitor any cluster that Tanzu Mission Control manages.
* Monitor individual clusters by using the Wavefront integration with Kubernetes.--->

## Getting Started

To get started, you set up the integration from Tanzu Mission Control to Wavefront:

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">In Wavefront, <a href="integrations_tmc.html#generate-a-service-account-api-token-for-tanzu-mission-control">Generate a Service Account API Token for Tanzu Mission Control</a>.
</td>
<td width="50%"><img src="/images/tmc_service_account_create.png" alt="Create service account dialog with name and description filled in."></td>
</tr>
<tr>
<td width="50%">In the Tanzu Mission Control console
<ol><li>Select <strong>Administration &gt; Accounts</strong>. </li>
<li>Click <strong>Create Account Credential</strong> and select <strong>Tanzu Observability credential</strong></li>
</ol>
</td>
<td width="50%"><img src="/images/tmc_create_credential.png" alt="Pulldown menu shows Tanzu Observability credential as the third item"></td>
</tr>
<tr>
<td width="50%">On the <strong>Create Tanzu Observability credential</strong> page, specify credential attributes:
<ol>
<li><strong>Credential Name</strong>. Name that starts and ends with a letter and contains only lowercase letters, numbers, and hyphens. Best practice is to include the name of the Wavefront instance in the credential name. NOT the name of the service account. </li>
<li><strong>Tanzu Observability URL</strong>URL of the Wavefront instance, for example, <code>https://demo.wavefront.com</code></li>
<li><strong>Tanzu Observability API Token</strong>API Token that you generated inside the Wavefront instance. </li>
</ol> </td>
<td width="50%"><img src="/images/tmc_create_credential_page.png" alt="Create Tanzu Observability page with 3 fields filled in"></td>
</tr>
<tr>
<td width="50%">Still in Tanzu Mission Control, click the <strong>Integrations</strong> tab and verify that Tanzu Observability by Wavefront is enabled. See the Troubleshooting section below if you don't see the integration as enabled after a few minutes.
</td>
<td width="50%"><img src="/images/tmc_enabled.png" alt="Screenshot shows Tanzu Observability is enabled."></td>
</tr>
</tbody>
</table>


{% include tip.html content="For details, see the [Tanzu Mission Control documentation](https://docs.vmware.com/en/VMware-Tanzu-Mission-Control/services/tanzumc-using/GUID-A70E57A8-2C45-46D4-8E1F-6D5E7026473F.html)" %}

## Enable Wavefront for a Tanzu Mission Control Cluster

After you have set up the integration from Tanzu Mission control, you can start visualizing data for any clusters using predefined dashboard.



<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ol>
<li>In Tanzu Mission Control, select <strong>Clusters</strong> and pick the cluster that you want to monitor. </li>
<li>In the <strong>Integrations</strong> tile, click <strong>Add Integration</strong> and select <strong>Tanzu Observability</strong>. </li>
<li>In the <strong>Add Tanzu Observability</strong> dialog, select the credential that is associated with the Wavefront instance that you want to use for monitoring.</li>
<li>After a few minutes, the <strong>Integrations</strong> tile shows the TMC Adapter status <strong>OK</strong></li>
<li>Click the link to Tanzu Observability. The cluster metrics appear in a Wavefront dashboard. </li>
</ol> </td>
<td width="50%"><img src="/images/tmc_add_credential_to_cluster.png" alt="Tanzu Observability Integration dialog with pulldown menu showing credentials. "></td>
</tr>
</tbody>
</table>

![Large screenshot of TMC UI with Clusters selected and Integrations tile visible](/images/tmc_cluster_integrated.png)

## Examine Your Cluster's Data in Dashboards

Dashboards allow you to drill down into your data, change the time window, click on individual charts, use filters, and much more. See [Examine Data with Dashboards and Charts](ui_examine_data.html) or watch this short video for an overview.

<p>
<iframe src="https://bcove.video/2Wux6eP" width="700" height="400" allowfullscreen="true" alt="customizing dashboards video"></iframe>
</p>

The Kubernetes dashboard that you land on from Tanzu Mission Control has several sections with detailed information.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
Scroll down for red flags on the dashboard, or use the Jump To menu to focus on the section you're interested in.</td>
<td width="50%"><img src="/images/tmc_jump_to.png" alt="Tanzu Observability Integration dialog with pulldown menu showing credentials. "></td></tr>
<tr>
<td width="50%">
If you want to customize the charts in the dashboards or add more charts, you can clone the existing dashboard:
<ol>
<li>Select <strong>Clone</strong> from the ellipsis menu in the top right.</li>
<li>Give the cloned dashboard a name and click <strong>OK</strong></li></ol>
You must have <strong>Dashboards</strong> permission inside Wavefront to edit or clone a dashboard. </td>
<td width="50%"><img src="/images/tmc_clone.png" alt="Pulldown menu shows Edit, Clone, Export to PDF"></td>
</tr>
</tbody>
</table>

## Clone and Customize Alerts for Your Tanzu Mission Control Clusters

TBD. Can I do this with Kubernetes alerts?

## Troubleshooting

For some general recommendations,  [Kubernetes Troubleshooting](wf_kubernetes_troubleshooting.html). The following causes for failure and remediation steps are especially useful for Tanzu Mission Control troubleshooting.

### Symptom

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%" markdown="span">
If the integration wasn’t set up successfully, the icon in the Integrations tile shows <strong>Needs Attention</strong>.  </td>
<td width="50%"><img src="/images/tmc_needs_attention.png " alt="Integrations tile shows Needs Attention "></td></tr>
</tbody>
</table>

### Causes

Failure might be caused by a number of issues including:

* Policy restrictions (access permission for pod)
* Nodes are not available for scheduling
* Required Memory / CPU are not available
* Image cannot be pulled
* Pod crash due to internal access logic error

### Remediation
Follow these steps to remediate problems:
1. Ensure that the cluster you want to connect to isn't protected by an SSO solution. If it is, you might have to explicitly log in to the cluster as a user before you can display the Wavefront dashboard.
2. Ensure that the Wavefront API key is active and correctly entered. If the key was revoked, it's not longer valid.

## Learn More

* Get started with some of our [conceptual videos](videos_quickstart.html) or some of our [hands-on videos](videos_how_to_start.html).
* [Explore Your Data](ui_examine_data.html) in the predefined Kubernetes dashboards.
* [Clone any of the predefined dashboards](ui_dashboards.html#edit-or-clone-a-dashboard) and customize them.
* [Examine Alerts](alerts.html) if any are predefined for your cluster.
* See [Kubernetes Troubleshooting](wf_kubernetes_troubleshooting.html)
