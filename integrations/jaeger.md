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
* Understanding configuration requirements for Jaeger clients and agents that send trace data to the Wavefront proxy.

The [documentation](https://docs.wavefront.com/tracing_integrations.html) explains integration requirements, how to specify custom tags for RED metrics, custom application names and more.
## Jaeger Integration Setup

Jaeger [deployments](https://www.jaegertracing.io/docs/1.17/architecture/#components) consist of [Clients](https://www.jaegertracing.io/docs/1.17/architecture/#jaeger-client-libraries), [Agents](https://www.jaegertracing.io/docs/1.17/deployment/#agent), and Collectors. There are two ways to configure your Jaeger deployment to send trace data to the Wavefront proxy:

* **Option 1 (Recommended):** [Configure the Jaeger client](#option-1-send-data-from-the-jaeger-client-recommended) to directly send trace data to the Wavefront proxy via HTTP/HTTPS.
* **Option 2 (Deprecated):** [Configure the Jaeger agent](#option-2-send-data-from-the-jaeger-agent-deprecated) to send trace data to the Wavefront proxy via TChannel. This approach is no longer recommended because sending via TChannel is [deprecated in Jaeger](https://www.jaegertracing.io/docs/1.17/apis/#thrift-via-tchannel-deprecated).




### Option 1: Send Data from the Jaeger Client (Recommended)

#### Install and Configure the Wavefront Proxy for Jaeger via HTTP

1. If you have not already done so, install a Wavefront proxy (version 6.0 or later).
2. On the host that is running your Wavefront proxy, open the file `/etc/wavefront/wavefront-proxy/wavefront.conf` and add:{% raw %}
   ```
   traceJaegerHttpListenerPorts=<enter-available-port>
   ```
{% endraw %}
   **Note:** See the [documentation](https://docs.wavefront.com/proxies_configuring.html#paths) to find where the config file is saved on your platform.
3. Save and close `wavefront.conf`.
4. [Restart the proxy](https://docs.wavefront.com/proxies_installing.html#start-and-stop-a-proxy).

#### Configure the Jaeger Client to Send Data to the Wavefront Proxy

Send data to the following endpoint:{% raw %}
 ```
 http://<wf_proxy_hostname>:<wf_proxy_jaeger_port>/api/traces
 ```
{% endraw %}
* Replace `<wf_proxy_hostname>` with the hostname of the Wavefront proxy.
* Replace: `<wf_proxy_jaeger_port>` with the port you entered above for `traceJaegerHttpListenerPorts`.
* Optionally, replace `http` with `https`.

You need to configure the Jaeger client based on your application type. For example, the `JAEGER_ENDPOINT` on the Jaeger client for Java needs to be configured using environment variables or system properties, as explained in the [Jaeger Java client documentation](https://github.com/jaegertracing/jaeger-client-java/blob/master/jaeger-core/README.md#configuration-via-environment). For more information on specific [Jaeger client libraries](https://www.jaegertracing.io/docs/1.17/client-libraries/#supported-libraries), see the respective repository’s README file.


### Option 2: Send Data from the Jaeger Agent (Deprecated)

#### Install and Configure the Wavefront Proxy for Jaeger via TChannel

1. If you have not already done so, install a Wavefront proxy (version 4.33 or later).
2. On the host that is running your Wavefront proxy, open the file `/etc/wavefront/wavefront-proxy/wavefront.conf` and add:{% raw %}
   ```
   traceJaegerListenerPorts=<enter-available-port>
   ```
{% endraw %}
   **Note:** See the [documentation](https://docs.wavefront.com/proxies_configuring.html#paths) to find where the config file is saved on your platform.
3. Save and close `wavefront.conf`.
4. [Restart the proxy](https://docs.wavefront.com/proxies_installing.html#start-and-stop-a-proxy).

#### Configure the Jaeger Agent to Send Data to the Wavefront Proxy

##### Host based Jaeger Installation
On your hosts running the Jaeger agent, configure the agent with the following property:
{% raw %}
```
--reporter.tchannel.host-port=<wf_proxy_hostname>:<wf_proxy_jaeger_port>
```
{% endraw %}
Replace `<wf_proxy_hostname>` with the hostname of the Wavefront proxy and `<wf_proxy_jaeger_port>` with the port you entered above for `traceJaegerListenerPorts`.

##### Docker based Jaeger Installation
When running Jaeger agents using docker, add the following to the docker run command:{% raw %}
```
-e REPORTER_TCHANNEL_HOST_PORT=<wf_proxy_hostname>:<wf_proxy_jaeger_port> -e REPORTER_TYPE=tchannel
```
{% endraw %}
Replace `<wf_proxy_hostname>` with the hostname of the Wavefront proxy and `<wf_proxy_jaeger_port>` with the port you entered above for `traceJaegerListenerPorts`.

**Note:** Replace `<wf_proxy_hostname>` with the IP address of the docker host if the proxy is running on the same host.

The Wavefront proxy will receive Jaeger trace data once the Jaeger agent has been started with the above property enabled.

### Customize Jaeger Integration:

#### Custom Application Names for Jaeger
You can specify custom application names at the level you need, like this:

1. Span-level tag: Add the application span tag to all spans.
2. Process-level tag: Add the application tag as a Jaeger tracer tag, that is, a process tag.
3. Proxy-level tag: Add traceJaegerApplicationName=<application-name> in the proxy configuration at /etc/wavefront/wavefront-proxy/wavefront.conf.
 See [Proxy Configuration Paths](https://docs.wavefront.com/proxies_configuring.html#paths) for details on the config file location.

The order of precedence is span level > process level > proxy level.

The [documentation](https://docs.wavefront.com/tracing_integrations.html) explains integration requirements, how to specify custom tags for RED metrics and more.

