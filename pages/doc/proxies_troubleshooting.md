---
title: Proxy Troubleshooting
keywords:
tags: [proxies, data]
sidebar: doc_sidebar
permalink: proxies_troubleshooting.html
summary: Troubleshoot proxy problems
---

Wavefront proxies give you a lot of flexibility and control over proxies. But with flexibility comes the potential for problems, so our SaaS Value Engineering team has put together some troubleshooting advice.

## Validating Metrics Received at the Proxy

As part of troubleshooting, it's often useful to check is metrics are received at the proxy in the intended format. See [Wavefront data format best practices](wavefront_data_format.html#wavefront-data-format-best-practices) for background.

### Step 1: Enable Valid Point Logging and Examine Valid Points

To send all valid points thate are received at the proxy to a separate log file, file, enable raw valid point logging.

{% include warning.html content="Enable valid point logging only for a short time during troubleshooting. The log files will use a lot of disk space quickly."%}

1. Open the `<wavefront_config_path>/log4j2.xml` file and uncomment the relavant sections below. See [Proxy File Paths](/proxies_configuring.html#proxy-file-paths) for default file locations.

   ```
   <Appenders>

   <!-- Uncomment the RollingFile section below to log all valid points to a file -->

   <RollingFile name="ValidPointsFile" fileName="${log-path}/wavefront-valid-points.log"
   filePattern="${log-path}/wavefront-valid-points-%d{yyyy-MM-dd}-%i.log" >
   <PatternLayout>
   <pattern>%m%n</pattern>
   </PatternLayout>
   <Policies>
   <TimeBasedTriggeringPolicy interval="1"/>
   <SizeBasedTriggeringPolicy size="1024 MB"/>
   </Policies>
   <DefaultRolloverStrategy max="10">
   <Delete basePath="${log-path}" maxDepth="1">
   <IfFileName glob="wavefront-valid*.log" />
   <IfLastModified age="7d" />
   </Delete>
   </DefaultRolloverStrategy>
   </RollingFile>

   </Appenders>
   <Loggers>

   <!-- Uncomment AppenderRef and set level="ALL" to log all valid points to a file -->
   <AsyncLogger name="RawValidPoints" level="ALL" additivity="false">
   <AppenderRef ref="ValidPointsFile"/>
   </AsyncLogger>

   </Loggers>
   ```

2. Check that the `<wavefront_log_path>/wavefront.log` file indicates that logging is enabled as shown below:

   ```
   2021-04-02 05:53:24,436 INFO [sampling:refreshLoggerState] Valid points logging is now enabled with 100.0% sampling
   ```

3. Examine the log file. By default, valid point entries are logged to a `<wavefront_log_path>/wavefront-valid-points.log` file, for example `/var/log/wavefront/wavefront-valid-points.log` in a typical Linux install.


{% include tip.html content="If the metric points are not written to the wavefront-valid-points.log file, verify that the data is not being blocked by logging all the raw blocked data in a separate file for analysis."%}


### Step 2: Enable Blocked Point Logging and Examine Blocked Points

To send all blocked points to a separate log file, file, enable blocked point logging.

1. Open the `<wavefront_config_path>/log4j2.xml` configuration file and uncomment the relevant sections below.
    * `level="WARN"` to log only rejected points
    * `level="INFO"` to log points that are filtered out by allow/block preprocessor rules.


   See [Proxy File Paths](/proxies_configuring.html#proxy-file-paths) for default file locations.

   ```
    <Appenders>
    <!-- Uncomment the RollingFile section below to log blocked points to a file -->

    <RollingFile name="BlockedPointsFile" fileName="${log-path}/wavefront-blocked-points.log"
    filePattern="${log-path}/wavefront-blocked-points-%d{yyyy-MM-dd}-%i.log" >
    <PatternLayout>
    <pattern>%m%n</pattern>
    </PatternLayout>
    <Policies>
    <TimeBasedTriggeringPolicy interval="1"/>
    <SizeBasedTriggeringPolicy size="100 MB"/>
    </Policies>
    <DefaultRolloverStrategy max="10">
    <Delete basePath="${log-path}" maxDepth="1">
    <IfFileName glob="wavefront-blocked*.log" />
    <IfLastModified age="31d" />
    </Delete>
    </DefaultRolloverStrategy>
    </RollingFile>

    </Appenders>
     <Loggers>
    <AsyncLogger name="RawBlockPoints" level="WARN" additivity="false">
    <AppenderRef ref="BlockedPointsFile" />
    </AsyncLogger>
    </Loggers>
   ```

2. Examine the blocked points entries in the `<wavefront_log_path>/wavefront-blocked-points.log` file. The log file is rolled over every day when its size reaches 100MB.

   See the [log4j2.xml.defaultProxy on Github](https://github.com/wavefrontHQ/wavefront-proxy/blob/master/pkg/etc/wavefront/wavefront-proxy/log4j2.xml.defaultProxy) for more information on logging points from Jaeger tracing spans and Zipkin tracing spans.

## Common Proxy Log Messages


This section describes commonly seen messages Wavefront proxy logs, organized by severity.

INFO

Proxy Start-up Messages
Preprocessor Rule Messages
Proxy Check-in
Processed Since Start
Proxy Queue Size
WF-300 Cannot Parse

WARN

406 - Cannot Post Push Data
Global Rate Limit Exceeded
Disconnected, Unterminated String

ERROR

401 - Unauthorized

CRITICAL

WF-1 - Queues Full


### Proxy INFO Messages

**Proxy Start-up INFO Messages**


* Message
   ```
   INFO [proxy:parseArguments] Wavefront Proxy version <Proxy version>, runtime: OpenJDK Runtime Environment (Azul Systems, Inc.) <JDK version>
   ```
* Explanation: This should be the first start-up message and indicates the version of the Wavefront proxy.

<br/>
<br/>

* Message:
   ```
   INFO [proxy:lambda$startListeners$7] listening on port: 2878 for Wavefront metrics
   ```
* Explanation: The proxy has been configured to listen for metrics using the Wavefront Data Format on port 2878. If tracing or histograms are configured, you should see a corresponding message. For example:

  ```
  INFO [proxy:startTraceListener] listening on port: 30000 for trace data
  ```
<br/>
<br/>

* Message:
   ```
   INFO [proxy:run] setup complete
   ```
* Explanation: Proxy setup has completed.


**Preprocessor Rule INFO Message**

* Message:
  ```
  INFO [PreprocessorConfigManager:loadFromStream] Loaded <#> rules for port :: <port>
  ```
* Explanation: A certain number of rules have been detected and loaded for the specified port

**Proxy Check-in INFO Message**

* Message:
   ```
   INFO [proxy:checkin] Checking in: https://<cluster>.wavefront.com/api
   ```
* Explanation: The proxy has been able to check in with the Wavefront backend. A message like this should appear at one-minute intervals (approximately).

**Processed Since Start INFO Message**

* Message:
  ```
  INFO [AbstractReportableEntityHandler:printTotal] [<port>] <Points/Histograms/Spans/SpanLogs/etc> processed since start: <#>; blocked: <#>
  ```
* Explanation: Shows the number of data points processed and blocked for the specified type on the specified port since the start of the proxy process.


**Proxy Queue Size INFO Message**

* Message:
   ```
   INFO  [QueuedAgentService:lambda$new$5] current retry queue sizes: [<#>/<#>/<#>/<#>]
   ```
* Explanation: Indicates the size of the proxy's queues.


**WF-300 Cannot Parse INFO Message**

* Message:
```
INFO [AbstractReportableEntityHandler:reject] [<port>] blocked input: [WF-300 Cannot parse: "<data point>"; remote: <address> [<port>]; reason: "Could not parse: <data point>", root cause: "<portion of data point> is not allowed here!"
```
* Explanation: A data point is not formatted properly and was blocked by the proxy.

* Potential Resolution: Confirm that the data point conforms to the format configured for the specified port. The proxy can handle various different data formats. Ensure that the data format you've configured for the port matches the format of data arriving at that port.

  If the port is configured for standard Tanzu Observability data format, see the documentation for the proper syntax to cross-check the data point mentioned in the log message.


### Proxy WARN Messages

**406 - Cannot Post Push Data WARN Message**

* Message:
   ```
   WARN  [QueuedAgentService:handleTaskRetry] Cannot post push data result to Wavefront servers. Will enqueue and retry later: java.util.concurrent.RejectedExecutionException: Response not accepted by server: 406
  ```
* Explanation: The proxy has queued up some data and will retry momentarily. This behavior is common and occurs often when the proxy attempts to send a burst of data to the backend. When the burst of data is temporarily is at a higher momentary rate than the backend limit (based on your contract rate), the proxy queues up the data to smooth out your data rate. Typically not a cause for concern.

* Potential Resolution: In the **Wavefront Service and Proxy Data** dashboard of **Wavefront Usage** integration, check if the proxy's queue and backlog are staying the same size or growing. If they're growing, then the attempted rate of ingest is higher than allowed by the backend limit. Either lower the rate of data that at the proxies, or contact Support to request a higher backend limit. If your overall rate of data ingest is higher than your contract rate, you may incur overage charges.

  If the proxy's queue size is spiky (going up and coming down, close to 0), then the proxy is effectively smoothing out bursts in your rate of data ingest. This is normal behavior and is not a cause for concern.


**Global Rate Limit Exceeded WARN Message**

* Message:
  ```
  WARN  [QueuedAgentService:run] [RETRY THREAD <#>] Wavefront server rejected the submission (global rate limit exceeded) - will attempt later.
  ```
* Explanation: The proxy attempted to send data to the backend but the overall ingest rate has exceeded the backend limit. The proxy will continue to keep the data queued. This message is often seen along with the 406 message.

* Potential Resolution:
The current rate of data is higher than the backend limit and data will stay in the queues to be retried momentarily. See 406 - Cannot Post Push Data for more details.


**Disconnected, Unterminated String WARN Message**

* Message:
  ```
  WARN [PlainTextOrHttpFrameDecoder:decodeLast] Client <client address> [<port>] disconnected, leaving unterminated string. Input (<#> bytes) discarded: "<discarded data>"
  ```
* Explanation: The proxy has received a data point without a line terminator (ie. a newline character). This usually happens when the client disconnects prematurely, leaving the proxy with an incomplete (partially sent) data point.

* Potential Resolution:
  - Ensure that data points are terminated by a newline character.
  - Check on the connectivity between the client and the proxy.
  - Switching to the HTTP protocol for sending data to the proxy might also help.



### Proxy ERROR Messages


**HTTP 401 Unauthorized ERROR Message**

* Message:
   ```
   2021-02-18 22:52:28,376 ERROR [proxy:checkinError] HTTP 401 Unauthorized: Please verify that your server and token settings are correct and that the token has Proxy Management permission!
   ```
* Explanation: The proxy cannot connect with the token provided. The token or the token's account might have been deleted or might not have the required permissions.

* Potential Resolution:
  - Validate that the token that the Wavefront is attempting to use is correct and active for the user account or service account.
  - Ensure the user account or service account that is associated with the token has the Proxies permission.

### Proxy CRITICAL Messages


**WF-1 - Queues Full CRITICAL Message**

* Message:
   ```
   ERROR [QueuedAgentService:addTaskToSmallestQueue] CRITICAL (Losing points!): WF-1: Submission queue is full.
   com.squareup.tape.FileException: Failed to add entry.
   ```
   or
   ```
   CRITICAL (Losing data): WF-1: Error adding task to the queue:
   ```
* Explanation: The proxy is running out of disk space or the queue (buffer) files are exceeding their maximum allowed size (normally 2GB).

* Potential Resolution:
  - Ensure that the proxy has enough disk space.
  - Check the size of the buffer files (located at the spool path). If the files are at or near the maximum allowed size, data is likely arriving at the proxy at a higher rate than the backend limit.
  - Decrease the rate of data arriving at the proxy or distribute your data ingest to another proxy.


## How to Export Data Queued at the Proxy

If you send too much data or if there is a network error, data starts to queue at the Wavefront proxy and create a backlog. Advanced users might consider exporting data that is queued at the proxy, and, for example, remove data that is not required.



### Export Command

Use the following command to export the data that is queued at the proxy.

```
/opt/wavefront/wavefront-proxy/proxy-jre/java -jar /opt/wavefront/wavefront-proxy/wavefront-push-agent.jar --f /etc/wavefront/wavefront-proxy/wavefront.conf --exportQueuePorts <ports> --exportQueueOutputFile <outputFileNamePrefix> --exportQueueRetainData false
```

### Export Command for Containerized Proxies

Because containers are stateless, restarting a proxy container normally result in a loss of any data in the proxy’s queues. Exporting the queued data before a persistent storage restart can help retain data.

If your proxy is containerized, the command is similar to the following.

```
java -jar /opt/wavefront/wavefront-proxy/bin/wavefront-proxy.jar --exportQueuePorts <ports> --exportQueueOutputFile <outputFileNamePrefix> --exportQueueRetainData false
```


### Parameters

The command has the following parameters:
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">exportQueuePorts</td>
<td>Comma separated list of ports that listen to the data sent to the proxy. Can be a single port.
exportQueueOutputFile	Prefix you want the output files to have. If the prefix is wfproxy, the name of the file is wfproxy.&lt;DATA TYPE&gt;.&lt;PORT&gt;.&lt;QUEUE #&gt;.txt</td></tr>
<tr>
<td>exportQueueRetainData</td>
<td>When set to false, exports the data and removes the data from the backlog. Default is true. <strong>Note</strong>: Make a backup of the files you export. If you set <code>exportQueueRetainData</code> to false, the exported files are the only copies you have of the backlog.</td></tr>
</tbody>
</table>


### Export Example

Here's a specific example of a command, and what it does:

```
/opt/wavefront/wavefront-proxy/proxy-jre/java -jar /opt/wavefront/wavefront-proxy/wavefront-push-agent.jar --f /etc/wavefront/wavefront-proxy/wavefront.conf --exportQueuePorts 2878,3000 --exportQueueOutputFile wfproxy --exportQueueRetainData false
```


The example:

* Exports the data queued at ports 2878 and 3000.
* Creates output files that have the prefix wfproxy, such as wfproxy.points.2878.0.txt.
* Deletes all data that’s currently in the proxy queue.

Because the exported file is a newline-delimited plaintext file, it can be resent to the proxy. It is also possible to make changes to the data before resending those data to the proxy.
