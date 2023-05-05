---
title: Authorization Model
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: csp_authorization.html
summary: Learn about authorization of groups and users in VMware Aria Operations for Applications on VMware Cloud services.
---

VMware Cloud services supports role-based control that use Operations for Applications permissions. In addition, Operations for Applications supports object-based access control for individual dashboards and alerts.

Users with the **Organization Owner** and **Organization Administrator** roles can:

* Create user groups.
* Create custom roles.
* Assign service roles and custom roles to users and groups.

Users with **Super Admin** service role can:

* Protect individual dashboards or alerts and grant **[access](access.html)** only to selected groups or accounts.
* Protect metrics or groups of metrics by using [metrics security policy rules](metrics_security.html).


## Role-Based Access Control with Global Permissions

Permissions always apply to all objects of a certain type. For example, a user with **Dashboards** permission can view and modify all dashboards.

A user with **Organization Owner** or **Organization Administrator** role manages authorization by:
1. Creating one or more **custom roles** and assigning one or more [permissions](permissions_overview.html) to each role.
2. Creating one or more **groups** and adding one or more users to each group.
3. Assigning one or more service and custom roles to each group.

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
In this example, we can assign the Demo role to the Admin Group. Or we can create a separate group only for users that need the set of permissions. In production environments, that's the only way to follow the principle of least privilege.</p></td>
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
For example, assume the marketing team asks Pat to give a demo, and Pat is assigned the Demo role and now has <strong>Dashboards</strong> permission.</p></td>
<td width="50%">
<img src="/images/permissions_user_level.png" alt="permissions user level"/></td>
</tr>
</tbody>
</table>

## Access Control for Dashboards and Charts

Our fine-grained **[access control](access.html)** allows users with the **Super Admin** service role to protect sensitive information, for example, to restrict access to certain dashboards to the Finance team.

* **Access control on individual objects** -- While permissions are global and apply, for example, to all dashboards, access control allows you to restrict who can view or view and modify individual objects (initially dashboards and alerts).
* **Security setting for new objects** -- In high security environments, users with the **Super Admin** service role can set a security setting so that all new dashboards and new alerts are accessible only to the creator and to the Super Admin users.

## Metrics Security Policy Rules

Users with the **Super Admin** service role or the **Metrics** permission can view, create, and manage  [metrics security policy rules](metrics_security.html).

Data protected by a metrics security policy rule can become completely invisible to users.
* **Not visible in charts**. The chart either includes a warning that some metrics are protected, or, if all metrics are protected, the chart shows only the message.
* **Not visible in alerts** (if **Secure Metrics Details** is checked for the alert). The alert fires based on the complete set of metrics, and the complete set is shown in notification images by default. A check box allows users with the **Super Admin** service role to [hide alert details](alerts_notifications.html#alert-notification-with-secured-metrics-details) so that confidential metrics are not shown.
* **Not visible in auto-complete** in Chart Builder, Query Editor, Metrics browser, etc.
