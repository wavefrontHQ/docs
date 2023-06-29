---
title: Docker with cAdvisor Integration
tags: [integrations list]
permalink: docker.html
summary: Learn about the Docker with cAdvisor Integration.
---

This page provides an overview of what you can do with the Docker with cAdvisor integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Docker with cAdvisor integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Docker with cAdvisor** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Docker Integration

Docker is a popular open source container platform. This integration uses cAdvisor, which provides container users an understanding of the resource usage and performance characteristics of their running containers. It is a running daemon that collects, aggregates, processes, and exports information about running containers to the [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some of the container charts in the Docker dashboard by host.

{% include image.md src="images/db_cadvisor.png" width="80" %}




