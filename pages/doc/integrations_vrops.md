---
title: vRealize Operations Integration Overview
keywords:
tags: [integrations]
sidebar: doc_sidebar
published: true
permalink: integrations_vrops.html
summary: Understand setup and vRealize Operations integration limitations and caveats.
---
[VMware vRealize Operations](https://www.vmware.com/products/vrealize-operations.html) delivers intelligent operations management with application-to-storage visibility across physical, virtual, and cloud infrastructures. Using policy-based automation, operations teams automate key processes and improve the IT efficiency.


The vRealize Operations integration is a full-featured native integration, that offers agentless data ingestion of vRealize Operations metric data, as well as predefined dashboards.

## How to Register a vRealize Operations Integration

To register a new vRealize Operations instance, you need a Cloud Services console API token and a vRealize Operations endpoint URL.


1. Navigate to the [VMware Cloud Services Console](https://console.cloud.vmware.com/csp/gateway/discovery) page.
1. Click your user name on the right of the toolbar, and select **My Account**.
1. Click the **API Tokens** tab.
1. Click the **Generate a New API Token** button.
1. Enter a meaningful API token name, for example, `wavefront-integration`.
1. Choose to generate a never expiring API Token by selecting **never expiring** from the drop-down menu showing the **Token TTL** units of time.
1. Define the role of the token. 
   
   1. Under **Organization Roles**, select **Organization Member**.
   1. Under **Service Roles**, scroll down, expand **VMware vRealize Operations Cloud**, and select the **vROps ReadOnly** role.
1. Click the **Generate** button.
1. Click the **Copy** button and copy the generated token.
1. Log in to your Wavefront cluster: https://*your-wavefront-cluster*.wavefront.com.
1. Click **Integrations** on the taskbar. 
1. In the VMware section, click the **VMware vRealize Operations** tile.
1. Click **Add Integration**.
1. Provide a meaningful name of the integration.
1. Paste the API token that you generated in the **API Token** text box.
1. Select the resources to fetch.
1. In the **Metric Allow List** text box, add metrics to an allow list by specifying a regular expression. The regular expression must be a complete match of the entire metric name. 
1. In the **Service Refresh Rate** text box, enter the number of minutes between requesting metrics. Default is `5` minutes.
1. Enter the vRealize Operations Endpoint URL.
1. Click **Register**.

## vRealize Operations Integration Known Issues and Limitations

The initial release of the vRealize Operations integrations in November 2021 has the following known issues and limitations:

* For supermetrics, such as `Cost Drivers - Facilities (US $/Month)` or `Total Server Purchase Cost`, the metric names are not fetched and in Wavefront these metrics are displayed with the super metric ID.
* The vRealize Operations metrics have a point tag, which represents the organization ID. This is the UUIF of the organization. Currently, Wavefront collects the Organization ID as a point tag, instead o the Organization name.
* Along with the summary for a resource, in vRealize Operations there might be other properties. In Wavefront, currently we do not collect such properties. The vRealize Operations integration only collets properties under the summary section as point tags.
