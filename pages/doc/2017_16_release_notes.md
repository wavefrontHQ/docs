---
title: 2017-16 Release Notes
keywords: release notes
tags: [release notes]
sidebar: doc_sidebar
permalink: 2017_16_release_notes.html
summary: Learn about new and updated features in the Wavefront 2017-16 release.
---

- The release numbering scheme has changed from **X.Y** to **YYYY-WW** and reflects a shift to a continuous delivery release model. The **WW** component of the release number is the week when development on the set of features delivered in the release was completed. The release number displays in the footer of the Wavefront UI.
- Dashboards
  - The All Dashboards page now supports searching for metrics and sources, including expanding wildcard references to the full set (e.g. `cpu.*`). When you type a string, matching metrics and sources display in a Metrics and Sources groups respectively. For example:

    ![db search](images/db_search_metrics.png)

    Clicking a result filters the list of dashboards for all dashboards containing the queries with that metric or source.
  - The browser back button now steps through the filter history in the All Dashboards page.
- Agent and proxy
  - The Agent category in the Wavefront API v2 has been renamed Proxy.
  - [Proxy metrics](wavefront_monitoring.html) historically had the prefix `~agent`. The query engine now supports both `~proxy` and `~agent` prefixes.  Query errors still refer only to the `~agent` prefix, for example: `No metrics matching: [~agent.points.*.received]`.
  - The default name of a proxy in the Proxies page is now `Proxy on <hostname>`.
- AWS cloud integrations
  - The AWS CloudWatch integration now supports a [configurable refresh rate](integrations_aws_metrics.html#configuring-cloudwatch-metric-ingestion).
  - The AWS EC2 integration has been renamed AWS Metrics Plus to reflect the fact that metrics are retrieved from many AWS services.
  - The `aws.reservedInstance.count` metric now has a point tag, `operatingSystem`, to indicate whether the AWS instance is running Windows or Linux.
  - Sources reporting metrics are now [tagged](tags_overview.html) with `wavefront.aws.<service>`: `wavefront.aws.ec2` , `wavefront.aws.ebs`, etc.
  - Detached volumes are now reported in the `aws.ebs.volumesize` metric. AWS EBS metrics now have the `volumeType` point tag.
- Webhooks
  - Added support for handling large notifications in webhooks. When a large number of sources is associated with an alert, a webhook call can potentially have a very large payload (since all the sources are listed in the payload). For some webhook integrations this large payload can result in failure of the webhook call and the resulting notification being lost. The same problem could happen with other lists of items associated with an alert and available as list variables in the Wavefront mustache template. Each webhook implementation may have different limits in payload size. Therefore the feature allows configuring the number of items returned in any list. See [Payload Functions](alerts_integrating_webhooks.html#payload-functions) and [Setting and Testing Iteration Limits](alerts_integrating_webhooks.html#setting-and-testing-iteration-limits).
  - Alert tags are now available to webhook templates.
