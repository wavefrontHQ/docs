---
title: Wavefront for Spring Boot Tutorial
keywords:
tags: [tutorials]
sidebar: doc_sidebar
permalink: wavefront_springboot_tutorial.html
summary: Configure Wavefront for Spring Boot with a sample application.
---
In this tutorial, you use Wavefront for Spring Boot with the Spring pet clinic sample application. This tutorial sets dependencies explicitly. In most cases, it makes sense to use the [Spring Initializr](https://start.spring.io/) instead to explore supported combinations.

{% include tip.html content="Want to start your project from scratch using [https://start.spring.io/](https://start.spring.io/)? Follow the [Observability with Spring](https://spring.io/guides/gs/tanzu-observability/) tutorial." %}

<!---
## Video
Let's take a look at how you can configure your Spring Boot application with Wavefront for Spring Boot to send data to Wavefront and analyze this data.

<iframe width="640" height="360" src="https://www.youtube.com/embed/Jxwf-Iw-3T8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
--->

## Prerequisites

* Spring Boot 2.3.0 or above.
* Java 8 or above.
* Maven 3.3+ or Gradle 6.3 or later.
  <br/>See [System Requirements](https://docs.spring.io/spring-boot/docs/2.3.x/reference/html/getting-started.html#getting-started-system-requirements) in the Spring Boot documentation.
* Clone the sample pet clinic application.
  ```
  git clone https://github.com/spring-projects/spring-petclinic.git
  ```
* Build the project and start it.
  ```
  cd spring-petclinic
  ./mvnw spring-boot:run
  ```

## Send Data to Wavefront

1. Open the sample pet clinic application using an IDE and add the following code to the `pom.xml` file:
    ```
    <dependency>
      <groupId>com.wavefront</groupId>
      <artifactId>wavefront-spring-boot-starter</artifactId>
    </dependency>
    ```
1. Import the Wavefront for Spring Boot Bill of Materials (BOM) to your project. Add the following code to the `pom.xml` file (replace VERSION with the current version):
    {{site.data.alerts.tip}}
      <p> Make sure the Wavefront for Spring Boot dependency is compatible with the Spring Boot release version. See <a href="wavefront_springboot.html#versionCompatibility">System Requirements</a> to get the correct dependency version.
      <br/>
      For example, if you are using Spring Boot release version 2.5.3, the <code>VERSION</code> needs to be 2.2.0.
      </p>
    {{site.data.alerts.end}}
    ```
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

1. Add the following dependency to send trace data to Wavefront using Spring Cloud Sleuth or OpenTracing. Pick either Spring Cloud Sleuth or OpenTracing and use it across all your microservices.

    <ul id="profileTabs" class="nav nav-tabs">
        <li class="active"><a href="#sleuth" data-toggle="tab">Spring Cloud Sleuth</a></li>
        <li><a href="#opentracing" data-toggle="tab">OpenTracing</a></li>
    </ul>
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="sleuth">
        <ol>
        <li>
            <p>Open your application and add the following code to your <code>pom.xml</code> file. </p>
              <pre>
&lt;dependency&gt;
  &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
  &lt;artifactId&gt;spring-cloud-starter-sleuth&lt;/artifactId&gt;
&lt;/dependency&gt;
            </pre>
            </li>
            <li>
            <p>Import the Spring Cloud Bill of Materials (BOM) to your project. Add the following code under &lt;dependencyManagement&gt;.</p>
            {{site.data.alerts.tip}}
              <p>Make sure the Spring Cloud dependency is compatible with the Spring Boot release version. See <a href="https://spring.io/projects/spring-cloud#getting-started">Getting Started on the Spring Cloud documentation</a> for details.
              <br/>
              For example, if you are using Spring Boot release version 2.5.3, the <code>VERSION</code> can be 2020.0.3.
              </p>
            {{site.data.alerts.end}}
            <pre>
&lt;dependencyManagement&gt;
&lt;dependencies&gt;
.....
&lt;dependency&gt;
&lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
&lt;artifactId&gt;spring-cloud-dependencies&lt;/artifactId&gt;
&lt;version&gt;VERSION&lt;/version&gt;
&lt;type&gt;pom&lt;/type&gt;
&lt;scope&gt;import&lt;/scope&gt;
&lt;/dependency&gt;
.....
&lt;/dependencies&gt;
&lt;/dependencyManagement&gt;
            </pre>

            </li>
            </ol>
        </div>

        <div role="tabpanel" class="tab-pane" id="opentracing">
        <p>Open your application and add the following code to your <code>pom.xml</code> file. </p>
          <pre>
&lt;dependency&gt;
  &lt;groupId&gt;io.opentracing.contrib&lt;/groupId&gt;
  &lt;artifactId&gt;opentracing-spring-cloud-starter&lt;/artifactId&gt;
  &lt;version&gt;0.5.7&lt;/version&gt;
&lt;/dependency&gt;
        </pre>
        </div>
      </div>
1. Add the following configurations to the `application.properties` file so that your application is named `spring-demo`, and the service is named `spring-petclinic`.
    ```
    wavefront.application.name=spring-demo
    wavefront.application.service=spring-petclinic
    ```
1. Restart the application and navigate to [http://localhost:8080](http://localhost:8080/).
1. Add data by clicking on the pet clinic user interface.
    For example:
    1. Add an Owner and a Pet via the User Interface.
    2. Click **ERROR** to trigger errors.
1. Click the one-time use link to access the Wavefront Service Dashboard and view data.
    {% include tip.html content = "Make sure to save the one-time use link so you can access the same dashboard each time you restart your application."%}
    Example:
    ```
    To share this account, make sure the following is added to your configuration:

     management.metrics.export.wavefront.api-token=44444-34this-45is-123a-sampletoken
     management.metrics.export.wavefront.uri=https://wavefront.surf

    Connect to your Wavefront dashboard using this one-time use link:
    https://wavefront.surf/us/example
    ```

  {% include note.html content="See [custom configurations](wavefront_springboot.html#custom-configurations) to send data using the Wavefront proxy, invite users and let them add data to your cluster, and much more."%}

## Examine Inventory Data

When you click the link in the Wavefront Spring Boot starter, you are taken to the Spring Boot Inventory dashboard. This dashboard provides real-time visibility into your Spring Boot application landscape. The dashboard has several sections that include the following charts:

* Status of hosts, applications, and services.
* Request rate
* Inventory details
* Hosts. Use the drop-down menus to group the hosts.

If one or more applications are enabled for tracing, click the link in the Tracing section to be directed to the Tracing dashboard.

![Spring Boot inventory screenshot](images/springboot_metrics_callout.png)

## Examine RED Metrics and Traces

When you click the link in the Spring Boot Inventory dashboard, you are taken to the Spring Boot Traces Browser where you can:

* View the trace data of the `spring-petclinic` service.
  * Once in the Traces Browser, you see the traces from the application and the trace related to the error you created.
  * If you configured your application to send trace data using OpenTracing, you can see [span logs](#tracing_instrumenting_frameworks.html#span-logs) for the errors you triggered.
  ![Span logs for the pet clinic applciation](/images/springboot_span_logs_pet_clinic.png)

* View details specific to an application service, such as the Request, Error, and Duration (RED) metrics by clicking <img src="images/spring_boot_service_dashboard_from_tracing_browser.png" style="vertical-align:text-bottom;width:250px" alt="service dashboard"/> on the Traces Browser. See [Explore the Default Service Dashboard](tracing_service_dashboard.html) for details.
  {% include note.html content="<br/>When your application sends data for the first time, they appear after about 1 minute. If you see data from the **beachshirts** sample application, refresh the page or go to **Application** > **Application status** to view the status of your application."%}
  ![Wavefront Service dashboard](/images/springboot_service_dashboard.png)

{% include tip.html content="To go back to the default Spring Boot Dashboard, see [Wavefront Spring Boot Integration](wavefront_springboot.html#wavefront-spring-boot-integration)." %}

## Next Steps

* See the [Wavefront for Spring Boot FAQs](wavefront_spring_boot_faq.html).
* You cannot save changes that you make to the preconfigured Spring Boot Inventory and Wavefront Service Dashboards. If you want custom dashboards, clone and edit it the Wavefront dashboard. For details, see [Create and Customize Dashboards](ui_dashboards.html).
* Wavefront customers or trial users can create smart alerts that dynamically filter noise and find true anomalies. For details, see [Alerts](alerts.html).
    {% include note.html content="Alerts are not supported on this freemium cluster."%}
* Try out the pet clinic application with the Micrometer. See [Wavefront for Spring Boot: Getting Started](https://tanzu.vmware.com/developer/guides/spring/spring-wavefront-gs/) for details.
