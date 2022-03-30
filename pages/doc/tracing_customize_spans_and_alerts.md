---
title: Customize Span Tags for RED Metrics
keywords: data, distributed tracing, red metrics, customize
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_customize_spans_and_alerts.html
summary: Customize span level tags and alerts for RED metrics
---

Tanzu Observablity by Wavefront derives RED metrics for spans that have the `application`, `service`, `cluster`, `shard`, `component`, or `operationName` span tags by default. See [Indexed and Unindexed Span Tags](trace_data_details.html#indexed-and-unindexed-span-tags) for details. If you want to filter RED metrics data using a span tag that is not a default span tag, you need to propagate it as a custom span tag to the RED metrics.

The following custom span tags are supported by default.

<table>
<colgroup>
<col width="30"/>
<col width="70%"/>
</colgroup>
<thead>
<tr><th>Custom span tag</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">`span.kind`</td>
<td markdown="span">Filter spans based on the span type. The default value is `none`.
<br/>Example: `client` for a client-side span and `server` for a server-side span.</td>
</tr>
<tr>
<td markdown="span">`http.status_code`</td>
<td markdown="span">Filter spans based on the error code. <br/>Example: `404` or `500`</td>
</tr>
</tbody>
</table>

Follow the steps given below to propagate custom span tags when sending data from your application. Once the data is ingested, you can use queries to create custom dashboards that help you filter and view the information you need. Let's look at a sample scenario that adds a custom span tag where you can compare the data in the production and staging environments.

1. Create a custom span-level tag. Assume you have a span that has the `env=` span tag.

    {{site.data.alerts.note}}
    <p>When adding custom span-level tags, make sure that it is of low cardinality:</p>
      <ul>
        <li>
          Do not have more than 25 custom span tags.
        </li>
        <li>
          Do not have more than 100 values assigned to a span tag.
        </li>
      </ul>
      A tag with low cardinality has comparatively few unique values that are assigned to it.

    {{site.data.alerts.end}}

    <ul id="profileTabs" class="nav nav-tabs">
        <li class="active"><a href="#tracingApplication" data-toggle="tab">OpenTracing</a></li>
        <li><a href="#openTelemetry" data-toggle="tab">OpenTelemetry</a></li>
        <li><a href="#jaeger" data-toggle="tab">Jaeger</a></li>
        <li><a href="#zipkin" data-toggle="tab">Zipkin</a></li>
        <li><a href="#springboot" data-toggle="tab">Spring Boot</a></li>
        <li><a href="#customProxy" data-toggle="tab">Custom Proxy Port</a></li>
    </ul>
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="tracingApplication">
            <p>The <a href="tracing_instrumenting_frameworks.html#step-2-get-data-flowing-into-wavefront">Tracing SDK</a> provides a <code>WavefrontTracer</code> to create spans and send them to Wavefront. It also automatically generates and reports RED metrics from your spans. Add the following configuration when building the <code>WavefrontTracer</code>.</p>
            <p>Example:</p>
            <pre>
wfTracerBuilder.redMetricsCustomTagKeys(new HashSet&lt;String&gt;(Arrays.asList("env")));</pre>
            <p>See the specific GitHub repository for language-specific examples on how to configure your application with the Wavefront OpenTracing SDK.</p>
        </div>

        <div role="tabpanel" class="tab-pane" id="openTelemetry">
            <p>OpenTelemetry is still at its early stage. Contact <a href="wavefront_support_feedback.html#support">Wavefront Technical Support</a> for help.</p>
        </div>

        <div role="tabpanel" class="tab-pane" id="jaeger">
        <p>If you are using Jaeger, you send data to a <a href="proxies.html">Wavefront proxy</a>. Add the configuration shown below to the <code>&lt;wavefront_config_path&gt;/wavefront.conf</code> file. See <a href="proxies_configuring.html#paths">Paths</a> to find out where the file is saved.</p>
            <pre>
traceDerivedCustomTagKeys=env
            </pre>
        </div>

        <div role="tabpanel" class="tab-pane" id="zipkin">
            <p>If you are using Zipkin, you send data to Wavefront using <a href="proxies.html">Wavefront proxy</a>. Add the configuration shown below to the <code>&lt;wavefront_config_path&gt;/wavefront.conf</code> file. See <a href="proxies_configuring.html#paths">Paths</a> to find out where the file is saved.</p>
            <pre>
traceDerivedCustomTagKeys=env
            </pre>
        </div>

        <div role="tabpanel" class="tab-pane" id="springboot">
        <p> Add the configuration shown below to your application's <code>application.properties</code> file.</p>
            <pre>
wavefront.tracing.red-metrics-custom-tag-keys=env
            </pre>

        </div>
        <div role="tabpanel" class="tab-pane" id="customProxy">
        <p> Add the configuration shown below to the <code>&lt;wavefront_config_path&gt;/wavefront.conf</code> file. See <a href="proxies_configuring.html#paths">Paths</a> to find out where the file is saved.</p>
            <pre>
traceDerivedCustomTagKeys=env
            </pre>
        </div>
      </div>
1. Save the changes, restart the application, and start sending data.
1. Once the data is ingested, create a chart that compares the data sent by each environment. Here's an example:
    ![create a chart with custom span tags](/images/tracing_custom_span_tags.png)
    {% include note.html content="You won't see this data on the default service dashboard. If you want to customize the queries on the default service dashboard to see data from the custom span tags, you need to [clone and edit the dashboard](ui_dashboards.html#edit-or-clone-a-dashboard)." %}
