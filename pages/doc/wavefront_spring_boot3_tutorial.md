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

1. Add the following configurations to the `pom.xml` file in the sample petclinic application:

    1. Import the Wavefront for Spring Boot Bill of Materials (BOM) to your project. Replace VERSION with the current version.
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

    1. Add the `wavefront-spring-boot-starter` and `micrometer-registry-wavefront` dependencies.
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

    1. Add the `micrometer-tracing-bridge-brave` and `micrometer-tracing-reporter-wavefront` dependencies to send trace data to our service.
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

    1. Add the `datasource-micrometer-spring-boot` dependency to intercept and log JDBC SQL queries. You can intercept most Connection, Statement, and ResultSet methods invocations using the Datasource Micrometer dependency.
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

1. To send data to your Operations for Applications account, specify the `uri` and `api-token` properties as follows:

    ```
    management.wavefront.api-token=$API_Token
    management.wavefront.uri=$wavefront_instance
    ```

    * `$API_Token` is a valid [API token for your Operations for Applications instance](users_account_managing.html#generate-an-api-token).
    * `$wavefront_instance` is the name of your Operations for Applications instance, for example, `https://example.wavefront.com`.


## Send Data to Our Service

1. Restart the application.

1. Navigate to [http://localhost:8080](http://localhost:8080/) and generate telemetry data from the petclinic user interface.
   For example:
   1. Add an Owner and a Pet via the User Interface.
   1. Click **VETERINARIANS** to list vets in the database.
   1. Click **ERROR** to trigger errors.

{% include note.html content="See [custom configurations](wavefront_springboot3.html#custom-configurations) to send data using the Wavefront proxy, invite users and let them add data to your cluster, and much more."%}

## Examine Data on the Spring Boot Inventory Dashboard

To examine the data:

1. Go to your server instance, click **Dashboards** > **All Dashboards** and enter `Spring Boot Inventory`.
1. Select **Contains: Spring Boot Inventory**, and click the **Spring Boot Inventory** result in the table.

You are taken to the Wavefront Spring Boot Inventory dashboard where you can examine the data sent by your application. This dashboard provides real-time visibility into your Spring Boot application landscape. The dashboard has several sections that include the following charts:

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
  * If you configured the application to send trace data using OpenTracing, you can see span logs for the errors you triggered.
  ![Span logs for the petclinic application](/images/springboot3_span_logs_pet_clinic.png)

* View details specific to an application service, such as the Request, Error, and Duration (RED) metrics by clicking <img src="images/spring_boot_service_dashboard_from_tracing_browser.png" style="vertical-align:text-bottom;width:250px" alt="service dashboard"/> on the Traces Browser. See [Explore the Default Service Dashboard](tracing_service_dashboard.html) for details.
  {% include note.html content="<br/>When your application sends data for the first time, they appear after about 1 minute. If you see data from the **beachshirts** sample application, refresh the page or go to **Application** > **Application status** to view the status of your application."%}
  ![Wavefront Service dashboard](/images/springboot3_service_dashboard.png)

{% include tip.html content="To go back to the default Spring Boot Dashboard, see [Wavefront Spring Boot Integration](wavefront_springboot.html#wavefront-spring-boot-integration)." %}

## Next Steps

* See the [Wavefront for Spring Boot FAQs](wavefront_spring_boot_faq.html).
* You cannot save changes that you make to the preconfigured Spring Boot Inventory and Wavefront for Spring Boot Service Dashboards. If you want to modify a preconfigured dashboard, you must clone and edit the preconfigured dashboard. For details, see [Create and Customize Dashboards](ui_dashboards.html).
* Customers can create smart alerts that dynamically filter noise and find true anomalies. For details, see [Alerts](alerts.html).
