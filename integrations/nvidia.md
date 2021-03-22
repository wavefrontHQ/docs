---
title: NVIDIA Integration
tags: [integrations list]
permalink: nvidia.html
summary: Learn about the Wavefront NVIDIA Integration.
---
## NVIDIA Integration

This integration allows you to monitor your NVDIA GPU cluster with Wavefront. It uses the Telegraf NVIDIA plugin to pull the **GPU name**, **fan speed**, **memory usage**, **temperature**, and **UUID**.

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview
of the default dashboard.

{% include image.md src="images/nvidia-dashboard-preview.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## NVIDIA Setup

This integration uses telegraf to fetch the metrics from nvidia-smi and push them to Wavefront.

### Step 1: Install the Telegraf Agent

This integration uses the nvidia-smi input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability?utm_source=docs.vmware.com&utm_medium=referral&utm_campaign=docs-front-page){:target="_blank" rel="noopenner noreferrer"} to check it out!


### Step 2: Configure NVIDIA Input Plugin

Create a file called `nvidia.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.nvidia_smi]]
  ## Typical locations for nvidia-smi are /usr/bin/nvidia-smi for Linux
  ## and C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe
  ## for windows
  bin_path = "/usr/bin/nvidia-smi"

  timeout = "1s"
```
{% endraw %}
**Note:** On windows, `telegraf.conf` is located at `C:\Program Files\Telegraf\telegraf.conf`.

Save the file and restart Telegraf as given below.


### Step 3. Restart Telegraf

*Linux*:{% raw %}
```
sudo service telegraf restart
```
{% endraw %}

*Windows*:
{% raw %}
```
net stop telegraf
net start telegraf
```
{% endraw %}



