---
title: Windows Host Integration
tags: [integrations list]
permalink: windows.html
summary: Learn about the Windows Host Integration.
---
## Windows Host Integration

Monitoring Windows hosts is easy with Operations for Applications. This integration installs and configures Telegraf to send host metrics
into Operations for Applications. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the CPU section of a dashboard displaying Windows host metrics.

{% include image.md src="images/db_windows_cpu.png" width="80" %}


## Windows Host Setup



This integration uses various Telegraf input plugins. You can install the Wavefront proxy and Telegraf agent on the same host or on separate hosts. For proxy installation prerequisites, see the [Proxy Host Requirements](https://docs.wavefront.com/proxies_installing.html#proxy-host-requirements).

Supported Version(s): Windows 8 and up

### Install the Wavefront Proxy

1. Download [wavefront-proxy-setup.exe](https://s3-us-west-2.amazonaws.com/wavefront-cdn/windows/wavefront-proxy-setup.exe).
2. In a command prompt, navigate to the directory in which you downloaded the installer.

   ```.\wavefront-proxy-setup.exe /server=https://YOUR_CLUSTER.wavefront.com/api /token=<YOUR_API_TOKEN> /SILENT```

3. The proxy is started automatically. Check `Program Files (x86)\Wavefront\wavefront.log` to verify the installation.
4. You can manage the proxy service using the Windows Services Management Console.

   _**Warning:** If you want to edit the `wavefront.conf` file under `Program Files (x86)\Wavefront`, use an editor that supports Unix style line endings, such as **Notepad++** or **EditPlus**. Do not use **notepad** to modify the file._

### Install the Telegraf Agent

{% include windows_telegraf.md %}

### Uninstall the Wavefront Proxy and Telegraf Agent

1. Click *Start*, and then click *Control Panel*.
2. Under *Programs*, click *Uninstall a program*.
3. Select *Telegraf* and click *Uninstall* at the top.
4. Select *Wavefront Proxy* and click *Uninstall* at the top.



