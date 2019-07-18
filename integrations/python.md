---
title: Python Integration
tags: [integrations list]
permalink: python.html
summary: Learn about the Wavefront Python Integration.
---
# Python Integration

You can use PyFormance and the Wavefront reporters to send Python application metrics to Wavefront. The reporters support sending metrics to Wavefront using the [Wavefront proxy](https://docs.wavefront.com/proxies.html) or using [direct ingestion](https://docs.wavefront.com/direct_ingestion.html). You can assign point tags at the reporter level for fine-grained filtering.

This is a custom integration. You can send your own metrics and create your own dashboards.

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
from pyformance import MetricsRegistry
from wavefront_pyformance.wavefront_reporter import WavefrontProxyReporter

reg = MetricsRegistry()
c1 = reg.counter("numbers")
c1.inc()

# Proxy Reporter with tags reporting to a Wavefront Proxy every 10s
wf_proxy_reporter = WavefrontProxyReporter(host=host, port=2878, registry=reg,
                                           source="wavefront-pyformance-example",
                                           tags={"key1":"val1", "key2":"val2"},
                                           prefix="python.proxy.",
                                           reporting_interval=10)
wf_proxy_reporter.start()
```
{% endraw %}


### Option 2. Create a Wavefront Direct Reporter and Register Metrics

You can send metrics directly to a Wavefront service, discussed next. Option 1 above explains how to send metrics to a Wavefront proxy.

Tags passed to the direct reporter are applied to every metric.

{% raw %}
```
from pyformance import MetricsRegistry
from wavefront_pyformance.wavefront_reporter import WavefrontDirectReporter

reg = MetricsRegistry()
c1 = reg.counter("numbers")
c1.inc()

server = "https://YOUR_CLUSTER.wavefront.com"
token = "YOUR_API_TOKEN"

# Direct Reporter with tags reporting directly to a Wavefront service every 10s
wf_direct_reporter = WavefrontDirectReporter(server=server, token=token, registry=reg,
                                             source="wavefront-pyformance-exmaple",
                                             tags={"key1":"val1", "key2": "val2"},
                                             prefix="python.direct.",
                                             reporting_interval=10)
wf_direct_reporter.start()
```
{% endraw %}
