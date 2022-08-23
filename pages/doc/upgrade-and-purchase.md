---
title: Upgrade Your Trial Version and Purchase Tanzu Observability
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: upgrade_and_purchase.html
summary: Learn how to upgrade from a trial version and purchase Tanzu Observability.
---

When you create a Tanzu Observability by Wavefront account and register for the trial version, your trial expires after a month. One of the options that we offer to Tanzu Observability Super Admin users, is to purchase Tanzu Observability by themselves. Another option is to contact the Tanzu Observability by Wavefront sales team so that they guide you through the purchase process. For large commitments and more PPS, we strongly recommend the latter option. 

{% include important.html content="The self-service upgrade from a trial version currently provides offers only for monthly billable commit contracts. If you're interested in burndown commit offers, contact the Tanzu Observability sales team. " %}

Billing depends on the amount of data, measured in points per second (PPS), that you send to Tanzu Observability  on a monthly basis. If you exceed the contracted rate for more than 5% of the hours of a given month, you will be charged for the usage above it (the overages). In any case, you do not lose any of your data.

{% include note.html content="To upgrade from a trial version, you must be a Super Admin user who is allowed to make purchases on behalf of your company. Also, you must either have a VMware Cloud services account (VMware account) or create one during the purchase process." %}

1. In the UI, on the banner showing you how many days have left from your trial period, click **Upgrade**.
2. Read the information on the Introduction screen carefully and click **Next**.
3. To connect with VMware Cloud services, click **Connect**. 

   You are redirected to the VMware Cloud Services Console page.
   
4. Log in to the VMware Cloud Services Console with your VMware account.
   
   If you don't have an existing VMware account, you must create one. 

5. Select an organization or create a new one.

   To create an organization:
   
   1. In the VMware Cloud Services Console, click **Create New Organization**.
   2. Enter an organization name.
   3. Enter the address for your organization or choose and existing one if you have already added an address for your account.
   4. Enter the payment details information.
   5. Review the Cloud Services Terms of Service and select the check box to agree. 

6. Click **Continue**.
   
   After you successfully connect to your VMware account and organization, you are redirected back to the Tanzu Observability purchase wizard.
   
7. Verify that you are connected to the correct organization and click **Next**. 

8. On the **Create Subscription** page, enter the number of PPS (in kilo points per second) to purchase and click **Next**. 
   
   You can also see a chart that shows the billable rate during your trial period. Use this chart as a starting point to decide how many PPS per month you want to buy.
  
9. Choose the billing terms and conditions, and click **Place Order**.

   You can choose to subscribe to Tanzu Observability for one, three or five years and pay in full, on a monthly (when you subscribe for one year) or on annually (when you subscribe for three or five years) basis. The purchase will be charged to the default payment method for your organization as set in the [VMware Cloud Services Console](https://console.cloud.vmware.com).
   
After you place your order, you will see a purchase confirmation page. Typically, it takes 24 hours to fulfil an order. Once your subscription becomes active, you'll receive an email notification.

In case of urgency, you can contact the Tanzu Observability team by sending an email to `tanzu_saas_ops@vmware.com` with your service ID and someone from our team will help you.
