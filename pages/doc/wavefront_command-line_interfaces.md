---
title: Tanzu Observability CLIs
keywords: getting started
tags: [getting started]
sidebar: doc_sidebar
permalink: wavefront_clis.html
summary: You can use different CLIs with Tanzu Observability by Wavefront.
---

The Wavefront REST API is publicly available via Swagger. You can use Swagger to generate an [API client](wavefront_api.html#generate-an-api-client-using-swagger) that includes CLI options. Several Wavefront customers have generated CLIs already.


## External CLIs for the REST API

Several Tanzu Observability by Wavefront customers have generated CLIs from our REST API and made them available on GitHub.

{% include note.html content="These external CLIs are not supported or maintained by the Tanzu Observability team." %}

* Robert Fisher of Sysdef Ltd. created a [Ruby CLI](https://github.com/snltd/wavefront-cli) and gives installation instructions, examples, and more in [this post](https://sysdef.xyz/post/2017-07-26-wavefront-cli)
  The Wavefront blog post [Commanding the Waves Using the Wavefront CLI](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/commanding-the-waves-using-the-wavefront-cli) has details.
* Tanzu Observability customer Box open-sourced `wavectl`, their [automation tooling for Wavefront](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/new-automation-tooling-for-wavefront-gets-boxed-up-by-box) in June 2018. This command-line client for Tanzu Observability by Wavefront is inspired by kubectl and git command line tools. A [Wavefront blog post]() discusses that CLI and includes links to the extensive doc and examples.
