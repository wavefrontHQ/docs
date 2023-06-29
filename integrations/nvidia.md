---
title: NVIDIA Integration
tags: [integrations list]
permalink: nvidia.html
summary: Learn about the NVIDIA Integration.
---

This page provides an overview of what you can do with the NVIDIA integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the NVIDIA integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **NVIDIA** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## NVIDIA Integration

1. **NVIDIA**: This integration allows you to monitor your NVDIA GPU cluster. It uses the Telegraf NVIDIA plugin to pull the **GPU name**, **fan speed**, **memory usage**, **temperature**, and **UUID**.

2. **NVIDIA on Kubernetes**: This explains the configuration of the Kubernetes Metrics Collector to scrape NVIDIA metrics using NVIDIA Data Center GPU Manager (DCGM) tool.

In addition to setting up the metrics flow, this integration also installs dashboards:
* NVIDIA
* NVIDIA on Kubernetes

{% include image.md src="images/nvidia-dashboard-preview.png" width="80" %}







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
