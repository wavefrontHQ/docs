---
title: Purchase Additional Capacity
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: purchase_additional_capacity.html
summary: Learn how to add capacity to your current VMware Aria Operations for Applications subscription.
---

{% include note.html content="Starting June 26, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. For information about VMware Cloud services subscriptions and original subscriptions and the differences between them, see [Subscription Types](subscriptions-differences.html).<br/>
- For VMware Cloud services subscriptions, users with the VMware Cloud **Organization Owner** role can request more PPS capacity to be added to your active Operations for Applications subscription.<br/>
- For original Operations for Applications subscriptions, **Super Admin** users with Super Admin mode enabled can request more PPS capacity to be added to your active Operations for Applications subscription. "%}

## Supported Contracts

{% include note.html content="Currently, you can buy additional capacity only if you have a billable commit contract and your Operations for Applications service is connected to a VMware Cloud Services organization. If your Operations for Applications service is not connected to a VMware Cloud Services organization, or if you have a burndown commit contract, contact the Operations for Applications sales team to add more capacity to your subscription." %}

## How to Purchase Additional Capacity

1. Log in to your service instance.
1. If you are a Super Admin user in an original Operations for Applications subscription, [enable Super Admin mode](users_account_managing.html#enable-or-disable-super-admin-mode).
1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Usage and Subscriptions**.
1. Click the **Subscriptions** tab.

    You can see a detailed list of all active, inactive, and expired subscriptions of your organization.
1. In the last column for your active subscription, click **Add more capacity**.
1. In the **Additional capacity** field, enter the number of PPS (in kilo points per second) that you want to add to the current billable commitment.
1. Verify the resulting **New commitment** of PPS per [billing period](glossary.html#b) and the **Current Level** pricing tier, and click **Next**.
1. Select the billing model and commit duration for the additional capacity, and click **Proceed to checkout**.

    The billing model and commit duration for the additional capacity are the same as for the original subscription. Billing model and commit duration cannot be changed.

After checking out, you will see an order confirmation message. Typically, it takes 24 hours to fulfil an order. Once your additional capacity becomes available, you'll receive an email notification. 

In case of urgency, you can contact the Operations for Applications team by sending an email to `tanzu_saas_ops@vmware.com` with your contact details and someone from our team will help you.
