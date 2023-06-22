---
title: Photon OS Host Integration
tags: [integrations list]
permalink: photon.html
summary: Learn about the Photon OS Host Integration.
---
## Photon OS Host Integration

Photon OS is an open-source minimalist Linux operating system from VMware that is optimized for cloud computing platforms, VMware vSphere deployments, and applications native to the cloud. Monitoring Photon OS hosts is easy with Wavefront. This integration installs and configures Telegraf to send host metrics
into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the dashboard displaying Photon OS host metrics.

{% include image.md src="images/photon_db.png" width="80" %}
## Photon OS Setup



### Step 1: Install and Configure the Wavefront Proxy Manually

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network, please follow these steps

1. Start the docker service.{% raw %}
   ```
   sudo systemctl start docker
   ```
{% endraw %}
   
2. Install a proxy as a Docker container in Photon OS host.

   **NOTE:**
   * If the proxy fails to start with an `Error denying pull access`, create an account in [Docker](https://www.docker.com/) if this is your first time and use the below command to authenticate. If prompted for your username and password, please enter your docker login credentials.{% raw %}
      ```
      docker login
      ```
{% endraw %}

   * If there is an error `sudo command not found`, run the below command.{% raw %}
      ```
      tdnf install sudo
      ```
{% endraw %}

   * If the proxy fails to start with an `Error reporting Unknown host: Please verify your DNS and network settings`, execute the below command to update the docker version.{% raw %}
      ```
      sudo tdnf update -y docker libseccomp
      sudo systemctl restart docker
      ```
{% endraw %}

### Step 2: Install and Configure the Telegraf Agent Manually

1. Download the [Telegraf binary](https://github.com/influxdata/telegraf/releases) for Photon OS.
2. Extract the `telegraf-*_linux_amd64.gz` file and change the working directory to the extracted directory.{% raw %}
   ```
   tar xf telegraf-*_linux_amd64.tar.gz
   cd telegraf-*
   ```
{% endraw %}
3. Open the `./etc/telegraf/telegraf.conf` file for edit, and configure the plugins.

   a. Comment the `influxdb` output plugin.{% raw %}
      ```
      #[[outputs.influxdb]]
      ```
{% endraw %}
   b. Enable the wavefront output plugin and change the existing required properties.{% raw %}
      ```
      [[outputs.wavefront]]
        url = "WAVEFRONT_PROXY_HOSTNAME:2878"
        prefix = "photon."
        metric_separator = "."
        source_override = ["hostname", "agent_host", "node_host"]
        convert_paths = true
      ```
{% endraw %}
   c. Uncomment the `net` input plugin, if commented.{% raw %}
      ```
      # Enable net plugin
      [[inputs.net]]
      ```
{% endraw %}
4. Start the Telegraf agent.{% raw %}
   ```
   ./usr/bin/telegraf --config ./etc/telegraf/telegraf.conf
   ```
{% endraw %}





