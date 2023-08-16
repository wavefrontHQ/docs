---
title: How to Invite New Users Tutorial
keywords:
tags: [tutorials]
sidebar: doc_sidebar
permalink: csp_new_users_tutorial.html
summary: Learn how to invite new users to VMware Aria Operations for Applications through the VMware Cloud Services Console.
---

Starting July 3, 2023, Operations for Applications is a service on the VMware Cloud services platform. After this date, we support two types of subscriptions: 
* Operations for Applications subscriptions **onboarded** to the VMware Cloud services platform.
* **Original** subscriptions -- the existing ones which remain as is until they migrate to VMware Cloud services. 

In this tutorial, you’ll learn how to invite new users to Operations for Applications through the VMware Cloud Services Console.

## Required Permissions

When your service **is onboarded** to VMware Cloud services, all new users are invited through the VMware Cloud Services Console. 

To invite users, you must have the VMware Cloud **Organization Owner** or **Organization Administrator** role. You can invite users to your organization and grant them access to the services associated with it - in this case, this is Operations for Applications. You can also track the invitations you send. Invitations are valid for up to seven days. If you have sent an invitation in error, you can revoke it.


## Roles to Assign

When you invite new users, you must assign them:

* A role within the VMware Cloud organization, such as **Organization Administrator**, **Organization Owner**, or **Organization Member**. 
    
  Note than only if you have the **Organization Owner** role, you can assign the **Organization Owner** role to another user.

* A role within the Operations for Applications service. 

Optionally, you can also assign a custom role created in the VMware Cloud organization. Custom roles are composed of different service permissions.

## Invite a New User and Assign Service Roles

### Step 1: Log in to the VMware Cloud Services Console

1. Open a Web browser window and go to [https://console.cloud.vmware.com/](https://console.cloud.vmware.com/).
1. Enter your account email and click **Next**.
2. Type your password then click **Sign In**.

### Step 2: Navigate to Your Organization

VMware Cloud uses organizations to provide controlled access to one or more services. As an enterprise using multiple cloud services, Organizations provide an easy way to map your business groups and processes to different organizations. If you belong to more organizations, you must navigate to the organization to which Operations for Applications is onboarded. 

1. Click your username and click **Change Organization**.
2. Select the name of the organization to which Operations for Applications is **onboarded**. 

### Step 3: Enter the New User Details

1. Click **Identity & Access Management** in the navigation on the left and click **Active Users**.
2. Click the **Add Users** button on top of the table.
3. In the **Users** text box, enter the email addresses of the users that you want to invite.
   
   The email addresses or account names of the users must be delimited by comma, space, or a new line.

### Step 4: Assign Roles and Invite the User

In a multi-tenant environment, you can assign different service roles for each Operations for Applications instance. Let's first assign the mandatory organization role and then we will assign different service roles for two Operations for Applications instances. 

1. Select a mandatory organization role to assign.

   The **Organization Member** role is selected by default and is the minimum mandatory role to assign. 
   
   You can also assign an additional role. For example, **Support User**. This means that the user will have read-only access to the VMware Cloud organization resources and will be able to submit and manage support tickets. For information about the VMware Cloud organization roles, see [What Organization roles are available in VMware Cloud Services](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-C11D3AAC-267C-4F16-A0E3-3EDF286EBE53.html).

   ![A screenshot with the Organization Member role, selected by default and the Support user additional role selected.](images/csp-mandatory-roles.png)

2. Assign Operations for Applications service roles for the first Operations for Applications instance.
   1. Click **Add a service**.
   1. From the drop-down menu, select **VMware Aria Operations for Applications**.
      ![A screenshot with the Operations for Applications service selected.](images/csp-select-service.png)
   1. From the **in** drop-down menu, select the service instance to which you want to invite the new user.
      ![A screenshot with the Operations for Applications service instance selected.](images/csp-select-aoa-service.png)
   1. Assign the service roles to the user.

      Let's say that the user you're inviting will:
   
      * Set up external integrations
      * Install and uninstall integration dashboards and alerts
      * Create, manage, and delete dashboards and charts and manage dashboard tags
      * Create, edit, and delete alerts, alert targets, and maintenance windows. Also, will manage alert tags and view alert history.

      For this purpose, select the following service roles: **Proxies**, **Integrations**, **Dashboards**, and **Alerts**.

      ![A screenshot with the Operations for Applications roles selected.](images/csp-assign-service-roles.png)
   1. Leave the never expires access field as is.

3. Assign the **Super Admin** service role for another Operations for Applications instance.
   
   1. Click **+ Add an instance**.
   1. From the **in** drop-down menu, select the other service instance to which you want to invite the new user.
      ![A screenshot with the Operations for Applications service instance selected.](images/csp-select-another-service.png)
   1. Assign the **Super Admin** service role to the user.

      ![A screenshot with the Operations for Applications roles selected.](images/csp-assign-superadmin-service-role.png)
   1. Leave the never expires access field as is.
4. Leave the **Send emails to all invited users notifying them of this role assignment** selected and click **Add**.

The invitations you send are valid for seven days. You can view the status of the invitation by expanding **Identity & Access Management** and then clicking **Pending Invitations**.

{% include note.html content="If you have created custom roles and want to assign only custom roles to the user for a particular Operations to Applications service instance, you must make sure that you also assign at least one Operations to Applications service role for the instance. For example, the **Viewer** service role." %}
