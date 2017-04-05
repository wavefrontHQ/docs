---
title: Cernan Integration
keywords: integrations
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_cernan.html
summary: Learn how to use Cernan to ingest metrics into Wavefront.
---

Cernan is a telemetry and logging aggregation server recently open sourced by Wavefront customer, Postmates. From the [Cernan wiki](https://github.com/postmates/cernan/wiki):

```quote
Cernan exposes multiple interfaces for ingestion and can emit to multiple aggregation sources while doing in-flight manipulation of data. Cernan has minimal CPU and memory requirements and is intended to service bursty telemetry without load shedding. Cernan aims to be reliable and convenient to use, both for application engineers and operations staff.
```

Cernan is packaged with a built-in sink for Wavefront. This makes it very convenient to get Cernan connected to Wavefront. This article extends the official [Cernan Quickstart](https://github.com/postmates/cernan/wiki/Quickstart) to include configuring Cernan for Wavefront.

## Follow the Cernan Quickstart

Follow the Cernan Quickstart. After following these steps you should have Cernan running and are seeing sample output printed to your terminal that looks similar to below:

```
Flushing metrics: 2017-01-30T17:49:29.782336+00:00  
  sums:  
  sets:  
    foo.bar(1485798558): 225  
  summaries:  
Flushing metrics: 2017-01-30T17:49:39.562324+00:00  
  sums:  
  sets:  
    foo.bar(1485798569): 225  
  summaries:  
Flushing metrics: 2017-01-30T17:49:49.856861+00:00  
  sums:  
  sets:  
    foo.bar(1485798579): 225  
  summaries:
```

This output is being printed by the console source which is configured in the example quickstart.toml.

## Configure the Wavefront Sink

 1. From your Cernan root directory, copy the quickstart.toml file into a new file called quickstart-wavefront.toml.

    ```shell
    $ cp examples/configs/quickstart.toml examples/configs/quickstart-wavefront.toml  
    ```
    At this point, the entire quickstart-wavefront.toml should look like:

    ```conf
    flush-interval = 10  
      
    [sources]  
      [sources.statsd.primary]  
      port = 8125  
      forwards = ["sinks.console","sinks.wavefront"]  
      
    [sinks]  
      [sinks.console]  
      [sinks.wavefront]  
      bin_width = 10  
      host = "localhost"  
      port = 2878  
    ```

    Update the host and port to reflect your Wavefront proxy address.
 
 1. Run Cernan with the new config file:

    ```shell
    $ cargo run -- -vv --config examples/configs/quickstart-wavefront.toml 
    ```

    You should see the same output in your Cernan terminal as you did previously, but now the metrics should be sending to Wavefront in addition to being printed to the console. 
    
 1. Log into Wavefront and open a new chart. Enter a query for the new metric "foo.bar":

    ![cernan](images/cernan.png)

At this point, you should be all set to start using Cernan with Wavefront.
 
## Troubleshooting
 
It may take up to a minute for a brand new metric to appear in Wavefront. If you're not seeing the foo.bar metric after a couple of minutes, check the following:

- The console output from Cernan - it will display an error if it cannot connect to the Wavefront proxy.
- The Wavefront proxy logs - if Cernan is sending any bad lines to the Wavefront proxy, the proxy will block the lines and display error messages in the logs.

{% include links.html %}
