---
title: Dashboard Variables (v1)
keywords: dashboards
tags: [dashboards]
sidebar: doc_sidebar
published: false
permalink: dashboards_variables_v1.html
summary: Learn how to use dashboard variables.
---

<table style="width: 100%;">
<tbody>
<tr>
<td width="80%">
<br>
When you use a dashboard variable, you change that variable in all queries on all charts that use the variable. As a result, users can update many charts at once, for example, to change to a different environment or a different customer. Developers can set up the variables so users only have to pick items from a list.
<strong>Note:</strong> All Wavefront users can examine all dashboards and charts unless an individual dashboard is protected through access control. All users can make temporary changes. To save changes to dashboards and charts you must have Dashboard permission.</td>
<td width="20%"><a href="dashboards_variables.html"><img src="/images/v2_button.png" alt="click here for the v2 doc"/></a></td>
</tr>
</tbody>
</table>


## Dashboard Variable Use Cases

Dashboard variables can contain:
* Metric names
* Filters
* Advanced functions
* A string such as ")))", which could be inserted at the end of a query.

Different types of dashboard variables can help in different ways:

- **Simple**: Maps a single variable to a single value. Use a simple dashboard variable if you want to update all charts on the dashboard to query for a different item, for example, for a different source.
- **List**: Use a list variable to present choices. The following example shows a list variable that allows users to make all charts in a dashboard use a contract duration of 1 year or 3 years.

  ![Variable Name.png](images/db_var_name.png)
- **Dynamic**: Use a dynamic variable to show choices that interactively change your dashboard based on the source, metric, point tag, and other options.

## Access Dashboard Variables

