---
title: Wavefront for Spring Boot FAQs
keywords:
tags:
sidebar: doc_sidebar
permalink: wavefront_spring_boot_faq.html
summary: Get answers to your questions about Wavefront for Spring Boot
---

On this page, you can find answers to some commonly asked questions when using Wavefront for Spring Boot.

## How Do I Upgrade From Spring Boot 2 to Spring Boot 3?

Follow these steps:

1. Upgrade your application to use Spring Boot 3. For details, see the [Spring Boot 3.0 Migration Guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide).
1. If the application uses Spring Cloud Sleuth, see the [Spring Cloud Sleuth 3.1 Migration Guide](https://github.com/micrometer-metrics/tracing/wiki/Spring-Cloud-Sleuth-3.1-Migration-Guide) to migrate from Spring Boot 2 to Spring Boot 3.
1. Update the Wavefront for Spring Boot dependencies for your existing project. For more details, see [how to configure an existing Spring Boot application](wavefront_springboot3.html#step-1-initialize-and-configure-your-project) and click the **Initialize an Existing Project** tab.


## How Do I Ensure I Send Data to the Same Account All the Time (Across Multiple Machines and Deployments)?
* If you are just trying out our service, see [Manage Service Accounts](service-accounts.html) to create a service account that has a static token for reporting. Once you have the token, add it to the `application.properties` file.
* If you want to use our service in a larger deployment, you need to sign up to create a new customer account and see [Manage Service Accounts](service-accounts.html) to learn how to create a service account. Next, add the token and URL to the `application.properties` file. We can help you with sizing and designing large-scale collection architectures for metrics, histograms, and traces. Reach out to our [Technical Support team](wavefront_support_feedback.html#support).

## How Do I Log In to the Account Using an Email and Password?

You can [invite users and let them send data to the same cluster](wavefront_springboot3.html#custom-configurations). To invite yourself, just enter your email address.

## What's the Spring Boot Integration?

* **Wavefront Spring Boot Integration** Our customers can access the Wavefront Spring Boot integration directly from their clusters.
* **Wavefront for Spring Boot Starter**<br/> If you configure your application with the Wavefront for Spring Boot starter, you can send metrics, histograms, and traces/spans to our service, and view your data, find hotspots, and gather more data. Customers can modify the default Wavefront Spring Boot Starter to send data to their cluster.

## How Can I See My Metrics and Traces?

The Spring Boot Starter directs you to the Spring Boot Inventory dashboard that allows you to examine the metrics collected by default by the  Micrometer.

If applications are enabled for tracing, you can click the link in the **Tracing** section to see trace data on the Traces Browser.

![Spring Boot inventory screenshot](images/springboot_metrics_callout.png)

## Why Don't I See the Default Dashboard When I Click the Link?
If you create a new project using [https://start.spring.io](https://start.spring.io/), add the Wavefront dependency, download the project, run it, and click the link on the terminal, you are not taken to the default dashboard.
That is because the default project stops soon as it starts without a web service. As a result, data is not sent to Wavefront. To avoid this, add a dependency under the Web category, such as the Spring Web dependency, along with the wavefront dependency, and generate a new project.

## Why Are the Traces Between Microservices Not Working When I Use RestTemplates?

If you are using Spring Boot 2 with Sleuth or Spring Boot 3 with Micrometer Tracing, and you are using a `RestTemplate` to send and receive messages between microservices:
* Everything has to be a bean. All `RestTemplate` must come from a bean for distributed tracing to work.
* You can create a `RestTemplate` bean yourself, or inject it via the `RestTemplateBuilder`.
* If you invoke a Remote Procedure Call (RPC) or messaging service without using a bean, Sleuth and Micrometer Tracing won't work. See [Use Tracing with Spring Boot](tracing_best_practices.html#using-tracing-with-spring-boot) for an example.
