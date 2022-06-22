---
title: Tanzu Observability Pricing
tags: [administration]
sidebar: doc_sidebar
permalink: wavefront_pricing.html
summary: Summary of pricing information
---
Tanzu Observability by Wavefront pricing depends on the contract that your company has with VMware, on the types on data you're ingesting, and on some other factors. This page gives an overview of how PPS (points per second) affects pricing.

{% include note.html content="Some customers have special rates, for example, because they're helping us to test a new feature. The information on this page covers the most common use case. "%}

## Pricing Structure

At the core of the model is the idea of consumption-based pricing. What you pay is based on data throughput, primarily:
* **Data ingestion**. When the Wavefront service ingests data, those data are consumed and count toward your allocation.
* **Data scanning**. When you run a query, either as part of an alert or when you look at a dashboard, the backend has to scan the data. Scanning counts toward your allocation.

The model has this basic pricing structure:
* Each ingested or scanned metric or derived metric counts as 1 PPS.
* Each ingested or scanned histogram or derived histogram counts as 7 PPS.

For scans, the pricing structure is as follows:
* [Span logs](trace_data_details.html#span-logs) are free.
* If [intelligent sampling](trace_data_sampling.html#intelligent-sampling) is turned on, tracing spans are free.
* If you specify trace sampling policies to specifically include certain traces, or if you turn off intelligent sampling, each tracing span counts as 22 PPS.

![Metrics 1pps and Histograms 7pps are the basis, distributed tracing is 22 PPS if intelligent sampling is turned off](images/pricing_model_1.png)


## Data Retention

Default data retention is:
* 18 months for metrics and derived metrics.
* 6 months for histograms and derived histograms
* 7 days for traces, spans, and span logs

Some companies negotiate a longer data retention at a higher price. Ask your administrator for details.

## Learn More

* [Improve PPS and Prevent Overage](wavefront_usage_info.html)
* [Optimizing the Data Shape to Improve Performance](optimize_data_shape.html)
