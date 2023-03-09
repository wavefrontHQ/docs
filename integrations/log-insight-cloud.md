---
title: VMware Aria Operations for Logs Integration
tags: [integrations list]
permalink: log-insight-cloud.html
summary: Learn about the VMware Aria Operations for Logs Integration.
---
## VMware Aria Operations for Logs

VMware Aria Operations for Logs (formerly known as VMware vRealize Log Insight Cloud) provides visibility across public and private cloud environments including AWS. VMware Aria Operations for Logs features robust log aggregation and sophisticated analytics that enable you to determine root causes for an issue quickly and thoroughly. 

This integration provides steps to create a configuration to extract metrics from logs and post these metrics to VMware Aria Operations for Applications.

## Setup

Follow the Setup steps to configure metric extraction from logs in VMware Aria Operations for Logs and push those metrics to VMware Aria Operations for Applications.

### Configure Metric Extraction

1. Log in to VMware Aria Operations for Logs as an admin user.
2. Click the two arrows icon in the upper-left corner of the screen to expand the main menu.
3. Click **Explore Logs**.
4. Enter a query and click **Search**.
5. (Optional)Select a time period and use filters. See [Searching for Logs](https://docs.vmware.com/en/VMware-vRealize-Log-Insight-Cloud/services/User-Guide/GUID-F6D4EA48-A450-43FF-8167-4FA57A2BFC20.html#GUID-F6D4EA48-A450-43FF-8167-4FA57A2BFC20).
6. On the **Stream** tab under the chart, locate a log.
7. Click the three dots icon for the log and select **Create Metric**.
8. Provide the following information to configure metric extraction:
    * **Name**: Name for the metric extraction configuration.
    * **Enabled**: Select to enable the metric extraction configuration. If disabled, the metrics for the configuration are not sent to the metric store.
    * **Send To**: https://YOUR_CLUSTER.wavefront.com
    * **API Key**: YOUR_API_TOKEN
    * **Grok Pattern**: Named regular expression for parsing logs. When you select a log in the Explore Logs page to configure metric extraction, the system recommends a matching grok pattern. You can keep the recommended grok pattern or, if the recommended pattern doesn't match your log, you can check **Edit Grok Pattern** and write your own grok pattern in the text area. After defining the grok pattern, click **Parse** to see the metrics that can be extracted from your log based on the pattern. The system displays the list of numeric metrics that you can send to the metric store, for example, avgbandwidth, avgiops, and avglatencyinms. You can configure each of these metrics in the **Configure Metrics** section.
    * **Value**: Select the metric value type from the drop-down menu.
    * **Configure Source Tag**: Select source tag from the list of available source tags.
    * **Name**: Name of the metric.
    * **Point Tag**: Select point tags from the list of available point tags.
9. Click **Add Metric** to add more metrics.
10. Click **Save** to save the configuration.



