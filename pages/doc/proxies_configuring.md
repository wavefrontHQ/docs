---
title: Configuring Wavefront Proxies
keywords:
tags: [proxies]
sidebar: doc_sidebar
permalink: proxies_configuring.html
summary: Learn how to configure a Wavefront proxy.
---
This document describes Wavefront proxy 4.12 configuration options. For changes since previous proxy versions, see [Wavefront Proxy Versions](proxies_versions.html).

## Installing a Proxy

To install a proxy, follow the directions in [Installing Wavefront Proxies](proxies_installing.html). The installation procedures perform basic configuration. For advanced configuration, see the options in the next section.

## Proxy Configuration

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

### Configuration Properties

The main Wavefront proxy configuration file is maintained in `<wavefront_config_path>/wavefront.conf`.  Besides the `server` and `hostname` properties, the configuration file offers many options for changing how the proxy processes your data. There are optional configuration files for [rewriting metrics](proxies_preprocessor_rules.html) and parsing [log data](integrations_log_data.html#configuring-the-wavefront-proxy-to-ingest-log-data). None of these need to be changed from their default values, but can be adjusted for your particular needs. After changing a configuration option, [restart the proxy service](proxies_installing.html#starting-and-stopping-a-proxy).

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
<td>Point tags and their values to be passed along with <code>~agent.&#42;</code> metrics. Default: None.</td>
<td><p>Comma-separated list of key-value pairs.<br />
Ex: dc=west,env=prod</p>  </td>
<td>3.24</td>
</tr>
<tr>
<td>blacklistRegex </td>
<td>Regex pattern (java.util.regex) that input lines must match to be filtered out. Input lines are checked against the pattern as they come in and before the prefix is prepended.</td>
<td>Valid regex pattern.<br />
  Ex: Filter out points that begin with qa., development., or test.:<br/>
^(qa|development|test).</td>
<td>3.1</td>
</tr>
<tr>
<td>buffer</td>
<td>Location of buffer files for saving failed transmissions for retry.</td>
<td>Valid path on the local file system.<br />
Ex: `&lt;wavefront_spool_path&gt; &#47;buffer`</td>
<td>3.20</td>
</tr>
<tr>
<td>customSourceTags</td>
<td>Point tag keys to use as 'source' if no 'source' or 'host' field is present. Default: fqdn, hostname.</td>
<td>Comma-separated list of point tag keys.<br />
Ex: fqdn, hostname</td>
<td>3.14</td>
</tr>
<tr>
<td>dataBackfillCutoffHours</td>
<td>The cut-off point for what is considered a valid timestamp for back-dated points. We do not recommend setting this value larger than 1 year unless backfilling or migrating historic data. Default: 8760 (1 year), so all points older than 1 year are rejected.</td>
<td>Positive integer.<br />
Ex: 8760</td>
<td>4.1</td>
</tr>
<tr>
<td>ephemeral</td>
<td>Whether to automatically clean up old and orphaned proxy instances from the Wavefront Agents page. We recommend enabling ephemeral mode if you're running the proxy in a container that may be frequently spun down and recreated. Default: false.</td>
<td>Boolean<br />
Ex: true </td>
<td>3.14</td>
</tr>
<tr>
<td>fileBeatPort</td>
<td>TCP port to listen on for Filebeat data. Default: 5044.</td>
<td>A port number.<br />
Ex: 5044 </td>
<td>4.1</td>
</tr>
<tr>
<td>flushThreads</td>
<td>Number of threads that flush data to the server. Setting this value too high will result in sending batches that are too small to the Wavefront server and wasting connections. Values between 6 and 16 are a good starting point. This setting is per listening port. Default: The number of available processors (min 4).</td>
<td>Positive integer.<br />
Ex: 16 </td>
<td>3.14</td>
</tr>
<tr>
<td>graphitePorts</td>
<td>TCP ports to listen on for Graphite data. Define which of the segments in your Graphite metrics map to a hostname in the graphiteFormat property. Default: 2003.</td>
<td>Comma-separated list of available port numbers. Can be a single port.<br />
Ex: 2003<br />
Ex: 2003, 2004  <br /></td>
<td>&nbsp;</td>
</tr>
<tr>
<td>graphiteFormat</td>
<td markdown="span">Indexes of fields within Graphite and collectd metric names that correspond to a hostname. For example, if your metrics have the format: `collectd.prod.www04.cpu.loadavg.1m`, specify the 3rd and 2nd indexes (www04.prod) to be extracted and treated as the hostname. The remainder `collectd.cpu.loadavg.1m` is treated as the metric name.</td>
<td><p>Comma-separated list of indexes.<br />
Ex: 4, 2, 5<br />
Ex: 3 </p>  </td>
<td>&nbsp;</td>
</tr>
<tr>
<td>graphiteDelimiters</td>
<td markdown="span">Characters that should be replaced by dots, in case they were escaped within Graphite and collectd before sending. A common delimiter is the underscore character; so if you extract a hostname field with the value `web04_www`, it is changed to `web04.www`.</td>
<td>A concatenation of delimiter characters, without any separators.</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>hostname</td>
<td>A name unique across your account representing the machine that the proxy is running on. The hostname is not used to tag your metrics; rather, it's used to tag proxy metrics, such as JVM statistics, per-proxy point rates, and so on.</td>
<td>A string containing alphanumeric characters and periods.</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>httpConnectTimeout</td>
<td>HTTP connect timeout (in milliseconds). Default: 5000 (5s).</td>
<td>Positive integer.<br />
Ex: 5000 </td>
<td>4.1</td>
</tr>
<tr>
<td>httpRequestTimeout</td>
<td>HTTP request timeout (in milliseconds). We do not recommend setting this value to be higher than 20000. Recommended value for most configurations is 10000 (10 seconds). Default: 10000 (10s).</td>
<td>Positive integer.<br />
Ex: 10000 </td>
<td>4.1</td>
</tr>
<tr>
<td>httpUserAgent</td>
<td>Override User-Agent in request headers. Can help bypass excessively restrictive filters on the HTTP proxy. Default user agent: Wavefront-Proxy/&lt;version&gt;.</td>
<td>A string.<br />
Ex: 'Mozilla/5.0' </td>
<td>4.1</td>
</tr>
<tr>
<td>idFile</td>
<td markdown="span">Location of the PID file for the wavefront-proxy process. Default: `<wavefront_config_path>/.wavefront_id`.</td>
<td>Valid path on the local file system.</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>jsonListenerPorts</td>
<td>TCP ports to listen on for incoming JSON-formatted metrics. Default: None.</td>
<td>Comma-separated list of available port numbers. Can be a single port.</td>
<td></td>
</tr><tr>
<td>logsIngestionConfigFile</td>
<td markdown="span">The file containing instructions for parsing log data into metrics.  See [Log Data Metrics Integration](integrations_log_data.html).
Default: `<wavefront_config_path>/logsIngestion.yaml`.</td>
<td>Valid path on the local file system.</td>
<td>4.1</td>
</tr>
<tr>
<td>opentsdbPorts</td>
<td>TCP ports to listen on for incoming OpenTSDB-formatted data. Default: None.
Default: 4242.</td>
<td>Comma-separated list of available port numbers. Can be a single port.<br />
Ex: 4242 </td>
<td>3.1</td>
</tr>
<tr>
<td>picklePorts</td>
<td>TCP ports to listen on for incoming data in Graphite pickle format (from carbon-relay). Default: None.</td>
<td>Comma-separated list of available port numbers. Can be a single port.<br />
Ex: 5878 </td>
<td>3.20</td>
</tr>
<tr>
<td>prefix</td>
<td markdown="span">String to prepend before every metric name. For example, if you set prefix to 'production', a metric that is sent to the proxy as `cpu.loadavg.1m` is sent from the proxy to Wavefront as `production.cpu.loadavg.1m`. You can include longer prefixes such as `production.nyc.dc1`, and so on. Default: None.</td>
<td><p>A lowercase alphanumeric string, with periods separating segments. You do not need to include a trailing period.<br />
Ex: production<br />
Ex: production.nyc.dc1
</p>  </td>
<td>&nbsp;</td>
</tr>
<tr>
<td>preprocessorConfigFile</td>
<td>Path to the optional preprocessor config file containing <a href="proxies_preprocessor_rules.html">preprocessor rules</a> for filtering and rewriting metrics. Default: None.</td>
<td>Valid path on the local file system.<br />
Ex: `<wavefront_config_path>&#47;preprocessor_rules.yaml`</td>
<td>4.1</td>
</tr>
<tr>
<td>proxyHost</td>
<td>HTTP proxy host to be used in configurations when direct HTTP connections to Wavefront servers are not possible (must be used with proxyPort).</td>
<td>A string.<br />
Ex: proxy.local</td>
<td>3.23</td>
</tr>
<tr>
<td>proxyPassword</td>
<td>When used with proxyUser, sets credentials to use with the HTTP proxy if it requires authentication.</td>
<td>A string.<br />
Ex: validPassword123 </td>
<td>3.23</td>
</tr>
<tr>
<td>proxyPort</td>
<td>HTTP proxy port to be used in configurations when direct HTTP connections to Wavefront servers are not possible (must be used with proxyHost).</td>
<td>A port number.<br />
Ex: 8080 </td>
<td>3.23</td>
</tr>
<tr>
<td>proxyUser</td>
<td>When used with proxyPassword, sets credentials to use with the HTTP proxy if it requires authentication.</td>
<td>A string.<br />
Ex: validUser </td>
<td>3.23</td>
</tr>
<tr>
<td>pushBlockedSamples</td>
<td>Number of blocked points to print to the log immediately following each summary line (every 10 flushes). If 0, print None of them. If you are seeing a non-zero number of blocked points in the summary lines and want to debug what that data is, we recommend setting this to 5 or so. Default: 0.</td>
<td>0 or a positive integer.<br />
Ex: 5 </td>
<td>&nbsp;</td>
</tr>
<tr>
<td>pushFlushInterval</td>
<td>Milliseconds to wait between each flush to Wavefront. Default: 1000.</td>
<td>An integer equal to or greater than 1000.<br />
Ex: 1000 </td>
<td>&nbsp;</td>
</tr>
<tr>
<td>pushFlushMaxPoints</td>
<td>Maximum number of points to send to Wavefront during each flush. Default: 40,000.</td>
<td>Positive integer.<br />
Ex: 40000 </td>
<td>&nbsp;</td>
</tr>
<tr>
<td>pushListenerPorts</td>
<td>TCP ports to listen on for incoming data. Default: 2878.</td>
<td>Comma-separated list of available port numbers. Can be a single port.<br />
Ex: 2878<br />
Ex: 2878,2879,2880</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>pushLogLevel</td>
<td>Frequency to print status information on the data flow to the log. SUMMARY prints a line every 60 flushes, while DETAILED prints a line on each flush.</td>
<td>None, SUMMARY, or DETAILED<br />
Ex: SUMMARY </td>
<td>&nbsp;</td>
</tr>
<tr>
<td>pushMemoryBufferLimit</td>
<td>Maximum number of points that can stay in memory buffers before spooling to disk. Setting this value lower than default reduces memory usage but forces the proxy to queue points by spooling to disk more frequently, if you have points arriving at the proxy in short bursts. Default: 16 * pushFlushMaxPoints. Minimum: pushFlushMaxPoints.</td>
<td>Positive integer.<br />
Ex: 640000</td>
<td>4.1</td>
</tr>
<tr>
<td>pushRateLimit</td>
<td>Maximum number of points to send to Wavefront per minute. Default: unlimited.</td>
<td>Positive integer.<br />
Ex: 20000</td>
<td>4.1</td>
</tr>
<tr>
<td>pushValidationLevel</td>
<td>Level of validation on incoming data that should be performed before sending the data to Wavefront. If NO_VALIDATION, all data is sent forward. If NUMERIC_ONLY, data is checked to make sure that it is numerical and dropped locally if it is not.</td>
<td>NUMERIC_ONLY or NO_VALIDATION<br />
Ex: NUMERIC_ONLY </td>
<td>&nbsp;</td>
</tr>
<tr>
<td>rawLogsPort</td>
<td>TCP port to listen on for log data. Default: 5045.</td>
<td>A port number.<br />
Ex: 5045 </td>
<td>4.4</td>
</tr>
<tr>
<td>retryBackoffBaseSeconds</td>
<td>For exponential back-off when retry threads are throttled, the base (a in a^b) in seconds. Default: 2.0.</td>
<td>Positive number, integer or decimal.<br />
Ex: 2.0 </td>
<td>&nbsp;</td></tr>
<tr>
<td>retryThreads</td>
<td>Number of threads retrying failed transmissions. If no value is specified, it defaults to the number of processor cores available to the host or 4, whichever is greater. Every retry thread uses a separate buffer file (capped at 2GB) to persist queued data points, so the number of threads effectively controls the maximum amount of space that the proxy can potentially use to buffer points locally.</td>
<td><p>Positive integer.<br />
Ex: 4 </p>  </td>
<td>&nbsp;</td>
</tr>
<tr>
<td>server</td>
<td markdown="span">The API URL of the Wavefront server in the format `https://<wavefront_instance>.wavefront.com/api/`.</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>soLingerTime</td>
<td>Enable SO_LINGER with the specified linger time in seconds. We recommend setting this value to 0 when running in a high-availability configuration under a load balancer.Default: 0 (disabled). </td>
<td>0 or a positive integer.<br />
Ex: 0 </td>
<td>4.1</td>
</tr>
<tr>
<td>splitPushWhenRateLimited</td>
<td>Whether to split the push batch size when the push is rejected by Wavefront due to rate limit. Default: false.</td>
<td>true or false<br />
Ex: false </td>
<td>&nbsp;</td>
</tr>
<tr>
<td>whitelistRegex</td>
<td>Regex pattern (java.util.regex) that input lines must match to be accepted. Input lines are checked against the pattern as they come in and before the prefix is prepended.</td>
<td>Valid regex pattern.<br />
Ex: ^(production|stage). <br />
Allows points that begin with production. and stage.:</td>
<td>3.1</td>
</tr>
<tr>
<td>writeHttpJsonListenerPorts</td>
<td>Ports to listen on for incoming data from collectd write_http plugin. Default: None.</td>
<td>Comma-separated list of available port numbers. Can be a single port. <br />
  Ex: 4878 </td>
<td>3.14</td>
</tr>
</tbody>
</table>

### Sending Information to a Running Proxy

The SourceTag and SourceDescription properties allow you to modify a running proxy.

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
<td>SourceTag</td>
<td><p>Save or delete a tag on the specified host. For example, you use this property to inject a tag into a database on the host.</p>
  <p>Use SourceTag with action= and source= arguments. </p>
  
* action is either save or delete. <br />
* source takes the target host as the first value, followed by one or more tags to save or delete. 
  </td>
<td> <p>Ex: SourceTag action=save source=host_42 db1 sourceTag2 &quot;source tag 3&quot;<br />
  
  Ex: SourceTag action=delete source=host_42 sourceTag1<br />
  </p></td>
<td>XXXX</td>
</tr>
<tr>
<td>SourceDescription</td>
<td><p>Save or delete a descriptor on the specified host. You can use this property to add a description or delete an existing description. </p>
  <p>Use SourceDescriptor with action=, source=, and description= arguments. </p> 
  
* action is either save or delete. 
* source takes the target host as the first value, followed by one or more descriptors.
* description allows you to specify a description
  </td>
<td><p>Ex: SourceDescription action=save source=&quot;sourceId&quot; description=&quot;A Description&quot;<br />
Ex: SourceDescription action=delete source=&quot;sourceId&quot;</p>  </td>
<td>XXXX</td>
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

By default, proxy log entries are logged to `<wavefront_log_path>/wavefront.log`. The log file is rolled over every day and when its size reaches 100MB. When there are 30 log files, older files are deleted. 

### Blocked Point Log

You can log raw blocked points in a separate log from the proxy log. Logging of blocked points is disabled by default. To enable logging block points, edit the log4j2 configuration file and uncomment the blocked points file appender:

    <!--
        <AppenderRef ref="BlockedPointsFile"/>
    -->

By default, blocked point entries are logged to `<wavefront_log_path>/wavefront-blocked-points.log` and the block point log file is rolled over every day and when its size reaches 100MB. When there are 31 log files, older files are deleted.
