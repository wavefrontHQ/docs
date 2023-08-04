---
title: Wavefront Proxy Release Notes Archive
sidebar: doc_sidebar
permalink: proxies_versions_archived.html
summary: Release Notes Archive for older Wavefront proxy versions.
---
This page gives an overview of changes for older Wavefront proxy releases.

{% include note.html content="Starting with Version 9, the [Wavefront proxy github page](https://github.com/wavefrontHQ/java/releases) is the single source of truth for proxy release notes. We no longer update this archive. " %}

## Version 8.2 (See Github for Newer Versions!)

Miscellaneous improvements including three new parameters support incoming TLS connections. See the [Wavefront proxy github page](https://github.com/wavefrontHQ/java/releases) for details.

See [Proxy Custom Install with Incoming TLS/SSL](proxies_manual_install.html#proxy-custom-install-with-incoming-tlsssl) for details.

## Version 7.0

- The Wavefront proxy listener port (2878) can now be used as a direct ingestion endpoint for all data (metrics, histograms, spans/span logs)
- New preprocessor features:
  * conditional logic for rules with `if` parameter
  * global and multi-port rules
  * interactive rules tester
- New proxy installs use Java 11 runtime


## Version 6.1

- Significantly improved data parsing performance and throughput.
- Redesigned and improved storage engine for spooling data to disk.
  {% include note.html content="Proxy 6.1 and later stores spooled data differently from previous versions. If the proxies in your environment have accumulated a substantial backlog, drain the backlog before upgrading to version 6.1 or later." %}
- New custom tracing listener port and configurations added to the [Wavefront proxy configuration file](proxies_configuring.html#configuration-properties).
- [Jaeger integration can now receive data via HTTP](proxies_configuring.html#traceJaegerHttpListenerPorts).
- Log blocked points for [histograms and spans into separate log files](proxies_configuring.html#proxy-log-files).
- Ability to export data that is queued at the proxy.
- Deprecated configuration options:
  - `retryThreads` configuration option is deprecated as it is no longer applicable to the new storage engine.
  - `pushLogLevel` configuration option is deprecated as logging levels are configured through log4j2 configurations.

## Version 5.7

- Miscellaneous improvements and bug fixes.
- New [proxy preprocessor rule](proxies_preprocessor_rules.html) `spanRenameTag`.

## Version 5.5

- Proxy version 5.1 had an issue with brand new non-containerized installs due to incorrect default location for buffer files. This release fixes that problem.

## Version 5.1

This version includes support for the following new functionality:

- Support for span logs. Both proxy version 5.1 and Wavefront service version 2019.30 or later are required for span logs.
- Delta counter aggregation at the proxy. Previously, only the service performed delta counter aggregation.
- New `add` functionality when [sending SourceTag or SourceDescription directly to the proxy](tags_overview.html#manage-sourcetag-and-sourcedescription-properties-at-the-proxy).
- Hot reload for proxy preprocessor rules. Proxy checks for changes to the file every 5 seconds, so proxy restart is no longer required.
- Several bug fixes and improvements related to ingestion and tracing.

## Version 4.38

* Wavefront histogram support for log ingestion
* Support HTTP payloads for raw log ingestion
* Miscellaneous bug fixes

## Version 4.36
* Generate RED metrics from tracing spans.

## Version 4.35
* First class integration for Zipkin. Anyone using Zipkin can substitute a Wavefront proxy for the Zipkin HTTP collector to send data to Wavefront.
* Fixes minor Jaeger integration issues.

## Version 4.34
* Support for trace sampling.

## Version 4.33
* First class integration for Jaeger. Anyone using Jaeger can point their agent to the Wavefront proxy instead of the Jaeger collector to send data to Wavefront.


## Version 4.32
* Compatibility with new SDKs

## Version 4.31
* Supports HTTP POST and gzipped streams for Wavefront and OpenTSDB data ingestion endpoints on the same port
* Tags `~proxy` metrics with `processId` to prevent metric name collisions in case of duplicate proxy instances
* Limits default memory usage to 8GB
* Supports a configurable idle timeout for listening ports, which defaults to 5 minutes. See our [Proxy Configuration Properties](proxies_configuring.html#configuration-properties) documentation for details.


## Version 4.27
- Enables gzip compression for sending metrics to Wavefront by default
- Supports variable sampling rate for logging valid points
- Enables `--help` command-line option
- Supports both `\u2206` and `\u0394` characters for delta metrics

## Version 4.26
- Improves proxy throughput and reduces TCP congestion when queueing
- Adds support and binaries for OpenSUSE, SUSE Linux Enterprise Server, Oracle Linux and Fedora
- Supports configurable timestamp cut-off limit for future-dated points
- Preprocessor improvements:
  - additional rule type `forceLowercase`
  - tracks CPU time spent per rule to identify performance improvement opportunities
  - supports placeholders for point tags/metric name/source name in replaceRegex rules
- Logs ingestion now supports placeholders for point tag values and improve histogram precision

## Version 4.25
- Fixes Java 9 compatibility issue
- Supports `SourceTag` and `SourceDescription` on Wavefront format listening port (2878)
- Supports tagged Graphite format (Graphite 1.1.x and newer)
- Enables logging of raw valid points to a separate file (see `log4j2.xml.default` for more details)
- Supports configurable max number of HTTP connections and automatic retries
- Implements log retention policy in the default config file
- Includes miscellaneous bug fixes, improvements, update dependencies

## Version 4.17
- Miscellaneous reliability and stability improvements.
- Accepts timestamps in microsecond and nanosecond format
- Adds `SourceTag` and `SourceDescription`

## Version 4.12
- Compatible with latest Linux kernels patched to address Stack Clash vulnerability
- Tracks proxy configuration settings as metrics with the prefix `~proxy.config`
- Detects duplicate proxy instances
- Miscellaneous bug fixes and performance/stability improvements

## Version 4.6
- Adds the ability to test log data grok patterns (see [Log Data Metrics Integration](integrations_log_data.html))
- Supports native socket transport, which improves ingestion performance on Linux

## Version 4.4
- Adds ability to ingest logs on a TCP port, in addition to the previously supported Filebeat logs (see [Log Data Metrics Integration](integrations_log_data.html))
- Fix rare bug where an old proxy would not be stopped during the upgrading process, causing the old proxy to run until `service wavefront-proxy restart`
- Miscellaneous stability and reliability improvements

## Version 4.1
- Direct log ingestion support (see [Log Data Metrics Integration](integrations_log_data.html))
- Configurable point filtering and preprocessing (see [Configuring Wavefront Proxy Preprocessor Rules](proxies_preprocessor_rules.html))
- Configurable client-side rate limiting
- Improved performance and reduced CPU and memory footprint
- Automatic log rotation and management in `/var/log/wavefront`
- Ability to log raw blocked points to a separate file
- Log remote hostname or IP address for blocked points to assist in troubleshooting
- Timestamp cut-off for backfilling historic data is now configurable
- Move config files to a more canonical location (`/etc` instead of `/opt`)
- Multiple stability improvements when operating under heavy load and/or with limited resources
- Bug fix: escaping double quotes in point tag values

Notes on upgrading:

- The default config file location is `/etc/wavefront/wavefront-proxy` and the `wavefront.log` is now located in `/var/wavefront` instead of `/var`. We recommend moving `wavefront.conf` from `/opt/wavefront/wavefront-proxy/conf` to `/etc/wavefront/wavefront-proxy` to avoid the confusion of having config files in multiple locations. The proxy is fully backwards compatible with the old config file location and will use `/opt/wavefront/wavefront-proxy/conf/wavefront.conf` first, if it's present.
- Log file location and rotation rules are configured in `/etc/wavefront/wavefront-proxy/log4j2.xml` (more [details on log4j configuration](https://logging.apache.org/log4j/2.x/manual/configuration.html#XML))
- Java 8 is now required (if you are using your own JRE)

## Version 3.24
- Support adding custom point tags to proxy's internal metrics
- Optimize handling of queued points (reduce time-at-the proxy)
- Miscellaneous bug fixes

## Version 3.23
- Reduced CPU usage in high-volume environments
- Support Http proxies requiring authentication
- HTTP proxy settings can be configured through the config file
- Miscellaneous stability improvements

## Version 3.21
- Track point lag (the difference between the current time and the point's timestamp when it arrives at the proxy)
- Reduced memory footprint
- Improved performance with very large requests
- Improved stability of the internal metrics reporting thread

## Version 3.20
- Support OpenTSDB proxy and HTTP protocols on a single port
- Support Graphite Pickle protocol
- Configure additional JVM options through a separate file instead of init script
- Improved stability on an unreliable network connection
- Ability to configure the location of buffer files through wavefront.conf
- Miscellaneous bug-fixes and improvements

## Version 3.14
- Support routing the traffic through an HTTP proxy
- Number of worker threads per port is now configurable
- Configurable custom source tags
- Support for "ephemeral" proxies (auto-removed after 24 hours of inactivity)

## Version 3.11
- The proxy now runs as daemon, so it can auto-restart on unclean exits
- Added support for collectd write_http JSON format
- Performance improvements
- Additional validations for metric names, sources and point tags + better logging

## Version 3.8
- Improved logging for blocked points
- When "source" is missing, automatically populate it from point tags
- Miscellaneous bug fixes

## Version 3.5
- Batch size and exponential back-off can be dynamically configured
- Point tag key validation
- Metric name validation performance improved
- Allow list/block list filtering performance improved
- Support E+ and e+ annotation for floating data point values
- Set timestamp at the proxy if data points don't have one

## Version 3.1
- First release supported by the one-line installer, which also simplifies future upgrades to the latest version
- Support allow list/block list regular expressions to filter incoming metrics
- OpenTSDB support
- Metric name validation

## Version 3.0
- Initial open-source release
