---
title: Dynatrace Integration
tags: [integrations list]
permalink: dynatrace.html
summary: Learn about the Wavefront Dynatrace Integration.
---
## Dynatrace Integration

Dynatrace is an AI-powered, full-stack, automated performance management solution.  This integration configures the `Wavefront Collector for Dynatrace` to collect the metrics from Dynatrace and sends them to Wavefront.
## Setup

### Prerequisite
By default, API access is limited to 50 requests per minute in a Dynatrace SaaS environment. Wavefront Collector for Dynatrace works well with no API limit. Contact Dynatrace to remove the API limit from your account.

### Step 1. Install and Configure Wavefront Proxy
If you have not already done so, install a Wavefront proxy.

### Step 2. Install Wavefront Collector for Dynatrace
1. Clone this repository `https://github.com/wavefrontHQ/integrations/tree/master`.
2. Change directory to dynatrace_collector.
3. Run the following command to install Wavefront Collector for Dynatrace.
{% raw %}
```
pip install .
```
{% endraw %}

### Step 3. Configure Wavefront Collector for Dynatrace
Run the following command to configure Wavefront Collector for Dynatrace.{% raw %}
```
wf-dynatrace config -b <dynatrace-base-url> -a <dynatrace-api-key> -s <wavefront-proxy-ip> -p <wavefront_proxy_metric_port>
```
{% endraw %}
`wf-dynatrace config` command has the following command-line options:  
  
* **-b** (Required) Dynatrace base URL, e.g. `https://<your_cluster_name>.dynatrace.com`
* **-a** (Required) Dynatrace API token, See [generate a token](https://www.dynatrace.com/support/help/extend-dynatrace/dynatrace-api/basics/dynatrace-api-authentication/) for information on obtaining the API token.
* **-s** (Required) Wavefront proxy IP
* **-p** (Optional) Wavefront proxy metric port, Default is `2878`   

### Step 4. Manage Dynatrace Collector
- Start the collector{% raw %}
    ```
    dynatrace-collector start
    ```
{% endraw %}
- Stop the collector{% raw %}
    ```
    dynatrace-collector stop
    ```
{% endraw %}
- Check service status{% raw %}
    ```
    dynatrace-collector status
    ```
{% endraw %}
- Restart the collector{% raw %}
    ```
    dynatrace-collector restart
    ```
{% endraw %}
- Get collector information{% raw %}
    ```
    wf-dynatrace info
    ```
{% endraw %}

### Step 5. Advanced Configuration
All configuration files are located at `/opt/wavefront/dynatrace/config/`.
Use `config.json` to enable/disable the metrics collection.

Configuration options:
* **family**:  Filter the metrics based on family, to disable the metric for any family remove an entire dictionary object from the array.
* **detailedSources**: Filters the metrics based on the source name, which can be found in the metric definition.
* **displayNameRegexPattern**: Filters metrics based on the entity display name (in the UI). Value can be an entity display name or any regex pattern. Default is `all`.

See [Dynatrace Timeseries API](https://www.dynatrace.com/support/help/extend-dynatrace/dynatrace-api/environment-api/timeseries/) for more information.

Use `dtcollector.conf` to manage the log and other settings.

### Step 6. Log File Location
Log file will be located at `/var/log/wavefront/dynatrace/dynatrace.log`.



