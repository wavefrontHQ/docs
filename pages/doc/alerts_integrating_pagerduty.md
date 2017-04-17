---
title: Integrating PagerDuty with Alerts
keywords: alerts
tags: [alerts, integrations]
sidebar: doc_sidebar
permalink: alerts_integrating_pagerduty.html
summary: Learn how to integrate PagerDuty keys and emails with alerts.
---

If your company uses PagerDuty, this article will show you how to integrate PagerDuty API keys or emails with Wavefront alerts. 

{% include shared/permissions.html entity="alerts" entitymgmt="Alert" %}

## Choosing Between PagerDuty API Integration Key or PagerDuty Email
Wavefront recommends using the PagerDuty API integration key instead of the PagerDuty e-mail integration, but the choice between the two targets should be dependent upon how you want incidents to be created in PagerDuty based on your Wavefront alerts. When a PagerDuty API integration key is used in a Wavefront alert, all alert changes (firing, updated, resolved) are tied to a single incident in PagerDuty. When a PagerDuty email address is used in a Wavefront alert, the number of incidents created in PagerDuty can change significantly based on the email management configurations. 
 
Consider the following scenario:

```
12:01pm - Alert: High Latency fires for source=app-1
12:05pm - Alert Updates: High Latency fires for source=app-5 and source=app-7 (app-1 is still being affected)
12:10pm - Alert Updates: High Latency recovers for source=app-1 and source=app-7 (app-5 is still being affected)
12:12pm - Alert Resolves: High Latency resolves for source=app-5 (no more sources are affected)
```
 
Based on this scenario, choosing a PagerDuty API integration key target would mean that a single incident would track all of those changes and would also resolve the incident automatically in PagerDuty if the alert resolves in Wavefront. Choosing a PagerDuty email target requires you to customize the email management configuration to determine whether the scenario above would create 1, 2, 3, or 4 separate incidents in PagerDuty.
 
If want to use a PagerDuty email target, then make sure to consider the **Open a new incident only if an open incident does not already exist** option carefully. If you select this option and the PagerDuty email target is used in multiple Wavefront alerts, then you run the risk of having multiple Wavefront alerts tied to a single incident in PagerDuty.
 
## Retrieving Your PagerDuty API Integration Key or Email Address
Navigate to your PagerDuty account to retrieve either your PagerDuty API key or email address. If you want to use a PagerDuty API integration key and have not generated it yet, then generate a [key](https://support.pagerduty.com/hc/en-us/articles/202830340-Creating-a-Generic-API-Service). This information is tied to the unique PagerDuty service you want to use for your Wavefront alert. Copy the API integration key or PagerDuty email address.

![PagerDuty](images/pager_duty.png)

## Adding the PagerDuty Integration into a Wavefront Alert
PagerDuty API keys and email addresses are used within Wavefront alerts, so you must first have an alert that the PagerDuty integration can be applied to. To apply the PagerDuty integration to an existing alert, locate that alert from the Alerts page in Wavefront. 

1. Navigate to the Alerts page. 
1. Locate the existing alert from the list of alerts or use the search bar on the Alerts page to search for the existing alert. 
1. Click the alert name. If you don't have an alert that to update with the webhook integration, create a new alert.
1. Scroll down to the **Notifications** field.
1. Do one of the following:
  - If you are using a PagerDuty API integration key, enter **pd:** into the Targets field and paste your PagerDuty API integration key after **pd:**. You will be unable to save your alert if **pd:** is not entered before the API integration key or your key is incomplete.
  - If you are using a PagerDuty email address, paste the address into the **Targets** field.
1. Click **Save**.
 
Once your alert state changes, you will be notified via PagerDuty based on the escalation policy tied to your PagerDuty service.



