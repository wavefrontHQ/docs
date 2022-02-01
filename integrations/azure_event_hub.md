---
title: Microsoft Azure Event Hub Integration
tags: [integrations list]
permalink: azure_event_hub.html
summary: Learn about the Wavefront Microsoft Azure Event Hub Integration.
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
|azure.eventhub.namespaces.activeconnections.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.connectionsclosed.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.connectionsopened.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.ehabl.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.ehambs.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.ehamsgs.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.ehinmbs.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.ehinmsgs.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.ehoutbytes.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.ehoutmbs.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.ehoutmsgs.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.failreq.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.incomingbytes.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.incomingmessages.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.incomingrequests.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.inmsgs.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.inreqs.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.interr.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.miscerr.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.outgoingbytes.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.outgoingmessages.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.outmsgs.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.servererrors.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.size.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.successfulrequests.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.succreq.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.svrbsy.*|Statistics: average, count, maximum, minimum|
|azure.eventhub.namespaces.usererrors.*|Statistics: average, count, maximum, minimum|

