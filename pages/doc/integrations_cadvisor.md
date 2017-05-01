---
title: Docker Integration (cAdvisor)
keywords: integrations
tags: [integrations]
layout: readme
source: integrations/cadvisor
sidebar: doc_sidebar
permalink: integrations_cadvisor.html
summary: Learn how to use cAdvisor to send container metrics to Wavefront.
---


## cAdvisor Metrics and Dashboard
Once cAdvisor is running, metrics prefixed with **cadvisor.** appear in Wavefront:

![cadvisor metrics](images/cadvisor_metrics.png)

You can either create charts from the Metrics browser or deploy this dashboard. 

![cadvisor dashboard](images/cadvisor_dashboard.png)

A dropdown at the top allows you to filter on any Docker host that is collecting with cAdvisor. The dashboard filters out spurious processes with the source filter:

```
source="${chost}" and not container="/user/*" and not container="/" and not container="/docker" and not container="/user" and not container="/init.*"
```


