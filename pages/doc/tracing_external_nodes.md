---
title: Configure External Nodes
keywords: data, distributed tracing, OpenTelemetry, opentracing, aws, java
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_external_nodes.html
summary: Configure your application to show external services or applications
---

Wavefront has out of the box support to identify Java AWS services and Java databases on the [application map view](tracing_ui_overview.html#application-map). You can configure your OpenTracing or OpenTelemetry application to identify other external services or applications your service communicates it, using the customized approach.

## Configure Out-of-the-Box AWS and Database Services

Let's take a look at span tags, SDKs, and libraries your application needs to have to see the AWS and Java database nodes on the application map view.

### External AWS Services for Java Applications

Follow the steps given below for Wavefront to identify the AWS nodes:

1. Configure your application to use the [OpenTracing Java AWS SDK](https://github.com/opentracing-contrib/java-aws-sdk).
1. Configure your application to use an AWS service/s. 
1. [Prepare to send data to Wavefront](tracing_instrumenting_frameworks.html#step-1-prepare-to-send-data-to-wavefront) using the Wavefront proxy or direct ingestion.
1. Instrument your java application using the [Wavefront OpenTracing Java SDK](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-java) or the [Wavefront Java Tracing Agent](https://github.com/wavefrontHQ/wavefront-opentracing-bundle-java).

Now, you see the AWS external node on the application map.
Example:
![Shows the application map view that has two external AWS nodes.](images/tracing_aws_external_nodes.png)

Once the data is sent to Wavefront and if the spans have the tags mentioned below, you see the AWS external nodes on the application map. The values for the span tags are assigned using the OpenTracing Java AWS SDK.

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
      The value `client` is assigned to indicate that the client (your application or service) is sending a request to an external service.
      
      Example: `span.kind=client`
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `peer.service`
    </td>
    <td markdown="span">
      The name of the AWS service that the application or service communicates with is assigned.<br/>
      Wavefront has displays specific icons for AWS Lambda, Amazon SQS, Amazon SNS services. If you are using other AWS services, the default AWS logo is used.
      
      Example: `peer.service=AWSLambda`
    </td>
  </tr>
</table>

You can see the above span tags on the Trace Browser too. It has to be a span without errors.
Example:
![Shows the details of a trace that has the span tags component, span.kind, and peer.service.](images/tracing_external_aws_tracing_browser.png)
  
### External DB Services for Java Applications

Follow the steps given below for Wavefront to identify the database (DB) nodes:

1. Configure your application to use a Java database, such as MySQL, Oracle, or any other database. 
1. [Prepare to send data to Wavefront](tracing_instrumenting_frameworks.html#step-1-prepare-to-send-data-to-wavefront) using the Wavefront proxy or direct ingestion.
1. Instrument your java application using the [Wavefront OpenTracing Java SDK](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-java) or the [Wavefront Java Tracing Agent](https://github.com/wavefrontHQ/wavefront-opentracing-bundle-java).

Now, you see the database node on the application map.

Once the data is sent to Wavefront and if the spans have the tags mentioned below, you see the external database nodes on the application map. The values for the span tags are assigned using the OpenTracing or OpenTelemetry library.

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
      The database type, such as MySQL, Oracle, is assigned as the value.
      
      Example: `db.type=mysql `
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `db.instance`
    </td>
    <td markdown="span">
      The name you give your database is assigned as the value. For example, if you named your database `stylingDB`, that will be the value assigned to `db.instance`.
      
      Example: `db.instance=stylingDB`
    </td>
  </tr>
</table>

You can see the above span tags on the Trace Browser too. It has to be a span without errors.
Example:
![Shows the details of a trace that has the span tags component, db.type, and db.instance.](images/tracing_db_traces_browser.png)
