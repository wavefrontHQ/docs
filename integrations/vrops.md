---
title: VMware vRealize Operations Cloud Integration
tags: [integrations list]
permalink: vrops.html
summary: Learn about the Wavefront VMware vRealize Operations Cloud Integration.
---
# VMware vRealize Operations Cloud Integration

The vRealize Operations Cloud integration is a full-featured native integration, that offers agentless data ingestion of vRealize Operations Cloud metric data, as well as predefined dashboards.

In addition to setting up the metrics flow, this integration also installs a dashboard.

{% include image.md src="images/vrops-dashboard.png" width="80" %}
## VMware vRealize Operations Cloud Integration



### Add a vRealize Operations Cloud Integration

The VMware vRealize Operations Cloud integration is a full-featured native integration, that offers agentless data ingestion of vRealize Operations Cloud metric data, as well as a predefined dashboard.

To register a new vRealize Operations Cloud instance, you need a VMware Cloud Services Console API token and a vRealize Operations Cloud endpoint URL. To understand how to generate the API token, click the **How to get the API token** link and follow the instructions.

In the **Metric Allow List**, you can add metrics to an allow list by entering a regular expression. For example:

   * To fetch only cost metrics, enter: <code>^vrops.vmware.(datastore|clustercomputeresource).cost.*$</code>
   * To fetch only health metrics, enter: <code>^vrops.vmware.(datastore|clustercomputeresource).health.*$</code>
   * To fetch only cost and health metrics, enter <code>^vrops.vmware.(datastore|clustercomputeresource).(cost|health).*$</code>

**Read More**<br/>
* [vRealize Operations Cloud Integration Overview](https://docs.wavefront.com/integrations_vrops.html)





