---
title: Instrumenting Your OpenTracing Java Application
keywords:
tags: [best practice]
sidebar: doc_sidebar
permalink: tracing_java_tutorial.html
summary: Configure your OpenTracing Java application to send data to Wavefront using the OpenTracing Java SDK.
---
{% include important.html content="This tutorial is work in progress!" %}
In this tutorial, you configure a sample application with the Wavefront OpenTracing Java SDK with a sample application to send data to Wavefront. Let's get started!

## Prerequisites

* Java 8 or above.
* Install the Docker platform to run the Wavefront proxy.
* Clone the sample application. 
  ```
  git clone https://github.com/wavefrontHQ/distributed-tracing-sample-apps.git
  ```
  This repository has many sample. Navigate to the dropwizard-app application using the terminal.
  ```
  cd distributed-tracing-sample-apps/Wavefront-DT/dropwizard-app/
  ```

## Instrument the Sample Applications

1. Open `dropwizard-app` in your preferred Java IDE.
1. Add the Wavefront OpenTracing SDK dependency to the `pom.xml` file and import the changes to your application:
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
        <li class="active"><a href="#proxy" data-toggle="tab">Wavefront Proxy</a></li>
        <li><a href="#direct_ingestion" data-toggle="tab">Direct Ingestion</a></li>
    </ul>
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="proxy">
              <ol>
                <li>
                  <a href="proxies_installing.html#proxy-installation">Install the Wavefront proxy</a>. For this tutorial let's install the Wavefront Proxy on Docker.
                  <pre>
docker run -d \
   -e WAVEFRONT_URL=https://&#123;your_cluster_name&#125;/api/ \
   -e WAVEFRONT_TOKEN=&#123;your_token&#125; \
   -e JAVA_HEAP_USAGE=512m \
   -e WAVEFRONT_PROXY_ARGS="--traceListenerPorts 30000 --histogramDistListenerPorts 40000" \
   -p 2878:2878 \
   -p 4242:4242 \
   -p 30000:30000 \
   -p 40000:40000 \
   wavefronthq/proxy:latest
                  </pre>
                  <p>Replace <code>&#123;your_cluster_name&#125;</code> and <code>&#123;your_token&#125;</code> with the name of your Wavefront cluster and API token. 
                  <br/><b>Note</b>: If you are not sure of your cluster name or token, open the Wavefront application UI, select <b>Browse</b> > <b>Proxies</b> > <b>Add New Proxy</b> and click the <b>Docker</b> tab. Copy the values for <code>WAVEFRONT_URL</code> and <code>WAVEFRONT_TOKEN</code>, and replace the values in the above example.</p>
                  
                </li>
                <li>
                  Open the <code>common/src/main/java/com/wfsample/common/Tracing.java</code> file and update the following:
                  <ul>
                    <li>
                      Change the <code>Tracer init(String service)</code> method to return a WavefrontTracer.
                    </li>
                    <li>
                      Assign a name for the application. This will help you identify the application in Wavefront and view the data that was sent. For this example, let's use <code>foo-beachshirts</code>. You can replace <code>foo</code> with your name too.
                    </li>
                  </ul>
                  <p>Your code looks like this:</p>
                  <pre>
