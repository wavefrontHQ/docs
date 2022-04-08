---
title: Spring Boot Integration
tags: [integrations list]
permalink: springboot.html
summary: Learn about the Wavefront Spring Boot Integration.
---
## Spring Boot Integration

Spring Boot lets you set up, configure, and run both simple and web-based applications. Wavefront supports Spring Boot in two ways:

- This integration has setup steps for configuring a Spring Boot application to send **metrics** to Wavefront. A dashboard for examining metrics is included with this integration.
- The [Spring Boot tutorial](https://docs.wavefront.com/wavefront_springboot_tutorial.html) shows how to get **tracing data** into Wavefront.

In addition to setting up the metrics flow, this integration also installs a dashboard that allows you to monitor the performance of your Spring Boot application. Here's a preview of the dashboard:

{% include image.md src="images/spring_boot_dashboard.png" width="80" %}
{% include image.md src="images/spring_boot_dashboard_1.png" width="80" %}
{% include image.md src="images/spring_boot_dashboard_2.png" width="80" %}
{% include image.md src="images/spring_boot_dashboard_3.png" width="80" %}

## Spring Boot Setup

Configure your Spring Boot application to send the Micrometer metrics to Wavefront.
You can send data from your Spring Boot applications into Wavefront by using direct ingestion or the Wavefront proxy.
For more information, see [Wavefront for Spring Boot](https://docs.wavefront.com/wavefront_springboot.html).

### Add Dependency

Ensure your application declares the following starter dependency. For Maven users, here is a `pom.xml` snippet.
- Add the following dependency to send metrics to the Wavefront.{% raw %}
    ```
    <dependencies>
        <dependency>
          <groupId>com.wavefront</groupId>
          <artifactId>wavefront-spring-boot-starter</artifactId>
          <version>$releaseVersion</version>
        </dependency>
    </dependencies>
    ```
{% endraw %}
- (Optional) Add the following dependency to send trace data to the Wavefront using `Spring Cloud Sleuth`.{% raw %}
    ```
    <dependencies>
        <dependency>
          <groupId>org.springframework.cloud</groupId>
          <artifactId>spring-cloud-starter-sleuth</artifactId>
          <version>$releaseVersion</version>
        </dependency>
    </dependencies>
    ```
{% endraw %}

**Note:**  Replace `$releaseVersion` with the latest version mentioned [here](https://github.com/wavefrontHQ/wavefront-spring-boot/blob/master/README.md).

### Option 1. Direct Ingestion of Metrics

#### Add Properties for Direct Ingestion of Metrics to Wavefront

Add the following configuration properties. For example, in an `application.properties` file, add the following snippet:
{% raw %}
```
wavefront.application.name=<APPLICATION-NAME>
wavefront.application.service=<SERVICE-NAME>
management.metrics.export.wavefront.api-token=YOUR_API_TOKEN
management.metrics.export.wavefront.uri=https://YOUR_CLUSTER.wavefront.com
```
{% endraw %}



### Option 2. Create a Wavefront Proxy and Register the Proxy with the Application

#### Step 1. Set up a Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network and reachable from your Spring Boot application, install a proxy.

#### Step 2. Add configuration properties to send metric through the Wavefront Proxy

Add the following configuration properties. For example, in an `application.properties` file, add the following snippet:
{% raw %}
```
wavefront.application.name=<APPLICATION-NAME>
wavefront.application.service=<SERVICE-NAME>
management.metrics.export.wavefront.uri=proxy://<Proxy_Host>:2878
```
{% endraw %}


