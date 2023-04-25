---
title: Getting Started with Operations for Applications on VMware Cloud Services
tags: [administration]
sidebar: doc_sidebar
permalink: csp_getting_started.html
summary: Learn the basics and onboard Tanzu Observability to VMware Cloud services.
---
Starting June, 2023, VMware Aria Operations for Applications is a service in the VMware Cloud services catalog.

If your Operations for Applications service is onboarded to VMware Cloud services, VMware Cloud services provides features to your Operations for Applications environment, such as:
- Single sign-on (SSO) with VMware accounts.
- Identity access management (IAM) with service permissions and roles.
- SAML 2.0 SSO identity federation with your enterprise identity provider.
- Seamless integration with other services from your VMware Cloud services portfolio, such as VMWare Aria Operations for Logs and VMware Arial Operations Buisiness Insights.

{% include note.html content="All new Operations for Applications service instances from June, 2023 onwards are onboarded to VMware Cloud services. We are in the process of incrementally onboarding the existing Operations for Applications instances to VMware Cloud services."%}

## What Is the VMware Cloud Services Console?

The VMware [Cloud Services Console](https://console.cloud.vmware.com) lets you manage your entire VMware Cloud services portfolio across hybrid and native public clouds. Operations for Applications is one of the many services that you can access, configure, and consume through this console. See [Using VMware Cloud Services Console](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-20D62AFF-024B-4901-976D-69BFD71BECC8.html) for more details.

## What Is a VMware Cloud Organization?

VMware Cloud services uses organizations to provide controlled access to one or more services. The VMware Cloud organization is a top-level construct which owns one or more cloud services (subscriptions). You can have multiple VMware Cloud organizations.
Each organization can have multiple Operations for Applications service instances (tenants). See [How do I manage my Cloud Services organizations](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-CF9E9318-B811-48CF-8499-9419997DC1F8.html) for more details.

{% include note.html content="You can create a VMware Cloud organization only when you are onboarding a new service instance, for example, when you are [starting an Operations for Applications Free Trial](start_trial.html)."%}

## What Is a VMware Cloud Services Account?

A VMware Cloud services account is a user (human) account in VMware Cloud services with which you can access all of your service instances, including Operations for Applications. A VMware Cloud services account logs in to VMware Cloud services with an email address and password. A VMware Cloud services account can be one of the following:
- A VMware account (VMware ID) that you create in the VMware Cloud Services Console.

    You can create a VMware account independently, while onboarding a service instance, or while signing up to a service instance with an invitation link.
- Your corporate account if your enterprise domain is federated. You might still need to create a VMware account and link it to your corporate account if you need to access billing information in the organization.

    See [What is enterprise federation and how does it work](https://docs.vmware.com/en/VMware-Cloud-services/services/setting-up-enterprise-federation-cloud-services/GUID-76FAECB3-CFAA-461E-B9C9-2A49C39CD17F.html)


## What Is a VMware Cloud Organization Role?

Each VMware account can belong to one or more VMware Cloud organizations. A VMware account belongs to a given VMware Cloud organization if the account has an organization role for that organization. The organization roles are:
- The **Organization Owner** role has full administrative access to all resources in the organization. They can invite users to the organization and assign role-based access to all users, including themselves.

    When you create an organization during a service onboarding process, you become its first **Organization Owner**.
- The **Organization Administrator** role has as limited administrative access. Users with that role can invite and manage only users with the **Organization Member** role. Can have additional access with additional roles.
- The **Organization Member** role has read-only access to the resources in the organization. Can have additional access with additional roles.

See [What organization roles are available in VMware Cloud Services](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-C11D3AAC-267C-4F16-A0E3-3EDF286EBE53.html) for details.


## What Is an Operations for Applications Service Role?

To grant a user access to an Operations for Applications service instance (tenant), an **Organization Owner** must assign an Operations for Applications service role to that user.
- The built-in Operations for Applications service roles are not editable.
- A service role can be assigned for a certain time period or without an expiration date.
- The Operations for Applications service roles grant certain [permissions](permissions_overview.html) in Operations for Applications.

    <table>
      <tr>
        <th width="20%">Tanzu Observability Service Role</th>
        <th width="20%">Granted Permissions</th>
        <th width="20%">Denied Permissions</th>
        <th width="40%">Description</th>
      </tr>
      <tr>
        <th>Super Admin</th>
        <td><i>All</i></td>
        <td><i>None</i></td>
        <td><ul>
        <li>Has all permissions.</li>
        <li>Can perform Super Admin tasks.</li>
        <li>If combined, takes precedence without overriding the other service roles.</li>
        <li>Not mapped to a role in Tanzu Observability.</li>
        </ul></td>
      </tr>
      <tr>
        <th>Accounts Administrator</th>
        <td><b>Accounts</b></td>
        <td><i>None</i></td>
        <td><ul>
        <li>Can manage user and service accounts, groups, roles, and API tokens.</li>
        <li>All other permissions are allowed.</li>
        <li>Mapped to the <b>Accounts Administrator (built-in)</b> role in Tanzu Observability.</li>
        </ul></td>
      </tr>
      <tr>
        <th>User</th>
        <td><ul>
        <li><b>Dashboards</b></li>
        <li><b>Events</b></li>
        <li><b>Alerts</b></li>
        </ul></td>
        <td><b>Accounts</b></td>
        <td><ul>
        <li>Can manage dashboards, events, alerts, maintenance windows, and alert targets.</li>
        <li>Cannot get the permission for managing accounts, groups, roles, and API tokens.</li>
        <li>Mapped to the <b>User (built-in)</b> role in Tanzu Observability.</li>
        </ul></td>
      </tr>
      <tr>
        <th>Viewer</th>
        <td><i>None</i></td>
        <td><ul>
        <li><b>Accounts</b></li>
        <li><b>Applications</b></li>
        <li><b>Alerts</b></li>
        <li><b>Dashboards</b></li>
        <li><b>Events</b></li>
        <li><b>Metrics</b></li>
        <li><b>Derived Metrics</b></li>
        <li><b>Proxies</b></li>
        <li><b>Chart Embedding</b></li>
        <li><b>SAML IDP Admin</b></li>
        </ul></td>
        <td><ul>
        <li>Has a read-only access.</li>
        <li>Cannot get permissions for managing account and objects.</li>
        <li>Mapped to the <b>Viewer (built-in)</b> role in Tanzu Observability.</li>
        </ul></td>
      </tr>
      <tr>
        <th>Controlled in Tanzu Observability</th>
        <td><i>None</i></td>
        <td><i>None</i></td>
        <td><ul>
        <li>Initially, has read-only access.</li>
        <li>All permissions are allowed.</li>
        <li>If combined, overrides the <b>Accounts Administrator</b>, <b>User</b>, and <b>Viewer</b> service roles.</li>
        <li>Not mapped to a role in Tanzu Observability.</li>
        </ul></td>
      </tr>
    </table>
- The Tanzu Observability service roles can be combined for the same user and for the same Tanzu Observability service instance.

    <table>
      <tbody>
        <tr>
          <td width="40%">
          <p>The <b>Super Admin</b> service role always takes precedence.</p>
          <p>For example, if a user has the <b>Super Admin</b> and <b>User</b> service roles, that user gets onboarded to the Tanzu Observability service instance as a Super Admin user - all permissions are granted and cannot be revoked. The <b>User (built-in)</b> role is visible in Tanzu Observability.</p>
          </td>
          <td width="60%">
          <img src="images/csp_roles_super_admin_and_user.png" alt="A combination of Super Admin and User service roles."/>
          </td>
        </tr>
        <tr>
        <td width="40%">
        <p>Denied permissions by one service role can be granted by another service role.</p>
        <p>For example, if a user has the <b>Accounts Administrator</b> and <b>User</b> service roles, that user gets onboarded to the Tanzu Observability service instance with permissions to manage user and service accounts as well as dashboards, events, alerts, maintenance windows, and alert targets. The user has the <b>Accounts Administrator (built-in)</b> and <b>User (built-in)</b> roles in Tanzu Observability.</p>
        </td>
        <td width="60%">
        <img src="images/csp_roles_admin_and_user.png" alt="A combination of Accounts Administrator and User service roles."/>
        </td>
      </tr>
      <tr>
      <td width="40%">
      <p>The <b>Controlled in Tanzu Observability</b> service role overrides the <b>Accounts Administrator</b>, <b>User</b>, and <b>Viewer</b> service roles.</p>
      <p>For example, if a user has the <b>User</b> and <b>Controlled in Tanzu Observability</b> service roles, that user gets onboarded to the Tanzu Observability service instance without any permissions and any roles, and all permissions are allowed.</p>
      </td>
      <td width="60%">
      <img src="images/csp_roles_user_and_to.png" alt="A combination of Accounts Administrator and Controlled in Tanzu Observability service roles."/>
      </td>
    </tr>
      </tbody>
    </table>
- For multi-tenant access, a given user can have different Operations for Applications service roles for the different Operations for Applications service instances (tenants).

## What Is a Custom Roles?

Custom roles lets you group permissions for one or multiple services in your conganization. For example, you can have a custom role that grants administrative permissions for one service instance and read-only permissions for another service instance.