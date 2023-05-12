---
title: Manage Roles and Groups in VMware Cloud Services
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: csp_users_roles.html
summary: Manage Operations for Applications permissions with roles.
---

VMware Cloud services supports roles to manage authorization in your services on the platform, including VMware Aria Operations for Applications.

From the VMware Cloud Services Console, users with the VMware Cloud **Organization Owner** or **Organization Administrator** role can:
1. Create one or more **groups** and add one or more users to each group.
1. Create one or more **custom roles** and assign one or more permissions to each role.
3. Assign one or more **service roles** and **custom roles** to each group. It's also possible to assign roles to individual users and server-to-server apps.

In addition to the roles model, Operations for Applications also supports [access control for individual objects](csp_access.html), for example, users with the **Super Admin** service role can limit access to a sensitive dashboard.

## Manage Roles

The roles model allows you to make sure nobody can perform tasks without the corresponding permission.

Assigning roles to groups of users is most efficient and least error prone. It's possible to assign a role to an individual account -- that might make sense during a POC.

VMware Cloud services includes **built-in service roles** for each service on the platform, including Operations for Applications service roles. Additionally, VMware Cloud services supports **custom roles**.

- A role can be assigned for a certain time period or without an expiration date.
- In a multi-tenant environment, a user can have different service roles for the different Operations for Applications service instances (tenants). Custom roles apply to **all** tenants.

The VMware Cloud Services Console **Roles** page lists all service roles and custom roles in your VMware Cloud organization. To navigate to this page:

1. Log in to the VMware Cloud Services Console as an **Organization Owner** or **Organization Administrator**.
1. If necessary, switch to the target organization. See [How do I access another one of my Organizations](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-432417CF-CE0C-48EB-BEBB-8C27751577D1.html).
1. In the left navigation pane, select **Identity & Access Management** > **Roles**.

### Operations for Applications Service Roles (Built-in)

The VMware Cloud Services Console **Roles** page includes the following built-in Operations for Applications service roles:
- A corresponding service role for each [permission](csp_permissions_overview.html#operations-for-applications-permissions).
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
    <li>Can upgrade from trial version and purchase Operations for Applications.</li>
    <li>Can purchase more PPS.</li>
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

To create a custom role:

1. On the VMware Cloud Services Console **Roles** page, click **Add Role**.
1. On the **Add permissions** tab, in the left panel, expand the service.
1. In the panel on the right, select the permissions that you want to assign to the role, and click **Continue**.
1. On the **Role information** tab, enter a meaningful role name and description, and click **Continue**.
1. On the **Review added permission** tab, verify your selections and click **Save**.

To edit a custom role:

1. On the VMware Cloud Services Console **Roles** page, click the name of the target custom role.
1. Edit the role name, description, or permissions, and click **Save**.

To delete a custom role:

1. On the VMware Cloud Services Console **Roles** page, select one or more custom roles and click **Remove Roles**.
1. Click **Remove** to confirm.

## Manage User Groups

For efficient user management, you can create groups of users and assign roles to these groups. You can assign [service roles](#operations-for-applications-service-roles-built-in) and [custom roles](#create-edit-or-delete-a-custom-role) to groups.

See [How do I work with groups](hhttps://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-0BD8A07B-C3C0-4220-8CD0-18FA070D3DAD.html) in the VMware Cloud services documentation.

## Grant or Revoke a User's Role Explicitly

To change the roles that are individually assigned to a user, see [How do I change user roles](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-A70DBFDC-86FD-4C84-8753-0E55C8C98F8E.html).