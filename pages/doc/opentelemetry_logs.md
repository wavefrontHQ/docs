---
title: Enable Logs for OpenTelemetry Data
tags: [tracing]
permalink: opentelemetry_logs.html
summary: Learn how to enable logs for your OpenTelemetry data.
---

Follow these steps to enable logs for your OpenTelemetry data. Once the logs are saved, you can see them in the directory you specified for `log-path` on your `log4j2.xml` file.

1. Open the [`<wavefront_config_path>`](#paths)`/log4j2.xml` file.
2. Add the configurations to enable and manage logs under `<Appenders>`.<br/>
  Example:

    ```
    <Appenders>
       <RollingFile name="OTLPDataFile" fileName="${log-path}/wavefront-otlp-data.log" filePattern="${log-path}/wavefront-otlp-data-%d{yyyy-MM-dd}-%i.log">
         	<PatternLayout>
             <pattern>%m%n</pattern>
         	</PatternLayout>
         	<Policies>
             <TimeBasedTriggeringPolicy interval="1" />
             <SizeBasedTriggeringPolicy size="100 MB" />
         	</Policies>
         	<DefaultRolloverStrategy max="10">
             <Delete basePath="${log-path}" maxDepth="1">
                <IfFileName glob="wavefront-otlp-data-*.log" />
               	<IfLastModified age="7d" />
             </Delete>
         	</DefaultRolloverStrategy>
       </RollingFile>
    </Appenders>
    ```
    {% include note.html content="See the [log4j2 documentation](https://logging.apache.org/log4j/2.x/manual/appenders.html) for information on each parameter."%}

3. Add the logger name for `OTLPDataLogger` inside `<Loggers>`.<br/>
    Example:

      ```
      <!-- Set level="ALL" to log OpenTelemetry/OTLP data to a file. -->
      <Loggers>
         <AsyncLogger name="OTLPDataLogger" level="ALL" additivity="false">
            <AppenderRef ref="OTLPDataFile" />
         </AsyncLogger>
      </Loggers>
      ```
4. Save the file.
