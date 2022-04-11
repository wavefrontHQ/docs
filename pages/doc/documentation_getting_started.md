---
title: "Learn Wavefront"
keywords: tutorial
tags: [getting started]
sidebar: doc_sidebar
permalink: tutorial_overview.html
summary: Come up to speed with tutorials in product, GitHub, and docs.
---

Learn Wavefront with in-product or external resources:
* **Learn Wavefront in Wavefront**:  Getting Started workflow, tutorial and tour integrations, help panel, integration setup examples.
* **Tutorials, Videos, and More**: Tutorials, Reference documentation, FAQs and Recipes, videos, and more.
  - Start with the [Hello Wavefront!](hello_wavefront_aws_tutorial.html) tutorial.
  - To do something, check out the [How-to Get Started videos](videos_howto_start.html).
  - To get some big picture background, watch some [Basic Concepts Videos](videos_quickstart.html).

## Learn Wavefront in Wavefront

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">The <strong>Getting Started onboarding flow</strong> helps you get data into Wavefront, build a dashboard, and create an alert.
<ul><li>All trial users go through a Getting Started flow. </li>
<li>All other users can click <strong>Getting Started</strong> on the toolbar to start.</li></ul>
You can use the customer-wide or user-level preferences to control whether <strong>Getting Started</strong> is visible on the toolbar.
</td>
<td width="60%"><img src="/images/get_started.png" alt="screenshot of Getting Started second screen"></td>
</tr>
<tr>
<td>
The <strong>Tutorial integration</strong> allows you to experiment with charts and alerts to learn (clone the integration to save your results).
<ol><li>Click <strong>Integrations</strong> on the toolbar. </li>
<li>Click <strong>Wavefront Tutorial</strong> and click the <strong>Dashboards</strong> tab.</li>
<li>Click a dashboard and follow the instructions on the left to explore the charts (with sample data) on the right.</li> </ol>
</td>
<td width="50%"><img src="/images/all_tutorial_dashboards.png" alt="all tutorial dashboards"></td>
</tr>
<tr>
<td>
The <strong>Tour Pro integration</strong> is a deep dive into Wavefront functionality.
<br/><br/>
You can explore Tour dashboards and charts, which use sample data to highlight functionality like Anomaly Detection or fine-tuning alerts. The tour also includes single-host and cluster metrics exploration dashboards.
<ol><li>Click <strong>Integrations</strong> on the toolbar. </li>
<li>Search for and click <strong>Tour Pro</strong> and click the <strong>Dashboards</strong> tab.</li>
<li>Click any of the dashboards to explore - they can be used independently.</li></ol></td>
<td width="50%"><img src="/images/tour_example.png" alt="screenshot of cluster metrics exploration dashboard"></td>
</tr>
<tr>
<td>
The <strong>Help panel</strong> is available for most screens when you click the question mark <strong>?</strong>. You'll get a brief overview and links to other information.</td>
<td width="50%"><img src="/images/show_help.png" alt="screenshot collage: first click on ? icon, then see help in panel on the right."></td>
</tr>
</tbody>
</table>

## Find Reference Documentation, FAQs, and Best Practices

Our docs include reference documentation for API, query language, and chart options. Our customer success team helped with FAQs and best practices.


<table style="width: 100%;">
<tbody>
<tr>
<td width="60%"><strong>REST API</strong> reference documentation is available:
<ul><li>From the gear icon in the top right of the toolbar inside the product (see screenshot). This option shows you the current version on your cluster.</li>
<li>From the <a href="https://code.vmware.com/apis/714/wavefront-rest">VMware Code website</a>. This option shows the most recent version.</li>
</ul>
</td>
<td width="40%"><img src="/images/api_documentation.png" alt="gear icon menu with API Documentation selected"></td>
</tr>
<tr>
<td markdown="span"><strong>Query language reference</strong> documentation is available [in this doc set](query_language_reference.html). Click any link to see a function page with examples for that function, as shown in the screenshot on the right.
</td>
<td><a href="query_language_reference.html" target="_blank"><img src="/images/query_language_example.png"  alt="screenshot of Aggregation functions section, with 2 functions with links"/></a></td>
</tr>
<tr>
<td>The <strong>Chart Reference</strong> has details for each chart type.</td>
<td><a href="ui_chart_reference.html" target="_blank"><img src="/images/chart_reference.png"  alt="TOC of chart reference"/></a></td>
</tr>
<tr>
<td>For <strong>Best Practices</strong>, our engineering and customer success teams continually update the information. Those doc pages have a label. Use the <a href="label_best%20practice.html">Best Practices tile in docs.wavefront.com</a> or pick one of these popular Best Practices pages:
<ul><li><a href="alerts_best_practices.html">Alerts Best Practices</a> </li>
<li><a href="alerts_recipes.html">Alerts Recipes</a> </li>
<li><a href="query_language_recipes.html">Query Language Recipes</a> </li>
<li><a href="wavefront_data_format.html#wavefront-data-format-best-practices">Data Naming Best Practices</a> </li>
<li><a href="tracing_best_practices.html">Tracing Best Practices</a> </li></ul></td>
<td><a href="label_best%20practice.html" target="_blank"><img src="/images/best_practices_tile.png"  alt="screenshot of tile, best practices highlighted"/></a></td>
</tr>
<tr>
<td>Our <strong>FAQ info</strong> helps both users who are new to Wavefront and users who know exactly what they want. We're updating this list as we hear from you in conversations or on Slack.
<ul><li><a href="ui_charts_faq.html">Wavefront Charts FAQs </a>explains how to set color mapping, how to define drilldown links, and more.  </li>
<li><a href="wavefront_kubernetes_faq.html">Wavefront and Kubernetes FAQ</a> addresses common questions, such as integrating with third-party applications. </li>
<li><a href="tracing_faq.html">Tracing FAQ</a> helps with common tasks like filtering RED metrics with custom span tags.  </li>
<li><a href="wavefront_spring_boot_faq.html">Wavefront and Spring Boot FAQ</a> explains differences between Freemium and trial clusters, how to visualize metrics and traces, and more. </li>
</ul></td>
<td><img src="/images/wavefront_charts_faq.png" alt="screenshot of TOC of chart FAQ"></td>
</tr>
</tbody>
</table>

## Learn with Tutorials & Videos

This doc set includes a set of tutorials for common use cases and links to short videos that help you get up to speed quickly.


<table style="width: 100%;">
<tbody>
<tr>
<td width="40%"><br/><br/>
<strong>Tutorials</strong> use simple examples to get you up to speed with the different Wavefront components. <br/><br/>
We're continually adding to this set - let us know what else you'd like to see.
</td>
<td width="60%"><a href="query_language_getting_started.html"><img src="/images/query_language_tutorial.png" alt="Screenshot of QL tutorial"/></a></td>
</tr>
<tr><br/><br/>
<td><strong>Videos</strong> have been part of Wavefront learning from the start. Different videos have different focus.
<ul><li>Lightboard videos give conceptual background</li>
<li>Our task-focus videos show how to get things done.</li></ul>

Here are some task-focus <a href="videos_howto_start.html"> intro videos</a>. Click links in that section for more. </td>
<td width="50%"><a href="https://youtu.be/90mw6Vcmlt4" target="_blank"><img src="/images/v_intro_clement.png" alt="Introduction to Wavefront video"/></a></td>
</tr>
</tbody>
</table>
