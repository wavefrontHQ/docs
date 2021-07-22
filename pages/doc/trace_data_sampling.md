---
title: Trace Sampling
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: trace_data_sampling.html
summary: Learn about sampling for Wavefront trace data.
---

A cloud-scale web application generates a very large number of [traces](tracing_basics.html#wavefront-trace-data). Wavefront supports sampling to reduce the volume of stored trace data. 

## How It Works

Let's look at the following scenarios to understand how sampling works in Wavefront:

### I want to reduce cost by having Wavefront optimize which data are retained.

**Answer: [Intelligent Sampling](#wavefront-intelligent-sampling)**
    
Not all the trace data that you send to Wavefront is useful.  Therefore, Wavefront automatically discards redundant traces or traces that don't add value and only keeps traces that are informative. This process is known as Intelligent Sampling.

However, when intelligent sampling is on, you might not see some traces when you search for them on the traces browser. If you want to have specific trace data in Wavefront and don't want the traces to be discarded, use sampling policies.
    
![Shows the data flow only with intelligent sampling in plage.](images/tracing_sampling_only_intelligent_sampling.png)
  
### I want to decide which traces I want to keep in Wavefront using policy-based control.

**Answer: [Sampling Policies](#sampling-policies)**
    
To let Wavefront know that you want to keep specific traces, create a trace sampling policy. With a sampling policy in place, Wavefront does not perform intelligent sampling on the data.

Creating a sampling policy affects your cost as you store more data within Wavefront. Therefore, only a <a href="authorization.html#who-is-the-super-admin-user">Super Admin user</a> or users with <a href="permissions_overview.html">Applications permissions</a> can create sampling policies.

To see the number of spans stored per second after a sampling policy is created, see <a href="#track-volume-of-trace-data-stored-in-wavefront">Track Volume of Trace Data Stored in Wavefront</a>
    
The following rules apply when a sampling policy is in place:
    
* **Sampling policy rate is greater than the explicit sampling policy rate**
    <br/>If the sampling policy rate is greater than the explicit sampling policy rate, the sampling policy rate takes precedence. 
    <br/><br/>Example: The sampling policy rate is 80%, and the explicit sampling rate is 30%. When you send 10 spans to wavefront, you see 8 spans on the traces browser.
    
    ![The diagram shows the scenario explained in the example above.](images/tracing_sampling_sampling_policy_greater.png)
    
* **Explicit sampling rate is greater than the sampling policy rate** 
    <br/>If the explicit sampling rate is greater than the sampling policy rate, preference is given to the sampling policy rate,  and explicit sampling together with intelligent sampling makes up the difference. 
    <br/><br/>Example: The sampling policy rate is 30%, and the explicit sampling rate is 50%. When you send 10 spans to Wavefront, sampling policy sends 3 spans to Wavefront, and explicit sampling and intelligent sampling together make up the difference to send 2 spans to Wavefront. Therefore, you see 5 spans on the traces browser, which is 50% of the spans.
    
    ![The diagram shows the scenario explained in the example above.](images/tracing_sampling_explicit_sampling_greater.png)
    
### I want control over which traces are sent to Wavefront from my application.

**Answer: [Explicit Sampling](#explicit-sampling-strategies)**
    
Sending all the traces of an application into Wavefront can be too expensive. Therefore, you can have Explicit Sampling Strategies and control the amount of data you want your application to send to Wavefront right from the start. This way you control the traces sent to Wavefront and this trace data is never stored in Wavefront.<br/>
* If you are sending data via the proxy, implement [explicit sampling at the Wavefront proxy level](#setting-up-explicit-sampling-through-the-proxy).
* If you are sending data via direct ingestion, [contact our tech support team](wavefront_support_feedback.html#support) to set up the sampling rate.

{% include note.html content="Once an explicit sampling strategy is in place, you won't see certain trace data in Wavefront as they are discarded before they are stored in Wavefront. " %}



<!-- <table style="width: 100%;">
  <thead>
    <tr>
      <th width="40%">
        Scenario
      </th>
      <th width="60%">
        Description
      </th>
    </tr>
  </thead>
  <tr>
    <td markdown=span>
      I want to reduce cost by having Wavefront optimize which data are retained. 
    </td>
    <td markdown=span>
      [**Intelligent Sampling**](#wavefront-intelligent-sampling)<br/>
      Not all the trace data that you send to Wavefront is useful.  Therefore, Wavefront automatically discards redundant traces or traces that don't add value and only keeps traces that are informative. This process is known as [Intelligent Sampling](#wavefront-intelligent-sampling).
      
      <br/>However, when intelligent sampling is on, you might not see some traces when you search for them on the traces browser. If you want to have specific trace data in Wavefront and don't want the traces to be discarded, use sampling policies.
    </td>
  </tr>
  <tr>
    <td markdown=span>
      I want to decide which traces I want to keep in Wavefront using policy-based control. 
    </td>
    <td>
      <a href="#sampling-policies"><b>Sampling Policies</b></a><br/>
      To let Wavefront know that you want to keep specific traces, create a trace sampling policy. With a sampling policy in place, Wavefront does not perform intelligent sampling on the data.
      
      <br/><br/>Creating a sampling policy affects your cost as you store more data within Wavefront. Therefore, only a <a href="authorization.html#who-is-the-super-admin-user">Super Admin user</a> or users with <a href="permissions_overview.html">Applications permissions</a> can create sampling policies.
      
      <br/><br/>To see the number of spans stored per second after a sampling policy is created, see <a href="#track-volume-of-trace-data-stored-in-wavefront">Track Volume of Trace Data Stored in Wavefront</a>
      
      {% include tip.html content="If you already have an explicit sampling strategy in place and the data you retain through the explicit sampling strategy is greater than the sampling policy you created, Wavefront gives prominence to the explicit sampling strategy. " %}
      
    </td>
  </tr>
  <tr>
  <td markdown=span>
    I want control over which traces are sent to Wavefront from my application.
  </td>
  <td>
    <a href="#explicit-sampling-strategies"><b>Explicit Sampling</b></a><br/>
    Sending all the traces of an application into Wavefront can be too expensive. Therefore, you can have Explicit Sampling Strategies and control the amount of data you want your application to send to Wavefront right from the start. This way you control the traces sent to Wavefront and this trace data is never stored in Wavefront.<br/>
    <li markdown="span">If you are sending data via the proxy, implement [explicit sampling at the Wavefront proxy level](#setting-up-explicit-sampling-through-the-proxy).</li>
    <li markdown="span">If you are sending data via direct ingestion, [contact our tech support team](wavefront_support_feedback.html#support) to set up the sampling rate.</li>
    
    {% include note.html content="Once an explicit sampling strategy is in place, you won't see certain trace data in Wavefront as they are discarded before they are stored in Wavefront. " %}
  </td>
  </tr>

</table>
-->

## Benefits of Sampling Data

Sampling has the following advantages:  
* Reduce the amount of storage required for trace data, and lowering your monthly costs.
* Filter out redundant traces so you can see what's important.
* Limit the performance impact on network bandwidth and application response times.


## Wavefront Intelligent Sampling

Wavefront automatically performs intelligent sampling to reduce the volume of ingested traces. The goals of intelligent sampling are to retain traces that are likely to be informative, and to discard traces that are redundant or otherwise not worth inspecting. 

Intelligent sampling gives preference to: 

* Traces that are abnormally long, as compared to other traces for the same endpoint. 
* Traces that contain at least one individual span that is abnormally long, as compared to other spans for the same operation.
* Traces that contain at least one span in which an error occurred.

Wavefront uses proprietary algorithms to decide which traces to retain (sample) and which traces to discard (not sample). When analyzing whether a trace is worth retaining, Wavefront compares the trace's characteristics to a historical context that is composed of similar traces. The historical context is based on the [RED metrics](trace_data_details.html#trace-sampling-and-derived-red-metrics) that Wavefront derives from the entire set of trace data that your application has emitted before any sampling occurs. This enables Wavefront to determine whether an analyzed trace is a true outlier.

Intelligent sampling applies to entire traces after Wavefront receives them. If you have set up an [explicit sampling strategy](#explicit-sampling-strategies), then the output of your explicit sampling strategy is the input to intelligent sampling. 

Intelligent sampling is performed by the Wavefront service itself, not by the proxy or by an instrumented application. Consequently, intelligent sampling does not place any additional processing burden on your proxies or applications. Intelligent sampling does not add to your total cost of operation (TCO). If you already use one or more proxies to ingest your time-series data, you can start ingesting and sampling trace data without adding more hardware to support more proxies. 

{% include note.html content="If you are troubleshooting and need specific spans in wavefront, annotate spans with `debug=true`. Make sure to remove the annotation once you are done troubleshooting and don't overuse the annotation as Wavefront intelligent sampling gives preference to unique spans. For details on adding span tags via the Wavefront proxy, see [Proxy Preprocessor Rules](proxies_preprocessor_rules.html#spanaddtag-and-spanaddtagifnotexists)." %}

You can [monitor](wavefront_monitoring.html#using-internal-metrics-to-optimize-performance) your span storage by checking the following internal metrics. If you have set up sampling, these metrics report the number of spans after sampling takes place.
<table width="100%">
<colgroup>
<col width="50%"/>
<col width="50%"/>
</colgroup>
<thead>
<tr><th>Metric</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">`~collector.tracing.spans.reported`</td>
<td markdown="span">Number of spans per second being sent via a Wavefront proxy.</td>
</tr>
<tr>
<td markdown="span">`~collector.direct-ingestion.tracing.spans.reported`</td>
<td markdown="span">Number of spans per second being sent directly to the Wavefront service (direct ingestion).</td>
</tr>
</tbody>
</table>

## Sampling Policies

If you can’t find traces in Wavefront because Intelligent Sampling filtered them out, create a sampling policy to let Wavefront know that you want to keep specific traces in Wavefront. Creating a sampling policy affects your costs because you store more data within Wavefront. See the [Service Description](https://www.vmware.com/download/eula/wavefront-terms-of-service.html) for cost details.

See [Managing Sampling Policies](trace_sampling_policies.html) for details.

{% include note.html content="Only a [Super Admin user](authorization.html#who-is-the-super-admin-user) or users with [Applications permissions](permissions_overview.html) can create sampling policies." %}

### Track the Volume of Trace Data Stored in Wavefront

A sampling policy affects your costs by increasing the volume of data sent to Wavefront. To see the number of traces you store in Wavefront with the sampling policies:

1. Click **Dashboards** > **All Dashboards**.
1. Search for the **Wavefront Service and Proxy Data** dashboard and click it to navigate to the dashboard.
1. On the dashboard, search for the **Spans Sampled by Policies Per Second** chart under **Proxies overview**.

You see the number of spans stored per second.

[Add mage of the graph as an example]


## Explicit Sampling Strategies

An explicit sampling strategy is a mechanism for selecting which traces to forward to Wavefront. Wavefront supports the following explicit sampling strategies: 

### Explicit Sampling Strategy Overview

<table>
<colgroup>
<col width="25%"/>
<col width="75%"/>
</colgroup>
<thead>
<tr><th>Sampling Strategy</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">Rate-based sampling</td>
<td markdown="span">Sends N percent of the generated traces to Wavefront. Sometimes called probabilistic sampling. For example, a sampling rate of 10% causes 1 out of 10 traces to be sent and ingested.</td>
</tr>
<tr>
<td markdown="span">Duration-based sampling</td>
<td markdown="span"> Sends spans to Wavefront only if they are longer than N milliseconds. For example, a sampling duration of 45 sends spans to Wavefront only if they are longer than 45 milliseconds.</td>
</tr>
</tbody>
</table>

{% include note.html content="You can query and visualize only the traces and spans that Wavefront has ingested. If you set up an explicit sampling strategy that severely reduces the volume of ingested trace data, you might end up with queries that produce no results." %}

### Ways to Set Up Explicit Sampling Strategies 

You can set up an explicit sampling strategy using either of the following methods:

* [Configure sampling on a Wavefront proxy](#setting-up-explicit-sampling-through-the-proxy).  
* [Configure sampling in your instrumented application code](#setting-up-explicit-sampling-in-your-code).  

Choose the [Wavefront proxy](proxies_installing.html) for sampling when you want to:
* Use a single sampling strategy to coordinate the sampling for all applications that use the same proxy. 
* Configure sampling with minimal effort.
* Improve the likelihood of ingesting complete traces. 

Choose sampling in your instrumented code when you want to:
* Reduce the performance impact of span reporting on your application. 
* Use [direct ingestion](direct_ingestion.html) (no proxy).
* Configure sampling on a per-process basis, for example, when you expect spans from the services in different processes to have different characteristics.

### Complete vs. Partial Traces

An ingested trace can be complete (a trace ingested with all of its member spans) or partial (a trace that is missing one or more spans). The completeness of the traces in a sample depends in part on the sampling strategy:

* Rate-based sampling attempts to send complete traces. That is, the sampler selects the specified percentage of trace IDs, and then sends all of the spans that belong to each selected trace. 

* Duration-based sampling considers only individual spans. That is, the sampler selects all spans of an appropriate duration, regardless of whether they form complete traces.

Partial traces can also occur in the following situations:
* If a span contains an error. Each such span is sent individually, without the other spans in the same trace.
* If a trace has spans from multiple services, and you set up different sampling rates for those services. 

### Result of Combining Explicit Sampling Strategies

You can combine rate-based sampling and duration-based sampling in the same service. Doing so causes Wavefront to ingest the union of the spans that are selected by each sampler.

For example, suppose you set the sampling rate to 20% and the sampling duration to 45ms for the same service. This causes Wavefront to receive:
* 20% of the traces generated by that service, regardless of the length of their spans.
* Any additional spans outside of that 20% that are longer than 45ms. 

As a result, the ingested sample will contain somewhat more than 20% of the generated traces, with some spans that are shorter than 45ms.

{% include note.html content="A span that contains an error is always sent to Wavefront, the regardless of the span's duration or whether it falls in a specified sampling percentage. " %}

## Setting Up Explicit Sampling Through the Proxy

You can set up explicit sampling strategies through a [Wavefront proxy](proxies.html) by adding the sampling properties to the proxy's configuration file.
{% include note.html content="Explicit sampling through a proxy is supported in Wavefront proxy version 4.34 and above. If you have an older version, make sure to [upgrade your proxy to the latest version](proxies_installing.html#upgrade-a-proxy)."  %}

1. On the proxy host, open the proxy configuration file `wavefront.conf` for editing. The [path to the file](proxies_configuring.html#paths) depends on the host. 
2. Add the [traceSamplingRate](proxies_configuring.html#tracing-proxy-properties-and-examples) property, the [traceSamplingDuration](proxies_configuring.html#tracing-proxy-properties-and-examples) property, or both to the `wavefront.conf` file. In the following example, the `traceSamplingRate` property sends 10% of the trace to Wavefront and the `traceSamplingDuration` property sets the minimum sampling duration to 45 milliseconds: 
    ```
    # Number from 0.0 to 1.0
    traceSamplingRate=.1
    ...
    traceSamplingDuration=45
    ```
    {% include important.html content="If you have more than one proxy, each proxy must have the same value for the `traceSamplingRate` property. If different proxies send different percentages of spans to Wavefront, you get incomplete traces."%}
3. Save the `wavefront.conf` file. 
4. [Start the proxy](proxies_installing.html#starting-and-stopping-a-proxy).

## Setting Up Explicit Sampling in Your Code

{% include warning.html content="OpenTracing and OpenCensus have merged to form OpenTelemetry. Therefore, this option will be deprecated in the future." %}

You can set up explicit sampling strategies in application code that is built with one of the following [Wavefront observability SDKs](wavefront_sdks.html):

* The Wavefront OpenTracing SDK
* Any Wavefront observability SDK that depends on the Wavefront OpenTracing SDK

You set up a sampling strategy by configuring a Wavefront Tracer with a Sampler object. You create one Sampler for each sampling strategy. See the README file for the Wavefront observability SDK you are using.  


<!---
<table>
<colgroup>
<col width="18%"/>
<col width="50%"/>
<col width="32%"/>
</colgroup>
<thead>
<tr><th>Menu</th><th>Description</th><th>Example</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span"> </td>
<td markdown="span"> </td>
<td markdown="span"> </td>
</tr>
</tbody>
</table>


--->
