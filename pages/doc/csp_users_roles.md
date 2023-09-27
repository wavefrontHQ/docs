---
title: Manage Roles and Groups in VMware Cloud Services
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: csp_users_roles.html
summary: Manage Operations for Applications permissions with roles.
---

{% include note.html content="Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. The content in this chapter is valid for VMware Cloud services subscriptions. For **original** subscriptions, see [Manage Roles, Groups, and Permissions](users_roles.html)."%}

VMware Cloud services supports roles to manage authorization in your services on the platform, including VMware Aria Operations for Applications.

From the VMware Cloud Services Console, users with the VMware Cloud **Organization Owner** or **Organization Administrator** role can:
* Create **groups** and add new and existing users to each group.
* Create **custom roles** and assign Operations for Applications permissions to each role.
* Assign one or more **service roles** and **custom roles** to each group. It's also possible to assign roles to individual users and server to server apps.

In addition to the roles model, Operations for Applications also supports [access control for individual objects](csp_access.html), for example, users with the **Super Admin** service role can limit access to a sensitive dashboard.

## Manage Roles

The roles model allows you to make sure nobody can perform tasks without the corresponding permission.

Assigning roles to groups of users is most efficient and least error prone. It's possible to assign a role to an individual account -- that might make sense during a POC.

VMware Cloud services includes built-in **service roles** for each service on the platform, including Operations for Applications service roles. Additionally, VMware Cloud services supports **custom roles**.

- A role can be assigned for a certain time period or without an expiration date.
- At least one Operations for Applications service role is required for a user to have access to the Operations for Applications service instance. Custom roles are optional.
- In a multi-tenant environment, a user can have different service roles for the different Operations for Applications service instances (tenants). Custom roles apply to **all** tenants for which the user has a service role.

The VMware Cloud Services Console **Roles** page lists all service roles and custom roles in your VMware Cloud organization. To navigate to this page:

1. Log in to the VMware Cloud Services Console as an **Organization Owner** or **Organization Administrator**.
1. If necessary, switch to the target organization. See [How do I access another one of my Organizations](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-432417CF-CE0C-48EB-BEBB-8C27751577D1.html).
1. In the left navigation pane, select **Identity & Access Management** > **Roles**.

### Operations for Applications Service Roles (Built-in)

The VMware Cloud Services Console **Roles** page includes the following built-in Operations for Applications service roles:
- A corresponding service role for each [permission](csp_permissions_overview.html#operations-for-applications-permissions) - **Alerts**, **Applications**, **Batch Query Priority**, **Charts Embedding**, **Dashboards**, **Derived Metrics**, **Direct Data Ingestion**, **Events**, **External Links**, **Ingestion Policies**, **Integrations**, **Logs**, **Metrics**, **Proxies**, and **Sources**.
- Two special service roles - one that grants full administrative access to the service, and another one that grants read-only access to the service:

  <table>
  <tr>
    <th width="30%">Special Service Role</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <th>Super Admin</th>
    <td>When users with that service role <a href="csp_users_account_managing.html#enable-or-disable-super-admin-mode">enable Super Admin mode</a>, they:<ul>
    <li>Have all Operations for Applications permissions.</li>
    <li>Have access to all dashboards and alerts.</li>
    <li>Can set the default preferences for all users of the service instance.</li>
    <li>Can restrict access for new dashboards and alerts.</li>
    <li>Can <a href="access.html#make-orphan-dashboards-or-alerts-visible">restore orphan dashboards and alerts</a>.</li>
    <li>Can <a href="metrics_managing.html#convert-metrics-to-ephemeral-or-persistent">convert metrics</a> from persistent to ephemeral and the reverse.</li>
    </ul>
    <p><strong>Tip:</strong> Combine the <strong>Super Admin</strong> service role with the roles that you want the user to have when Super Admin mode is disabled. </p></td>
  </tr>
  <tr>
    <th>Viewer</th>
    <td>Users with that service role:<ul>
    <li>Don't have any Operations for Applications permissions.</li>
    <li>Can perform only the <a href="csp_permissions_overview.html#default-tasks">default tasks</a>.</li>
    </ul></td>
  </tr>
  </table>

### Create, Edit, or Delete a Custom Role

Custom roles let you combine service permissions of your choice, for example, [Operations for Applications permissions](csp_permissions_overview.html#operations-for-applications-permissions). A custom role can have permissions for one or multiple services in your organization. For example, you can have a custom role that grants administrative permissions for one service and read-only permissions for another service.

{% include important.html content="The Operations for Applications permissions in a custom role apply to **all** Operations for Applications service instances to which the target user account or server to server app has access. Therefore, to obtain the Operations for Applications permissions from a custom role for a given Operations for Applications service instance, the user account or server to server app assigned with that custom role must have at least one Operations to Applications service role for that service instance, for example, the **Viewer** service role."%}

To create a custom role:

1. On the VMware Cloud Services Console **Roles** page, click **Add Role**.
1. On the **Add permissions** tab, in the left panel, expand **VMware Aria Operations for Applications**.
1. In the panel on the right, select the permissions that you want to assign to the role, and click **Continue**.
1. On the **Role information** tab, enter a meaningful role name and description, and click **Continue**.
1. On the **Review added permission** tab, verify your selections and click **Save**.

To edit a custom role:

1. On the VMware Cloud Services Console **Roles** page, click the name of the target custom role.
1. Edit the role name, description, or permissions, and click **Save**.

To delete a custom role:

1. On the VMware Cloud Services Console **Roles** page, select one or more custom roles and click **Remove Roles**.
1. Click **Remove** to confirm.

### Assign Default Roles for a Federated Domain

For a [federated domain](csp_authentication.html#federated-domain-authentication), users with the **Organization Owner** role can configure a policy with default VMware Cloud organization and service roles for all users in the federated domain. For details, see [How do I assign default roles in my Organization](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-2307F55C-FB5C-4EE0-A2DE-43011509A9A1.html) in the VMware Cloud services documentation.

## Manage User Groups

For efficient user management, you can create groups of users and assign roles to these groups. You can add new and existing users to a group. You can assign [service roles](#operations-for-applications-service-roles-built-in) and [custom roles](#create-edit-or-delete-a-custom-role) to a group.

See [How do I work with groups](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-0BD8A07B-C3C0-4220-8CD0-18FA070D3DAD.html) in the VMware Cloud services documentation.

## Grant or Revoke a User's Role Explicitly

To change the roles that are individually assigned to a user, see [How do I change user roles](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-A70DBFDC-86FD-4C84-8753-0E55C8C98F8E.html).