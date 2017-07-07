---
title: Query Wizard
keywords: query language
tags: [query language]
sidebar: doc_sidebar
permalink: query_language_query_wizard.html
summary: Learn how to get started with creating Wavefront Query Language expressions using Query Wizard.
---
The Wavefront Query Wizard is a collection of recipes that have been curated by the Wavefront team to help you take advantage of Wavefront Query Language. The Wavefront Query Wizard takes a base query and applies the correct string of advanced functions needed to accomplish the selected recipe. Additional parameters may be required (e.g. number of top series to return) depending on the selected recipe. Once you complete the query and any additional parameters, the Query Wizard displays the data and provides the completed query. At that point, you can simply apply it to your chart.
 
## Recipe Types
 
The Wavefront Query Wizard has 5 categories of recipes:

- **Getting Started**: Simple recipes that everyone can benefit from. For example, you can create recipes to sum, count, or average your entire data set, determine rate of change per second from one data value to the next, or quickly identify the top 'X' number of reported series at the end of your current chart window.
- **Moving Window**: This category represents queries that will provide results based on a moving window of time, for example, simple recipes such as moving averages or medians for each series over the last X minutes\|hours\|days\|weeks. Additionally, this category includes more advanced recipes such as the amount of time that's passed since the last reported value or tumbling windows. Here is a configured moving average query:

  ![recipe_selected](images/recipe_selected.png)

- **Data Pipeline Management**: Recipes that help you learn more about the data values that are being sent from your company to Wavefront. You can determine how many data points are being sent from your company's proxy to Wavefront or whether any data points are being blocked.
- **Anomaly/Outlier Detection**: More advanced recipes to help identify anomalies that may be occurring in your reported data. Determining when a reported value is outside of a particular range, understanding the volatility of your data using variance, and calculating standard deviations are just a few examples of recipes included in this category.
- **Prediction**: One recipe that uses window linear regression in order to predict when two data sets will intersect.
 
## Accessing Query Wizard
 
You can access the Wavefront Query Wizard from any chart in Wavefront:

1. Create a blank chart (**Dashboards > Create Chart**) or open an existing chart.
1. Click the <i class="fa fa-magic"/> icon located to the left of a query line:
  ![wizard_button](images/wizard_button.png)
  
    The Query Wizard dialog displays and you can begin selecting an available recipe. If the associated query line already has a ts() expression populated, then this query is applied as a base query within the Query Wizard.
 
## Using the Query Wizard
 
Each recipe requires you to enter a base ts() expression. This means that you must identify the set of data to associate with the recipe with before using the Query Wizard. Some advanced recipes require knowledge of tags (e.g. source and point) or event parameters (e.g. name and severity). These recipes clearly display the additional parameters needed in order to complete the recipe.
