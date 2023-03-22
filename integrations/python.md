---
title: Python Integration
tags: [integrations list]
permalink: python.html
summary: Learn about the Python Integration.
---
# Python Integration

This Wavefront Python integration explains how to send Python application metrics to Wavefront.

Wavefront provides several Python SDKs and a REST API client for different purposes on Github:

- **[wavefront-sdk-python](https://github.com/wavefrontHQ/wavefront-sdk-python)**: Core SDK for sending different telemetry data to Wavefront. Data include metrics, delta counters, distributions, and spans.
- **[wavefront-pyformance](https://github.com/wavefrontHQ/wavefront-pyformance)**: Provides reporters and constructs such as counters, meters and histograms to periodically report application metrics and distributions to Wavefront.
- **[wavefront-lambda-python](https://github.com/wavefrontHQ/wavefront-lambda-python)**: Wavefront Python wrapper for AWS Lambda to enable reporting of standard lambda metrics and custom app metrics directly to Wavefront.
- **[wavefront-opentracing-sdk-python](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-python)**: Wavefront OpenTracing Python SDK. See [our tracing documentation](https://docs.wavefront.com/tracing_basics.html) for background.
- **[python-client](https://github.com/wavefrontHQ/python-client)**: The Wavefront REST API client enables you to interact with Wavefront servers using the standard REST API. You can use this client to automate commonly executed operations such as automatically tagging sources.

In the Setup tab, the integration includes sample code based on `wavefront-pyformance` for sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html) or using [direct ingestion](https://docs.wavefront.com/direct_ingestion.html).

In the Dashboard tab, you can view the dashboard around Python runtime metrics that can be collected using  wavefront-pyformance. You can also send your own metrics and create your own dashboards.

Here's a preview of some charts in Python Runtime dashboard:

{% include image.md src="images/python_runtime_dashboard.png" width="80" %}

## Python Setup

The Wavefront plugin for [PyFormance](https://github.com/omergertel/pyformance) adds [Wavefront reporters](https://github.com/wavefrontHQ/wavefront-pyformance) and an  abstraction that supports tagging at the reporter level. The reporters support sending metrics to Wavefront using the [Wavefront proxy](https://docs.wavefront.com/proxies.html) or using [direct ingestion](https://docs.wavefront.com/direct_ingestion.html).

### Install wavefront_pyformance
{% raw %}
```
pip install wavefront_pyformance
```
{% endraw %}

### Option 1. Create a Wavefront Proxy Reporter and Register Metrics

Follow these steps for sending metrics to a Wavefront proxy. See Option 2 for sending metrics directly to a Wavefront service.



#### Step 1. Set up Wavefront Proxy
If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network and reachable from your Python application, install a proxy. You configure the Wavefront proxy hostname and port (by default 2878) when you invoke the reporter.

#### Step 2. Create the Wavefront Proxy Reporter and Register Metrics
Tags passed to the proxy reporter are applied to every metric.

{% raw %}
```
from wavefront_pyformance import tagged_registry
from wavefront_pyformance import wavefront_reporter

reg = tagged_registry.TaggedRegistry()
c1 = reg.counter("numbers")
c1.inc()

host = "<wavefront proxy hostname/IP>"

# report metrics to a Wavefront proxy every 10s
wf_proxy_reporter = wavefront_reporter.WavefrontProxyReporter(
    host=host, port=2878, registry=reg,
    source='wavefront-pyformance-example',
    tags={'key1': 'val1', 'key2': 'val2'},
    prefix='python.proxy.',
    reporting_interval=10)
wf_proxy_reporter.report_now()
```
{% endraw %}

### Option 2. Create a Wavefront Direct Reporter and Register Metrics

You can send metrics directly to a Wavefront service, discussed next. Option 1 above explains how to send metrics to a Wavefront proxy.

Tags passed to the direct reporter are applied to every metric.
{% raw %}
```
from wavefront_pyformance import tagged_registry
from wavefront_pyformance import wavefront_reporter

reg = tagged_registry.TaggedRegistry()
c1 = reg.counter("numbers")
c1.inc()

server = "https://YOUR_CLUSTER.wavefront.com"
token = "YOUR_API_TOKEN"

# Direct Reporter with tags reporting directly to a Wavefront service every 10s
wf_direct_reporter = wavefront_reporter.WavefrontDirectReporter(
    server=server, token=token, registry=reg,
    source='wavefront-pyformance-exmaple',
    tags={'key1': 'val1', 'key2': 'val2'},
    prefix='python.direct.',
    reporting_interval=10)
wf_direct_reporter.report_now()
```
{% endraw %}

### Python Runtime Metrics
To enable Python runtime metrics reporting, modify the reporter created above to set the `enable_runtime_metrics` flag to **True**:
{% raw %}
```
wf_proxy_reporter = wavefront_reporter.WavefrontProxyReporter(
    host=host, port=2878, registry=reg,
    source='wavefront-pyformance-example',
    tags={'key1': 'val1', 'key2': 'val2'},
    prefix='python.proxy.',
    reporting_interval=10,
    enable_runtime_metrics=True)

wf_direct_reporter = wavefront_reporter.WavefrontDirectReporter(
    server=server, token=token, registry=reg,
    source='wavefront-pyformance-exmaple',
    tags={'key1': 'val1', 'key2': 'val2'},
    prefix='python.direct.',
    reporting_interval=10,
    enable_runtime_metrics=True)
```
{% endraw %}



