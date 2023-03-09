---
title: PagerDuty Integration
tags: [integrations list]
permalink: pagerduty.html
summary: Learn about the Wavefront PagerDuty Integration.
---
## PagerDuty Integration

PagerDuty is a popular incident management platform. This integration configures PageDuty API keys or email addresses as targets of [[applicationName]] alert notifications.

[[applicationName]] recommends using the PagerDuty API integration key instead of the PagerDuty email integration, but the choice between the two targets should be dependent upon how you want incidents to be created in PagerDuty based on your [[applicationName]] alerts. When a PagerDuty API integration key is used in an [[applicationName]] alert, all alert changes (firing, updated, resolved) are tied to a single incident in PagerDuty. When a PagerDuty email address is used in an [[applicationName]] alert, the number of incidents created in PagerDuty can change significantly based on the email management configurations.

Consider the following scenario:
{% raw %}
```
12:01pm - Alert: High Latency fires for source=app-1
12:05pm - Alert Updates: High Latency fires for source=app-5 and source=app-7 (app-1 is still being affected)
12:10pm - Alert Updates: High Latency recovers for source=app-1 and source=app-7 (app-5 is still being affected)
12:12pm - Alert Resolves: High Latency resolves for source=app-5 (no more sources are affected)
```
{% endraw %}

In this scenario, choosing a PagerDuty API integration key target means that a single incident would track all of those changes and would also resolve the incident automatically in PagerDuty if the alert resolves in [[applicationName]]. Choosing a PagerDuty email target requires you to customize the email management configuration to determine whether the scenario above would create 1 to 4 separate incidents in PagerDuty.

If want to use a PagerDuty email target, consider the **Open a new incident only if an open incident does not already exist** option carefully. If you select this option and the PagerDuty email target is used in multiple [[applicationName]] alerts, you run the risk of having multiple [[applicationName]] alerts tied to a single incident in PagerDuty.

## PagerDuty Setup



### Step 1. Retrieve Your PagerDuty API Integration Key or Email Address

1. Log in to your PagerDuty account.
1. Click the **Services** tab, and choose the service you want to retrieve the key or email address.
{% include image.md width="50" src="images/pagerduty_keys.png" %}
1. On the Integrations tab, expand the integration to view the **API** or **Email** link.
{% include image.md width="50" src="images/pagerduty_services.png" %}
1. Copy the API integration key or email address.

### Step 2. Add the PagerDuty Integration to an [[applicationName]] Alert

Edit the alert and set the alert target.

{% include alerts.md %}
1. Configure the target with a PagerDuty API integration key or email address:
   - PagerDuty API integration key - Paste the API integration key into the Targets field and press Enter.
   - PagerDuty email address - Paste the email address into the Targets field and press Enter.
1. Click **Save**.



