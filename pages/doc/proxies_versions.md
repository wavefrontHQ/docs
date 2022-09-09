---
title: Wavefront Proxy Release Notes
keywords:
tags: [proxies]
sidebar: doc_sidebar
permalink: proxies_versions.html
summary: Information about Release Notes for different Wavefront proxy versions.
---
* Information about changes to proxy is now in Github on the **[Wavefront proxy github page](https://github.com/wavefrontHQ/java/releases)**. On that page, you can also see which version of the proxy is GA or a release candidate.

  If proxy changes are important for the service, we update [relevant pages in this doc set](proxies.html), for example, with new configuration parameters, ports, etc.
* This doc set used to include a summary for each release. For older versions of the proxy, this summary information is now in the [Wavefront Proxy Release Notes Archive](proxies_versions_archived.html). Going forward, the Github page is the single source of truth.

{% include important.html content="<br/>Starting with Wavefront proxy 11.1, the proxy installation packages don't include JRE. Before you can install or upgrade the proxy, you must have the JRE in the execution path. See the requirements in the [Wavefront Proxy README file](https://github.com/wavefrontHQ/wavefront-proxy#requirements). " %}
