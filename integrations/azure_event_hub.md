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



### Adding an Azure Cloud Integration

Adding an Azure cloud integration requires establishing a trust relationship between Azure and Wavefront.

1. Log in to your Wavefront instance.
2. Follow the instructions on the left to establish the trust relationship.

The process first creates an Azure Active Directory application that represents Wavefront inside Azure. Then you retrieve information for that application, and paste it into the form on the far left to complete the trust setup.






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

