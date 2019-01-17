---
title: Zipkin Integration
tags: [integrations list]
permalink: zipkin.html
summary: Learn about the Wavefront Zipkin Integration.
---
## Zipkin Integration

Zipkin is a popular open-source distributed tracing system. The [Wavefront proxy](https://docs.wavefront.com/proxies.html) supports all Zipkin trace data formats over HTTP.

Click the **Setup** tab for instructions on enabling the Wavefront proxy to consume Zipkin traces.

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
4. [Restart the proxy](https://docs.wavefront.com/proxies_installing.html#starting-and-stopping-a-proxy).

Wavefront will now receive Zipkin trace data on the specified proxy port.
