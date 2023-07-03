---
title: Microsoft Azure Kubernetes Services Integration
tags: [integrations list]
permalink: azure_aks.html
summary: Learn about the Microsoft Azure Kubernetes Services Integration.
---

This page provides an overview of what you can do with the Microsoft Azure Kubernetes Services integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Microsoft Azure Kubernetes Services integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Microsoft Azure Kubernetes Services** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

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

The metric names consist of the actual metric name and a suffix for the aggregation type. The **default metric name** without a suffix corresponds to the **total aggregation** type.  
For example, the metric names for metric azure.compute.vm.percentage.cpu are:

azure.compute.vm.percentage.cpu.average  
azure.compute.vm.percentage.cpu.maximum  
azure.compute.vm.percentage.cpu.minimum  
azure.compute.vm.percentage.cpu.count  
azure.compute.vm.percentage.cpu (corresponds to azure.compute.vm.percentage.cpu.total)

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

Adding a Microsoft Azure cloud integration requires establishing a trust relationship between Azure and VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront). The overall process involves the following:

* Getting a Directory ID
* Creating an Azure Active Directory application that represents Operations for Applications inside Azure and getting the Application ID.
* Creating a secret key and getting the Application secret.

To register a Microsoft Azure Cloud Integration:

1. In the **Name** text box, enter a meaningful name.
2. In the **Directory ID** text box, enter your Microsoft Azure Directory ID.
3. In the **Application ID** text box, enter the Azure Active Directory Application (client) ID.
4. In the **Application Secret** text box, enter the secret key that you created. 
   **Note**: The Azure application secret that you enter is securely stored and never exposed except for read only access to the Azure APIs.
5. (Optional) Enter the category names to fetch.
6. (Optional) In the **Metric Allow List** text box, you can add metrics to an allow list by entering a regular expression. 
   For example, <code>^azure.(compute|dbforpostgresql).*$</code>.

   <strong>Note:</strong> Metric names consist of the actual metric name and a suffix (starting with a dot (".")). The suffix represents an aggregation type. In the regular expression, you must use the actual metric names without the aggregation types, such as: <code>count</code>, <code>average</code>, <code>minimum</code>, <code>maximum</code>, <code>sum</code>, and so on.

   For example, the metric names for the metric <code>azure.compute.vm.percentage.cpu</code> are:

   * <code>azure.compute.vm.percentage.cpu.average</code>
   * <code>azure.compute.vm.percentage.cpu.maximum</code>
   * <code>azure.compute.vm.percentage.cpu.minimum</code>
   * <code>azure.compute.vm.percentage.cpu.count</code>
   * <code>azure.compute.vm.percentage.cpu</code> (corresponds to <code>azure.compute.vm.percentage.cpu.total</code>)

   Here, the actual metric name is <code>azure.compute.vm.percentage.cpu</code>, while <code>average</code>, <code>maximum</code>, <code>minimum</code>, and <code>count</code> are the aggregation types. When you create the regular expression, you must use only <code>azure.compute.vm.percentage.cpu</code>. For example, <code>^azure.compute.vm.percentage.cpu$</code>.

7. (Optional) Enter the resource group names to fetch.
8. Select whether you want to fetch logs. 
   If you decide that you want to fetch activity logs, you can also specify the log categories to fetch, e.g. Administrative, Service health, Alert, and so on.
9. Click **Register**.




<h2>Alerts</h2>  <ul><li markdown="span"><b>Azure Instance CPU Usage Too High</b>:Alert reports when the Azure Instance CPU utilization constantly exceeds the defined limit.</li><li markdown="span"><b>Azure Disk IOPS Consumed Percentage Too High</b>:Alert reports when the Azure Disk IOPS consumed percentage constantly exceeds the defined limit.</li></ul>


|Metric Name|Description|
| :--- | :--- |
|azure.containerservice.managedclusters.kube_node_status_allocatable_cpu_cores.*|Statistics: average, count, maximum, minimum|
|azure.containerservice.managedclusters.kube_node_status_allocatable_memory_bytes.*|Statistics: average, count, maximum, minimum|
|azure.containerservice.managedclusters.kube_node_status_condition.*|Statistics: average, count, maximum, minimum|
|azure.containerservice.managedclusters.kube_pod_status_phase.*|Statistics: average, count, maximum, minimum|
|azure.containerservice.managedclusters.kube_pod_status_ready.*|Statistics: average, count, maximum, minimum|

