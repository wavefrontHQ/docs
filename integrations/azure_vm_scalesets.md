---
title: Microsoft Azure Virtual Machine Scale Sets Integration
tags: [integrations list]
permalink: azure_vm_scalesets.html
summary: Learn about the Wavefront Microsoft Azure Virtual Machine Scale Sets Integration.
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
|azure.compute.virtualmachinescalesets.cpu.credits.consumed.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.cpu.credits.remaining.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.data.disk.queue.depth.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.data.disk.read.bytes.sec.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.data.disk.read.operations.sec.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.data.disk.write.bytes.sec.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.data.disk.write.operations.sec.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.disk.read.bytes.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.disk.read.operations.sec.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.disk.write.bytes.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.disk.write.operations.sec.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.inbound.flows.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.inbound.flows.maximum.creation.rate.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.network.in.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.network.in.total.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.network.out.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.network.out.total.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.os.disk.queue.depth.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.os.disk.read.bytes.sec.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.os.disk.read.operations.sec.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.os.disk.write.bytes.sec.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.os.disk.write.operations.sec.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.os.per.disk.qd.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.os.per.disk.read.bytes.sec.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.os.per.disk.read.operations.sec.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.os.per.disk.write.bytes.sec.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.os.per.disk.write.operations.sec.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.outbound.flows.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.outbound.flows.maximum.creation.rate.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.per.disk.qd.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.per.disk.read.bytes.sec.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.per.disk.read.operations.sec.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.per.disk.write.bytes.sec.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.per.disk.write.operations.sec.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.percentage.cpu.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.premium.os.disk.cache.read.hit.*|Statistics: average, count, maximum, minimum|
|azure.compute.virtualmachinescalesets.premium.os.disk.cache.read.miss.*|Statistics: average, count, maximum, minimum|

