---
title: Grafana Integration
tags: [integrations list]
permalink: grafana.html
summary: Learn about the Wavefront Grafana Integration.
---
## Grafana Data Source Plugin Integration

You can use Wavefrontas a data source for [Grafana](https://www.grafana.com).

The Wavefront data source plugin for Grafana provides a basic query builder and the entire 
[Wavefront Query Language](https://docs.wavefront.com/query_language_reference.html). You can also use Wavefront as a Prometheus data source in Grafana.
You can use multiple queries in a single chart. The plugin also supports dashboard variables.

## Grafana Data Source Plugin Integration Setup

This Grafana data source plugin makes it possible to visualize data collected by Wavefront in Grafana dashboards. 
You can use Grafana dashboard variables and templating with this plugin. Dynamic Grafana dashboard variables can be 
created using Wavefront `ts()` queries.  [Read more](https://github.com/wavefrontHQ/grafana-wavefront-datasource)
about the data source plugin features and limitations.

### Set Up the Wavefront Data Source Plugin

1. Clone the Wavefront data source plugin's Github repository.{% raw %}
```
git clone https://github.com/wavefrontHQ/grafana-wavefront-datasource.git
```
{% endraw %}
1. Create a `wavefront-datasource` folder in your Grafana plugins (your plugins folder may be different).{% raw %}
```
mkdir /var/lib/grafana/plugins/wavefront-datasource
```
{% endraw %}
1. Copy the plugin's `dist` folder into the newly created `wavefront-datasource` folder inside the `grafana/plugins` folder.{% raw %}
```
cp -R grafana-wavefront-datasource/dist/* /var/lib/grafana/plugins/wavefront-datasource/
```
{% endraw %}
1. Restart Grafana.

### Set Up and Use Wavefront as a Prometheus Data Source

To set up Wavefront as a Prometheus data source, you must provide an API Token of a user account or a service account that can run queries. For details on API tokens, see [Generating an API Token](https://docs.wavefront.com/wavefront_api.html#generating-an-api-token). You must also make sure that PromQL Support is enabled on your cluster. The behavior of the PromQL queries that you run in Granafa is the same as the behavior of the same queries that you run in Wavefront, i.e. all limitations and best practices for using PromQL in Wavfront apply when you use Wavefront as a Prometheus data source in Grafana. For information, see [Using PromQL in Wavefront](https://docs.wavefront.com/wavefront_prometheus.html).

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

You can now test and see that when you create a chart in Wavefront by using PromQL, you can copy and paste the query in Grafana and see exactly the same result.
