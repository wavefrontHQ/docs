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



### Add a vRealize Operations Integration

The vRealize Operations integration is a full-featured native integration, that offers agentless data ingestion of vRealize Operations metric data, as well as predefined dashboards.

To register a new vRealize Operations instance, you need a Cloud Services console API token and a vRealize Operations endpoint URL. Click **How to get the API token** on the left and follow the instructions.

In the **Metric Allow List**, add metrics to an allow list by entering a regular expression. For example:

* To fetch only cost metrics, enter: <code>^vrops.vmware.(datastore|clustercomputeresource).cost.*$</code>
* To fetch only health metrics, enter: <code>^vrops.vmware.(datastore|clustercomputeresource).health.*$</code>
* To fetch only cost and health metrics, enter <code>^vrops.vmware.(datastore|clustercomputeresource).(cost|health).*$</code>


### More Info

* [vRealize Operations Integration Overview](https://docs.wavefront.com/integrations_vrops.html)





