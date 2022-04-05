---
title: Wavefront for Spring Boot FAQs
keywords:
tags:
sidebar: doc_sidebar
permalink: wavefront_spring_boot_faq.html
summary: Get answers to your questions about Wavefront for Spring Boot
---

### What is the difference between the Wavefront for Spring Boot freemium cluster and a Wavefront trial?

* **Wavefront for Spring Boot Freemium cluster** <br/>The freemium cluster supports limited data ingestion throughput with 5-day retention and no SLA guarantees. It allows developers to try out Wavefront without having to sign up or provide an email address.

* **Wavefront trial** <br/>The Wavefront trial allows you to experience the full power of the Wavefront platform by bringing in data from your cloud environments (AWS/GCP/Azure/vSphere), Kubernetes, over 200 integrations, and large-scale service fleets into a single observability platform. You can also create smart alerts that dynamically filter noise and capture true anomalies. When you sign up for a trial, we'll ask for some (minimal) information.

  Once you've signed up, you can retrieve an API token and configure it in your `application.properties` file:
  ```
  management.metrics.export.wavefront.api-token=44444-34this-45is-123a-sampletoken
  ```

### What is the retention and Service Level Agreement (SLA) on the Wavefront for Spring Boot freemium cluster?

While this is subject to changes at any time, we currently retain 5 days of data and offer no SLA on the free Wavefront cluster. Production Wavefront clusters currently offer 18 months of full-resolution (no downsampling) data retention for metrics, 6 months for histograms, and 7 days for spans. We also have a 99.95% uptime guarantee, as well as High Availability (HA) and Disaster Recovery (DR) options.

Reach out to us on [Slack](https://www.wavefront.com/join-public-slack) and join the #springboot public channel for more information.

### Why do I not see a link to access the Wavefront service on start-up?

* Currently, only our freemium cluster supports automatic account provisioning with Spring Boot. If you are using a different cluster, you won’t see a link.
* You have configured an API token in your application's `application.properties` file. If you want to see the link printed on the console, add `wavefront.freemium-account=true` to the `application.properties` file.
* If you have a web application, expose the Wavefront actuator endpoint to easily access your dashboard.

### How do I ensure I send data to the same account all the time (across multiple machines and deployments)?
* If you are just trying out Wavefront, see [Manage Service Accounts](service-accounts.html) to create a service account that has a static token for reporting. Once you have the token, add it to the `application.properties` file.
* If you want to use Wavefront in a larger deployment, sign up for [a Wavefront trial] (https://tanzu.vmware.com/observability) and see [Manage Service Accounts](service-accounts.html) to learn how to create a service account. Next, add the token and URL to the `application.properties` file. We can help you with sizing and designing large-scale collection architectures for metrics, histograms, and traces. Reach out to us on [Slack](https://www.wavefront.com/join-public-slack) and join the #springboot public channel for more information.

### How do I set up an email/password login to the account?

You can [invite users and let them send data to the same cluster](wavefront_springboot.html#custom-configurations). To invite yourself, just enter your email address.

If you added `wavefront.freemium-account=true` to your `application.properties` file, make sure to remove it so that a single-use login URL is no longer requested on startup.

### What do I do if I sign out of the freemium cluster?

* If you have invited yourself and created an account, log in using your username and password.
* Save the link that you used to access the Wavefront Service dashboard and restart your Spring Boot application. Next, paste the link you saved into a browser to access the dashboard.
* If you deleted the `~/.wavefront_freemium` file that was saved in the home directory, a new account is created and you will not be able to access the old link you saved to view your existing data.

### (NEW) What's the Spring Boot integration?

Starting in September 2020, we support the [Wavefront Spring Boot starter](https://github.com/wavefrontHQ/wavefront-spring-boot) or with the Spring Boot integration.

* **Wavefront Spring Boot Integration** Wavefront customers and trial users can access the Wavefront Spring Boot integration directly from their clusters.
* **Wavefront for Spring Boot Starter**<br/> If you configure your application with the Wavefront for Spring Boot starter, you can send metrics, histograms, and traces/spans to the Wavefront service. Once the data is in Wavefront, you can view your data, find hotspots, and gather more data.
  - **Freemium** All users can run the Spring Boot Starter with the default settings to view their data in the Wavefront Freemium instance. Certain limitations apply, for example, alerts are not available, but you don't have to sign up.
  - **Wavefront Customer or Trial User** Wavefront customers or trial users can modify the default Wavefront Spring Boot Starter to send data to their cluster. You can sign up for a [free 30-day trial](https://tanzu.vmware.com/observability).

### How can I see my metrics? How can I see my traces?

Starting in September 2020, the Spring Boot Starter directs you to the Spring Boot Inventory dashboard that allows you to examine certain metrics that Micrometer collects by default.

If applications are enabled for tracing, you can click the link in the Tracing section to be directed to the Tracing dashboard.

![Spring Boot inventory screenshot](images/springboot_metrics_callout.png)

### Why don't I see the default dashboard when I click on the link?
If you create a new project using [https://start.spring.io](https://start.spring.io/), add the Wavefront dependency, download the project, run it, and click the link on the terminal, you are not taken to the default dashboard.
That is because the default project stops soon as it starts without a web service. As a result, data is not sent to Wavefront. To avoid this, add a dependency under the Web category, such as the Spring Web dependency, along with the wavefront dependency, and generate a new project.

### (NEW) How can I instrumented with distributed tracing across multiple microservices?

Assume that you want to write Spring Boot code and instrument for OpenTracing. You want to ensure OpenTracing creates spans that work across multiple microservices.  Here's what you need to know:
* If you're using Spring Cloud Sleuth, **everything has to be a bean**. For example, if you're using RestTemplates, those have to be beans.
* You can create a RestTemplate bean yourself, or you can inject via RestTemplateBuilder.

If you use a messaging or HTTP client (not a bean), Sleuth won't work. See [Use Tracing with Spring Boot](tracing_best_practices.html#using-tracing-with-spring-boot) for an example.
