---
title: Wavefront Spring Boot Tutorial
keywords:
tags: [best practice]
sidebar: doc_sidebar
permalink: wavefront_springboot_tutorial.html
summary: Try out this tutorial to configure the Spring Boot Autoconfigure SDK with a sample application.
---

In the tutorial, you will use the Wavefront Spring Boot Autoconfigure SDK with the Spring pet clinic sample application. Let's get stated!

## Steps in Detail
**Add Video by Clement!**

## Prerequisites

* Support Java 8 or above
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
2. Restart the application, and navigate to [http://localhost:8080/](http://localhost:8080/).
3. Add data:
    1. Let's add an Owner and a Pet using the User Interface.
        <br/>{SHORT VIDEO HERE}
    2. Click **ERROR** to create an error.
        <br/>{SCREENSHOT}
4. Click the one-time use link that was printed on your console to access the Wavefront Service Dashboard and view data.
    <br/> Example:
    ```
    w.s.WavefrontSpringBootAutoConfiguration : ==========================
    w.s.WavefrontSpringBootAutoConfiguration : See Wavefront Application Observability Data (one-time use link): https://wavefront.surf/us/XXXXXXXXXX
    w.s.WavefrontSpringBootAutoConfiguration : ===========================
    ```

## View Data in Wavefront

You can get a summary on your application and navigate to the Tracing Browser for the respective service.

{ADD OTHER COOLS THINGS}
