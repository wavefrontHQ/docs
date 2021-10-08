---
title: Set Up Wavefront as a Prometheus Data Source in Grafana
keywords:
tags: [integrations, grafana]
sidebar: doc_sidebar
permalink: integrations_grafana.html
summary: Learn how you can set up and use Wavefront as a Prometheus data source in Grafana.
---

You can use Wavefront as a Prometheus data source in Grafana.

## Set Up Wavefront as a Prometheus Data Source

To set up Wavefront as a Prometheus data source, you must provide an API Token of a user account or a service account that can run queries. For details on API tokens, see [Generating an API Token](https://docs.wavefront.com/wavefront_api.html#generating-an-api-token).

1. Log in to your Grafana instance.

2. In the Navigation bar on the left, click **Configuration**. 

3. Click **Add data source** and under **Time series databases** click **Prometheus**. 

4. In the **Name** text box, enter a meaningful name of the data source. 

5. Under **HTTP**, in the **URL** text box, enter the URL of your Wavefront cluster: `https://www.<your-cluster-name>.wavefront.com`.
   
   You can ignore or leave the other settings defaults in this section.
   
6. Under **Auth** make sure to turn the **With Credentials** option on.

7. Under **Custom HTTP Headers** set the following settings:
    
    1. In the **Header** text box, make sure that you enter **Authorization** as the header name.
    2. In the **Value** text box, enter `Bearer *Your-API-Token*`. 
    
8. Click **Save and Test**.

## After the Setup is Complete

Make sure that PromQL Support is enabled on your cluster. After the setup, the behavior of the PromQL queries that you run in Grafana will be the same as the behavior of the same queries that you run in Wavefront. This means, that all limitations and best practices for using PromQL in Wavferont apply when you use Wavefront as a Prometheus data source in Grafana. For information, see [Using PromQL in Wavefront](https://docs.wavefront.com/wavefront_prometheus.html).

You can now test and see that when you create a chart in Wavefront by using PromQL, you can copy and paste the query in Grafana and see exactly the same result.

 ![PromQL query in Wavefront](images/grafana-wavefront-example-promQL.png)

 ![PromQL query in Grafana](images/grafana-wavefront-promQL.png)
 
 
