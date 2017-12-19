---
title: Dashboard Variables
keywords: dashboards
tags: [dashboards]
sidebar: doc_sidebar
permalink: dashboards_variables.html
summary: Learn how to use dashboard variables.
---
A dashboard variable is a placeholder that allows you to dynamically change the components of a query. Dashboard variables enable text replacement. Dashboard variables can contain:
* Metric names
* Filters
* Advanced functions
* A string such as ")))", which could be inserted at the end of an query.

There are three types of dashboard variables: simple, list, and dynamic.

All Wavefront users can select and temporarily alter the value of a dashboard variable.

{% include shared/permissions.html entity="dashboards" entitymgmt="Dashboard" %}

## Accessing Dashboard Variables

To access the variables associated with a dashboard, click the icon to the left of the pen in the dashboard icon group in the top right corner of the task bar ![db_actions.png](images/db_actions.png#inline).

The following example shows a variable that allows users to display components with a contract duration of 1 year or 3 years.

![Variable Name.png](images/db_var_name.png)

## Creating a Dashboard Variable

1.  Put your dashboard into edit mode by clicking the pencil icon at the far right of the task bar.

    - If there are no dashboard variables already defined, click **Create**.

    - If there is at least one variable associated with the dashboard, click the plus (+) icon.

2.  Inside the Variables pane, click the pen icon.

    ![variables edit icon](images/variables_edit.png)

3.  In the Variable Details dialog box, specify the variable name and label, and select the Variable Type. Fill in remaining fields depending on the variable type: [simple](#simple), [list](#list), and [dynamic](#dynamic).
4.  Click **Hide from non-editors** to make your dashboard variable non-viewable/non-changeable by all users when the dashboard is not in edit mode. The dashboard variable can still be used in ts() queries and becomes visible when you put the dashboard into edit mode.

## Using Dashboard Variables

You use a dashboard variable by referencing its name in a ts() expression using the syntax `${variableName}`. For example, to use the variable **az**, you specify the following query: `ts(cpu.loadavg.1m, ${az})`. When this query is executed, Wavefront replaces **${az}** with the associated variable value: `ts(cpu.loadavg.1m, tag=az-3 or source=app-3)`.

<span id="simple"></span>

## Simple Dashboard Variables

A *simple dashboard variable* maps a single variable to a single value. When you create a dashboard variable, the Variable Type is set to **Simple** by default.

Enter a variable name (case sensitive) and label. We suggest keeping the variable name short. For simple dashboard variables, enter the string of text that you'd like to replace the dashboard variable with in a ts() query when it's executed. Click **Accept**.

Click **Save** to save the dashboard and the dashboard variable.

You can use the variable in a ts() query as follows: `ts(${Variable1})`.

### Changing Variable Values

To temporarily change a variable value:
1. Access the dashboard's Variables section.
2. Click the value.
3. Replace the existing value with a new value.

This change is temporary. You have to edit the variable to make a permanent change.
<span id="list"></span>

## List Dashboard Variables

A *list dashboard variable* maps a variable label to a list of labels and values. They allow expert users to set a list of values to choose from. For example, let's assume that sources located in Availability Zone 1 are production and Availability Zone 2 are development. Instead of requiring a user to change the text from `tag=az-1` to `tag=az-2`, you can set the labels to **Production** and **Development**. This allows users to view the data they are interested in without having to know the underlying information, such as source or metric names.

To create a list dashboard variable, select **Variable Type > List**:

![list var with non-editor hide.png](images/db_var_list_with_non-editor_hide.png)

Enter the variable name and the label you'd like to show in the dropdown list. You can add, remove, or clone fields by using the icons to the right of the source fields.

![list var with non-editor hide and parameters.png](images/db_var_list_with_non-editor_hide_and_parameters.png)

Choose the label and value to set as the default and click **Accept**.

Click **Save** to save your dashboard and the dashboard variable.

In the dashboard, selecting **Production** replaces **${var1}** in a ts() query with **tag=az-1** and selecting **Development** replaces **${var1}** in a ts() query with **tag=az-2**.

![Varible list.png](images/db_var_list.png)

<span id="dynamic"></span>

## Dynamic Dashboard Variables

A *dynamic dashboard variable* defines a variable whose set of values are dynamically determined by a query.

**Note** Dynamic dashboard variables allow you to specify only a single metric name, source, source tag, or point tag at a time. Use simple or list dashboard variables if you want to use wildcards that return more than 1 metric name, source, source tag, or point tag.

To create a dynamic variable, put the dashboard into edit mode, add or edit a variable, and select **Variable Type > Dynamic**. A Field dropdown list and Query field displays.

![dynamic with field options.png](images/db_var_dynamic_with_field_options.png)

### Field Options

Select one of the following Field options:

-   **Source** - Populates the variable with sources associated with the query in the Query field.
-   **Source Tag** - Populates the dynamic variable list with source tags that match "tag=" part of your ts() expression. For example ts(cpu.load, tag=app*) will populate the dynamic variable list with "app-tag1", "app-tag2" and so forth.
-   **Matching Source Tag** - This will get all of the sources from your ts() expression, then, find all the source tags associtaed with those sources and populate the dynamic variable list with those source tags. If at least 1 source associated with a source tag is returned based from the query, the 'Matching Source Tag' will display souce tags.
-   **Metric** - Populates the variable with metrics associated with the query in the Query field.
-   **Point Tag** - Populates the variable with point tag values (of the point tag key in Point Tag Key field) associated with the query in the Query field.

Suppose you want to populate a variable with list of metrics that start with **requests** and **cpu**. Choose **Field > Metric**, type `ts("requests\*" or "cpu\*")` in the Query field, and press **Enter**:

![Variable dynamic query](images/db_var_dynamic_query.png)

A Current Values section displays every metric name that matches the query. As with list variables, you can select a specific value as the default. Click **Accept**.

Click **Save** to save your dashboard and the dashboard variable.

![Variable dynamic](images/db_var_dynamic.png)

After you save the dynamic dashboard variable, you can enter that variable name into a ts() query. For example, `ts(${var2})`. Selecting **cpu.usage.percentage** from the list of options replaces `ts(${var2})` with `ts("cpu.usage.percentage")`.

To use a dynamic dashboard variable **var2** that refers to a source, source tag, or point tag, use one of the following queries:

-   **Source** - `ts(<metricName>, source=${var2})`
-   **Source Tag** - `ts(<metricName>, tag=${var2})`
-   **Point Tag** - `ts(<metricName>, \<pointTagKey\>=${var2})`. Here, `pointTagKey` must match the key you set up when you created the dynamic dashboard variable.
