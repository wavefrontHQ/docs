---
title: Dashboard Variables
keywords: dashboards
tags: [dashboards]
sidebar: doc_sidebar
permalink: dashboards_variables.html
summary: Learn how to use dashboard variables.
---
A dashboard variable is a placeholder that allows you to dynamically change the components of a query.

Dashboard variables enable text replacement. Wavefront supports three types of dashboard variables:
* Simple - Maps a single variable to a single value. When you change the variable value, it changes in all charts on your dashboard.
* List - Maps a variable label to a list of labels and values that users can choose from.
* Dynamic - Defines a variable whose set of values are dynamically determined by a query.

All Wavefront users can select and temporarily alter the value of a dashboard variable.

{% include shared/permissions.html entity="dashboards" entitymgmt="Dashboard" %}

## Dashboard Variable Use Cases

Dashboard variables can contain:
* Metric names
* Filters
* Advanced functions
* A string such as ")))", which could be inserted at the end of an query.


Different types of dashboard variables can help in different ways:

- **Simple**: Use a simple dashboard variable if you want to update all your charts to query for a different item, for example, for a different source.
- **List**: Use a list variable to present choices. The following example shows a variable that allows users to display components with a contract duration of 1 year or 3 years. After the user selects the options, all charts in the dashboard that use the variable are updated.

  ![Variable Name.png](images/db_var_name.png)
- **Dynamic**: Use a dynamic variable to interactively change your dashboard based on the source, source tag, matching source tag, metric, or point tag.

## Accessing Dashboard Variables

