---
title: Alert Queries for AWS Trusted Advisor Service Limits
tags: [integrations, dashboards, alerts]
sidebar: doc_sidebar
permalink: aws_trusted_advisor_alerts.html
summary: Examine alerts used by Wavefront teams
---
Wavefront set up the AWS Metrics+ integration and uses AWS Trusted Advisor Service Limits information to alert on service limit issues. This page shows the queries and display expressions that we use.


## Shared Settings and Sample Screenshot

* Each alert fires if the condition is true for 30 minutes.
* Each alert is set to WARN.

Here's a sample screenshot of the first alert:

![aws trusted advisor alerts](images/aws_trusted_advisor_example.png)

## AWS Limits on Launch Configurations

**Alert Condition**
```
aliasSource(100 * ts(aws.limits.launch_configurations.usage) / ts(aws.limits.launch_configurations.limit), tagk, accountId, 0) > 80
```


**Alert Display Expression**
```
aliasSource(ts(aws.limits.launch_configurations.usage), tagk, accountId, 0)
```

The alert informs the recipients with this information:

```
Open a support case w/ AWS to increase the limit if possible (otherwise consider a less populated region/account to build the infrastructure in if this is net new work)
```



## AWS Limits on Available On-Demand Instances

**Alert Condition**
```
aliasSource(100 * (ts(aws.limits.on_demand_instances_standard.usage)) / (ts(aws.limits.on_demand_instances_standard.limit)), metric, resource, "^.*?\.([a-z][0-9]\.[a-z0-9]+).*$", "$1") > 79
```
The alert fires if the condition has been true for 30 minutes.
The alert resolves if the condition is false for 30 minutes.

**Alert Display Expression**
```
aliasSource(ts(aws.limits.on_demand_instances_standard.usage), metric, resource, "^.*?\.([a-z][0-9]\.[a-z0-9]+).*$", "$1")
```
The alert informs the recipients with this information:

```
Open a support case w/ AWS to increase the limit if possible (otherwise consider a less populated region/account to build the infrastructure in)
```


## AWS Limits on Available Load Balancers

**Alert Condition**
```
100 * (sum(aliasSource(ts(aws.limits.active_load_balancers.usage), tagk, region, 0), sources)) / (sum(aliasSource(ts(aws.limits.active_load_balancers.limit), tagk, region, 0), sources)) > 79
```
The alert fires if the condition has been true for 30 minutes.
The alert resolves if the condition is false for 30 minutes.

**Alert Display Expression**
```
(sum(aliasSource(ts(aws.limits.active_load_balancers.usage), tagk, region, 0), sources))
```

The alert informs the recipients with this information:
```
Open a support case w/ AWS to increase the limit if possible (otherwise consider a less populated region/account to build the infrastructure in if this is net new work)
```

## AWS Limits on VPC EIPs

**Alert Condition**
```
aliasSource(100 * ts(aws.limits.vpc_elastic_ip_addresses_eips.usage) / ts(aws.limits.vpc_elastic_ip_addresses_eips.limit), tagk, accountId, 0) > 80
```

**Alert Display Expression**
```
aliasSource(ts(aws.limits.vpc_elastic_ip_addresses_eips.usage), tagk, accountId, 0)
```

The alert informs the recipients with this information:
```
Open a support case w/ AWS to increase the limit if possible (otherwise consider a less populated region/account to build the infrastructure in if this is net new work)
```

## AWS Limits on Auto Scaling Groups

**Alert Condition**
```
aliasSource(100 * ts(aws.limits.auto_scaling_groups.usage) / ts(aws.limits.auto_scaling_groups.limit), tagk, accountId, 0) > 80
```

**Alert Display Expression**
```
aliasSource(ts(aws.limits.auto_scaling_groups.usage), tagk, accountId, 0)
```

The alert informs the recipients with this information:
```
Open a support case w/ AWS to increase the limit if possible (otherwise consider a less populated region/account to build the infrastructure in if this is net new work)
```

## AWS Limits on Available VPCs

**Alert Condition**
```
aliasSource(100 * ts(aws.limits.vpcs.usage) / ts(aws.limits.vpcs.limit), tagk, accountId, 0) > 90
```

**Alert Display Expression**
```
aliasSource(ts(aws.limits.vpcs.usage), tagk, accountId, 0)
```

The alert informs the recipients with this information:
```
Open a support case w/ AWS to increase the limit if possible (otherwise consider a less populated region/account to build the infrastructure in if this is net new work)
```

## AWS Limits on AWS EBS Storage

**Alert Condition**
```
aliasSource(100 * ts(aws.limits.general_purpose_ssd_gp2_volume_storage_gib.usage) / ts(aws.limits.general_purpose_ssd_gp2_volume_storage_gib.limit), tagk, accountId, 0) > 80
```

**Alert Display Expression**
```
aliasSource(ts(aws.limits.general_purpose_ssd_gp2_volume_storage_gib.usage), tagk, accountId, 0)
```

The alert informs the recipients with this information:
```
Open a support case w/ AWS to increase the limit if possible (otherwise consider a less populated region/account to build the infrastructure in if this is net new work)
```

## AWS Limits on Active Volumes

**Alert Condition**
```
aliasSource(100 * ts(aws.limits.active_volumes.usage) / ts(aws.limits.active_volumes.limit), tagk, accountId, 0) > 80
```

**Alert Display Expression**
```
aliasSource(ts(aws.limits.active_volumes.usage), tagk, accountId, 0)
```

The alert informs the recipients with this information:
```
Open a support case w/ AWS to increase the limit if possible (otherwise consider a less populated region/account to build the infrastructure in if this is net new work)
```

## AWS Limits on IAM Roles

**Alert Condition**
```
aliasSource(100 * ts(aws.limits.roles.usage) / ts(aws.limits.roles.limit), tagk, accountId, 0) > 80
```

**Alert Display Expression**
```
aliasSource(ts(aws.limits.roles.usage), tagk, accountId, 0)
```

The alert informs the recipients with this information:
```
Open a support case w/ AWS to increase the limit if possible (otherwise consider a less populated region/account to build the infrastructure in if this is net new work)
```
