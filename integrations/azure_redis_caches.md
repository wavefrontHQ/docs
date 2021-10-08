---
title: Microsoft Azure Redis Caches Integration
tags: [integrations list]
permalink: azure_redis_caches.html
summary: Learn about the Wavefront Microsoft Azure Redis Caches Integration.
---
## Microsoft Azure Integration

The Microsoft Azure integration enables monitoring Azure with Wavefront and offers pre-defined dashboards and alert conditions. 

### Metrics Configuration
Wavefront ingests Microsoft Azure metrics using the Azure Monitor APIs. For details on the metrics that the API supports, see the [documentation](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-supported-metrics).

Metrics originating from Microsoft Azure are prefixed with `azure.` within Wavefront. After you set up the integration, you can browse the available metrics in the metrics browser. 

### Dashboards

Wavefront provides Microsoft Azure dashboards for the following services:

- Azure: Application Gateways
- Azure: App Service
- Azure: Container Instances
- Azure: Cosmos DB
- Azure: Event Hub
- Azure: Files
- Azure: Functions
- Azure: HDInsight Cluster
- Azure: Kubernetes Services
- Azure: Load Balancers
- Azure: Redis Caches
- Azure: Storage Accounts
- Azure: SQL Databases
- Azure: SQL Datawarehouse
- Azure: Summary
- Azure: Virtual Machine
- Azure: Virtual Machine Scale Set

Here's a preview of the Virtual Machine dashboard:
{% include image.md src="images/azure-overview.png" width="80" %}

## Microsoft Azure Integrations



### Adding an Azure Cloud Integration

Adding an Azure cloud integration requires establishing a trust relationship between Azure and Wavefront.

1. Log in to your Wavefront instance.
2. Follow the instructions on the left to establish the trust relationship.

The process first creates an Azure Active Directory application that represents Wavefront inside Azure. Then you retrieve information for that application, and paste it into the form on the far left to complete the trust setup.





undefined


## Metrics

See [Azure documentation](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/metrics-supported) for Metrics descriptions.  

|Metric Name|Description|
| :--- | :--- |
|azure.cache.redis.cachehits.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.cachehits0.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.cachelatency.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.cachemisses.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.cachemisses0.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.cacheread.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.cacheread0.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.cachewrite.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.cachewrite0.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.connectedclients.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.connectedclients0.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.errors.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.evictedkeys.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.evictedkeys0.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.expiredkeys.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.expiredkeys0.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.getcommands.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.getcommands0.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.operationspersecond.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.operationspersecond0.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.percentprocessortime.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.percentprocessortime0.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.serverload.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.serverload0.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.setcommands.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.setcommands0.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.totalcommandsprocessed.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.totalcommandsprocessed0.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.totalkeys.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.totalkeys0.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.usedmemory.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.usedmemory0.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.usedmemorypercentage.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.usedmemoryrss.*|Statistics: average, count, maximum, minimum|
|azure.cache.redis.usedmemoryrss0.*|Statistics: average, count, maximum, minimum|

