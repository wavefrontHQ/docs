---
title: ServiceNow Integration
tags: [integrations list]
permalink: servicenow.html
summary: Learn about the Wavefront ServiceNow Integration.
---
## ServiceNow Incident Integration

ServiceNow is a popular IT services management platform. You can create [[applicationName]] alert targets that surface alerts as ServiceNow incidents of different priorities (High, Moderate, Low, Planning).
Incidents can also optionally be assigned to groups or categorized.
## ServiceNow Setup



### Step 1. Create an [[applicationName]] alert user in ServiceNow

[[applicationName]] will use the ServiceNow user to create incidents. The user will be identified as the caller for each incident.
This user will be used by [[applicationName]] to create incidents in ServiceNow and will also be identified as the Caller for each incident. 
1. In ServiceNow, navigate to **System Security** > **Users & Groups** > **Users** and click **New**.
1. Specify a User ID (for example `appMonitor`) and a First Name (for example `Operations for Applications Alerts`).
1. Make sure that you leave the **Password needs reset** check box deselected.
1. Select the **Internal Integration User** check box.
1. Click **Submit**. The new user is created.


### Step 2. Generate password for the [[applicationName]] alert user

1. In ServiceNow, navigate to **System Security** > **Users & Groups** > **Users**.
1. Search for the user created in Step 1 and click the user.
1. On the user page, click **Set Password**.
1. In the **Set Password** window, click the **Generate** button.
1. Click **Copy** to copy the password.
1. Click the **Save Password** button and close the **Set Password** window.


### Step 3. Copy and save the new user's sys_id

Copy and save the user's sys_id so you can make the user the caller for incidents that are created.
1. In ServiceNow, navigate to **System Security** > **Users & Groups** > **Users**.
1. Search for the user created in Step 1.
1. Right-click the User ID and select **Copy sys_id**.
1. Paste the sys_id into a text file or scratch pad.
{% include image.md src="images/servicenow_copy_user_sys_id.png" %}


### Step 4. Generate and save a basic authorization string

The ServiceNow API uses Basic Authorization, a Base64 encoded string, for the user and password. You will use this string in the Authorization header for the API call that creates incidents in ServiceNow. There are several ways to generate this string, this guide uses a public website.
1. Navigate to [https://www.base64encode.org](https://www.base64encode.org).
1. Type in the user and password created in Step 1 in this format: `user:password`.
1. Click the **Encode** button.
1. Copy the resulting Base64 encoded string.
1. Paste the Base64 encoded string into a text file or scratch pad to save it for later.
{% include image.md src="images/base64_encode.png" %}


### Step 5. Create a ServiceNow Alert Target

1. In [[applicationName]], create an Alert Target.
1. Give the Alert Target a meaningful name and description.
1. As **Triggers**, select the **Alert Firing**, **Alert Status Updated**, and **Alert Has No Data** options.
1. Set Type to **Webhook**.
1. Set the URL field to `https://YOUR_INSTANCE.service-now.com/api/now/table/incident` replacing YOUR_INSTANCE with the name of your instance in ServiceNow.
1. Set Content Type to **application/json**.
1. Create a new Custom Header with the name `Authorization` and the value `Basic <TOKEN>`, where <TOKEN> is the Base64 token that you copied and saved in Step 3.
1. Copy and paste the following into the Body Template of the alert target.{% raw %}
    ```
    {{! https://docs.wavefront.com/alert_target_customizing.html }}
    {
      "short_description":"{{#jsonEscape}}{{{name}}}{{/jsonEscape}}",
      "description":"Series: {{#trimTrailingComma}}{{#jsonEscape}}{{#newlyFailingSeries}}{{{.}}}, {{/newlyFailingSeries}}{{/jsonEscape}}{{/trimTrailingComma}}\nSources: {{#trimTrailingComma}}{{#jsonEscape}}{{#newlyFailingHosts}}{{{.}}}, {{/newlyFailingHosts}}{{/jsonEscape}}{{/trimTrailingComma}}\n\n{{{url}}}\n\n{{#jsonEscape}}{{{additionalInformation}}}{{/jsonEscape}}",
      "state":"1",
      "impact":"{{#severityInfo}}3{{/severityInfo}}{{#severitySmoke}}3{{/severitySmoke}}{{#severityWarn}}2{{/severityWarn}}{{#severitySevere}}2{{/severitySevere}}",
      "urgency":"{{#severityInfo}}3{{/severityInfo}}{{#severitySmoke}}2{{/severitySmoke}}{{#severityWarn}}2{{/severityWarn}}{{#severitySevere}}1{{/severitySevere}}",

      {{! caller_id is the reference to any Security User in ServiceNow that will be used as the Caller for the incident record }}
      "caller_id":"",

      {{! The following parameters are popular optional fields used in ServiceNow }}
      {{! assignment_group is the reference to any Security group in ServiceNow }}
      "assignment_group":"",
      {{! category is any valid cateogry string that can be used for incidents }}
      "category":""
    }
    ```
{% endraw %}
    **Note**: The `assignment_group` and `category` parameters are optional in the template.

1. In the Body Template, find the `caller_id` property and set its value to the `sys_id` that you copied in Step 2.
1. Customize other aspects of the [template](https://docs.wavefront.com/alert_target_customizing.html) as desired.
{% include image.md width="90" src="images/servicenow_alert_target.png" %}
1. Click **Save**


### Step 6. Add the ServiceNow alert target to an [[applicationName]] alert

{% include alerts.md %}
{% include webhooks_select.md %}



