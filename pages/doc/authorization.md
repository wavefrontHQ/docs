---
title: Authorization in Wavefront
keywords: release notes
tags: [administration]
sidebar: doc_sidebar
permalink: authorization.html
summary: Learn about authorization of Wavefront groups and users.
---

Wavefront supports both role-based controls that use global permissions and object-based access control for individual dashboards and alerts.

Administrators can
* Create **[roles](users_roles.html)** with permissions and assign roles to users or groups.
* Protect individual dashboards or alerts and grant **[access](access.html)** only to selected groups or accounts.
* Protect metrics or groups of metrics using **[metrics security policy rules](metrics_security.html)**.

<!---Shavi suggesting adding a picture to illustrate accounts/groups/roles which is a great idea but hard to do...--->



## Role-Based Access Control with Global Permissions

Permissions always apply to all objects of a certain type. For example, a user with **Dashboards** permission can view and modify all dashboards.

A user with Accounts, Groups & Roles permission manages authorization:
1. Creates one or more **roles** and assigns one or more [permissions](permissions_overview.html) to each role.
2. Creates one or more **groups** and adds one or more users to each group.
3. Assigns one or more roles to each group.

### Example

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<strong>Users Get Permissions from Role</strong>
<br>
<p>In this picture, we have 3 roles and 3 groups of users. Each user gets the permissions from one role.</p></td>
<td width="50%">
<img src="/images/permissions_basics.png" alt="permissions basics"/></td>
</tr>
<tr>
<td width="50%">
<strong>One Group with Two Roles</strong>
<br>
<p>Management at the role and group level is less error prone, for example, it's easier to remove a role from a group than from 15 individual users.
<br>
<br>
In this example, we could assign the Demo role to the Admin Group. Or we could create a separate group only for users that need the set of permissions. In production environments, that's the only way to follow the principle of least privilege.</p></td>
<td width="50%">
<img src="/images/two_roles_one_group.png" alt="one group gets two roles"/></td>
</tr>
<tr>
<td width="50%">
<strong>Individual User Permissions</strong>
<br>
<p>Assigning roles or permissions to individual users is also supported.
<br>
<br>
For example, assume the marketing team asks Pat to give a demo, and Pat is assigned the Demo role and now has Dashboards permission.</p></td>
<td width="50%">
<img src="/images/permissions_user_level.png" alt="permissions user level"/></td>
</tr>
</tbody>
</table>

## Access Control for Dashboards and Charts

Our fine-grained **[access control](access.html)** allows administrators to protect sensitive information, for example, to restrict access to certain dashboards to the Finance team.

* **Access control on individual objects** -- While permissions are global and apply, for example, to all dashboards, access control allows you to restrict who can view or view and modify individual objects (initially dashboards and alerts).
* **Security setting for new objects** -- In high security environments, administrators can set a security setting so that all new dashboards and new alerts are accessible only to the creator and to Super Admin users.

## Metrics Security Policy Rules

Any Super Admin user or users with **Metrics** permission can view, create, and manage  [metrics security policy rules](metrics_security.html).

Data protected by a metrics security policy rule can become completely invisible to users.
* **Not visible in charts**. The chart either includes a warning that some metrics are protected, or, if all metrics are protected, the chart shows only the message.
* **Not visible in alerts** (if **Secure Metrics Details** is checked for the alert). The alert fires based on the complete set of metrics, and the complete set is shown in notification images by default. A check box allows administrators to [hide alert details](alerts_notifications.html#alert-notification-with-secured-metrics-details) so that confidential metrics are not shown.
* **Not visible in auto-complete** in Chart Builder, Query Editor, Metrics browser, etc.

## Authorization FAQs

Before you start, here are some FAQs:

### What are User Accounts & Service Accounts?

Wavefront supports two [account types](accounts.html):
* **User accounts** are for human users who work with Wavefront. A user account authenticates with a username and password.
* **Service accounts** are for services that interact with Wavefront through an API and use a **token** to authenticate. Service accounts:
  - Don't have **default permissions** (unless one or more roles with permissions are assigned to the **Everyone** group.).
  - Can't perform the **UI operations** that user accounts can perform by default.
  In the UI, service account names always start with **sa:**

### Who is the Super Admin User?

When your company signs up with Wavefront, we ask you which user(s) you want to designate as Super Admin. A Super Admin user:
* Has all permissions
* Has access to all dashboards and alerts
* Can [restore orphan dashboards and alerts](access.html#making-orphan-dashboards-visible)
* Can invite other Super Admin users.

Any existing Super Admin user can add other Super Admin users:

1. Click the gear icon and select **Super Admin**.
2. Enter the username of a user you want to add as Super Admin.

### Why Roles?

Roles allow you to combine a set of permissions. For example, create an **Intern** role to give limited permissions to interns. You can:
* Assign one or more roles to any group (preferred).
* Assign a role to an individual account.

### Why Groups?

Groups allow you to combine a set of users. You can then:
* Assign a role to the group.
* Give [view or modify access](access.html) for individual dashboards and alerts to the group.

Wavefront groups do *not* currently synchronize with groups in your identity provider (IDP) such as Active Directory or LDAP.


### What's the Everyone Group?

All accounts (user and service accounts) are members of the Everyone group.

Here's what you need to know:

* You cannot remove accounts from the Everyone group. All accounts, including Super Admin, are always in the Everyone group.
* You cannot delete the Everyone group.
* You can change the roles assigned to the Everyone group. By default, the group has associated roles, which means that human users can browse data but cannot modify anything. Service accounts cannot browse data.

  **Warning** If you assign a role to the Everyone group, you change the permissions for each account in your environment, including service accounts.
* If you use access control in your environment, you can share a dashboard or alert with the Everyone group to:
  - Give View & Modify access to accounts who have Dashboard (or Alert) permissions
  - Give View access to accounts who don't have Dashboard (or Alert) permissions
  You can remove the Everyone group from a dashboard or alert access list to limit access to that object.
