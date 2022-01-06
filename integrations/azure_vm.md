---
title: Microsoft Azure Virtual Machine Integration
tags: [integrations list]
permalink: azure_vm.html
summary: Learn about the Wavefront Microsoft Azure Virtual Machine Integration.
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
|azure.compute.vm.cpu.credits.consumed.*| Total number of credits consumed by the Virtual Machine. <br/>Statistics: count|
|azure.compute.vm.cpu.credits.remaining.*| Total number of credits available to burst. <br/>Statistics: count |
|azure.compute.vm.data.disk.queue.depth.*| Data Disk Queue Depth(or Queue Length). <br/>Statistics: count|
|azure.compute.vm.data.disk.read.bytes.sec.*| Bytes/Sec read from a single disk during monitoring period. <br/>Statistics: count|
|azure.compute.vm.data.disk.read.operations.sec.*| Read IOPS from a single disk during monitoring period. <br/>Statistics: count|
|azure.compute.vm.data.disk.write.bytes.sec.*| Bytes/Sec written to a single disk during monitoring period. <br/>Statistics: count|
|azure.compute.vm.data.disk.write.operations.sec.*| Write IOPS from a single disk during monitoring period. <br/>Statistics: count|
|azure.compute.vm.disk.read.bytes.*| Bytes read from disk during monitoring period. <br/>Statistics: count|
|azure.compute.vm.disk.read.operations.sec.*| Disk Read IOPS. <br/>Statistics: count|
|azure.compute.vm.disk.write.bytes.*| Bytes written to disk during monitoring period. <br/>Statistics: count|
|azure.compute.vm.disk.write.operations.sec.*| Disk Write IOPS. <br/>Statistics: count|
|azure.compute.vm.inbound.flows.*| Inbound Flows are number of current flows in the inbound direction (traffic going into the VM). <br/>Statistics: count|
|azure.compute.vm.network.in.total.*| The number of bytes received on all network interfaces by the Virtual Machine(s) (Incoming Traffic). <br/>Statistics: count|
|azure.compute.vm.network.out.total.*| The number of bytes out on all network interfaces by the Virtual Machine(s) (Outgoing Traffic). <br/>Statistics: count|
|azure.compute.vm.os.disk.queue.depth.*| OS Disk Queue Depth(or Queue Length). <br/>Statistics: count|
|azure.compute.vm.os.disk.read.bytes.sec.*| Bytes/Sec read from a single disk during monitoring period for OS disk. <br/>Statistics: count|
|azure.compute.vm.os.disk.read.operations.sec.*| Read IOPS from a single disk during monitoring period for OS disk. <br/>Statistics: count|
|azure.compute.vm.os.disk.write.bytes.sec.*| Bytes/Sec written to a single disk during monitoring period for OS disk. <br/>Statistics: count|
|azure.compute.vm.os.disk.write.operations.sec.*| Write IOPS from a single disk during monitoring period for OS disk. <br/>Statistics: count|
|azure.compute.vm.os.per.disk.qd.*| OS Disk Queue Depth(or Queue Length). <br/>Statistics: count|
|azure.compute.vm.os.per.disk.read.operations.sec.*| Read IOPS from a single disk during monitoring period for OS disk. <br/>Statistics: count|
|azure.compute.vm.os.per.disk.write.bytes.sec.*| Bytes/Sec written to a single disk during monitoring period for OS disk. <br/>Statistics: count|
|azure.compute.vm.os.per.disk.write.operations.sec.*| Write IOPS from a single disk during monitoring period for OS disk. <br/>Statistics: count|
|azure.compute.vm.outbound.flows.*| Outbound Flows are number of current flows in the outbound direction (traffic going out of the VM). <br/>Statistics: count|
|azure.compute.vm.per.disk.qd.*| Data Disk Queue Depth(or Queue Length). <br/>Statistics: count|
|azure.compute.vm.per.disk.read.bytes.sec.*| Bytes/Sec read from a single disk during monitoring period. <br/>Statistics: count|
|azure.compute.vm.per.disk.read.operations.sec.*| Disk Read IOPS. <br/>Statistics: count|
|azure.compute.vm.per.disk.write.bytes.sec.*| Bytes written to disk during monitoring period. <br/>Statistics: count|
|azure.compute.vm.per.disk.write.operations.sec.*| Write IOPS from a single disk during monitoring period. <br/>Statistics: count|
|azure.compute.vm.percentage.cpu.*| The percentage of allocated compute units that are currently in use by the Virtual Machine(s). <br/>Statistics: count|
|azure.compute.vm.premium.data.disk.cache.read.hit.*| Premium data disk cache read hit. <br/>Statistics: count|
|azure.compute.vm.premium.data.disk.cache.read.miss.*| Premium data disk cache read miss. <br/>Statistics: count|
|azure.compute.vm.premium.os.disk.cache.read.hit.*| Premium OS disk cache read hit. <br/>Statistics: count|
|azure.compute.vm.premium.os.disk.cache.read.miss.*| Premium OS disk cache read miss. <br/>Statistics: count|

