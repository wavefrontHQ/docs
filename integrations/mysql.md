---
title: MySQL Integration
tags: [integrations list]
permalink: mysql.html
summary: Learn about the MySQL Integration.
---
## MySQL Integration

MySQL is an open source relational database management system. This integration installs and configures Telegraf to send MySQL metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. For example, here's screenshot of dashboard with statistics collected from MySQL server.
{% include image.md src="images/mysql-metrics.png" width="80" %}



To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## MySQL Setup



### Step 1. Install the Telegraf Agent

This integration uses the MySQL input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Configure MySQL Input Plugin

1. Create a file called `mysql.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
    ```
    # Read metrics from one or many mysql servers
    [[inputs.mysql]]
      ## specify servers via a url matching:
      ##  [username[:password]@][protocol[(address)]]/[?tls=[true|false|skip-verify]]
      ##  see https://github.com/go-sql-driver/mysql#dsn-data-source-name
      ##  e.g.
      ##    servers = ["user:passwd@tcp(127.0.0.1:3306)/?tls=false"]
      ##    servers = ["user@tcp(127.0.0.1:3306)/?tls=false"]
      #
      ## CHANGE THE SERVERS FIELD HERE
      servers                                   = ["mysql_user:password@tcp(127.0.0.1:3306)/"]
      ## Selects the metric output format.
      ##
      ## This option exists to maintain backwards compatibility, if you have
      ## existing metrics do not set this value until you are ready to
      ## migrate to the new format.
      ##
      ## If you do not have existing metrics from this plugin set to the latest
      ## version.
      ##
      ## Telegraf >=1.6: metric_version = 2
      ##           <1.6: metric_version = 1 (or unset to maintain backwards compatibility)
      metric_version = 2
      #
      ## the limits for metrics form perf_events_statements
      perf_events_statements_digest_text_limit  = 120
      perf_events_statements_limit              = 250
      perf_events_statements_time_limit         = 86400
      #
      ## if the list is empty, then metrics are gathered from all database tables
      table_schema_databases                    = []
      #
      ## gather metrics from INFORMATION_SCHEMA.TABLES for databases provided above list
      # gather_table_schema                       = false
      #
      ## gather thread state counts from INFORMATION_SCHEMA.PROCESSLIST
      gather_process_list                       = true
      #
      ## gather thread state counts from INFORMATION_SCHEMA.USER_STATISTICS
      # gather_user_statistics                    = true
      #
      ## gather auto_increment columns and max values from information schema
      # gather_info_schema_auto_inc               = true
      #
      ## gather metrics from INFORMATION_SCHEMA.INNODB_METRICS
      # gather_innodb_metrics                     = true
      #
      ## gather metrics from SHOW SLAVE STATUS command output
      # gather_slave_status                       = true
      #
      ## gather metrics from SHOW BINARY LOGS command output
      # gather_binary_logs                        = false
      #
      ## gather metrics from PERFORMANCE_SCHEMA.TABLE_IO_WAITS_SUMMARY_BY_TABLE
      gather_table_io_waits                     = true
      #
      ## gather metrics from PERFORMANCE_SCHEMA.TABLE_LOCK_WAITS
      gather_table_lock_waits                   = true
      #
      ## gather metrics from PERFORMANCE_SCHEMA.TABLE_IO_WAITS_SUMMARY_BY_INDEX_USAGE
      gather_index_io_waits                     = true
      #
      ## gather metrics from PERFORMANCE_SCHEMA.EVENT_WAITS
      gather_event_waits                        = true
      #
      ## gather metrics from PERFORMANCE_SCHEMA.FILE_SUMMARY_BY_EVENT_NAME
      gather_file_events_stats                  = true
      #
      ## gather metrics from PERFORMANCE_SCHEMA.EVENTS_STATEMENTS_SUMMARY_BY_DIGEST
      gather_perf_events_statements             = true
      #
      ## Some queries we may want to run less often (such as SHOW GLOBAL VARIABLES)
      interval_slow                             = "30m"
    ```
{% endraw %}

1. Replace the `servers` value with your MySQL server URL. Specify your servers with URL matching.
    
    Format:{% raw %}
    ```
    servers = [username[:password]@][protocol[(address)]]/[?tls=[true|false|skip-verify]]
    ```
{% endraw %}
    Example:{% raw %}
    ```
    servers = ["user:password@tcp(your_mysql_server:3306)/"]
    ```
{% endraw %}

### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.



