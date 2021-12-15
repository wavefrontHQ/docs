---
title: Setting Up and Managing the AWS Integration Through the API
keywords:
tags: [integrations, best practices]
sidebar: doc_sidebar
permalink: integrations_aws_overview_API.html
summary: Understand how to set up and manage the AWS integration by using the Wavefront REST API.
---
The Wavefront Amazon Web Services integration allows you to ingest metrics directly from AWS. In addition to setting up and managing the AWS integration through the GUI, you can also use the Wavefront REST API for setting up and managing the integration. This doc provides some basic steps and examples on how to do this.

{% include shared/badge.html content="You must have the [**Proxy Management** permission](permissions_overview.html) to set up an AWS integration." %}

In these examples, you access the REST API through the Wavefront interface, so that you don't need to provide the Bearer token. Make sure that you have granted Wavefront with read-only access to your Amazon account and that you have the **Role ARN** value handy. 

## Getting an External ID

To grant Wavefront with read-only access to your Amazon account, you need to provide an account ID and external ID. While the account ID is a constant value - the ID (in our case - the Wavefront ID) to which you want to grant access to your resources, the external ID is not a constant value. The external ID is a secret identifier that is known by you and Wavefront (the third-party). The external ID is time-sensitive and regenerated each time you reopen the AWS Integration setup page, and you cannot reuse it.

For information about external IDs and how they are used in AWS, see [How to Use External ID When Granting Access to Your AWS Resources](https://aws.amazon.com/blogs/security/how-to-use-external-id-when-granting-access-to-your-aws-resources/).


### Create an External ID

1. Log in to your Wavefront cluster. 
1. Click the gear icon in the top right and select **API Documentation**.
1. Expand the **Cloud Integration** category.
1. To create a new cloud integration, click the `POST /api/v2/cloudintegration/awsExternalId` request.
1. Click **Try it out!**.
1. Copy the external ID from the response body of the request.

   ```
   {
  "status": {
    "result": "OK",
    "message": "",
    "code": 200
  },
  "response": "<external-ID>"
  }
  ```
  
  
## Use the REST API to Add an AWS Integration

You can add an AWS integration by using the Wavefront REST API. 


1. Log in to your Wavefront cluster. 
1. Click the gear icon in the top right and select **API Documentation**.
1. Expand the **Cloud Integration** category.
1. To create a new cloud integration, click the `POST /api/v2/cloudintegration` request.
1. To add a CloudWatch, AWS Metrics+, and CloudTrail integrations, in the **body** text box enter the following example:

    ```
{
  "name":"CloudWatch integration",
  "service":"CLOUDWATCH",
  "cloudWatch":{
    "baseCredentials":{
      "roleArn":"arn:aws:iam::<accountid>:role/<rolename>"
      "externalId":"string"
    },
    "metricFilterRegex":"^aws.(sqs|ec2|ebs|elb).*$",
    "pointTagFilterRegex":"(region|name)"
  },
  "serviceRefreshRateInMins":5
}
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

    In this example, `roleArn` is the [Role ARN from your Amazon account](integrations_aws_overview.html#give-wavefront-read-only-access-to-your-amazon-account), and the `externalId` is the external ID [that you have already created](integrations_aws_overview_API.html#getting-an-external-id). If you don't provide an external ID, the request will time out. 

1. Click **Try it out!**.


## Enable and Disable AWS Integrations

Wavefront automatically disables integrations that are experiencing errors due to invalid credentials. To enable an integration after the credential has been corrected or to manually disable an integration, you need the integration ID.

1. In the Wavefront REST API documentation, click the `GET/api/v2/cloudintegration` request, and click **Try it out!**.
   
   In the **Response Body** section, you can see the list of all configured cloud services integrations. For example:
   
    ```
    {
     "forceSave": false,
     "name": "AWS",
     "id": "7a146a98-583f-4a2c-8c57-cde6d146bb6b",
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
1. Copy the value of the "id" parameter of the cloud integration that you want to enable or disable.
1. To enable the integration, run the `POST /api/v2/cloudintegration/{id}/enable` request with the ID of the integration that you copied.
1. To disable the integration, run the `POST /api/v2/cloudintegration/{id}/disable` request with the ID of the integration that you copied.

## Delete and Recover AWS Integrations

To delete a cloud service integration that you no longer need, you need the integration ID. If you decide to move the integration to the recycle bin, you can recover it at a later stage.

1. In the Wavefront REST API documentation, click the `GET/api/v2/cloudintegration` request, and click **Try it out!**.
   
   In the **Response Body** section, you can see the list of all configured cloud services integrations. For example:
   
    ```
    {
     "forceSave": false,
     "name": "AWS",
     "id": "7a146a98-583f-4a2c-8c57-cde6d146bb6b",
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
1. Copy the value of the ``"id"`` parameter of the integration that you want to delete.
1. To delete the integration, click the `DELETE /api/v2/cloudintegration/{id}` request.
1. Under **Parameters**, in the **id** text box enter the ID of the integration that you copied.
1. From the **skipTrash** drop-down menu select whether you want to keep the deleted integration in the recycle bin. 

   * Select **false(default)**, to move the integration to the recycle bin, so that you can recover it at a later stage.
   * Select **true**, to delete the integration forever. You won't be able to recover it.
  
1. Click **Try it out!**.
1. To recover an integration from the recycle bin, i.e. an integration that was not permanently deleted, in the Wavefront REST API documentation, click the `POST /api/v2/cloudintegration/{id}/undelete` request.
1. Under **Parameters**, in the **id** text box enter the ID of the integration that you want to recover.
1. Click **Try it out!**.

## Update an AWS Integration

1. 1. In the Wavefront REST API documentation, click the `GET/api/v2/cloudintegration` request, and click **Try it out!**.
   
   In the **Response Body** section, you can see the list of all configured cloud services integrations. For example:
   
    ```
    {
     "forceSave": false,
     "name": "AWS",
     "id": "7a146a98-583f-4a2c-8c57-cde6d146bb6b",
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
1. Copy the value of the ``"id"`` parameter of the integration that you want to update.
1. In the Wavefront REST API documentation, click the `PUT /api/v2/cloudintegration/{id}` request.
1. Under **Parameters**, in the **id** text box enter the ID of the integration that you want to update.
1. In the **body** text box enter the following example:

   ```
   I need a meaningful CloudWatch code example, maybe something like that (need some more examples here):
   

  
   { 
     "id": "7a146a98-583f-4a2c-8c57-cde6d146bb6b",
     "name":"AWS",
     "service":"CLOUDWATCH",
     "cloudWatch":{
       "baseCredentials":{
         "roleArn":"arn:aws:iam::<accountid>:role/<rolename>"
       },
       "metricFilterRegex":"^aws.(elb|rds).*$",
       "pointTagFilterRegex":"(cluster|region)"
       "instanceSelectionTagsExpr": "need-an-example-of-a-meaningful string",
       "volumeSelectionTagsExpr": "need-an-example-of-a-meaningful string",
       "instanceSelectionTags": {
         "key1": "value1",
         "key2": "value2"
         },
       "volumeSelectionTags": {
         key1": "value1",
         "key2": "value2"
       }
     },
     "serviceRefreshRateInMins":2
   }

   We also need to explain what will change. Also add info whether the external ID is the same ID provided during the setup of the integration.
   ```
   You do not need the external ID value to update an existing AWS integration.

1. Click **Try it out!**.
