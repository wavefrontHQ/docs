---
title: Three Simple Tips for Increasing Alert Robustness
keywords: alerts
tags: [alerts]
sidebar: doc_sidebar
permalink: alerts_robustness_increasing.html
summary: Learn how to manage alerts.
---
Monitoring a production environment is a challenging task and having the right alert strategy in place prevents alert fatigue within the monitoring team and ensures that teams are responding and taking corrective actions before an alert event escalates into full blown outages. Having said that, each environment is different and the data we monitor has different shape and distribution which we need to account for in our monitoring strategy. To get an understanding of how to do alerting in Wavefront, take a look at the following documentation. Based on our experience monitoring large SaaS infrastructures here are some tips below which can help you in getting started.
 
## Account for Delayed Data Points
 
Network delays or slow processing of application metric data at the backend can have a negative impact on alert processing, which can lead to false triggers. An alerting mechanism that is too sensitive to delayed metric data can falsely trigger an alert. As the delayed metric data points are processed, the backfill data will arrive, and the alerts will resolve. The "backfill data" concept means adding missing past data to make a chart complete with no voids and to keep all formulas working. Adjusting the alerting query to account for delayed metric data points will prevent false positives. Use the lag function to avoid this situation:
 
`lag(30m, sum(ts("aws.elb.requestcount"))) < 0.3 * lag(1w, sum(ts("aws.elb.requestcount")))`
 
The above example analyzes a single value reported 30 minutes ago of the `aws.elb.requestcount` metric. It then compares it with the value measured one week ago and determines if the request count had dropped below 30%. With this alert query, we have not only insured that delayed metric data points do not falsely trigger the alert as we are looking at a value reported 30-minutes ago   which allows delayed data points to catch up but also look at the overall trend of the data.
 
As an alternative approach, it’s possible to set the **Alert fires** threshold higher than the default two minutes. This setting depends on the frequency of the arrival of data points, and it accounts for all possible delays in the application metrics delivery pipeline. This compensates for external delays of metrics to the Wavefront Collector service.
 
## Account for Missing Data Points
 
The best approach we've found is by using the `mcount()` function to count the number of reported points per time series in the last X minutes. A general query could be something like:
 
`mcount(5m, ts(my.metric)) = 0`
 
There are a few things you can tweak based on each use case:
- The time interval associated with `mcount()` should be unique to your set of data. If data is expected to be reported once a minute, then `mcount(30s)` would not be a good approach. You may also want to avoid false positives, so in that case `mcount(1m)` may not be a great idea either since it could be affected by a slight delay. However, `mcount(5m)` would probably be decent because it requires 5 minutes of "NO DATA" to trigger.
- You can also tweak the = 0 clause in the example query for your use case. If you truly want to know when there has been absolutely "NO DATA" at all being reported, then it's the right approach. However, if you expect data to be reported once a minute, and you'd like to know when it's not consistently being reported, then perhaps `mcount(5m, ts(my.metric)) <= 3` would work better. This approach requires there to only be two missing data values in the last 5 minutes in order to trigger your alert.
 
## Alert on Wavefront Proxy
 
The data from agents such as collectd, Telegraf, etc. are sent to the Wavefront proxy and then the proxy pushes the data to the Wavefront collector service. It is important to make sure that the proxy is checking in with Wavefront and ensure data is being pushed to the collector. You can set this alert up by using the following query:
 
`mcount(5m,sum(rate(ts(~agent.check-in)), sources))=0 and mcount(1h, sum(rate(ts(~agent.check-in)), sources)) !=0`
 
This query uses the `~agent.check-in` metric to verify that the agents are reporting in.  By applying a second argument to the alert query, you capture series that not only have stopped reporting a value in the last 5 minutes, but also if that series has had at least 1 value reported in the last hour.


