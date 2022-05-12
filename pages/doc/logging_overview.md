---
title: Logs Overview
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_overview.html
summary: Learn how you can get the unified observability experience with Tanzu Observability using metrics, traces, and logs.
---

{% include important.html content="This document is work in progress!"%}

 <table style="width: 100%;">
<tbody>
<tr>
  <td width="60%" >
    In a microservice architecture, the services in an application are distributed, and you need to monitor each service carefully to ensure that your overall application runs smoothly. Tanzu Observability helps you monitor your application using metrics, traces, and logs.
    For example: 
    <ul>
      <li> 
        You can use metrics to get the numerical data to identify the performance issues in a system 
      </li>
      <li> 
        use traces to get an overview of your entire application and discover the services or service requests that don’t perform as expected
      </li>
      <li> 
        and use logs to debug the issues.
      </li>
    </ul>
  </td>
  <td width="40%" markdown="span">
    ![shows that tanzu observability supports all three pillars : metrics, traces, and logs.](images/logging_ufo.png)
  </td>
</tr>
</tbody>
</table>




{%include note.html content="Tanzu Observability retains the logs you send for 14 days. If you want to keep the data for a longer time, contact [technical support](https://docs.wavefront.com/wavefront_support_feedback.html#support) for help."%}

## What's a Log?

Logs are structured or unstructured text records of events that took place at a given time. Logs in Tanzu Observability include the following attributes:

![Gives an overview of the attributes in a log. They are listed in the table below](images/logging_log_image.png)


<table style="width: 100;">
  <tr>
    <th width="20%">
      Attribute
    </th>
    <th width="80%">
      Description
    </th>
  </tr>
  <tr>
    <td>
      Source
    </td>
    <td markdown="span">
      
    </td>
  </tr>
  <tr>
    <td>
      Time
    </td>
    <td>
      
    </td>
  </tr>
  <tr>
    <td>
      Source
    </td>
    <td>
      
    </td>
  </tr>
  <tr>
    <td>
      Message
    </td>
    <td>
      
    </td>
  </tr>
  <tr>
    <td>
      Tag:Value
    </td>
    <td>
      
    </td>
  </tr>
</table>
