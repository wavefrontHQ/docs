---
title: Operations for Applications CLIs
keywords: getting started
tags: [getting started]
sidebar: doc_sidebar
permalink: wavefront_clis.html
summary: You can use different CLIs with VMware Aria Operations for Applications (previously known as Tanzu Observability by Wavefront).
---

The Operations for Applications REST API is publicly available via Swagger. You can use Swagger to generate an [API client](wavefront_api.html#generate-an-api-client-using-swagger) that includes CLI options. Several of our customers have generated CLIs already.


## External CLIs for the REST API

Several Operations for Applications customers have generated CLIs from our REST API and made them available on GitHub.

{% include note.html content="These external CLIs are not supported or maintained by the Operations for Applications team." %}

* Robert Fisher of Sysdef Ltd. created a [Ruby CLI](https://github.com/snltd/wavefront-cli) and gives installation instructions, examples, and more in [this post](https://sysdef.xyz/post/2017-07-26-wavefront-cli).
  This [blog post](https://tanzu.vmware.com/content/vmware-aria-operations-for-applications-blog/commanding-the-waves-using-the-wavefront-cli) has details.
* Operations for Applications customer Box open-sourced `wavectl`, their [automation tooling for Operations for Applications](https://github.com/box/wavectl). This command-line client for Operations for Applications is inspired by kubectl and git command line tools. This [blog post](https://tanzu.vmware.com/content/vmware-aria-operations-for-applications-blog/new-automation-tooling-for-wavefront-gets-boxed-up-by-box) discusses that CLI and includes links to the extensive doc and examples.
