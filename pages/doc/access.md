---
title: Managing Access to Dashboards and Alerts
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: access.html
summary: Control access to individual dashboards and alerts.
---
The roles, permissions, and groups authorization paradigm manages global permissions. For example, a user with **Dashboards** permission can manage *all* dashboards. This paradigm is sufficient for many Wavefront customers.

Super Admins or users with the **Accounts** permission who need finer-grained control can manage access on a per-object basis. We currently support access control for dashboards and alerts.

{% include note.html content="Permission and access control are additive. To make changes to a dashboard, you must have the **Dashboards** permission and View and Modify access for that dashboard" %}

{% include tip.html content="In addition to access control, we also support [metrics security policy rules](metrics_security.html) which allow fine-grained control over which users can see which metrics." %}

This video shows how to limit access for a dashboard, how to give access (share) that dashboard, and how to set the Security organization setting. You can manage access for alerts the same way. The video uses the 2020 version of the Wavefront UI.

<p><a href="https://youtu.be/45E4pkann0E"><img src="images/v_access.png" style="width: 700px;" alt="Wavefront access control"/></a>
</p>

{% include note.html content="After the Access organization setting is set to Object Creator in an environment, only the creator of a new object and the Super Admin can view and modify new objects initially. Those users can give access to the object with other groups or users." %}


## How Access Control Works

Wavefront supports granting and revoking access to dashboards and alerts.
* By default, all users can view all dashboards and alerts.
* Users with **Dashboards** permission can:
  - Restrict or grant access to individual dashboards from the Dashboard browser.
  - Click the **Share** icon on individual dashboards to change who has access.
* Users with **Alerts** permission can:
  - Restrict or grant access for individual alerts from the Alerts browser.
  - Click the **Share** icon on individual alerts to change who has access.

In high-security environments, administrators can change the security organization setting. After that change:
* Each *new* object (dashboard or alert) is visible only to the creator of the object and to the Super Admin users.
* The object creator or a Super Admin user can then share new dashboards with groups or users.
* If the administrator changes the Security organization setting back to allow **Everyone** access, then the objects that were created while the strict security organization setting was set, continue to be governed by access control.

## Change Access for One or More Dashboards or Alerts

Privileged users can change the access setting for one or more dashboards or alerts from the Dashboards browser or the Alerts browser. The process is the same for both objects. The following steps show how to do it for dashboards.

1. From the top menu bar, click **Dashboards > All Dashboards**.
2. Select the check boxes for the dashboards you want to change. You can see the current Access settings in the **Access** column.
3. Click **+Access** to add groups or users and **-Access** to remove groups or users.
4. Enter the groups or users and click **Update**.

## Changing Access for Individual Dashboards or Alerts

You can change access for an individual dashboard or alert from the Edit page of the object. For example, you can add access for the Finance group and revoke access for the Everyone group for a dashboard:

1. Click **Dashboards > All Dashboards** and navigate to the dashboard you want to modify.
2. Click the name of the dashboard, and click the **Share** icon.

   ![share dashboard icon](images/share_dashboard.png)
3. In the **Dashboard Links and Access** window, click the **Accounts & Groups** tab.
   * To grant View Access or View & Modify access, type the name(s) of groups or users.
   * To revoke View Access or View & Modify access, click the `x` next to the group or user name that you want to remove.
4. Click **Update**.

   ![share dashboard window](images/share_dashboard_dialog.png)


## Change the Access Control Security Organization Setting

Initially, all users can *view* all dashboards and alerts. In addition, global permissions apply:
* Users with **Dashboards** permission can modify all dashboards.
* Users with **Alerts** permission can modify all alerts.

As an administrator, you can restrict access for new dashboards and alerts:

1. Click the gear icon <i class="fa fa-cog"/> on the taskbar, and select **Organization Settings**.
2. Click the **Security** tab and select **Grant Modify Access To: Object Creator**

After the change, access to new dashboards and new alerts is initially limited to the dashboard creator and the Super Admin users. Those users can share the objects with other groups or individual users by giving View access or View & Modify access.

{% include note.html content="A change to an Organization Setting applies only to dashboards and alerts created after the change. If you change the setting to **Object Creator**, only new dashboards and alerts have restricted access. If you later change the setting to **Everyone**, all dashboards and alerts that were created while the setting was **Object Creator** keep the restricted access." %}

By default, service accounts don't have browse permissions. However, you can also grant access for new dashboards and alerts to service accounts:

1. Click the gear icon <i class="fa fa-cog"/> on the taskbar, and select **Organization Settings**.
2. Click the **Security** tab, select **Grant Modify Access To:  Everyone** and **Service Accounts**.


## Recovering an Inaccessible Dashboard

If a dashboard is no longer accessible, it was either deleted (moved to trash), it was permanently deleted, or the permissions were revoked for some reason. If a dashboard is moved to trash and permissions on the dashboard haven't been changed, a user with the **Dashboards** permission can [recover the deleted dashboard](ui_dashboards.html#set-dashboard-display-preferences-and-settings).

Only a Super Admin user, can restore dashboard permissions and attempt to restore a permanently deleted dashboard.

### Make Orphan Dashboards or Alerts Visible

An orphan dashboard results if:
* All users and groups, including the **Everyone** group, no longer have access.
* Only one user had access to a dashboard or an alert, and that user was deleted.

To restore an orphan dashboard or alert:
1. Log in as a Super Admin user and from the gear icon <i class="fa fa-cog"/> on the taskbar select **Super Admin**.
2. Select the orphaned dashboard or alert and share it with other users or groups.

  ![orphan dashboards](/images/orphan_dashboards.png)
  
### Recover a Permanently Deleted Dashboard

If a dashboard is not in the trash, or if Super Admin can't find it, then the dashboard is most probably permanently deleted. As a Super Admin, you can attempt to restore the dashboard by using the Wavefront API.

1. Log in as a Super Admin user and from the gear icon <i class="fa fa-cog"/> on the taskbar select **API Documentation**.
2. Expand the **Dashboard** category, click the `GET api/v2/dashboard/{id}/history/{version}` request and click **Try it out** in the top right of the request.
3. Enter the dashboard name as the `"id"` parameter. 
   For example, if the dashboard URL is `https://<your-wavefront-cluster>.wavefront.com/dashboards/MY-DASHBOARD`, then the `"id"` that you should enter is **MY-DASHBOARD**.
4. Enter the last known version of the dashboard as an integer.
   
   Note: If you don't know the version, you can enter **1**. This way, you also determine whether the dashboard `"id"` input has ever existed.
5. Click **Execute**.
   
   If the dashboard `"id"` or version don't exist, the API call returns an error the type:
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
6. Copy the **Response body** of the request, that starts after `"response":` up to and including the last but one closing curly bracket (`}`). 

   
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
7. Click the `POST api/v2/dashboard/` request and click the **Try it out** button in the top right of the request. 
8. Paste the copied response data into the **Edit Value** text box and click **Execute** to perform the POST API call.
9. Validate that the dashboard is now live again. 
   
   You should now be able to review the dashboard history by using the GUI. 
