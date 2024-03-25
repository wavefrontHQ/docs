---
title: Tanzu Observability Pricing
tags: [administration]
sidebar: doc_sidebar
permalink: wavefront_pricing.html
summary: Summary of pricing information.
---
VMware Tanzu Observability (formerly known as VMware Aria Operations for Applications) pricing depends on the contract that your company has with VMware, on the types on data you're ingesting, and on some other factors. This page gives an overview of pricing for the different types of data you can send to Tanzu Observability.

{% include note.html content="Some customers have special rates, for example, because they're helping us to test a new feature. The information on this page covers the most common case. "%}

## Pricing Structure

At the core of the model is the idea of consumption-based pricing. What you pay is based on data throughput, primarily:
* **Data ingestion**. When the Tanzu Observability service ingests data, the data is consumed and count toward your allocation.
* **Data scanning**. When you run a query, either as part of an alert or when you look at a dashboard, the backend has to scan the data. Scanning counts toward your allocation.

The model has this basic pricing structure:
* Each ingested or scanned metric or derived metric counts as 1 PPS.
* Each ingested or scanned histogram or derived histogram counts as 7 PPS.

For spans, the pricing structure is as follows:
* If [intelligent sampling](trace_data_sampling.html#intelligent-sampling) is turned on, the trace data is counted as derived metrics (1 PPS) or derived histograms (7 PPS).
* If you request our Technical Support team to turn off the intelligent sampling on your service instance, or if you specify [sampling policies](trace_data_sampling.html#sampling-policies) to specifically include certain traces, each tracing span counts as 22 PPS.
* [Span logs](trace_data_details.html#span-logs) are free.

![Metrics 1pps and Histograms 7pps are the basis, distributed tracing is 22 PPS if intelligent sampling is turned off](images/pricing_model_1.png)


## Data Retention

Default data retention is:
* 18 months for persistent metrics, counters, and derived metrics.
* 28 days for ephemeral metrics.
* 6 months for histograms and derived histograms.
* 7 days for traces, spans, and span logs.

Some companies negotiate a longer data retention at a higher price. Ask your administrator for details.

## Learn More

* [Improve PPS and Prevent Overage](wavefront_usage_info.html)
* [Optimizing the Data Shape to Improve Performance](optimize_data_shape.html)
