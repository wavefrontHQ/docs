---
title: 2017-16 Release Notes
keywords: release notes
tags: [release notes]
sidebar: doc_sidebar
permalink: 2017_16_release_notes.html
summary: Learn about new and updated features in the Wavefront 2017-16 release.
---

The Wavefront 2017-16 release provides a number of UI enhancements to improve searchability in dashboards. The AWS cloud integrations have been expanded with new metrics and source, event, and point tags. Webhooks have been enhanced to better handle large notification payloads and added alert tags.

- **Release numbering** - The release numbering scheme has changed from **X.Y** to **YYYY-WW** and reflects a shift to a continuous delivery release model. The **WW** component of the release number is the week when development on the set of features delivered in the release was completed. The release number displays in the footer of the Wavefront UI.
- **Dashboards**
  - The All Dashboards page now supports searching for metrics and sources, including expanding wildcard references to the full set (e.g. `cpu.*`). When you type a string, matching metrics and sources display in a Metrics and Sources groups respectively. For example:

    ![db search](images/db_search_metrics.png)

    Clicking a result filters the list of dashboards for all dashboards containing the queries with that metric or source.
  - You can now step through the filter history in the All Dashboards page using the browser back button.
- **Agent and Proxy** - the renaming of agent to proxy started in recent releases has been completed.
  - The Agent category in the Wavefront API v2 has been renamed Proxy.
  - [Proxy metrics](wavefront_monitoring.html) historically had the prefix `~agent`. The query engine now supports both `~proxy` and `~agent` prefixes.  Query errors still refer only to the `~agent` prefix, for example: `No metrics matching: [~agent.points.*.received]`.
  - The default name of a proxy in the Proxies page is now `Proxy on <hostname>`.
- **AWS cloud integrations**
  - The AWS CloudWatch integration now allows you to [configure](integrations_aws_metrics.html#configuring-cloudwatch-metric-ingestion) how often Wavefront fetches metrics from CloudWatch.
  - The AWS EC2 integration has been renamed AWS Metrics+ to reflect the fact that metrics are retrieved from many AWS services.
  - [Tagging enhancements](tags_overview.html) - to improve searchability, various types of tags have been added to sources, events, and metrics:
    - Sources reporting metrics now have the source tag `wavefront.aws.<service>`: `wavefront.aws.ec2` , `wavefront.aws.ebs`, etc.
    - AWS CloudTrail events now have the event tag `aws.cloudtrail.ec2`.
    - The `aws.reservedInstance.count` metric now has a point tag, `operatingSystem`, to indicate whether the AWS instance is running Windows or Linux.
  - Detached volumes are now reported in the `aws.ebs.volumesize` metric. The source is set to the volume ID. AWS EBS metrics now have the `volumeType` and `Status` point tags.
  - Pricing Metrics - capture the current pricing of EC2 instances. These metrics include the point tags  `instanceType`, `operatingSystem`,  and `Region`. `Source` is set to the display name of the region. For example, if `Region=us-west2`, then `Source=us west (oregon)`.

    - `~sample.aws.ec2.on-demand.price.hourly`
    - `~sample.aws.ec2.reserved.price.upfront`
    - `~sample.aws.ec2.reserved.price.hourly`

- **Webhooks**
  - Added support for handling large notifications in webhooks. When a large number of sources is associated with an alert, a webhook call can potentially have a very large payload (since all the sources are listed in the payload). For some webhook integrations this large payload can result in failure of the webhook call and the resulting notification being lost. The same problem could happen with other lists of items associated with an alert and available as list variables in the Wavefront mustache template. Each webhook implementation may have different limits in payload size. Payload functions allow you to configure the number of items returned in any list and query whether the limit is reached. See [Payload Functions](alerts_integrating_webhooks.html#payload-functions) and [Setting and Testing Iteration Limits](alerts_integrating_webhooks.html#setting-and-testing-iteration-limits).
  - Alert tags are now available to webhooks.
- **Mobile platforms** - to conform to typical naming conventions, input fields no longer automatically capitalize the the first letter of metrics, tags, etc.