---
title: Wavefront Proxy Versions
keywords:
tags: [proxies, release notes]
sidebar: doc_sidebar
permalink: proxies_versions.html
summary: Learn about Wavefront proxy versions.
---
## Version 4.6
- Adds the ability to test log data grok patterns (see [Log Data Metrics Integration](integrations_log_data))
- Supports native socket transport, which improves ingestion performance on Linux
 
## Version 4.4
- Adds ability to ingest logs on a TCP port, in addition to the previously supported Filebeat logs (see [Log Data Metrics Integration](integrations_log_data))
- Fix rare bug where an old proxy would not be stopped during the upgrading process, causing the old proxy to run until `service wavefront-proxy restart`
- Miscellaneous stability and reliability improvements
 
## Version 4.1
- Direct log ingestion support (see [Log Data Metrics Integration](integrations_log_data))
- Configurable point filtering and preprocessing (see [Configuring Wavefront Proxy Preprocessor Rules](proxies_preprocessor_rules))
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
- Miscellaneous bugfixes
 
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
- Whitelist/blacklist filtering performance improved
- Support E+ and e+ annotation for floating data point values
- Set timestamp at the proxy if data points don't have one
 
## Version 3.1
- First release supported by the one-line installer, which also simplifies future upgrades to the latest version
- Support whitelist/blacklist regular expressions to filter incoming metrics
- OpenTSDB support
- Metric name validation
 
## Version 3.0
- Initial open-source release


