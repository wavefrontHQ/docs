---
title: Dashboard Variables
keywords: dashboards
tags: [dashboards]
sidebar: doc_sidebar
permalink: dashboards_variables_v2.html
summary: Define dashboard variables to allow easy switches between different data sources.
---
<table style="width: 100%;">
<tbody>
<tr>
<td width="80%">
Dashboard variables are an excellent way of focusing the metrics that a dashboard displays.
<ul>
<li>A person with Dashboard permissions can add or edit variables for a dasbhoard.  </li>
<li>Afterwards, everyone can select the variable for the dashboard, and we change the variable in all charts in all dashboards.</li>
<li> It's also possible to use dashboard variables in queries. The query uses the current vale of the variable.</li>
</ul>
<strong>Note:</strong> All Wavefront users can examine all dashboards and charts unless an individual dashboard is protected through access control. All users can make temporary changes. To save changes to dashboards and charts you must have Dashboard permission.</td>
<td width="20%"><a href="ui_examine_data.html"><img src="/images/classic_button.png" alt="click here for the classic doc"/></a></td>
</tr>
</tbody>
</table>

{% include shared/badge.html content="Every Wavefront user can view dashboards and make temporary changes. You must have Dashboard permission to save changes you make to dashboards." %}

All Wavefront users can select and temporarily alter the value of a dashboard variable.

## Dashboard Variable Use Cases

Dashboard variables make it easy for all users to refocus what a dashboard displays. For example:

* Dashboard editors can define the clusters or environments a dashboard is monitoring, and use variables in the charts that refer to the clusters. Users can then select the cluster or environment from a pull-down menu.
* Assume an environment that has a growing fleet of machines. You tag that fleet with `tag=prod`. You can then use a dynamic variable that refers to that tag, and a query that includes `tag=prod` will pick up all machines that are currently part of the fleet.

## How All Users Can Show and Change Variables

All users can show or hide the variables bar and can select from the predefined variables once the bar is visible. If no variables are defined for the dashboard, the show/hide icon is not visible.

![select variable](images/select_variable.png)


## How Dashboard Editor Users Can Create and Customize Variables

Users with Dashboard permissions can create variables and use them in queries. After the dashboard has been saved, the variable shows up in the dashboard bar and all users can make selections.

### Dashboard Variable Scope

Different types of dashboard variables can help in different ways:

- **Simple**: Maps a single variable to a single value. Use a simple dashboard variable if you want to update all charts on the dashboard to query for a different item, for example, for a different source.
- **List**: Use a list variable to present choices. The following example shows a list variable that allows users to make all charts in a dashboard use a contract duration of 1 year or 3 years.

  ![Variable Name.png](images/db_var_name.png)
- **Dynamic**: Use a dynamic variable to show choices that interactively change your dashboard based on the source, metric, point tag, and other options.

Dashboard variables can contain:
* Metric names
* Filters
* Advanced functions
* A string such as ")))", which could be inserted at the end of a query.


### Create a Dashboard Variable

To create a dashboard variable:

