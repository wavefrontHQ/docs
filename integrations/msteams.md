---
title: Microsoft Teams Integration
tags: [integrations list]
permalink: msteams.html
summary: Learn about the Wavefront Microsoft Teams Integration.
---
## Microsoft Teams Integration

Microsoft Teams is a popular team collaboration tool. 
You can use [[applicationName]] alerts to send a message to a Microsoft Teams chat channel. With the help of webhooks you can integrate [[applicationName]] alerts into Microsoft Teams as a Connector.

## Microsoft Teams Setup


### Step 1. Create a Webhook Connector in Microsoft Teams
In Microsoft Teams, choose or create the Team to which you want to send the alert.
  1. Click the arrow to the left of the team name.
  1. Select the ellipsis (3 dots) to the right of **General** and select **Connectors**
{% include image.md width="30" src="images/msteams_general.png" %}

In the dialog:
  1. Select **Configure**, to the right of  **Incoming Webhook**
{% include image.md width="30" src="images/msteams_connectors.png" %}
  1. Choose a name for this incoming webhook, optionally upload an image that will be displayed by alert messages, and click **Create**.

After a few seconds, a new window prompts you to copy the webhook URL. [[applicationName]] will use this URL to send alerts to Microsoft Teams.

  1. Copy the URL and click **Done**.

The Microsoft Team is now ready to receive webhook alerts. Note that you can create multiple webhook alert targets, each with its own URL, if you want to multiple alerts to the same Microsoft Team.
{% include image.md width="30" src="images/msteams_webhook.png" %}
### Step 2. Create a Microsoft Teams Alert Target
{% include webhooks_create.md %}
1. Set Content Type to **application/json**.
1. Customize the [alert_notification](https://docs.wavefront.com/alert_target_customizing.html).
1. Give a meaningful description to your new alert target.
1. Copy and paste the following into the **Body Template** box of the alert target.{% raw %}
```
{{#setDefaultIterationLimit}}500{{/setDefaultIterationLimit}}
{{#setFailingLimit}}500{{/setFailingLimit}}
{{#setInMaintenanceLimit}}500{{/setInMaintenanceLimit}}
{{#setNewlyFailingLimit}}500{{/setNewlyFailingLimit}}
{{#setRecoveredLimit}}500{{/setRecoveredLimit}}
{
	"@type": "MessageCard",
	"@context": "https://schema.org/extensions",
	"summary": "{{{subject}}}",
	"themeColor": "0078D7",
	"title": "{{{subject}}}",
	"sections": [
		{{#trimTrailingComma}}
		{
			"facts": [

			  {
			    "name": "Status",
			    "value": "{{headline}}"
			  },
			  {
			    "name": "Reason",
			    "value": "{{reason}}"
			  },
			  {
			    "name": "Severity",
			    "value": "{{{severity}}}"
			  },
			  {
			    "name": "Condition",
			    "value": "{{#jsonEscape}}`{{{condition}}}`{{/jsonEscape}}"
			  },
			  {
			    "name": "Event Started",
			    "value": "{{{startedTime}}}"
			  },

	      {{! Alert started section }}
	      {{#isAlertOpened}}
	        {
        	  "name": "Newly Failing Series",
		        "value": "{{#jsonEscape}}{{#newlyFailingSeries}}{{{.}}},{{/newlyFailingSeries}}{{/jsonEscape}}",
		        "short": false
	        },
        {{/isAlertOpened}}

        {{! Alert Updated section }}
		    {{#isAlertUpdated}}
		      {
          "name": "Failing Alert Series",
          "value": "{{#jsonEscape}}{{#failingAlertSeries}}(Host: {{host}}, Label: {{label}}, Tags: {{tags}}), {{/failingAlertSeries}}{{/jsonEscape}}",
          "short": false
        },
		    {{/isAlertUpdated}}

		    {{! Alert Resolved section }}
        {{#isAlertResolved}}
          {
          "name": "Recovered Sources",
          "value": "{{#jsonEscape}}{{#recoveredHosts}}{{{.}}},{{/recoveredHosts}}{{/jsonEscape}}",
          "short": false
          }
        {{/isAlertResolved}}
      ],
			  "text": "{{{additionalInformation}}}"
		},
		{{#imageLinks}}
    {
      "text": "![Graph]({{{.}}})"
    },
    {{/imageLinks}}
    {{/trimTrailingComma}}
	],
	"potentialAction": [
		{{#trimTrailingComma}}
		{{#url}}
		{
			"@type": "OpenUri",
			"name": "View Alert",
			"targets": [
                {
                    "os": "default",
                    "uri": "{{{url}}}"
                }
            ]
		},
		{{/url}}
		{{/trimTrailingComma}}
	]
}
```
{% endraw %}
Customize other aspects of the [template](https://docs.wavefront.com/alert_target_customizing.html) as desired.
{% include image.md width="90" src="images/msteams_alert_target.png" %}
1. Click **Save**.

### Step 3. Test the Saved Alert Target (Optional)
1. In [[applicationName]], click the ellipsis icon on the left of your saved alert target.
1. Click **Test** to send a test notification message to your Team.
1. Go to Teams and verify that the sample notification has been received.

### Step 4. Add the Microsoft Teams Alert Target to an [[applicationName]] Alert

{% include alerts.md %}
{% include webhooks_select.md %}



