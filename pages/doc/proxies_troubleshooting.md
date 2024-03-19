---
title: Proxy Troubleshooting
keywords:
tags: [proxies, data]
sidebar: doc_sidebar
permalink: proxies_troubleshooting.html
summary: Troubleshoot proxy problems.
---

Wavefront proxies give you a lot of flexibility and control in your VMware Tanzu Observability (formerly known as VMware Aria Operations for Applications) environment. But with flexibility comes the potential for problems, so it's a best practice to [monitor you proxies](monitoring_proxies.html). For example, on the Proxies Browser page, you can see the account used to set up a specific proxy.

In addition, our SaaS Value Engineering team has put together the following troubleshooting advice.

## Validate Metrics Received at the Proxy

As part of troubleshooting, it's often useful to check if metrics are received at the proxy in the intended format. See [Tanzu Observability data format best practices](wavefront_data_format.html#tanzu-observability-data-format-best-practices) for background.

### Step 1: Enable Valid Point Logging and Examine Valid Points

To capture all valid points that are received at the proxy to a local log file, enable raw valid point logging.

{% include warning.html content="Enable valid point logging only for a short time during troubleshooting. The log files will use a lot of disk space quickly."%}

1. Open the `<wavefront_config_path>/log4j2.xml` file and uncomment the relevant sections below. See [Proxy File Paths](/proxies_configuring.html#proxy-file-paths) for default file locations.

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

2. Validate that the `<wavefront_log_path>/wavefront.log` file indicates that logging is enabled as shown below:

   ```
   2021-04-02 05:53:24,436 INFO [sampling:refreshLoggerState] Valid points logging is now enabled with 100.0% sampling
   ```

3. Examine the log file.

   By default, valid point entries are logged to a `<wavefront_log_path>/wavefront-valid-points.log` file. For example, in a typical Linux install, the file is located at `/var/log/wavefront/wavefront-valid-points.log`.


{% include tip.html content="If the metric points are not written to the `wavefront-valid-points.log` file, verify that the data is not being blocked by logging all the raw blocked data in a separate file for analysis--see Step 2."%}


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

2. Examine the blocked points entries in the `<wavefront_log_path>/wavefront-blocked-points.log` file.

   The log file is rolled over every day when its size reaches 100MB.

## Common Proxy Log Messages

This section describes commonly seen messages Wavefront proxy logs, organized by severity.

### Proxy INFO Messages

**Proxy Start-up INFO Messages**


* Message
   ```
   INFO [proxy:parseArguments] Wavefront Proxy version <Proxy version>, runtime: OpenJDK Runtime Environment (Azul Systems, Inc.) <JDK version>
   ```
* Explanation:

  This is the first start-up message. Includes the version of the Wavefront proxy.

<br/>
<br/>

* Message:
   ```
   INFO [proxy:lambda$startListeners$7] listening on port: 2878 for Wavefront metrics
   ```
* Explanation:

  The proxy has been configured to listen for metrics using the Tanzu Observability Data Format on port 2878. If tracing or histograms are configured, you should see a corresponding message. For example:

  ```
  INFO [proxy:startTraceListener] listening on port: 30000 for trace data
  ```
<br/>
<br/>

* Message:
   ```
   INFO [proxy:run] setup complete
   ```
* Explanation:

  Proxy setup has completed.


**Preprocessor Rule INFO Message**

* Message:
  ```
  INFO [PreprocessorConfigManager:loadFromStream] Loaded <#> rules for port :: <port>
  ```
* Explanation:

  A certain number of rules has been detected and loaded for the specified port

**Proxy Check-in INFO Message**

* Message:
   ```
   INFO [proxy:checkin] Checking in: https://<cluster>.wavefront.com/api
   ```
* Explanation:

  The proxy successfully checked in with the Tanzu Observability backend. A message like this should appear at 1 minute intervals (approximately).

**Processed Since Start INFO Message**

* Message:
  ```
  INFO [AbstractReportableEntityHandler:printTotal] [<port>] <Points/Histograms/Spans/SpanLogs/etc> processed since start: <#>; blocked: <#>
  ```
* Explanation:

  Shows the number of data points processed and blocked for the specified type on the specified port since the start of the proxy process.


**Proxy Queue Size INFO Message**

* Message:
   ```
   INFO  [QueuedAgentService:lambda$new$5] current retry queue sizes: [<#>/<#>/<#>/<#>]
   ```
* Explanation:

  Indicates the size of the proxy queues.


**WF-300 Cannot Parse INFO Message**

* Message:
```
INFO [AbstractReportableEntityHandler:reject] [<port>] blocked input: [WF-300 Cannot parse: "<data point>"; remote: <address> [<port>]; reason: "Could not parse: <data point>", root cause: "<portion of data point> is not allowed here!"
```
* Explanation:

  A data point is not formatted properly and was blocked by the proxy.

* Potential Resolution:

  Confirm that the data point conforms to the format configured for the specified port. The proxy can handle various different data formats. Ensure that the data format you've configured for the port matches the format of data arriving at that port.

  If the port is configured for standard [Tanzu Observability data format](wavefront_data_format.html), check the format of the data point mentioned in the log message.


### Proxy WARN Messages

**406 - Cannot Post Push Data WARN Message**

* Message:
   ```
   WARN  [QueuedAgentService:handleTaskRetry] Cannot post push data result to Wavefront servers. Will enqueue and retry later: java.util.concurrent.RejectedExecutionException: Response not accepted by server: 406
  ```
* Explanation:

  The proxy has queued up some data and will retry momentarily. This behavior is common and occurs often when the proxy attempts to send a burst of data to the backend. When the burst of data is temporarily at a higher rate than the backend limit (based on your contracted rate), the proxy queues up the data to smooth out your data rate. Typically this is not a cause for concern.

* Potential Resolution:

  1. Log in to your service instance and navigate to the **Operations for Applications Usage** integration.
  2. In the **Operations for Applications Service and Proxy Data** dashboard check if the proxy's queue and backlog are staying the same size or growing.
    * If they're growing, then the attempted rate of ingest is higher than allowed by the backend limit. Either lower the rate of data that is at the proxies, or contact our Technical Support team to request a higher backend limit. If your overall rate of data ingestion is higher than your contract rate, you may incur overage charges.
    * If the proxy's queue size is spiky (going up and coming down, close to 0), then the proxy is effectively smoothing out bursts in your rate of data ingestion. This is normal behavior and is not a cause for concern.


**Global Rate Limit Exceeded WARN Message**

* Message:
  ```
  WARN  [QueuedAgentService:run] [RETRY THREAD <#>] Wavefront server rejected the submission (global rate limit exceeded) - will attempt later.
  ```
* Explanation:

  The proxy attempts to send data to the backend but the overall ingestion rate has exceeded the backend limit. The proxy will continue to keep the data queued. This message is often seen along with the 406 message.

* Potential Resolution:

  The current rate of data is higher than the backend limit and the data will stay in the queues until the next retry. See **406 - Cannot Post Push Data WARN Message** for details.


**Disconnected, Unterminated String WARN Message**

* Message:
  ```
  WARN [PlainTextOrHttpFrameDecoder:decodeLast] Client <client address> [<port>] disconnected, leaving unterminated string. Input (<#> bytes) discarded: "<discarded data>"
  ```
* Explanation:

  The proxy has received a data point without a line terminator (i.e. a newline character). This usually happens when the client disconnects prematurely, leaving the proxy with an incomplete (partially sent) data point.

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
* Explanation: The proxy cannot connect using the token provided.
  
  {% include important.html content="Starting July 3, 2023, Tanzu Observability is a service on the VMware Cloud services platform. The [proxy authentication](proxies_installing.html#proxy-authentication-types) to Tanzu Observability differs for VMware Cloud services subscriptions and original subscriptions."%}

  <table>
  <tbody>
  <thead>
  <tr>
  <th width="50%">VMware Cloud Services Subscriptions</th>
  <th width="50%">Original Subscriptions</th>
  </tr>
  </thead>
  <tr>
  <td><ul>
  <li>If the proxy uses the <strong>OAuth app</strong> authentication type, the corresponding server to server app might have been deleted or might have not the <strong>Proxies</strong> service role.</li>
  <li>If the proxy uses the <strong>API token</strong> authentication type, the API token might have been deleted or expired, or might have not the <strong>Proxies</strong> service role. The user account associated with the token might have been removed.</li>
  </ul></td>
  <td>The API token or the account associated with the API token might have been deleted or might not have the <strong>Proxies</strong> permissions.</td>
  </tr>
  </tbody>
  </table>

* Potential Resolution:

  <table>
  <tbody>
  <thead>
  <tr>
  <th width="50%">VMware Cloud Services Subscriptions</th>
  <th width="50%">Original Subscriptions</th>
  </tr>
  </thead>
  <tr>
  <td><ul>
  <li>Validate that the API token or the OAuth app credentials that the proxy is using are correct and active.</li>
  <li>Validate that the user account associated with the token or the corresponding server to server app is active.</li>
  <li>Ensure that the corresponding server to server app, or the API token and the associated user account have the <strong>Proxies</strong> service role.</li></ul></td>
  <td><ul>
  <li>Validate that the token used by the proxy is correct and active.</li>
  <li>Validate that the user or server account associated with the token is active.</li>
  <li>Ensure that the user or service account associated with the token has the <strong>Proxies</strong> permission.</li></ul></td>
  </tr>
  </tbody>
  </table>

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
* Explanation:

  The proxy is running out of disk space or the queue (buffer) files are exceeding their maximum allowed size (normally 2GB).

* Potential Resolution:

  - Ensure that the proxy has enough disk space.
  - Check the size of the buffer files (located at the spool path). If the files are at or near the maximum allowed size, data is likely arriving at the proxy at a higher rate than the backend limit.
  - Decrease the rate of data arriving at the proxy or distribute your data ingestion to another proxy.

## Manage the Proxy Queue

### Export Data Queued at the Proxy

If you send too much data or if there is a network error, data starts to queue at the Wavefront proxy and create a backlog. Advanced users might consider exporting data that is queued at the proxy, and, for example, remove data that is not required.

#### Export Command

Use the following command to export the data that is queued at the proxy.

```
/opt/wavefront/wavefront-proxy/proxy-jre/java -jar /opt/wavefront/wavefront-proxy/wavefront-push-agent.jar --f /etc/wavefront/wavefront-proxy/wavefront.conf --exportQueuePorts <ports> --exportQueueOutputFile <outputFileNamePrefix> --exportQueueRetainData false
```

#### Export Command for Containerized Proxies

Because containers are stateless, restarting a proxy container normally results data loss for the proxy’s queues. Exporting the queued data before a persistent storage restart can help retain the data.

If your proxy is containerized, the command is similar to the following.

```
java -jar /opt/wavefront/wavefront-proxy/bin/wavefront-proxy.jar --exportQueuePorts <ports> --exportQueueOutputFile <outputFileNamePrefix> --exportQueueRetainData false
```

#### Parameters

The command has the following parameters:

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">exportQueuePorts</td>
<td>Comma separated list of ports that listen to the data sent to the proxy. Can be a single port.</td></tr>
<tr>
<td markdown="span">exportQueueOutputFile</td>
<td>Prefix you want the output files to have. If the prefix is wfproxy, the name of the file is wfproxy.&lt;DATA TYPE&gt;.&lt;PORT&gt;.&lt;QUEUE #&gt;.txt</td></tr>
<tr>
<td>exportQueueRetainData</td>
<td>When set to false, exports the data and removes the data from the backlog. Default is true. <strong>Note</strong>: Back up the files you export. If you set <code>exportQueueRetainData</code> to false, the exported files are the only copies you have of the backlog.</td></tr>
</tbody>
</table>

#### Export Example

Here's a specific example of a command, and what it does:

```
/opt/wavefront/wavefront-proxy/proxy-jre/java -jar /opt/wavefront/wavefront-proxy/wavefront-push-agent.jar --f /etc/wavefront/wavefront-proxy/wavefront.conf --exportQueuePorts 2878,3000 --exportQueueOutputFile wfproxy --exportQueueRetainData false
```

This example:

* Exports the data queued at ports 2878 and 3000.
* Creates output files that have the prefix wfproxy, such as wfproxy.points.2878.0.txt.
* Deletes all data that’s currently in the proxy queue.

Because the exported file is a newline-delimited plaintext file, it can be resent to the proxy. It is also possible to make changes to the data before resending the data to the proxy.


### Remove Queued Data at the Proxy

If, for any reason, you have to truncate the proxy queue, you can do it locally by cleaning up the buffer directory, or remotely using the API with the `truncate` flag.

{% include warning.html content="Truncating the proxy can lead to data loss, but helps if you cannot safely empty queued proxy data in other ways." %}


#### Option 1: Delete the Buffer Files

In most cases, you truncate the proxy queue by deleting the files in the proxy queue directory.

1. Connect to the proxy machine and navigate to the queue/buffer file directory.
   * By default, the proxy buffer files are located under the `<wavefront_spool_path>` heading.
   * The location is configurable via the buffer property. Check whether a different location has been set.

   You should see file names such as `buffer.<data type>.<port>.<#>.spool`. If the filename looks different, you may be using an old proxy version. Upgrade the proxy.
2. Stop the proxy.
3. Delete buffer files. The filenames specify the type of data and port number. For example, if you no longer need any of the metrics ingested through port 2878, delete all of the files that have filenames that start with `buffer.points.2878`.
3. Restart the proxy. The proxy recognizes that there is no queued data and internal metrics indicate this.


#### Option 2: Remove the Files Via Export

An alternative to deleting data is to [export queued data](#export-data-queued-at-the-proxy).
* Set the `exportQueueRetainData` flag to false to clear the queued data.
* Set `exportQueueOutputFile` to `/dev/null` or a similar temporary location.

<!--- Currently an issue with this, reported by SVE team. Added single quotes around {"truncate":true}, requested by SVE team.

#### Option 3: Truncate Proxy Queue with the API

If you can't connect to the proxy machine or don't have permissions for the proxy queue directory, you can truncate the queue with the API.

Run the following command:

```curl
$curl -X PUT -H 'Authorization: Bearer <TOKEN>' -H 'Content-Type: application/json' "https://MY_INSTANCE.wavefront.com/api/v2/proxy/PROXY_ID" -d '{"truncate":true}'
```

In the URL:
* `MY_INSTANCE` is your Wavefront instance, for example, the URL could start with `https://example.wavefront.com`
* `PROXY_ID` is the ID, which you can find in the Proxies browser in the Hostname column.
--->


## Enable Proxy Health Checks

The ability to have proactive system performance and reliability begins with regular health checks. You can set up proxy health checks to validate the proxies' availability to a load balancer pool or to allow Kubernetes to check if a proxy restart is required.

{% include tip.html content="The setup requires proxy 9.0 or later. However, because of the log4j security issue with older proxy, using proxy 10.14 or later is highly recommended. "%}


1. Open the `wavefront.conf` file for edit. See [Proxy File Paths](/proxies_configuring.html#proxy-file-paths) for the default locations.

2. Update the `Managed HealthCheck Endpoint` section in the `wavefront.conf` file.

  Here's a specific example:

```
############################ MANAGED HEALTHCHECK ENDPOINT ########################
## Comma-delimited list of ports to function as standalone healthchecks.
## May be used independently of httpHealthCheckAllPorts parameter. Default: none
httpHealthCheckPorts=8880
## When true, all listeners that support HTTP protocol also respond to healthcheck requests.
## May be used independently of httpHealthCheckPorts parameter. Default: false
httpHealthCheckAllPorts=true
## Healthcheck's path, for example, '/health'. Default: '/'
httpHealthCheckPath=/status
## Optional Content-Type to use in healthcheck response, for example, 'application/json'. Default: none
httpHealthCheckResponseContentType=text/plain
## HTTP status code for 'pass' health checks. Default: 200
httpHealthCheckPassStatusCode=200
## Optional response body to return with 'pass' health checks. Default: none
httpHealthCheckPassResponseBody=good to go!
## HTTP status code for 'fail' health checks. Default: 503
httpHealthCheckFailStatusCode=503
## Optional response body to return with 'fail' health checks. Default: none
httpHealthCheckFailResponseBody=try again later...
## Enables admin port to control healthcheck status per port. Default: none
adminApiListenerPort=8888
## Remote IPs must match this regex to access admin API
adminApiRemoteIpAllowRegex=^.*$
```
This example
* Enables the health check status to be returned for `http://<<host>>:8880/status`.
* Sends a return code '200' if healthy and '503' if it fails because the `httpHealthCheckPassStatusCode` is configured.

The example test output might look like this.

![screenshot with curl command showing health check is enabled](images/proxy_health_check.png)

The `curl` command checks for status, and the status 200 is returned.

## Cannot Modify the Proxy (Tanzu Observability Installed Through Tanzu Mission Control)

<!---This content also in integrations_tmc_howto.html--->

**Symptom**

You're monitoring your Kubernetes cluster with Tanzu Observability. You installed Tanzu Observability from Tanzu Mission Control. Now you're having problems making a change to the Wavefront proxy.

**Cause**

If you installed Tanzu Observability from Tanzu Mission Control, you cannot make changes to the Wavefront proxy.

**Resolution**

If your environment has a standalone Tanzu Observability instance, use that instance. We are working on resolving the issue.

## Proxies FAQ

This section gives answers to some frequently asked questions. We expect to add more questions and answers as we hear from customers.

### Can You Explain wavefront-proxy timestamps and Tanzu Observability timestamps?

The Wavefront proxy sends metric timestamps as milliseconds, but the ingestion layer of the Tanzu Observability service converts and stores the information as seconds.
