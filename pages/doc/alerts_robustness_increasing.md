---
title: Three Tips for Increasing Alert Robustness
keywords: alerts
tags: [alerts, best practice]
sidebar: doc_sidebar
permalink: alerts_robustness_increasing.html
summary: Learn how to develop alert conditions and properties that limit spurious alerts.
---
Monitoring a production environment can be a challenging task. But if you have the right alert strategy, you can prevent alert fatigue and ensure that teams respond and fix the problem. As a result, the alert event doesn't escalate into a full-blown outage.

Because each environment is different, Wavefront supports fine-grained customization.  Here are some tips to help you improve alert robustness and prevent false positives.

## Account for Delayed Data Points

Network delays or slow processing of application metrics at the backend can negatively impact alert processing -- and that can lead to false triggers. These false triggers (false positives) happen if the alerting mechanism is too sensitive.
If backtesting shows that the alert should have fire, delayed points are often the reason.

You can resolve this problem like this:

* Set the **Alert fires** threshold higher than the default 2 minutes. This setting depends on how often data points arrive, and it accounts for any delays in the application metrics delivery pipeline. Changing **Alert fires** can compensate for external delays of metrics.

* Adjusting the alert query to account for delayed metric data points can prevent false positives. Use the `lag()` function, as follows:

  ```
  lag(30m, sum(ts("aws.elb.requestcount"))) < 0.3 * lag(1w, sum(ts("aws.elb.requestcount")))
  ```

  The example above analyzes a single value of the `aws.elb.requestcount` metric that was reported 30 minutes ago. The example compares the value with the value that was measured one week ago, and determines whether the request count dropped below 30%. The example alert query looks at a value reported 30-minutes ago -- which allows delayed data points to catch up. The example also looks at the overall trend of the data. As a result, delayed metric points do not falsely trigger the alert.

## Account for Missing Data Points

Using `mcount()` can help you account for missing data points. Use `count()` to see the number of systems reporting, use `mcount()` to see the number of points.

A general query with `mcount()` might be:
`mcount(5m, ts(my.metric)) = 0`.

You can tweak a few things:

- Ensure that the time interval associated with `mcount()` is appropriate for your set of data. For example, if you expect that data will arrive once a minute, using `mcount(30s)` is not a good approach. If you want to avoid false positives, `mcount(1m)` won't work either because even a slight delay can affect the alert. However, `mcount(5m)` works well -- it triggers after 5 minutes of NO DATA.
- You can also tweak the = 0 clause in the query.
    - If you want to know when no data at all was reported, then using = 0 is the right approach.
    - However, if you expect data to be reported once a minute, and you'd like to know when data are not consistently reported, then `mcount(5m, ts(my.metric)) <= 3` works better. With that query, you trigger the alert if there are 2 or more missing data points in the last 5 minutes.

The `mcount()` function returns the number of data points for 2x the duration of `timeWindow` after `expression` stops reporting data. The example below shows how `mcount(10 m...)` reports a decreasing value for 10 minutes, then a value of 0 for 10 more minutes, and then stops reporting.

![mcount_demo-2](images/mcount_demo-2.png)

`mcount(5m, ts(metric2))` stops reporting values after 10 minutes when the time series stops. In the example below, reporting stops after 9:30.

![mcount_demo-1](images/mcount_demo-1.png)

but it fills in 0 values for all previous gaps, even if the gaps were much larger than 10 minutes. That means if metric2 reports 1 value every hour, then  `mcount(5m, ts(metric2))` stops reporting values after 10 minutes -- but if a new value comes in after 50 more minutes, `mcount` will backfill the entire hour.

The example below shows how `mcount` fills in gaps and continues reporting values.

![mcount_demo-4](images/mcount_demo-4.png)

If your use case requires `mcount()` to report a value beyond the 2x time window, we recommend wrapping the `mcount()` function in `last()`, for example: `last(1h, mcount(5m, ts(my.metric)))`.

## Alert on Wavefront Proxy

The data from agents such as collectd, Telegraf, etc. are sent to the Wavefront proxy and the proxy pushes the data to the Wavefront collector service. Make sure that the proxy checks in with Wavefront and that data is being pushed to the collector. You can set up the following alert to monitor the proxy:

```
mcount(5m,sum(rate(ts(~agent.check-in)), sources))=0 and mcount(1h, sum(rate(ts(~agent.check-in)), sources)) !=0
```

This query uses the `~agent.check-in` metric to verify that the agents are reporting. By applying a second argument to the alert query, you capture any time series that reported at least 1 value  in the last hour and that stopped reporting in the last 5 minutes.

Examine the Wavefront System Usage dashboard for your instance for proxy monitoring examples.
