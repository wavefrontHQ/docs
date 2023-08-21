---
title: Managing Access to Dashboards and Alerts in Operations for Applications on VMware Cloud Services
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: csp_access.html
summary: Control access to individual dashboards and alerts.
---

{% include note.html content="Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. The content in this chapter is valid for VMware Cloud services subscriptions. For **original** subscriptions, see [Managing Access to Dashboards and Alerts](access.html)."%}

VMware Cloud services supports the roles and groups authorization paradigm for managing global permissions in VMware Aria Operations for Applications. For example, a user with the **Dashboards** service role can manage *all* dashboards in Operations for Applications. This paradigm is sufficient for many of our customers.

Users with the [**Super Admin** service role](csp_users_roles.html#operations-for-applications-service-roles-built-in) who need finer-grained control can manage access on a per-object basis. We currently support access control for dashboards and alerts.

{% include note.html content="Permission and access control are additive. To make changes to a dashboard, you must have a role with the **Dashboards** permission and **View and Modify** access for that dashboard." %}

{% include tip.html content="In addition to access control, Operations for Applications also support [metrics security policy rules](csp_metrics_security.html) which allow fine-grained control over which users can see which metrics." %}

This video shows how to limit access for a dashboard, how to give access (share) that dashboard, and how to set the security setting. You can manage access for alerts the same way. 

Note that this video was created in 2020 and some of the information in it might have changed. It also uses the 2020 version of the UI.

<p><iframe id="kmsembed-1_lckq6foe" width="700" height="400" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_lckq6foe/uiConfId/49694343/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" title="Object-Based Access Control"></iframe></p>

{% include note.html content="After the access setting is set to **Object Creator** in an environment, only the creator of a new object and the users with **Super Admin** service role can view and modify new objects initially. Those users can give access to the object with other groups or users." %}


## How Access Control Works

Operations for Applications supports granting and revoking access to dashboards and alerts.
* By default, all users can view all dashboards and alerts.
* Users with the **Dashboards** permission can:
  - Restrict or grant access to individual dashboards from the Dashboard browser.
  - Click the **Share** icon on individual dashboards to change who has access.
* Users with the **Alerts** permission can:
  - Restrict or grant access for individual alerts from the Alerts browser.
  - Click the **Share** icon on individual alerts to change who has access.

In high-security environments, users with the **Super Admin** service role can change the security setting to **Object Creator**. After that change:
* Each *new* object (dashboard or alert) is visible only to the creator of the object and to the users with the **Super Admin** service role with enabled Super Admin mode.
* The object creator and the users with the **Super Admin** service role can then share new dashboards with groups or users.
* If a user with the **Super Admin** service role changes the security setting back to allow **Everyone** access, then the objects that were created while the strict security setting was set, continue to be governed by access control.

## Change Access for One or More Dashboards or Alerts

Privileged users can change the access setting for one or more dashboards or alerts from the Dashboards browser or the Alerts browser. The process is the same for both objects. The following steps show how to do it for dashboards.

1. From the top menu bar, select **Dashboards > All Dashboards**.
2. Select the check boxes for the dashboards you want to change. You can see the current Access settings in the **Access** column.
3. Click **+Access** to add groups or users and **-Access** to remove groups or users.
4. Enter the [groups](csp_users_roles.html#manage-user-groups) or [users](csp_user_management.html#adding-users-to-your-service-instance) and click **Update**.

## Changing Access for Individual Dashboards or Alerts

You can change access for an individual dashboard or alert from the Edit page of the object. For example, you can add access for the Finance group and revoke access for the Everyone group for a dashboard:

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<ol><li> Click <strong>Dashboards</strong> > <strong>All Dashboards</strong> and navigate to the dashboard that you want to modify.</li>
<li>Click the name of the dashboard, and click the <strong>Share</strong> icon on top.</li>
<li>In the <strong>Dashboard Links and Access</strong> window, click the <strong>Accounts & Groups</strong> tab.</li>
<ul><li>To grant View Access or View & Modify access, type the name(s) of <a href="csp_users_roles.html#manage-user-groups">groups</a> or <a href="csp_user_management.html#adding-users-to-your-service-instance">users</a>.</li>
<li>To revoke View Access or View & Modify access, click the `x` next to the group or user name that you want to remove.</li>
</ul>
<li> Click <strong>Update</strong>.</li>
</ol> </td>
<td width="60%"><img src="images/share_dashboard_dialog.png" alt="Share dashboard window."></td>
</tr>
</tbody>
</table>


## Change the Access Control Security Setting

Initially, all users can *view* all dashboards and alerts. In addition, global permissions apply:
* Users with **Dashboards** permission can modify all dashboards.
* Users with **Alerts** permission can modify all alerts.

As a user with the **Super Admin** service role, you can restrict access for new dashboards and alerts:

1. Log in to your service instance and [enable Super Admin mode](csp_users_account_managing.html#enable-or-disable-super-admin-mode).
1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Organization Settings**.
2. Click the **Security** tab and select **Object Creator**.

After the change, access to new dashboards and new alerts is initially limited to the dashboard creator and the users with the **Super Admin** service role. Those users can share the objects with groups or individual users by giving **View** access or **View & Modify** access.

{% include note.html content="A change to the security setting applies only to dashboards and alerts created after the change. If you change the setting to **Object Creator**, only new dashboards and alerts have restricted access. If you later change the setting to **Everyone**, all dashboards and alerts that were created while the setting was **Object Creator** keep the restricted access." %}

By default, service accounts (which correspond to server to server apps in VMware Cloud services) don't have browse permissions. However, you can also grant access for new dashboards and alerts to service accounts:

1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Organization Settings**.
2. Click the **Security** tab, select **Grant Modify Access To:  Everyone** and **Service Accounts**.

## Recovering an Inaccessible Dashboard or Alert

If you can no longer access a dashboard or alert, it was either deleted (moved to trash), it was permanently deleted, or the access settings for you or a group you belong to were changed.

* If a dashboard was deleted and moved to trash less than 30 days ago, a user with the **Dashboards** permission can [restore the deleted dashboard](ui_dashboards.html#delete-and-recover-a-deleted-dashboard).
* If an alert was deleted and moved to trash less than 30 days ago, a user with the **Alerts** permission can [restore the deleted alert](alerts_manage.html#restore-a-deleted-alert).
* If a dashboard was deleted and moved to trash more than 30 days ago, or was permanently deleted, and no one, including users with the **Super Admin** service role, can find the dashboard. A user with the **Super Admin** can attempt to [restore the dashboard by using the API](#recover-a-permanently-deleted-dashboard).
* If the access settings to a dashboard or alert have changed, you can ask a user with the **Super Admin** service role to [restore the access for you](#changing-access-for-individual-dashboards-or-alerts).
* If all users and groups can no longer access a specific dashboard or alert, a user with the **Super Admin** service role may need to check if it is in an orphaned state. A user with the **Super Admin** service role can [make orphan dashboards and alerts visible](#make-orphan-dashboards-or-alerts-visible).

Only a user with the **Super Admin** service role can restore dashboard permissions and attempt to restore a permanently deleted dashboard.

### Make Orphan Dashboards or Alerts Visible

A dashboard or alert becomes orphaned if:
* All users and groups no longer have access to it.
* Only one user had access to it, and that user was removed.

To restore an orphan dashboard or alert:
1. Log in to your service instance as a user with the **Super Admin** service role and [enable Super Admin mode](csp_users_account_managing.html#enable-or-disable-super-admin-mode).
1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Orphaned Objects**.
1. Select the orphaned dashboard or alert and share it with other users or groups.

### Recover a Permanently Deleted Dashboard

A permanently deleted dashboard does not show in the trash and becomes inaccessible to all users, including the users with the **Super Admin** service role. As a user with the **Super Admin** service role, you can try to restore the dashboard by using the REST API.

1. Log in to your service instance as a user with the **Super Admin** service role and [enable Super Admin mode](csp_users_account_managing.html#enable-or-disable-super-admin-mode).
2. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **API Documentation**.
3. Expand the **Dashboard** category and click the `GET api/v2/dashboard/{id}/history/{version}` request.
4. Enter the dashboard name as the `"id"` parameter.
   For example, if the dashboard URL is `https://<your_instance>.wavefront.com/dashboards/MY-DASHBOARD`, then the `"id"` that you should enter is *MY-DASHBOARD*.
5. Enter the last known version of the dashboard as an integer.

   If you don't know the version, you can enter *1*. This way, you also determine whether the dashboard `"id"` input has ever existed.

6. Click **Execute**.

   If the dashboard `"id"` and the dashboard version don't exist, the API call returns an error like:

   ```
     {
      "status":
      {
        "result":"ERROR",
        "message":"dashboard does not exist",
        "code":404
        }
      }
      ```
7. Copy the **Response body** of the request, that starts after `"response":` up to and including the last but one closing curly bracket (`}`).


   ```
{
  "modifyAclAccess":true,
  "hidden":false,
  "parameters":{},
    "name":"MY DASHBOARD",
    "id":"MY-DASHBOARD",
    ...

    "favorite":false,
    "numCharts":2
}

   ```
8. Click the `POST api/v2/dashboard/` request.
9. Paste the copied response data into the **Edit Value** text box and click **Execute** to perform the POST API call.

   ![Create a dashboard by using the API. The Edit Value text box contains the response data copied from Step 7.](images/create-dashboard-api-call.png)

    This will restore the dashboard.

10. Validate that the dashboard is now live again.

    For example, navigate to `https://<your_instance>.wavefront.com/dashboards/MY-DASHBOARD/history` and you should now be able to review the dashboard history by using the GUI.
