---
title: Zipkin Integration
tags: [integrations list]
permalink: zipkin.html
summary: Learn about the Wavefront Zipkin Integration.
---
## Zipkin Integration

Zipkin is a popular open-source distributed tracing system. The [Wavefront proxy](https://docs.wavefront.com/proxies.html) supports all Zipkin trace data formats over HTTP.

Click the **Setup** tab for instructions on enabling the Wavefront proxy to consume Zipkin traces.

The [documentation](https://docs.wavefront.com/tracing_integrations.html) explains integration requirements, how to specify custom tags for RED metrics, custom application names and more.

## Zipkin Integration Setup

Zipkin [deployments](https://zipkin.io/pages/architecture.html) consist of a Zipkin collector which consumes Zipkin spans. The Wavefront proxy mimics a Zipkin HTTP Collector and consumes Zipkin spans by listening on the specified port.

### Install and Configure the Wavefront Proxy

1. If you have not already done so, install a Wavefront proxy (version 4.35 or later). 
2. On the host that is running the Wavefront proxy, open the file `/etc/wavefront/wavefront-proxy/wavefront.conf` and add:{% raw %}
   ```
   traceZipkinListenerPorts=<enter-available-port>
   # Using the default Zipkin Collector port (9411) is recommended.
   ```
{% endraw %}
   **Note:** See the [documentation](https://docs.wavefront.com/proxies_configuring.html#paths) for the config file location for the different operating systems.
3. Save and close `wavefront.conf`.
4. [Restart the proxy](https://docs.wavefront.com/proxies_installing.html#start-and-stop-a-proxy).

Wavefront will now receive Zipkin trace data on the specified proxy port.

### Customize Zipkin Integration:

#### Custom Application Names for Zipkin
You can specify custom application names at the level you need, like this:

1. Span-level tag: Add the application span tag to all spans.
2. Proxy-level tag: Add traceZipkinApplicationName=<application-name> in the proxy configuration at /etc/wavefront/wavefront-proxy/wavefront.conf.
   See [Proxy Configuration Paths](https://docs.wavefront.com/proxies_configuring.html#paths) for details on the config file location.

The order of precedence is span level > proxy level.

The [documentation](https://docs.wavefront.com/tracing_integrations.html) explains integration requirements, how to specify custom tags for RED metrics and more.


