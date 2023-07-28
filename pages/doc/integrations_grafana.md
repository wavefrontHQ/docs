---
title: Set Up VMware Aria Operations for Applications as a PromQL Data Source in Grafana
keywords:
tags: [integrations, grafana]
sidebar: doc_sidebar
permalink: integrations_grafana.html
summary: Learn how you can set up VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) as a Prometheus data source in Grafana.
---

In addition to [setting up and using VMware Aria Operations for Applications as a Wavefront Query Language data source in Grafana](grafana.html), you can also use VMware Aria Operations for Applications as a Prometheus data source in Grafana. 

When you set up VMware Aria Operations for Applications as a data source in Grafana, you can view the data stored in VMware Aria Operations for Applications by using the Grafana GUI. 

## Set Up VMware Aria Operations for Applications as a Prometheus Data Source

To set up VMware Aria Operations for Applications as a PromQL data source in Grafana, you must provide an API Token. 

<!-- If your Operations for Applications service **is** onboarded to VMware Cloud services, provide a valid VMware Cloud services API token of a user that can run queries. See [How do I generate API tokens](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E2A3B1C1-E9AD-4B00-A6B6-88D31FCDDF7C.html) and [How do I manage API tokens in my Organization](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-3A9C29E0-460B-4586-B51A-084443A960D0.html) in the VMware Cloud services documentation. You can also use the credentials of a [server to server app](csp_server_to_server_apps.html) that can run queries.

If your Operations for Applications service is **not** onboarded to VMware Cloud services, the API token must be a [valid Operations for Applications API token](api_tokens.html) of a user account or a service account that can run queries.  -->
1. Log in to your Grafana instance.

2. In the Navigation bar on the left, click **Configuration**. 

3. Click **Add data source** and under **Time series databases** click **Prometheus**. 

4. In the **Name** text box, enter a meaningful name of the data source. 

5. Under **HTTP**, in the **URL** text box, enter the URL of your product cluster: `https://<example>.wavefront.com`.
   
   You can ignore or leave the other settings defaults in this section.
   
6. Under **Auth** make sure to turn the **With Credentials** option on.

7. Under **Custom HTTP Headers** set the following settings:
    
    1. In the **Header** text box, enter **Authorization** as the header name.
    2. In the **Value** text box, enter `Bearer <Your-API-Token>`. 
    
8. Click **Save and Test**.

## How to Use VMware Aria Operations for Applications as a Prometheus Data Source

To use VMware Aria Operations for Applications as a PromQL data source, make sure that [PromQL support is enabled on your cluster](https://docs.wavefront.com/wavefront_prometheus.html#set-promql-organization-settings-administrator-only). 

{% include important.html content="After the setup, the behavior of the PromQL queries that you run in Grafana will be the same as the behavior of the same queries that you run in our GUI. All limitations and best practices for using PromQL in VMware Aria Operations for Applications apply. For information, see [Using PromQL in VMware Aria Operations for Applications](https://docs.wavefront.com/wavefront_prometheus.html)." %}

You can now test and see that a PromQL query in VMware Aria Operations for Applications returns the same result as a PromQL query in Grafana when the data source is the VMware Aria Operations for Applications cluster that you have configured. 

* A PromQL query in VMware Aria Operations for Applications:

   ![PromQL query in Wavefront](images/grafana-wavefront-example-promQL.png)

* Same PromQL query in Grafana when the data source is the VMware Aria Operations for Applications cluster that you have just set up.

   ![PromQL query in Grafana](images/grafana-wavefront-promQL.png)
 
 
