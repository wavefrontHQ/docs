---
title: Wavefront for Spring Boot Tutorial
keywords:
tags: [best practice]
sidebar: doc_sidebar
permalink: wavefront_springboot_tutorial.html
summary: Configure Wavefront for Spring Boot with a sample application.
---
{% include important.html content="This document is work in progress!"%}
In the tutorial, you use Wavefront for Spring Boot with the Spring pet clinic sample application. Let's get started!

## Video
**{Add Video by Clement!}**

## Prerequisites

* Spring Boot 2.3.0 or above
* Java 8 or above
* Maven 3.3+ or Gradle 6.3 or later
  <br/>See [System Requirements](https://docs.spring.io/spring-boot/docs/2.3.0.RC1/reference/html/getting-started.html#getting-started-system-requirements) in the Spring Boot documentation.
* Clone the sample pet clinic application.
  ```
  git clone https://github.com/wavefrontHQ/wavefront-spring-boot.git
  ```
* Build the project and start it.
  ```
  ./mvnw spring-boot:run
  ```
  
## Start Configuring

1. Open the sample pet clinic application using an IDE and add the following code: 
    ```
    <dependency>
      <groupId>com.wavefront</groupId>
      <artifactId>wavefront-spring-boot-starter</artifactId>
      <version>2.0.0</version>
    </dependency>
    ```
          
1. Optionally, send trace data to Wavefront using Spring Cloud Sleuth (recommended) or OpenTracing.
    <ul id="profileTabs" class="nav nav-tabs">
        <li class="active"><a href="#sleuth" data-toggle="tab">Spring Cloud Sleuth</a></li>
        <li><a href="#opentracing" data-toggle="tab">OpenTracing</a></li>
    </ul>
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="sleuth">
            <p><b>Maven</b>:<br/>Open your application and add the following code to your <code>pom.xml</code> file. </p>
              <pre>
&lt;dependency&gt;
  &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
  &lt;artifactId&gt;spring-cloud-starter-sleuth&lt;/artifactId&gt;
  &lt;version&gt;2.2.2.RELEASE&lt;/version&gt;
&lt;/dependency&gt;
            </pre>
        </div>

        <div role="tabpanel" class="tab-pane" id="opentracing">
        <p><b>Maven</b>: <br/>Open your application and add the following code to your <code>pom.xml</code> file. </p>
          <pre>
&lt;dependency&gt;
  &lt;groupId&gt;io.opentracing.contrib&lt;/groupId&gt;
  &lt;artifactId&gt;opentracing-spring-cloud-starter&lt;/artifactId&gt;
  &lt;version&gt;0.5.3&lt;/version&gt;
&lt;/dependency&gt;
        </pre>
        </div>
      </div>
1. Restart the application and navigate to [http://localhost:8080](http://localhost:8080/).
1. Add data by clicking on the pet clinic user interface.
    For example: 
    1. Let's add an Owner and a Pet via the User Interface.
    2. Click **ERROR** to trigger errors.
1. Click the one-time use link to access the Wavefront Service dashboard and view data.
    <br/> Example:
    ```
    To share this account, make sure the following is added to your configuration:

     management.metrics.export.wavefront.api-token=44444-34this-45is-123a-sampletoken
     management.metrics.export.wavefront.uri=https://wavefront.surf

    Connect to your Wavefront dashboard using this one-time use link:
    https://wavefront.surf/us/example
    ```

## View Data in Wavefront

When you click the link, you are taken to the Services dashboard where you can:

* View details specific to an application service, such as the Request, Error, and Duration (RED) metrics. See [Explore the Default Service Dashboard](tracing_ui_overview.html#explore-the-default-service-dashboard) for details.
* Click **See All spring-petclinic Traces** to navigate to the Tracing browser and view the trace data of the `spring-petclinic` service.
  <br/>Once in the tracing browser, you see the traces from the application and the trace related to the error you created. 
  
{% include note.html content="<br/>When your application sends data for the first time, they appear after about 1 minute. If you see data from the **beachshirts** sample application, refresh the page or go to **Application** > **Application status** to view the status of your application."%}

<iframe width="560" height="315" src="https://www.youtube.com/embed/bHo1f5p-LsU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
