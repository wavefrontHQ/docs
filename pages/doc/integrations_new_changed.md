---
title: Integrations Release Notes and Announcements
keywords: integrations
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_new_changed.html
summary: New and changed integrations.
---
VMware Tanzu Observability (formerly known as VMware Aria Operations for Applications) continuously adds new integrations to the existing set, and improves available integrations. We update our [**complete list of all integrations**](https://docs.wavefront.com/label_integrations%20list.html) each time we add new integrations.


## Announcement

Starting July 3, 2023, Tanzu Observability is a service on the VMware Cloud services platform. After this date, we support two types of subscriptions: Tanzu Observability subscriptions **onboarded** to the [VMware Cloud services platform](https://console.cloud.vmware.com/) and **original** subscriptions. Original subscriptions are the existing ones and they remain as is until onboarded to VMware Cloud services. We are in the process of incrementally [onboarding](csp_migration.html) all original subscriptions to VMware Cloud services.

For details about the two subscription types and how they differ, see [Subscription Types](subscriptions-differences.html).

If your Tanzu Observability service **is onboarded** to VMware Cloud services, most of the integrations authenticate with VMware Cloud services **access tokens**. Only a limited list of integrations still authenticate with Tanzu Observability API tokens. For details, see [How Integration Authentication Works](integrations_onboarded_subscriptions.html).

{% include note.html content= "The integrations in the **Archived** section are approaching their end-of-life. For that reason, we will not update these integrations to authenticate with VMware Cloud services access tokens." %}

During the process of onboarding an original Tanzu Observability service to VMware Cloud services, all of the existing integrations are preserved and continue to operate using Tanzu Observability API tokens. You should incrementally switch to integration authentication with the more secure VMware Cloud services access tokens. See [What Happens with the Integrations?](csp_migration.html#what-happens-with-the-integrations).

{% include note.html content= "Currently, if your service **is onboarded** to VMware Cloud services, direct ingestion by using the Wavefront Output Plugin for Telegraf is not supported. For best performance, use a Wavefront proxy. " %}

## January 2024

We improved the following integration in January 2024:

* Amazon Web Services - You can now disable the ingestion of support service limit metrics (also known as service quotas), that is, the metrics with the namespace `aws.limits.*`. To do so, when you register or edit your AWS Metrics+ integration, deselect the **Service Limit Metrics** check box.


## All 2019 - 2023 Integrations Release Notes

We have separate pages for:

* [New and Changed Integrations in 2023](integrations_new_changed_2023.html)
* [New and Changed Integrations in 2022](integrations_new_changed_2022.html)
* [New and Changed Integrations in 2021](integrations_new_changed_2021.html)
* [New and Changed Integrations in 2019-2020](integrations_new_changed_2020.html)
