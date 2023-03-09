---
title: VMware Aria Operations (SaaS) Integration
tags: [integrations list]
permalink: vrops.html
summary: Learn about the Wavefront VMware Aria Operations (SaaS) Integration.
---
# VMware Aria Operations (SaaS) Integration

The VMware Aria Operations (SaaS) integration is a full-featured native integration, that offers agentless data ingestion of VMware Aria Operations (SaaS) metric data, as well as predefined dashboards.
## VMware Aria Operations (SaaS) Integration



### Add a vRealize Operations Cloud Integration

The VMware vRealize Operations Cloud integration is a full-featured native integration, that offers agentless data ingestion of vRealize Operations Cloud metric data, as well as a predefined dashboard.

To register a new vRealize Operations Cloud instance, you must get a VMware Cloud Services Console API token.

1. In the **Name** text box, enter a meaningful name.
2. In the **API Token** text box, provide the VMware Cloud Services Console API token.
3. Select the resources to fetch.
4. (Optional) In the **Metric Allow List** text box, you can add metrics to an allow list by entering a regular expression. For example:
   * To fetch only cost metrics, enter: <code>^vrops.vmware.(datastore|clustercomputeresource).cost.*$</code>
   * To fetch only health metrics, enter: <code>^vrops.vmware.(datastore|clustercomputeresource).health.*$</code>
   * To fetch only cost and health metrics, enter <code>^vrops.vmware.(datastore|clustercomputeresource).(cost|health).*$</code>
5. (Optional) Change the **Service Refresh Rate**. The default is `5` minutes.
6. Provide the vRealize Operations Cloud endpoint URL and click **Register**.

**Read More**<br/>
  [vRealize Operations Cloud Integration Overview](https://docs.wavefront.com/integrations_vrops.html)





