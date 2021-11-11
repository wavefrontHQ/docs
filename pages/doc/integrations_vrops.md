---
title: vRealize Operations Integration Overview
keywords:
tags: [integrations]
sidebar: doc_sidebar
published: true
permalink: integrations_vrops.html
summary: Understand the setup and the vRealize Operations integration v1 limitations and caveats.
---
[VMware vRealize Operations](https://www.vmware.com/products/vrealize-operations.html) delivers intelligent operations management with application-to-storage visibility across physical, virtual, and cloud infrastructures. Using policy-based automation, operations teams automate key processes and improve the IT efficiency.


The vRealize Operations integration is a full-featured native integration that offers agentless data ingestion of vRealize Operations metric data, as well as a predefined dashboard. 

{% include important.html content="The vRealize Operations integration v1 is the first version of this integration and currently fetches only vCenter Server adapter resources, such as Cluster Compute Resource and Datastore. We will add more features to this integration in future releases." %}

## How to Register a vRealize Operations Integration

To register a new vRealize Operations instance, you need a Cloud Services console API token and a vRealize Operations endpoint URL.

### Obtain an API Token

1. Navigate to the [VMware Cloud Services Console](https://console.cloud.vmware.com/csp/gateway/discovery) page.
1. Click your user name on the right of the toolbar, and select **My Account**.
1. Click the **API Tokens** tab.
1. Click the **Generate a New API Token** button.
1. Enter a meaningful API token name, for example, `wavefront-integration`.
1. Choose to generate a never expiring API Token by selecting **never expiring** from the drop-down menu showing the **Token TTL** units of time.

   If you select to generate an API token that will expire after certain period of time, when the API token expires, you will have to configure the service again.
   
1. Define the role of the token. 
   
   1. Under **Organization Roles**, select **Organization Member**.
   1. Under **Service Roles**, scroll down, expand **VMware vRealize Operations Cloud**, and select the **vROps ReadOnly** role.
1. Click the **Generate** button.
1. Click the **Copy** button and copy the generated token.

### Set Up the vRealize Operations Integration

1. Log in to your Wavefront cluster: https://*your-wavefront-cluster*.wavefront.com.
1. Click **Integrations** on the taskbar. 
1. In the VMware section, click the **VMware vRealize Operations** tile.
1. Click **Add Integration**.
1. Provide a meaningful name of the integration.
1. Paste the API token that you generated in the **API Token** text box.
1. Select the resources to fetch.
   
   Currently we fetch only vCenter Server adapter resources, such as Cluster Compute Resource and Datastore.
   
1. In the **Metric Allow List** text box, add metrics to an allow list by specifying a regular expression. 
1. In the **Service Refresh Rate** text box, enter the number of minutes between requesting metrics. Default is `5` minutes.
1. In the **vROps URL** text box, enter the vRealize Operations Endpoint URL.
1. Click **Register**.


{% include important.html content="After you set up the vRealize Operations integration, it will take up to 24 hours for the data to start flowing into Wavefront. Until then, the charts on the predefined **VMware vRealize Operations Summary** dashboard will show NO DATA." %}


## Metrics for vRealize Operations

With this initial, v1 release of the vRealize Operations integration, we collect the following high-level list of metrics.

## vRealize Operations Integration Known Issues and Limitations

This initial release of the vRealize Operations integration has the following known issues and limitations:

* For supermetrics, such as `Cost Drivers - Facilities (US $/Month)`, `Total Server Purchase Cost`, and so on, the metric names are not fetched and in Wavefront these metrics are displayed with the super metric ID.
* The vRealize Operations metrics have a point tag, which represents the organization ID. This is the UUIF of the organization. Currently, Wavefront collects the Organization ID as a point tag, instead of the Organization name.
* Along with the summary for a resource, in vRealize Operations there might be other properties. In Wavefront, currently we do not collect such properties. The vRealize Operations integration only collets properties under the summary section as point tags.
* In this release, you will see all the vCenter Server instances that you have configured in vRealize Operations. To shortlist the vCenter Server instances you want to monitor, apply a filter by using the REST API. 
  1. In your Wavefront cluster, click the gear icon on top right, and select **API Documentation**.
  2. Expand **Cloud Integration** and click the `GET /api/v2/cloudintegration` request.
  3. Click **Try it out**.
     
     You will see the list of the cloud integrations in the **Response Body** in JSON format. 

   4. Search for the vRealize Operations integration that you want to update.
   5. Copy the value of the `id` parameter of the vRealize Operations integration and keep it handy. 
   6. In a JSON file replace all the values in the below structure with the values that you got from step 4, and filter out the vCenter Server instances.
   
       ```
       {
          "name":"<integration-name>",
          "service":"VROPS",
          "vrops": {
                  "baseURL": "<vrealizre-operations-base-URL>",
                  "metricFilterRegex": "<metric-filter-regex>",
                  "categoriesToFetch": <categories-to-fetch>,
                  "vropsAPIToken": "<vrealize-operations-API-Token>",
                  "organizationID": "<organization-ID>",
                  "adapterNames":{"VMWARE":["vCenter Server name 1","vCenter Server name 2",...]}
                },
            "serviceRefreshRateInMins":<service-refresh-rate-in-minutes>
        }
       ```
       Here the `adapterNames` are the names of your vCenter Server instances. **Leave only the names of the vCenter Server instances that you want to monitor.**
    
    7. After you create the JSON file, click the `PUT /api/v2/cloudintegration/{id}` request.
    8. In the **id** text box, enter the ID of the integration that you copied in step 5.
    9. In the **body** text box, enter the contents of the JSON file that you created in step 6.
    10. Click **Try it out**. 
    
   You get a 200 response and in the Wavefront UI you can see that the vCenter Server instances are filtered out.
