---
title: Purchase Additional Capacity
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: purchase_additional_capacity.html
summary: Learn how to add capacity to your current Tanzu Observability by Wavefront subscription.
---

As a Super Admin, you can request more PPS capacity to be added to the active Tanzu Observability subscription of your organization.

{% include note.html content="Currently, you can buy additional capacity only if you have a monthly billable commit contract and your Wavefront instance is connected to a VMware Cloud Services organization. If your Wavefront instance is not connected to a VMware Cloud Services organization, or if you have a burndown commit contract, contact the Tanzu Observability sales team to add more capacity to your subscription." %}

1. Log in to your Wavefront instance as a Super Admin user and [enable Super Admin mode](users_account_managing.html#enable-or-disable-super-admin-mode).
2. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Usage and Subscriptions**.
3. Click the **Subscriptions** tab.

    You can see a detailed list of all active, inactive, and expired subscriptions of your organization.
4. In the last column for your active Wavefront subscription, click **Add more capacity**.
5. In the **Additional capacity** field, enter the number of kilo-points per second that you want to add to the current commitment.
6. Verify the resulting **New commitment** of PPS per month and **Current Level** pricing tier, and click **Next**.
7. Select the billing model and commit duration for the additional capacity, and click **Proceed to checkout**.

    The billing model and commit duration for the additional capacity are the same as for the original subscription. Billing model and commit duration cannot be changed.

After checking out, you will see an order confirmation message. Typically, it takes 24 hours to fulfil an order. Once your additional capacity becomes available, you'll receive an email notification. 

In case of urgency, you can contact the Tanzu Observability team by sending an email to `tanzu_saas_ops@vmware.com` with your contact details and someone from our team will help you.
