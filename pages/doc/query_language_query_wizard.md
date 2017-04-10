---
title: Query Wizard
keywords: query language
tags: [query language, getting started]
sidebar: doc_sidebar
permalink: query_language_query_wizard.html
summary: Learn how to get started with creating Wavefront Query Language expressions using Query Wizard.
---
The Wavefront Query Wizard is a collection of recipes that have been curated by the Wavefront team to help you take advantage of Wavefront's powerful time series language. This article covers several topics about the Query Wizard.

## How does the Wavefront Query Wizard work?
 
The Wavefront Query Wizard takes a base query and applies the correct string of advanced functions needed to accomplish the selected recipe. Additional parameters may be required (e.g. number of top series to return) depending on the selected recipe. Once you complete the query and any additional parameters, the Query Wizard displays the data and provides the completed query. At that point, you can simply apply it to your chart.
 
## What type of queries can I create using the Wavefront Query Wizard?
 
The Wavefront Query Wizard currently has 5 categories of recipes:

- **Getting Started**: This category provides simple recipes that everyone can benefit from. For example, you can create recipes to sum, count, or average your entire data set, determine rate of change per second from one data value to the next, or quickly identify the top 'X' number of reported series at the end of your current chart window.
- **Moving Window**: This category represents queries that will provide results based on a moving window of time. For example, simple recipes such as moving averages or medians for each series over the last 'X' minutes\|hours\|days\|weeks can be found in this category. Additionally, this category includes more advanced recipes such as the amount of time that's passed since the last reported value or tumbling windows. For example, here is a configured moving average query:

  ![recipe_selected](images/recipe_selected.png)

- **Data Pipeline Management**: This category includes recipes that help your learn more about the data values that are being sent from your company to Wavefront. You can determine how many data points are being sent from your company's proxy to Wavefront or whether any data points are being blocked.
- **Anomaly/Outlier Detection**: This category includes more advanced recipes to help identify any anomalies that may be occurring in your reported data. Determining when a reported value is outside of a particular range, understanding the volatility of your data using variance, and calculating standard deviations are just a few examples of recipes included in this category.
- **Prediction**: This category contains one recipe that uses window linear regression in order to predict when two data sets will intersect.
 
## How do I access the Wavefront Query Wizard?
 
You can access the Wavefront Query Wizard from any individual chart in Wavefront.

1. Navigate to a blank chart from the task bar (**Dashboards > Create Chart**) or open an existing chart on a dashboard.
1. Click the <i class="fa fa-magic"/> icon located to the left of a query line:
  ![wizard_button](images/wizard_button.png)
  
    The Query Wizard dialog displays and you can begin selecting an available recipe. If the associated query line already has a ts() expression populated, then this query is applied as a base query within the Query Wizard.
 
## What do I need to know about my Wavefront instance in order to use the Query Wizard?
 
Each recipe in the Query Wizard requires you to enter a base ts() expression. This means that you must identify the set of data to associate with the recipe with before using the Query Wizard. Some advanced recipes require knowledge of tags (e.g. source and point) or event parameters (e.g. name and severity). These advanced recipes clearly display the additional parameters needed in order to complete the recipe.
 
## I don't know which recipe is right for my use case. What should I do?
 
We provide a description of each recipe found in the Query Wizard. If you don't know which recipe to use for your use case, then take some time to review the description of each recipe. Hopefully this will give you a better idea as to which recipe is right for you. If you are still unable to determine which recipe you should use, then contact [support](mailto:support@wavefront.com).

{% include links.html %}