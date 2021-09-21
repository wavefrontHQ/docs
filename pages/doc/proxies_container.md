---
title: Run a Proxy in a Container
keywords:
tags: [proxies]
sidebar: doc_sidebar
permalink: proxies_container.html
summary: Configure a Wavefront Proxy and Telegraf in a container
---
You can set up a proxy to run in a container. This page discusses running a proxy and Telegraf in a Docker container, but the guidance (though not some specifics) applies to other container solutions as well.

## Run a Proxy in a Docker Container
 
You can run a proxy in a Docker container by running one of the following commands:

**dockerhub:**
```
docker run -d -e WAVEFRONT_URL=https://<myinstance>.wavefront.com/api/ -e
WAVEFRONT_TOKEN=YOUR_API_TOKEN -e WAVEFRONT_PROXY_ARGS=YOUR_PROXY_CONFIG_FILE -p 2878:2878 wavefronthq/proxy:latest
```

**Harbor:**
```
docker run -d -e WAVEFRONT_URL=https://<myinstance>.wavefront.com/api/ -e
WAVEFRONT_TOKEN=YOUR_API_TOKEN -e WAVEFRONT_PROXY_ARGS=YOUR_PROXY_CONFIG_FILE -p 2878:2878 projects.registry.vmware.com/tanzu_observability/proxy:latest
```

Options for both commands:

<table style="width: 100%;">
<tbody>
<tr>
<td width="20%"><strong>Token</strong></td>
<td width="80%" markdown="span">WAVEFRONT_TOKEN is the [API token](wavefront_api.html#generating-an-api-token) for the account</td>
</tr>
<tr>
<td width="20%"><strong>Config file</strong></td>
<td width="80%" markdown="span">Use WAVEFRONT_ARGS to point to the [proxy config file](proxies_configuring.html), for example <code>etc/wavefront/wavefront-proxy/wavefront.conf</code>.</td>
</tr>
<tr>
<td width="20%"><strong>Wavefront instance</strong></td>
<td width="80%" markdown="span">&lt;myinstance&gt; is the URL of the Wavefront instance, for example, <code>https://example.wavefront.com</code></td>
</tr>
<tr>
<td width="20%"><strong>Port</strong></td>
<td width="80%" markdown="span">The proxy uses port 2878 by default. The proxy config file supports setting explicit ports for different kinds of metrics.</td>
</tr>
<tr>
<td width="20%"><strong>Image</strong></td>
<td width="80%" markdown="span">Image to use. See Proxy Versions for Containers below.</td>
</tr>
</tbody>
</table>


### Proxy Versions for Containers

For containers, the proxy image version is determined by the `image` property in the configuration file. You have these choices:
* Use `wavefronthq/proxy:latest` for an image on dockerhub.
* Use `projects.registry.vmware.com/tanzu_observability/proxy:latest` for an image on Harbor.
* Specify a proxy version explicitly in the proxy configuration file.

The proxies are not stateful. Your configuration is managed in your `yaml` file. It's safe to use  `proxy:latest` -- we ensure that proxies are backward compatible.

### Restrict Memory Usage for a Docker Container

To restrict memory usage of the container using Docker, you need to add a `JAVA_HEAP_USAGE` environment variable and restrict memory using the `-m` or `--memory` options for the docker `run` command.  The container memory contraint should be at least 350mb larger than the JAVA_HEAP_USAGE environment variable.

To restrict a container's memory usage to 2g with Docker run:

```docker run -d --name wavefront-proxy ... -e JAVA_HEAP_USAGE="1650m" -m 2g ...```

To limit memory usage of the container in Kubernetes use the `resources.limits.memory` property of a container definition. See the [Kubernetes doc](https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/).

### Customize Proxy Settings for Docker from the Command Line

When you run a Wavefront proxy inside a Docker container, you can tweak proxy configuration settings that are properties in the `wavefront.conf` file directly from the Docker `run` command (shown above).

During exploration, you can also use the WAVEFRONT_PROXY_ARGS environment variable and pass in the property name as a long form argument, preceded by `--`.

For example, add `-e WAVEFRONT_PROXY_ARGS="--pushRateLimit 1000"` to your docker `run` command to specify a rate limit of 1000 pps for the proxy.

See the [Advanced Proxy Configuration](proxies_configuring.html) or the [Wavefront Proxy configuration file](https://github.com/wavefrontHQ/java/blob/master/pkg/etc/wavefront/wavefront-proxy/wavefront.conf.default) on Github for a full list of configuration properties.

### Log Customization for Docker Containers

You can customize logging by mounting a customized `log4j2.xml` file. Here's an example for Docker:

```
--mount type=bind, src=<absolute_path>/log4j2.xml, dst=/etc/wavefront/wavefront-proxy/log4j2.xml
```

See [Logging](proxies_configuring.html#logging) for additional background.

## Run Telegraf in a Docker Container

It usually makes sense to run both the proxy and Telegraf in a Docker container, as in the following example:

```
docker run -v /telegraf.conf:/etc/telegraf/telegraf.conf -v /telegraf.d:/etc/telegraf/telegraf.d telegraf --config-directory /etc/telegraf/telegraf.d
```

## Troubleshooting
