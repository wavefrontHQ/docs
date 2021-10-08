---
title: Run a Proxy in a Container
keywords:
tags: [proxies]
sidebar: doc_sidebar
permalink: proxies_container.html
summary: Configure a Wavefront Proxy and Telegraf in a container
---
You can set up a proxy to run in a container. This page discusses running a proxy and Telegraf Agent as Docker containers, but the guidance (though not some specifics) applies to other container solutions as well.

## Run a Proxy in a Docker Container

You can run a proxy in a Docker container by running one of the following commands:

**dockerhub:**

Example: Run the Wavefront proxy in a container with a limit of 2 GB of memory:

```
docker run -d \
 -e WAVEFRONT_URL=https://<myinstance>.wavefront.com/api \
 -e WAVEFRONT_TOKEN=<YOUR-API-TOKEN> \
 -e WAVEFRONT_PROXY_ARGS='--<arg1> <value1> --<arg2> <value2>' \
 -e JAVA_HEAP_USAGE="1650m"\
 -m 2g \
 -p 2878:2878 \
 wavefronthq/proxy:latest
```

Example: Run the proxy with preprocessor rules by using the WAVEFRONT_PROXY_ARGS. Specify the volume to use:

```
docker run \
 -e WAVEFRONT_URL=https://<myinstance>.wavefront.com/api \
 -e WAVEFRONT_TOKEN=<YOUR-API-TOKEN> \
 -e WAVEFRONT_PROXY_ARGS='--preprocessorConfigFile /etc/wavefront/wavefront-proxy/preprocessor_rules.yaml' \
 -v </path/to/file>/preprocessor_rules.yaml:/etc/wavefront/wavefront-proxy/preprocessor_rules.yaml:ro \
 -p 2878:2878 \
 wavefronthq/proxy:latest
 ```

**Harbor:**
```
docker run -d\
 -e WAVEFRONT_URL=https://<myinstance>.wavefront.com/api/ \
 -e WAVEFRONT_TOKEN=<YOUR_API_TOKEN>
 -e WAVEFRONT_PROXY_ARGS=''--<arg1> <value1> --<arg2> <value2>''\
-p 2878:2878 projects.registry.vmware.com/tanzu_observability/proxy:latest
```

Options:

<table style="width: 100%;">
<tbody>
<tr>
<td width="20%"><strong>Token</strong></td>
<td width="80%" markdown="span">WAVEFRONT_TOKEN is the [API token](wavefront_api.html#generating-an-api-token) for the account</td>
</tr>
<tr>
<td width="20%"><strong>Configuration properties</strong></td>
<td width="80%" markdown="span">Use WAVEFRONT_PROXY_ARGS to point to set [configuration properties](proxies_configuring.html). You can specify more than one argument. <code>'&lt;--arg1&gt; &lt;value1&gt; --&lt;arg2&gt; &lt;value2&gt;'</code> </td>
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
* Use `wavefronthq/proxy:latest` for an image on [dockerhub](https://hub.docker.com/r/wavefronthq/proxy).
* Use `projects.registry.vmware.com/tanzu_observability/proxy:latest` for an image on Harbor.
* Specify a proxy version explicitly in the proxy configuration file.

The proxies are not stateful. Your configuration is managed in your `yaml` file. It's safe to use  `proxy:latest` -- we ensure that proxies are backward compatible.

### Restrict Memory Usage for a Wavefront Proxy as a Container

Without a memory limit, the JVM committed can commit up to the memory provisioned for the host. To restrict memory usage of the container using Docker, you need to add a `JAVA_HEAP_USAGE` environment variable and restrict memory using the `-m` or `--memory` options for the docker `run` command.

{% include tip.html content="Setting a memory limit is highly recommended. " %}

For example, to restrict a container's memory usage to 2 GB with `docker run`:
```
docker run -d \
...
...
 -e JAVA_HEAP_USAGE="1650m" \
 -m 2g \
...
...
wavefronthq/proxy:latest
```

To limit memory usage of the container in Kubernetes use the `resources.limits.memory` property of a container definition. See the [Kubernetes doc](https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/).

### Customize Proxy Settings for Docker from the Command Line

When you run a Wavefront proxy inside a Docker container, you can tweak proxy configuration settings that are properties in the `wavefront.conf` file directly from the Docker `run` command (shown above).

During exploration, you can use the WAVEFRONT_PROXY_ARGS environment variable and pass in one or more property names and values.

```
-e WAVEFRONT_PROXY_ARGS="--pushRateLimit 1000 --ARG2 ARG_2_VALUE --ARG_N ARG_N_VALUE..."
```

For example, add `-e WAVEFRONT_PROXY_ARGS="--pushRateLimit 1000"` to your docker `run` command to specify a rate limit of 1000 PPS for the proxy.

See the [Advanced Proxy Configuration](proxies_configuring.html) or the [Wavefront Proxy configuration file](https://github.com/wavefrontHQ/java/blob/master/pkg/etc/wavefront/wavefront-proxy/wavefront.conf.default) on Github for a full list of configuration properties.

### Log Customization for Docker Containers

By default, Wavefront proxy logs in Docker and Kubernetes are sent to std_out. You can customize logging by mounting a customized `log4j2.xml` file. Here's an example for Docker:

```
--mount type=bind, src=<absolute_path>/log4j2.xml, dst=/etc/wavefront/wavefront-proxy/log4j2.xml
```

See [Logging](proxies_configuring.html#logging) for additional background.

## Run Telegraf in a Docker Container

It usually makes sense to run both the proxy and Telegraf in a Docker container.

The following example passes the `telegraf.conf` file and any files (such as `10-wavefront.conf`) that belong in the `telegraf.d` directory.
​
1. Create a `telegraf.conf` file under `<path/to/file>/telegraf.conf`. Use  [https://github.com/influxdata/telegraf/blob/master/etc/telegraf.conf](https://github.com/influxdata/telegraf/blob/master/etc/telegraf.conf) as an example
2. Create the `10-wavefront.conf` file under `<path/to/dir>/telegraf.d/` via the example configuration below . Refer to the  [wavefront#configuration](https://github.com/influxdata/telegraf/tree/master/plugins/outputs/wavefront#configuration) information on Github as needed.
​<br/><br/>
  **Example file: 10-wavefront.conf**
	```
	[[outputs.wavefront]]
	  url = "http://<WAVEFRONT_PROXY_SERVER>:2878"
	  metric_separator = "."
	  source_override = ["hostname", "agent_host", "node_host"]
	  convert_paths = true
	```
3. Run the Telegraf agent with the specified configuration settings:


    ```
    docker run -d \
    -v <path/to/file>/telegraf.conf:/etc/telegraf/telegraf.conf \
    -v <path/to/dir>/telegraf.d:/etc/telegraf/telegraf.d telegraf \
    --config-directory /etc/telegraf/telegraf.d \
    wavefronthq/telegraf:latest
    ```

## Troubleshooting

* To view `std_out` logs of the Wavefront proxy container for the last one hour and follow them going forward, run this command:
```
~$ docker logs --follow --since 60m <container_name>
```
Errors with the container with WAVEFRONT_PROXY_ARGS will be logged as the container starts.

* WAVFFRONT_TOKEN and WAVEFRONT_URL are required parameters for the container to start
<!---
* The Wavefront proxy can use up to the limit of memory needed. If the consumption of the Wavefront Proxy container is --->
