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

Adding a Microsoft Azure cloud integration requires establishing a trust relationship between Azure and Wavefront. The overall process involves the following:

* Getting a Directory ID
* Creating an Azure Active Directory application that represents Wavefront inside Azure and getting the Application ID.
* Creating a secret key and getting the Application secret.

1. In the **Name** text box, enter a meaningful name.
2. In the **Directory ID** text box, enter your Microsoft Azure Directory ID.
3. In the **Application ID** text box, enter the Azure Active Directory Application (client) ID.
4. In the **Application Secret** text box, enter the secret key that you created. 
   The Azure application secret that you enter is securely stored and never exposed except for read only access to the Azure APIs.
5. (Optional) Enter the category names to fetch.
6. (Optional) In the **Metric Allow List** text box, you can add metrics to an allow list by entering a regular expression. For example, <code>^azure.(compute|dbforpostgresql).*$</code>.
7. (Optional) Enter the resource group names to fetch.
8. Select whether you want to fetch logs. 
   If you decide that you want to fetch activity logs, you can also specify the log categories to fetch, e.g. Administrative, Service health, Alert, and so on.
9. Click **Register**.








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

