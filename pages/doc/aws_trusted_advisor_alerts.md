---
title: Alert Queries for AWS Trusted Advisor Service Limits
tags: [integrations, dashboards, alerts]
sidebar: doc_sidebar
permalink: aws_trusted_advisor_alerts.html
summary: Examine alerts used by Wavefront teams
---
Wavefront set up the AWS Metrics+ integration and uses AWS Trusted Advisor Service Limits information to alert on service limit issues. This page shows the queries and display expressions that we use.

## Trusted Advisor Approaching AWS Limits on Launch Configurations

This alert informs the recipient with this information:

```
Open a support case w/ AWS to increase the limit if possible (otherwise consider a less populated region/account to build the infrastructure in if this is net new work)
```

Alert Condition:
```
aliasSource(100 * ts(aws.limits.launch_configurations.usage) / ts(aws.limits.launch_configurations.limit), tagk, accountId, 0) > 80
```

Alert Display Expression:
```
aliasSource(ts(aws.limits.launch_configurations.usage), tagk, accountId, 0)
```
