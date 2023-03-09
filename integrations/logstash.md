---
title: Logstash Integration
tags: [integrations list]
permalink: logstash.html
summary: Learn about the Logstash Integration.
---
# Logstash Integration

Logstash is a free and open server-side data processing pipeline that allows you to collect data from a variety of sources and ingests it to your favorite destination.

Wavefront supports two methods for sending log data to the Wavefront proxy:
 - Filebeat: Once your data arrives at the proxy, the proxy converts your Logstash log data to metrics by parsing log lines with grok patterns (regular expressions) that you specify in a proxy configuration file.
 - Wavefront Output Plugin: Wavefront Output Plugin for Logstash parses the log data and sends it as metrics to the Wavefront service.

## Setup



This integration uses the `Filebeat output plugin` or `Wavefront output plugin for Logstash` to collect log data metrics from Logstash.

### Step 1. Install the Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network, install a proxy.

### Step 2. Collect Log Data
You can collect log data using Filebeat or using the Wavefront Output Plugin.

#### Option 1. Collect Log Data Metrics Using Filebeat

Follow the instructions in [Log Data Metrics Integration](https://docs.wavefront.com/integrations_log_data.html) for configuring the grok patterns to extract metrics from log data and sending data using Filebeat.

#### Option 2. Collect Log Data Metrics Using the Wavefront Output Plugin for Logstash

1. Install Wavefront Logstash Output Plugin
    - Install ruby.
    - Install ruby bundler -- `gem install bundler`.
    - Clone [logstash-output-wavefront](https://github.com/wavefrontHQ/logstash-output-wavefront) and `cd` to the directory.
    - Build the plugin -- `gem build logstash-output-wavefront.gemspec`.
    - Install the plugin --`logstash-plugin install *wavefront*.gem`.


2. Create a config file that specifies wavefront as the output plugin and specifies settings for other plugins. You can see some examples under Optional Configuration below.{% raw %}
    ```
    output {
        wavefront {
          host => "<Proxy-IP>"
        }
    }
    ```
{% endraw %}
    Optional Configuration{% raw %}
    ```
      port          Metric Port (Default - 2878)
      prefix        Metric Prefix (Default - "logstash")
      metrics       List of metrics (Default - ["count", "mean"])
      source        Metric source (Default - Hostname of the node running logstash)
    ```
{% endraw %}

   You can send log events to Wavefront using the output plugin for Logstash. The events must have the following format:{% raw %}
    ```
    {
       "bytes" => {
         "count" => 200,
         "mean" => 42.2
       },
       "error" => {
         "count" => 123,
         "code" => 404
       },
       "message" => "I'm not a hash type, so I won't get sent."
     }
    ```
{% endraw %}
    The Wavefront output plugin for Logstash generates the following metrics from the event and sends the metrics to Wavefront:{% raw %}
    ```
    logstash.bytes.count 200
    logstash.bytes.mean 42.2
    logstash.error.count 123
    ```
{% endraw %}
    You can send point tags for a metric to Wavefront using the Wavefront output plugin for Logstash. The event must have the following format:{% raw %}
    ```
    {
       "bytes.tagz.type=access.region=mumbai" => {
         "count" => 200,
         "mean" => 42.2
       },
       "error" => {
         "count" => 123,
         "code" => 404
       },
       "message" => "I'm not a hash type, so I won't get sent."
     }
    ```
{% endraw %}
    Below metrics are the output of the above event:{% raw %}
    ```
    logstash.bytes.count 200 type=access region=mumbai
    logstash.bytes.mean 42.2 type=access region=mumbai
    logstash.error.count 123
    ```
{% endraw %}
    
    **Note:** In this example the Wavefront output plugin has dropped the `logstash.error.code` metric because the default `metrics` list only includes `count` and `mean`. To include the `code` metric, override the default `metrics` to `["count", "mean", "code"]` in the `wavefront` output plugin.


3. Start logstash and specify the configuration file with the -f flag.{% raw %}
    ```
    bin/logstash -f <config-file>
    ```
{% endraw %}
Click [here](https://github.com/wavefrontHQ/logstash-output-wavefront) for more information.



