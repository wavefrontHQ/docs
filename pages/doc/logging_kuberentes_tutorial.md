---
title: Tutorial to Send Logs from a Kubernetes Cluster (Beta)
keywords: data, logs
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_kubernetes_tutorial.html
summary: Learn how to send logs from your Kubernetes cluster to Tanzu Observability
---

In this tutorial, you’ll learn how to send logs to Tanzu Observability.

## Demo Application

Use the [demo application](https://github.com/wavefrontHQ/demo-app) to send data to Tanzu Observability. You can:

* Deploy with helm or kubectl using the preconfigured containers.
* Or You can also build, package, and push to your registry and deploy from there.

Once Tanzu Observability receives the data, you can see the logs on the Logs browser. To learn more, see [Log Browser](logging_log_browser.html).

![A screenshot of the logs browser that shows the logs sent by the demo app.](images/logs_demo_app_log_browser.png)


## Next Steps

* Get an overview of [Tanzu Observability logs](logging_overview.html).
* See how to [send logs to Tanzu Observability](logging_send_logs.html).
* Learn how to [view and browse logs](logging_log_browser.html).
* Learn more about the [proxy configurations and proxy preprocessor rules](logging_proxy_configurations.html).
* Have questions? See [Logs FAQs](logging_faq.html).
