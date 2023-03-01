---
title: Spring Boot Integration
tags: [integrations list]
permalink: springboot.html
summary: Learn about the Wavefront Spring Boot Integration.
---
## Spring Boot Integration

Spring Boot lets you set up, configure, and run both simple and web-based applications. Wavefront supports Spring Boot in two ways:

- This integration has setup steps for configuring a Spring Boot application to send data to Wavefront. A dashboard for examining metrics is included with this integration.
- The [Spring Boot tutorial](https://docs.wavefront.com/wavefront_springboot3_tutorial.html) shows how to send data using the Spring Petclinic application.

In addition to setting up the metrics flow, this integration also installs a dashboard that allows you to monitor the performance of your Spring Boot application. Here's a preview of the dashboard:

{% include image.md src="images/spring_boot_dashboard.png" width="80" %}
{% include image.md src="images/spring_boot_dashboard_1.png" width="80" %}
{% include image.md src="images/spring_boot_dashboard_2.png" width="80" %}
{% include image.md src="images/spring_boot_dashboard_3.png" width="80" %}

## Spring Boot Setup

Wavefront for Spring Boot allows you to quickly configure your environment, so Spring Boot 3 components send metrics, histograms, and traces or spans to the Wavefront service.
For more information, see [Wavefront for Spring Boot 3 documentation](https://docs.wavefront.com/wavefront_springboot3.html).

**Note**: If you are using Spring Boot 2, see [Wavefront for Spring Boot 2 documentation](https://docs.wavefront.com/wavefront_springboot.html).

### Configure Your Application

Follow the steps given below to add the required dependencies to the `pom.xml` file of an existing Spring project that uses Maven. 

**Note**: If you are using Gradle, see [Initialize and Configure Your Project](https://docs.wavefront.com/wavefront_springboot3.html#step-1-initialize-and-configure-your-project) and click the **Initialize an Existing Project** tab for more details.

- Import the wavefront-spring-boot-bom Bill Of Materials (BOM). {% raw %}
    ```xml
    <dependencyManagement>
      <dependencies>
        <dependency>
          <groupId>com.wavefront</groupId>
          <artifactId>wavefront-spring-boot-bom</artifactId>
          <version>3.0.1</version>
          <type>pom</type>
          <scope>import</scope>
        </dependency>
      </dependencies>
    </dependencyManagement>
    ```
{% endraw %}
  Replace `$releaseVersion` with the latest version mentioned in the [documentation](https://docs.wavefront.com/wavefront_springboot3.html#versionCompatibility).

- Add the `wavefront-spring-boot-starter` to your project.
{% raw %}
    ```xml
    <dependency>
      <groupId>com.wavefront</groupId>
      <artifactId>wavefront-spring-boot-starter</artifactId>
    </dependency>
    ```
{% endraw %}

- If you want to send trace data using [Micrometer Tracing](https://micrometer.io/docs/tracing), add the following dependencies.{% raw %}
    ```xml
    <dependency>
      <groupId>io.micrometer</groupId>
      <artifactId>micrometer-tracing-bridge-brave</artifactId>
    </dependency>
    <dependency>
      <groupId>io.micrometer</groupId>
      <artifactId>micrometer-tracing-reporter-wavefront</artifactId>
      <scope>runtime</scope>
    </dependency>
    ```
{% endraw %}

### Custom Configurations

Optionally, you can: 

- Invite users and let them send data to the same cluster.
- Configure your application to send data via the Wavefront proxy because Wavefront for Spring Boot sends data via direct ingestion by default.

For details, see [Custom Configurations](https://docs.wavefront.com/wavefront_springboot3.html#custom-configurations).