To access the variables associated with a dashboard, click the icon to the left of the pen in the dashboard icon group in the top right corner of the task bar ![db_actions.png](images/db_actions.png#inline).


## Creating a Dashboard Variable

1.  Put your dashboard into edit mode by clicking the pencil icon at the far right of the task bar.

    - If no dashboard are defined, click **Create**.

    - If there is at least one variable associated with the dashboard, click the plus (+) icon.

2.  Inside the Variables pane, click the pen icon.

    ![variables edit icon](images/variables_edit.png)

3.  In the Variable Details dialog box, specify the variable name and label, and select the Variable Type. Fill in remaining fields depending on the variable type: [simple](#simple), [list](#list), and [dynamic](#dynamic).
4.  Click **Hide from non-editors** to make your dashboard variable non-viewable/non-changeable by all users when the dashboard is not in edit mode. The dashboard variable can still be used in `ts()`` queries and becomes visible when you put the dashboard into edit mode.

## Using Dashboard Variables

You use a dashboard variable by referencing its name in a `ts()` expression using the syntax `${variableName}`. For example,
1. Define a variable `az` and give it the value `tag=az-3 or source=app-3`.
2. Use the variable in a query like this:
   `ts(cpu.loadavg.1m, ${az})`.

When this query is executed, Wavefront replaces `${az}` with the current variable value: `ts(cpu.loadavg.1m, tag=az-3 or source=app-3)`.

<span id="simple"></span>

## Simple Dashboard Variables

A *simple dashboard variable* maps a single variable to a single value.

To create a simple dashboard variable:
1. Enter a variable name (case sensitive). We suggest keeping the variable name short.
2. Enter the label.
Click **Save** to save the dashboard and the dashboard variable.

To use a simple dashboard variable:
1. Give the variable a value from the Variables section of the dashboard.
  1. Edit the dashboard to make a permanent change.
  2. Click the value in the dashboard's Variables section and replace the existing value for a temporary change.
2. In your query or queries, enter the string of text that you'd like to replace.


<span id="list"></span>

## List Dashboard Variables

A *list dashboard variable* maps a variable label to a list of labels and values. These variables allow users to set a list of values to choose from.

For example:
1. Suppose that sources located in Availability Zone 1 are production and Availability Zone 2 are development.
2. You can define a list variable `environment` with label **Datacenter** with options  **Production** and **Development**.
3. Users can use the `{environment}` variable in queries, and pick **Production** or **Development**. Wavefront maps to the correct availability zone, and users don't have to know the underlying information.

To create a list dashboard variable:
1. Enter a variable name (case sensitive) and a label. We suggest keeping the variable name short.
2. Select **Variable Type > List**:

![list var with non-editor hide.png](images/db_var_list_with_non-editor_hide.png)

3. Add, remove, or clone fields by using the icons on the right.

![list var with non-editor hide and parameters.png](images/db_var_list_with_non-editor_hide_and_parameters.png)

4. Click **Accept** and click **Save** to save your dashboard and the dashboard variable.

To use a list dashboard variable:
1. Find the variable in the variables section at the top of the dashboard.
2. Select the variable value from the dropdown.

For example, using the example above, selecting **Production** replaces `{environment}` in any ts() query in charts in the dashboard with **tag=az-1** and selecting **Development** replaces `{environment}` in a ts() query with **tag=az-2**.

![Varible list.png](images/db_var_list.png)

<span id="dynamic"></span>

## Dynamic Dashboard Variables

A *dynamic dashboard variable* defines a variable whose set of values are dynamically determined by a query.

For example, you could set up a query that returns a CPU metric based on the customer. You've specified the point tag `customer` before.

**Note** Dynamic dashboard variables allow you to specify only a single metric name, source, source tag, or point tag at a time. Use simple or list dashboard variables if you want to use wildcards that return more than 1 metric name, source, source tag, or point tag.

To create a dynamic variable:
1. Put the dashboard into edit mode and add or edit a variable.
2. Specify the Variable Type **Dynamic**.
3. In the Field pulldown menu, select the field and Query field displays.
4. Type the query, using the field type, for example a metric with a wildcard in it, and select one of the options in the list that appears. 

![dynamic with field options.png](images/db_var_dynamic_with_field_options.png)

### Field Options

Dynamic dashboard variables allow you to select one of the following options:

-   **Source** - Populates the variable with sources associated with the query in the Query field.
-   **Source Tag** - Populates the dynamic variable list with source tags that match `"tag="` part of your ts() expression. For example `ts(cpu.load, tag=app*)` will populate the dynamic variable list with `"app-tag1"`, `"app-tag2"` and so on.
-   **Matching Source Tag** - This will get all of the sources from your ts() expression, then, find all the source tags associated with those sources and populate the dynamic variable list with those source tags. If the query returns at least 1 source associated with a source tag, **Matching Source Tag** will display source tags.
-   **Metric** - Populates the variable with metrics associated with the query in the Query field.
-   **Point Tag** - Populates the variable with point tag values (of the point tag key in Point Tag Key field) associated with the query in the Query field.

### Dynamic Variable Example

Suppose you want to populate a variable with list of metrics that start with **~sample.cpu** or **~sample.mem.**.

To create the example dynamic variable:
1. Create a new variable, call it **Variable3** and select **Type > Dynamic**
2. Choose **Field > Metric**, type `ts("sample.cpu*" or "sample.mem*")` in the Query field, and press **Enter**:

![Variable dynamic query](images/db_var_dynamic_query.png)

A Current Values field displays every metric name that matches the query. As with list variables, you can select a specific value as the default.
3. Select a default value and click **Accept**.
4. Click **Save** to save your dashboard and the dashboard variable.

To use the example dynamic variable:

After you save the dynamic dashboard variable, you can enter that variable name into a ts() query. For example:
1. Create a chart with a query `ts(${Variable3})`.
2. Select the option of your choice from the **Variable3** pulldown menu to replace the variable.

![Dynamic query options](images/db_var_dynamic.png)

### Using Dynamic Dashboard Variables with Different Fields

The example above uses the **Metric** field. To use instead a dynamic dashboard variable **var2** that refers to a source, source tag, or point tag, use one of the following queries:

-   **Source** - `ts(<metricName>, source=${var2})`
-   **Source Tag** - `ts(<metricName>, tag=${var2})`
-   **Point Tag** - `ts(<metricName>, \<pointTagKey\>=${var2})`. Here, `pointTagKey` must match the key you set up when you created the dynamic dashboard variable.
