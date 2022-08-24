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

## 2022-33.x Release Notes

* The **Usage Limit** chart on the [ingestion policy dashboard](ingestion_policies.html#examine-ingestion-policy-usage) now shows the P95 usage by the policy out of the PPS limit.
* **Integrations**: The August 2022 integrations release was made available! We made significant improvements to a number of integrations and also added the VMware Tanzu Greenplum integration. See the [Integration Release Notes](integrations_new_changed.html#august-2022) for details.

New proxy release (11.4) is going to be GA this week. Check the [Proxy Releases Page](https://GitHub.com/wavefrontHQ/java/releases) to ensure the version is available. 
- Added the following internal metrics for proxy logs:
	- `~proxy.logs.*.received.messageLength`: Size of log message fields before validation
	- `~proxy.logs.*.received.tagLength`: Size of label per log message
	- `~proxy.logs.*.received.batches`: Number of incoming batches of logs
- For preprocessor rules `extractTag` and `extractTagIfNotExists`, applied rule to tag key values when source is pointLine.
- Improved accuracy of exponential delta histograms at the lowest percentiles.
- Completed fix to block points with EOT characters.
- Fixed an issue where the span log sampling policy was not synced with the Wavefront server.
- Updated the dependency versions.

## 2022-32.x Release Notes

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
<tr>
<td width="50%">
<strong>Time Window Picker Changes</strong>:<br/>

We have updated the time window picker for dashboards. You now can see two tabs on it:
<ul><li><strong>Preset Times</strong> - allows you to set the time window settings by selecting a time period from a list of preset times.</li>
<li><strong>Custom Times</strong> - allows you to set a custom time window by specifying a start date and time and an end date and time.</li>
</ul>
<p>See <a href="ui_examine_data.html#set-the-time-window">Set the Time Window</a> for details.</p>
</td>
<td><img src="/images/preset_time_window.png" alt="Preset time window settings.">
<br />
<br />
<img src="/images/custom_time_window.png" alt="Custom time window settings.">

</td>
</tr>
</tbody>
</table>


## Past Release Notes

- [2022-29.x Release Notes](2022-29.x_release_notes.html)
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
