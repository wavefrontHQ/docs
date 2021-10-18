---
title: Microsoft Azure Storage Integration
tags: [integrations list]
permalink: azure_storage.html
summary: Learn about the Wavefront Microsoft Azure Storage Integration.
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



### Add a Microsoft Azure Cloud Integration

Adding a Microsoft Azure cloud integration requires establishing a trust relationship between Azure and Wavefront.

1. Click **How to get the Directory ID**, **How to get the Application ID**, and **How to get the Application Secret** to see the list of steps.
2. Follow the instructions displayed on the left to establish the trust relationship.

The process first creates an Azure Active Directory application that represents Wavefront inside Azure. Then you retrieve information for that application, and paste it into the form on the far left to complete the trust setup.





undefined


## Metrics

See [Azure documentation](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/metrics-supported) for Metrics descriptions.  

|Metric Name|Description|
| :--- | :--- |
|azure.storage.storageaccounts.availability.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.blobservices.availability.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.blobservices.blobcapacity.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.blobservices.blobcount.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.blobservices.containercount.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.blobservices.egress.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.blobservices.indexcapacity.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.blobservices.ingress.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.blobservices.successe2elatency.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.blobservices.successserverlatency.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.blobservices.transactions.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.egress.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.fileservices.availability.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.fileservices.egress.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.fileservices.filecapacity.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.fileservices.filecount.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.fileservices.filesharecount.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.fileservices.filesharequota.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.fileservices.filesharesnapshotcount.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.fileservices.filesharesnapshotsize.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.fileservices.ingress.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.fileservices.successe2elatency.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.fileservices.successserverlatency.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.fileservices.transactions.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.ingress.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.queueservices.queuecapacity.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.queueservices.queuecount.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.queueservices.queuemessagecount.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.successe2elatency.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.successserverlatency.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.tableservices.availability.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.tableservices.egress.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.tableservices.ingress.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.tableservices.successe2elatency.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.tableservices.successserverlatency.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.tableservices.tablecapacity.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.tableservices.tablecount.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.tableservices.tableentitycount.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.tableservices.transactions.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.transactions.*|Statistics: average, count, maximum, minimum|
|azure.storage.storageaccounts.usedcapacity.*|Statistics: average, count, maximum, minimum|

