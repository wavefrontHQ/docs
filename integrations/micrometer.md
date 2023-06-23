---
title: Micrometer Integration
tags: [integrations list]
permalink: micrometer.html
summary: Learn about the Micrometer Integration.
---

This page provides an overview of what you can do with the Micrometer integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Micrometer integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Micrometer** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

# Micrometer Integration

To send Java application metrics to Wavefront you can use the Micrometer metrics library and the Wavefront registry. The registry sends data to Wavefront using the [Wavefront proxy](https://docs.wavefront.com/proxies.html), or it can send metrics directly to Wavefront services.

Starting with Spring Boot 2.0.0.M5, Micrometer is the instrumentation library powering the delivery of application metrics from Spring. The `micrometer-spring-legacymodule` provides drop-down support for Spring Boot 1.5.x.

This is a custom integration. You can send your own metrics and create your own dashboards.




