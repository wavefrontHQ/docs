---
title: Managing Access to Dashboards and Alerts
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: access.html
summary: Control access to individual dashboards and alerts.
---
The roles, permissions, and groups authorization paradigm manages global permissions. For example, a user with **Dashboards** permission can manage *all* dashboards. This paradigm is sufficient for many Wavefront customers.

Administrators who need finer-grained control can manage access on a per-object basis. We currently support access control for dashboards and alerts.

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
* If the administrator changes the Security organization setting back to allow Everyone access, then the objects that were created while the strict security organization setting was set, continue to be governed by access control.

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

You can also grant access for new dashboards and alerts to Service Accounts:

1. Click the gear icon <i class="fa fa-cog"/> on the taskbar, and select **Organization Settings**.
2. Click the **Security** tab, select **Grant Modify Access To:  Everyone** and **Service Accounts**.

## Making Orphan Dashboards or Alerts Visible

An orphan dashboard results if:
* All users and groups, including the Everyone group, no longer have access.
* Only one user had access to a dashboard or an alert, and that user was deleted.

To restore an orphan dashboard or alert:
1. Log in as a Super Admin user and from the gear icon <i class="fa fa-cog"/> on the taskbar select **Super Admin**.
2. Select the orphaned dashboard or alert and share it with other users or groups.

  ![orphan dashboards](/images/orphan_dashboards.png)
