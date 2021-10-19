---
title: Grafana Integration
keywords:
tags: [integrations, grafana]
sidebar: doc_sidebar
permalink: integrations_grafana.html
summary: Learn about the Wavefront Grafana integration.
---

## Grafana Data Source Plugin Integration

You can set up and use Wavefront as a data source for [Grafana](https://www.grafana.com/).

The Wavefront data source plugin for Grafana provides a basic query builder and the entire [Wavefront Query Language](https://docs.wavefront.com/query_language_reference.html). You can use multiple queries in a single chart. The plugin also supports dashboard variables. 

You can also use Wavefront as a Prometheus data source in Grafana.

## Grafana Data Source Plugin Integration Setup

The Wavefront data source plugin makes it possible to visualize data collected by Wavefront in Grafana dashboards. You can use Grafana dashboard variables and templating with this plugin. Dynamic Grafana dashboard variables can be created using Wavefront ts() queries. [Read more](https://github.com/wavefrontHQ/grafana-wavefront-datasource) about the data source plugin features and limitations.

### Set Up Wavefront as a Data Source in Grafana

To set up Wavefront as a data source in Grafana, you must provide an API Token of a user account or a service account that can run queries. For details on API tokens, see [Generating an API Token](https://docs.wavefront.com/wavefront_api.html#generating-an-api-token).

1. Log in to your Grafana instance.

2. In the Navigation bar on the left, click **Configuration**. 

3. Click **Add data source** and under **Time series databases** click **Wavefront**. 

4. In the **Name** text box, enter a meaningful name of the data source. 

5. Under **HTTP**, in the **URL** text box, enter the URL of your Wavefront cluster: `https://www.<your-cluster-name>.wavefront.com`.
   
   You can ignore or leave the other settings defaults in this section.
   
6. Under **Auth** make sure to turn the **With Credentials** option on.

7. Under **Custom HTTP Headers** set the following settings:
    
    1. In the **Header** text box, make sure that you enter **Authorization** as the header name.
    2. In the **Value** text box, enter `Bearer <Your-API-Token>`. 
    
8. Click **Save and Test**.

### How to Use Wavefront as a Prometheus Data Source

To use Wavefront as a Prometheus data source, make sure that PromQL Support is enabled on your cluster. 

{% include important.html content="After the setup, the behavior of the PromQL queries that you run in Grafana will be the same as the behavior of the same queries that you run in Wavefront. This means, that all limitations and best practices for using PromQL in Wavefront apply when you use Wavefront as a Prometheus data source in Grafana. For information, see [Using PromQL in Wavefront](https://docs.wavefront.com/wavefront_prometheus.html)." %}

You can now test and see that when you create a chart in Wavefront by using PromQL, the same query in Grafana returns exactly the same result.

* A PromQL query in Wavefront:

   ![PromQL query in Wavefront](images/grafana-wavefront-example-promQL.png)

* Same PromQL query in Grafana when the data source is the Wavefront cluster that you have just set up.

   ![PromQL query in Grafana](images/grafana-wavefront-promQL.png)
 
 
