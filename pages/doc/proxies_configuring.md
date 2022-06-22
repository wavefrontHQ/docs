---
title: Advanced Proxy Configuration
keywords:
tags: [proxies]
sidebar: doc_sidebar
permalink: proxies_configuring.html
summary: Proxy files, logs, and configuration properties
---


Even without additional customization the Wavefront proxy ingests metrics and forwards them to the Wavefront service in a secure, fast, and reliable manner. If needed, you can customize your proxy.

* **[Proxy configuration properties](#configuration-properties)** allow you to changing how the proxy processes your data. For example, you can change ports or perform other advanced installation management.
* **[Proxy preprocessor rules](proxies_preprocessor_rules.html)** allow you to manipulate incoming metrics before they reach the proxy, for example, you could remove confidential text strings or replace unacceptable characters.
* **[Log files](#logging)** can help in case of problems.

<a name="paths">
## Proxy File Paths

By default, proxy files are installed in the following locations.

- **Configuration properties**: `<wavefront_config_path>`
  - Linux - `/etc/wavefront/wavefront-proxy`
  - Mac - `/usr/local/etc/wavefront/wavefront-proxy`
  - Windows - `C:\Program Files (x86)\Wavefront\conf`
- **Parse [log data](integrations_log_data.html#configuring-the-wavefront-proxy-to-ingest-log-data)**: `<wavefront_log_path>`
  - Linux - `/var/log/wavefront`
  - Mac - `/usr/local/var/log/wavefront`
  - Windows - `C:\Program Files (x86)\Wavefront`
  - For Docker containers, see [logging info on docs.docker.com](https://docs.docker.com/engine/reference/commandline/logs/).

See [Logging](#logging) for details on log files and content.
- `<wavefront_spool_path>`
  - Linux - `/var/spool/wavefront-proxy`
  - Mac - `/usr/local/var/spool/wavefront-proxy`
  - Windows - `C:\Program Files (x86)\Wavefront\bin`

{% include important.html content="On Windows, _do not_ use **notepad** to edit any configuration files. Use an editor that supports Linux-style line endings, such as **Notepad++** or **EditPlus**."%}

## Data Buffering

If the Wavefront proxy is unable to post received data to the Wavefront servers, it buffers the data to disk across a number of buffer files, and then tries to resend the points once the connection to the Wavefront servers is available again. If this buffering occurs, you'll see lines like this in `wavefront.log`:

```
2013-11-18 18:02:35,061 WARN  [com.wavefront.daemon.QueuedSshDaemonService] current retry queue sizes: [1/0/0/0]
```

By default, there are 4 threads (and 4 buffer files) waiting to retry points once the connections are up; this line shows how many blocks of points have been stored by each thread (in this case, the first thread has 1 block of queued points, while the second, third, and fourth threads all have 0 blocks). These lines are only printed when there are points in the queue; you'll never see a line with all 0's in the queue sizes. Once the connection to the Wavefront servers has been established, and all the threads have sent the past data to us, you'll see a single line like this in `wavefront.log`:

```
2013-11-18 18:59:46,665 WARN [com.wavefront.daemon.QueuedSshDaemonService] retry queue has been cleared
```
{% include note.html content="**Proxy 9.0 and later**:<br/> If you don't want to buffer the data on a file-based storage and if you have an AWS Simple Queue Service (SQS), you can add an SQS for the proxy so that the data is sent to the SQS instead of buffering the data to the local on-disk when there is a data outage or when proxies are backing up. To send data to an AWS SQS, configure the [`sqsBuffer`](#sqsBuffer), [`sqsQueueNameTemplate`](#sqsQueueNameTemplate), [`sqsQueueIdentifier`](#sqsQueueIdentifier), and [`sqsQueueRegion`](#sqsQueueRegion) properties in the `wavefront.conf` file." %}

## Logging

The Wavefront proxy supports two log files: proxy log and blocked point log.

To keep the log file sizes reasonable and avoid filling up the disk with logs, both log files are automatically rotated and purged periodically. Configure the log file locations and rotation rules in `<wavefront_config_path>/log4j2.xml`. For details on log4j2 configuration, see [Log4j Configuration](https://logging.apache.org/log4j/2.x/manual/configuration.html).

If you're using proxies in containers, you can mount the log files, as discussed below.

### Proxy Log

By default, proxy log entries are logged to [`<wavefront_log_path>`](#paths)`/wavefront.log`. The log file is rolled over every day and when its size reaches 100MB. When there are 31 log files, older files are deleted.

If you want to set logs for Jaeger and Zipkin integrations, see [Logging for Jaeger and Zipkin](tracing_integrations.html#enable-logs).

### Blocked Data Log

You can log all the raw blocked data separately or log different entities into their separate log files.

* **Log the block data separately** <br/>
  Follow these steps:
  1. Open the [`<wavefront_config_path>`](#paths)`/log4j2.xml` configuration file.
  2. To log all the block data, uncomment the corresponding section.
      ```
      <AsyncLogger name="RawBlockPoints" level="WARN" additivity="false">
         <AppenderRef ref="BlockedPointsFile" />
      </AsyncLogger>
      ```
  By default, blocked point entries are logged to the `<wavefront_log_path>/wavefront-blocked-points.log` file and the log file is rolled over every day when its size reaches 100MB. When there are 31 log files, older files are deleted. You can customize the configurations to suit your environment.

* **Set up separate log files for blocked entities**<br/>
  Follow these steps:
    1. Uncomment or add the configurations under Appenders and Loggers in the [`<wavefront_config_path>`](#paths)`/log4j2.xml` configuration file.
        ```
          <!-- Log the blocked histograms. If you don't need a separate log file for it,
          don't add this configuration to the file.-->
          <AsyncLogger name="RawBlockedHistograms" level="WARN" additivity="false">
             <AppenderRef ref="[Enter_Your_File_Name]"/>
         </AsyncLogger>

         <!-- Logs the blocked points for spans. If you don't need a separate log file for it,
         don't add this configuration to the file.-->
         <AsyncLogger name="RawBlockedSpans" level="WARN" additivity="false">
             <AppenderRef ref="[Enter_Your_File_Name]"/>
         </AsyncLogger>

         <AsyncLogger name="RawBlockPoints" level="WARN" ADDITIVITY="FALSE"/>
       	   <AppenderRef ref=”BlockedPointsFile”/>
         </AsyncLogger>
        ```
    3. Add the names of the block points, which you uncommented in the `log4j2.xml` file, to the [`<wavefront_config_path>`](#paths)`/wavefront.conf` file.<br/>
        Example:
        ```
          blockedPointsLoggerName = RawBlockedPoints

          # Add this if you added the appender for histograms in the log4j2.xml file.
          blockedHistogramsLoggerName = RawBlockedHistograms (RawBlockedPoints by default)

          # Add this if you added the appender for spans in the log4j2.xml file.
          blockedSpansLoggerName = RawBlockedSpans (RawBlockedPoints by default)
        ```
    {%include tip.html content ="You must update both the `<wavefront_log_path>/log4j2.xml` file and the `<wavefront_config_path>/wavefront.conf` file to get separate log files for blocked entities."%}


    <table style="width: 100%;">
    <tbody>
    <tr><td width="90%">&nbsp;</td><td width="10%"><a href="proxies_configuring.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
    </tbody>
    </table>

<a id="proxy-configuration-properties"></a>
## Configuration Properties

This section gives details on proxy configuration properties. All properties are also listed, in the [wavefront.conf.default file](https://github.com/wavefrontHQ/wavefront-proxy/blob/master/pkg/etc/wavefront/wavefront-proxy/wavefront.conf.default) on Github. 


### General Configuration Properties

<table style="width: 100%;">
<thead>
<tr>
<th width="10%">Property</th>
<th width="50%">Purpose</th>
<th width="30%">Format and Example </th>
<th width="10%">Since</th>
</tr>
</thead>
<tbody>
<tr>
<td>agentMetricsPointTags</td>
<td>Point tags and their values to be passed along with <code>~agent./</code> metrics. <br/>Default: None.</td>
<td>Comma-separated list of key-value pairs.<br/>
Ex: dc=west,env=prod</td>
<td>3.24</td>
</tr>
<tr>
<td>block </td>
<td>Regex pattern (java.util.regex) that input lines must match to be filtered out. Input lines are checked against the pattern as they come in and before the prefix is prepended. Renamed from <strong>blackListRegex</strong> to <strong>block</strong> in proxy 9.x. <br> <br> Use preprocessor rules for finer-grained control.</td>
<td>Valid regex pattern.<br/>
Ex: Filter out points that begin with qa., development., or test.:
^(qa|development|test).</td>
<td>3.1/9.x</td>
</tr>
<tr>
<td>blockedPointsLoggerName </td>
<td>Controls how the blocked points are logged. For details, see <a href="#blocked-data-log">Blocked Data Log</a>. <br/>Default: RawBlockedPoints. </td>
<td>Logger name for blocked points.<br/>
Ex: RawBlockedPoints</td>
<td>6.0</td>
</tr>
<tr>
<td>blockedHistogramsLoggerName </td>
<td>Controls how the blocked histograms are logged. For details, see <a href="#blocked-data-log">Blocked Data Log</a>. <br/>Default: RawBlockedPoints. </td>
<td>Logger name for blocked points.<br/>
Ex: RawBlockedPoints</td>
<td>6.0</td>
</tr>
<tr>
<td>blockedSpansLoggerName </td>
<td>Controls how the blocked spans are logged. For details, see <a href="#blocked-data-log">Blocked Data Log</a>. <br/>Default: RawBlockedPoints. </td>
<td>Logger name for blocked points.<br/>
Ex: RawBlockedPoints</td>
<td>6.0</td>
</tr>
<tr>
<td>buffer</td>
<td>Location of buffer files for saving failed transmissions for retry.</td>
<td>Valid path on the local file system.<br/>
Ex: &lt;wf_spool_path&gt;/buffer</td>
<td>The start</td>
</tr>
<tr>
<td>customSourceTags</td>
<td>Point tag keys to use as 'source' if no 'source' or 'host' field is present. <br/>Default: fqdn, hostname.</td>
<td>Comma-separated list of point tag keys.<br/>
Ex: fqdn, hostname</td>
<td>3.14</td>
</tr>
<tr>
<td>dataPrefillCutoffHours</td>
<td>Defines the cut-off point for what is considered a valid timestamp for pre-dated points.
Default (and recommended) value is 24 (1 day), so all the data points from more than 1 day in future are rejected.</td>
<td>Positive integer.<br/>
Ex: 12</td>
<td>4.1</td>
</tr>
<tr>
<td>dataBackfillCutoffHours</td>
<td>The cut-off point for what is considered a valid timestamp for back-dated points. We do not recommend setting this value larger than 1 year unless backfilling or migrating historic data. <br/>Default: 8760 (1 year), so all points older than 1 year are rejected.</td>
<td>Positive integer.<br/>
Ex: 8760</td>
<td>4.1</td>
</tr>
<tr>
<td>deltaCountersAggregationListenerPorts</td>
<td>Port to listen for <a href="delta_counters.html">delta counter data</a>. Other data formats are rejected at this port. Pre-aggregating delta counters at the proxy, helps reduce the outbound point rate. Use this property in conjunction with deltaCountersAggregationIntervalSeconds to limit the number of points per second for delta counters. <br/>Default: none.</td>
<td>Comma-separated list of available port numbers. Can be a single port.<br/>
Ex: 12878<br/>
Ex: 12878,12879</td>
<td>6.0</td>
</tr>
<tr>
<td>deltaCountersAggregationIntervalSeconds</td>
<td>Interval between flushing aggregating delta counters to a Wavefront service. Use this property in conjunction with deltaCountersAggregationListenerPorts to send points to the port(s) in batches, thereby limiting the number of points per second. <br/>Default: 30 seconds. </td>
<td>Number of seconds.<br/>
Ex: 45</td>
<td>6.0</td>
</tr>
<tr>
<td>fileBeatPort</td>
<td>TCP port to listen on for Filebeat data. <br/>Default: none.</td>
<td>A port number.<br/>
Ex: 5044 </td>
<td>4.1</td>
</tr>
<tr>
<td>flushThreads</td>
<td>Number of threads that flush data to the server. Setting this value too high results in sending batches that are too small to the Wavefront service and wasting connections. Values between 6 and 16 are a good starting point. This setting is per listening port. <br/>Default: The number of available processors (min 4).</td>
<td>Positive integer.<br/>
Ex: 16</td>
<td>3.14</td>
</tr>
<tr>
<td>graphiteDelimiters</td>
<td>Characters that should be replaced by dots, in case they were escaped within Graphite and collectd before sending. A common delimiter is the underscore character; so if you extract a hostname field with the value <code>web04_www</code>, it is changed to <code>web04.www</code>.</td>
<td>A concatenation of delimiter characters, without any separators.</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>graphiteFormat</td>
<td>Indexes of fields within Graphite and collectd metric names that correspond to a hostname. For example, if your metrics have the format: collectd.prod.www04.cpu.loadavg.1m, specify the 3rd and 2nd indexes (www04.prod) to be extracted and treated as the hostname. The remainder collectd.cpu.loadavg.1m is treated as the metric name.</td>
<td>Comma-separated list of indexes.<br/>
Ex: 4, 2, 5
Ex: 3 </td>
<td>&nbsp;</td>
</tr>
<tr>
<td>graphitePorts</td>
<td>TCP ports to listen on for Graphite data. Define which of the segments in your Graphite metrics map to a hostname in the graphiteFormat property. Default: None.</td>
<td>Comma-separated list of available port numbers. Can be a single port.<br/>
Ex: 2003<br/>
Ex: 2003, 2004 </td>
<td>&nbsp;</td>
</tr>
<tr>
<td>gzipCompression</td>
<td>If set to true, metric traffic from the proxy to the Wavefront endpoint is gzip-compressed. <br/> Default: true.</td>
<td>true or false<br/>
Ex: true</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>gzipCompressionLevel</td>
<td>Sets the gzip compression level if gzipCompression is enabled. The level vary from, 1 to 9. Higher compression levels slightly reduces the volume of traffic between the proxy and the Wavefront service, but uses more CPU.  <br/> Default: 4.</td>
<td>Positive integer ranging from 1 to 9.<br/>
Ex: 4</td>
<td>6.0</td>
</tr>
<tr>
<td markdown="span">Histogram configuration properties</td>
<td>
Properties specific to histogram distributions, listed in a <a href="#histogram-configuration-properties">separate table below</a>.
</td>
<td></td>
<td>4.31 </td>
</tr>
<tr>
<td>hostname</td>
<td>A name unique across your account representing the machine that the proxy is running on. The hostname is not used to tag your metrics; rather, it's used to tag proxy metrics, such as JVM statistics, per-proxy point rates, and so on.</td>
<td>A string containing alphanumeric characters and periods.</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>httpConnectTimeout</td>
<td>HTTP connect timeout (in milliseconds). <br/>Default: 5000 (5s).</td>
<td>Positive integer.
<div>Ex: 5000 </div></td>
<td>4.1</td>
</tr>
<tr>
<td>httpRequestTimeout</td>
<td>HTTP request timeout (in milliseconds). We do not recommend setting this value to be higher than 20000. Recommended value for most configurations is 10000 (10 seconds). <br/>Default: 10000 (10s).</td>
<td>Positive integer.
<div>Ex: 10000 </div></td>
<td>4.1</td>
</tr>
<tr>
<td>httpMaxConnTotal</td>
<td>Max number of total connections to keep open.<br/>Default: 200</td>
<td>Positive integer.
<div>Ex: 100 </div></td>
<td> </td>
</tr>
<tr>
<td>httpMaxConnPerRoute</td>
<td>Max number of connections per route to keep open.<br/>Default: 100.</td>
<td>Positive integer.
<div>Ex: 50</div></td>
<td> </td>
</tr>
<tr>
<td>httpUserAgent</td>
<td>Override User-Agent in request headers. Can help bypass excessively restrictive filters on the HTTP proxy. Default user agent: Wavefront-Proxy/&lt;version&gt;.</td>
<td>A string.
<div>Ex: 'Mozilla/5.0' </div></td>
<td>4.1</td>
</tr>
<tr>
<td>idFile</td>
<td>Location of the PID file for the wavefront-proxy process. <br/>Default: &lt;dshell&gt;/.id</td>
<td>Valid path on the local file system. This option is ignored when ephemeral=true.</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>jsonListenerPorts</td>
<td>TCP ports to listen on for incoming JSON-formatted metrics. <br/>Default: None.</td>
<td>Comma-separated list of available port numbers. Can be a single port.</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>listenerIdleConnectionTimeout</td>
<td>Close idle inbound connections after specified time in seconds. <br/>Default: 300
</td>
<td>Number of seconds.</td>
<td>4.31</td>
</tr>
<tr>
<td>logsIngestionConfigFile</td>
<td>The file containing instructions for parsing log data into metrics.  See <a href="integrations_log_data.html">Log Data Metrics Integration</a>.
Default: &lt;cfg_path&gt;/logsIngestion.yaml.</td>
<td>Valid path on the local file system.</td>
<td>4.1</td>
</tr>
<tr>
<td>opentsdbPorts</td>
<td>TCP ports to listen on for incoming OpenTSDB-formatted data. <br/>Default: None.</td>
<td>Comma-separated list of available port numbers. Can be a single port.
<div>Ex: 4242 </div></td>
<td>3.1</td>
</tr>
<tr>
<td>picklePorts</td>
<td>TCP ports to listen on for incoming data in Graphite pickle format (from carbon-relay). <br/>Default: None.</td>
<td>Comma-separated list of available port numbers. Can be a single port.
<div>Ex: 5878 </div></td>
<td>3.20</td>
</tr>
<tr>
<td>prefix</td>
<td>String to prepend before every metric name. For example, if you set prefix to 'production', a metric that is sent to the proxy as <code>cpu.loadavg.1m</code> is sent from the proxy to the Wavefront service as <code>production.cpu.loadavg.1m</code>. You can include longer prefixes such as <code>production.nyc.dc1</code>. <br/>Default: None.</td>
<td>A lowercase alphanumeric string, with periods separating segments. You do not need to include a trailing period.
<div>Ex: production</div>
<div>Ex: production.nyc.dc1</div>
</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>preprocessorConfigFile</td>
<td>Path to the optional preprocessor config file containing <a href="proxies_preprocessor_rules.html">preprocessor rules</a> for filtering and rewriting metrics. <br/>Default: None.</td>
<td>Valid path on the local file system.
<div>Ex: &lt;cfg_path&gt;/rules.yaml</div></td>
<td>4.1</td>
</tr>
<tr>
<td markdown="span">privateKeyPath</td>
<td markdown="span">Path to PKCS#8 private key file in PEM format. Incoming TLS/SSL connections access this private key. </td>
<td> </td>
<td>8.0</td>
</tr>
<tr>
<td markdown="span">privateCertPath</td>
<td markdown="span">Path to X.509 certificate chain file in PEM format. Incoming TLS/SSL connections access this certificate. </td>
<td> </td>
<td>8.0</td>
</tr>
<tr>
<td>proxyHost</td>
<td>HTTP proxy host to be used in configurations when direct HTTP connections to Wavefront instances are not possible. Must be used with proxyPort.</td>
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
<td>HTTP proxy port to be used in configurations when direct HTTP connections to Wavefront instances are not possible. Must be used with proxyHost.</td>
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
<td>Number of blocked points to print to the log immediately following each summary line (every 10 flushes). If 0, print none. If you see a non-zero number of blocked points in the summary lines and want to debug what that data is, set this property to 5. <br/>Default: 5
{% include note.html content="Defaults to 5 since version 5.0. Before version 5.0 it defaulted to 0." %}
</td>
<td>0 or a positive integer.
<div>Ex: 5 </div></td>
<td>&nbsp;</td>
</tr>
<tr>
<td>pushFlushInterval</td>
<td>Milliseconds to wait between each flush. <br/>Default: 1000.</td>
<td>An integer equal to or greater than 1000.
<div>Ex: 1000 </div></td>
<td>&nbsp;</td>
</tr>
<tr>
<td>pushFlushMaxPoints</td>
<td>Maximum number of points to send to the Wavefront service during each flush. <br/>Default: 40,000.</td>
<td>Positive integer.
<div>Ex: 40000 </div></td>
<td>&nbsp;</td>
</tr>
<tr>
<td>pushFlushMaxHistograms</td>
<td>Maximum number of histograms to send to the Wavefront service during each flush. <br/>Default: 10,000.</td>
<td>Positive integer.
<div>Ex: 10000 </div></td>
<td>6.0</td>
</tr>
<tr>
<td>pushFlushMaxSpans</td>
<td>Maximum number of spans to send to the Wavefront service during each flush. <br/>Default: 5,000.</td>
<td>Positive integer.
<div>Ex: 5000 </div></td>
<td>6.0</td>
</tr>
<tr>
<td>pushFlushMaxSpanLogs</td>
<td>Maximum number of span logs to send to the Wavefront service during each flush. <br/>Default: 1,000.</td>
<td>Positive integer.
<div>Ex: 1000 </div></td>
<td>6.0</td>
</tr>
<tr>
<td>pushListenerHttpBufferSize</td>
<td>Maximum allowed request size (in bytes) for incoming HTTP requests on Wavefront, OpenTSDB, or Graphite ports. <br/>Default: 16777216 (16MB).
</td>
<td>Ex: 8388608</td>
<td>4.31</td>
</tr>
<tr>
<td>pushListenerMaxReceivedLength</td>
<td>Maximum line length for received points in plaintext format on Wavefront, OpenTSDB, or Graphite ports. <br/>Default: 32KB</td>
<td>Positive integer.
<div>Ex: 4096 </div></td>
<td>4.31</td>
</tr>
<tr>
<td>pushListenerPorts</td>
<td markdown="span">Port to listen on for incoming data.  A single port definition can accept both HTTP and TCP data.  For HTTP data, make a POST to this proxy port with an empty header, and the line terminated [data format](wavefront_data_format.html). If you want to use HTTPS/TLS, set the tlsPort, privateKeyPath, and privateCertPath as well.  <br/>Default: 2878.</td>
<td>Comma-separated list of available port numbers. Can be a single port.
<div>Ex: 2878</div>
<div>Ex: 2878,2879,2880</div></td>
<td>&nbsp;</td>
</tr>
<tr>
<td>pushLogLevel</td>
<td>Frequency to print status information on the data flow to the log. SUMMARY prints a line every 60 flushes, while DETAILED prints a line on each flush.
{% include warning.html content="This configuration was deprecated in version 6.0. The level of logging is controlled through log4j2 configurations." %}
</td>
<td>None, SUMMARY, or DETAILED
<div>Ex: SUMMARY </div></td>
<td>Before 6.0.</td>
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
<td>Maximum number of points per second to send. <br/>Default: unlimited.</td>
<td>Positive integer.
<div>Ex: 20000</div></td>
<td>4.1</td>
</tr>
<tr>
<td>pushRateLimitHistograms</td>
<td>Maximum number of histograms per second to send. <br/>Default: unlimited.</td>
<td>Positive integer.
<div>Ex: 20000</div></td>
<td>6.0</td>
</tr>
<tr>
<td>pushRateLimitSpans</td>
<td>Maximum number of spans per second to send. <br/>Default: unlimited.</td>
<td>Positive integer.
<div>Ex: 10000</div></td>
<td>6.0</td>
</tr>
<tr>
<td>pushRateLimitSpanLogs</td>
<td>Maximum number of span logs per second to send. <br/>Default: unlimited.</td>
<td>Positive integer.
<div>Ex: 10000</div></td>
<td>6.0</td>
</tr>
<tr>
<td>pushRateLimitMaxBurstSeconds</td>
<td>Max number of burst seconds to allow when rate limiting to smooth out uneven traffic. Set to 1 when doing data backfills.<br/>Default: 10</td>
<td>Positive integer.
<div>Ex: 20</div></td>
<td> </td>
</tr>
<tr>
<td>pushRelayListenerPorts</td>
<td>Ports to receive the data sent to the relay. In environments where direct outbound connections to the Wavefront instance is not possible, you can use another Wavefront proxy that has outbound access to act as a relay and forward all the data received on that endpoint (from direct data ingestion clients and/or other proxies) to a Wavefront instance. <br/>Default: none.</td>
<td>Comma-separated list of available port numbers. Can be a single port.
Ex: 2978<br/>
Ex: 2978,2979</td>
<td>6.0</td>
</tr>
<tr>
<td>pushRelayHistogramAggregator</td>
<td>If set to true, aggregates the histogram distributions received on the relay port. <br/>Default: false.</td>
<td>true or false
<div>Ex: true</div></td>
<td>6.0</td>
</tr>
<tr>
<td>pushValidationLevel</td>
<td>Level of validation to perform on incoming data before sending the data to the Wavefront service. If NO_VALIDATION, all data is sent forward. If NUMERIC_ONLY, data is checked to make sure that it is numerical and dropped locally if it is not.</td>
<td>NUMERIC_ONLY or NO_VALIDATION
<div>Ex: NUMERIC_ONLY </div></td>
<td>&nbsp;</td>
</tr>
<tr>
<td>rawLogsMaxReceivedLength</td>
<td>Maximum line length for received raw logs. <br/>Default: 4096.
</td>
<td>Positive integer.
<div>Ex: 4096 </div></td>
<td>4.31</td>
</tr>
<tr>
<td>rawLogsPort</td>
<td>TCP port to listen on for log data. <br/>Default: none.</td>
<td>A port number.
<div>Ex: 5045 </div></td>
<td>4.4</td>
</tr>
<tr>
<td>retryBackoffBaseSeconds</td>
<td>For exponential back-off when retry threads are throttled, the base (a in a^b) in seconds. <br/>Default: 2.0.</td>
<td>Positive number, integer or decimal.
<div>Ex: 2.0 </div></td>
<td>&nbsp;</td></tr>
<tr>
<td>retryThreads</td>
<td>Number of threads retrying failed transmissions. If no value is specified, defaults to the number of processor cores available to the host or 4, whichever is greater. Every retry thread uses a separate buffer file (capped at 2GB) to persist queued data points, so the number of threads controls the maximum amount of space that the proxy can use to buffer points locally.
{% include warning.html content="This configuration was deprecated in version 6.0 because we redesigned the storage engine to improve spooling data to disk." %}
</td>
<td>Positive integer.
<div>Ex: 4 </div>  </td>
<td>Before 6.0.</td>
</tr>
<tr>
<td>server</td>
<td>The API URL of the Wavefront instance in the format https://&lt;wf_instance&gt;.wavefront.com/api/.</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>soLingerTime</td>
<td>Enable SO_LINGER with the specified linger time in seconds. Set this value to 0 when running in a high-availability configuration under a load balancer. <br/>Default: -1 (disabled). </td>
<td><div>0 or a positive integer.</div>
Ex: 0 </td>
<td>4.1</td>
</tr>
<tr>
<td>splitPushWhenRateLimited</td>
<td>Whether to split the push batch size when the push is rejected due to rate limit. <br/>Default: false.</td>
<td>true or false
<div>Ex: false </div></td>
<td>&nbsp;</td>
</tr>
<tr>
<td markdown="span">tlsPorts</td>
<td markdown="span">Comma-separated list of ports to be used for incoming TLS/SSL connections. To set up a port to use TLS/SSL, you specify pushListenerPorts, tlsPorts, privateKeyPath, and privateCertPath. </td>
<td> </td>
<td>8.0</td>
</tr>
<tr>
<td>allow</td>
<td>Regex pattern (java.util.regex). Input lines are checked against the pattern as they come in and before the prefix is prepended. Only input lines that match are accepted. Renamed from <strong>whiteListRegex</strong> to <strong>allow</strong> in proxy 9.x. <br> <br> Use preprocessor rules for finer-grained control. </td>
<td>Valid regex pattern.
<div>Ex: ^(production|stage). </div>
<div>Allows points that begin with production. and stage. </div></td>
<td>3.1</td>
</tr>
<tr>
<td>writeHttpJsonListenerPorts</td>
<td>Ports to listen on for incoming data from the collected write_http plugin. <br/>Default: None.</td>
<td>Comma-separated list of available port numbers. Can be a single port.
<div>Ex: 4878 </div></td>
<td>3.14</td>
</tr>
<tr>
<td>rawLogsHttpBufferSize</td>
<td>The maximum request size (in bytes) for incoming HTTP requests with tracing data. <br/>Default: 16MB</td>
<td>Buffer size in bytes. <br/> Ex: 16777216 </td>
<td>4.38</td>
</tr>
<tr>
<td>trafficShaping</td>
<td>Enables intelligent traffic shaping based on the data receive rate over the last 5 minutes. <br/>Default: false</td>
<td>true or false</td>
<td>9.0</td>
</tr>
<tr>
<td>trafficShapingQuantile</td>
<td>Sets the quantile for traffic shaping.
<br/> Default: 75</td>
<td> An integer <br/>Ex: 99 <br/>The 99th percentile of the received rate in the last 5 minutes, will be used as a basis for the rate limiter.
</td>
<td>9.0</td>
</tr>
<tr>
<td>trafficShapingHeadroom</td>
<td>
Sets the headroom multiplier for traffic shaping when there's backlog.
<br/>Default: 1.15 (15% headroom)
</td>
<td>Number from 1.0 to 1.99 <br/>Ex: 1.05 (5% headroom) <a name="sqsBuffer"></a></td>
<td>9.0</td>
</tr>
<tr>
<td>sqsBuffer </td>
<td>Use AWS SQS for buffering transmissions.
 <br/>Default: false</td>
<td>true or false <a name="sqsQueueNameTemplate"></a></td>
<td>9.0</td>
</tr>
<tr>
<td>sqsQueueNameTemplate</td>
<td>The replacement pattern for naming the SQS queues.</td>
<td>Ex: <code>wf-proxy-&#123;&#123;id&#125;&#125;-&#123;&#123;entity&#125;&#125;-&#123;&#123;port&#125;&#125;</code> results in a queue named <code>wf-proxy-id-points-2878</code>  <a name="sqsQueueIdentifier"></a></td>
<td>9.0</td>
</tr>
<tr>
<td>sqsQueueIdentifier</td>
<td>An identifier for identifying the proxies in SQS.</td>
<td>A string <br/> Ex: wavefront <a name="sqsQueueRegion"></a></td>
<td>9.0</td>
</tr>
<tr>
<td>sqsQueueRegion</td>
<td>The AWS Region name the queue lives in.</td>
<td>A string <br/>Ex: us-west-2 </td>
<td>9.0</td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="proxies_configuring.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

### Authentication Proxy Properties

Because the proxy is running in your local network by default, communication **to** the proxy is un-authenticated. If you want to authenticate inbound traffic to the proxy, use the settings in this section.

The Wavefront proxy must authenticate outbound traffic to the Wavefront service. See [Authenticate Incoming HTTP Requests at the Proxy](proxies_configuring.html#authenticate-incoming-http-requests-at-the-proxy) for step-by-step instructions.

<table style="width: 100%;">
<tbody>
<thead>
<tr>
<th width="30%">Property</th>
<th width="50%">Purpose</th>
<th width="20%">Format and Example </th>
</tr>
</thead>
<tr>
<td>authMethod</td>
<td>Authentication is done by a token. Specify the tokens either in the query string ("token=" and "api_key=" parameters) or in the request headers ("X-AUTH-TOKEN: ", "Authorization: Bearer", "Authorization: " headers). TCP streams are disabled when authentication is turned on. <br/>Default: NONE.</td>
<td>Allowed authMethod: NONE, STATIC_TOKEN, HTTP_GET, OAUTH2.<br/>
Ex: OAUTH2</td>
</tr>
<tr>
<td>authTokenIntrospectionServiceUrl</td>
<td>URL for the token introspection endpoint used to validate tokens for incoming HTTP requests (for example, <code>authTokenIntrospectionServiceUrl = https://auth.acme.de/api/token/&lt;token&gt;/validate</code>).

Required when authMethod is OAUTH2 or HTTP_GET <br/>Default: None.</td>
<td>Valid URL</td>
</tr>
<tr>
<td>authTokenIntrospectionAuthorizationHeader</td>
<td>Optional credentials for use with the token introspection endpoint if the endpoint requires authentication. For example:<br/>
<code>authTokenIntrospectionAuthorizationHeader=
Authorization: Bearer &lt;token&gt;</code></td>
<td> <br/></td>
</tr>
<tr>
<td>authResponseRefreshInterval </td>
<td>Cache TTL (in seconds) for token validation results (re-authenticate when expired). <br/>Default: 600 seconds.</td>
<td>Integer<br/>
Ex: 1200</td>
</tr>
<tr>
<td>authResponseMaxTtl </td>
<td>Maximum allowed cache TTL (in seconds) for token validation results when the token introspection service is unavailable.<br/>Default: 86400 seconds (1 day).</td>
<td>Integer<br/>
Ex: 3600</td>
</tr>
<tr>
<td>authStaticToken </td>
<td>Static token that is considered valid for all incoming HTTP requests. <br />
Required when authMethod = STATIC_TOKEN. For example, <code>authStaticToken=token1234abcd</code><br/>Default: None </td>
<td>Valid token<br/>
</td>
</tr>
</tbody>
</table>

### OpenTelemetry Proxy Properties

<table style="width: 100%;">
<thead>
<tr>
<th width="27%">Property</th>
<th width="43%">Purpose</th>
<th width="30%">Format /Example </th>
</tr>
</thead>
<tbody>
<tr>
<a name="otlpGrpcListenerPorts"></a>
<td>otlpGrpcListenerPorts</td>
<td markdown="span">Ports to receive OpenTelemetry Protobuf data over gRPC.
<br/> Default: None.
<br/> Version: Since 11.0</td>
<td> Comma-separated list of available port numbers. Can be a single port.
<br/>Recommended: 4317</td>
</tr>
<tr>
<a name="otlpHttpListenerPorts"></a>
<td>otlpHttpListenerPorts</td>
<td markdown="span">Ports to receive OpenTelemetry Protobuf data over HTTP.
<br/> Default: None.
<br/> Version: Since 11.0</td>
<td> Comma-separated list of available port numbers. Can be a single port.
<br/> Recommended: 4318</td>
</tr>
<tr>
<a name=“otlpResourceAttrsOnMetricsIncluded”></a>
<td>otlpResourceAttrsOnMetricsIncluded</td>
<td markdown="span">Set the value to `true` to receive the OpenTelemetry resource attributes that your application sends for metrics data.
<br/>Default: false
<br/> Version: Since 11.2</td>
<td>true or false</td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="proxies_configuring.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

### Tracing Proxy Properties

<table style="width: 100%;">
<thead>
<tr>
<th width="20%">Property</th>
<th width="50%">Purpose</th>
<th width="30%">Format /Example </th>
</tr>
</thead>
<tbody>
<tr>
<td>traceAlwaysSampleErrors</td>
<td>Always sample spans with an error tag ignoring other sampling configuration.
<br/>Default: true</td>
<td>true or false
<div>Ex: false </div></td></tr>
<tr>
<a name="traceJaegerHttpListenerPorts"></a>
<td>traceJaegerHttpListenerPorts</td>
<td markdown="span">TCP ports to receive Jaeger Thrift formatted data via HTTP. The data is then sent to the Wavefront service in [Wavefront span format](trace_data_details.html#wavefront-span-format).
<br/> Default: None.
<br/> Version: Since 6.0</td>
<td>Comma-separated list of available port numbers. Can be a single port.</td>
</tr>
<tr>
<td>traceJaegerListenerPorts</td>
<td>TCP ports to receive Jaeger Thrift formatted data via TChannel. The data is then sent to Wavefront service in <a href="trace_data_details.html#wavefront-span-format">Wavefront span format</a>. <br/> Default: None.
{% include warning.html content="<br/>Sending data via TChannel has been deprecated in Jaeger 1.16. Therefore, we recommend using <code>traceJaegerHttpListenerPorts</code> to receive Jaeger Thrift formatted data via HTTP." %}
</td>
<td>Comma-separated list of available port numbers. Can be a single port.</td>
</tr>
<tr>
<a name="traceJaegerHttpListenerPorts"></a>
<td>traceJaegerGrpcListenerPorts</td>
<td markdown="span">Ports to receive Jaeger Protobuf formatted data over gRPC.
<br/> Default: None.
<br/> Version: Since 9.0</td>
<td>Comma-separated list of available port numbers. Can be a single port.</td>
</tr>
<tr>
<td>customTracingListenerPorts</td>
<td>TCP ports to receive spans and derive RED metrics from the <a href="wavefront_sdks.html#sdks-for-sending-raw-data">SDKs that send raw data to the Wavefront service</a>.
<br/> Default: None.
<br/> Version: Since 6.0
{% include note.html content="<br/>The application name and service name tags are required to generate RED metrics. If these tags are not sent with your span, the application name defaults to <code>wfProxy</code>, and the service name defaults to <code>defaultService</code>."%}
</td>
<td>Comma-separated list of available port numbers. Can be a single port.</td>
<a name="customTracingListenerPorts"></a>
</tr>
<tr>
<td>traceListenerMaxReceivedLength</td>
<td>Maximum line length for received spans and span logs.
<br/>Default: 1MB</td>
<td>Integer
<div>Ex: 1048576</div></td></tr>
<tr>
<td>traceListenerPorts</td>
<td markdown="span">TCP ports that listen to incoming [spans](tracing_basics.html) from the Wavefront SDKs that [collect trace data](wavefront_sdks.html#sdks-for-collecting-trace-data), [collect metrics and histograms](wavefront_sdks.html#sdks-for-collecting-metrics-and-histograms), and [SDKs for sending raw data](wavefront_sdks.html#sdks-for-sending-raw-data). <br/> Default: None.</td>
<td>Comma-separated list of available port numbers. Can be a single port.
<div>Ex: 2878</div>
<div>Ex: 2878, 2879</div></td>
</tr>
<tr>
<td>traceSamplingDuration</td>
<td markdown="span">Minimum duration of the tracing spans that can be sent to the Wavefront service for [trace data sampling](trace_data_sampling.html). <br/> Default: 0 (send all generated spans). </td>
<td>Number of milliseconds.
<div>Ex: 45</div> </td>
</tr>
<tr>
<td>traceSamplingRate</td>
<td markdown="span">Percentage of all generated spans to send to the Wavefront service for [trace data sampling](trace_data_sampling.html). <br/> Default: 1.0 (send all generated spans). </td>
<td>Number from 0.0 to 1.0.
<div>Ex: .1</div></td>
</tr>
<tr>
<td>traceZipkinListenerPorts</td>
<td>TCP ports to listen on for Zipkin formatted data. Recommended: The default Zipkin Collector port (9411). <br/> Default: None.</td>
<td>Comma-separated list of available port numbers. Can be a single port.</td>
</tr>
<tr>
<td>customTracingApplicationName</td>
<td>Custom application name for spans received on the customTracingListenerPorts that don't have the application tag.
<br/> Default: defaultApp.
<br/> Version: Since 9.0</td>
<td>customTracingApplicationName=MyApplication</td>
</tr>
<tr>
<td>customTracingServiceName</td>
<td>Custom service name for spans received on the customTracingListenerPorts that don't have the service tag.
<br/> Default: defaultService.
<br/> Version: Since 9.0</td>
<td>customTracingServiceName=MyService</td>
</tr>
<tr>
<td>traceJaegerApplicationName</td>
<td>Custom application name for traces received on Jaeger's traceJaegerListenerPorts or traceJaegerHttpListenerPorts.</td>
<td>traceJaegerApplicationName=MyJaegerDemo</td>
</tr>
<tr>
<td>traceZipkinApplicationName</td>
<td>Custom application name for traces received on Zipkin's traceZipkinListenerPorts.</td>
<td>traceZipkinApplicationName=MyZipkinDemo</td>
</tr>
<tr>
<td>traceDerivedCustomTagKeys</td>
<td>Comma separated list of custom tag keys to include as metric tags for the derived RED (Request, Error, Duration) metrics. Applicable to Jaeger and Zipkin integration only.</td>
<td>traceDerivedCustomTagKeys=tenant, env, location</td>
</tr>
<tr>
<td>traceListenerHttpBufferSize</td>
<td>The maximum request size (in bytes) for incoming HTTP requests with tracing data. <br/>Default: 16MB</td>
<td>Buffer size in bytes. <br/> Ex: 16777216 </td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="proxies_configuring.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

### Histogram Configuration Properties

Tanzu Observability by Wavefront supports additional histogram configuration properties, shown in the following table. The **requirements** on the state directory and the effect of the two `persist` properties listed at the bottom of the table.

<table class="width:100%;">
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="34%" /></colgroup>
<thead>
<tr><th>Property</th><th>Description</th><th>Format</th></tr>
</thead>
<tbody>

<tr>
<td>histogramAccumulatorResolveInterval</td>
<td>Interval in milliseconds to write back accumulation changes from memory cache to disk. Only applicable when memory cache is enabled. Increasing this setting reduces storage IO pressure but might increase heap memory use. Default: 100.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramAccumulatorFlushInterval</td>
<td>Interval in milliseconds to check for histograms to be sent to a Wavefront service according to their histogramMinuteFlushSecs settings. Default: 1000.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramAccumulatorFlushMaxBatchSize</td>
<td>Max number of histograms to move to the outbound queue in one flush. Default: no limit.</td>
<td>Positive integer.</td>
</tr>

<tr>
<td>histogramDayAccumulators</td>
<td>Number of accumulators per day port. In high traffic environments we recommend that the total number of accumulators per proxy across all utilized ports does not exceed the number of available CPU cores. Default: 2.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramDayAccumulatorSize</td>
<td>Expected upper bound of concurrent accumulations: ~ #time series * #parallel reporting bins. Default: 100000.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramDayAccumulatorPersisted</td>
<td>Whether to persist accumulation state. If true, all histograms are written to disk immediately if memory cache is disabled, or every histogramAccumulatorResolveInterval seconds if memory cache is enabled. If false, up to histogramMinuteFlushSecs seconds worth of histograms may be lost on proxy shutdown. </td>
<td>Boolean. <br/>Ex: false</td>
</tr>
<tr>
<td>histogramDayAvgDigestBytes</td>
<td>Average number of bytes in an encoded distribution/accumulation. Default: 32 + histogramDayCompression * 7</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramDayAvgKeyBytes</td>
<td>Average number of bytes in a UTF-8 encoded histogram key. Concatenation of metric, source, and point tags. Default: 150.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramDayCompression</td>
<td>A bound on the number of centroids per histogram. Default: 100.</td>
<td markdown="span">Positive integer in the interval [20;1000].</td>
</tr>
<tr>
<td>histogramDayFlushSecs</td>
<td>Time-to-live, in seconds, for a day granularity accumulation on the proxy (before the intermediary is sent to the Wavefront service). Default: 18000 (5 hours).
</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramDayListenerPorts</td>
<td>TCP ports to listen on for histograms to be aggregated by day. Default: 40003.</td>
<td>Comma-separated list of ports.</td>
</tr>
<tr>
<td>histogramDayMemoryCache</td>
<td>Enabling memory cache reduces I/O load with fewer time series and higher frequency data (more than 1 point per second per time series). Default: false.</td>
<td>Boolean.</td>
</tr>
<tr>
<td>histogramDistAccumulators</td>
<td>Number of accumulators per distribution port. In high traffic environments we recommend that the total number of accumulators per proxy across all utilized ports does not exceed the number of available CPU cores. Default: number of available CPU cores. </td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramDistAccumulatorPersisted</td>
<td>Whether to persist accumulation state. If true, all histograms are written to disk immediately if memory cache is disabled, or every histogramAccumulatorResolveInterval seconds if memory cache is enabled. If false, up to histogramMinuteFlushSecs seconds worth of histograms may be lost on proxy shutdown. </td>
<td>Boolean. <br/>Ex: false</td>
</tr>
<tr>
<td>histogramDistAccumulatorSize</td>
<td>Expected upper bound of concurrent accumulations: ~ #time series * #parallel reporting bins. Default: 100000.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramDistAvgDigestBytes</td>
<td>Average number of bytes in an encoded distribution/accumulation. Default: 32 + histogramDistCompression * 7</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramDistCompression</td>
<td>A bound on the number of centroids per histogram. Default: 100.</td>
<td markdown="span">Positive integer in the interval [20;1000].</td>
</tr>
<tr>
<td>histogramDistFlushSecs</td>
<td>Number of seconds to keep a new distribution bin open for new samples, before the intermediary is sent to the Wavefront service. Default: 70.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramDistListenerPorts</td>
<td>TCP ports to listen on for ingesting histogram distributions. Default: 40000.</td>
<td>Comma-separated list of ports. Can be a single port.</td>
</tr>
<tr>
<td>histogramDistMemoryCache</td>
<td>Enabling memory cache reduces I/O load with fewer time series and higher frequency data (Aggregating more than 1 distribution per second per time series). Default: false.</td>
<td>Boolean.</td>
</tr>
<tr>
<td>histogramDistAvgKeyBytes</td>
<td>Average number of bytes in a UTF-8 encoded histogram key. Concatenation of metric, source, and point tags. Default: 150.</td>
<td>Positive integer.</td>
</tr>

<tr>
<td>histogramHttpBufferSize</td>
<td>Since 4.40. The maximum request size (in bytes) for incoming HTTP requests on histogram ports.<br/> Default: 16MB.</td>
<td>Buffer size in bytes. <br/> Ex: 16777216</td>
</tr>
<tr>
<td>histogramHourAccumulators</td>
<td>Number of accumulators per hour port. In high traffic environments we recommend that the total number of accumulators per proxy across all utilized ports does not exceed the number of available CPU cores. Default: 2.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramHourAccumulatorSize</td>
<td>Expected upper bound of concurrent accumulations: ~ #time series * #parallel reporting bins. Default: 100000.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramHourAccumulatorPersisted</td>
<td>Whether to persist accumulation state. If true, all histograms are written to disk immediately if memory cache is disabled, or every histogramAccumulatorResolveInterval seconds if memory cache is enabled. If false, up to histogramMinuteFlushSecs seconds worth of histograms may be lost on proxy shutdown. </td>
<td>Boolean. <br/>Ex: false</td>
</tr>
<tr>
<td>histogramHourAvgDigestBytes</td>
<td>Average number of bytes in an encoded distribution/accumulation. Default: 32 + histogramMinuteCompression * 7</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramHourAvgKeyBytes</td>
<td>Average number of bytes in a UTF-8 encoded histogram key. Concatenation of metric, source, and point tags. Default: 150.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramHourCompression</td>
<td>A bound on the number of centroids per histogram. Default: 100.</td>
<td markdown="span">Positive integer in the interval [20;1000].</td>
</tr>
<tr>
<td>histogramHourFlushSecs</td>
<td>Time-to-live, in seconds, for an hour granularity accumulation on the proxy (before the intermediary is sent to the  Wavefront service). Default: 4200.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramHourListenerPorts</td>
<td>TCP ports to listen on for histograms to be aggregated by hour. Default: 40002.</td>
<td>Comma-separated list of ports. Can be a single port.</td>
</tr>
<tr>
<td>histogramHourMemoryCache</td>
<td>Enabling memory cache reduces I/O load with fewer time series and higher frequency data (more than 1 point per second per time series). Default: false.</td>
<td>Boolean.</td>
</tr>

<tr>
<td> histogramMaxReceivedLength</td>
<td>Maximum line length for received histogram points. Default: 65536.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramMinuteAccumulatorPersisted</td>
<td>Whether to persist accumulation state. If true, all histograms are written to disk immediately if memory cache is disabled, or every histogramAccumulatorResolveInterval seconds if memory cache is enabled. If false, up to histogramMinuteFlushSecs seconds worth of histograms may be lost on proxy shutdown. </td>
<td>Boolean. <br/>Ex: false</td>
</tr>
<tr>
<td>histogramMinuteListenerPorts</td>
<td>TCP ports to listen on for histograms to be aggregated by minute. Default: 40001.</td>
<td>Comma-separated list of ports. Can be a single port.</td>
</tr>
<tr>
<td>histogramMinuteAccumulators</td>
<td>Number of accumulators per minute port. In high traffic environments we recommend that the total number of accumulators per proxy across all utilized ports does not exceed the number of available CPU cores. Default: 2.</td>
<td>Positive integer.</td>
</tr>

<tr>
<td>histogramMinuteAccumulatorSize</td>
<td>Expected upper bound of concurrent accumulations. Should be approximately the number of timeseries * 2 (use a higher multiplier if out-of-order points more than 1 minute apart are expected). Setting this value too high results in excessive disk space usage, setting this value too low may cause severe performance issues. Default: 100000.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramMinuteAvgKeyBytes</td>
<td>Average number of bytes in a UTF-8 encoded histogram key. Concatenation of metric, source, and point tags. Default: 150.</td>
<td>Positive integer.</td>
</tr>

<tr>
<td>histogramMinuteCompression</td>
<td>A bound on the number of centroids per histogram. Default: 32.</td>
<td markdown="span">Positive integer in the interval. [20;1000].</td>
</tr>
<tr>
<td>histogramMinuteFlushSecs</td>
<td>Time-to-live, in seconds, for a minute granularity accumulation on the proxy (before the intermediary is sent to the Wavefront service). Default: 70.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramMinuteMemoryCache</td>
<td>Enabling memory cache reduces I/O load with fewer time series and higher frequency data (more than 1 point per second per time series). Default: false.</td>
<td>Boolean.</td>
</tr>
<tr>
<td>histogramMinuteAvgDigestBytes</td>
<td>Average number of bytes in an encoded distribution/accumulation. Default: 32 + histogramMinuteCompression * 7</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramProcessingQueueScanInterval</td>
<td>Interval in milliseconds between checks for new entries in the processing queue. Default: 20.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramReceiveBufferFlushInterval</td>
<td>Sets maximum time in milliseconds that incoming points can stay in the receive buffer when incoming traffic volume is very low. Default: 100.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramStateDirectory</td>
<td>Directory for persistent proxy state, must be writable.  Before being flushed to the Wavefront service, histogram data is persisted on the filesystem where the Wavefront proxy runs. If the files are corrupted or the files in the directory can't be accessed, the proxy reports the problem in its log and fails back to using in-memory structures. In this mode, samples can be lost if the proxy terminates without draining its queues. Default: <code>/var/spool/wavefront-proxy</code>.
</td>
<td>A valid path on the local file system. {% include note.html content="A high PPS requires that the machine that the proxy is on has an appropriate amount of IOPS. We recommend about 1K IOPS with at least 8GB RAM on the machine that the proxy writes histogram data to. Recommended machine type: m4.xlarge." %}</td>
</tr>
<tr>
<td>persistAccumulator</td>
<td>Whether to persist accumulation state. We suggest keeping this setting enabled unless you are not using hour and day level aggregation and consider losing up to 1 minute worth of data during proxy restarts acceptable. Default: true.
</td>
<td>. {% include warning.html content="If set to false, unprocessed metrics are lost on proxy shutdown." %}
</td>
</tr>
<tr>
<td>persistMessages</td>
<td>Whether to persist received metrics to disk. Default: true.
</td>
<td>Boolean. {% include warning.html content="If set to false, unprocessed metrics are lost on proxy shutdown." %}
</td>
</tr>
<tr>
<td>pushRelayHistogramAggregatorAccumulatorSize</td>
<td>Since 6.0. Max number of concurrent histogram to accumulations at the relay ports. The value is approximately the number of time series * 2 (use a higher multiplier if out-of-order points more than 1 bin apart are expected). Setting this value too high will cause excessive disk space usage, setting this value too low may cause severe performance issues. Only applicable if the pushRelayHistogramAggregator is set to true. <br/> Default: 32.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>pushRelayHistogramAggregatorCompression</td>
<td>Since 6.0. Number of centroids per histogram. Only applicable if the pushRelayHistogramAggregator is set to true. <br/> Default: 32.</td>
<td>Must be between 20 and 1000.<br/>
Ex: 40</td>
</tr>
<tr>
<td>pushRelayHistogramAggregatorFlushSecs</td>
<td>Since 6.0. Interval in milliseconds to check for histograms that have accumulated at the relay ports before sending data to the Wavefront service. Only applicable if the pushRelayHistogramAggregator is set to true. <br/> Default: 70.</td>
<td>Number of milliseconds.<br/> Ex: 80</td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="proxies_configuring.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>


## Authenticate Incoming HTTP Requests at the Proxy

The Wavefront proxy can be configured to authenticate inbound traffic. Below are the steps for setting up the different supported authentication methods.


### Authentication Method Static Token

**Required properties**: `authStaticToken`

In order for data sent via HTTP to the proxy to be accepted, the request will need to include a token matching whatever is configured for  `authStaticToken`. The token can be specified in the header or in the query string.

<table>
<tbody>
<thead>
<tr><th width="50%">Step</th><th width="50%">Example</th></tr>
</thead>
<tr>
<td markdown="span">1. Set `authMethod` to `STATIC_TOKEN`. </td>
<td><code>authMethod=STATIC_TOKEN</code></td>
</tr>
<tr>
<td markdown="span">2. Set <code>authStaticToken</code> to a value that will be used as the authentication token.</td>
<td><code>authStaticToken=token1234abcd</code></td>
</tr>
<tr>
<td markdown="span">3. Ensure that valid data sent to the proxy has the appropriate token included with the request.</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>


### Authentication Method HTTP_Get or OAUTH2

Required properties: `authTokenIntrospectionServiceUrl`

Optional properties: `authTokenIntrospectionAuthorizationHeader`, `authResponseRefreshInterval`, `authResponseMaxTtl`

If you have a service that can validate tokens, use this approach.
* Use OAUTH2 if your Introspection Service is RFC7662 compliant.
* Otherwise, use HTTP_GET.

For either method, the service must return a 2xx code for valid tokens. According to the standard, OAUTH2-compliant services return a JSON object that contains the active field.

<table>
<tbody>
<thead>
<tr><th width="50%">Step</th><th width="50%">Example</th></tr>
</thead>
<tr>
<td markdown="span">1. Set `authMethod` to `HTTP_GET` or `OAUTH2`. </td>
<td><code>authMethod=OAUTH2</code></td>
</tr>
<tr>
<td markdown="span">2. Set `authTokenIntrospectionServiceUrl` to the appropriate token validation endpoint for your introspection service. Use &#123;&#123;token&#125;&#125; as the placeholder for the token.</td>
<td><code>authTokenIntrospectionServiceUrl=<br/> https://auth.acme.corp/api/token/&#123;&#123;token/validate&#125;&#125;</code></td>
</tr>
<tr>
<td markdown="span">3. If the token validation endpoint requires authentication, specify <code>authTokenIntrospectionAuthorizationHeader</code>.   </td>
<td><code>authTokenIntrospectionAuthorizationHeader=<br/>Authorization: Bearer token123xyz</code></td>
</tr>
<tr>
<td markdown="span">4. Optionally, set `authResponseRefreshInterval` to specify how long to cache token validation results, in seconds, before re-authenticating against the introspection service. Default is 600 seconds (10 minutes).</td>
<td><code>authResponseRefreshInterval=300</code></td>
</tr>
<tr>
<td markdown="span">5. Optionally, set `authResponseMaxTtl` to specify the maximum amount of time, in seconds, to cache token validation results if the introspection service cannot be reached. Default is 86400 seconds (1 day).</td>
<td><code>authResponseMaxTtl=21600</code></td>
</tr>
<tr>
<td markdown="span">6. Ensure that valid data sent to the proxy has the appropriate token included with the request.</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="proxies_configuring.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>


## Troubleshooting

* [Proxy Troubleshooting] has tips and tricks from our SaaS Value Engineering team for common proxy problems.
* [Telegraf Troubleshooting](telegraf_details.html) has details on troubleshooting and fine-tuning the Telegraf agent.
