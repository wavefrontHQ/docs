---
title: Microsoft Azure Load Balancers Integration
tags: [integrations list]
permalink: azure_lb.html
summary: Learn about the Wavefront Microsoft Azure Load Balancers Integration.
---
## Microsoft Azure Integration

The Microsoft Azure integration enables monitoring Azure with Wavefront and offers pre-defined dashboards and alert conditions.

### Dashboards

Wavefront provides Microsoft Azure dashboards for the following services:

- Azure: Application Gateway
- Azure: App Service
- Azure: Container Instances
- Azure: Cosmos DB
- Azure: Event Hubs
- Azure: Files
- Azure: Functions
- Azure: HDInsight
- Azure: Kubernetes Service
- Azure: Load Balancer
- Azure: Cache for Redis
- Azure: Storage Accounts
- Azure: SQL Database
- Azure: SQL Data Warehouse
- Azure: Summary
- Azure: Virtual Machine
- Azure: Virtual Machine Scale Set

Here's a preview of the Virtual Machine dashboard:
{% include image.md src="images/azure-overview.png" width="80" %}

### Metrics Configuration
Wavefront ingests Microsoft Azure metrics using the Azure Monitor APIs. For details on the metrics that the API supports, see the [documentation](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-supported-metrics).

Metrics originating from Microsoft Azure are prefixed with `azure.` within Wavefront. After you set up the integration, you can browse the available metrics in the Metrics browser. Simply click **Browse > Metrics** from the taskbar and search for `azure.`.


### Metrics Information

You can see the information about the metrics on the [Azure metrics](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-supported-metrics) doc site. Click a link below to see the detailed metrics information per service:

- [Azure Application Gateway](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftnetworkapplicationgateways)
- [Azure App Service](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftwebhostingenvironments)
- [Azure Container Instances](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftcontainerinstancecontainergroups)
- [Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftdocumentdbdatabaseaccounts)
- [Azure Event Hubs](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsofteventhubnamespaces)
- [Azure Files](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftstoragestorageaccountsfileservices)
- [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftwebsites)
- [Azure HDInsight](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsofthdinsightclusters)
- [Azure Kubernetes Service](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftcontainerservicemanagedclusters)
- [Azure Load Balancer](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftnetworkloadbalancers)
- [Azure Cache for Redis](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftcacheredis)
- [Azure Storage Accounts](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftstoragestorageaccounts)
- [Azure SQL Database](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftsqlserversdatabases)
- [Azure SQL Data Warehouse](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftsqlserversdatabases)
- [Azure Virtual Machine](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftcomputevirtualmachines)
- [Azure Virtual Machine Scale Set](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftcomputevirtualmachinescalesets)

## Microsoft Azure Integrations



### Add a Microsoft Azure Cloud Integration

Adding a Microsoft Azure cloud integration requires establishing a trust relationship between Azure and Tanzu Observability by Wavefront. The overall process involves the following:

* Getting a Directory ID
* Creating an Azure Active Directory application that represents Tanzu Observability inside Azure and getting the Application ID.
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





<h2>Alerts</h2>  <ul><li markdown="span"><b>Azure Instance CPU Usage Too High</b>:Alert reports when the Azure Instance CPU utilization constantly exceeds the defined limit.</li><li markdown="span"><b>Azure Disk IOPS Consumed Percentage Too High</b>:Alert reports when the Azure Disk IOPS consumed percentage constantly exceeds the defined limit.</li></ul>



## Metrics

See [Azure documentation](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/metrics-supported) for Metrics descriptions.  

|Metric Name|Description|
| :--- | :--- |
|azure.network.loadbalancers.allocatedsnatports.*|Statistics: average, count, maximum, minimum|
|azure.network.loadbalancers.bytecount.*|Statistics: average, count|
|azure.network.loadbalancers.dipavailability.*|Statistics: average, count|
|azure.network.loadbalancers.packetcount.*|Statistics: average, count|
|azure.network.loadbalancers.snatconnectioncount.*|Statistics: average, count|
|azure.network.loadbalancers.syncount.*|Statistics: average, count|
|azure.network.loadbalancers.usedsnatports.*|Statistics: average, count, maximum, minimum|
|azure.network.loadbalancers.vipavailability.*|Statistics: average, count|

