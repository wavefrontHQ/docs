---
title: Alert Queries for AWS Trusted Advisor Service Limits
tags: [integrations, dashboards, alerts]
sidebar: doc_sidebar
permalink: aws_trusted_advisor_alerts.html
summary: Examine alerts used by Wavefront teams
---
Wavefront set up the AWS Metrics+ integration and uses AWS Trusted Advisor Service Limits information to alert on service limit issues. This page shows the queries and display expressions that we use.


## Shared Settings and Sample Screenshot

Each alert is set up as follows:
* Alert fires if usage is **more than 80% of the limit**.
* Alert fires if the condition is **true for 30 minutes**.
* Each alert is set to **WARN**.

Here's a sample screenshot of the first alert:

![aws trusted advisor alerts](images/aws_trusted_advisor_example.png)

## AWS Limits on Launch Configurations

**Alert Condition**
```
100 * (ts(aws.limits.launch_configurations.usage) / ts(aws.limits.launch_configurations.limit)) > 80
```


**Alert Display Expression**
```
ts(aws.limits.launch_configurations.usage)
```

The alert informs the recipients with this information:

```
Open a support case w/ AWS to increase the limit if possible (otherwise consider a less populated region/account to build the infrastructure in if this is net new work)
```



## AWS Limits on Available On-Demand Instances

**Alert Condition**
```
100 * (ts(aws.limits.on_demand_instances_standard.usage)) / (ts(aws.limits.on_demand_instances_standard.limit)) > 80
```

**Alert Display Expression**
```
ts(aws.limits.on_demand_instances_standard.usage)
```
The alert informs the recipients with this information:

```
Open a support case w/ AWS to increase the limit if possible (otherwise consider a less populated region/account to build the infrastructure in)
```

## AWS Limits on Available Load Balancers

**Alert Condition**
```
100 * (ts(aws.limits.active_load_balancers.usage) /ts(aws.limits.active_load_balancers.limit)) > 80
```

**Alert Display Expression**
```
ts(aws.limits.active_load_balancers.usage)
```

The alert informs the recipients with this information:
```
Open a support case w/ AWS to increase the limit if possible (otherwise consider a less populated region/account to build the infrastructure in if this is net new work)
```


## AWS Limits on VPC EIPs

**Alert Condition**
```
100 * ts(aws.limits.vpc_elastic_ip_addresses_eips.usage) / ts(aws.limits.vpc_elastic_ip_addresses_eips.limit) > 80
```

**Alert Display Expression**
```
ts(aws.limits.vpc_elastic_ip_addresses_eips.usage)
```

The alert informs the recipients with this information:
```
Open a support case w/ AWS to increase the limit if possible (otherwise consider a less populated region/account to build the infrastructure in if this is net new work)
```

## AWS Limits on Auto Scaling Groups

**Alert Condition**
```
100 * ts(aws.limits.auto_scaling_groups.usage) / ts(aws.limits.auto_scaling_groups.limit) > 80
```

**Alert Display Expression**
```
ts(aws.limits.auto_scaling_groups.usage)
```

The alert informs the recipients with this information:
```
Open a support case w/ AWS to increase the limit if possible (otherwise consider a less populated region/account to build the infrastructure in if this is net new work)
```

## AWS Limits on Available VPCs

**Alert Condition**
```
100 * ts(aws.limits.vpcs.usage) / ts(aws.limits.vpcs.limit) > 80
```

**Alert Display Expression**
```
ts(aws.limits.vpcs.usage)
```

The alert informs the recipients with this information:
```
Open a support case w/ AWS to increase the limit if possible (otherwise consider a less populated region/account to build the infrastructure in if this is net new work)
```

## AWS Limits on AWS EBS Storage

**Alert Condition**
```
100 * ts(aws.limits.general_purpose_ssd_gp2_volume_storage_gib.usage) / ts(aws.limits.general_purpose_ssd_gp2_volume_storage_gib.limit) > 80
```

**Alert Display Expression**
```
ts(aws.limits.general_purpose_ssd_gp2_volume_storage_gib.usage)
```

The alert informs the recipients with this information:
```
Open a support case w/ AWS to increase the limit if possible (otherwise consider a less populated region/account to build the infrastructure in if this is net new work)
```

## AWS Limits on Active Volumes

**Alert Condition**
```
100 * ts(aws.limits.active_volumes.usage) / ts(aws.limits.active_volumes.limit) > 80
```

**Alert Display Expression**
```
ts(aws.limits.active_volumes.usage)
```

The alert informs the recipients with this information:
```
Open a support case w/ AWS to increase the limit if possible (otherwise consider a less populated region/account to build the infrastructure in if this is net new work)
```

## AWS Limits on IAM Roles

**Alert Condition**
```
100 * ts(aws.limits.roles.usage) / ts(aws.limits.roles.limit) > 80
```

**Alert Display Expression**
```
ts(aws.limits.roles.usage)
```

The alert informs the recipients with this information:
```
Open a support case w/ AWS to increase the limit if possible (otherwise consider a less populated region/account to build the infrastructure in if this is net new work)
```
