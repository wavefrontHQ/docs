---
title: Datadog Integration
tags: [integrations list]
permalink: datadog.html
summary: Learn about the Datadog Integration.
---
## Datadog Integration

The `Datadog Agent` is lightweight piece of software that runs on your hosts. It collects events and metrics, which you can then examine using Wavefront dashboards and charts.

This integration configures the `Datadog Agent` to send metrics into Wavefront.
## Datadog Setup

### Step 1. Install and Configure Wavefront Proxy
{% include proxy_datadog_config.md %}

### Step 2. Install Datadog Agent
Get detailed information [here](https://docs.datadoghq.com/agent/?tab=linux) to install Datadog Agent.

### Step 3. Configure Datadog Agent to send data to Wavefront Proxy
1.  On the server running your Datadog Agent, open the file `/etc/datadog-agent/datadog.yaml` and update the following properties:{% raw %}
    ```
        api_key: 8c43090ae3ea11e89f32f2801f1b9fd1
        site: <wavefront-proxy-host-ip:PORT>
        dd_url: http://<wavefront-proxy-host-Ip:PORT>
    ```
{% endraw %}
    Replace the `PORT` with the `dataDogJsonPorts` setting.  
    **Note**: Replace the `api_key` with the Datadog api-key to send data to Datadog and Wavefront simultaneously.
2.  Save and close `datadog.yaml`
3.  Restart the agent: `sudo service datadog-agent restart`.




