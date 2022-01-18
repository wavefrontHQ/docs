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


[[snowflakeSetup]]





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

