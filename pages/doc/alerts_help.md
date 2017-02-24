---
title: Alerts
keywords: alerts
sidebar: doc_sidebar
toc: false
permalink: alerts_help.html
---
## Alerts

An alert is a condition and set of actions that are performed when the condition evaluates to true or false for a specified period of time and the alert changes [state](https://community.wavefront.com/docs/DOC-1052).

## Creating Alerts

You express a condition using [ts() queries](https://community.wavefront.com/docs/DOC-1019) and operators. You configure an alert to send notifications to targets when the alert changes state.

## Adding Notification Targets

You can send notifications to targets such as email, pager services such as [PagerDuty](https://community.wavefront.com/docs/DOC-1056) and [VictorOps](https://community.wavefront.com/docs/DOC-1251), communication channels such as [Slack](https://community.wavefront.com/docs/DOC-1183) and [HipChat](https://community.wavefront.com/docs/DOC-1055) and you can also configure arbitrary actions such as invoking a [webhook]() and running an auto-remediation script.

{% include links.html %}
