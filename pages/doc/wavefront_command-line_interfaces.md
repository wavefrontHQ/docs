---
title: Wavefront CLIs
keywords: getting started
tags: [getting started]
sidebar: doc_sidebar
permalink: wavefront_clis.html
summary: Learn about the different command-line interfaces you can use with Wavefront.
---

## Different CLIs for Different Tasks

We support different CLIs for different tasks.

* Wavefront exposes a REST API for management via Swagger. Swagger allows you to generate an [API client](https://github.com/swagger-api/swagger-codegen/wiki/api-client-generator-howto) in the language of your choice and includes CLI options.
* The [Wavefront Integration CLI](wavefront_cli.html) is a utility for installing and configuring the Wavefront proxy, Telegraf collector agent, and integrations. This is not a general management CLI.


## External CLIs for the REST API

Some Wavefront customers have generated CLIs from our REST API and made them available on Github:

* Robert Fisher of [Sysdef Ltd.](https://sysdef.xyz.com) created a [Ruby CLI](https://github.com/snltd/wavefront-cli) and gives installation instructions, examples, and more in [this post](https://sysdef.xyz/post/2017-07-26-wavefront-cli)
* Wavefront customer Box open sourced `wavectl`, their [automation tooling for Wavefront](https://github.com/box/wavectl) in June 2018. This command-line line client for Wavefront is inspired by kubectl and git command line tools. A [Wavefront blog post](https://www.wavefront.com/automation-tooling-wavectl/) discusses the CLI and includes links to the extensive doc and examples.
