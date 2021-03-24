---
title: Apache Spark Integration
tags: [integrations list]
permalink: spark.html
summary: Learn about the Wavefront Apache Spark Integration.
---
## Apache Spark Integration

Apache Spark is an open-source cluster-computing framework. This integration explains how to configure the Wavefront proxy to listen for Graphite data, and how to configure Spark metrics for Graphite. In addition to setting up the metrics flow, this integration also sets up a dashboard.

{% include image.md src="images/spark.png" width="80" %}

## Apache Spark Setup



### Step 1. Configure Wavefront Proxy to Listen for Graphite Data

{% include proxy_graphite_config.md %}

### Step 2. Configure Spark metrics

1. Create or edit the `metrics.properties` file in the `conf` directory of your Spark installation.
2. Enter the following snippet:{% raw %}
    ```
    #Enable Graphite
    *.sink.graphite.class=org.apache.spark.metrics.sink.GraphiteSink
    *.sink.graphite.host=[proxy address]
    *.sink.graphite.port=2003
    *.sink.graphite.period=10
    *.sink.graphite.prefix=spark.[hostname]

    # Enable jvm source for instance master, worker, driver and executor
    master.source.jvm.class=org.apache.spark.metrics.source.JvmSource
    worker.source.jvm.class=org.apache.spark.metrics.source.JvmSource
    driver.source.jvm.class=org.apache.spark.metrics.source.JvmSource
    executor.source.jvm.class=org.apache.spark.metrics.source.JvmSource
    ```
{% endraw %}
3. Use these two properties in the snippet to specify your Wavefront proxy:
    * `*.sink.graphite.host=[proxy address]`
    * `*.sink.graphite.port=2003`
4. Set up your Spark node name:
    * `*.sink.graphite.prefix=spark.[hostname]`
    * **Note**: Replace `.` in the hostname with `_`. For example, enter `spark.prod_host1` instead of `spark.prod.host1`.
5. Distribute the `metrics.properties` file to all your Spark nodes.
6. Restart your **master** and **slaves** nodes.



