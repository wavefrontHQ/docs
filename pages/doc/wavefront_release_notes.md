---
title: Wavefront Release Notes
keywords:
tags:
sidebar: doc_sidebar
permalink: wavefront_release_notes.html
summary: Learn about new and updated features in Wavefront.
---

This page lists new and updated features in the Wavefront service.

## 2021-21.x Release Notes

* **OpenTelemetry Exporter**: The [Tanzu Observability (Wavefront) exporter for OpenTelemetry](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/tanzuobservabilityexporter/README.md) allows you to send traces to Wavefront and use our [comprehensive DT GUI](tracing_ui_overview.html) to visualize trace data.
<!---The KB [OpenTracing or OpenTelemetry- Which to select for instrumenting applications for tracing](https://help.wavefront.com/hc/en-us/articles/360058140212-OpenTracing-or-OpenTelemetry-Which-specification-to-select-for-instrumenting-applications-for-tracing-) gives an introduction.--->
* **PromQL Improvements**:  We made the following improvements to our PromQL implementation:
  - Regular expression filters in PromQL are now supported.
  - Regular subquery expressions in PromQL are now supported.
  The earlier limitations have been removed from our [PromQL doc page](wavefront_prometheus.html).
* **New Function**: We now support a [log2() function](ts_log2.html) in addition to the existing log() and log10() functions.
* **Alert API Change**: Performing a PUT request with no changes against `/api/v2/alert/{id}` no longer marks the alert as edited/auto resolved.
* **Search UI Improvements**:
  - You can explicitly exclude a keyword or a phrase from the search results by changing the equal sign to a not equal sign (≠). See [Searching Wavefront](wavefront_searching.html) for an example.

  ![exclude search results](images/not_in_search.png)
  - When you search, we now show results that contain the current text string, as shown in the following screenshot.

  ![search has results of full string and results that include the text string, starting with Contains](images/contains.png)



## 2021-20.x Release Notes

* **Performance Improvements**: This release includes significant performance improvements for the query language. As part of this project, our engineers added single-side join improvements, strategy improvements for TopK, and more. Read our blog post: [How Tanzu Observability Continuous Improvement Makes You More Successful](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/how-tanzu-observability-continuous-improvement-make-you-more-successful) for details.

* **New Functions**: We added the [`retainDimension()` and `removeDimension()` functions](ts_retainDimension_removeDimension.html), which allow you to keep or remove dimensions (point tags) that are in the results of your queries.

* **New Operators**: We add the `groupLeft` and `groupRight` operators, which let you achieve many-to-one and one-to-many series matching, similar to the [Many-to-one and one-to-many PromQL vector matches](https://prometheus.io/docs/prometheus/latest/querying/operators/#many-to-one-and-one-to-many-vector-matches). To learn more about how to use these operators and how Wavefront processes output metadata from a series match, see [Processing Output Metadata from a Series Match](query_language_series_matching.html#processing-output-metadata-from-a-series-match).


## Past Release Notes

- [2021-19.x Release Notes](2021.19.x_release_notes.html)
- [2021-14.x Release Notes](2021.14.x_release_notes.html)
- [2021-08.x Release Notes](2021.08.x_release_notes.html)
- [2020-42.x Release Notes](2020.42.x_release_notes.html)
- [2020-38.x Release Notes](2020.38.x_release_notes.html)
- [2020-30.x Release Notes](2020.30.x_release_notes.html)
- [2020-26.x Release Notes](2020.26.x_release_notes.html)
- [2020-22.x Release Notes](2020.22.x_release_notes.html)
- [2020-14.x Release Notes](2020.14.x_release_notes.html)


For Wavefront Proxy, your go-to place is the [Wavefront proxy github page](https://GitHub.com/wavefrontHQ/java/releases). On that page, you can see releases in progress and GA versions. If proxy changes are important for the service, we update this doc set, for example, with new configuration parameters, ports, etc.
