---
title: Azure Deployment Manager Integration
tags: [integrations list]
permalink: adm.html
summary: Learn about the Azure Deployment Manager Integration.
---
## Azure Deployment Manager Integration

The Microsoft Azure Deployment Manager (ADM) service helps you perform staged roll out of resources (global deployment across regions) in an ordered fashion.

While deploying a complex service, ADM lets you deploy resources, orchestrate high-level dependencies, and find potential problems before a service is deployed.

This integration uses the Wavefront REST API for ADM. ADM will invoke the API while executing the health check step as a part of its workflow.

### ADM Workflow with Wavefront
{% include image.md src="./adm_workflow.png" width="70" %}

##  Azure Deployment Manager Setup



This integration uses the Wavefront REST API for ADM. ADM will invoke the API while executing the health check step as a part of its workflow.

### Azure Deployment Manager Health Check Configuration Setup
1. Use the Metrics browser to identify the metric to use as a health metric. Click **Browse > Metrics** in your Wavefront instance to access the Metrics browser.

2. Create a query that returns `1` or `0` using the health metric. Example:{% raw %}
```
	sum(ts(system.load1)) > 0
```
{% endraw %}
3. Encode the query using an encoder such as [dencoder](https://meyerweb.com/eric/tools/dencoder/). You'll use the encoded query below.

4. In the JSON snippet below, fill in the values for `MaxElasticDuration`, `healthyStateDuration`, `encoded_query` and specify the name of your Wavefront cluster without the `.wavefront.com` extension. The JSON has pre-populated values for `authtoken`, `uri` for health monitor and `response code`.{% raw %}
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
{% endraw %}
5. Update your ADM rollout template with the updated JSON.

### Verification

1. You can use the curl command to verify the output. For example:{% raw %}
```
curl -X GET --header "Accept: application/json" --header "Authorization: YOUR_API_TOKEN" "https://adm.wavefront.com/api/v1/query?c=<cluster>&q=<encoded_query>"
```
{% endraw %}
2. To fine tune your query, go to the query API. In your Wavefront instance, select **API Documentation** from the gear icon in the top right and go to the Query API. Then:
  1. Fill in the parameter **q** with the plain query
  1. Fill in the parameter **s** with start time in epoch milliseconds
  1. Click on **Try it out!** button to see the results

### Response Codes
 * `200`: For query result `1`
 * `400`: For any query that returns a non boolean value
 * `404`: For query result `0`
 * `500`: Internal Service Error for any query result errors



