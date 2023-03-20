---
title: nodejs Integration
tags: [integrations list]
permalink: nodejs.html
summary: Learn about the nodejs Integration.
---
## Node.js Integration

[Node.js](https://nodejs.org) is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. The Node.js package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

This Node.js integration provides Wavefront reporters for the Node.js [metrics](https://github.com/mikejihbe/metrics) library. The reporters support sending metrics to Wavefront using the [Wavefront proxy](https://docs.wavefront.com/proxies.html) or using [direct ingestion](https://docs.wavefront.com/direct_ingestion.html). You can assign point tags at both the reporter and metric levels.

This is a custom integration. You can send your own metrics and create your own dashboards.

## Node.js Setup

This Node.js integration provides Wavefront reporters for the Node.js [metrics](https://github.com/mikejihbe/metrics) library. The [reporters](https://github.com/wavefrontHQ/nodejs-metrics-wavefront) support sending metrics to Wavefront using the [Wavefront proxy](https://docs.wavefront.com/proxies.html) or using [direct ingestion](https://docs.wavefront.com/direct_ingestion.html). You can assign point tags at both the reporter and metric levels.

### Install wavefrontmetrics
{% raw %}
```
npm install wavefrontmetrics
```
{% endraw %}

### Option 1. Create a Wavefront Proxy Reporter

Follow these steps for sending metrics to a Wavefront proxy. See Option 2 for sending metrics directly to a Wavefront service.



#### Step 1. Set up Wavefront Proxy
If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network and reachable from your Node.js application, install a proxy. You configure the Wavefront proxy hostname and port (by default 2878) when you invoke the reporter.

#### Step 2. Create the Wavefront Proxy Reporter
Tags passed to the proxy reporter are applied to every metric.
{% raw %}
```
const metrics = require('wavefrontmetrics');
const registry = new metrics.Registry();
const prefix = "wavefront.nodejs.proxy";

const proxyReporter = new metrics.WavefrontProxyReporter(registry, prefix, "localhost", 2878, { 'tag0': "default", 'source': "wavefront-nodejs-example"});
proxyReporter.start(5000);
```
{% endraw %}

### Option 2. Create a Wavefront Direct Reporter

You can send metrics directly to a Wavefront service, discussed next. Option 1 above explains how to send metrics to a Wavefront proxy.

Tags passed to the direct reporter are applied to every metric.
{% raw %}
```
const metrics = require('wavefrontmetrics');
const registry = new metrics.Registry();
const prefix = "wavefront.nodejs.direct";

const directReporter = new metrics.WavefrontDirectReporter(registry, prefix,  "<cluster>.wavefront.com", "<wavefront_api_token>", { 'tag0': "default", 'source': "wavefront-nodejs-example"});
directReporter.start(5000);
```
{% endraw %}

### Register Metrics with Metric-level Tags

You can add tags to individual metrics. The tags are included by the Wavefront reporter at report time.
{% raw %}
```
const metrics = require('wavefrontmetrics');
const registry = new metrics.Registry();

// Counter with metric level tags
let c = new metrics.Counter();
registry.addTaggedMetric("request.counter", c, {"key1":"val1"});
c.inc();

// Gauge with metric level tags
// Note that you can only pass in a function to a Gauge.
var g = new metrics.Gauge(() => { 
  return 2 + Math.random(5);
});
registry.addTaggedMetric("request.gauge", g, {"key1":"val1"});

// Histogram with metric level tags
let h = new metrics.Histogram();
registry.addTaggedMetric("request.duration", h, {"key1":"val1"});
h.update(50);

// Meter with metric level tags
let m = new metrics.Meter();
registry.addTaggedMetric("request.meter", m, {"key1":"val1"});
m.mark(1);

// Timer with metric level tags
let t = new metrics.Timer();
registry.addTaggedMetric("request.timer", t, {"key1":"val1"});
t.update(50);
```
{% endraw %}



