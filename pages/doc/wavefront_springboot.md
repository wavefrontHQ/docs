---
title: Wavefront Spring Boot Autoconfigure
keywords:
tags: [best practice]
sidebar: doc_sidebar
permalink: wavefront_springboot.html
summary: Using Wavefront with Springboot
---

The Wavefront Spring Boot Autoconfigure SDK allows you to quickly configure your environment so Spring Boot components send metrics, histograms, and traces/spans to the Wavefront service. After you've completed setup, you can examine the data in a preconfigured dashboard.

## Getting Spring Boot Data Into Wavefront

Wavefront included a [Micrometer integration](micrometer.html) for several years. This custom integration allowed you to send your own metrics and create dashboards for them. The integration is associated with the 
