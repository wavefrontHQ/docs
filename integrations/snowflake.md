---
title: Snowflake Integration
tags: [integrations list]
permalink: snowflake.html
summary: Learn about the Wavefront Snowflake Integration.
---
## Snowflake

Snowflake is a full-featured native integration that offers agentless data ingestion of Snowflake usage metric data as well as a predefined dashboard.

In addition to setting up the metrics flow, this integration also installs a dashboard.
Here's a preview of the dashboard:

{% include image.md src="images/snowflake-dashboard.png" width="80" %}


### Add a Snowflake Integration

Use the Snowflake integration to monitor a Snowflake database and the ACCOUNT_USAGE schema. 

To register a new Snowflake instance and start monitoring the Snowflake usage, you must give Tanzu Observability by Wavefront access to your Snowflake account. The overall process involves steps which you can perform by following the instructions in your Wavefront cluster UI:

* Generate a private and a public key. 
  Snowflake supports key-pair authentication for enhanced authentication security. 
* Create a custom role that will monitor the Snowflake usage, for example `WAVEFRONT`.
* Grant the monitoring privileges to the new role.
* Grant the role with the usage privilege on the warehouse.
* Assign the role to a new or an already existing user who has the public key assigned.

After you generate the private and the public keys and create a user with the correct permissions, to register your Snowflake integration, follow these steps:

1. In the **Name** text box, provide a meaningful name.
2. In the **Account ID** text box, enter your account ID.
   For information about the Snowflake account ID, see the [Snowflake documentation](https://docs.snowflake.com/en/user-guide/admin-account-identifier.html).
3. Enter the Snowflake user name in the **Username** text box.

4. Enter the private key in the **Private Key** text box.

   The private key that you enter must begin with the line `----BEGIN PRIVATE KEY----` and end with the line `----END PRIVATE KEY----`. The private key is securely stored and never exposed except for read-only access to the Snowflake APIs.
   
4. In the **Role** and **Warehouse** text boxes, enter the role and the warehouse assigned to the user. 
   If you don't specify a role and warehouse, the default ones that are assigned to the user will be used.
4. (Optional) In the **Metric Allow List** text box, add metrics to a metrics allow list by using a regular expression. For example:
    * To monitor only the daily credit usage and a cloud services rebate for an account within the last 365 days (1 year), enter:
      <code>^snowflake.metering-daily-history.*$</code>
    * To monitor the hourly credit usage for a single warehouse (or all the warehouses in your account) within a specified date range, enter:
      <code>^snowflake.warehouse-metering-history.*$</code>
    * To monitor the average daily storage usage, in bytes, for a single database (or all the databases in your account) within a specified date range, enter:
      <code>^snowflake.database-usage-storage-usage-history.*$</code>
5. (Optional) Change the **Service Refresh Rate**. The default is `60` minutes.
6. Click **Register**.






## Metrics
  

|Metric Name|Description|
| :--- | :--- |
|snowflake.metering-daily-history.credits-adjustment-cloud-services|Number of credits adjusted for included cloud services in the day. This is a negative value, for example, -9.|
|snowflake.metering-daily-history.credits-billed|Total number of credits billed for the account in the day.|
|snowflake.metering-daily-history.credits-used|Sum of credits-used-compute and credits-used-cloud-services.|
|snowflake.metering-daily-history.credits-used-cloud-services|Number of credits billed for cloud services in the day.|
|snowflake.metering-daily-history.credits-used-compute|Number of credits billed for virtual warehouses in the day.|
|snowflake.metering-history.credits-used|Total number of credits used for the account in the hour.|
|snowflake.metering-history.credits-used-cloud-services|Number of credits used for cloud services in the hour.|
|snowflake.metering-history.credits-used-compute|Number of credits used for virtual warehouses in the hour.|
|snowflake.metering-history.files|When the service type is pipe, indicates number of files loaded.|
|snowflake.metering-history.bytes|If the service type is auto_clustering, indicates the number of bytes reclustered. If the service type is pipe, indicates the number of bytes inserted.|
|snowflake.warehouse-metering-history.credits-used|Total number of credits used for the warehouse in the hour.|
|snowflake.warehouse-metering-history.credits-used-cloud-services|Number of credits used for cloud services in the hour.|
|snowflake.warehouse-metering-history.credits-used-compute|Number of credits used for the warehouse in the hour.|
|snowflake.auto-recluster.bytes-reclustered.avg|Average bytes reclustered.|
|snowflake.auto-recluster.bytes-reclustered.sum|Total bytes reclustered.|
|snowflake.auto-recluster.credits-used.avg|Average number of credits billed for automatic clustering.|
|snowflake.auto-recluster.credits-used.sum|Total number of credits billed for automatic clustering.|
|snowflake.auto-recluster.rows-reclustered.avg|Average number of rows reclustered.|
|snowflake.auto-recluster.rows-reclustered.sum|Total number of rows reclustered.|
|snowflake.database-usage-storage-usage-history.average-database-bytes|The number of bytes of database storage used, including data in Time Travel.|
|snowflake.database-usage-storage-usage-history.average-failsafe-bytes|Number of bytes of Fail-safe storage used.|
|snowflake.pipe.bytes-inserted.avg|Average number of bytes loaded.|
|snowflake.pipe.bytes-inserted.sum|Total number of bytes loaded.|
|snowflake.pipe.credits-used.avg|Average number of credits billed for Snowpipe data loads.|
|snowflake.pipe.credits-used.sum|Total number of credits billed for Snowpipe data loads.|
|snowflake.pipe.files-inserted.avg|Average number of files loaded.|
|snowflake.pipe.files-inserted.sum|Total number of files loaded.|
|snowflake.query.blocked.sum|Total queries blocked by a concurrent DML.|
|snowflake.query.bytes-deleted.avg|Average number of bytes deleted by queries.|
|snowflake.query.bytes-scanned.avg|Average number of bytes scanned by queries.|
|snowflake.query.bytes-spilled.local.avg|Average volume of data spilled to local disk.|
|snowflake.query.bytes-spilled.remote.avg|Average volume of data spilled to remote disk.|
|snowflake.query.bytes-written.avg|Avearge number of bytes written by queries.|
|snowflake.query.compilation-time.avg|Average compilation time.|
|snowflake.query.executed.sum|Total number of executed queries.|
|snowflake.query.execution-time.avg|Average execution time.|
|snowflake.query.queued-overload.sum|Total queries blocked due to warehouse overload.|
|snowflake.query.queued-provision.sum|Total queries blocked due to provisioning.|
|snowflake.storage-usage.failsafe-bytes|Number of bytes of data in Fail-safe.|
|snowflake.storage-usage.stage-bytes|Number of bytes of stage storage used by files in all internal stages (named, table, and user).|
|snowflake.storage-usage.storage-bytes|Number of bytes of table storage used, including bytes for data currently in Time Travel.|
|snowflake.table-storage.active-bytes.avg|Bytes owned by (and billed to) this table that are in the active state for the table.|
|snowflake.table-storage.failsafe-bytes.avg|Bytes owned by (and billed to) this table that are in the Fail-safe state for the table.|
|snowflake.table-storage.retained-bytes.avg|Bytes owned by (and billed to) this table that are retained after deletion because they are referenced by one or more clones of this table.|
|snowflake.table-storage.time-travel-bytes.avg|Bytes owned by (and billed to) this table that are in the Time Travel state for the table.|
|snowflake.logins.fail.count|Count of failed logins.|
|snowflake.logins.success.count|Count of successful logins.|
|snowflake.logins.total|Total number of logins.|

