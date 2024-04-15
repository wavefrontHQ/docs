---
title: Invite New Users from the VMware Cloud Services Console
keywords:
tags: [tutorials]
sidebar: doc_sidebar
permalink: csp_new_users_tutorial.html
summary: Learn how to invite new users to VMware Tanzu Observability (formerly known as VMware Aria Operations for Applications) through the VMware Cloud Services Console.
---

Starting July 3, 2023, Tanzu Observability is a service on the VMware Cloud services platform. After this date, we support two types of subscriptions: 
* Tanzu Observability subscriptions **onboarded** to the VMware Cloud services platform.
* **Original** subscriptions -- the existing ones which remain as is until they migrate to VMware Cloud services. 

In this tutorial, you’ll learn how to invite new users to Tanzu Observability through the VMware Cloud Services Console.

## Requirements

When your service **is onboarded** to VMware Cloud services, all new users are invited through the VMware Cloud Services Console. 

To invite users, you must have the VMware Cloud **Organization Owner** or **Organization Administrator** role. You can invite users to your organization and grant them access to the services associated with it - in this case, this is Tanzu Observability. You can also track the invitations you send. Invitations are valid for up to seven days. If you have sent an invitation in error, you can revoke it.


## Roles to Assign

To invite new users, you assign them:

* A role within the VMware Cloud organization, such as **Organization Administrator**, **Organization Owner**, or **Organization Member**. See [What organization roles are available in VMware Cloud services](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-C11D3AAC-267C-4F16-A0E3-3EDF286EBE53.html) in the VMware Cloud services documentation.
    
  Note that you can assign the **Organization Owner** role to another user only if you have the **Organization Owner** role.

