---
title: Understanding Slow Queries
keywords: getting started
tags: [query language, dashboards, best practice]
sidebar: doc_sidebar
permalink: dashboards_slow_queries.html
summary: Learn how to use Slow Query dashboards to understand which queries take a long time to complete.
---
## Displaying the Slow Query Dashboard
1. In the Wavefront UI, click the gear icon <i class="fa fa-cog"/> at the top right of the task bar and select your username.
1. Click the **Slow Query Dashboard** link in the left panel.

## Slow Query Dashboard Links

Several slow queries being executed within the selected time window can cause the Slow Query Dashboard page to be very long. These section links at the top left allow you to jump down to the relevant section of your choice. *The links display only after you have scrolled down the page.*

 ![db_slow_query_links](images/db_slow_query_links.png)

## Dashboard
The top section provides general information about slow queries in the system.

The time window buttons at the top right allow you to choose slow queries executed within 1 hour, 12 hours, and 1 day.

You can see the context of the query (Alerts/API or streaming) and  which slow queries failed to complete vs. which queries took a long time but eventually completed. It also provides you with the number of slow queries by user.
 ![db_slow_query](images/db_slow_query.png)


## Top Slow Queries

The Top Slow Queries section lists details about the top slow queries:

![db_slow_query_queriess](images/db_slow_query_queries.png)

- **Time Stamp** - Date and time that the query was executed.
- **Query Type** - Icon denoting whether the query was Alert/API <i class="fa-exclamation-triangle fa" style="color: orange;"/> or streaming <i class="fa-desktop fa" style="color: aqua;"/>.
- **Link to Query** - Clicking <i class="fa-share-square-o fa" style="color: gray;"/> opens a chart that runs the query.
- **Query** - The query that was executed. Under the query are details such as: the user running the query (if streaming), context type, and the query window. It also tells you the number of points and time series included in the query.
- **Time Taken** - How long it took for the query to execute.
- **Points Scanned** - The total number of points scanned in the query.
- **CPU Seconds** - The CPU consumption of the query.

## Resource Consumption by User

The Resource Consumption by User section displays the users that ran slow queries and provides details such as time spent, total points scanned, and total CPU consumed.

![db_slow_query_user](images/db_slow_query_user.png)
