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

## Next one
