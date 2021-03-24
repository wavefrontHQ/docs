---
title: Microsoft SQL Server Integration
tags: [integrations list]
permalink: sqlserver.html
summary: Learn about the Wavefront Microsoft SQL Server Integration.
---
## Microsoft SQL Server Integration

SQL Server by Microsoft is a popular enterprise RDBMS. This integration installs and configures Telegraf to send SQL server metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the performance counters section of a dashboard displaying MSSQL metrics:
{% include image.md src="images/sqlserver-perfcounters.png" width="80" %}

## Microsoft SQL Server Setup

This integration uses the MSSqlServer input plugin for Telegraf.

**Note:** This integration provides the most recent dashboard and setup instructions for the SQL server. For setup instructions of previous versions, log in to the Wavefront instance and see **SQL Server (Archived)**.



This integration is supported only on Windows.

### Step 1: Set up a Wavefront Proxy

- If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network, install a proxy.
- If you are using **MSSQL Server 13** configure the following [preprocessor rule](https://docs.wavefront.com/proxies_preprocessor_rules.html) for the Wavefront proxy.
{% raw %}
```
    - rule    : remove-empty-point-tags
      action  : replaceRegex
      scope   : pointLine
      search  : "\\s([\"\\.a-zA-Z0-9_-]*)=('[\\s]*'|\"[\\s]*\"|$|\\s)"
      replace : " "
```
{% endraw %}

### Step 2: Install the Telegraf Agent

If you've already installed Telegraf on your server(s), you can skip to step 3.

{% include windows_telegraf.md %}

### Step 3. Configure MSSQLServer Input Plugin

Create an SQL user with the required permissions on every SQL Server from which you plan to collect metrics. Use the following script after connecting to your SQL Server.
{% raw %}
```
USE master;
GO
CREATE LOGIN [telegraf] WITH PASSWORD = N'mystrongpassword';
GO
GRANT VIEW SERVER STATE TO [telegraf];
GO
GRANT VIEW ANY DEFINITION TO [telegraf];
GO

```
{% endraw %}
Edit the `telegraf.conf` file located in `Program Files\Telegraf\` and enter the following snippet:

{% raw %}
```
[[inputs.sqlserver]]
# Specify instances to monitor with a list of connection strings.
# To collect metrics from more than 1 server, run the SQL script from Step 2 on each server and provide the connection string in the "servers" section.
# All connection parameters are optional.
# By default, the host is localhost, listening on default port (TCP/1433)
#    for more information about the plugin, visit https://github.com/influxdata/telegraf/tree/master/plugins/inputs/sqlserver
#    See https://github.com/denisenkom/go-mssqldb for detailed connection parameters.

servers = [
"Server=<servername>;Port=1433;User Id=telegraf;Password=<mystrongpassword from step 2>;app name=telegraf;log=1;",
"Server=<servername>;Port=1433;User Id=telegraf;Password=<mystrongpassword from step 2>;app name=telegraf;log=1;"
]
query_version = 2
name_prefix = "MSSQL2."
```
{% endraw %}


### Step 4. Restart Telegraf

Use the `Windows Services Management Console` or execute the following from the command prompt:
{% raw %}
```
net stop telegraf
net start telegraf
```
{% endraw %}



