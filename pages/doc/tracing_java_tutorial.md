---
title: Instrumenting Your OpenTracing Java Application
keywords:
tags: [best practice]
sidebar: doc_sidebar
permalink: tracing_java_tutorial.html
summary: Configure your OpenTracing Java application to send data to Wavefront using the OpenTracing Java SDK.
---
In this tutorial, you configure a sample application with the Wavefront OpenTracing Java SDK with a sample application to send data to Wavefront. Let's get started!

## Prerequisites

* Java 8 or above.
* Clone the sample application. 
  ```
  git clone https://github.com/wavefrontHQ/distributed-tracing-sample-apps.git
  ```
  This repository has many sample. Navigate to the dropwizard-app application using the terminal.
  ```
  cd distributed-tracing-sample-apps/Wavefront-DT/dropwizard-app/
  ```

### Instrument the Sample Applications

1. Open `dropwizard-app` in your preferred Java IDE.
1. Add the Wavefront OpenTracing SDK dependency to the `pom.xml` file:
    ```
    <dependencies>
      <dependency>
        <groupId>com.wavefront</groupId>
        <artifactId>wavefront-opentracing-sdk-java</artifactId>
        <version>LATEST</version>
      </dependency>
    </dependencies>
    ```
1. Open the `common/src/main/java/com/wfsample/common/Tracing.java` file and make sure it is updated and have the following dependencies.
    ```
    import com.wavefront.opentracing.WavefrontTracer;
    import com.wavefront.opentracing.reporting.Reporter;
    import com.wavefront.opentracing.reporting.WavefrontSpanReporter;
    import com.wavefront.sdk.common.WavefrontSender;
    import com.wavefront.sdk.common.application.ApplicationTags;
    import com.wavefront.sdk.direct.ingestion.WavefrontDirectIngestionClient;
    import com.wavefront.sdk.proxy.WavefrontProxyClient;
    ```
1. Configure the application to send data to Wavefront via the Wavefront proxy or direct ingestion.
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
