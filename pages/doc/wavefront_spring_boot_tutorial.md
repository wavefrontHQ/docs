---
title: Wavefront Spring Boot Starter Tutorial
keywords:
tags: [best practice]
sidebar: doc_sidebar
permalink: wavefront_springboot_tutorial.html
summary: Configure the Wavefront Spring Boot Starter with a sample application.
---
{% include important.html content="This document is work in progress!"%}
In the tutorial, you use the Wavefront Spring Boot Starter with the Spring pet clinic sample application. Let's get started!

## Video
**{Add Video by Clement!}**

## Prerequisites

* Support Java 8 or above.
* Clone the sample pet clinic application.
  ```
  git clone https://github.com/wavefrontHQ/wavefront-spring-boot.git
  ```
* Build the project and start it.
  ```
  ./mvnw package
  java -jar target/*.jar
  ```
  
## Start Configuring

1. Open the sample pet clinic application using an IDE and add the following code to the `pom.xml` file. 
    ```
    <dependency>
      <groupId>com.wavefront</groupId>
      <artifactId>wavefront-spring-boot-starter</artifactId>
      <version>2.0.0</version>
    </dependency>
    ```
2. Restart the application and navigate to [http://localhost:8080](http://localhost:8080/).
3. Add data:
    1. Let's add an Owner and a Pet via the User Interface.
        <br/>**{SHORT VIDEO or SCREENSHOT}**
    2. Click **ERROR** to create an error.
        <br/>**{SCREENSHOT}**
4. Click the one-time use link to access the Wavefront Service dashboard and view data.
    <br/> Example:
    ```
    w.s.WavefrontSpringBootAutoConfiguration : ==========================
    w.s.WavefrontSpringBootAutoConfiguration : See Wavefront Application Observability Data (one-time use link): https://wavefront.surf/us/XXXXXXXXXX
    w.s.WavefrontSpringBootAutoConfiguration : ===========================
    ```

## View Data in Wavefront

When you click the link you are taken to the Services dashboard where you can:

* View details specific to an application service, such as the Request, Error, and Duration (RED) metrics. See [Explore the Default Service Dashboard](tracing_ui_overview.html#explore-the-default-service-dashboard) for details.
* Click **See All {NAME} Traces** to navigate to the Tracing browser and view the trace data of the {NAME} service.
  <br/>Once in the tracing browser, you see the traces from the application and the trace related to the error you created. 

**ADD SHORT VIDEO**
