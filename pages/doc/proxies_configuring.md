---
title: Advanced Proxy Configuration
keywords:
tags: [proxies]
sidebar: doc_sidebar
permalink: proxies_configuring.html
summary: Learn how to configure a Wavefront proxy.
---
Advanced proxy configuration includes use of configuration propertie  and performing advanced installation management such as installing proxies in a container.


## Proxy Configuration Properties

The main Wavefront proxy configuration file is maintained in `<wavefront_config_path>/wavefront.conf` (`<wf_config_path>/wavefront.conf`). The configuration file offers many options for changing how the proxy processes your data. There are optional configuration files for [rewriting metrics](proxies_preprocessor_rules.html) and parsing [log data](integrations_log_data.html#configuring-the-wavefront-proxy-to-ingest-log-data). The default values work well in many cases, but you can adjust them as needed. After changing a configuration option, [restart the proxy service](proxies_installing.html#starting-and-stopping-a-proxy).

### Paths

In this section, file paths use the following conventions and values:

- `<wavefront_config_path>`
  - Linux - `/etc/wavefront/wavefront-proxy`
  - Mac - `/usr/local/etc/wavefront/wavefront-proxy`
  - Windows - `C:\Program Files (x86)\Wavefront\conf`
- `<wavefront_log_path>`
  - Linux - `/var/log/wavefront`
  - Mac - `/usr/local/var/log/wavefront`
  - Windows - `C:\Program Files (x86)\Wavefront`
- `<wavefront_spool_path>`
  - Linux - `/var/spool/wavefront-proxy`
  - Mac - `/usr/local/var/spool/wavefront-proxy`
  - Windows - `C:\Program Files (x86)\Wavefront\bin`

{% include important.html content="On Windows, _do not_ use **notepad** to edit any configuration files. Use an editor that supports Unix style line endings, such as **Notepad++** or **EditPlus**."%}

### General Proxy Properties and Examples

This section lists general proxy configuration properties and metrics proxy configuration properties. See [Histogram Configuration Properties](proxies_histograms.html#histogram-configuration-properties) for properties specific to histogram distributions.

<table>
<thead>
<tr>
<th>Property</th>
<th>Purpose</th>
<th>Format /Example </th>
<th>Since</th>
</tr>
</thead>
<tbody>
<tr>
<td>agentMetricsPointTags</td>
<td>Point tags and their values to be passed along with <code>~agent./</code> metrics. Default: None.</td>
<td>Comma-separated list of key-value pairs.
<div>Ex: dc=west,env=prod</div></td>
<td>3.24</td>
</tr>
<tr>
<td>blacklistRegex </td>
<td>Regex pattern (java.util.regex) that input lines must match to be filtered out. Input lines are checked against the pattern as they come in and before the prefix is prepended.</td>
<td>Valid regex pattern.
<div>Ex: Filter out points that begin with qa., development., or test.:</div>
^(qa|development|test).</td>
<td>3.1</td>
</tr>
<tr>
<td>buffer</td>
<td>Location of buffer files for saving failed transmissions for retry.</td>
<td>Valid path on the local file system.
<div>Ex: <code>&lt;wavefront_spool_path&gt;/buffer</code></div></td>
<td>3.20</td>
</tr>
<tr>
<td>customSourceTags</td>
<td>Point tag keys to use as 'source' if no 'source' or 'host' field is present. Default: fqdn, hostname.</td>
<td>Comma-separated list of point tag keys.
<div>Ex: fqdn, hostname</div></td>
<td>3.14</td>
</tr>
<tr>
<td>dataBackfillCutoffHours</td>
<td>The cut-off point for what is considered a valid timestamp for back-dated points. We do not recommend setting this value larger than 1 year unless backfilling or migrating historic data. Default: 8760 (1 year), so all points older than 1 year are rejected.</td>
<td>Positive integer.
<div>Ex: 8760</div></td>
<td>4.1</td>
</tr>
<tr>
<td>ephemeral</td>
<td>Whether to automatically clean up old and orphaned proxy instances from the Wavefront Proxies page. We recommend enabling ephemeral mode if you're running the proxy in a container that may be frequently spun down and recreated. Default: false.</td>
<td>Boolean
<div>Ex: true </div></td>
<td>3.14</td>
</tr>
<tr>
<td>fileBeatPort</td>
<td>TCP port to listen on for Filebeat data. Default: 5044.</td>
<td>A port number.
<div>Ex: 5044 </div></td>
<td>4.1</td>
</tr>
<tr>
<td>flushThreads</td>
<td>Number of threads that flush data to the server. Setting this value too high results in sending batches that are too small to the Wavefront server and wasting connections. Values between 6 and 16 are a good starting point. This setting is per listening port. Default: The number of available processors (min 4).</td>
<td>Positive integer.
<div>Ex: 16 </div></td>
<td>3.14</td>
</tr>
<tr>
<td>graphiteDelimiters</td>
<td>Characters that should be replaced by dots, in case they were escaped within Graphite and collectd before sending. A common delimiter is the underscore character; so if you extract a hostname field with the value <code>web04_www</code>, it is changed to <code>web04.www</code>.</td>
<td>A concatenation of delimiter characters, without any separators.</td>
<td> </td>
</tr>
<tr>
<td>graphiteFormat</td>
<td>Indexes of fields within Graphite and collectd metric names that correspond to a hostname. For example, if your metrics have the format: <code>collectd.prod.www04.cpu.loadavg.1m</code>, specify the 3rd and 2nd indexes (www04.prod) to be extracted and treated as the hostname. The remainder <code>collectd.cpu.loadavg.1m</code> is treated as the metric name.</td>
<td>Comma-separated list of indexes.
<div>Ex: 4, 2, 5</div>
<div>Ex: 3</div> </td>
<td> </td>
</tr>
<tr>
<td>graphitePorts</td>
<td>TCP ports to listen on for Graphite data. Define which of the segments in your Graphite metrics map to a hostname in the graphiteFormat property. Default: 2003.</td>
<td>Comma-separated list of available port numbers. Can be a single port.
<div>Ex: 2003</div>
<div>Ex: 2003, 2004 </div></td>
<td> </td>
</tr>
<tr>
<td>histogramMaxReceivedLength</td>
<td>Maximum line length for received histogram points. Default: 65536.
</td>
<td>Positive integer</td>
<td>4.31 </td>
</tr>
<tr>
<td>hostname</td>
<td>A name unique across your account representing the machine that the proxy is running on. The hostname is not used to tag your metrics; rather, it's used to tag proxy metrics, such as JVM statistics, per-proxy point rates, and so on.</td>
<td>A string containing alphanumeric characters and periods.</td>
<td> </td>
</tr>
<tr>
<td>httpConnectTimeout</td>
<td>HTTP connect timeout (in milliseconds). Default: 5000 (5s).</td>
<td>Positive integer.
<div>Ex: 5000 </div></td>
<td>4.1</td>
</tr>
<tr>
<td>httpRequestTimeout</td>
<td>HTTP request timeout (in milliseconds). We do not recommend setting this value to be higher than 20000. Recommended value for most configurations is 10000 (10 seconds). Default: 10000 (10s).</td>
<td>Positive integer.
<div>Ex: 10000 </div></td>
<td>4.1</td>
</tr>
<tr>
<td>httpUserAgent</td>
<td>Override User-Agent in request headers. Can help bypass excessively restrictive filters on the HTTP proxy. Default user agent: <code>Wavefront-Proxy/&lt;version&gt;</code>.</td>
<td>A string.
<div>Ex: 'Mozilla/5.0' </div></td>
<td>4.1</td>
</tr>
<tr>
<td>idFile</td>
<td>Location of the PID file for the wavefront-proxy process. Default: <code>&lt;wf_config_path&gt;/.wavefront_id</code>.</td>
<td>Valid path on the local file system.</td>
<td> </td>
</tr>
<tr>
<td>jsonListenerPorts</td>
<td>TCP ports to listen on for incoming JSON-formatted metrics. Default: None.</td>
<td>Comma-separated list of available port numbers. Can be a single port.</td>
<td></td>
</tr>
<tr>
<td>listenerIdleConnectionTimeout</td>
<td>Close idle inbound connections after specified time in seconds. Default: 300
</td>
<td>Number of seconds.</td>
<td>4.31</td>
</tr>
<tr>
<td>logsIngestionConfigFile</td>
<td>The file containing instructions for parsing log data into metrics.  See <a href="integrations_log_data.html">Log Data Metrics Integration</a>.
Default: <code>&lt;wf_config_path&gt;/logsIngestion.yaml</code>.</td>
<td>Valid path on the local file system.</td>
<td>4.1</td>
</tr>
<tr>
<td>opentsdbPorts</td>
<td>TCP ports to listen on for incoming OpenTSDB-formatted data. Default: None.</td>
<td>Comma-separated list of available port numbers. Can be a single port.
<div>Ex: 4242 </div></td>
<td>3.1</td>
</tr>
<tr>
<td>picklePorts</td>
<td>TCP ports to listen on for incoming data in Graphite pickle format (from carbon-relay). Default: None.</td>
<td>Comma-separated list of available port numbers. Can be a single port.
<div>Ex: 5878 </div></td>
<td>3.20</td>
</tr>
<tr>
<td>prefix</td>
<td>String to prepend before every metric name. For example, if you set prefix to 'production', a metric that is sent to the proxy as <code>cpu.loadavg.1m</code> is sent from the proxy to Wavefront as <code>production.cpu.loadavg.1m</code>. You can include longer prefixes such as <code>production.nyc.dc1</code>. Default: None.</td>
<td>A lowercase alphanumeric string, with periods separating segments. You do not need to include a trailing period.
<div>Ex: production</div>
<div>Ex: production.nyc.dc1</div>
</td>
<td></td>
</tr>
<tr>
<td>preprocessorConfigFile</td>
<td>Path to the optional preprocessor config file containing <a href="proxies_preprocessor_rules.html">preprocessor rules</a> for filtering and rewriting metrics. Default: None.</td>
<td>Valid path on the local file system.
<div>Ex: <code>&lt;wf_config_path&gt;/preprocessor_rules.yaml</code></div></td>
<td>4.1</td>
</tr>
<tr>
<td>proxyHost</td>
<td>HTTP proxy host to be used in configurations when direct HTTP connections to Wavefront servers are not possible. Must be used with proxyPort.</td>
<td>A string.
<div>Ex: proxy.local</div></td>
<td>3.23</td>
</tr>
<tr>
<td>proxyPassword</td>
<td>When used with proxyUser, sets credentials to use with the HTTP proxy if the proxy requires authentication.</td>
<td>A string.
<div>Ex: validPassword123 </div></td>
<td>3.23</td>
</tr>
<tr>
<td>proxyPort</td>
<td>HTTP proxy port to be used in configurations when direct HTTP connections to Wavefront servers are not possible. Must be used with proxyHost.</td>
<td>A port number.
<div>Ex: 8080 </div></td>
<td>3.23</td>
</tr>
<tr>
<td>proxyUser</td>
<td>When used with proxyPassword, sets credentials to use with the HTTP proxy if the proxy requires authentication.</td>
<td>A string.
<div>Ex: validUser </div></td>
<td>3.23</td>
</tr>
<tr>
<td>pushBlockedSamples</td>
<td>Number of blocked points to print to the log immediately following each summary line (every 10 flushes). If 0, print none. If you see a non-zero number of blocked points in the summary lines and want to debug what that data is, set this property to 5. Default: 0.</td>
<td>0 or a positive integer.
<div>Ex: 5 </div></td>
<td> </td>
</tr>
<tr>
<td>pushFlushInterval</td>
<td>Milliseconds to wait between each flush to Wavefront. Default: 1000.</td>
<td>An integer equal to or greater than 1000.
<div>Ex: 1000 </div></td>
<td> </td>
</tr>
<tr>
<td>pushFlushMaxPoints</td>
<td>Maximum number of points to send to Wavefront during each flush. Default: 40,000.</td>
<td>Positive integer.
<div>Ex: 40000 </div></td>
<td> </td>
</tr>
<tr>
<td>pushListenerHttpBufferSize</td>
<td>Maximum allowed request size (in bytes) for incoming HTTP requests on Wavefront, OpenTSDB, or Graphite ports. Default: 16777216 (16MB).
</td>
<td>Ex: 8388608</td>
<td>4.31</td>
</tr>
<tr>
<td>pushListenerMaxReceivedLength</td>
<td>Maximum line length for received points in plaintext format on Wavefront, OpenTSDB, or Graphite ports. Default: 4096</td>
<td>Positive integer.
<div>Ex: 4096 </div></td>
<td>4.31</td>
</tr>
<tr>
<td>pushListenerPorts</td>
<td>TCP ports to listen on for incoming data. Default: 2878.</td>
<td>Comma-separated list of available port numbers. Can be a single port.
<div>Ex: 2878</div>
<div>Ex: 2878,2879,2880</div></td>
<td> </td>
</tr>
<tr>
<td>pushLogLevel</td>
<td>Frequency to print status information on the data flow to the log. SUMMARY prints a line every 60 flushes, while DETAILED prints a line on each flush.</td>
<td>None, SUMMARY, or DETAILED
<div>Ex: SUMMARY </div></td>
<td> </td>
</tr>
<tr>
<td>pushMemoryBufferLimit</td>
<td>Maximum number of points that can stay in memory buffers before spooling to disk. Setting this value lower than default reduces memory usage but forces the proxy to queue points by spooling to disk more frequently, if you have points arriving at the proxy in short bursts. Default: 16 * pushFlushMaxPoints. Minimum: pushFlushMaxPoints.</td>
<td>Positive integer.
<div>Ex: 640000</div></td>
<td>4.1</td>
</tr>
<tr>
<td>pushRateLimit</td>
<td>Maximum number of points per second to send to Wavefront. Default: unlimited.</td>
<td>Positive integer.
<div>Ex: 20000</div></td>
<td>4.1</td>
</tr>
<tr>
<td>pushValidationLevel</td>
<td>Level of validation to perform on incoming data before sending the data to Wavefront. If NO_VALIDATION, all data is sent forward. If NUMERIC_ONLY, data is checked to make sure that it is numerical and dropped locally if it is not.</td>
<td>NUMERIC_ONLY or NO_VALIDATION
<div>Ex: NUMERIC_ONLY </div></td>
<td> </td>
</tr>
<tr>
<td>rawLogsMaxReceivedLength</td>
<td>Maximum line length for received raw logs. Default: 4096.
</td>
<td>Positive integer.
<div>Ex: 4096 </div></td>
<td>4.31</td>
</tr>
<tr>
<td>rawLogsPort</td>
<td>TCP port to listen on for log data. Default: 5045.</td>
<td>A port number.
<div>Ex: 5045 </div></td>
<td>4.4</td>
</tr>
<tr>
<td>retryBackoffBaseSeconds</td>
<td>For exponential back-off when retry threads are throttled, the base (a in a^b) in seconds. Default: 2.0.</td>
<td>Positive number, integer or decimal.
<div>Ex: 2.0 </div></td>
<td> </td></tr>
<tr>
<td>retryThreads</td>
<td>Number of threads retrying failed transmissions. If no value is specified, defaults to the number of processor cores available to the host or 4, whichever is greater. Every retry thread uses a separate buffer file (capped at 2GB) to persist queued data points, so the number of threads controls the maximum amount of space that the proxy can use to buffer points locally.</td>
<td>Positive integer.
<div>Ex: 4 </div>  </td>
<td> </td>
</tr>
<tr>
<td>server</td>
<td>The API URL of the Wavefront server in the format https://&lt;wf_instance&gt;.wavefront.com/api/.</td>
<td> </td>
<td> </td>
</tr>
<tr>
<td>soLingerTime</td>
<td>Enable SO_LINGER with the specified linger time in seconds. Set this value to 0 when running in a high-availability configuration under a load balancer. Default: 0 (disabled). </td>
<td><div>0 or a positive integer.</div>
Ex: 0 </td>
<td>4.1</td>
</tr>
<tr>
<td>splitPushWhenRateLimited</td>
<td>Whether to split the push batch size when the push is rejected by Wavefront due to rate limit. Default: false.</td>
<td>true or false
<div>Ex: false </div></td>
<td> </td>
</tr>
<tr>
<td>traceJaegerListenerPorts</td>
<td>Comma-separated list of ports on which to listen on for Jaeger Thrift formatted data. Defaults to none.</td>
<td> </td>
<td>4.31 </td>
</tr>
<tr>
<td>traceListenerPorts</td>
<td>Comma-separated list of ports to listen on for trace data. Defaults to none.</td>
<td> </td>
<td>4.31 </td>
</tr>
<tr>
<td>whitelistRegex</td>
<td>Regex pattern (java.util.regex). Input lines are checked against the pattern as they come in and before the prefix is prepended. Only input lines that match are accepted. </td>
<td>Valid regex pattern.
<div>Ex: ^(production|stage). </div>
<div>Allows points that begin with production. and stage. </div></td>
<td>3.1</td>
</tr>
<tr>
<td>writeHttpJsonListenerPorts</td>
<td>Ports to listen on for incoming data from the collectd write_http plugin. Default: None.</td>
<td>Comma-separated list of available port numbers. Can be a single port.
<div>Ex: 4878 </div></td>
<td>3.14</td>
</tr>
</tbody>
</table>


## Data Buffering

If the Wavefront proxy is unable to post received data to the Wavefront servers, it buffers the data to disk across a number of buffer files, and then tries to resend the points once the connection to the Wavefront servers is available again. If this buffering occurs, you'll see lines like this in `wavefront.log`:

    2013-11-18 18:02:35,061 WARN  [com.wavefront.daemon.QueuedSshDaemonService] current retry queue sizes: [1/0/0/0]

By default, there are 4 threads (and 4 buffer files) waiting to retry points once the connections are up; this line shows how many blocks of points have been stored by each thread (in this case, the first thread has 1 block of queued points, while the second, third, and fourth threads all have 0 blocks). These lines are only printed when there are points in the queue; you'll never see a line with all 0's in the queue sizes. Once the connection to the Wavefront servers has been established, and all the threads have sent the past data to us, you'll see a single line like this in `wavefront.log`:

    2013-11-18 18:59:46,665 WARN [com.wavefront.daemon.QueuedSshDaemonService] retry queue has been cleared

## Logging

The Wavefront proxy supports two log files: proxy log and blocked point log. To keep the log file sizes reasonable and avoid filling up the disk with logs, both log files are automatically rotated and purged periodically. You configure the log file locations and rotation rules in `<wavefront_config_path>/log4j2.xml`. For details on log4j2 configuration, see [Log4j Configuration](https://logging.apache.org/log4j/2.x/manual/configuration.html).

### Proxy Log

By default, proxy log entries are logged to `<wavefront_log_path>/wavefront.log`. The log file is rolled over every day and when its size reaches 100MB. When there are 31 log files, older files are deleted.

### Blocked Point Log

You can log raw blocked points in a separate log from the proxy log. Logging of blocked points is disabled by default. To enable logging block points, edit the log4j2 configuration file and uncomment the blocked points file appender:

    <!--
        <AppenderRef ref="BlockedPointsFile"/>
    -->

By default, blocked point entries are logged to `<wavefront_log_path>/wavefront-blocked-points.log` and the block point log file is rolled over every day and when its size reaches 100MB. When there are 31 log files, older files are deleted.

<a name="docker"></a>

## Configuring a Proxy in a Container

You can use the in-product Docker with cAdvisor or Kubernetes integration if you want to set up a proxy in a container. You can then customize that proxy.

### Proxy Versions for Containers
For containers, the proxy image version is determined by the `image` property in the configuration file. You can set this to `image: wavefronthq/proxy:latest`, or specify a proxy version explicitly.
The proxies are not stateful. Your configuration is managed in your `yaml` file. It's safe to use  `proxy:latest` -- we ensure that proxies are backward compatible.

### Restricting Memory Usage for the Container

To restrict memory usage of the container using Docker, you need to add a `JAVA_HEAP_USAGE` environment variable and restrict memory using the `-m` or `--memory` options for the docker `run` command.  The container memory contraint should be at least 350mb larger than the JAVA_HEAP_USAGE environment variable.

To restrict a container's memory usage to 2g with Docker run:

```docker run -d --name wavefront-proxy ... -e JAVA_HEAP_USAGE="1650m" -m 2g ...```

To limit memory usage of the container in Kubernetes use the `resources.limits.memory` property of a container definition. See the [Kubernetes doc](https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/)

### Customizing Proxy Settings for Docker

When you run a Wavefront proxy inside a Docker container, you can tweak proxy configuration settings that are properties in the `wavefront.conf` file directly from the Docker `run` command. You use the WAVEFRONT_PROXY_ARGS environment variable and pass in the property name as a long form argument, preceded by `--`.

For example, add `-e WAVEFRONT_PROXY_ARGS="--pushRateLimit 1000"` to your docker `run` command to specify a rate limit of 1000 pps for the proxy.

See the [Wavefront Proxy configuration file](https://github.com/wavefrontHQ/java/blob/master/pkg/etc/wavefront/wavefront-proxy/wavefront.conf.default) for a full list.


<a name="ansible"></a>

## Installing Proxies on Multiple Linux Hosts

Ansible is an open-source automation engine that automates software provisioning, configuration and management, and application deployment. The Wavefront Ansible role installs and configures the Wavefront proxy, which allows you to automate Wavefront proxy installation on multiple Linux hosts.

**Note**: In most cases, you install only one or two proxies in your environment. You don't need a proxy for each host you collect data from. See [Proxy Deployment Options](proxies.html#proxy-deployment-options).

For details, see the Setup tab in the Ansible built-in integration.
