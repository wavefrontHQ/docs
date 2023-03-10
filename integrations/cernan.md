---
title: Cernan Integration
tags: [integrations list]
permalink: cernan.html
summary: Learn about the Cernan Integration.
---
## Cernan Integration

Cernan is an open source telemetry and logging aggregation server. From the [Cernan wiki](https://github.com/postmates/cernan/wiki):
{% raw %}
```
Cernan exposes multiple interfaces for ingestion and can emit to multiple aggregation sources while doing in-flight manipulation of data. Cernan has minimal CPU and memory requirements and is intended to service bursty telemetry without load shedding. Cernan aims to be reliable and convenient to use, both for application engineers and operations staff.
```
{% endraw %}


## Cernan Setup

Cernan is packaged with a built-in sink for Wavefront. This makes it very convenient to get Cernan connected to Wavefront.



### Step 1. Set up Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network, install a proxy.

### Step 2. Follow the Cernan Quickstart

Follow the [Cernan Quickstart](https://github.com/postmates/cernan/wiki/Quickstart). 

In particular, make sure you are sending a test metric `foo.bar` to Cernan.  The command
`while true; do echo "foo.bar:225|g" | nc -c -u localhost 8125; done` will send a constant of `225` as the
metric value.
 
After following these steps you should have Cernan running and are seeing sample output printed to your terminal that looks similar to below:
{% raw %}
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
{% endraw %}

This output is being printed by the console source which is configured in the example `quickstart.toml`.

### Step 3. Configure the Wavefront Sink

 1. From your Cernan root directory, copy the `quickstart.toml` file into a new file called `quickstart-wavefront.toml`.
{% raw %}
    ```
    $ cp examples/configs/quickstart.toml examples/configs/quickstart-wavefront.toml  
    ```
{% endraw %}
    At this point, the entire `quickstart-wavefront.toml` should look like:
{% raw %}
    ```
    flush-interval = 10  
      
    [sources]  
      [sources.statsd.primary]  
      port = 8125  
      forwards = ["sinks.console","sinks.wavefront"]  
      
    [sinks]  
      [sinks.console]  
      [sinks.wavefront]  
      bin_width = 10  
      host = "WAVEFRONT_PROXY_ADDRESS"  
      port = 2878  
    ```
{% endraw %}

    Update the host and port to reflect your Wavefront proxy address.
 
 1. Run Cernan with the new config file:
{% raw %}
    ```
    $ cargo run -- -vv --config examples/configs/quickstart-wavefront.toml 
    ```
{% endraw %}

    You should see the same output in your Cernan terminal as you did previously, but now the metrics should be sending to Wavefront in addition to being printed to the console. 
    
 1. Log into Wavefront and open a new chart. Enter a query for the new metric "foo.bar":

    {% include image.md src="images/cernan.png" width="50" %}

 
### Troubleshooting
 
It may take up to a minute for a brand new metric to appear in Wavefront. If you're not seeing the foo.bar metric after a couple of minutes, check the following:

- The console output from Cernan - it will display an error if it cannot connect to the Wavefront proxy.
- The Wavefront proxy logs - if Cernan is sending any bad lines to the Wavefront proxy, the proxy will block the lines and display error messages in the logs.


