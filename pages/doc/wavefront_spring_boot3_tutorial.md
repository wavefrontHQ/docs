---
title: Wavefront for Spring Boot 3 Tutorial
keywords:
tags: [tutorials]
sidebar: doc_sidebar
permalink: wavefront_springboot3_tutorial.html
summary: Configure Wavefront for Spring Boot with a sample application.
---
In this tutorial, you use Wavefront for Spring Boot that uses Spring Boot 3 with the Spring pet clinic sample application. This tutorial sets dependencies explicitly. In most cases, it makes sense to use the [Spring Initializr](https://start.spring.io/) instead to explore supported combinations.

{% include tip.html content="Want to start your project from scratch using [https://start.spring.io/](https://start.spring.io/)? Follow the [Observability with Spring](https://spring.io/guides/gs/tanzu-observability/) tutorial." %}

## Prerequisites

* Spring Boot 3.0.0 or later.
* Java 17 or later.
* Maven 3.5+ or Gradle 7.5+ or later.
  <br/>See [System Requirements](https://docs.spring.io/spring-boot/docs/3.0.x/reference/html/getting-started.html#getting-started.system-requirements) in the Spring Boot documentation.
* Clone the sample petclinic application.
  ```
  git clone https://github.com/spring-projects/spring-petclinic.git
  ```
* Build the project and start it.
  ```
  cd spring-petclinic
  ./mvnw spring-boot:run
  ```
* Verify you can access the petclinic app at [http://localhost:8080/](http://localhost:8080/).


## Configure the Petclinic Application

1. Import the Wavefront for Spring Boot Bill of Materials (BOM) to your project. Add the following code to the `pom.xml` file (replace VERSION with the current version).
   {{site.data.alerts.tip}}
      <p> Make sure that the Wavefront for Spring Boot dependency is compatible with the Spring Boot release version. See <a href="wavefront_springboot3.html#versionCompatibility">System Requirements</a> to get the correct dependency version.
      <br/>
      For example, if you are using Spring Boot release version 3.0.1, the <code>VERSION</code> must be 3.0.1.
      </p>
    {{site.data.alerts.end}}
    ```xml
    <dependencyManagement>
      <dependencies>
        <dependency>
          <groupId>com.wavefront</groupId>
          <artifactId>wavefront-spring-boot-bom</artifactId>
          <version>VERSION</version>
          <type>pom</type>
          <scope>import</scope>
        </dependency>
      </dependencies>
    </dependencyManagement>
    ```

1. Open the sample petclinic application using an IDE and add the `wavefront-spring-boot-starter` and `micrometer-registry-wavefront` to the `pom.xml` file's `<dependencies>`.
    ```xml
    <dependency>
      <groupId>com.wavefront</groupId>
      <artifactId>wavefront-spring-boot-starter</artifactId>
    </dependency>
    <dependency>
      <groupId>io.micrometer</groupId>
      <artifactId>micrometer-registry-wavefront</artifactId>
      <scope>runtime</scope>
    </dependency>
    ```

1. Add the following dependencies to your <code>pom.xml</code> to send trace data to Wavefront.
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

1. Add the `Datasource Micrometer` dependency to intercept and log JDBC SQL queries. You can intercept most Connection, Statement, and ResultSet methods invocations using the Datasource Micrometer dependency.
   {{site.data.alerts.tip}}
      <p>Check the <a href="https://github.com/jdbc-observations/datasource-micrometer/releases">Datasource Micrometer releases</a> and enter the latest version in place of <code>VERSION</code>.</p>
    {{site.data.alerts.end}}
    ```xml
    <dependency>
      <groupId>net.ttddyy.observation</groupId>
      <artifactId>datasource-micrometer-spring-boot</artifactId>
      <version>VERSION</version>
      <scope>runtime</scope>
    </dependency>
    ```

1. Add the following configurations to the `application.properties` file so that your:
    * Application is named `spring-demo`.
    * Service is named `spring-petclinic`.
    * The probability of traces being sampled is set to 100% for demo purposes. To learn more on trace data sampling, see [Trace Sampling](trace_data_sampling.html).
    ```
    management.wavefront.application.name=spring-demo
    management.wavefront.application.service-name=spring-petclinic
    management.tracing.sampling.probability=1.0
    ```

## Send Data to Our Service

1. Restart the application and navigate to [http://localhost:8080](http://localhost:8080/).

1. Generate telemetry data from the petclinic user interface.
   For example:
   1. Add an Owner and a Pet via the User Interface.
   1. Click **VETERINARIANS** to list vets in the database.
   1. Click **ERROR** to trigger errors.

1. Click the one-time use link to access the Wavefront for Spring Boot Service Dashboard and view data.
   {% include tip.html content = "Make sure to save the one-time use link so you can access the same dashboard each time you restart your application."%}
   Example:
    ```
    To share this account, make sure the following is added to your configuration:

       management.wavefront.api-token=1111-your-token-aaaa1111
       management.wavefront.uri=https://wavefront.surf

    Connect to your Wavefront dashboard using this one-time use link:
    https://wavefront.surf/us/ExaMPLe
   ```

{% include note.html content="See [custom configurations](wavefront_springboot3.html#custom-configurations) to send data using the Wavefront proxy, invite users and let them add data to your cluster, and much more."%}

## Examine Data on the Spring Boot Inventory Dashboard

When you click the link in the Wavefront Spring Boot starter, you are taken to the Spring Boot Inventory dashboard. This dashboard provides real-time visibility into your Spring Boot application landscape. The dashboard has several sections that include the following charts:

* Status of hosts, applications, and services.
* Request rate.
* Inventory details.
* Hosts. Use the drop-down menus to group the hosts.

If one or more applications are enabled for tracing, click the link in the **Tracing** section to be directed to the Tracing dashboard.

![Spring Boot inventory screenshot](images/springboot3_metrics_callout.png)

## Examine RED Metrics and Traces

When you click the link in the Spring Boot Inventory dashboard, you are taken to the Spring Boot Traces Browser where you can:

* View the trace data of the `spring-petclinic` service.
  * Once in the Traces Browser, you see the traces from the application and the trace related to the error you created.
  * If you configured your application to send trace data using OpenTracing, you can see span logs for the errors you triggered.
  ![Span logs for the petclinic application](/images/springboot3_span_logs_pet_clinic.png)

* View details specific to an application service, such as the Request, Error, and Duration (RED) metrics by clicking <img src="images/spring_boot_service_dashboard_from_tracing_browser.png" style="vertical-align:text-bottom;width:250px" alt="service dashboard"/> on the Traces Browser. See [Explore the Default Service Dashboard](tracing_service_dashboard.html) for details.
  {% include note.html content="<br/>When your application sends data for the first time, they appear after about 1 minute. If you see data from the **beachshirts** sample application, refresh the page or go to **Application** > **Application status** to view the status of your application."%}
  ![Wavefront Service dashboard](/images/springboot3_service_dashboard.png)

{% include tip.html content="To go back to the default Spring Boot Dashboard, see [Wavefront Spring Boot Integration](wavefront_springboot.html#wavefront-spring-boot-integration)." %}

## Next Steps

* See the [Wavefront for Spring Boot FAQs](wavefront_spring_boot_faq.html).
* You cannot save changes that you make to the preconfigured Spring Boot Inventory and Wavefront for Spring Boot Service Dashboards. If you want to modify a preconfigured dashboard, you must clone and edit the preconfigured dashboard. For details, see [Create and Customize Dashboards](ui_dashboards.html).
* Customers or free trial users can create smart alerts that dynamically filter noise and find true anomalies. For details, see [Alerts](alerts.html).
    {% include note.html content="Alerts are not supported on the freemium cluster."%}
* Try out the petclinic application with the Micrometer. See [Wavefront for Spring Boot: Getting Started](https://tanzu.vmware.com/developer/guides/spring/spring-wavefront-gs/) for details.
