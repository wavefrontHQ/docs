---
title: Share Dashboards and Charts
tags: [dashboards, charts]
sidebar: doc_sidebar
permalink: ui_sharing.html
summary: Share links to dashboards and charts, give dashboard access, and create embedded charts.
---
You can
* Share a link to a dashboard or chart so someone else can see what's going on.
* Share [access](access.html) to a dashboard if the user is not in a group that has access to that specific dashboard.
<!---* Embed an interactive chart outside Wavefront.--->

{% include shared/badge.html content="Every Wavefront user can view dashboards and make temporary changes. You must have Dashboard permission to share a link to a dashboard or chart." %}

## Share a Link to a Dashboard or Chart

Wavefront allows you to share dashboards and charts with other authorized users of your environment. We support two options:
* Non-live view -- Links to a snapshot of what you're looking at right now.
* Live view -- Changes as the dashboard or alert changes.

**Note:** If access control is on, and you share a link with a user who does not have view access, the user cannot view the dashboard. You have to share access before you share the link.

**To share a dashboard using a link**
1. Navigate to the dashboard and click the Share Dashboard icon.

   ![share dashboard icon](images/share_dashboard_icon.png)
2. Select the **Shared Links** tab and click the button to copy the link you want to share:

   | Share link to the NON-LIVE display | The link recipient will see, at any time, what you see. For example, if you share a non-live link, and the recipient opens the links 3 hours later, that link shows the state of the system 3 hours ago. Even if you make changes, the link recipient only sees the snapshot of the dashboard at the time you copied the link.|
   |  Share link to the LIVE display | The link recipient sees the live display of the current dashboard. If the dashboard changed after you sent the link, the recipient sees those changes. |

<table style="width: 100%;">
<tbody>
<tr>
<td width="65%">
<strong>Note:</strong> You can instead share the link to the NON-LIVE display using the link icon in the bottom right quadrant of the page.</td>
<td width="35%"><img src="/images/link_icon.png" alt="link icon"></td>
</tr>
</tbody>
</table>

## Share Access to Dashboards or Alerts

If the [access control]() for an individual dashboard or alert has been set so that access is blocked by default, the following users can share access with other users and groups:
* The dashboard creator
* Super Admin
* Any user who has View & Modify access because someone already shared access to the dashboard with that user.

The process is very similar for dashboards and for alerts.

**To grant or revoke dashboard access**
1. Navigate to the dashboard and click the Share Dashboard icon.

   ![share dashboard icon](images/share_dashboard_icon.png)
2. Click **Accounts & Groups**
3. To grant access:
   1. Start typing into the **View Dashboard** or **View & Modify Dashboard** field.
   2. Select the group or user to give access to and click **Update**
4. To revoke access, delete the group or user and click **Update**.

<!---Not currently supported
## Embed a Chart in Other UIs

Wavefront supports the ability to embed an interactive chart outside of Wavefront. You must have [Embed Charts Permission](permissions_overview.html#embed-charts-permission) to create embedded charts.

To embed a chart:

1. Open the chart you want to embed in the chart editor and click the embed icon (`<\>`).

    ![embed_chart_icon](images/embed_chart_icon.png)

2. Click **Create**. A dialog containing an HTML code snippet like the one below displays:

    ![embed_chart_snippet](images/embed_chart_snippet.png)

1. Copy the snippet and paste it into the desired location. You can adjust the `width` and `height` parameters.--->
