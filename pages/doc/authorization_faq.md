---
title: Authorization FAQ
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: authorization-faq.html
summary: Before you start managing users, groups, roles, and access, here are some FAQs.
---

### What Are User & Service Accounts?

Tanzu Observability by Wavefront supports two account types:
* [**User accounts**](user-accounts.html) are for human users who work with Wavefront. A user account authenticates with a user name and password.
* [**Service accounts**](service-accounts.html) are for services that interact with Wavefront through an API and use a **token** to authenticate. Service accounts are used to automate management tasks. As a user with the **Accounts** permission, you generate (and revoke, if needed) authentication tokens for the service account. It’s also possible to deactivate a service account completely. 
 Service accounts:
  - Don't have **default permissions** (unless one or more roles with permissions are assigned to the **Service Accounts** group.).
  - Can't perform the **UI operations** that user accounts can perform by default.
  In the UI, service account names always start with **sa:**.

### Who Is the Super Admin User?

When your company signs up with Tanzu Observability, we ask you which users you want to designate as Super Admin users. A Super Admin user:
* Has all permissions.
* Has access to all dashboards and alerts.
* Can [restore orphan dashboards and alerts](access.html#making-orphan-dashboards-visible).
* Can invite other Super Admin users.
* Can create [ingestion policies](ingestion_policies.html) and [examine the overall Wavefront usage](examine_usage.html).

As a Super Admin user, you can add other Super Admin users:

1. Click the gear icon <i class="fa fa-cog"/> on the taskbar, and select **Super Admin**.
2. Enter the user name of a user you want to add as a Super Admin.


### Why Roles?

Roles allow you to combine a set of permissions. For example, create an **Intern** role to give limited permissions to interns. You can:
* Assign one or more roles to any group (preferred).
* Assign a role to an individual account.

### Why Groups?

Groups allow you to combine a set of users. You can then:
* Assign a role to the group.
* Give [view or modify access](access.html) for individual dashboards and alerts to the group.

Our groups do *not* currently synchronize with groups in your identity provider (IdP) such as Active Directory or LDAP.


### What's the Everyone Group?

All user accounts are members of the **Everyone** group. By default, no service account is added to this group. All service accounts are added to the **Service Accounts** group.

Here's what you need to know:

* You cannot remove accounts from the **Everyone** group. All user accounts, including Super Admin, are always in the **Everyone** group.
* You cannot delete the **Everyone** group.
* You can change the roles assigned to the **Everyone** group. By default, the group has associated roles, which means that human users can browse data but cannot modify anything. 

  **Warning** If you assign a role to the **Everyone** group, you change the permissions for each user account in your environment.
* If you use access control in your environment, you can share a dashboard or alert with the **Everyone** group to:
  - Give View & Modify access to accounts who have **Dashboards** or **Alerts** permissions.
  - Give View access to accounts who don't have **Dashboards** or **Alerts** permissions.
  You can remove the **Everyone** group from a dashboard or alert access list to limit access to that object.
  
  
### What's the Service Accounts Group?

With the 2021-42.x release, all service accounts are moved out of the **Everyone** group to the **Service Accounts** group. This separation is necessary so that you have different groups for the different types of accounts in your system. 

The **Service Accounts** group has associated roles and by default service accounts cannot browse data. If you assign a role to the **Service Accounts** group, you change the permissions for each service account in your environment.




  