1. Put your dashboard into Edit mode by clicking the pencil icon in the top right corner of the task bar.
2. Click the **Add** icon in the variables bar.
3. In the Add Variable dialog box, specify
   1. Specify the **Variable Name** -- Name you can use in queries that use the variable. Keep this name short.
   2. Select the Variable Type.
   3. Fill in remaining fields depending on the variable type (discussed below):
      * [Simple variable](#simple)
      * [List variable](#list)
      * [Dynamic variable](#dynamic)
4. To make your dashboard variable invisible when the dashboard is not in edit mode, click **Hide when not in edit mode**. The dashboard variable can still be used in ts() expressions and is visible in edit mode.

### Edit a Dashboard Variable

Editing a dashboard variable is similar to creating a dashboard variable.

1. Put your dashboard into Edit mode by clicking the pencil icon in the top right corner of the task bar.
2. Click the **Edit** icon in the variables bar and select **Edit**.

   ![edit_or_reorder variables](images/edit_variable_v2.png)
3. In the Add Variable dialog box, specify
   1. Specify the **Variable Name** -- Name you can use in queries that use the variable. Keep this name short.
   2. Select the Variable Type.
   3. Fill in remaining fields depending on the variable type (discussed below):
      * [Simple variable](#simple)
      * [List variable](#list)
      * [Dynamic variable](#dynamic)
4. To make a dashboard variable invisible when the dashboard is not in Edit mode, click **Hide when not in edit mode**. The dashboard variable can still be used in ts() expressions and is visible in edit mode.

### Clone or Delete a Dashboard Variable

To clone or delete a dashboard variable:
1. Put your dashboard into Edit mode by clicking the pencil icon in the top right corner of the task bar.
2. Select **Clone** or **Delete** from the pencil icon pull-down menu.

## Use Dashboard Variables in Queries

You reference a variable in a ts() expression using the syntax `${variableName}`.

**Note:** Use Query Editor if you want to use variables. Chart Builder does not support them.

Here's an example that uses a simple variable:

1. Define a variable `az` and give it the value `tag=az-3 or source=app-3`.
2. Using Query Editor, use the variable in a query like this:

   `ts(cpu.loadavg.1m, ${az})`.

3. When Wavefront executes this query, it replaces `${az}` with the current variable value and executes this query:

   `ts(cpu.loadavg.1m, tag=az-3 or source=app-3)`.

<span id="simple"></span>

## Create a Simple Dashboard Variables

A simple dashboard variable maps a single variable to a single value. Simple variables are useful, for example, if you want to use a complex filter in multiple queries and you don't want to repeat the complex filter each time. The example above illustrates this.

### Create a Simple Dashboard Variable

1. Put your dashboard into Edit mode by clicking the pencil icon in the top right corner of the task bar.
1. Click the **Add** icon in the variables bar.
1. Enter a variable name (case sensitive). Keep the name short - this is what you'll use in queries.
1. Select **Simple** from the pull-down menu.
1. (Optional) Enter an initial value for the variable.
1. (Optional) Change the display name if you want to show something different in the Variables bar.
1. Click **Accept** to save the dashboard variable, the **Save** again to save the dashboard.

### Use a Simple Dashboard Variable

1. Give the variable a value from the Variables section of the dashboard in one of these ways:
  * To make a permanent change, edit the dashboard.
  * To make a temporary change, specify the value in the dashboard's Variables section.
2. In your query or queries, use the variable as {$myvar} where you'd like to use the string of text.


<span id="list"></span>

## List Dashboard Variables

A list dashboard variable allows users to pick a value from a list.

### Create a List Dashboard Variable

1. Put your dashboard into Edit mode by clicking the pencil icon in the top right corner of the task bar.
1. Click the **Add** icon in the variables bar.
1. Enter a variable name (case sensitive). Keep the name short - this is what you'll use in queries.
2. Select **Variable Type > List**. Each row lets you specify a display name and variable value. When the user selects the item from the menu, we use the specified value in all queries that use the variable.
![list_variable](images/list_variable_example.png)
   1. Add, remove, or clone fields by using the icons on the right
   2. (Optional) Set the default.
4. Click **Accept** and click **Save** to save your dashboard.

### Use a List Dashboard Variable

All users can set the value of the list variable:
1. Find the variable in the variables bar at the top of the dashboard.
2. Select the variable value from the dropdown.

   ![Varible list.png](images/db_var_list.png)

Users with Dashboard permission can use the variable in queries. The results of all queries in the dashboard that use the variable change when the variable value changes.


### List Dashboard Variable Example

1. Suppose that sources located in Availability Zone 1 are production and Availability Zone 2 are development.
2. You can define a list variable with:
   * Name: **env**
   * Options:<br>
     ![variable options](images/list_variable_options.png)
   * Label **Datacenter**

3. Users who edit charts can use the variable in queries as `${env}`.
4. All users can select **Production** or **Development** from the **Datacenter** menu in the variables bar to set the value of `${env}` to `prod` or `dev`

<span id="dynamic"></span>

## Dynamic Dashboard Variables

The values of a dynamic dashboard variable are dynamically determined by a query. You use a dynamic variable if you can't predict ahead of time what the available choices are. For example, if you know that the datacenter is environment or production, you can use a list variable. But if you want to allow users to select from a list of hosts, and the actual hosts change, you use a dynamic variable.

**Note** Dynamic dashboard variables allow you to specify only a single metric name, source, source tag, or point tag at a time. Use simple or list dashboard variables if you want to use wildcards that return more than 1 metric name, source, source tag, or point tag.

### Dynamic Dashboard Variable Field Options

Dynamic dashboard variables allow you to select one of the following options:

-   **Source** - Populates the dynamic variable list with sources associated with the query in the Query field.
-   **Source Tag** - Populates the dynamic variable list with source tags that match `"tag="` part of your ts() expression. For example `ts(cpu.load, tag=app*)` populates the dynamic variable list with `"app-tag1"`, `"app-tag2"` and so on.
-   **Matching Source Tag** - This will get all of the sources from your ts() expression, then, find all the source tags associated with those sources and populate the dynamic variable list with those source tags. If the query returns at least 1 source associated with a source tag, **Matching Source Tag** will display source tags.
-   **Metric** - Populates the  dynamic variable list with metrics associated with the query in the Query field.
-   **Point Tag** - Populates the  dynamic variable list with point tag values (of the point tag key in Point Tag Key field) associated with the query in the Query field.

The example below uses the **Metric** field to populate a dynamic variable list.

If you define a dynamic dashboard variable named **var2** that refers to a source, source tag, or point tag, you use `${var2}` in a query like this:

-   **Source** - `ts(<metricName>, source=${var2})`
-   **Source Tag** - `ts(<metricName>, tag=${var2})`
-   **Point Tag** - `ts(<metricName>, \<pointTagKey\>=${var2})`. Here, `pointTagKey` must match the key you set up when you created the dynamic dashboard variable.

### Create a Dynamic Dashboard Variable

The following example uses the

1. Put your dashboard into Edit mode by clicking the pencil icon in the top right corner of the task bar.
1. Click the **Add** icon in the variables bar.
2. Specify the Variable Type **Dynamic**.
3. In the Field pulldown menu, select one of the options, for example, **Source**.
5. Type a query that uses the option you selected, for example, that uses `"source=`
6. Select a default value and click **Accept**.
4. Click **Save** in the top right to save your dashboard and the dashboard variable.

![dynamic with field options.png](images/db_var_dynamic_with_field_options.png)


### Use the Dynamic Variable

1. Find the variable in the variables bar at the top of the dashboard.
2. Select the variable value from the dropdown.

Users can then use `${var2}` in queries, and select from the options in the field corresponding to the label.


### Dynamic Variable Example

The following example uses the `~sample` data included in your Wavefront instance.

First, we create the dynamic variable:
1. Specify a variable name and type Dynamic.
2. Select the field **Source**
3. Specify a query that you could filter by source, in this example, 1ts(~sample.cpu.loadavg.1m)
   As soon as we've specified the query, the Current Values list is populated. This list is updated dynamically.
4. (Optional) Change the default and hide the variable when the dashboard is not in Edit mode.
5. Specify a display name and click **Accept**, then click **Save** to save the dashboard.

  ![Dynamic variable](images/create_dynamic_variable.png)
  A Current Values field displays every metric name that matches the query. As with list variables, you can select a specific value as the default.
3. Select a default value and click **Accept**.
4. Click **Save** to save your dashboard and the dashboard variable.


After we've saved the dynamic dashboard variable, we can use the variable in queries. :
1. Create a chart with the following query:
   `ts(~sample.cpu.loadav.1m, source={$source})`
2. When users change the value of the **Source** variable in the dashboard, the query uses the selected value. 
