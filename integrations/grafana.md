---
title: Grafana Integration
tags: [integrations list]
permalink: grafana.html
summary: Learn about the Grafana Integration.
---
## Grafana Data Source Plugin Integration

Wavefront can be used as a data source for [Grafana](https://www.grafana.com).

The Wavefront data source plugin for Grafana provides a basic query builder and the entire 
[Wavefront Query Language](https://docs.wavefront.com/query_language_reference.html). 
You can use multiple queries in a single chart. The plugin also supports dashboard variables.

In addition, you can also [set up and use Wavefront as a Prometheus data source in Grafana](http://docs.wavefront.com/integrations_grafana.html).

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



