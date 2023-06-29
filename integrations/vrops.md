---
title: VMware Aria Operations (SaaS) Integration
tags: [integrations list]
permalink: vrops.html
summary: Learn about the VMware Aria Operations (SaaS) Integration.
---

This page provides an overview of what you can do with the VMware Aria Operations (SaaS) integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the VMware Aria Operations (SaaS) integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **VMware Aria Operations (SaaS)** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

# VMware Aria Operations (SaaS) Integration

The VMware Aria Operations (SaaS) integration is a full-featured native integration, that offers agentless data ingestion of VMware Aria Operations (SaaS) metric data, as well as predefined dashboards.

## VMware Aria Operations (SaaS) Integration



### Add a VMware Aria Operations (SaaS) Integration

The VMware Aria Operations (SaaS) integration is a full-featured native integration, that offers agentless data ingestion of VMware Aria Operations metric data, as well as a predefined dashboard.

To register a new VMware Aria Operations instance, you must get a VMware Cloud Services Console API token. 

1. In the **Name** text box, enter a meaningful name.
2. In the **API Token** text box, provide the VMware Cloud Services Console API token.
3. Select the resources to fetch.
4. (Optional) In the **Metric Allow List** text box, you can add metrics to an allow list by entering a regular expression. For example:
   * To fetch only cost metrics, enter: <code>^vrops.vmware.(datastore|clustercomputeresource).cost.*$</code>
   * To fetch only health metrics, enter: <code>^vrops.vmware.(datastore|clustercomputeresource).health.*$</code>
   * To fetch only cost and health metrics, enter <code>^vrops.vmware.(datastore|clustercomputeresource).(cost|health).*$</code>
5. (Optional) Change the **Service Refresh Rate**. The default is `5` minutes.
6. Provide the VMware Aria Operations endpoint URL and click **Register**.

**Read More**<br/>
  [VMware Aria Operations (SaaS) Integration Overview](https://docs.wavefront.com/integrations_vrops.html)




