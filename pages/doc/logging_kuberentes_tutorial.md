---
title: Sending Logs from Your Kubernetes Cluster (Beta)
keywords: data, logs
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_kubernetes_tutorial.html
summary: Learn how to send logs from your Kubernetes cluster to Tanzu Observability
---

In this tutorial, you’ll learn how to send logs to Tanzu Observability.

## Send Logs

Use the [demo application](https://github.com/wavefrontHQ/demo-app) to send data to Tanzu Observability. You can:

* Deploy with helm or kubectl using the preconfigured containers.
* Or You can also build, package, and push to your registry and deploy from there.

## Search and Filter Logs

Once Tanzu Observability receives the data, you can:
* Search and filter logs on the Log Browser.
* See the logs related to alerts.
* Drill into logs from a chart, Application Map, and the Traces Browser.

Follow these steps: 
1. In your web browser, go to your Wavefront instance and log in.
1. On the toolbar, click Logs. You see the Log Browser.
1. Click application and select my_app.
    {% include tip.html content="If **Auto Search** is on, the search results show up on theLog Browser page when you add a source, tag, or word(s) to the search bar. If **Auto Search** is off, to get the search results, click Search."  %}

To learn more, see [Log Browser](logging_log_browser.html).


![A screenshot of the logs browser that shows the logs sent by the demo app.](images/logs_demo_app_log_browser.png)


## Next Steps

* Get an overview of [Tanzu Observability logs](logging_overview.html).
* See how to [send logs to Tanzu Observability](logging_send_logs.html).
* Learn how to [view and browse logs](logging_log_browser.html).
* Learn more about the [proxy configurations and proxy preprocessor rules](logging_proxy_configurations.html).
* Have questions? See [Logs FAQs](logging_faq.html).
