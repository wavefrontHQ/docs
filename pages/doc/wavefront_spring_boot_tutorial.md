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

* Support Java 8 or above
* Spring Boot 2.3.0 or above
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

1. Open the sample pet clinic application using an IDE and add the following code: 
    <ul id="profileTabs" class="nav nav-tabs">
        <li class="active"><a href="#maven" data-toggle="tab">Maven</a></li>
        <li><a href="#gradle" data-toggle="tab">Gradle</a></li>
    </ul>
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="maven">
            <p>Open your application and the following code to your <code>pom.xml</code> file. </p>
              <pre>
&lt;dependency&gt;
  &lt;groupId&gt;com.wavefront&lt;/groupId&gt;
  &lt;artifactId&gt;wavefront-spring-boot-starter&lt;/artifactId&gt;
  &lt;version&gt;2.0.0&lt;/version&gt;
&lt;/dependency&gt;
            </pre>
        </div>

        <div role="tabpanel" class="tab-pane" id="gradle">
        <p>Open your application and the following code to your <code>build.gradle</code> file. </p>
          <pre>
dependencies {
...
implementation 'org.springframework.cloud:spring-cloud-starter-sleuth:2.2.2.RELEASE'
}
        </pre>
        </div>
      </div>
2. Restart the application and navigate to [http://localhost:8080](http://localhost:8080/).
3. Add data by clicking on the pet clinic user interface.
    For example: 
    1. Let's add an Owner and a Pet via the User Interface.
    2. Click **ERROR** to trigger errors.
4. Click the one-time use link to access the Wavefront Service dashboard and view data.
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

<iframe width="560" height="315" src="https://www.youtube.com/embed/bHo1f5p-LsU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
