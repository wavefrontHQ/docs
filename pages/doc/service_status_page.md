---
title: Monitor the Status of Your Service
tags: [administration]
sidebar: doc_sidebar
permalink: service_status_page.html
summary: Monitor for incidents and maintenance on your service.
---

VMware publishes service operational status and maintenance schedules to the [VMware Cloud Services Status Page](https://status.vmware-services.io/). For confidentiality reasons, the individual customer clusters are listed with alias names.

## Find Your Cluster Alias Name

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
To see the status of your VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) service, you must get the alias name of your cluster.
<ol>
<li>Log in to your service instance and click the gear icon on the toolbar.</li>
<li>Under <strong>VMware Status Page</strong>, see your cluster alias name.</li>
</ol>
</td>
<td width="40%"><img src="images/alias_name.png" alt="The gear icon drop-down menu with the VMware Status Page section."></td>
</tr>
</tbody>
</table>

## View the Status of Your Service

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
To check whether your service is fully operational or it's undergoing maintenance, you can visit the VMware Cloud Services Status Page.
<ol>
<li>In a web browser, go to <a href="https://status.vmware-services.io">https://status.vmware-services.io</a>.</li>
<li>Expand <strong>VMware Aria Operations for Applications</strong>.
<ul>
<li>The status icon next to <strong>VMware Aria Operations for Applications</strong> shows the status of the central service.</li>
<li>The status icon next to your <a href="#find-your-cluster-alias-name">cluster alias name</a> shows the status of your service instance.</li>
</ul></li>
If both status icons are green check marks, your service is fully operational.</ol>
</td>
<td width="40%"><img src="images/service_status.png" alt="The VMware Cloud Services Status Page with expanded VMware Aria Operations for Applications."></td>
</tr>
</tbody>
</table>

## Subscribe for Status Updates

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
You can subscribe to receive notifications for incidents and scheduled maintenance of your service.
<ol>
<li>In a web browser, go to <a href="https://status.vmware-services.io">https://status.vmware-services.io</a>.</li>
<li>In the top-right corner, click <strong>Subscribe to Updates</strong>.</li>
<li>Select the notification method that you want to use, enter your contact details, and click <strong>Subscribe</strong></li>
<li>On the next page, next to <strong>Components</strong>, click <strong>Select none</strong> to deselect all services.</li>
<li>Scroll down to <strong>VMware Aria Operations for Applications</strong>.</li>
<li>Select the check boxes for both <strong>VMware Aria Operations for Applications</strong> and your alias cluster name, and click <strong>Save</strong>.</li>
<li>Click the confirmation link that we sent to you.</li>
</ol>
</td>
<td width="40%"><img src="images/status_subscribe.png" alt="Components selection for subscription on the VMware Cloud Services Status Page."></td>
</tr>
</tbody>
</table>
