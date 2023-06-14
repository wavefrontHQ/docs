---
title: Runscope Integration
tags: [integrations list]
permalink: runscope.html
summary: Learn about the Runscope Integration.
---
## Runscope Integration

Runscope is a cloud-based API monitoring service that monitors performance and availability of API's. Runscope detects API transaction failures and exceptions and triggers alerts based on flexible criteria. You can use Runscope with your applications without having to write any code.

This integration uses a Python script and the Telegraf Exec plugin to get the data from Runscope. You install and configure Telegraf to send Runscope test results into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some charts in the Runscope dashboard.

{% include image.md src="images/runscope-dashboard.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Runscope Setup



### Step 1: Install the Telegraf Agent
This integration uses Telegraf's Exec input plugin to fetch the test results from Runscope.
If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2: Download the Script

1. Download [runscope.py](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/runscope/runscope.py) onto your server.
2. Add the execute permissions to the downloaded file, e.g. `chmod +x <runscope-metrics-collector>`
3. Install `requests` python package: 'pip install requests`.
4. Test the script using the command.{% raw %}
```
   python runscope.py -h
```
{% endraw %}

   You should get a response similar to this:
{% raw %}
```
   usage: runscope.py [-h] token

      positional arguments:
      token       Runscope token.
```
{% endraw %}
 
### Step 3: Create an Application for Wavefront In Runscope

To get an access token that this integration's Python script can use to poll the Runscape APIs, you have to create an application for Wavefront in Runscope

1. Log in to Runscope service.
2. Go to [https://www.runscope.com/applications/create](https://www.runscope.com/applications/create) and create an application by providing following details: 
     * **Name**: `[[Application Name]]`
     * **Website URL**: `https://YOUR_CLUSTER.wavefront.com`
     * **Callback URL**: `https://YOUR_CLUSTER.wavefront.com`
3. Click **Create Application**.
4. Navigate to the section **Personal Access Token** and make a note of the token.


### Step 4: Enable the Exec Input Plugin

Create a file called `runscope.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
## Get Test Results from Runscope. 
[[inputs.exec]]
commands = ["python <path_to_runscope_metrics_collector> <runscope_personal_access_token>"]

## Timeout for each command to complete.
timeout = "5m"

## measurement name prefix
data_format = "json"
name_override = "runscope"
tag_keys = ["test_bucket_name", "test_name", "region","method","service_url","request_result"]

# Configuration for telegraf agent
[agent]
## Default data collection interval for all inputs
interval = "5m"

```
{% endraw %}
**Note**: The Telegraf Exec plugin runs the script every 5 minutes.  The script caches `bucket` and `test url` to avoid frequent hits of the Runscope REST API service. By default, the script updates the cache file every hour with the latest `bucket` and `test url` details. You can change `cache_expiry_min` in the script to change how often the script updates the cache. 

### Step 5. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.




