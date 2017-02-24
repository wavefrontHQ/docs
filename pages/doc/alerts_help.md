---
title: Alerts
keywords: alerts
sidebar: doc_sidebar
toc: false
permalink: alerts_help.html
---
## Alerts

 Alerts focus operations on a system component that could potentially cause service degradation or outage. Alerts are triggered when a monitored metric reaches a value that indicates a problem in the system component.

## Creating Alerts

An alert is defined as a condition and set of targets to be notified when the [condition evaluates to true or false for a specified period of time](https://community.wavefront.com/docs/DOC-1052). You express conditions using [ts() queries](https://community.wavefront.com/docs/DOC-1019) and operators.

You can send alerts to targets such as email, pager services such as [PagerDuty](https://community.wavefront.com/docs/DOC-1056) and [VictorOps](https://community.wavefront.com/docs/DOC-1251), communication channels such as [Slack](https://community.wavefront.com/docs/DOC-1183) and [HipChat](https://community.wavefront.com/docs/DOC-1055), and you can also configure arbitrary actions such as invoking a [webhook](https://community.wavefront.com/docs/DOC-1054) or running an auto-remediation script.

{% include links.html %}
