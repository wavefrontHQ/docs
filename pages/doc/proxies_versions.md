---
title: Wavefront Proxy Release Notes
keywords:
tags: [proxies, release notes]
sidebar: doc_sidebar
permalink: proxies_versions.html
summary: Release Notes for different Wavefront proxy versions.
---
This page gives an overview of important changes for the most recent Wavefront proxy releases.

* For details, see the [Wavefront proxy github page](https://github.com/wavefrontHQ/java/releases).
* For information on earlier changes, see the [Wavefront Proxy Release Notes Archive](proxies_versions_archived.html)

## Version 6.1

- Significantly improved data parsing performance and throughput.
- New custom tracing listener port and configurations added to the [Wavefront proxy configuration file](proxies_configuring.html).
- [Jaeger integration can now receive data via HTTP](proxies_configuring.html#traceJaegerHttpListenerPorts).
- Log blocked points for [histograms and spans into separate log files](proxies_configuring.html#logging).
- [Ability to export data that is queued at the proxy](proxies_installing.html#export-data-queued-at-the-proxy).

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
