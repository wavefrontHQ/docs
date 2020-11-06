---
title: Configure External Services
keywords: data, distributed tracing, OpenTelemetry, opentracing, aws, java
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_external_services.html
summary: Configure your application to show external services or applications
---

Wavefront can identify Java AWS services and Java databases in the [application map view](tracing_ui_overview.html#application-map). You can configure your OpenTracing, OpenTelemetry, or Spring Cloud Sleuth application to identify out-of-the-box external services or applications that your service communicates.

## Configure Out-of-the-Box AWS and Database Services

Let's take a look at span tags, SDKs, and libraries that are required if you want to see the AWS and Java database services on the application map view.

### External AWS Services for Java Applications

To make Wavefront identify the AWS services:

1. Configure your application to use the [OpenTracing Java AWS SDK](https://github.com/opentracing-contrib/java-aws-sdk), OpenTelemetry, or Spring Cloud Sleuth.
1. Configure your application to use one or more AWS services. 
1. Instrument your Java application using the [Wavefront OpenTracing Java SDK](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-java) or the [Wavefront Java Tracing Agent](https://github.com/wavefrontHQ/wavefront-opentracing-bundle-java).
1. [Prepare to send data to Wavefront](tracing_instrumenting_frameworks.html#step-1-prepare-to-send-data-to-wavefront) using the Wavefront proxy or direct ingestion.

Now, you see the AWS external node on the application map.
<br/>Example:

![Shows the application map view that has two external AWS services.](images/tracing_aws_external_nodes.png)

#### Required Span Tags

You will see AWS external services on the application map if the spans have the following tags. The values for the span tags are assigned using the Java AWS SDK.

<table style="width; 100;">
  <tr>
    <th width="20%">
      Span Tag
    </th>
    <th width="80%">
      Description
    </th>
  </tr>
  <tr>
    <td markdown="span">
      `component`
    </td>
    <td markdown="span">
     The value `java-aws-sdk` is assigned by the SDK.
     
     Example: `component=java-aws-sdk`
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `span.kind`
    </td>
    <td markdown="span">
      The value `client` is assigned by the SDK to indicate that the client (your application or service) is sending a request to an external service.
      
      Example: `span.kind=client`
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `peer.service`
    </td>
    <td markdown="span">
      The name of the AWS service that the application or service communicates with is assigned by the SDK.<br/>
      
      Example: `peer.service=AWSLambda`
    </td>
  </tr>
</table>

You can also see the above span tags on the Trace Browser for any span without errors.
<br/>Example:

![Shows the details of a trace that has the span tags component, span.kind, and peer.service.](images/tracing_external_aws_tracing_browser.png)
  
### External DB Services for Java Applications

To make Wavefront identify the database (DB) services, follow these steps: 

1. Configure your application to use a Java database, such as MySQL, Oracle, or any other database. 
1. Instrument your Java application using the [Wavefront OpenTracing Java SDK](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-java) or the [Wavefront Java Tracing Agent](https://github.com/wavefrontHQ/wavefront-opentracing-bundle-java).
1. [Prepare to send data to Wavefront](tracing_instrumenting_frameworks.html#step-1-prepare-to-send-data-to-wavefront) using the Wavefront proxy or direct ingestion.

Now, you see the database node on the application map.
<br/>Example:

![shows the application map with the external services ungrouped. You see the different names you give the database using the db.instance span tag. ](images/tracing_external_nodes_database.png)

#### Required Span Tags

You will see external database services on the application map if the spans have the following tags. The values for the span tags are assigned using the OpenTracing or OpenTelemetry library.

<table style="width; 100;">
  <tr>
    <th width="20%">
      Span Tag
    </th>
    <th width="80%">
      Description
    </th>
  </tr>
  <tr>
    <td markdown="span">
      `component`
    </td>
    <td markdown="span">
     The value `java-jdbc` is assigned by the OpenTracing or OpenTelemetry library.
     
     Example: `component=java-jdbc`
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `db.type`
    </td>
    <td markdown="span">
      The type of the database that you configure your application, such as MySQL, Oracle, is assigned by the OpenTracing or OpenTelemetry library. The value assigned here determines the component icon you see when you click on the external database service.
      
      Example: `db.type=postgresql`
      
      ![A screenshot that shows what you see when click on an external database service on the application map. There is a blue box around the component to highlight it. The components arethe icons shown after DB or the database name.](images/tracing_external_database_components.png)
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `db.instance`
    </td>
    <td markdown="span">
      The name you give your database is assigned by the OpenTracing or OpenTelemetry library. In the screenshot above, the user created a PostgreSQL database and named it stylingDB. Therefore, the OpenTracing or OpenTelemetry library assigns `stylingDB` to the `db.instance` span tag.
      
      Example: `db.instance=stylingDB`
    </td>
  </tr>
</table>

You can also see the above span tags on the Trace Browser for any span without errors.
<br/>Example:

![Shows the details of a trace that has the span tags component, db.type, and db.instance.](images/tracing_db_traces_browser.png)
