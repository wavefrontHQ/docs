---
title: Release Notes and Announcements
keywords:
tags:
sidebar: doc_sidebar
permalink: wavefront_release_notes.html
summary: Announcements and new and updated features in Tanzu Observability by Wavefront.
---

This page lists new and updated features for the Tanzu Observability by Wavefront service.

* For **Wavefront Proxy**, your go-to place is the [Wavefront proxy GitHub page](https://GitHub.com/wavefrontHQ/java/releases). On that page, you can see releases in progress and GA versions. If proxy changes are important for the service, we update this doc set, for example, with new configuration parameters, ports, etc.
* For the latest changes and releases of our **Integrations**, see the [Integrations Release Notes](integrations_new_changed.html).
* For **Observability for Kubernetes**, go to the [release notes for Wavefront Collector for Kubernetes GitHub repository](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/releases).

## 2022-30.x Release Notes

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<strong>Self-Service Upgrade From a Trial Version</strong>:<br/>
<p>Super Admin users can now upgrade from a trial version and purchase Tanzu Observability.<br/>
{% include note.html content="The self-service upgrade from a trial version currently supports only monthly billable commit contracts." %}
<ol>
<li>In the Tanzu Observability UI, click the <strong>Upgrade</strong> button on the banner showing the remaining number of days from your trial period.</li>
<li>Connect your VMware account and organization when redirected to the VMware Cloud Services Console.</li>
<li>Choose your preferred billing model and commit duration and finalize your order when redirected back to the Tanzu Observability UI.</li>
</ol>
</p>
See <a href="upgrade_and_purchase.html">Upgrade Your Trial Version and Purchase Tanzu Observability</a> for details.<br/>
</td>
<td width="50%">
<img src="/images/upgrade_trial.png" alt="The Upgrade button on the trial version banner.">
</td>
</tr>
<tr>
<td width="50%">
<strong>Self-Service Purchase of Additional Tanzu Observability Capacity</strong>
<p>
We extended the <b>Usage Portal</b> to <b>Usage and Subscriptions</b>, so Super Admin users can now add more capacity to their existing Tanzu Observability subscriptions.<br/>
{% include note.html content="The self-service purchase of additional capacity is currently available only to customers with monthly billable commit contracts who have connected their Wavefront instances to VMware Cloud Services organizations." %}
<ol>
<li>In the Tanzu Observability UI, click the gear icon and select <strong>Usage and Subscriptions</strong>.</li>
<li>On the <strong>Subscriptions</strong> tab, click <strong>Add more capacity</strong> for your active Tanzu Observability subscription.</li>
<li>Follow the wizard to increase your monthly commitment of PPS.</li>
</ol>
</p>
See <a href="purchase_additional_capacity.html">Purchase Additional Capacity</a> for details.
</td>
<td width="50%">
<img src="/images/add_more_capacity.png" alt="The Add more capacity button on the Subscriptions tab.">
</td>
</tr>
</tbody>
</table>


## 2022-29.x Release Notes

* **Tracing Improvements**: If your application or service names have special characters, the Wavefront service now replaces each special character with a hyphen ("-"). A character that isn't in the following list is considered a special character: a-z, A-Z, 0-9, hyphen ("-"), underscore ("_"), dot ("."), forward slash ("/") and comma (",").

* **Accessibility and Keyboard Navigation Improvements**: We made keyboard navigation improvements to the **Create Alert** page and the **Maintenance Window** page.

* **Query Stats and Suggestions for Alerts**: You can now examine statistics and explore suggestions for alert queries by clicking on the lightbulb icon. See [Use Statistics and Suggestions](query_language_performance.html#use-statistics-and-suggestions). 

![alert edit, lightbulb icon to right of query selected](images/alert_show_query_stats.png)

## 2022-26.x Release Notes

* **Accessibility and Keyboard Navigation Improvements**: We have made accessibility and keyboard navigation improvements. For example, you can now temporarily disable the chart legend, highlight the metrics in a chart, or apply the time window settings from one chart in a dashboard to all the charts in the dashboard. For information see [Keyboard Shortcuts and Their Usage](wavefront_keyboard_shortcuts.html#keyboard-shortcuts-and-their-usage).

## 2022-25.x Release Notes

This release includes:

* **Usage Portal Improvements**: We made the following improvements to the [ingestion policies](ingestion_policies.html) and [overall usage](examine_usage.html) monitoring:
  <table>
    <tbody>
      <tr>
        <td width="40%">
          <strong>New Ingestion Policy Alerts</strong>:<p>
          When you set an ingestion policy with a PPS limit, you must also configure an alert associated with that PPS limit.</p>
        </td>
        <td width="60%">
          <img src="/images/IP_alert.png" alt="The Conditions stepper in the Create Ingestion Policy wizard. ">
        </td>
      </tr>
      <tr>
        <td width="40%">
          <strong>Updated the Ingestion Policy Dashboard</strong>:<p>
          <ul>
          <li>The <strong>Usage Limit</strong> chart is now a progress bar.</li>
          <li>If you set a PPS limit, the dashboard also includes an <strong>Alerts</strong> section with details about the associated alert.</li>
          </ul></p>
        </td>
        <td width="60%">
          <img src="/images/IP_dashboard_RNs.png" alt="The ingestion policy dashboard. ">
        </td>
      </tr>
      <tr>
        <td width="40%">
          <strong>Updated the Ingestion Policies Page</strong>:<p>Added the following details to the ingestion policies table:
          <ol>
          <li>The <strong>State</strong> in terms of PPS limit - exceeded or not reached</li>
          <li>A <strong>Usage per Billing Month</strong> progress bar or usage number</li>
          <li>A <strong>Usage Trend</strong> line chart</li>
          <li>An <strong>Action</strong> in terms of alert association</li>
          </ol></p>
        </td>
        <td width="60%">
          <img src="/images/IP_list.png" alt="The ingestion policy table. ">
        </td>
      </tr>
      <tr>
        <td width="40%">
          <strong>Updated the Usage Summary Dashboard</strong>:<p>The <strong>Average Usage for the Last Quarter</strong> chart is also now a progress bar.
          </p>
        </td>
        <td width="60%">
          <img src="/images/average_usage_last_quarter.png" alt="The Overview section of the Usage Summary dashboard. ">
        </td>
      </tr>
    </tbody>
  </table>

* **Time Window Settings of Charts**: You can now specify the time window setting on a chart level. When you do this, even if you change the time window settings of the dashboard in which the chart is included, the time window settings of the chart will not be affected. For more information, see [Set the Time Window on a Chart](ui_charts.html#set-the-time-window-on-a-chart).

* **Override the No Data Message on Charts**: You can override the **No Data** message on charts when there is no data in the current time window and there's no error in your query. You can also select to display a link to the [Troubleshooting Missing Data](missing_data_troubleshooting.html) documentation page. For details, see [Override the No Data Message on a Chart](ui_charts.html#override-the-no-data-message-on-a-chart).

* **Integrations**: Another update of the integrations in June 2022. We made significant improvements to the Tanzu Application Service, vSphere, Consul, and Google Cloud Platform integrations. See the [Integration Release Notes](integrations_new_changed.html#june-2022) for details.

* **Documentation Improvements**: We have recently added new information and improved a list of docs, such as:
  * [Tanzu Observability FAQ](tobs_faq.html)
  * [Improve PPS and Prevent Overage](wavefront_usage_info.html)
  * [Tanzu Observability Pricing](wavefront_pricing.html)
  * [vSphere Integration Details](integrations_vsphere.html)

## 2022-24.x Release Notes

This release includes:

* **Accessibility Fixes**: We've made significant keyboard navigation improvements to many UI pages.
* **Tanzu Application Service to Tanzu Observability**: We released the Tanzu Application Service to Tanzu Observability integration on June 13.
  * [Monitor Tanzu Application Service with Tanzu Observability](integrations_tas_howto.html) explains the process end to end.
  * [Tanzu Observability and TAS Troubleshooting](tas_to_troubleshooting.html) has troubleshooting steps based on what we've learned during the Beta period.
* **Wavefront Proxy**: Proxy [version 11.3](https://github.com/wavefrontHQ/wavefront-proxy/releases/tag/proxy-11.3) is now available.

  {% include important.html content="Do not install Proxy version 11.2. If you already installed version 11.2, upgrade to version 11.3." %}

## 2022-22.x Release Notes

This release of the Wavefront service includes the following improvements:
* Accessibility improvements (keyboard access, color contrast, etc.) on integration pages.

In addition:
* **Integrations**: The June 2022 integrations release was made available! It includes significant improvements to the Snowflake and Jenkins integrations, and more. See the [Integration Release Notes](integrations_new_changed.html#june-2022) for details.
* **Videos**: We migrated [all videos](videos.html) to VMware TV and created playlists for easy access.

## Past Release Notes

- [2022-20.x Release Notes](2022-20.x_release_notes.html)
- [2022-06.x Release Notes](2022-06.x_release_notes.html)
- [2021-49.x Release Notes](2021.49.x_release_notes.html)
- [2021-35.x Release Notes](2021.35.x_release_notes.html)
- [2021-24.x Release Notes](2021.24.x_release_notes.html)
- [2021-19.x Release Notes](2021.19.x_release_notes.html)
- [2021-14.x Release Notes](2021.14.x_release_notes.html)
- [2021-08.x Release Notes](2021.08.x_release_notes.html)
- [2020-42.x Release Notes](2020.42.x_release_notes.html)
- [2020-38.x Release Notes](2020.38.x_release_notes.html)
- [2020-30.x Release Notes](2020.30.x_release_notes.html)
- [2020-26.x Release Notes](2020.26.x_release_notes.html)
- [2020-22.x Release Notes](2020.22.x_release_notes.html)
- [2020-14.x Release Notes](2020.14.x_release_notes.html)
