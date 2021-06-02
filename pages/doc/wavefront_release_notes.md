---
title: Wavefront Release Notes
keywords:
tags:
sidebar: doc_sidebar
permalink: wavefront_release_notes.html
summary: Learn about new and updated features in Wavefront.
---

This page lists new and updated features in the Wavefront service.

## 2021-20.x Release Notes

* **Performance Improvements**: This release includes significant performance improvements for the query language. As part of this project, our engineers added single-side join improvements, strategy improvements for TopK, and more. Read our blog post: [How Tanzu Observability Continuous Improvement Makes You More Successful](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/how-tanzu-observability-continuous-improvement-make-you-more-successful) for details.

* **New Functions**: We added the [`retainDimension()` and `removeDimension()` functions](ts_retainDimension_removeDimension.html), which allow you to keep or remove dimensions (point tags) from the results of your queries.

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
