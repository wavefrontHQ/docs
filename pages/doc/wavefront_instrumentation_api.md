---
title: Wavefront Instrumentation SDKs
keywords: getting started
tags: [getting started]
sidebar: doc_sidebar
permalink: wavefront_instrumentation_api.html
summary: Learn about retrieving metrics from your application.
---

Wavefront is fully API driven and supports a REST API and [instrumentation APIs](wavefront_instrumentation_api.html).
* The Wavefront REST API allows you to perform tasks that you'd perform from the UI, such as create an event. You can use Swagger to create a language binding of your choice.  Wavefront customers have created CLI clients of this API.
* The instrumentation API allows you to send metrics to the Wavefront proxy or directly to the Wavefront service. This API is available in Github and through different Application Instrumentation integrations.

The focus of this page is on the Wavefront Instrumentation API.

## Application Instrumentation

Wavefront supports integrations that facilitate setup for some of the APIs. Other APIs are available directly from Github.

### Application Instrumentation Integrations

Wavefront supports several out-of-the-box integrations for sending metrics either to the Wavefront proxy, or to the Wavefront service directly.


![app instrument](images/app_instrument.png)

Click the **Setup** tab for an integration for details on that integration.


### Accessing API SDKs from Github

You can access the API SDKs from our public Github repository. We're constantly adding functionality to existing SDKs, and adding new SDKs. For example:

* [Wavefront Java Top-Level Project](https://github.com/wavefrontHQ/java) - several independent projects for sending metrics from your Java application to Wavefront.
* [Wavefront Python Client](https://github.com/wavefrontHQ/python-client)
