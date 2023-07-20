---
title: Set Up and Manage an AWS Integration Through the API
keywords:
tags: [integrations, best practices]
sidebar: doc_sidebar
permalink: integrations_gcp_api.html
summary: Understand how to set up and manage the GCP integration by using our REST API.
---
The Google Cloud Platform integration allows you to ingest metrics directly from GCP. In addition to setting up and managing the GCP integration through the UI, you can also use the REST API for setting up and managing the GCP integration. This doc page provides some basic steps and examples on how to do this.

{% include note.html content="You must have the [**Proxy Management** permission](permissions_overview.html) to set up an GCP integration." %}

In these examples, you access the REST API through the interface, so that you don't need to provide the Bearer token.

## Before You Start

When you set up a Google Cloud Platform integration, you have to give the VMware Aria Operations for Applications service permissions to access the data you want to visualize and analyze.

For information, see [Google Cloud Platform Overview and Permissions](integrations_gcp_overview.html).


## Set Up a GCP Integration

You can add a GCP integration by using the REST API documentation UI.


1. Log in to your product cluster.
1. Click the gear icon in the top right and select **API Documentation**.
1. Expand the **Cloud Integration** category.
1. To create a new cloud integration, click the `POST /api/v2/cloudintegration` request.
1. To add an integration, in the **Edit Value** text box enter one of the following examples for each AWS integration.

   You can add one integration at a time. You cannot use a single API request to register all AWS services together.

   * CloudWatch integration:

     ```
{
  "name":"CloudWatch integration",
  "service":"CLOUDWATCH",
  "cloudWatch":{
    "baseCredentials":{
      "roleArn":"arn:aws:iam::<accountid>:role/<rolename>",
      "externalId":"string"
    },
    "metricFilterRegex":"^aws.(sqs|ec2|ebs|elb).*$",
    "pointTagFilterRegex":"(region|name)"
  },
  "serviceRefreshRateInMins":5
}
     ```

   * AWS Metrics+ integration:

     ```
{
  "name":"AWSMetric+ integration",
  "service":"ec2",
  "ec2":{
    "baseCredentials":{
      "roleArn":"arn:aws:iam::<accountid>:role/<rolename>",
     "externalId": "string"
    },
    "metricFilterRegex":"^aws.(sqs|ec2|ebs|elb).*$",
    "pointTagFilterRegex":"(region|name)"
  },
  "serviceRefreshRateInMins":5
}
     ```

    * CloudTrail integration:

      ```
{
  "name":"CloudTrail integration",
  "service":"cloudTrail",
   "region":"string",
   "prefix": "string",
   "bucketName":"string"
  "cloudTrail":{
    "baseCredentials":{
      "roleArn":"arn:aws:iam::<accountid>:role/<rolename>",
     "externalId":"string"
    },
    "filterRule":"string"
}
      ```

   In these examples, the `roleArn` value is the [Role ARN from your Amazon account](integrations_aws_overview_API.html#provide-read-only-access-to-your-amazon-account-and-get-the-role-arn), and the `externalId` value is the external ID that you have provided while you created the role. If you don’t provide an external ID, the request will time out.

1. Click **Execute**.

## Update an AWS Integration

You can update an AWS integration through the API. You do not need the external ID value to update an existing AWS integration.

In this example, we update an existing CloudWatch integration to retrieve the service metrics for 10 more services in addition to DynamoDB:

* EBS
* ApiGateway
* EC2
* ELB
* ElastiCache
* ApplicationELB
* SES
* NATGateway
* AutoScaling
* RDS

We also add the metrics for these services to a metric allow list by using a regular expression and change the service refresh rate from `5` to `10` minutes.


1. In the REST API documentation UI, click the `GET/api/v2/cloudintegration` request.
1. Click **Execute**.

   In the **Response Body** section, under `namespaces` you can see the list of all configured cloud services integrations. For example:

    ```
    {
     "forceSave": false,
     "name": "AWS",
     "id": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeee",
     "service": "CLOUDWATCH",
     "lastReceivedDataPointMs": 1634038298092,
     "lastMetricCount": 210,
     "cloudWatch": {
       "namespaces": [
         "AWS/DynamoDB"
       ],
       "metricFilterRegex": "",
       "baseCredentials": {
         "roleArn": "arn:aws:iam::<accountid>:role/<rolename>"
       },
       "pointTagFilterRegex": "",
       "instanceSelectionTags": {},
       "volumeSelectionTags": {}
     },
     "disabled": false,
     "lastProcessorId": "3198d07c-210c-4670-9bd0-eb407d2a71dc",
     "lastProcessingTimestamp": 1634038421682,
     "createdEpochMillis": 1620216033503,
     "updatedEpochMillis": 1622707203597,
     "serviceRefreshRateInMins": 5,
     "deleted": false,
     "inTrash": false,
     "lastErrorEvent": {
       ...
       ...

     "creatorId": "user-account-email-address",
     "updaterId": "user-account-email-address"
   },

   ```

   In this example, you can see that the CloudWatch integration retrieves only DynamoDB metrics and that the service refresh rate is 5 minutes.

1. Copy the value of the `"id"` parameter of the integration that you want to update.
1. Copy the content of the response in a text file.
1. Edit the copied response body.

   1. To update the list of services, under `"namespaces"`, add the list of services:

      ![Updated list of services.](images/aws-api-update-services.png)

   1. To add the regular expression, under the list of services, add the following `"metricFilterRegex"` value:

      ![Regular expression to allow the metrics flow from the updated list of services.](images/aws-api-update-regex.png)

   1. To change the service refresh rate to 10 minutes, update the `"serviceRefreshRateInMins"` value:

      ![Updated service refresh rate from 5 to 10 minutes.](images/aws-api-update-refresh-rate.png)

   The updated response body will look like that:

   ```
{
  "id": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeee",
  "name":"AWS",
  "service":"CLOUDWATCH",
  "cloudWatch":{
    "namespaces": [
      "AWS/DynamoDB"
      "AWS/EBS",
      "AWS/ApiGateway",
      "AWS/EC2",
      "AWS/ELB",
      "AWS/ElastiCache",
      "AWS/ApplicationELB",
      "AWS/SES",
      "AWS/NATGateway",
      "AWS/AutoScaling",
      "AWS/RDS"
    ],
    "metricFilterRegex":^(aws.(ecs|ses|instance|autoscaling|sqs|sns|reservedInstance|ebs|route53.health|ec2.status|ec2.cpuutilization|ec2.network|ec2.autoscaling|autoscaling|elb|dynamodb|kinesis|firehose|s3|applicationelb|networkelb|lambda|rds|elasticache|applicationelb|natgateway).*),
    "pointTagFilterRegex": "",
    "baseCredentials":{
      "roleArn":"arn:aws:iam::<accountid>:role/<rolename>"
    },
    "instanceSelectionTags": {},
    "volumeSelectionTags": {}
    }
    },
    "disabled": false,
    "lastProcessorId": "3198d07c-210c-4670-9bd0-eb407d2a71dc",
    "lastProcessingTimestamp": 1634038421682,
    "createdEpochMillis": 1620216033503,
    "updatedEpochMillis": 1622707203597,
    "serviceRefreshRateInMins": 10,
    "deleted": false,
    "inTrash": false,
    "lastErrorEvent": {
      ...
      ...

    "creatorId": "user-account-email-address",
    "updaterId": "user-account-email-address"
  },

   ```

1. In the REST API documentation UI, click the `PUT /api/v2/cloudintegration/{id}` request.
1. Under **Parameters**, in the **id** text box enter the ID of the integration that you copied.
1. In **Edit Value** text box enter the edited response body with the new services.
1. Click **Execute**.
1. Verify that the response returns `200` status code to indicate that the update was successful.

## Enable and Disable an AWS Integration

VMware Aria Operations for Applications automatically disables integrations that are experiencing errors due to invalid credentials. To enable an integration after the credential has been corrected or to manually disable an integration, you need the integration ID.

1. In the REST API documentation UI, click the `GET/api/v2/cloudintegration` request.
1. Click **Execute**.

   In the **Response Body** section, you can see the list of all configured cloud services integrations. For example:

    ```
    {
     "forceSave": false,
     "name": "AWS",
     "id": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeee",
     "service": "CLOUDWATCH",
     "lastReceivedDataPointMs": 1634038298092,
     "lastMetricCount": 210,
     "cloudWatch": {
       "namespaces": [
         "AWS/DynamoDB"
       ],
       "metricFilterRegex": "",
       "baseCredentials": {
         "roleArn": "arn:aws:iam::<accountid>:role/<rolename>"
       },
       "pointTagFilterRegex": "",
       "instanceSelectionTags": {},
       "volumeSelectionTags": {}
     },
     "disabled": false,
     "lastProcessorId": "3198d07c-210c-4670-9bd0-eb407d2a71dc",
     "lastProcessingTimestamp": 1634038421682,
     "createdEpochMillis": 1620216033503,
     "updatedEpochMillis": 1622707203597,
     "serviceRefreshRateInMins": 5,
     "deleted": false,
     "inTrash": false,
     "lastErrorEvent": {
       ...
       ...

     "creatorId": "user-account-email-address",
     "updaterId": "user-account-email-address"
   },

   ```
1. Copy the value of the `"id"` parameter of the cloud integration that you want to enable or disable.
1. To enable the integration, run the `POST /api/v2/cloudintegration/{id}/enable` request with the ID of the integration that you copied.
1. To disable the integration, run the `POST /api/v2/cloudintegration/{id}/disable` request with the ID of the integration that you copied.

## Delete and Recover a Deleted AWS Integration

To delete a cloud service integration that you no longer want to use, you need the integration ID. If you decide to move the integration to the recycle bin, you can recover it at a later stage.

1. In the REST API documentation UI, click the `GET/api/v2/cloudintegration` request.
1. Click **Execute**.

   In the **Response Body** section, you can see the list of all configured cloud services integrations. For example:

    ```
    {
     "forceSave": false,
     "name": "AWS",
     "id": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeee",
     "service": "CLOUDWATCH",
     "lastReceivedDataPointMs": 1634038298092,
     "lastMetricCount": 210,
     "cloudWatch": {
       "namespaces": [
         "AWS/DynamoDB"
       ],
       "metricFilterRegex": "",
       "baseCredentials": {
         "roleArn": "arn:aws:iam::<accountid>:role/<rolename>"
       },
       "pointTagFilterRegex": "",
       "instanceSelectionTags": {},
       "volumeSelectionTags": {}
     },
     "disabled": false,
     "lastProcessorId": "3198d07c-210c-4670-9bd0-eb407d2a71dc",
     "lastProcessingTimestamp": 1634038421682,
     "createdEpochMillis": 1620216033503,
     "updatedEpochMillis": 1622707203597,
     "serviceRefreshRateInMins": 5,
     "deleted": false,
     "inTrash": false,
     "lastErrorEvent": {
       ...
       ...

     "creatorId": "user-account-email-address",
     "updaterId": "user-account-email-address"
   },

   ```
1. Copy the value of the `"id"` parameter of the integration that you want to delete.
1. To delete the integration, click the `DELETE /api/v2/cloudintegration/{id}` request.
   1. Under **Parameters**, in the **id** text box enter the integration ID that you copied.
   1. From the **skipTrash** drop-down menu select whether you want to keep the deleted integration in the recycle bin.

      * Select **false**, to move the integration to the recycle bin, so that you can recover it at a later stage.
      * Select **true**, to delete the integration forever. You won't be able to recover it.

   1. Click **Execute**.
1. To recover an integration from the recycle bin, i.e., an integration that was not permanently deleted, in the REST API documentation UI, click the `POST /api/v2/cloudintegration/{id}/undelete` request.
   1. Under **Parameters**, in the **id** text box enter the ID of the integration that you want to recover.
   1. Click **Execute**.
