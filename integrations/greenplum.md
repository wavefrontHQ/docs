---
title: VMware Tanzu Greenplum Integration
tags: [integrations list]
permalink: greenplum.html
summary: Learn about the VMware Tanzu Greenplum Integration.
---
## VMware Tanzu Greenplum

VMware Tanzu Greenplum is a massively parallel processing (MPP) database server that supports next generation data warehousing and large-scale analytics processing. This integration installs and configures Telegraf to send system and query metrics into Tanzu Observability by Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the dashboard displaying Tanzu Greenplum metrics.

{% include image.md src="images/greenplum_db.png" width="80" %}

To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## VMWare Tanzu Greenplum Setup



### Step 1. Install the Telegraf Agent

This integration uses the PostgreSQL input plugin for Telegraf. You can install the Wavefront proxy and Telegraf agent on the master host of Greenplum or on separate hosts. If you've already installed Telegraf, you can skip to Step 2.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Create the `gpperfmon` Database

To monitor the query and system metrics in Wavefront, you must create the `gpperfmon` database. For details see the [Greenplum documentation](https://docs.vmware.com/en/VMware-Tanzu-Greenplum/6/greenplum-database/GUID-ref_guide-gpperfmon-dbref.html).

### Step 3. Configure the PostgreSQL Input Plugin

On the machine where Telegraf runs, create a file called `greenplum.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.postgresql_extensible]]
  name_prefix = "greenplum."
  # specify address via a url matching:
  # postgres://[user[:password]]@localhost[/dbname]?sslmode=...
  # or a simple string:
  #   host=localhost user=gpadmin password=... sslmode=... dbname=gpperfmon
  #
  # All connection parameters are optional.  
  # Without the dbname parameter, the driver will default to a database
  # with the same name as the user. This dbname is just for instantiating a
  # connection with the server and doesn't restrict the databases we are trying
  # to grab metrics for.
  # 
  address = "host=localhost user=<user> sslmode=disable password=<password> port=<port> dbname=gpperfmon"
  
  # The parameter host specifies the IP address of master host of Greenplum.
  # The parameter port specifies the port in which the Greenplum database is configured. It is 5432 by default.
  # A list of databases to pull metrics about. If not specified, metrics for all
  # databases are gathered.
  # databases = ["app_production", "testing"]
  
  ## Whether to use prepared statements when connecting to the database.
  ## This should be set to false when connecting through a PgBouncer instance
  ## with pool_mode set to transaction.
  prepared_statements = false
  
  # Define the toml config where the sql queries are stored.
  # New queries can be added, if the withdbname is set to true and there is no
  # databases defined in the 'databases field', the sql query is ended by a 'is
  # not null' in order to make the query succeed.
  # Be careful that the sqlquery must contain the where clause with a part of
  # the filtering, the plugin will add a 'IN (dbname list)' clause if the
  # withdbname is set to true
  # Example :
  # The sqlquery : "SELECT * FROM pg_stat_database where datname" become
  # "SELECT * FROM pg_stat_database where datname IN ('postgres', 'pgbench')"
  # because the databases variable was set to ['postgres', 'pgbench' ] and the
  # withdbname was true.
  # Be careful that if the withdbname is set to false, you don't have to define
  # the where clause (aka with the dbname).
  #
  # The tagvalue field is used to define custom tags (separated by commas).
  # The query is expected to return columns which match the names of the
  # defined tags. The values in these columns must be of a string-type,
  # a number-type or a blob-type.
  [inputs.postgresql_extensible.tags]
    cluster_name = <cluster_name>
  # The parameter cluster_name specifies a unique name for the Greenplum integration.
  #
  # Structure :
  # [[inputs.postgresql_extensible.query]]
  #   sqlquery string
  #   version string
  #   withdbname boolean
  #   tagvalue string (coma separated)
  #   timestamp string
  # Query Metrics
  [[inputs.postgresql_extensible.query]]
    sqlquery="select ctime::timestamptz at time zone 'UTC' as currtime, queries_total, queries_finished, queries_blocked, queries_running, queries_queued from gpmetrics.gpcc_database_history where ctime::timestamptz between NOW() - INTERVAL '1 minutes' and NOW()"
    version=803
    withdbname=false
    timestamp="currtime"
  # Memory Metrics
  [[inputs.postgresql_extensible.query]]
    sqlquery="select ctime::timestamptz at time zone 'UTC' as currtime, total_bytes, bytes_used, bytes_available,hostname, filesystem from gpmetrics.gpcc_disk_history where ctime::timestamptz between NOW() - INTERVAL '1 minutes' and NOW()"
    version=803
    withdbname=false
    tagvalue="hostname,filesystem"
    timestamp="currtime"
  # Segment Metrics
  [[inputs.postgresql_extensible.query]]
    sqlquery="select count(*) as upsegments from pg_catalog.gp_segment_configuration where status = 'u' and content != -1"
    version=803
    withdbname=false
    tagvalue=""
  [[inputs.postgresql_extensible.query]]
    sqlquery="select count(*) as downsegments from pg_catalog.gp_segment_configuration where status = 'd' and content != -1"
    version=803
    withdbname=false
    tagvalue=""
  [[inputs.postgresql_extensible.query]]
    sqlquery="select count(*) as preferred_role from pg_catalog.gp_segment_configuration where role = preferred_role and content != -1"
    version=803
    withdbname=false
    tagvalue=""
  [[inputs.postgresql_extensible.query]]
    sqlquery="select count(*) as nonpreferred_role from pg_catalog.gp_segment_configuration where role != preferred_role and content != -1"
    version=803
    withdbname=false
    tagvalue=""
  [[inputs.postgresql_extensible.query]]
    sqlquery="select count(*) as mode_synced from pg_catalog.gp_segment_configuration where mode = 's' and content != -1"
    version=803
    withdbname=false
    tagvalue=""
  [[inputs.postgresql_extensible.query]]
    sqlquery="select count(*) as mode_nonsynced from pg_catalog.gp_segment_configuration where mode != 's' and content != -1"
    version=803
    withdbname=false
    tagvalue=""
  [[inputs.postgresql_extensible.query]]
    sqlquery="select count(distinct hostname) as segment_hosts from pg_catalog.gp_segment_configuration where content != -1"
    version=803
    withdbname=false
    tagvalue=""
  [[inputs.postgresql_extensible.query]]
    sqlquery="select extract(epoch from now()-pg_postmaster_start_time()) as uptime"
    version=803
    withdbname=false
    tagvalue=""
  [[inputs.postgresql_extensible.query]]
    sqlquery="select case when (status = 'u') then 1 else 0 end as status, case when (mode = 's') then 'Synced' else 'Non Synced' end as mode, case when (role = 'p') then 'Primary' else 'Mirror' end as role, case when (preferred_role = 'p') then 'Primary' else 'Mirror' end as preferred_role, address, port, dbid, hostname, content from pg_catalog.gp_segment_configuration where content != -1"
    version=803
    withdbname=false
    tagvalue="hostname,port,address,role,preferred_role,dbid,mode,content"
  [[inputs.postgresql_extensible.query]]
    sqlquery="select count(*)-1 as connections from pg_stat_activity"
    version=803
    withdbname=false
    tagvalue=""
  # Host Metrics
  [[inputs.postgresql_extensible.query]]
    sqlquery="select ctime::timestamptz at time zone 'UTC' as currtime, hostname, cpu_user, cpu_sys, cpu_iowait, cpu_idle, disk_rb_rate, disk_wb_rate, disk_ro_rate, disk_wo_rate, net_rb_rate, net_wb_rate, net_rp_rate, net_wp_rate, load0, load1, load2, swap_total, swap_used, swap_page_in, swap_page_out, quantum from gpmetrics.gpcc_system_history where ctime::timestamptz between NOW() - INTERVAL '1 minutes' and NOW()"
    version=803
    withdbname=false
    tagvalue="hostname"
    timestamp="currtime"
```
{% endraw %}

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.






## Metrics
  

|Metric Name|Description|
| :--- | :--- |
|greenplum.postgresql.bytes.used| Number of storage bytes used.|
|greenplum.postgresql.bytes.available|Number of storage bytes available. |
|greenplum.postgresql.uptime|The elapsed time since the Greenplum Database system was last started. |
|greenplum.postgresql.connections|The number of active Greenplum Database sessions. |
|greenplum.postgresql.segment.hosts|Number of segment hosts. |
|greenplum.postgresql.status|The overall status of all segments. |
|greenplum.postgresql.cpu.idle|Percentage of idle CPU. |
|greenplum.postgresql.cpu.iowait|The percentage of CPU used to wait on IO requests. |
|greenplum.postgresql.cpu.sys|Percentage of time CPU processes are executed in system (kernel) mode. |
|greenplum.postgresql.cpu.user|Percentage of time CPU processes are executed in user mode. |
|greenplum.postgresql.disk.rb.rate|Bytes per second for disk read operations. |
|greenplum.postgresql.disk.wb.rate|Bytes per second for disk write operations. |
|greenplum.postgresql.net.rb.rate|Bytes per second on the system network for read operations. |
|greenplum.postgresql.net.wb.rate|Bytes per second on the system network for write operations. |
|greenplum.postgresql.load0|CPU one-minute load average. |
|greenplum.postgresql.load1|CPU five-minute load average. |
|greenplum.postgresql.load2|CPU fifteen-minute load average. |
|greenplum.postgresql.queries.blocked|The number of queries started, but blocked by other transactions. |
|greenplum.postgresql.queries.finished|The number of queries that completed since the previous sampling interval. |
|greenplum.postgresql.queries.queued|Number of queries queued, but not yet running. |
|greenplum.postgresql.queries.running|Number of queries currently running. |
|greenplum.postgresql.queries.total|Total number of queries running and queued to run. |
|greenplum.postgresql.total.bytes|Total size of the file system storage in bytes. |
|greenplum.postgresql.upsegments|The number of segments with status Up. |
|greenplum.postgresql.downsegments|The number of segments with status Down. |
|greenplum.postgresql.mode.synced|The number of segment instances in sync with the mirror copy. |
|greenplum.postgresql.mode.nonsynced|The number of segment instances not in sync with the mirror copy. |
|greenplum.postgresql.nonpreferred.role|The number of segments which do not have a current role that was originally assigned at initialization time. |
|greenplum.postgresql.preferred.role|The number of segments which have a current role that was originally assigned at initialization time. |