To access the variables associated with a dashboard, click the icon to the left of the pen in the top right corner of the taskbar ![db_actions.png](images/db_actions.png#inline).

## Create a Dashboard Variable

To create a dashboard variable:

1.  Put your dashboard into edit mode by clicking the pencil icon in the top right corner of the taskbar.

    - If no dashboard variables are defined, click **Create**.
    - If at least one variable is associated with the dashboard, click the plus (+) icon.

2.  Inside the Variables pane, click the pen icon.

    ![variables edit icon](images/variables_edit.png)

3.  In the Variable Details dialog box, specify the variable name and label, and select the Variable Type. Fill in remaining fields depending on the variable type: [simple](#simple), [list](#list), and [dynamic](#dynamic).
4.  To make your dashboard variable non-viewable/non-changeable when the dashboard is not in edit mode, click **Hide from non-editors**. The dashboard variable can still be used in ts() expressions and is visible when you put the dashboard into edit mode.

## Use Dashboard Variables in Queries

You reference a variable in a ts() expression using the syntax `${variableName}`. For example:
1. Define a variable `az` and give it the value `tag=az-3 or source=app-3`.
2. Use the variable in a query like this:
   `ts(cpu.loadavg.1m, ${az})`.

When Wavefront executes this query, it replaces `${az}` with the current variable value and executes this query: `ts(cpu.loadavg.1m, tag=az-3 or source=app-3)`.

<span id="simple"></span>

## Simple Dashboard Variables

A simple dashboard variable maps a single variable to a single value.

To create a simple dashboard variable:
1. Enter a variable name (case sensitive). We suggest keeping the variable name short.
2. Enter the label.
Click **Save** to save the dashboard and the dashboard variable.

To use a simple dashboard variable:
1. Give the variable a value from the Variables section of the dashboard in one of these ways:
  * To make a permanent change, edit the dashboard.
  * To make a temporary change, specify the value in the dashboard's Variables section.
2. In your query or queries, use the variable where you'd like to use the string of text.


<span id="list"></span>

## List Dashboard Variables

A list dashboard variable maps a variable label to a list of labels and values. List variables allow you to present users with a list of values to choose from.

To create a list dashboard variable:
1. Enter a variable name (case sensitive) and a label. We suggest keeping the variable name short.
2. Select **Variable Type > List**:
3. Add, remove, or clone fields by using the icons on the right and set the default.
  ![list var with non-editor hide and parameters.png](images/db_var_list_with_non-editor_hide_and_parameters.png)
4. Click **Accept** and click **Save** to save your dashboard and the dashboard variable.

To use a list dashboard variable:
1. Find the variable in the variables section at the top of the dashboard.
2. Select the variable value from the dropdown.



**List Dashboard Variable Example**
1. Suppose that sources located in Availability Zone 1 are production and Availability Zone 2 are development.
2. You can define a list variable with:
   * name: **environment**
   * label **Datacenter**
   * options  **Production** and **Development**

![Varible list.png](images/db_var_list.png)

3. Users can:
  1. Use the variable as `${environment}`  in queries
  2. Pick **Production** or **Development** from the Datacenter field in the Variables section at the top of the dashboard.
Wavefront maps to the correct availability zone, and users don't have to know the underlying information.

<span id="dynamic"></span>

## Dynamic Dashboard Variables

A dynamic dashboard variable is a variable whose set of values are dynamically determined by a query.

For example, you could set up a query that returns a CPU metric based on the customer. You've specified the point tag `customer`, and set up a variable that allows you to pick the value for the `customer` point tag.

**Note** Dynamic dashboard variables allow you to specify only a single metric name, source, source tag, or point tag at a time. Use simple or list dashboard variables if you want to use wildcards that return more than 1 metric name, source, source tag, or point tag.

### Dynamic Dashboard Variable Field Options

Dynamic dashboard variables allow you to select one of the following options:

-   **Source** - Populates the dynamic variable list with sources associated with the query in the Query field.
-   **Source Tag** - Populates the dynamic variable list with source tags that match `"tag="` part of your ts() expression. For example `ts(cpu.load, tag=app*)` populates the dynamic variable list with `"app-tag1"`, `"app-tag2"` and so on.
-   **Matching Source Tag** - This will get all of the sources from your ts() expression, then, find all the source tags associated with those sources and populate the dynamic variable list with those source tags. If the query returns at least 1 source associated with a source tag, **Matching Source Tag** will display source tags.
-   **Metric** - Populates the  dynamic variable list with metrics associated with the query in the Query field.
-   **Point Tag** - Populates the  dynamic variable list with point tag values (of the point tag key in Point Tag Key field) associated with the query in the Query field.
    **Note**: Always surround point tag values with double quotes. For example, in queries use `env="qa 3"` and in a dashboard's variable selector, type `"qa 3"`.

The example below uses the **Metric** field to populate a dynamic variable list.

If you define a dynamic dashboard variable named **var2** that refers to a source, source tag, or point tag, you use `${var2}` in a query like this:

-   **Source** - `ts(<metricName>, source=${var2})`
-   **Source Tag** - `ts(<metricName>, tag=${var2})`
-   **Point Tag** - `ts(<metricName>, \<pointTagKey\>=${var2})`. Here, `pointTagKey` must match the key you set up when you created the dynamic dashboard variable.

### Create a Dynamic Dashboard Variable

To create a dynamic variable:
1. Put the dashboard into edit mode and add or edit a variable.
2. Specify the Variable Type **Dynamic**.
3. In the Field pulldown menu, select one of the options, for example, **Source**.
5. Type a query that uses the option you selected, for example, that uses `"source=`
6. Select a default value and click **Accept**.
4. Click **Save** in the top right to save your dashboard and the dashboard variable.

![dynamic with field options.png](images/db_var_dynamic_with_field_options.png)

Users can then use `${var2}` in queries, and select from the options in the field corresponding to the label.


### Dynamic Variable Example

Suppose you want to populate a variable with a list of metrics that start with **~sample.cpu** or **~sample.mem.**.

To create the example dynamic variable:
1. Create a new variable, call it **Variable3** and select **Type > Dynamic**
2. Choose **Field > Metric**, type `ts("mem.available*" or "cpu.usage*")` in the Query field, and press **Enter**:

  ![Variable dynamic query](images/db_var_dynamic_query.png)
  A Current Values field displays every metric name that matches the query. As with list variables, you can select a specific value as the default.
3. Select a default value and click **Accept**.
4. Click **Save** to save your dashboard and the dashboard variable.

To use the example dynamic variable:

After you save the dynamic dashboard variable, you can enter that variable name into a ts() query. For example:
1. Create a chart with a query `ts(${Variable3})`.
2. Select the option of your choice from the **Variable3** pulldown menu to replace the variable.

![Dynamic query options](images/db_var_dynamic.png)
