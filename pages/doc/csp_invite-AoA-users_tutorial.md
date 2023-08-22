---
title: Invite New Users from the VMware Cloud Services Console
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

## Requirements

When your service **is onboarded** to VMware Cloud services, all new users are invited through the VMware Cloud Services Console. 

To invite users, you must have the VMware Cloud **Organization Owner** or **Organization Administrator** role. You can invite users to your organization and grant them access to the services associated with it - in this case, this is Operations for Applications. You can also track the invitations you send. Invitations are valid for up to seven days. If you have sent an invitation in error, you can revoke it.


## Roles to Assign

When you invite new users, you must assign them:

* A role within the VMware Cloud organization, such as **Organization Administrator**, **Organization Owner**, or **Organization Member**. 
    
  Note that you can assign the **Organization Owner** role to another user only if you have the **Organization Owner** role.

* A role within the Operations for Applications service instance. 

Optionally, you can also assign a custom role created in the VMware Cloud organization. Custom roles are composed of different service permissions.

## Verify That You Have the Required Organization Role

### Step 1: Log in to the VMware Cloud Services Console

1. Open a Web browser window and go to [https://console.cloud.vmware.com/](https://console.cloud.vmware.com/).
1. Enter your account email and click **Next**.
2. Type your password then click **Sign In**.

### Step 2: Navigate to Your Organization

VMware Cloud uses organizations to provide controlled access to one or more services. As an enterprise using multiple cloud services, Organizations provide an easy way to map your business groups and processes to different organizations. If you belong to more organizations, you must navigate to the organization to which Operations for Applications is onboarded. 

1. Click your username and click **Change Organization**.
2. Select the name of the organization to which Operations for Applications is **onboarded**. 

### Step 3: Find Your Roles Within the Organization

1. Click your username and click **My Account**.
2. On the **My Roles** tab you can see what organization roles are assigned to you.

If do not have the VMware Cloud **Organization Owner** or **Organization Administrator** role assigned, you need to request them. To understand who the VMware Cloud **Organization Owner** or **Organization Administrator** users are, you can chat with VMware Support or file a VMware Cloud services support request. See [How do I get support](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E4DC731F-C039-4FB2-949E-9A61584CD5BF.html) in the VMware Cloud services product documentation.

## Invite a New User and Assign Service Roles Only

We provide a number of built-in Operations for Applications service roles.

- A corresponding service role for each [permission](csp_permissions_overview.html#operations-for-applications-permissions).
- Two special service roles - one that grants full administrative access to the service, and another one that grants read-only access to the service.

For more information, see [Operations for Applications Service Roles (Built-in)](csp_users_roles.html#operations-for-applications-service-roles-built-in).

### Step 1: Enter the New User Details

1. Click **Identity & Access Management** in the navigation on the left and click **Active Users**.
2. Click the **Add Users** button on top of the table.
3. In the **Users** text box, enter the email addresses of the users that you want to invite.
   
   The email addresses or account names of the users must be delimited by comma, space, or a new line.

### Step 2: Assign Roles and Invite the User

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

## Invite a New User and Assign a Custom Role

If you have created custom roles and want to assign only custom roles to a user, you must make sure that you assign:

* A mandatory organization role
* At least one service role, for example **Viewer**
* The custom roles of interest

Custom roles work only in combination with service roles. The Operations for Applications permissions in a custom role apply to all service instances (tenants) for which the user has at least one Operations for Applications service role. 

### Step 1: Enter the New User Details

1. Click **Identity & Access Management** in the navigation on the left and click **Active Users**.
2. Click the **Add Users** button on top of the table.
3. In the **Users** text box, enter the email addresses of the users that you want to invite.
   
   The email addresses or account names of the users must be delimited by comma, space, or a new line.

### Step 2: Assign the Roles and Invite the User

Let's assign the **Organization Administrator** mandatory service role, then assign the **Viewer** service role for a couple of tenants, and after that assign the custom role. In a multi-tenant environment, the service and custom roles apply to a selected tenant (Operations for Applications instance).

1. Under mandatory roles, select the **Organization Administrator** role.

   ![A screenshot with the Organization Administrator role selected.](images/csp-assign-org-admin.png)

2. Assign the **Viewer** service role for a specific Operations for Applications service instance.
   1. Click **Add a service**.
   1. From the drop-down menu, select **VMware Aria Operations for Applications**.
      ![A screenshot with the Operations for Applications service selected.](images/csp-select-service.png)
   1. From the **in** drop-down menu, select the service instance to which you want to invite the new user and leave the **Viewer** service role selected so that you assign it to the user.
      ![A screenshot with the Operations for Applications service instance  and the Viewer role selected.](images/csp-select-aoa-service-viewer.png)
   1. Leave the never expires access field as is.
3. Assign the **Viewer** and the **Ingestion Policies** service roles for another Operations for Applications service instance.
   1. Click **+Add an instance**.
   1. From the **in** drop-down menu, select the other service instance to which you want to invite the new user.
   1. Select the **Viewer** and the **Ingestion Policies** service roles to assign them to the user.
      ![A screenshot with the Operations for Applications service instance and the Viewer and the Ingestion Policies service roles selected.](images/csp-assign-two-service-roles.png)
   1. Leave the never expires access field as is.

3. Assign the custom role to the user.

   The custom role is assigned for the already selected Operations for Applications service instances.

   1. Click **+ Add Custom Roles Access**.
   1. In the **Add custom role access** popup window, search for, select the custom role that you want to assign, and click **Add**.   
   1. Leave the never expires access field as is.
   
   The custom role will be assigned to the user for the two tenants that we have already specified as shown in the screenshot below.

   ![A screenshot with the added custom role](images/csp-add-custom-role.png)

4. Leave the **Send emails to all invited users notifying them of this role assignment** selected and click **Add**.


The invitations you send are valid for seven days. You can view the status of the invitation by expanding **Identity & Access Management** and then clicking **Pending Invitations**.
