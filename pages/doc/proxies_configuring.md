---
title: Configuring Wavefront Proxies
keywords:
tags: [proxies]
sidebar: doc_sidebar
permalink: proxies_configuring.html
summary: Learn how to configure a Wavefront proxy.
---
This document describes Wavefront proxy 4.6 configuration options. For changes since previous proxy versions, see [Wavefront Proxy Version History](proxies_version_history).

## Installing a Proxy

To install a proxy, follow the directions in [Installing Wavefront Proxies](proxies_installing). The installation procedures perform basic configuration. For advanced configuration, see the options in the next section.

## Configuration Options

The Wavefront proxy configuration is maintained in `/etc/wavefront/wavefront-proxy/wavefront.conf`. Besides the `server` and `hostname` properties, the configuration file offers a variety of other options for changing how the proxy processes your data. None of these need to be changed from their default values, but can be adjusted for your particular needs. After changing a configuration option, [restart the proxy service](proxies_managing#starting-and-stopping-a-proxy).

<table width="100%">
<colgroup>
<col width="55%"/>
<col width="10%"/>
<col width="20%"/>
<col width="10%"/>
<col width="5%"/>
</colgroup>
<thead>
<tr>
<th>Property</th>
<th>Purpose</th>
<th>Format</th>
<th>Example</th>
<th>Since Version</th>
</tr>
</thead>
<tbody>
<tr>
<td>agentMetricsPointTags</td>
<td>Point tags and their values to be passed along with ~agent.* metrics. Default: none.</td>
<td>A comma-separated list of key-value pairs.</td>
<td>dc=west,env=prod</td>
<td>3.24</td>
</tr>
<tr>
<td>blacklistRegex</td>
<td>Regex pattern (java.util.regex) that input lines must match to be filtered out. Input lines are checked against the pattern as they come in and before the prefix is prepended.</td>
<td>A valid regex pattern.</td>
<td>Filter out points that begin with qa., development., or test.:<br/>
^(qa|development|test).</td>
<td>3.1</td>
</tr>
<tr>
<td>buffer</td>
<td>Location of buffer files for saving failed transmissions for retry. Default: <code>/var/spool/wavefront-proxy/buffer</code>.</td>
<td>A valid path on the local file system.</td>
<td markdown="span">`/var/spool/wavefront-proxy/buffer`</td>
<td>3.20</td>
</tr>
<tr>
<td>customSourceTags</td>
<td>Point tag keys to use as 'source' if no 'source' or 'host' field is present. Default: fqdn, hostname.</td>
<td>A comma-separated list of point tag keys.</td>
<td>fqdn, hostname</td>
<td>3.14</td>
</tr>
<tr>
<td>dataBackfillCutoffHours</td>
<td>The cut-off point for what is considered a valid timestamp for back-dated points. We do not recommend setting this value larger than 1 year unless backfilling or migrating historic data. Default: 8760 (1 year), so all points older than 1 year are rejected.</td>
<td>A positive integer.</td>
<td>8760</td>
<td>4.1</td>
</tr>
<tr>
<td>ephemeral</td>
<td>Whether to automatically clean up old and orphaned proxy instances from the Wavefront Agents page. We recommend enabling ephemeral mode if you’re running the proxy in a container that may be frequently spun down and recreated. Default: false.</td>
<td>Boolean</td>
<td>true</td>
<td>3.14</td>
</tr>
<tr>
<td>fileBeatPort</td>
<td>TCP port to listen on for Filebeat data. Default: 5044.</td>
<td>A port number.</td>
<td>5044</td>
<td>4.1</td>
</tr>
<tr>
<td>flushThreads</td>
<td>Number of threads that flush data to the server. Setting this value too high will result in sending batches that are too small to the Wavefront server and wasting connections. Values between 6 and 16 are a good starting point. This setting is per listening port. Default: The number of available processors (min 4).</td>
<td>A positive integer.</td>
<td>16.</td>
<td>3.14</td>
</tr>
<tr>
<td>graphitePorts</td>
<td>TCP ports to listen on for Graphite data. Define which of the segments in your Graphite metrics map to a hostname in the graphiteFormat property. Default: 2003.</td>
<td>A comma-separated list of available port numbers. Can be a single port.</td>
<td>2003<br/>
2003,2004</td>
<td></td>
</tr>
<tr>
<td>graphiteFormat</td>
<td markdown="span">Indexes of fields within your Graphite/collectd metric names that correspond to a hostname. For example, if your metrics have the format: `collectd.prod.www04.cpu.loadavg.1m` specify the 3rd and 2nd indexes (www04.prod) to be extracted and treated as the hostname. The remainder `collectd.cpu.loadavg.1m` is treated as the metric name.</td>
<td>A comma-separated list of indexes.</td>
<td>3,2<br/>
4,2,5<br/>
3</td>
<td></td>
</tr>
<tr>
<td>graphiteDelimiters</td>
<td markdown="span">Characters that should be replaced by dots, in case they were escaped within Graphite/collectd before sending. A common delimiter is the underscore character; so if you extract a hostname field with the value `web04_www`, it is changed to `web04.www`.</td>
<td>A concatenation of delimiter characters, without any separators.</td>
<td>-</td>
<td></td>
</tr>
<tr>
<td>hostname</td>
<td>A name unique across your account representing the machine that the proxy is running on. The hostname is not used to tag your metrics; rather, it's used to tag proxy metrics, such as JVM statistics, per-proxy point rates, and so on.</td>
<td>A string containing alphanumeric characters and periods.</td>
<td></td>
<td></td>
</tr>
<tr>
<td>httpConnectTimeout</td>
<td>HTTP connect timeout (in milliseconds). Default: 5000 (5s).</td>
<td>A positive integer.</td>
<td>5000</td>
<td>4.1</td>
</tr>
<tr>
<td>httpRequestTimeout</td>
<td>HTTP request timeout (in milliseconds). We do not recommend setting this value to be higher than 20000. Recommended value for most configurations is 10000 (10 seconds). Default: 20000 (20s).</td>
<td>A positive integer.</td>
<td>10000</td>
<td>4.1</td>
</tr>
<tr>
<td>httpUserAgent</td>
<td>Override User-Agent in request headers. Can help bypass excessively restrictive filters on the HTTP proxy. Default user agent: Wavefront-Proxy/&lt;version&gt;.</td>
<td>A string.</td>
<td>'Mozilla/5.0'</td>
<td>4.1</td>
</tr>
<tr>
<td>idFile</td>
<td markdown="span">Location of the PID file for the wavefront-proxy process. Default: `~/.dshell/id`.</td>
<td>A valid path on the local file system.</td>
<td markdown="span">`/etc/wavefront/wavefront-proxy/.wavefront_id`</td>
<td></td>
</tr>
<tr>
<td>jsonListenerPorts</td>
<td>TCP ports to listen on for incoming JSON-formatted metrics. Default: none.</td>
<td>A comma-separated list of available port numbers. Can be a single port.</td>
<td></td>
<td></td>
</tr><tr>
<td>logsIngestionConfigFile</td>
<td markdown="span">The file containing instructions for parsing log data into metrics.  See [Log Data Metrics Integration](integrations_log_data).
Default: `/etc/wavefront/wavefront-proxy/logsIngestion.yaml`.</td>
<td>A valid path on the local file system.</td>
<td></td>
<td>4.1</td>
</tr>
<tr>
<td>opentsdbPorts</td>
<td>TCP ports to listen on for incoming OpenTSDB-formatted data. Default: none.
Default: 4242.</td>
<td>A comma-separated list of available port numbers. Can be a single port.</td>
<td>4242</td>
<td>3.1</td>
</tr>
<tr>
<td>picklePorts</td>
<td>TCP ports to listen on for incoming data in Graphite pickle format (from carbon-relay). Default: None.</td>
<td>A comma-separated list of available port numbers. Can be a single port.</td>
<td>5878</td>
<td>3.20</td>
</tr>
<tr>
<td>prefix</td>
<td markdown="span">String to prepend before every metric name. For example, if you set prefix to 'production', a metric that is sent to the proxy as `cpu.loadavg.1m` is sent from the proxy to Wavefront as `production.cpu.loadavg.1m`. You can include longer prefixes such as `production.nyc.dc1`, and so on. Default: none.</td>
<td>A lowercase alphanumeric string, with periods separating segments. You do not need to include a trailing period.</td>
<td>production<br/>
production.nyc.dc1</td>
<td></td>
</tr>
<tr>
<td>preprocessorConfigFile</td>
<td>Path to the optional preprocessor config file containing <a href="proxies_preprocessor_rules.html">preprocessor rules</a> for filtering and rewriting metrics. Default: none.</td>
<td>A valid path on the local file system.</td>
<td markdown="span">`/etc/wavefront/wavefront-proxy/preprocessor_rules.yaml`</td>
<td>4.1</td>
</tr>
<tr>
<td>proxyHost</td>
<td>HTTP proxy host to be used in configurations when direct HTTP connections to Wavefront servers are not possible (must be used with proxyPort).</td>
<td>A string.</td>
<td>proxy.local</td>
<td>3.23</td>
</tr>
<tr>
<td>proxyPassword</td>
<td>When used with proxyUser, sets credentials to use with the HTTP proxy if it requires authentication.</td>
<td>A string.</td>
<td>validPassword123</td>
<td>3.23</td>
</tr>
<tr>
<td>proxyPort</td>
<td>HTTP proxy port to be used in configurations when direct HTTP connections to Wavefront servers are not possible (must be used with proxyHost).</td>
<td>A port number.</td>
<td>8080</td>
<td>3.23</td>
</tr>
<tr>
<td>proxyUser</td>
<td>When used with proxyPassword, sets credentials to use with the HTTP proxy if it requires authentication.</td>
<td>A string.</td>
<td>validUser</td>
<td>3.23</td>
</tr>
<tr>
<td>pushBlockedSamples</td>
<td>Number of blocked points to print to the log immediately following each summary line (every 10 flushes). If 0, print none of them. If you are seeing a non-zero number of blocked points in the summary lines and want to debug what that data is, we recommend setting this to 5 or so. Default: 0.</td>
<td>0 or a positive integer.</td>
<td>5</td>
<td></td>
</tr>
<tr>
<td>pushFlushInterval</td>
<td>Milliseconds to wait between each flush to Wavefront. Default: 1000.</td>
<td>An integer equal to or greater than 1000.</td>
<td>1000</td>
<td></td>
</tr>
<tr>
<td>pushFlushMaxPoints</td>
<td>Maximum number of points to send to Wavefront during each flush. Default: 40,000.</td>
<td>A positive integer.</td>
<td>40000</td>
<td></td>
</tr>
<tr>
<td>pushListenerPorts</td>
<td>TCP ports to listen on for incoming data. Default: 2878.</td>
<td>A comma-separated list of available port numbers. Can be a single port.</td>
<td>2878<br/>
2878,2879,2880</td>
<td></td>
</tr>
<tr>
<td>pushLogLevel</td>
<td>Frequency to print status information on the data flow to the log. SUMMARY prints a line every 60 flushes, while DETAILED prints a line on each flush.</td>
<td>NONE, SUMMARY, or DETAILED</td>
<td>SUMMARY</td>
<td></td>
</tr>
<tr>
<td>pushMemoryBufferLimit</td>
<td>Maximum number of points that can stay in memory buffers before spooling to disk. Setting this value lower than default reduces memory usage but forces the proxy to queue points by spooling to disk more frequently, if you have points arriving at the proxy in short bursts. Default: 16 * pushFlushMaxPoints. Minimum: pushFlushMaxPoints.</td>
<td>A positive integer.</td>
<td>640000</td>
<td>4.1</td>
</tr>
<tr>
<td>pushRateLimit</td>
<td>Maximum number of points to send to Wavefront per minute. Default: unlimited.</td>
<td>A positive integer.</td>
<td>20000</td>
<td>4.1</td>
</tr>
<tr>
<td>pushValidationLevel</td>
<td>Level of validation on incoming data that should be performed before sending the data to Wavefront. If NO_VALIDATION, all data is sent forward. If NUMERIC_ONLY, data is checked to make sure that it is numerical and dropped locally if it is not.</td>
<td>NUMERIC_ONLY or NO_VALIDATION</td>
<td>NUMERIC_ONLY</td>
<td></td>
</tr>
<tr>
<td>rawLogsPort</td>
<td>TCP port to listen on for log data. Default: 5045.</td>
<td>A port number.</td>
<td>5045</td>
<td>4.4</td>
</tr>
<tr>
<td>retryBackoffBaseSeconds</td>
<td>For exponential back-off when retry threads are throttled, the base (a in a^b) in seconds. Default: 2.0.</td>
<td>A positive number, integer or decimal.</td>
<td>2.0</td>
<td></td>
</tr>
<tr>
<td>retryThreads</td>
<td>Number of threads retrying failed transmissions. If no value is specified, it defaults to the number of processor cores available to the host or 4, whichever is greater. Every retry thread uses a separate buffer file (capped at 2GB) to persist queued data points, so the number of threads effectively controls the maximum amount of space that the proxy can potentially use to buffer points locally.</td>
<td>A positive integer.</td>
<td>4</td>
<td></td>
</tr>
<tr>
<td>server</td>
<td>The Wavefront server API URL.</td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>soLingerTime</td>
<td>Enables SO_LINGER with the specified linger time in seconds. We recommend setting this value to 0 when running in a high-availability configuration under a load balancer.Default: 0 (disabled). </td>
<td>0 or a positive integer.</td>
<td>0</td>
<td>4.1</td>
</tr>
<tr>
<td>splitPushWhenRateLimited</td>
<td>Whether to split the push batch size when the push is rejected by Wavefront due to rate limit. Default: false.</td>
<td>true or false</td>
<td>false</td>
<td></td>
</tr>
<tr>
<td>whitelistRegex</td>
<td>Regex pattern (java.util.regex) that input lines must match to be accepted. Input lines are checked against the pattern as they come in and before the prefix is prepended.</td>
<td>A valid regex pattern.</td>
<td>Allow points that begin with production. and stage.:<br/>
^(production|stage).
</td>
<td>3.1</td>
</tr>
<tr>
<td>writeHttpJsonListenerPorts</td>
<td>Ports to listen on for incoming data from collectd write_http plugin. Default: none.</td>
<td>A comma-separated list of available port numbers. Can be a single port. </td>
<td>4878</td>
<td>3.14</td>
</tr>
</tbody>
</table>

## Data Buffering

If the Wavefront proxy is unable to post received data to the Wavefront servers, it buffers the data to disk across a number of buffer files, and then tries to resend the points once the connection to the Wavefront servers is available again. If this buffering occurs, you'll see lines like this in `wavefront.log`:

    2013-11-18 18:02:35,061 WARN  [com.wavefront.daemon.QueuedSshDaemonService] current retry queue sizes: [1/0/0/0]

By default, there are 4 threads (and 4 buffer files) waiting to retry points once the connections are up; this line shows how many blocks of points have been stored by each thread (in this case, the first thread has 1 block of queued points, while the second, third, and fourth threads all have 0 blocks). These lines are only printed when there are points in the queue; you'll never see a line with all 0's in the queue sizes. Once the connection to the Wavefront servers has been established, and all the threads have sent the past data to us, you'll see a single line like this in wavefront.log:

    2013-11-18 18:59:46,665 WARN [com.wavefront.daemon.QueuedSshDaemonService] retry queue has been cleared

## Log Configuration

The Wavefront proxy supports two log files: proxy log and blocked point log. To keep the log file sizes reasonable and avoid filling up the disk with logs, both log files are automatically rotated and purged periodically. You configure the log file locations and rotation rules in `/etc/wavefront/wavefront-proxy/log4j2.xml`. For details on log4j2 configuration, see [Log4j Configuration](https://logging.apache.org/log4j/2.x/manual/configuration.html).

### Proxy Log

By default, proxy log entries are logged to `/var/log/wavefront/wavefront.log`. The log file is rolled over every day and when its size reaches 100MB. When there are 30 log files, older files are deleted. 

### Blocked Point Log

You can log raw blocked points in a separate log from the proxy log. Logging of blocked points is disabled by default. To enable logging block points, edit the log4j2 configuration file and uncomment the blocked points file appender:

    <!--
        <AppenderRef ref="BlockedPointsFile"/>
    -->

By default, blocked point entries are logged to `/var/log/wavefront/wavefront-blocked-points.log` and the block point log file is rolled over every day and when its size reaches 100MB. When there are 31 log files, older files are deleted.

## Troubleshooting

If you have any other issues not listed below, or are having trouble resolving an issue, contact us at [support](mailto:support@wavefront.com).

<table>
<colgroup>
<col width="33%"/>
<col width="33%"/>
<col width="33%"/>
</colgroup>
<thead>
<tr>
<th>Error</th>
<th>Reason</th>
<th>Resolution</th>
</tr>
</thead>
<tbody>
<tr>
<td>You see "java: command not found" in wavefront.log.</td>
<td>Java is either not installed, or is not in your path.</td>
<td>Install Java using your local package manager, and make sure that your path includes the Java binary.</td>
</tr>
<tr>
<td>You see "Cannot fetch daemon configuration from remote server: org.jboss.resteasy.client.exception.ResteasyIOException: IOException" in <code>wavefront.log</code>.</td>
<td>You may have an incorrect server URL in your wavefront.conf file; you may have blocked the outgoing connection to that server URL (port 443); or the Wavefront servers may be down.</td>
<td>Run <code>curl &lt;wavefrontServerUrl&gt;</code> from the machine running the Proxy, where <code>&lt;wavefrontServerUrl&gt;</code> is the full URL (including "https://) provided to you by Wavefront and in your <code>wavefront.conf</code> file. If this fails, and you are certain that there are no firewall issues, contact <a href="mailto:support@wavefront.com">support@wavefront.com</a>.</td>
</tr>
<tr>
<td>You see "Cannot post work unit result to Wavefront servers. Will enqueue and retry later." in <code>wavefront.log</code>.</td>
<td>You may have an incorrect server URL in your wavefront.conf file; you may have blocked the outgoing connection to that server URL (port 443); or the Wavefront servers may be down.</td>
<td>Run <code>curl &lt;wavefrontServerUrl&gt;</code> from the machine running the Proxy, where <code>&lt;wavefrontServerUrl&gt;</code> is the full URL (including "https://") provided to you by Wavefront and in your <code>wavefront.conf</code> file. If this fails, and you are certain that there are no firewall issues, contact <a href="mailto:support@wavefront.com">support@wavefront.com</a>.</td>
</tr>
<tr>
<td>You see "Exception in thread "main" java.lang.UnsupportedClassVersionError:
com/sunnylabs/GraphiteValidator : Unsupported major.minor version 51.0" in <code>wavefront.log</code>.
</td>
<td>You are using Java 1.6 or lower instead of Java 1.7.</td>
<td>Upgrade Java to 1.7 through your local package manager.</td>
</tr>
<tr>
<td>You see "Exception in thread "Thread-2" java.net.BindException: Address already in use" in <code>wavefront.log</code>.</td>
<td>You already have another process listening on port 2878, or may have started two proxies accidentally.</td>
<td>Use the <code>ps</code> command to find and kill any existing proxies, and then start the proxy again.</td>
</tr>
<tr>
<td>You can't "telnet localhost 2878"; the connection is refused.</td>
<td>You may have an iptables rule blocking the traffic; the proxy might not be running; or you may be running "telnet localhost 2878" from a different machine from where the proxy is running.</td>
<td>Use the <code>ps</code> command to make sure that the proxy is running, and examine your iptables rules to ensure that tcp port 2878 is accessible locally.</td>
</tr>
</tbody>
</table>