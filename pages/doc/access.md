---
title: Managing Access
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: access.html
summary: Learn how to manage access to dashboards.
---
The users/groups/permissions authorization paradigm is sufficient for many Wavefront customers. However, admins who need finer-grained control can manage access to Wavefront objects on a per-object basis. The first release supports access control for dashboards. See [Authorization in Wavefront](authorization.html#level-3-access-control-for-objects) for background information.

**Note**: After the Access security preference is set to Creator in an environment, only the creator of a new object and Super Admin can view and modify new objects initially. Those users can share the object with other groups or users.

## How Access Control Works

Initially, Wavefront supports granting and revoking access to dashboards.
* By default, all users can access all dashboards.
* Users with Dashboard permission can:
  - Change access for one or more dashboards from the Dashboard browser.
  - Select the Share icon on individual dashboards to change who has access.

In high-security environments, administrators change a security preference. After that:
* Each *new* dashboard is visible only to the creator and to Super Admin users.
* The dashboard creator or a Super Admin user can then share new dashboards with groups or users.
* If the administrator changes the security preference back to allow Everyone access, then the dashboards that were created while the strict security preference was set continue to be governed by access control.

## Change Access for One or More Dashboards

Privileged users can change the access setting for one or more dashboard from the Dashboards browser.
1. From the top menu bar, click **Dashboards > All Dashboards**.
2. Select the check boxes for the dashboards you want to change. You can see the dashboard's current Access settings in the **Access** column.
3. Click **+Access** to add groups/users and **-Access** to remove groups/users.
4. Specify the groups/users and click **Update**.

## Changing Access for Individual Dashboards

If the Security system preference is set to **Grant Modify Access To: Creator**, then the creator and Super Admin can share the dashboard with other groups or individual users.

1. Click **Dashboards > All Dashboards** and navigate to the dashboard you want to modify.
2. Click the Share Dashboard icon.
![share dashboard icon](images/share_dashboard.png)
3. In the dialog, select **Users & Groups**, type the name(s) of groups or users to give access to, and click **Update**.
![share dashboard dialog](images/share_dashboard_dialog.png)

Privileged users can later remove groups or users to revoke access.


## Changing the Access Control Preference

Initially, all users can view all dashboards and users with Dashboard permission can modify all dashboards. For more control, administrators can restrict access for new dashboards:

1. Click the gear icon and select **System Preferences**.
2. Click the **Security** tab and select **Grant Modify Access To: Creator**

After the change to the preference, access to new dashboards is initially limited to the dashboard creator and Super Admin users. Those two users can share the dashboard with other groups of users and individual users by giving View access or View & Modify access.

**Note:** A security preference change applies only to dashboards created after the change. If you change the setting to **Creator**, only new dashboards have restricted access. If you later change the setting to **Everyone**, all dashboards that were created while the setting was **Creator** keep the restricted access.

## Making Orphan Dashboards Visible

An orphan dashboard results if:
* All users and groups, including the Everyone group, no longer have access.
* Only one user had dashboard access, and that user was deleted.

To access an orphan dashboard:
1. Log in as Super Admin and select **Super Admin** from the gear icon.
2. Select the dashboard and share it with other users or groups.

  ![orphan dashboards](/images/orphan_dashboards.png)
