---
title: Log Browser
keywords: data, logs
tags: [logs]
sidebar: doc_sidebar
permalink: logging_log_browser.html
summary: Overview of how to filter and search logs sent to Tanzu Observability by Wavefront.
---
Did you notice anomalies on your metrics charts or noticed that a service on the application map has large latency value? Use the Log Browser to search and filter logs and troubleshoot your issues.

Once you have configured your application and log shipper to [send logs to Tanzu Observability](#logging_send_logs.html), follow these steps to navigate to the Log Browser:

1. In your web browser, go to your Wavefront instance and log in.
1. From the toolbar, select **Logs**. You are taken to the Log Browser.

![An annotated screenshot of the log browser.](images/logging_log_browser_annotated_screen.png)



## Search and Filter Logs

Follow the steps given below to search and filter logs:

1. To get the list of logs you want:
  * Click **Source** and select a source from the list.
  * Click on a tag and select a value from the list.
  * Type in a key word on the search bar, and click **Search** or press Enter when [using the Keyboard to navigate](wavefront_keyboard_shortcuts.html#keyboard-shortcuts-and-their-usage). The logs have the key word highlighted.
    <br/>Example:
    ![Shoes the error key word on the search bad and the logs that contain the word error in them with error highlighted on the log messages](images/logging_search_key_word.png)
1. Once you see the logs on the log browser, you can filter logs using **Source**, tags, and key words on the search bar.
1. Optionally, you can search or filter logs that do not include a **Source**, tag, or key word:
    * Click the not equal sign (≠) next to a **Source** or tag value.
    * Click on a key word on the search bar, click **Exclude** > **Apply** > **Search**.
  <br/>Example: Search for logs that do not have the service telegraf and the key word warn.
    ![shows the example described in text](images/logging_not_include_search.png)
    
## Using The Histogram

The histogram shows how many logs are there for the time range you selected using the time piker.The histogram is broken in to 60 buckets. Therefore, if you select the default 15 minute time range, you logs are count is show for every 15 seconds (approximately).
