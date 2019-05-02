---
title: Azure Deployment Manager Integration
tags: [integrations list]
permalink: adm.html
summary: Learn about the Wavefront Azure Deployment Manager Integration.
---
## Azure Deployment Manager Integration

The Azure Deployment Manager (ADM) service from Microsoft Azure helps you perform staged roll out of resources (global deployment across regions) in an ordered fashion.

While deploying a complex service, ADM lets you deploy resources, orchestrate high-level dependencies, and find potential problems before a service is deployed.

This integration uses the Wavefront REST API for ADM. ADM will invoke the API while executing the health check step as a part of its workflow.

### ADM Workflow with Wavefront
{% include image.md src="./adm_workflow.png" width="70" %}

##  Azure Deployment Manager Setup



This integration uses the Wavefront REST API for ADM. ADM will invoke the API while executing the health check step as a part of its workflow.

### Azure Deployment Manager Health Check Configuration Setup
1. Navigate to the [metrics](https://YOUR_CLUSTER.wavefront.com/metrics) tab and find the metric which is considered to be a health metric.

2. Create a query using the health metric that returns `1` or `0`.{% raw %}
```
	Example: sum(ts(system.load1))>0
```
3. Encode the query using [encoder](https://meyerweb.com/eric/tools/dencoder/) and make a note of it.

4. Below is the JSON to be used in health check step. It has pre-populated values for `authtoken`, `uri` for health monitor and `response code`. Fill in the values for `MaxElasticDuration`, `healthyStateDuration`, `encoded query` and specify the name of your Wavefront cluster without the `.wavefront.com` extension in the JSON snipped below and update your ADM rollout template with that information.
```
	"properties": {  
	   "stepType":"healthCheck",
	   "attributes":{  
	      "MaxElasticDuration":"",
	      "healthyStateDuration":"",
	      "type":"REST",
	      "properties":{  
	         "healthChecks":[  
	            {  
	               "name":"appHealth",
	               "request":{  
	                  "method":"GET",
	                  "uri":"https://adm.wavefront.com/api/v1/query?c=<cluster_name>&q=<encoded_query>",
	                  "authentication":{  
	                     "type":"ApiKey",
	                     "name":"Authorization",
	                     "in":"Header",
	                     "value":"YOUR_API_TOKEN"
	                  }
	               },
	               "response":{  
	                  "successStatusCodes":[  
	                     "200"
	                  ]
	               }
	            }
	         ]
	      }
	   }
	}
```
**NOTE:** Refer to [Generating an API Token](https://docs.wavefront.com/wavefront_api.html#generating-an-api-token) document for Token generation.

### Verification

1. You can use the curl command to verify the output. For example:
```
curl -X GET --header "Accept: application/json" --header "Authorization: YOUR_API_TOKEN" "https://adm.wavefront.com/api/v1/query?c=<cluster>&q=<encoded_query>"
```
{% endraw %}
2. To fine tune your query, go to the [queryApi](https://YOUR_CLUSTER.wavefront.com/api-docs/ui/#!/Query/queryApi) and fill in the query parameters **q** with the plain query and **s** with start time in epoch milliseconds and click on `Try it out!` button to see the result.

### Response Codes
 * `200`: For query result `1`
 * `400`: For any query that returns non boolean value
 * `404`: For query result "0"
 * `500`: Internal Service Error for any query result errors
