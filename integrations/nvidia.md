---
title: NVIDIA Integration
tags: [integrations list]
permalink: nvidia.html
summary: Learn about the NVIDIA Integration.
---
## NVIDIA Integration

1. **NVIDIA**: This integration allows you to monitor your NVDIA GPU cluster. It uses the Telegraf NVIDIA plugin to pull the **GPU name**, **fan speed**, **memory usage**, **temperature**, and **UUID**.

2. **NVIDIA on Kubernetes**: This explains the configuration of the Wavefront Collector for Kubernetes to scrape NVIDIA metrics using NVIDIA Data Center GPU Manager (DCGM) tool.

In addition to setting up the metrics flow, this integration also installs dashboards:
* NVIDIA
* NVIDIA on Kubernetes

{% include image.md src="images/nvidia-dashboard-preview.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## NVIDIA Setup

This integration uses Telegraf to fetch the metrics from the NVIDIA System Management Interface (nvidia-smi) and send them to the Wavefront service.

Use the instructions on this page for monitoring:
  * NVIDIA - Standalone
  * NVIDIA on Kubernetes

### Step 1: Install the Telegraf Agent

This integration uses the nvidia-smi input plugin for Telegraf. If you've already installed Telegraf on one of your servers, you can skip to Step 2.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!


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
**Note:** On Windows, `telegraf.conf` file is located at `C:\Program Files\Telegraf\telegraf.conf`.

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


## NVIDIA on Kubernetes

This explains the configuration of Wavefront Collector for Kubernetes to scrape NVIDIA metrics using NVIDIA Data Center GPU Manager (DCGM) tool.


* Use [DCGM exporter](https://docs.nvidia.com/datacenter/cloud-native/gpu-telemetry/dcgm-exporter.html) to get the NVDIA metrics in Prometheus.
* Deploy a `dcgmproftester` pod to create [profiling metrics](https://developer.nvidia.com/blog/monitoring-gpus-in-kubernetes-with-dcgm). 


#### Configure the Wavefront Collector for Kubernetes
You can configure the Wavefront Collector for Kubernetes to scrape NVIDIA metrics from Prometheus by using the below configuration.

If you do not already have the Wavefront Collector for Kubernetes installed, follow these instructions to add it to your cluster either by using [Helm](https://docs.wavefront.com/kubernetes.html#kubernetes-quick-install-using-helm) or performing [Manual Installation](https://docs.wavefront.com/kubernetes.html#kubernetes-manual-install).
{% raw %}
```
      ## Add this configuration under discovery plugin section
      - name: nvidia
        type: prometheus
        selectors:
          images:
            - '*dcgm-exporter*'
        port: 9400
        path: /metrics
        scheme: http
```
{% endraw %}





## NVIDIA
  

|Metric Name|Description|
| :--- | :--- |
|nvidia.smi.temperature.gpu |The current temperature readings for the device, in degrees C.|
|nvidia.smi.utilization.gpu|The GPU utilization in percentages.|
|nvidia.smi.utilization.memory|The memory utilization in percentages.|
|nvidia.smi.fan.speed|The fan speed in percentages.|
|nvidia.smi.power.draw|The total power drawn in watts.|


## NVIDIA on Kubernetes
  

|Metric Name|Description|
| :--- | :--- |
|DCGM.FI.DEV.DEC.UTIL.gauge|The decoder utilization in percentages.|
|DCGM.FI.DEV.ENC.UTIL.gauge|The encoder utilization in percentages.|
|DCGM.FI.DEV.FB.FREE.gauge|The free frame buffer in MB.|
|DCGM.FI.DEV.FB.USED.gauge|The used frame buffer in MB.|
|DCGM.FI.DEV.GPU.TEMP.gauge|The current temperature readings for the device, in degrees C.|
|DCGM.FI.DEV.MEM.CLOCK.gauge|The memory clock for the device.|
|DCGM.FI.DEV.MEM.COPY.UTIL.gauge|The memory utilization in percentages.|
|DCGM.FI.DEV.NVLINK.BANDWIDTH.TOTAL.counter|The total bandwidth of NVLINK|
|DCGM.FI.DEV.PCIE.REPLAY.COUNTER.counter|The PCIe replay counter.|
|DCGM.FI.DEV.POWER.USAGE.gauge|The power usage for the device in watts.|
|DCGM.FI.DEV.SM.CLOCK.gauge|The SM clock for the device.|
|DCGM.FI.DEV.TOTAL.ENERGY.CONSUMPTION.counter|The total energy consumption for the GPU in mJ since the driver was last reloaded.|
|DCGM.FI.DEV.VGPU.LICENSE.STATUS.gaugee|The license status of the vGPU instance.|
|DCGM.FI.DEV.XID.ERRORS.gauge|XID errors. The value is the specific XID error.|
|DCGM.FI.PROF.DRAM.ACTIVE.gauge|The ratio of cycles the device memory interface is active sending or receiving data.|
|DCGM.FI.PROF.GR.ENGINE.ACTIVE.gauge|The ratio of time the graphics engine is active.|
|DCGM.FI.PROF.PCIE.RX.BYTES.counter|The number of bytes of active PCIe Rx data including both header and payload.|
|DCGM.FI.PROF.PCIE.TX.BYTES.counter|The number of bytes of active PCIe Tx data including both header and payload.|
|DCGM.FI.PROF.PIPE.TENSOR.ACTIVE.gauge|The ratio of cycles the tensor (HMMA) pipe is active.|
