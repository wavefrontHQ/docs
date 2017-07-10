---
title: New Relic Integration
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_newrelic.html
summary: Learn how to send data emitted by New Relic to Wavefront.
---
[New Relic](https://www.newrelic.com/) is a popular APM solution for monitoring applications. The Wavefront collector supports pulling metrics from New Relic at least every minute. Application summary data can be polled every 30s, but is not guaranteed by New Relic to be updated that often.


## Requirements
 - The New Relic user must be an [admin](https://docs.newrelic.com/docs/apis/rest-api-v2/requirements/api-keys#key-types).
 - Python 2.7+

## Installation

```shell
$ pip install wavefront_collector
$ mkdir -p /opt/wavefront/etc/
```

## Configuration

1. Download the sample configuration files from [wavefront-integrations-tool](https://github.com/wavefront-mike/wavefront-collector/tree/master/data/newrelic-sample-configuration) and place them into `/opt/wavefront/etc`.
1. Open `/opt/wavefront/etc/newrelic-summary.conf` and `/opt/wavefront/etc/newrelic-details.conf`.
  1. Set the `key` in the `api` section.
  1. Set the `application_ids` in the `filter` section.
  1. Set the `host` and `dry_run` values in the `writer` section when ready to test.  Leave `dry_run = True` to test what would be sent to the proxy.  While `dry_run = True` run the script in the foreground so you can see the output and press **Ctrl-C** to stop execution.
1. Update other [configuration options](#proxy-configuration) as desired.
1. Save the files.

## Running the Script
The main script is `wf` (which is a symlink to `wave.py`).  It is installed by `pip` in `/usr/local/bin` on most systems.

### Command Line Options

<table>
<thead>
<tr><th>Option</th><th>Description</th><th>Default</th></tr>
</thead>
<tbody>
<tr>
<td>--config FILE</td>
<td>Full path to the configuration file</td>
<td>/opt/wavefront/etc/wavefront-collector.conf</td>
</tr>
</tbody>
</table>


### Execute

```shell
$ wf --config /opt/wavefront/etc/wavefront-collector.conf
```

### Service Script
You can also run this as a service.  A service script (`/usr/local/bin/wavefront-collector`) is provided in the pip installer. This script can be run with:

```shell
$ wavefront-collector [(start|stop|status|restart)]
```
This script assumes that you have `/opt/wavefront/etc/wavefront-collector.conf` (and is updated according to earlier steps).

### Log Files

The default log file location is `/tmp/wavefront-collector.log`.  This can be changed by editing the `/opt/wavefront/etc/wavefront-collector.conf` file.

### Caching
The responses from `*/metrics.json` API calls (the API that gets a list of metric names that are available) are cached for a day in `/tmp/wfnrcache`.  One file is stored here per API path.  The file is named by the MD5 of the API path.

## Configuration Options
The default configuration files provided should be sufficient, but all configuration options available are documented here.  Configuration is retrieved from and stored in an INI-formatted file with multiple sections.  Each section is described in more detail below.

This configuration file also acts as a fileconfig for the logger.  See <a href="https://docs.python.org/2/library/logging.config.html#logging.config.fileConfig">fileConfig definition</a> for more details on how to configure logging.

### Section: api
This section configures items related to the New Relic API.

<table width="100%">
<thead>
<tr><th>Option</th><th>Description</th><th>Required?</th><th>Default</th></tr>
</thead>
<tbody>
<tr>
<td>key</td>
<td>New Relic API key.  See <a href="https://docs.newrelic.com/docs/apis/rest-api-v2/requirements/api-keys#creating">Generate your API keys</a>.</td>
<td>Yes</td>
<td>None</td>
</tr>
<tr>
<td>endpoint</td>
<td>New Relic API endpoint</td>
<td>No</td>
<td><a href="https://api.newrelic.com/v2">https://api.newrelic.com/v2</a></td>
</tr>
<tr>
<td>log_path</td>
<td>Path to the log file that will store API requests</td>
<td>No</td>
<td>None</td>
</tr>
</tbody>
</table>

### Section: filter
This section configures the data that will be collected.

<table width="100%">
<thead>
<tr><th>Option</th><th>Description</th><th>Required?</th><th>Default</th></tr>
</thead>
<tbody>
<tr>
<td>names</td>
<td>Comma-separated list of specific names to retrieve</td>
<td>No</td>
<td>None</td>
</tr>
<tr>
<td>regex</td>
<td>Comma-separated list of regular expressions to match against results of the metrics.json calls.  White list matches are retrieved from data.json.</td>
<td>No</td>
<td>None</td>
</tr>
<tr>
<td>blacklist_regex</td>
<td>Comma-separated list of regular expressions to not include. Black list trumps white list.</td>
<td>No</td>
<td>None</td>
</tr>
<tr>
<td>additional_fields</td>
<td>Comma-separated list of metric names to retrieve in addition to the ones returned by metrics.json calls.  By default, you probably will want to include <code>HttpDispatcher,Errors,Memcached,External</code></td>
<td>No</td>
<td>None</td>
</tr>
<tr>
<td>application_ids</td>
<td>Comma-separated list of New Relic application IDs to retrieve metrics from</td>
<td>No</td>
<td>All</td>
</tr>
<tr>
<td>start_time</td>
<td>Start time for range based backfilling query (YYYY-MM-DDTHH:mm:ss+00:00)</td>
<td>No</td>
<td>None</td>
</tr>
<tr>
<td>end_time</td>
<td>End time for range based backfilling query (YYYY-MM-DDTHH:mm:ss+00:00)</td>
<td>No</td>
<td>None</td>
</tr>
</tbody>
</table>


### Section: options
This section contains various options to configure how the script is executed.

<table width="100%">
<thead>
<tr><th>Option</th><th>Description</th><th>Required?</th><th>Default</th></tr>
</thead>
<tbody>
<tr>
<td>include_application_summary</td>
<td>Include the summary metrics from the application API (error_rate, etc)</td>
<td>No</td>
<td>True</td>
</tr>
<tr>
<td>include_host_application_summary</td>
<td>Include the summary metrics from the /host/application API</td>
<td>No</td>
<td>True</td>
</tr>
<tr>
<td>include_hosts</td>
<td>Include the host metrics from /host/data.json</td>
<td>No</td>
<td>True</td>
</tr>
<tr>
<td>include_server_summary</td>
<td>Include the summary details from the /servers/data.json API</td>
<td>No</td>
<td>True</td>
</tr>
<tr>
<td>include_server_details</td>
<td>Include the server metrics from the /servers/data.json API</td>
<td>No</td>
<td>False</td>
</tr>
<tr>
<td>min_delay</td>
<td>The minimum number of seconds between the last run time and the current run time</td>
<td>No</td>
<td>60</td>
</tr>
<tr>
<td>skip_null_values</td>
<td>Do not include metrics with null values (0 is not null in this case)</td>
<td>No</td>
<td>False</td>
</tr>
<tr>
<td>default_null_value</td>
<td>If including null values, then replace 'null' with this value</td>
<td>No</td>
<td>0</td>
</tr>
<tr>
<td>max_metric_names</td>
<td>Maximum number of metric names to request at one time when querying <code>/data.json</code> API</td>
<td>No</td>
<td>25</td>
</tr>
<tr>
<td>workers</td>
<td>The number of threads to run when making <code>/data.json</code> requests</td>
<td>No</td>
<td>30</td>
</tr>
<tr>
<td>send_zero_every</td>
<td>Send 0 values no more than every x seconds. Set to 0 to send 0 values on every iteration.</td>
<td>No</td>
<td>0</td>
</tr>
</tbody>
</table>


### Section: wavefront_api

This section contains configuration items to describe the Wavefront API interaction.  This section is not used currently.

<table width="100%">
<thead>
<tr><th>Option</th><th>Description</th><th>Required?</th><th>Default</th></tr>
</thead>
<tbody>
<tr>
<td>key</td>
<td>Wavefront API Key</td>
<td>No</td>
<td>None</td>
</tr>
<tr>
<td>endpoint</td>
<td>Wavefront endpont</td>
<td>No</td>
<td>None</td>
</tr>
</tbody>
</table>


### Section: writer
This section describes how to contact the Wavefront proxy.

<table width="100%">
<thead>
<tr><th>Option</th><th>Description</th><th>Required?</th><th>Default</th></tr>
</thead>
<tbody>
<tr>
<td>host</td>
<td>The host/IP of the writer endpoint</td>
<td>Yes</td>
<td>127.0.0.1</td>
</tr>
<tr>
<td>port</td>
<td>The port of the writer endpoint</td>
<td>Yes</td>
<td>2878</td>
</tr>
<tr>
<td>dry_run</td>
<td>When True, don&rsquo;t actually send data points to the endpoint configured.  Instead, print what would have been sent on stdout.</td>
<td>No</td>
<td>True</td>
</tr>
</tbody>
</table>

## Standard Configuration

- `wavefront-collector.conf`
  - Runs the script as a daemon with the PID file stored in the current working directory (`./newrelic.pid`) and the stdout/stderr in `./newrelic.out`.
  - Runs 2 threads: one for processing the summary and one for the details.
- `summary.conf`
  - Gets the application summary every 30s (no details are retrieved so the summary metrics can be updated more frequently)
- `details.conf`
  - Gets the application (host) details and delays 5m between each run.


