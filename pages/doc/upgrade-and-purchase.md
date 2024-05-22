---
title: Upgrade Your Trial Version and Purchase the Service 
keywords: administration
tags: [administration]
permalink: upgrade_and_purchase.html
summary: Learn how to upgrade from a trial version and purchase the service.
search: exclude
---

When you register for the trial version of VMware Aria Operations for Applications, your trial expires after 30 days. One of the options that we offer is to purchase the service by using our self-service workflow. Another option is to contact the Operations for Applications sales team, so that they guide you through the purchase process. For large commitments and more PPS, we strongly recommend the latter option.

{% include note.html content="Starting September 20, 2023, all [**new trial**](start_trial.html) instances of Operations for Applications are **onboarded** to VMware Cloud services. Trial service instances before this date are considered **original**. The upgrade procedure is slightly different for a [trial service instance on VMware Cloud services](upgrade_and_purchase.html#upgrade-a-trial-service-instance-on-vmware-cloud-services) and for an [original trial service instance](upgrade_and_purchase.html#upgrade-an-original-trial-service-instance)." %}

After the upgrade, you will be able to sign up for a free trial of our logs feature. See [Get Started with Logs](logging_overview.html).

## Commit Contracts

Operations for Applications commit contracts are two types:

* Billable -- You pay for certain amount of ingested points per second (PPS) per billing period. If there's an overage, you will be charged for the number of PPS above your committed rate.
* Burndown -- You pay for certain amount of ingested PPS for the contract period. We extract your P95 PPS usage for each billing period from your burndown commitment and calculate your remaining balance till the end of the contract period.

## Supported Upgrades

{% include important.html content="The self-service upgrade from a trial version currently provides offers only for billable commit contracts. If you're interested in burndown commit offers, contact the Operations for Applications sales team. " %}

Billing depends on the amount of data, measured in points per second (PPS), that you send to Operations for Applications per [billing period](glossary.html#b). If you exceed the contracted rate for more than 5% of the hours of a given billing period, you will be charged for the usage above it (the overage). In any case, you do not lose any of your data.

## Upgrade a Trial Service Instance on VMware Cloud Services

{% include note.html content="To upgrade from a trial version, you must hold the [**Organization Owner** role](csp_getting_started.html#whats-a-vmware-cloud-organization-role) in the VMware Cloud organization running the service as well as at least one [Operations for Applications service role](csp_users_roles.html#operations-for-applications-service-roles-built-in) for the service instance. If your enterprise domain is federated, to access the organization billing account, you must have a VMware account linked to your corporate account." %}

1. Log in to your service instance.
1. On the banner showing you how many days have left from your trial period, click **Upgrade**.
1. On the **Introduction** page, read the information carefully and click **Next**.
1. Complete or, optionally, view your organization profile. Note that the purchase will be charged to the default payment method for your organization as set in the VMware Cloud Services Console.

   * If you are purchasing a VMware Cloud services subscription for the first time with this organization, you must provide the billing address, currency, and default payment method. To do that, click **Complete Organization Profile**.
   
      You are redirected to the VMware Cloud Services Console to complete your organization profile. See [Getting started with VMware Cloud Services billing and subscriptions](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-F772AF05-AA85-40A0-B9B5-D98C7D83D713.html) in the VMware Cloud services documentation.
   
      After you complete your organization profile in the VMware Cloud Service Console, you are redirected back to the purchase wizard in Operations for Applications.
   * If your VMware Cloud organization already has a billing account, optionally, review the billing details by clicking **View Organization Profile**, which opens the VMware Cloud Services Console in a new tab.
   
      To proceed with the purchase, in Operations for Applications, click **Next**. 

1. On the **Create Subscription** page, enter the number of PPS (in kilo points per second) to purchase and click **Next**. 
   
   You can also see a chart that shows the billable rate during your trial period. Use this chart as a starting point to decide how many PPS per [billing period](glossary.html#b) you want to buy.
  
1. Choose the billing terms and conditions, and click **Place Order**.

   You can choose to subscribe to Operations for Applications for one, three, or five years and pay in full, on a monthly basis (when you subscribe for one year), or on an annual basis (when you subscribe for three or five years).
   
After you place your order, you will see a purchase confirmation page. Typically, it takes 24 hours to fulfil an order. Once your subscription becomes active, you'll receive an email notification.

In case of urgency, you can contact the Operations for Applications team by sending an email to `tanzu_saas_ops@vmware.com` with your service ID and someone from our team will help you.

## Upgrade an Original Trial Service Instance

{% include note.html content="To upgrade from a trial version, you must be a **Super Admin** user." %}

1. Log in to your service instance and [enable Super Admin mode](users_account_managing.html#enable-or-disable-super-admin-mode).
1. On the banner showing you how many days have left from your trial period, click **Upgrade**.
2. Read the information on the Introduction screen carefully and click **Next**.
3. To connect with VMware Cloud services, click **Connect**. 

   You are redirected to the VMware Cloud Services Console.
   
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
   
   After you successfully connect to your VMware account and organization, you are redirected back to the Operations for Applications purchase wizard.
   
7. Verify that you are connected to the correct organization and click **Next**. 

8. On the **Create Subscription** page, enter the number of PPS (in kilo points per second) to purchase and click **Next**. 
   
   You can also see a chart that shows the billable rate during your trial period. Use this chart as a starting point to decide how many PPS per [billing period](glossary.html#b) you want to buy.
  
9. Choose the billing terms and conditions, and click **Place Order**.

   You can choose to subscribe to Operations for Applications for one, three, or five years and pay in full, on a monthly basis (when you subscribe for one year), or on an annual basis (when you subscribe for three or five years). The purchase will be charged to the default payment method for your organization as set in the [VMware Cloud Services Console](https://console.cloud.vmware.com).
   
After you place your order, you will see a purchase confirmation page. Typically, it takes 24 hours to fulfil an order. Once your subscription becomes active, you'll receive an email notification.

<!-- In case of urgency, you can contact the Operations for Applications team by sending an email to `tanzu_saas_ops@vmware.com` with your service ID and someone from our team will help you. -->
