---
title: Purchase Additional Capacity
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: purchase_additional_capacity.html
summary: Learn how to add capacity to your current Tanzu Observability by Wavefront subscription.
---

As a Super Admin, you can request more PPS to be added to the active Tanzu Observability subscription of your organization.

{% include note.html content="The self-service purchase of additional capacity is currently available only to customers with monthly billable commit contracts who have connected their Tanzu Observability instances to VMware Cloud Services organizations. If your Tanzu Observability instance is not connected to a VMware Cloud Services organization or if you have a burndown commit contract, contact the Tanzu Observability sales team for assistance." %}

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Usage and Subscriptions**.
3. Click the **Subscriptions** tab.

    You can see a detailed list of all active, inactive, and expired subscriptions of your organization.
4. In the last column for your active Wavefront subscription, click **Add more capacity**.
5. In the **Additional capacity** field, enter the number of kilo-points per second that you want to add to the current commitment.
6. Verify the resulting **New commitment** of PPS per month and **Current Level** pricing tier, and click **Next**.
7. Select the billing model and commit duration for the additional capacity, and click **Proceed to checkout**.

    The billing model and commit duration for the additional capacity are the same as for the original subscription. Billing model and commit duration cannot be changed.

After you purchase additional capacity, you will receive a confirmation email and your subscription will become updated within the next 24 hours.

In case of urgency, you can contact the Wavefront team by sending an email to: `tanzu_saas_ops@vmware.com` with the number of your order and someone from our team will help you.
