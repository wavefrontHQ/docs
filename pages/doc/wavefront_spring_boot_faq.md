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

## What Is the Difference Between the Wavefront for Spring Boot Freemium Cluster and a Free Trial?

* **Wavefront for Spring Boot Freemium cluster** <br/>The freemium cluster supports limited data ingestion throughput with 5-day retention and no SLA guarantees. It allows developers to try out our service without having to sign up or provide an email address. Freemium accounts that are inactive for 3 days are automatically deleted.

* **Free trial** <br/>The free trial allows you to experience the full power of the our service by bringing in data from your cloud environments (such as AWS, GCP, Azure, vSphere, etc.), Kubernetes, over 200 integrations, and large-scale service fleets into a single observability platform. You can also create smart alerts that dynamically filter noise and capture true anomalies. When you sign up for a trial, we'll ask for some (minimal) information.

  Once you've signed up, you can retrieve an API token and configure it in your `application.properties` file:
  ```
  # Spring Boot 3:
  management.wavefront.api-token=44444-34this-45is-123a-sampletoken
  
  # Spring Boot 2:
  management.metrics.export.wavefront.api-token=44444-34this-45is-123a-sampletoken
  ```

## What Is the Retention and Service Level Agreement (SLA) on the Wavefront for Spring Boot Freemium Cluster?

While this is subject to changes at any time, we currently retain 5 days of data and offer no SLA on our free cluster. Freemium accounts that are are inactive for 3 days are automatically deleted.

<!--Production clusters currently offer 18 months of full-resolution (no downsampling) data retention for persistent metrics, 28 days for ephemeral metrics, 6 months for histograms, and 7 days for spans. We also have a 99.95% uptime guarantee, as well as High Availability (HA) and Disaster Recovery (DR) options.-->

## Why Do I Not See a Link to Access the Free Service on Start-Up?

* Currently, only our freemium cluster supports automatic account provisioning with Spring Boot. If you are using a different cluster, you won’t see a link.
* You have configured an API token in your application's `application.properties` file. If you want to see the link printed on the console, add `wavefront.freemium-account=true` to the `application.properties` file.
* If you have a web application, expose the Tanzu Observability (formerly known as VMware Aria Operations for Applications) actuator endpoint to easily access your dashboard.

## How Do I Ensure I Send Data to the Same Account All the Time (Across Multiple Machines and Deployments)?
* If you are just trying out our service, see [Manage Service Accounts](service-accounts.html) to create a service account that has a static token for reporting. Once you have the token, add it to the `application.properties` file.
* If you want to use our service in a larger deployment, sign up for [a free trial] (https://tanzu.vmware.com/observability) and see [Manage Service Accounts](service-accounts.html) to learn how to create a service account. Next, add the token and URL to the `application.properties` file. We can help you with sizing and designing large-scale collection architectures for metrics, histograms, and traces. Reach out to us at support@wavefront.com.

## How Do I Log In to the Account Using an Email and Password?

You can [invite users and let them send data to the same cluster](wavefront_springboot3.html#custom-configurations). To invite yourself, just enter your email address.

If you added `wavefront.freemium-account=true` to your `application.properties` file, make sure to remove it so that a single-use login URL is no longer requested on startup.

## What Do I Do if I Sign Out of the Freemium Cluster?

* If you have invited yourself and created an account, log in using your username and password.
* Save the link that you used to access the Wavefront for Spring Boot dashboard and restart your Spring Boot application. Next, paste the link you saved into a browser to access the dashboard.
* If you deleted the `~/.wavefront_freemium` file that was saved in the home directory, a new account is created and you will not be able to access the old link you saved to view your existing data.

## What's the Spring Boot Integration?

* **Wavefront Spring Boot Integration** Our customers and trial users can access the Wavefront Spring Boot integration directly from their clusters.
* **Wavefront for Spring Boot Starter**<br/> If you configure your application with the Wavefront for Spring Boot starter, you can send metrics, histograms, and traces/spans to our service, and view your data, find hotspots, and gather more data.
  - **Freemium** All users can run the Spring Boot Starter with the default settings to view their data in the Freemium instance. Certain limitations apply, for example, alerts are not available, but you don't have to sign up.
  - **Customers or  Free Trial User** Customers or free trial users can modify the default Wavefront Spring Boot Starter to send data to their cluster. You can sign up for a [free 30-day trial](https://tanzu.vmware.com/observability).

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

## Why Do I Get a Failed to Retrieve Existing Account Information Error?

If you have not used your freemium account for more than three days, our service deletes the account. Therefore, when you try to run the application and send data to the freemium account that was deleted, you see the following error:

```
Failed to retrieve existing account information from https://wavefront.surf. The error was:

You are not authorized to perform this operation
```

To send data again, you need to create a new freemium account. Follow these steps:
1. Delete the `~/.wavefront_freemium` file.
1. Run the application to create a new freemium account.