public static Tracer init(String service) {
    WavefrontProxyClient.Builder wfProxyClientBuilder = new WavefrontProxyClient.
    Builder("localhost").metricsPort(2878).tracingPort(30000).distributionPort(40000);
    WavefrontSender wavefrontSender = wfProxyClientBuilder.build();
    String applicationName = "foo-beachshirts";
    ApplicationTags applicationTags = new ApplicationTags.Builder(applicationName,
      service).build();
    Reporter wfSpanReporter = new WavefrontSpanReporter.Builder().
      build(wavefrontSender);
    WavefrontTracer.Builder wfTracerBuilder = new WavefrontTracer.
      Builder(wfSpanReporter, applicationTags);
    return wfTracerBuilder.build();
}
                  </pre>
                </li>
              </ol>
        </div>

        <div role="tabpanel" class="tab-pane" id="direct_ingestion">
        <ol>
          <li>
            <a href="wavefront_api.html#generating-an-api-token">Generate a Wavefront API token</a>. 
            <br/>You need the Wavefront API token and your cluster name to configure the <code>Tracer init(String service)</code> method.
            <img src="images/tracing_SDK_tutorial_direct_ingestion.png">
          </li>
          <li>
            Open the <code>common/src/main/java/com/wfsample/common/Tracing.java</code> file and update the following:
            <ul>
              <li>
                Change the <code>Tracer init(String service)</code> method to return a WavefrontTracer.
              </li>
              <li>
                Replace <code>https://{cluster}.wavefront.com</code> with your Wavefront cluster name and <code>&lt;wf_API_token&gt;</code> with the Wavefront API token.
              </li>
              <li>
                Assign a name for the application. This will help you identify the application in Wavefront and view the data that was sent. For this example, let's use <code>foo-beachshirts</code>. You can replace <code>foo</code> with your name too.
              </li>
            </ul>
            <p>Example:</p>
            <pre>
public static Tracer init(String service) {
 WavefrontDirectIngestionClient.Builder wfDirectIngestionClientBuilder = 
         new WavefrontDirectIngestionClient.Builder(
         "https://{cluster}.wavefront.com", <wf_API_token>);
 WavefrontSender wavefrontSender = wfDirectIngestionClientBuilder.build();
 String applicationName = "foo-beachshirts";
 ApplicationTags applicationTags = new ApplicationTags.Builder(applicationName,
         service).build();
 Reporter wfSpanReporter = new WavefrontSpanReporter.Builder().
         build(wavefrontSender);
 WavefrontTracer.Builder wfTracerBuilder = new WavefrontTracer.
         Builder(wfSpanReporter, applicationTags);
 return wfTracerBuilder.build();
}
            </pre>
            </li>
        </ol>
        </div>
      </div>
      
1. Run `mvn clean install` from the root directory of the project.
1. Start the `shopping`, `styling`, and `delivery` services using the commands give below. Run them from the root directory of the project
    ```
    java -jar ./shopping/target/shopping-1.0-SNAPSHOT.jar server ./shopping/app.yaml
    java -jar ./styling/target/styling-1.0-SNAPSHOT.jar server ./styling/app.yaml
    java -jar ./delivery/target/delivery-1.0-SNAPSHOT.jar server ./delivery/app.yaml
    ```
1. Run the `./loadgen.sh` script to decide how often the services need to run in order to shop, style, and deliver a shirt. Let's run it every 5 seconds
    ```
    ./loadgen.sh 5
    ```

## View Data in Wavefront

You use the [Wavefront UI to visualize the trace data](tracing_ui_overview.html) that you collect from your instrumented application.

* **Application Map**

  Get an overview of how the applications and services are linked, focus on a specific service, and view Request, Error, and Duration (RED) metrics for each service and the edges in the application using map.
  
  Open the Wavefront application UI, click **Applications** > **Application Map** and you see something similar to the following:

* **Application Status**

  View the status of all instrumented applications, or search for a particular application by applying filters and inspect Request Error and Duration (RED) metrics to obtain a status summary for an application.
  
  Open the Wavefront application UI, click **Applications** > **Application Status** and you see something similar to the following:

* **Service Status**

  Examine the services in the application, and inspect Request Error and Duration (RED) metrics to obtain a status summary for a service.
  
* **Service dashboards**

  The default, read-only dashboard for a service lets you explore trace data sent by each service in your application. 

* **Tracing Browser**

  The Traces browser supports a streamlined task flow for examining traces. You can perform trace queries, view query results, expand traces to see their member spans, and expand individual spans to see their details, without having to navigate between pages and pop-ups.
