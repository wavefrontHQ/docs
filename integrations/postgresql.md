---
title: PostgreSQL Integration
tags: [integrations list]
permalink: postgresql.html
summary: Learn about the PostgreSQL Integration.
---

This page provides an overview of what you can do with the PostgreSQL integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the PostgreSQL integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **PostgreSQL** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## PostgreSQL Integration

PostgreSQL is a popular open source database. This integration installs and configures Telegraf to send PostgreSQL server metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the databases section of a dashboard displaying PostgreSQL metrics:
{% include image.md src="images/postgres_metrics.png" width="80" %}



## Metrics

For details about these metrics, see the [PostgreSQL Statistics Collector](https://www.postgresql.org/docs/current/monitoring-stats.html) documentation.

|Metric Name|Description|
| :--- | :--- |
|postgresql.blk.*|Read and write time for a block.|
|postgresql.blk.read.time||
|postgresql.blk.write.time||
|postgresql.blks.*|Number of blocks hit and read.|
|postgresql.blks.hit||
|postgresql.blks.read||
|postgresql.buffers.*|Buffer metrics. |
|postgresql.buffers.alloc||
|postgresql.buffers.backend||
|postgresql.buffers.backend.fsync||
|postgresql.buffers.checkpoint||
|postgresql.buffers.clean||
|postgresql.checkpoint.*|Checkpoint metrics. |
|postgresql.checkpoint.sync.time||
|postgresql.checkpoint.write.time||
|postgresql.checkpoints.req||
|postgresql.checkpoints.timed||
|postgresql.conflicts|Number of queries that were canceled due to recovery conflicts.|
|postgresql.datid||
|postgresql.deadlocks|Number of deadlocks.|
|postgresql.maxwritten.clean|Number of times the background writer stopped a cleaning scan because it had written too many buffers.|
|postgresql.numbackends|Number of buffers written directly by a backend.|
|postgresql.temp.*|Temp metrics.|
|postgresql.temp.bytes||
|postgresql.temp.files||
|postgresql.tup.*|Metrics for the number of rows deleted, fetched, inserted, etc.|
|postgresql.tup.deleted||
|postgresql.tup.fetched||
|postgresql.tup.inserted||
|postgresql.tup.returned||
|postgresql.tup.updated||
|postgresql.xact.commit|Number of committed transactions.|
|postgresql.xact.rollback|Number of rolled back transactions. |

