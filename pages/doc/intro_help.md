---
title: Introduction to Wavefront
keywords: [getting started]
sidebar: doc_sidebar
permalink: intro_help.html
---

Wavefront is a high performance streaming analytics platform designed for monitoring and optimization.  The service is unique in its ability to scale to very high data ingestion rates and query loads. The result is a technology stack unique in its ability to scale horizontally while providing access to all of the granular (not aggregated) data collected for all time.

The major components of Wavefront include the **Wavefront SaaS application**, which facilitates economies of scale for deployment, flexibility, and time to value and the Wavefront proxy. The **Wavefront proxy** is the interface to **collector agents**, which instrument hardware and software applications. The Wavefront application can also collect metrics directly from external metrics services such as those provided by Amazon Web Services. This diagram illustrates the concepts:

![Wavefront architecture](images/wavefront_architecture.png)

One of Wavefront's differentiators is the Time Series query language, or [ts() language](time_series_language_reference), which allows you to harness the power of the platform to design your own key performance indicators from all of your metric data. The ts() language has support for sophisticated statistical functions and can be used to construct simple and complex queries across multiple metrics/sources leveraging any combination of ts() functions (which include arithmetic operators, aggregate functions, time functions, filtering operators, conditional functions, etc.). 

{% include links.html %}
