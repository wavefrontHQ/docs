---
title: Docker with cAdvisor Integration
tags: [integrations list]
permalink: docker.html
summary: Learn about the Docker with cAdvisor Integration.
---
## Docker Integration

Docker is a popular open source container platform. This integration uses cAdvisor, which provides container users an understanding of the resource usage and performance characteristics of their running containers. It is a running daemon that collects, aggregates, processes, and exports information about running containers to the [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some of the container charts in the Docker dashboard by host.

{% include image.md src="images/db_cadvisor.png" width="80" %}

## cAdvisor Setup



### Step 1. Set up Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network and reachable from cAdvisor, install a proxy running on your network. Wavefront offers a containerized proxy to run on your Docker host.

### Step 2. Run the cAdvisor Container

Run Wavefront's cAdvisor container on your Docker host:
{% raw %}
```
sudo docker run \
  --volume=/:/rootfs:ro \
  --volume=/var/run:/var/run:rw \
  --volume=/sys:/sys:ro \
  --volume=/var/lib/docker/:/var/lib/docker:ro \
  --publish=8080:8080 \
  --detach=true \
  --name=cadvisor \
  wavefronthq/cadvisor:latest \
  -storage_driver=wavefront \
  -storage_driver_wf_source=$(hostname) \
  -storage_driver_wf_proxy_host=WAVEFRONT_PROXY_ADDRESS:2878


```
{% endraw %}

See the cAdvisor [README](https://github.com/wavefrontHQ/integrations/tree/master/cadvisor) for a description of the supported options and an example using the Docker compose command.


