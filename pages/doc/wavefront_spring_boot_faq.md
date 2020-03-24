---
title: Wavefront Spring Boot Starter FAQs
keywords:
tags: 
sidebar: doc_sidebar
permalink: wavefront_spring_boot_faq.html
summary: Get answers to questions that you come across when using the Wavefront Spring Boot Starter.
---


* **What is the difference between the free Spring Boot cluster and a Wavefront trial?**

  The free cluster supports limited data ingestion throughput with a 5-day retention and no SLA guarantees. It allows Spring Boot developers to try out Wavefront without having to sign-up or provide an email address.

  The [Wavefront trial](https://www.wavefront.com/sign-up/) allows you to experience the full power of the Wavefront platform by bringing in data from your cloud environments (AWS/GCP/Azure/vSphere), Kubernetes, over 200 integrations, and large-scale service fleets into a single observability platform. We ask that you tell us more about yourself when signing up for a trial.

* **What is the retention and Service Level Agreement (SLA) on the free cluster?**

  While this is subject to changes at any time, we currently retain 5 days of data and offer no SLA on the free Wavefront cluster. Production Wavefront clusters currently offer 18 months of full-resolution (no downsampling) data retention for metrics, 6 months for histograms, and 30 days for spans. We also have a 99.95% uptime guarantee, as well as High Availability (HA) and Disaster Recovery (DR) options.

  Reach out to us on our public [Slack channel](https://www.wavefront.com/join-public-slack) for more information.

* **Why do I not see a link to access the Wavefront service on start-up?**

  * You do not see a single-use login link if you are using a Wavefront cluster that does not support automatic account provisioning, which currently only applies to our free cluster. Therefore, make sure you log in to your cluster via the login page or SSO.
  * You do not have a valid token. Check that the .wavefront_token file in your home directory has a valid token or delete it to automatically provision a new account on the free cluster. Note that you will lose access to your existing account if you do not have a backup to the token file.
  * If you see the following, data is sent to the Wavefront service even if the login link is not shown.

    ```text
    w.s.WavefrontSpringBootAutoConfiguration : Activating Wavefront Spring Micrometer Reporting...
    w.s.WavefrontSpringBootAutoConfiguration : Activating Wavefront OpenTracing Tracer...
    ```

* **How do I make sure I send data to the same account all the time (across multiple machines and deployments)?**

  * If you are just trying out Wavefront, see [Manage Service Accounts](https://docs.wavefront.com/service_accounts.html) to create a service account that has a static token for reporting. Once you have the token, add it to the wavefront.properties file (`token=<your_token>`).
  * If you are using Wavefront in a larger deployment, sign-up for a Wavefront trial at www.wavefront.com and see [Manage Service Accounts](https://docs.wavefront.com/service_accounts.html) to learn how to create a service account. Next, add the token and URL (`url=longboard.wavefront.com`) to the wavefront.properties file. We are more than happy to help you with sizing and designing large-scale collection architectures for metrics, histograms, and traces
 
* **How do I setup an email/password login to the account?**

  When you sign-in to your account via the single-use link, click the gear icon on the top-right and select User Management. Next, you can invite yourself by email (a password setup link is sent to your email address, and you can use it to set up a password).

* **How do I get help?**

  We have a public [Slack channel](https://www.wavefront.com/join-public-slack) as well as in-product help, documentation, and chat.
