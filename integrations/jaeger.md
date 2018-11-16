---
title: Jaeger Integration
tags: [integrations list]
permalink: jaeger.html
summary: Learn about the Wavefront Jaeger Integration.
---
## Jaeger Integration

Jaeger is a popular open-source distributed tracing system. The [Wavefront proxy](https://docs.wavefront.com/proxies.html) supports the Jaeger Thrift trace data format.

Click the **Setup** tab for instructions on:

* Enabling the Wavefront proxy to support the Jaeger Thrift data format.
* Understanding configuration requirements for Jaeger agents that send trace data to the Wavefront proxy.

## Jaeger Integration Setup

Jaeger [deployments](https://www.jaegertracing.io/docs/1.8/architecture/#components) consist of Collectors and [Jaeger Agents](https://www.jaegertracing.io/docs/1.8/deployment/#agent). The agents can be configured to send trace data to the Wavefront proxy.



### Install and Configure the Wavefront Proxy

1. If you have not already done so, install a Wavefront proxy.
2. On the host that is running your Wavefront proxy, open the file `/etc/wavefront/wavefront-proxy/wavefront.conf` and add:{% raw %}
   ```
   traceJaegerListenerPorts=<enter-available-port>
   ```
   **Note:** See the [documentation](https://docs.wavefront.com/proxies_configuring.html#paths) for the config file location for other platforms.
3. Save and close `wavefront.conf`.
4. [Restart the proxy](https://docs.wavefront.com/proxies_installing.html#starting-and-stopping-a-proxy).

### Configure the Jaeger Agent to Send Data to the Wavefront Proxy

On your hosts running the Jaeger agent, configure the agent with the following property:

```
--reporter.tchannel.host-port=<wf_proxy_hostname>:<wf_proxy_jaeger_port>
```
{% endraw %}
**Note**: Replace `<wf_proxy_hostname>` with the hostname of the Wavefront proxy and `<wf_proxy_jaeger_port>` with the port you entered above for `traceJaegerListenerPorts`.

The Wavefront proxy will receive Jaeger trace data once the Jaeger agent has been started with the above property enabled.
