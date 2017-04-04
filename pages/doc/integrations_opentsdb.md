---
title: OpenTSDB Integration
keywords:
tags: [integrations, proxies]
sidebar: doc_sidebar
permalink: integrations_opentsdb.html
summary: Learn how to send OpenTSDB data to Wavefront.
---
![opentsdb](images/opentsdb.png)

The Wavefront proxy supports OpenTSDB's data format out of the box.  No extra configuration is needed. By default, it listens on port 4242 for line messages in OpenTSDB's [line format](http://opentsdb.net/docs/build/html/user_guide/writing.html#telnet). 

As of version 3.14, the Wavefront proxy also supports OpenTSDB's HTTP API. This means that if you have existing collectors such as Tcollector or Diamond sending data to an OpenTSDB server today, the only step required is to change the target address from your OpenTSDB service to the Wavefront proxy instead.

{% include links.html %}
