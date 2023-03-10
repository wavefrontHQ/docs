---
title: Jira Integration
tags: [integrations list]
permalink: jira.html
summary: Learn about the Jira Integration.
---
## Jira Integration

Jira is an issue and project tracking system for software teams. This integration allows to create tickets from triggered alerts in Operations for Applications. Operations for Applications and Jira both support webhooks so you can easily configure an incoming webhook in Jira and an outgoing webhook in Operations for Applications to pass the notifications from Operations for Applications alerts into Jira. A Jira ticket created based on alert in Operations for Applications looks like this:

{% include image.md width="80" src="images/jira_ticket.png" %}
## Jira Setup



### Step 1. Create a Jira API Token
1. Log in to [Atlassian](https://id.atlassian.com/).
1. Click **API Tokens** and then **Create API Token**.
1. Enter a name for the token in **Label** box and click **Create**.
1. It will create a token and prompt to view/copy the token.
1. Click **Copy to clipboard** and paste the token into a text file or scratch pad and keep it safe.

Follow this [link](https://confluence.atlassian.com/cloud/api-tokens-938839638.html) for more details.

### Step 2. Generate and Save a Basic Authorization String

The Jira API uses Basic Authorization, a Base64 encoded string, for the user and API Token. You will use this string in the Authorization header for the API call that creates ticket in Jira. There are several ways to generate this string, this guide uses a public website.
1. Go to [https://www.base64encode.org](https://www.base64encode.org).
1. Specify the user and API token created in Step 1 in this format: `Jira User:API Token`.
1. Click the **Encode** button.
1. Copy the resulting Base64 encoded string.
1. Paste the Base64 encoded string into a text file or scratch pad to save it for later.
{% include image.md src="images/base64_encode.png" %}

### Step 3. Create a Jira Alert Target

{% include webhooks_create.md %}
1. In this case, URL would look like `<Jira URL>/rest/api/2/issue`.
1. In the **Content Type** field, select **application/json**.
1. Add following Custom Headers:{% raw %}
```
Authorization - Basic {base64 encoded API Token from Step 2}
Accept - application/json
```
{% endraw %}
1. Select **TEMPLATE** in **Alert Target POST Body Template**.
1. The [template](https://docs.wavefront.com/alert_target_customizing.html) can be customized as below:{% raw %}
```
{
	"fields": {
		"project":
		{
			"key": "<Jira Project Name>"
		},
		"summary": "{{#jsonEscape}}{{{subject}}}{{/jsonEscape}}",
		"description": "Alert ID: {{{alertId}}}\nAlert Name: {{#jsonEscape}}{{{name}}}{{/jsonEscape}}\nSeverity: {{{severity}}}\nCondition: {{#jsonEscape}}{{{condition}}}{{/jsonEscape}}\nCreated Time: {{{createdTime}}}\nStarted Time: {{{startedTime}}}\nSince Time: {{{sinceTime}}}\nEnded Time: {{{endedTime}}}\n{{#trimTrailingComma}}{{#failingAlertSeries}}Host: {{host}}\nLabel: {{label}}\nTag: {{tags}}\nObserved: {{observed}}\nFiring: {{firing}}\nFirst Stats: {{stats.first}}\nLast Stats: {{stats.last}}\nMinimum Stats: {{stats.min}}\nMaximum Stats: {{stats.max}}\nMean Stats: {{stats.mean}}{{/failingAlertSeries}}{{/trimTrailingComma}}",
		"issuetype": {
			"name": "Bug"
		}
	}
}
```
{% endraw %}
Follow this [link](https://developer.atlassian.com/cloud/jira/platform/rest/?_ga=2.32496189.285108841.1525870487-134772442.1525608908#api-api-2-issue-post)
to choose more Jira fields which can be added to the template.

1. Click **Save** to add the alert target in Operations for Applications.
1. Browse to **Alert Target** page. In the Name column, note the ID of the alert target you just created.

### Step 4. Add the Jira Alert Target to Operations for Applications Alert

{% include alerts.md %}
{% include webhooks_select.md %}




