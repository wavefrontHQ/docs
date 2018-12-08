---
title: Managing Access
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: access.html
summary: Learn how to manage access to dashboards.
---
The users/groups/permissions authorization paradigm works well for many Wavefront customers. However, admins who need finer-grained control can manage access on a per-object basis. The first release supports [access control for dashboards](authorization.html#level-3-access-control-for-objects).


## How Access Control Works

Wavefront supports granting and revoking access to individual dashboards.
* By default, all users are in the Everyone group, and the Everyone group is in the access list of each dashboard.
* Administrators can change who can access an individual dashboard from the dashboard browser.

In sensitive environments, you can ensure that access for new dashboards is limited.
* If administrators change a security preference, each *new* dashboard is visible only to the creator and to Super Admin.
* The dashboard creator or Super Admin can then share new dashboards with groups or users.
* If an administrator changes the security preference back to allow Everyone access, then the dashboards that were created while the strict security preference was set continue to be governed by access control.

## Changing Dashboar Access from the Dashboard Browser

Users with Dashboard permission can change access to one or more dashboards.

To change access for one dashboard:
1. Select **Dashboards > All Dashboards**.
2. Select the dashboard and
  * Click **+Access+** to grant access more users and groups.
  * Click **-Access** to revoke access for users and groups.
**Warning:** If you remove the Everyone group and you don't add another group, only Super Admin can view the dashboard. You might have to ask Super Admin to [restore the orphan dashboard].

To change access for multiple dashboards:
1. From the top menu bar, click **Dashboards > All Dashboards**.
2. Select the check boxes for the dashboards you want to change. You can see the dashboard's current Access settings in the **Access** column.
3. Make the change:
   * Click **+Access** to add groups/users. Access is added for each selected dashboard.
   * Click **-Access** to remove groups/users. Only the groups or users that have access to all selected dashboards are visible in the Revoke Access dialog.
4. Click **Update**.

## Sharing Dashboards with Limited Access

If the Security system preference is set to **Grant Modify Access To: Creator**, then the creator and Super Admin can share the dashboard with other groups or individual users.

1. Click **Dashboards > All Dashboards** and navigate to the dashboard you want to modify.
2. Click the Share Dashboard icon.
![share dashboard icon](images/share_dashboard.png)
3. In the dialog, select **Users & Groups**, type the name(s) of groups or users to give access to, and click **Update**.
![share dashboard dialog](images/share_dashboard_dialog.png)

Privileged users can later remove groups or users to revoke access.

## Changing the Access Security Preference for New Dashboards

Initially, all users can view all dashboards and users with Dashboard permission can modify all dashboards. For more control, administrators can restrict access for new dashboards:

1. Click the gear icon and select **System Preferences**.
2. Click the **Security** tab and select **Grant Modify Access To: Creator**

After the change to the preference, access to new dashboards is initially limited to the dashboard creator and Super Admin users. Those two users can share the dashboard with other groups of users and individual users by giving View access or View & Modify access.

**Note:** A security preference change applies only to dashboards created after the change. If you change the setting to **Creator**, only new dashboards have restricted access. If you later change the setting to **Everyone**, all dashboards that were created while the setting was **Creator** keep the restricted access.


## Restoring Orphan Dashboards

An orphan dashboard results in these situations:
* The Everyone group was removed from a dashboard's access list and no other user or group are in the dashboard's access list.
* The dashboard creator did not share a dashboard and the dashboard creator user account is deleted.
The dashboard and all its charts and alerts still exist, potentially sending alerts and consuming resources, but no users except for Super Admin can view and modify or delete the dashboard.

To access an orphan dashboard:
1. Log in as Super Admin and select **Super Admin** from the gear icon.
2. Select the dashboard and delete it or share it with other users.
