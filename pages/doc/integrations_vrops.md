---
title: VMware Aria Operations Integration Overview
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_vrops.html
summary: Understand the setup and the VMware Aria Operations integration v1 limitations and caveats.
---
[VMware Aria Operations (SaaS)](https://www.vmware.com/products/aria-operations.html) (formerly vRealize Operations Cloud) delivers intelligent operations management with application-to-storage visibility across physical, virtual, and cloud infrastructures. Using policy-based automation, operations teams automate key processes and improve the IT efficiency.


The VMware Aria Operations (SaaS) integration is a full-featured native integration that offers agentless data ingestion of VMware Aria Operations (SaaS) metric data, as well as a predefined dashboard. 

{% include important.html content="The VMware Aria Operations (SaaS) integration v1 is the first version of this integration and currently fetches only vCenter Server adapter resources, such as Cluster Compute Resource and Datastore. We will add more features to this integration in future releases." %}

## How to Register a VMware Aria Operations (SaaS) Integration

To register a new VMware Aria Operations (SaaS) instance, you need a Cloud Services console API token and a VMware Aria Operations (SaaS) endpoint URL.

### Obtain an API Token

The API token will give read-only access to VMware Aria Operations (SaaS) and enable VMware Aria Operations for Applications (formerly Tanzu Observability by Wavefront) to continually load metrics from various resource categories. The minimum role required for the integration is the **vROps ReadOnly** role. Make sure that the role assigned to the API token is also assigned to the user generating the API token.

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
   
      **Note**: The same **vROps ReadOnly** role must be also assigned to your user account.
1. Click the **Generate** button.
1. Click the **Copy** button and copy the generated token.

### Set Up the VMware Aria Operations (SaaS) Integration

1. Log in to your Operations for Applications cluster: https://*your-wavefront-cluster*.wavefront.com.
1. Click **Integrations** on the toolbar. 
1. In the VMware section, click the **VMware Aria Operations** tile.
1. Click **Add Integration**.
1. Provide a meaningful name of the integration.
1. Paste the API token that you generated in the **API Token** text box.
1. Select the resources to fetch.
   
   Currently we fetch only vCenter Server adapter resources, such as Cluster Compute Resource and Datastore.
   
1. In the **Metric Allow List** text box, add metrics to an allow list by specifying a regular expression. 

   For example, to fetch only cost metrics, enter `^vrops.vmware.(datastore|clustercomputeresource).cost.*$`.
   
1. In the **Service Refresh Rate** text box, enter the number of minutes between requesting metrics. Default is `5` minutes.
1. In the **vROps URL** text box, enter the VMware Aria Operations (SaaS) Endpoint URL.
1. Click **Register**.


{% include important.html content="After you set up the VMware Aria Operations (SaaS) integration, it will take up to 24 hours for the cost metrics to start flowing, because cost metrics reports flow on a daily basis. Until then, the cost related charts on the predefined **VMware Aria Operations Summary** dashboard will show NO DATA." %}


## Metrics for VMware Aria Operations (SaaS)

With this initial, v1 release of the VMware Aria Operations (SaaS) integration, we collect the following high-level list of metrics. For the complete list and descriptions of the metrics that we collect for cluster compute resources and datastores, see [Cluster Compute Resource Metrics](https://docs.vmware.com/en/vRealize-Operations/8.6/com.vmware.vcom.metrics.doc/GUID-F6638548-7D0D-42A4-B774-9BF1EFB95E94.html) and [Datastore Metrics](https://docs.vmware.com/en/vRealize-Operations/8.6/com.vmware.vcom.metrics.doc/GUID-A77F1497-A21F-40A9-B240-446A66A174DD.html).


|**Metric Name**|**Description**|
|vrops.vmware.clustercomputeresource.*| Metrics for cluster compute resources, such as:|
|| - Overall score metrics that show the cluster compute resource state, such as compliance, efficiency, health, risk, and workload.|
|| - Cluster services metrics that provide information about cluster services.|
|| - Configuration metrics that provide information about configuration settings.|
|| - Cost metrics that provide information about the cost.|
|| - CPU usage metrics provide information about CPU usage.|
|| and so on|
|vrops.vmware.datastore.*| Metrics for datastores, such as:|
|| - Capacity metrics that provide information about datastore capacity.|
|| - Device metrics that provide information about device performance.|
|| - Datastore metrics that provide information about the datastore usage.|
|| and so on|


You can see the full list of the collected metrics on the **Metrics Browser** page.

1. In your Operations for Applications cluster, click **Browse > Metrics**.
2. On the **Metrics Browser** page, in the **Metrics** text box, enter `vrops.vmware.`.
3. Click the folder icons to drill down to the individual metrics. 

## VMware Aria Operations (SaaS) Integration Known Issues and Limitations

This initial release of the VMware Aria Operations (SaaS) integration has the following known issues and limitations:

* For supermetrics, such as `Cost Drivers - Facilities (US $/Month)`, `Total Server Purchase Cost`, and so on, the metric names are not fetched and in our UI, these metrics are displayed with the super metric ID.
* The VMware Aria Operations (SaaS) metrics have a point tag, which represents the organization ID. This is the UUIF of the organization. Currently, we collect the Organization ID as a point tag, instead of the Organization name.
* Along with the summary for a resource, in VMware Aria Operations (SaaS) there might be other properties. In Operations for Applications, currently we do not collect such properties. The VMware VMware Aria Operations (SaaS) integration only collects properties under the summary section as point tags.
* In this release, you will see all the vCenter Server instances that you have configured in VMware Aria Operations (SaaS). To shortlist the vCenter Server instances you want to monitor, apply a filter by using the REST API. 
  1. In your cluster, click the gear icon on top right, and select **API Documentation**.
  2. Expand **Cloud Integration** and click the `GET /api/v2/cloudintegration` request.
     
     You will see the list of the cloud integrations in the **Response Body** in JSON format. 

   4. Search for the VMware Aria Operations (SaaS) integration that you want to update.
   5. Copy the value of the `id` parameter of the VMware Aria Operations (SaaS) integration and keep it handy. 
   6. In a JSON file replace all the values in the below structure with the values that you got from step 4, and filter out the vCenter Server instances.
   
       ```
       {
          "name":"<integration-name>",
          "service":"VROPS",
          "vrops": {
                  "baseURL": "<vmware-aria-operations-cloud-base-URL>",
                  "metricFilterRegex": "<metric-filter-regex>",
                  "categoriesToFetch": <categories-to-fetch>,
                  "vropsAPIToken": "<vmware-aria-operations-operations-API-Token>",
                  "organizationID": "<organization-ID>",
                  "adapterNames":{"VMWARE":["vCenter Server name 1","vCenter Server name 2",...]}
                },
            "serviceRefreshRateInMins":<service-refresh-rate-in-minutes>
        }
       ```
       Here the `adapterNames` are the names of your vCenter Server instances. 
       
       **Leave only the names of the vCenter Server instances that you want to monitor.**
    
    7. After you create the JSON file, click the `PUT /api/v2/cloudintegration/{id}` request.
    8. In the **id** text box, enter the ID of the integration that you copied in Step 5.
    9. In the **Edit Value** text box, enter the contents of the JSON file that you created in Step 6.
    10. Click **Execute**. 
    
   You get a `200` response and in the Operations for Applications UI, you can see that the vCenter Server instances are filtered out.
