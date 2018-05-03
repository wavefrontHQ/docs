---
title: nodejs Integration
tags: []
permalink: nodejs.html
summary: Learn about the Wavefront nodejs Integration.
---
## Node.js Integration

[Node.js](https://nodejs.org) is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. The Node.js package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

This Node.js integration is a port of the codahale metrics library (https://github.com/codahale/metrics). Using this integration, you can visualize the metrics collected by the Node.js metrics library to measure the behavior of your Node.js instances while they are running.

## Node.js Setup

### Step 1. Setup Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network and reachable from your Node.js instance, [install a proxy](/proxies/add). You configure the Wavefront proxy hostname and port (by default 2878) when you invoke the metrics reporter.

### Step 2. Install the wavefrontmetrics NPM
{% raw %}
```
npm install wavefrontmetrics
```
{% endraw %}

### Step 3. How to Use

To use the integration, you import the metrics reporter, set up your reporter, and start adding the metrics you want to push out to wavefront. See (https://github.com/wavefrontHQ/nodejs-metrics-wavefront/blob/master/README.md) for instructions and examples.
