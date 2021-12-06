---
title: CoreOS Integration
tags: [integrations list]
permalink: coreos.html
summary: Learn about the Wavefront CoreOS Integration.
---
## CoreOs Integration

The CoreOS integration installs and configures Telegraf to send CoreOS and Docker Container performance metrics to Wavefront. Telegraf is a light-weight server process that can collect, process, aggregate and send metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the **CPU** section of a dashboard displaying CoreOS metrics.

{% include image.md src="images/coreos-sample-dashboard.png" width="80" %}

## CoreOS Setup



This integration uses the Telegraf Docker container and Telegraf Docker input plugin to collect metrics from CoreOS.


### Step 1. Install the Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network, install a proxy as a Docker container in CoreOS.


### Step 2. Install and Configure the Telegraf Agent

1. Run `docker pull telegraf` to pull a Telegraf Docker container.
2. Run `docker run --rm telegraf telegraf config > telegraf.conf` to create a configuration file on your host.
3. In the `telegraf.conf` file disable the InfluxDB output plugin by commenting all the lines under `outputs.influxdb`.
4. Configure the `outputs` section to communicate with your Wavefront proxy:{% raw %}
   ```
   [[outputs.wavefront]]
      host = "WAVEFRONT_PROXY_HOSTNAME"
      port = 2878
   ```
{% endraw %}
5. In the agent configuration section configure `hostname`:
{% raw %}
   ```
   [[agent]]
      hostname = "<hostname>"
   ```
{% endraw %}

6. Add the snippet `name_prefix = "coreos."` to the following inputs:
{% raw %}
   ```
   [[inputs.cpu]]
   [[inputs.disk]]
   [[inputs.diskio]]
   [[inputs.kernel]]
   [[inputs.mem]]
   [[inputs.processes]]
   [[inputs.swap]]
   [[inputs.system]]
   [[inputs.net]]
   ```
{% endraw %}

7. Enable the Docker input plugin by adding the following snippet:
{% raw %}
   ```
   [[inputs.docker]]

     ## Docker Endpoint
     ##   To use TCP, set endpoint = "tcp://[ip]:[port]"
     ##   To use environment variables (ie, docker-machine), set endpoint = "ENV"
     endpoint = "unix:///var/run/docker.sock"

     ## Set to true to collect Swarm metrics(desired_replicas, running_replicas)
     ## Note: configure this in one of the manager nodes in a Swarm cluster.
     ## configuring in multiple Swarm managers results in duplication of metrics.
     gather_services = false

     ## Only collect metrics for these containers. Values will be appended to
     ## container_name_include.
     ## Deprecated (1.4.0), use container_name_include
     container_names = []

     ## Containers to include and exclude. Collect all if empty. Globs accepted.
     container_name_include = []
     container_name_exclude = []

     ## Timeout for docker list, info, and stats commands
     timeout = "5s"

     ## Whether to report for each container per-device blkio (8:0, 8:1...) and
     ## network (eth0, eth1, ...) stats or not
     perdevice = true

     ## Whether to report for each container total blkio and network stats or not
     total = false

     ## docker labels to include and exclude as tags.  Globs accepted.
     ## Note that an empty array for both will include all labels as tags
     docker_label_include = []
     docker_label_exclude = []

     ## Which environment variables should we use as a tag
     tag_env = ["JAVA_HOME", "HEAP_SIZE"]

     ## Optional SSL Config
     # ssl_ca = "/etc/telegraf/ca.pem"
     # ssl_cert = "/etc/telegraf/cert.pem"
     # ssl_key = "/etc/telegraf/key.pem"
     ## Use SSL but skip chain & host verification
     # insecure_skip_verify = false
     name_prefix = "coreos."
   ```
{% endraw %}

### Step 3. Start the Telegraf Docker container

Run the following command to start the Docker container: {% raw %}
   ```
   docker run -d=true --rm -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -v $PWD/telegraf.conf:/etc/telegraf/telegraf.conf:ro telegraf
   ```
{% endraw %}





