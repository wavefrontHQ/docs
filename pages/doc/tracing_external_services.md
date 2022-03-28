---
title: Configure External Services
keywords: data, distributed tracing, OpenTelemetry, opentracing, aws, java
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_external_services.html
summary: Configure your application to show external services or applications
---

Tanzu Observability by Wavefront can identify Java AWS services and Java databases in the [application map view](tracing_ui_overview.html#application-map). You can configure your OpenTracing, OpenTelemetry, or Spring Cloud Sleuth application to identify out-of-the-box external services or applications that your service communicates.

{% include important.html content="This document shows you how to configure external services for your application instrumented with OpenTracing. If you have instrumented your application with OpenTelemetry and want to configure external services, [contact Support](wavefront_support_feedback.html#support) for help." %}


## Configure Out-of-the-Box AWS and Database Services

Let's take a look at span tags, SDKs, and libraries that are required if you want to see the AWS and Java database services on the application map view.

### External AWS Services for Java Applications

To make Tanzu Observability identify the AWS services:

1. Configure your application to use the [OpenTracing Java AWS SDK](https://github.com/opentracing-contrib/java-aws-sdk), OpenTelemetry, or Spring Cloud Sleuth.
1. Configure your application to use one or more AWS services.
1. Instrument your Java application using the [Wavefront OpenTracing Java SDK](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-java) or the [Wavefront Java Tracing Agent](https://github.com/wavefrontHQ/wavefront-opentracing-bundle-java).
1. [Prepare to send data to Wavefront](tracing_instrumenting_frameworks.html#step-1-prepare-to-send-data-to-wavefront) using the Wavefront proxy or direct ingestion.

Now, you see the AWS external services on the application map.

Example:

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

To make Tanzu Observability identify the database (DB) services, follow these steps:

1. Configure your application to use a Java database, such as MySQL, Oracle, or any other database.
1. Instrument your Java application using the [Wavefront OpenTracing Java SDK](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-java) or the [Wavefront Java Tracing Agent](https://github.com/wavefrontHQ/wavefront-opentracing-bundle-java).
1. [Prepare to send data to Wavefront](tracing_instrumenting_frameworks.html#step-1-prepare-to-send-data-to-wavefront) using the Wavefront proxy or direct ingestion.

Now, you see the database services on the application map.

Example:

![shows the application map with the external services ungrouped. You see the different names you give the database using the db.instance span tag. ](images/tracing_external_nodes_database.png)

#### Required Span Tags

You will see external database services on the application map if the spans have the following tags. The values for the span tags are assigned using the OpenTracing, OpenTelemetry, or Spring Cloud Sleuth library.

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
     The value `java-jdbc` is assigned by the library.

     Example: `component=java-jdbc`
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `db.type`
    </td>
    <td>
      The type of the database that you configure your application, such as MySQL, Oracle, is assigned by the library. The value assigned here determines the component icon you see when you click on the external database service.

      {{site.data.alerts.note}}
      The values are not case sensitive.
      {{site.data.alerts.end}}

      Example: <code>db.type=postgresql</code><br/>

      <img src="images/tracing_external_database_components.png" alt="A screenshot that shows what you see when click on an external database service on the application map. There is a blue box around the component to highlight it. The components are the icons shown after DB or the database name." />
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `db.instance`
    </td>
    <td markdown="span">
      The name you give your database is assigned by the library. In the screenshot above, the user created a PostgreSQL database and named it stylingDB. Therefore, the library assigns `stylingDB` to the `db.instance` span tag.

      Example: `db.instance=stylingDB`
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
</table>

You can also see the above span tags on the Trace Browser for any span without errors.
<br/>Example:

![Shows the details of a trace that has the span tags component, db.type, and db.instance.](images/tracing_db_traces_browser.png)

## Configure Custom External Services

In addition to the out-of-the-box Java AWS and database service, Tanzu Observability can identify your external applications or service. For example, you can see how your application communicates with an Azure service on the application map. We can identify custom external service only if the **required span tags** are defined. You can also add **optional span tags**.

### Required Span Tags

<table style="width: 100;">
  <tr>
    <th width="25%">
      Span Tag
    </th>
    <th width="75%">
      Description
    </th>
  </tr>
  <tr>
    <td markdown="span">
      `_outboundExternalService`
    </td>
    <td markdown="span">
      Identifies the direction of the tracing traffic when a service in your application sends requests to an external service.
      <br/>For example, the `delivery` service sends requests to an external Redis database. Tanzu Observability now has spans that show this data. Add `_outboundExternalService` to the existing spans to show that the `delivery` service is sending requests to the external Redis service.
      <br/>![Shows the direction of the arrow from the delivery service to the Redis external database.](images/tracing_custom_external_services_inbound_service.png)
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `_inboundExternalService`
    </td>
    <td markdown="span">
      Identifies the direction of the tracing traffic when an external service sends requests to a service in your application.
      <br/>For example, an external load balancer sends requests to the `shopping` service. Tanzu Observability now has spans that show the `shopping` service receiving requests. Add `_inboundExternalService` to the existing spans to show that the external load balancer is sending requests to the `shopping` service.
      <br/>![Shows the direction of the arrow from the external load balancer service to the shopping service.](images/tracing_custom_external_services_outbound_service.png)
    </td>
  </tr>
</table>

{% include note.html content=" If your external service has both the `_outboundExternalService` and `_inboundExternalService` span tags, we use only the `_outboundExternalService` span tag to show data on the application map." %}

### Optional Span Tags

<table style="width: 100;">
  <tr>
    <th width="25%">
      Span Tag
    </th>
    <th width="75%">
      Description
    </th>
  </tr>
  <tr>
    <td markdown="span">
      `_externalApplication`
    </td>
    <td markdown="span">
      Defines the name of the application if the external service is on a different application. If you don't assign a value, the value defaults to the application that emitted the span.
      <br/>For example, if the `shopping` service on the `beachshirts` application receives requests from a load balancer in the `Proxy` application, you need to define `Proxy` as the value for this tag. The application map looks as follows:
      <br/>![Show the shopping service of the beachshirts application receiving requests from a load balancer of the proxy applcaition.](images/tracing_custom_external_services_external_applcaiton.png)
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `_externalHost`
    </td>
    <td markdown="span">
      Use this span tag if the external service is on a different host or container from the service it sends requests to/receives requests from. If you don't define a value, the value defaults to `externalHost`.
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `_externalComponent`
    </td>
    <td>
      Use this span tag to add a new component. If you don't define a value, the value defaults to <code>externalComponent</code>.
      <br/>For example, click a custom external service on the application map and hover over the icons. The name you see is derived from the value you assign this tag.
      <br/><img src="images/tracing_custom_external_services_external_component.png" alt="Shows the nginx icon when you click on the external load balancer"/>
      {{site.data.alerts.note}}
        A default icon is assigned to customized components. If you want to add your icon, contact <a href="mailto:support@wavefront.com">support@wavefront.com</a>.
      {{site.data.alerts.end}}
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `_externalCategory`
    </td>
    <td>
      Use this span tag to create a new category. If you don't define a value, the value defaults to <code>externalCategory</code>.
      {{site.data.alerts.note}}
        A default icon is assigned to customized categories. If you want to add your icon, contact <a href="mailto:support@wavefront.com">support@wavefront.com</a>.
      {{site.data.alerts.end}}
    </td>
  </tr>
</table>

**Example**

![The application map with the custom Redis database, Nginx load balancer, and an out-of-the-box Amazon SNS service.](images/tracing_custom_external_services_final.png)
