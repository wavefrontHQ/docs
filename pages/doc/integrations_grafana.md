---
title: Set Up Tanzu Observability as a PromQL Data Source in Grafana
keywords:
tags: [integrations, grafana]
sidebar: doc_sidebar
permalink: integrations_grafana.html
summary: Learn how you can set up Tanzu Observability by Wavefront as a Prometheus data source in Grafana.
---

In addition to [setting up and using Tanzu Observability as a Wavefront Query Language data source in Grafana](grafana.html), you can also use Tanzu Observability by Wavefront as a Prometheus data source in Grafana. 

When you set up Tanzu Observability as a data source in Grafana, you can view the data stored in Tanzu Observability by using the Grafana GUI. 

## Set Up Tanzu Observability as a Prometheus Data Source

To set up Tanzu Observability as a PromQL data source in Grafana, you must provide an API Token of a user account or a service account that can run queries. For details on API tokens, see [Generating an API Token](https://docs.wavefront.com/wavefront_api.html#generating-an-api-token).

1. Log in to your Grafana instance.

2. In the Navigation bar on the left, click **Configuration**. 

3. Click **Add data source** and under **Time series databases** click **Prometheus**. 

4. In the **Name** text box, enter a meaningful name of the data source. 

5. Under **HTTP**, in the **URL** text box, enter the URL of your Wavefront cluster: `https://www.<your-cluster-name>.wavefront.com`.
   
   You can ignore or leave the other settings defaults in this section.
   
6. Under **Auth** make sure to turn the **With Credentials** option on.

7. Under **Custom HTTP Headers** set the following settings:
    
    1. In the **Header** text box, enter **Authorization** as the header name.
    2. In the **Value** text box, enter `Bearer <Your-API-Token>`. 
    
8. Click **Save and Test**.

## How to Use Tanzu Observability as a Prometheus Data Source

To use Tanzu Observability as a PromQL data source, make sure that [PromQL support is enabled on your Wavefront cluster](https://docs.wavefront.com/wavefront_prometheus.html#set-promql-organization-settings-administrator-only). 

{% include important.html content="After the setup, the behavior of the PromQL queries that you run in Grafana will be the same as the behavior of the same queries that you run in the Wavefront UI. All limitations and best practices for using PromQL in Tanzu Observability apply. For information, see [Using PromQL in Tanzu Observability by Wavefront](https://docs.wavefront.com/wavefront_prometheus.html)." %}

You can now test and see that a PromQL query in Tanzu Observability returns the same result as a PromQL query in Grafana when the data source is the Wavefront cluster that you have configured. 

* A PromQL query in Tanzu Observability by Wavefront:

   ![PromQL query in Wavefront](images/grafana-wavefront-example-promQL.png)

* Same PromQL query in Grafana when the data source is the Wavefront cluster that you have just set up.

   ![PromQL query in Grafana](images/grafana-wavefront-promQL.png)
 
 
