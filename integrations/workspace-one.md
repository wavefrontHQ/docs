---
title: VMware Workspace ONE Access Integration
tags: [integrations list]
permalink: workspace-one.html
summary: Learn about the Wavefront VMware Workspace ONE Access Integration.
---
## VMware Workspace ONE Access

VMware Workspace ONE Access delivers multifactor authentication (MFA), conditional access and single sign-on (SSO). By acting as a broker to other identity stores and providers, Workspace ONE Access enables organizations to deliver secure and consistent enterprise-wide access to applications and data.

After you've completed the Wavefront integration for Workspace ONE Access setup, all users in your enterprise that can authenticate to Workspace ONE Access can also log in to your Wavefront instance. What those users can do depends on their permission. All users are in the Everyone group and have, at a minimum, view permissions for dashboards and alerts. Additional permissions depend on the Permissions setup in your Wavefront instance. See [Roles, Groups, and Permissions](https://docs.wavefront.com/users_roles.html).

## VMware Workspace ONE Access Setup

### Prerequisites

If you do not want to use the default VMware Workspace ONE Access default access policy, create an access policy in VMware Workspace One Access (Identity & Access Management console).
 
### Step 1. Adding a Web Application to Workspace ONE Catalog

The Workspace ONE catalog is a repository of resources. After you add an application to the catalog, users can access the application based on the settings you establish for the application.

1. Log in to Workspace ONE with user account having `Super Admin` role.
1. In the **Administration console**, select the **Catalog > Web Apps** tab.
2. Click **New**. The **SaaS Application** wizard appears.
3. On the Definition page, create a new application by providing values for following settings:
     - **Name** - `Wavefront`
     - **Description** - `<your_description>`.
     - **Icon** - Right-click and save the Wavefront logo: 
   {% include image.md src="images/wavefront_logo.png" width="25" %}
       Browse to the logo file and upload.
     - Click **Next**.
4. On the Configuration page, enter the application configuration details: 
     - **Single Sign-On** - Select **SAML 2.0** from the list.
     - **Configuration** - Select **Manual**
     - **Single Sign-On URL** - https://YOUR_CLUSTER.wavefront.com:443/api/saml/login/
     - **Recipient URL** - https://YOUR_CLUSTER.wavefront.com:443/api/saml/login/
     - **Application ID** - Unique identifier for the application. 
     - **Username Format** - Select **Email Address** from the list.
     - **Username Value** - ${user.email}
     - Click **Next**
5. To control user authentication and access to Wavefront select a policy from the list of available **Access Policies** and click **Next**.
6. Review the configuration details and click on **Save & Assign**.
7. In the **Assign** wizard, search for the users or user groups and assign them to the application.
8. Select **Deployment Type** as **User-Activated** and click on **Save**.


### Step 2. Download Identity Provider Metadata from Workspace ONE

1. In the Workspace ONE console, select the **Catalog > Web apps > Settings**.
2. Download metadata from **SaaS Apps > SAML metadata > Identity Provider metadata**.


### Step 3. Upload Identity Provider Metadata into Wavefront

**Wavefront version 2020.30 and earlier**

1. Send the downloaded metadata from Step 2 to support@wavefront.com with a request to set up the Workspace ONE integration for Wavefront. We'll activate the integration on our end and will notify you as soon as we've done this.


**Wavefront version 2020.34 and later**

1. Log in to Wavefront with a user account for which `SAML IDP Admin` permission is enabled.
2. Click on the gear icon on top right corner and navigate to **Self Service SAML**.
3. Select **Identity Provider** as **Workspace ONE** from the list.
4. Copy the downloaded metadata from Step 2 into the **Configure Connection** text box.
5. Click **Test** to test the validity of metadata. A new browser window opens with Workspace ONE login page.

   **Note:** The **Save** button is disabled until you've completed a test successfully.

6. Log in to Workspace ONE. After the login is successful, click **Save**.

Going forward, users who attempt to log in to Wavefront are redirected to Workspace ONE. If a user can authenticate to Workspace ONE but is not currently a Wavefront user, that user is auto-created on the Wavefront side. Password authentication is no longer supported.