* A role within the Tanzu Observability service instance. We provide a number of [Tanzu Observability service roles](csp_users_roles.html#tanzu-observability-service-roles-built-in).

   Note that in a multi-tenant Tanzu Observability environment, you must specify the service instance (tenant) for which you want to assign the service role. You can assign different service roles for different service instances (tenants). You invite the users only to the tenants for which you assigned them service roles.

* Optionally, a custom role created in the VMware Cloud organization. [Custom roles](csp_users_roles.html#create-edit-or-delete-a-custom-role) are composed of different service permissions.

   Note that a custom role with a Tanzu Observability permission applies only if the user has at least one Tanzu Observability service role. In a multi-tenant Tanzu Observability environment, custom roles apply to all service instances (tenants) for which the user has at least one Tanzu Observability service role.


## Verify That You Have the Required Organization Role

### Step 1: Log in to the VMware Cloud Services Console

1. Open a Web browser window and go to [https://console.cloud.vmware.com/](https://console.cloud.vmware.com/).
1. Enter your account email and click **Next**.
2. Type your password then click **Sign In**.

### Step 2: Navigate to Your Organization

VMware Cloud uses organizations to provide controlled access to one or more services. As an enterprise using multiple cloud services, Organizations provide an easy way to map your business groups and processes to different organizations. If you belong to more organizations, you must navigate to the organization to which Tanzu Observability is onboarded. 

1. Click your username and click **Change Organization**.
2. Select the name of the organization to which Tanzu Observability is **onboarded**. 

### Step 3: Find Your Roles Within the Organization

1. Click your username and click **My Account**.
2. On the **My Roles** tab you can see what organization roles are assigned to you.

If you do not have the VMware Cloud **Organization Owner** or **Organization Administrator** role assigned, you need to request them. To understand who the VMware Cloud **Organization Owner** or **Organization Administrator** users are, you can chat with our Technical Support team or file a VMware Cloud services support request. See [How do I get support](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E4DC731F-C039-4FB2-949E-9A61584CD5BF.html) in the VMware Cloud services product documentation.


## Example 1: Invite a New User and Assign Service Roles

We provide a number of built-in Tanzu Observability service roles.

- A corresponding service role for each [permission](csp_permissions_overview.html#tanzu-observability-permissions).
- Two special service roles - one that grants full administrative access to the service, and another one that grants read-only access to the service.

For more information, see [Tanzu Observability Roles (Built-in)](csp_users_roles.html#tanzu-observability-service-roles-built-in).

### Step 1: Enter the New User Details

1. Click **Identity & Access Management** in the navigation on the left and click **Active Users**.
2. Click the **Add Users** button on top of the table.
3. In the **Users** text box, enter the email addresses of the users that you want to invite.
   
   The email addresses or account names of the users must be delimited by comma, space, or a new line.

### Step 2: Assign Roles and Invite the User

In a multi-tenant environment, you assign service roles on a tenant basis. You can assign different service roles for different Tanzu Observability instances (tenants). Let’s first assign the mandatory organization role and then assign different service roles for two Tanzu Observability instances.

1. Under **Assign Organization Roles**, select a mandatory organization role to assign.

   The **Organization Member** role is selected by default and is the minimum mandatory role to assign. 
   
   You can also assign an additional role, for example, **Support User**. This means that the user will have read-only access to the VMware Cloud organization resources and will be able to submit and manage support tickets. For information about the VMware Cloud organization roles, see [What Organization roles are available in VMware Cloud Services](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-C11D3AAC-267C-4F16-A0E3-3EDF286EBE53.html).

   ![A screenshot with the Organization Member role, selected by default and the Support user additional role selected.](images/csp-mandatory-roles.png)

2. Assign Tanzu Observability service roles for the first Tanzu Observability instance (tenant) to which you want to invite the new user.
   1. Under **Assign Service Roles**, click **Add a Service**.
   1. From the first drop-down menu, select **VMware Tanzu Observability**.
      ![A screenshot with the Tanzu Observability service selected.](images/csp-select-service.png)
   1. From the **in** drop-down menu, select the target service instance (tenant).
      ![A screenshot with the Tanzu Observability service instance selected.](images/csp-select-aoa-service.png)

      {% include note.html content="This drop-down menu is available only for multi-tenant environments. If you want to grant access to all tenants, you must assign service roles for each tenant individually (see the next Step 3). If you miss selecting the target service instance, the users receive the `401 Unauthorized: User has no access to service` error message when trying to access that tenant."%}

   1. From the **with roles** drop-down menu, select the service roles to assign for the selected service instance (tenant).

      Let's say that the user you're inviting will:
   
      * Set up external integrations
      * Install and uninstall integration dashboards and alerts
      * Create, manage, and delete dashboards and charts and manage dashboard tags
      * Create, edit, and delete alerts, alert targets, and maintenance windows. Also, will manage alert tags and view alert history.

      For this purpose, select the following service roles: **Proxies**, **Integrations**, **Dashboards**, and **Alerts**.

      ![A screenshot with the Tanzu Observability roles selected.](images/csp-assign-service-roles.png)
   1. Leave the never expires access field as is.

3. Assign another Tanzu Observability service role for the second Tanzu Observability instance (tenant) to which you want to invite the new user.
   
   1. Click **+ Add an Instance**.
   1. From the **in** drop-down menu, select the target service instance (tenant).
      ![A screenshot with the Tanzu Observabilitys service instance selected.](images/csp-select-another-service.png)

   1. From the **with roles** drop-down menu, select the **Super Admin** service role, so that you grant full administrative privileges for the selected service instance.

      ![A screenshot with the Tanzu Observability roles selected.](images/csp-assign-superadmin-service-role.png)
   1. Leave the never expires access field as is.
4. Leave the **Send emails to all invited users notifying them of this role assignment** selected and click **Add**.

The invitations you send are valid for seven days. You can view the status of the invitation by expanding **Identity & Access Management** and then clicking **Pending Invitations**.

## Example 2: Invite a New User and Assign a Custom Role

If you have created custom roles and want to assign custom roles to a user, you must make sure that you assign:

* A mandatory organization role
* At least one service role, for example **Viewer**
* The custom roles of interest

Custom roles work only in combination with service roles. In a multi-tenant environment, the Tanzu Observability permissions in a custom role apply to all service instances (tenants) for which the user has at least one Tanzu Observability service role.

### Step 1: Enter the New User Details

1. Click **Identity & Access Management** in the navigation on the left and click **Active Users**.
2. Click the **Add Users** button on top of the table.
3. In the **Users** text box, enter the email addresses of the users that you want to invite.
   
   The email addresses or account names of the users must be delimited by comma, space, or a new line.

### Step 2: Assign the Roles and Invite the User

Let's assign **Organization Administrator** as a mandatory organization role, then assign the **Viewer** service role for one tenant and the **Ingestion Policies** service role for another tenant. After that, we assign the custom role and it applies to the two tenants for which the user has service roles.

1. Under **Assign Organization Roles**, select the **Organization Administrator** role.

   ![A screenshot with the Organization Administrator role selected.](images/csp-assign-org-admin.png)

2. Assign the **Viewer** service role for the first Tanzu Observability service instance (tenant) to which you want to invite the new user.
   1. Under **Assign Service Roles**, click **Add a Service**.
   1. From the first drop-down menu, select **VMware Tanzu Observability**.
      ![A screenshot with the Tanzu Observability service selected.](images/csp-select-service.png)
   1. From the **in** drop-down menu, select the target service instance (tenant) and leave the **Viewer** service role selected.
      ![A screenshot with the Tanzu Observability service instance  and the Viewer role selected.](images/csp-select-aoa-service-viewer.png)
   1. Leave the never expires access field as is.
3. Assign the **Ingestion Policies** service role for the second Tanzu Observability service instance (tenant) to which you want to invite the new user.
   1. Click **+Add an Instance**.
   1. From the **in** drop-down menu, select the target service instance (tenant).
   1. From the **with roles** drop-down menu, select the **Ingestion Policies** service role to assign it to the user for the selected tenant.
      ![A screenshot with the Tanzu Observability service instance and the Viewer and the Ingestion Policies service roles selected.](images/csp-assign-two-service-roles.png)
   1. Leave the never expires access field as is.

3. Assign the custom role for the already selected Tanzu Observability service instances (tenants).

   1. Click **+ Add Custom Roles Access**.
   1. In the **Add custom role access** popup window, search for, select the custom role that you want to assign, and click **Add**.   
   1. Leave the never expires access field as is.
   
   The custom role will be assigned to the user for the two tenants that we have already specified as shown in the screenshot below.

   ![A screenshot with the added custom role](images/csp-add-custom-role.png)

4. Leave the **Send emails to all invited users notifying them of this role assignment** selected and click **Add**.


The invitations you send are valid for seven days. You can view the status of the invitation by expanding **Identity & Access Management** and then clicking **Pending Invitations**.
