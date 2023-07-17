---
title: PagerDuty Integration
tags: [integrations list]
permalink: pagerduty.html
summary: Learn about the PagerDuty Integration.
---

This page provides an overview of what you can do with the PagerDuty integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the PagerDuty integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **PagerDuty** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## PagerDuty Integration

PagerDuty is a popular incident management platform. This integration configures PageDuty API keys or email addresses as targets of Operations for Applications alert notifications.

Operations for Applications recommends using the PagerDuty API integration key instead of the PagerDuty email integration, but the choice between the two targets should be dependent upon how you want incidents to be created in PagerDuty based on your Operations for Applications alerts. When a PagerDuty API integration key is used in an Operations for Applications alert, all alert changes (firing, updated, resolved) are tied to a single incident in PagerDuty. When a PagerDuty email address is used in an Operations for Applications alert, the number of incidents created in PagerDuty can change significantly based on the email management configurations.

Consider the following scenario:
{% raw %}
```
12:01pm - Alert: High Latency fires for source=app-1
12:05pm - Alert Updates: High Latency fires for source=app-5 and source=app-7 (app-1 is still being affected)
12:10pm - Alert Updates: High Latency recovers for source=app-1 and source=app-7 (app-5 is still being affected)
12:12pm - Alert Resolves: High Latency resolves for source=app-5 (no more sources are affected)
```
{% endraw %}

In this scenario, choosing a PagerDuty API integration key target means that a single incident would track all of those changes and would also resolve the incident automatically in PagerDuty if the alert resolves in Operations for Applications. Choosing a PagerDuty email target requires you to customize the email management configuration to determine whether the scenario above would create 1 to 4 separate incidents in PagerDuty.

If want to use a PagerDuty email target, consider the **Open a new incident only if an open incident does not already exist** option carefully. If you select this option and the PagerDuty email target is used in multiple Operations for Applications alerts, you run the risk of having multiple Operations for Applications alerts tied to a single incident in PagerDuty.




