---
title: Amazon Web Services Integration
tags: [integrations list]
permalink: aws.html
summary: Learn about the Wavefront Amazon Web Services Integration.
---
## Amazon Web Services Integration

The Amazon Web Services integration is full-featured implementation offering pre-defined dashboards and alert conditions and is fully configurable.

### Dashboards

Wavefront provides Amazon Web Services overview dashboards **Summary**, **Pricing**, and **Billing** and the service-specific dashboards for the following products:

<table width="100%" style="max-width: 650px; margin-bottom: 20px;">
<tbody>
<tr>
<td style="text-align:center;vertical-align:top;">
<h5>Amazon ECS</h5>
<div><img src="images/aws_ecs.png" alt="Amazon ECS" style="max-width: 70px;"/></div>
</td>
<td style="text-align:center;vertical-align:top;">
<h5>Amazon DynamoDB</h5>
<div><img src="images/aws-dynamodb.svg" alt="Amazon DynamoDB" style="max-width: 70px;"/></div>
</td>
<td style="text-align:center;vertical-align:top;">
<h5>Amazon EC2</h5>
<div><img src="images/aws-ec2.svg" alt="Amazon EC2" style="max-width: 70px;"/></div>
</td>
<td style="text-align:center;vertical-align:top;">
<h5>Amazon ELB</h5>
<div><img src="images/aws_elb.png" alt="Amazon ELB" style="max-width: 70px;"/></div>
</td>
</tr>
<tr>
<td style="text-align:center;vertical-align:top;">
<h5>Amazon Redshift</h5>
<div><img src="images/aws_redshift.png" alt="Amazon Redshift" style="max-width: 70px;"/></div>
</td>
<td style="text-align:center;vertical-align:top;">
<h5>Amazon Lambda</h5>
<div><img src="images/aws-lambda.svg" alt="Amazon Lambda" style="max-width: 70px;"/></div>
</td>
<td style="text-align:center;vertical-align:top;">
<h5>Amazon EBS</h5>
<div><img src="images/amazonebs.svg" alt="Amazon EBS" style="max-width: 70px;"/></div>
</td>
<td style="text-align:center;vertical-align:top;">
<h5>Amazon Route 53</h5>
<div><img src="images/amazonroute53.svg" alt="Amazon Route 53" style="max-width: 70px;"/></div>
</td>
</tr>
<tr>
<td style="text-align:center;vertical-align:top;">
<h5>Amazon Cloudfront</h5>
<div><img src="images/aws-cloudfront.svg" alt="Amazon Cloudfront" style="max-width: 70px;"/></div>
</td>
<td style="text-align:center;vertical-align:top;">
<h5>Amazon SNS</h5>
<div><img src="images/aws-sns.svg" alt="Amazon SNS" style="max-width: 70px;"/></div>
</td>
<td style="text-align:center;vertical-align:top;">
<h5>Amazon ElastiCache</h5>
<div><img src="images/aws-elastic-cache.svg" alt="Amazon ElastiCache" style="max-width: 70px;"/></div>
</td>
<td style="text-align:center;vertical-align:top;">
<h5>Amazon S3</h5>
<div><img src="images/aws-s3.svg" alt="Amazon S3" style="max-width: 70px;"/></div>
</td>
</tr>
<tr>
<td style="text-align:center;vertical-align:top;">
<h5>Amazon SQS</h5>
<div><img src="images/aws-sqs.svg" alt="Amazon SQS" style="max-width: 70px;"/></div>
</td>  
<td style="text-align:center;vertical-align:top;">
<h5>Amazon Kinesis Data Stream</h5>
<div><img src="images/aws-kinesis.svg" alt="Amazon Kinesis Data Stream" style="max-width: 70px;"/></div>
</td>
<td style="text-align:center;vertical-align:top;">
<h5>Amazon OpsWorks</h5>
<div><img src="images/aws-opsworks.svg" alt="Amazon OpsWorks" style="max-width: 70px;"/></div>
</td>
<td style="text-align:center;vertical-align:top;">
<h5>Amazon EMR</h5>
<div><img src="images/aws_emr.png" alt="Amazon SQS" style="max-width: 70px;"/></div>
</td>
</tr>
<tr>
<td style="text-align:center;vertical-align:top;">
<h5>Amazon EFS</h5>
<div><img src="images/aws_efs.png" alt="Amazon EFS" style="max-width: 70px;"/></div>
</td>
<td style="text-align:center;vertical-align:top;">
<h5>Amazon Auto Scaling</h5>
<div><img src="images/AmazonEC2_AutoScaling.svg" alt="Amazon Auto Scaling" style="max-width: 70px;"/></div>
</td>
<td style="text-align:center;vertical-align:top;">
<h5>Amazon Elastic Beanstalk</h5>
<div><img src="images/Compute_AWSElasticBeanstalk.svg" alt="Amazon Elstic Beanstalk" style="max-width: 70px;"/></div>
</td>
</tr>
</tbody>
</table>

#### Summary Dashboard

<p>From the Summary dashboard you can easily navigate to all other AWS dashboards.</p>

{% include image.md src="images/db_aws_summary.png" width="80" %}

### Alerts

The Amazon Web Services integration dashboards contains pre-defined alert conditions embedded as queries in charts contained in the dashboards. For example:

{% include image.md src="images/alert_condition.png" width="30" %}

To create the alert, click the **Create Alert** link under the query and configure the [alert properties](https://docs.wavefront.com/alerts_managing.html#creating-an-alert) (notification targets, condition checking frequency, etc.).

### Metrics Configuration

Wavefront ingests Amazon Web Services metrics using the CloudWatch, CloudTrail, and AWS service APIs. For details on the metrics and how to configure ingestion, see [AWS Metrics Integration](https://docs.wavefront.com/integrations_aws_metrics.html).

## Amazon Web Services Integrations



### Adding an Amazon Cloud Integration

Adding an Amazon cloud integration requires establishing a trust relationship between Amazon and Wavefront by sharing account IDs and an external ID. The external ID can be generated by Wavefront or by your company. To use an ID generated by Wavefront, click **Set up Amazon Account** to configure all integrations&mdash;CloudWatch, Cloudtrail, and AWS Metrics+&mdash;at once. To use an ID generated by your company, set up each integration individually.

You start by granting Wavefront read-only access to your Amazon account or by giving Wavefront the permissions listed in [AWS Metrics Integration](https://docs.wavefront.com/integrations_aws_metrics.html).


