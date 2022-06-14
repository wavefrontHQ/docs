---
title: Tanzu Observability Pricing
tags: [administration]
sidebar: doc_sidebar
permalink: wavefront_pricing.html
summary: Summary of pricing information
---
Tanzu Observability by Wavefront pricing depends on the contract that your company has with VMware, on the types on data you're ingesting, and on some other factors. This page gives an overview of how PPS (points per second) affects pricing.

## Consumption Based Pricing Overview

At the core of the model is the idea of consumption-based pricing. What you pay is based on data throughput, primarily:
* **Data ingestion**. When the Wavefront service ingests data, those data are consumed and count toward your allocation.
* **Data analysis**. When you run a query, either as part of an alert or when you look at a dashboard, the backend has to process the data, and they count toward your allocation.

The model includes:
* A tiered pricing structure for points.
  - Metrics and histograms are evaluated using a simple multiplier.
  - Special data such as derived metrics, derived histogram, and tracing spans use a different pricing model with more options that help you focus on data you really need.

The following diagram illustrates this:
* For metrics, assume 1 PPS

![Metrics 1pps and Histograms 7pps are the basis, distributed tracing is 22 PPS if intelligent sampling is turned off](images/pricing_model_1.png)

## Tiered Pricing and Distributed Tracing Pricing

The distributed tracing pricing depends on the type of metrics and on whether [Intelligent Sampling](trace_data_sampling.html#intelligent-sampling) is enabled for tracing.

The pricing model:
* Counts each incoming derived metric at 1 PPS.
* Counts each derived histogram at 7 PPS.
* For traces and spans, the model checks if intelligent sampling is turned on.
  - If yes, the amount of data is reduced but the data is free.
  - If no, incoming traces are counted at 22 PPS per trace.
* Span logs are free.

![When data comes to the server, pricing model counts derived metrics (1pps) & derived histograms (7pps). For tracing, the pricing model checks if intelligent samplin is turned on. If yes, FREE, otherwise, 22 PPS for Traces/spans.](images/pricing_model_2.png)

## Data Retention

Default data retention is:
* 18 months for metrics and derived metrics.
* 6 months for histograms and derived histograms
* 7 days for traces, spans, and span logs

Some companies negotiate a longer data retention at a higher price. Ask your administrator for details. 
