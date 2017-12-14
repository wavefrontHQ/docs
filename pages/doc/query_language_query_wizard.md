---
title: Query Wizard
keywords: query language
tags: [query language]
sidebar: doc_sidebar
permalink: query_language_query_wizard.html
summary: Learn how to get started with creating Wavefront Query Language expressions using Query Wizard.
---
The Wavefront Query Wizard is a collection of recipes that have been curated by the Wavefront team. The Query Wizard takes a base query and applies the correct string of advanced functions that are needed for the selected recipe. Depending on the selected recipe, additional parameters, such as the number of top series to return, may be required. When you've completed the query (including additional parameters if required), the Query Wizard displays the data and the completed query. You can then apply the query to your chart.

## Recipe Types

The Wavefront Query Wizard has the following recipe types:

- **Getting Started**: Simple recipes, for example, to:
  - sum, count, or average your entire data set,
  - determine rate of change per second from one data value to the next,
  - quickly identify the top 'X' number of reported series at the end of your current chart window.
- **Moving Window**: Queries that provide results based on a moving window of time, for example, moving averages or medians for each series over the last X minutes\|hours\|days\|weeks. This category also includes more advanced recipes, for example, to find the amount of time that's passed since the last reported value, or recipes for tumbling windows. Here's a configured moving average query:

  ![recipe_selected](images/recipe_selected.png)

- **Data Pipeline Management**: Recipes that help you learn more about the data values that  your company sends to the Wavefront service. You can determine how many data points are being sent or whether any data points are being blocked.
- **Anomaly/Outlier Detection**: More advanced recipes to help identify anomalies in your reported data. Determining when a reported value is outside a particular range, for example:
  - understanding the volatility of your data using variance
  - calculating standard deviations
  - other anomaly detection recipes
- **Prediction**: One recipe that uses window linear regression to predict when two data sets will intersect.

## Accessing Query Wizard

You can access the Wavefront Query Wizard from any chart in Wavefront:

1. Create a blank chart (**Dashboards > Create Chart**) or open an existing chart.
1. Click the wizard icon located to the left of the query line:
  ![wizard_button](images/wizard_button.png)

    The Query Wizard dialog displays and you can begin selecting an available recipe. If the  query line is already populated with a  ts() expression, then that query is applied as a base query within the Query Wizard.

## Using the Query Wizard

Each recipe requires that you enter a base ts() expression. You have to identify the set of data to associate with the recipe with before you start using the Query Wizard. Some advanced recipes require knowledge of tags (e.g. source and point) or event parameters (e.g. name and severity). These recipes display the additional parameters that are needed for recipe completion.
