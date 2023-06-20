---
title: Authorization Model in Operations for Applications on VMware Cloud Services
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: csp_authorization.html
summary: Learn about authorization of groups, users, and sever to server apps to access VMware Aria Operations for Applications on VMware Cloud services.
---

{% include note.html content="Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. The content in this chapter is valid for VMware Cloud services subscriptions. For **original** subscriptions, see [Authorization Model](authorization.html)."%}

VMware Cloud services supports role-based access control for the services on its platform, including Operations for Applications. In addition, Operations for Applications supports object-based access control for individual dashboards and alerts as well as metrics security policy.

## Role-Based Access Control with Global Permissions

[Operations for Applications permissions](csp_permissions_overview.html) always apply to all objects of a certain type. For example, a user with the **Dashboards** permission can view and modify all dashboards.

Users with the VMware Cloud **Organization Owner** or **Organization Administrator** role manage authorization with [roles and groups](csp_users_roles.html). They can:
* Create **groups** and add users to each group.
* Create **custom roles** and assign one or more permissions to each role.
* Assign one or more **service roles** and **custom roles** to groups, individual users, and server-to-server apps.

## Access Control for Dashboards and Charts

Our fine-grained **[access control](csp_access.html)** allows users with the **Super Admin** service role to protect sensitive information, for example, to restrict access to certain dashboards to the Finance team.

* **Access control on individual objects** -- While permissions are global and apply, for example, to all dashboards, access control allows you to restrict who can view or view and modify individual objects (initially dashboards and alerts).
* **Security setting for new objects** -- In high security environments, users with the **Super Admin** service role can set a security setting so that all new dashboards and new alerts are accessible only to the creator and to the users with the **Super Admin** service role.

## Metrics Security Policy Rules

Users with the **Super Admin** or **Metrics** service role can view, create, and manage  [metrics security policy rules](csp_metrics_security.html).

Data protected by a metrics security policy rule can become completely invisible to users.
* **Not visible in charts**. The chart either includes a warning that some metrics are protected, or, if all metrics are protected, the chart shows only the message.
* **Not visible in alerts** (if **Secure Metrics Details** is checked for the alert). The alert fires based on the complete set of metrics, and the complete set is shown in notification images by default. A check box allows users with the **Super Admin** service role to [hide alert details](alerts_notifications.html#alert-notification-with-secured-metrics-details) so that confidential metrics are not shown.
* **Not visible in auto-complete** in Chart Builder, Query Editor, Metrics browser, etc.
