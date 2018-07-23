---
title: PostgreSQL Integration
tags: [integrations list]
permalink: postgresql.html
summary: Learn about the Wavefront PostgreSQL Integration.
---
## PostgreSQL Integration

PostgreSQL is a popular open source database. This integration installs and configures Telegraf to send PostgreSQL server metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the databases section of a dashboard displaying PostgreSQL metrics:
{% include image.md src="images/postgres_metrics.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## PostgreSQL Setup



**Note:** If you use vRealize Operations, the application proxy agent sets up the integration for you. See the [setup instructions](http://YOUR_CLUSTER.wavefront.com/integration/vrops/setup). Otherwise, follow the setup steps on this page.

### Step 1. Install the Telegraf Agent

This integration uses the PostgreSQL input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](http://wavefront.com/sign-up/?utm_source=docs.vmware.com&utm_medium=referral&utm_campaign=docs-front-page){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Configure PostgreSQL Input Plugin

Create a file called `postgresql.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.postgresql]]
  address = "postgres://user[:passwd]@dbserver.address[/dbname]?sslmode=[disable|verify-ca|verify-full]"
```
The dbname in the URI is for establishing a connection with the server and doesn't restrict the databases the metrics are collected for. Without the dbname parameter, the driver defaults to a database with the same name as the user.

A sample address:
```
  address = "postgres://testUser:testPwd@dbserver1.mycompany.com/testDB?sslmode=disable"
```

To ignore specific databases, include the `ignored_databases` property. For example:
```
  ignored_databases = ["postgres", "template0", "template1"]
```

To monitor specific databases, include the `databases` property. For example:
```
  databases = ["production_db", "app1", "app2"]
```
{% endraw %}

**Note:** Do not include both `databases` and `ignored_databases`. If neither property is specified, metrics for all databases are collected.

To monitor multiple PostgreSQL instances, add `[[inputs.postgresql]]` sections to the configuration file.

### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.
