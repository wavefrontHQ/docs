---
title: Keyboard Shortcuts and Accessibility Improvements
tags: [accessibility, keyboard navigation, keyboard shortcuts]
sidebar: doc_sidebar
permalink: wavefront_keyboard_shortcuts.html
summary: Use the keyboard shortcuts to navigate through pages and menus.
---

Tanzu Observability by Wavefront is committed to continuous improvement of product accessibility. We recently addressed accessibility issues and included level-A accessibility fixes for keyboard navigation and colorblind support. We also addressed several level-AA accessibility issues. Here are some highlights:

* Keyboard shortcuts allow you to navigate through pages and menus without using a mouse.
* Color contrast supports colorblind accessibility. We continuously check our UI elements and change color as needed.

## Accessibility Improvements

Starting with the 2021-26.x release, we included these accessibility improvements:

* More color contrast improvements to support colorblind accessibility, for example in all charts and dashboards, including operational and service dashboards.
* A redesigned color picker with a new color palette.
  * Light UI theme:

    ![Color picker for light theme](images/color-picker.png)

  * Dark UI theme:

    ![Color picker for dark theme](images/color-picker-dark.png)
* Keyboard navigation support in more UI pages.
* Drag-and-drop functionality that allows you to rearrange items.


## UI Pages With End-to-End Keyboard Navigation Support

The end-to-end keyboard navigation is fully supported in the UI pages listed below. The documented way for navigating to the respective page is provided as an example, because you can access these pages in multiple ways.

* Dashboards Browser page

  You can access it by navigating to **Dashboards > All Dashboards** from the toolbar.

* Dashboard page

  You can access it by navigating to a specific dashboard from the Dashboards Browser page.

* Create a dashboard wizard

  You can access it by navigating to **Dashboards > Create Dashboard** from the toolbar.

* Alerts Browser page

  You can access it by navigating to **Alerting > All Alerts** from the toolbar.

* Alert Viewer page

  You can access it by navigating to a specific alert from the Alerts Browser page.

* Events list page

  You can access it by navigating to **Browse > Events** from the toolbar.

* Chart page

  You can access it by navigating to a specific chart from the Dashboard page or by navigating to **Dashboards > Create Chart** from the toolbar.

* Integrations list page

  You can access it by navigating to **Integrations** from the toolbar.

* Kubernetes integration page

  You can access it by navigating to **Kubernetes** from the Integrations list page.

* Sources Browser page

  You can access it by navigating to **Browse > Sources** from the toolbar.

* Maintenance Windows page

  You can access it by navigating to **Browse > Maintenance Windows** from the toolbar.

* User profile page

  You can access it by navigating to your profile from the gear icon <i class="fa fa-cog"/> on the toolbar.

* Metrics Browser page

  Navigate to **Browse > Metrics** from the toolbar.

## Drag-and-Drop Keyboard Navigation

The drag-and-drop keyboard navigation is available when you create or edit charts and when you create or edit metrics security policies.

To use the drag-and-drop navigation:

1. To enter drag mode, press **spacebar**.
2. Use the arrow keys to move the item, for example a query line.
3. Press **spacebar** to drop the item in its new position.

With the drag-and-drop keyboard navigation you can rearrange:

* Query lines
* Functions within a query line in Query Editor
* Variables
* List values when you add variables to a dashboard
* Metrics Security Policy rules

## Keyboard Shortcuts and Their Usage

<table>
<tbody>
<thead>
<tr><th width="35%">Keyboard Shortcut</th><th width="65%">Allows you to:</th></tr>
</thead>
<tr>
<td><strong>Tab</strong> and <strong>Shift+Tab</strong></td>
<td>Navigate forward and backward through the UI elements on a page level. Also allow you to navigate through UI elements such as text boxes and the Query Editor.</td>
</tr>
<tr>
<td><strong>Arrow keys</strong></td>
<td>Navigate between items in a list, such as a drop-down menu or any other menu.</td>
</tr>
<tr>
<td><strong>Home</strong> and <strong>End</strong> keys or <strong>Cmd+Up</strong> and <strong>Cmd+Down</strong> for Safari</td>
<td>Navigate to the first and last main menu item, respectively, when the focus is on any main menu item.</td>
</tr>
<tr>
<td><strong>Enter</strong></td>
<td>Perform the action the element is meant to do. For example, if the element is a button, pressing <strong>Enter</strong> is the same as clicking the button. Pressing <strong>Enter</strong> when the element is a link, opens the link. </td>
</tr>
<tr>
<td><strong>Esc</strong> or <strong>Opt+Esc</strong> for Safari</td>
<td>Close a pop-up window or any opened menu, such as a drop-down menu, or an ellipsis icon menu. Returns you to the parent or closest interactive element if the current component disappears. Always orients you on the page post an action.
</td>
</tr>
<tr>
<td><strong>Spacebar</strong></td>
<td>Select or deselect a check box, click a button, and enter drag-and-drop mode. <ul>
<li>You can also select or deselect check boxes and click buttons by pressing <strong>Enter</strong>, but it is not mandatory.</li>
<li>Drag-and-drop functionality is supported, for example, when you create or edit charts, when you add list variables, on the Metrics Security Policy page, and so on. To enter drag mode, press <strong>spacebar</strong>, use the arrow keys to rearrange the items, and press <strong>spacebar</strong> again to drop an item in its new position.</li></ul></td>
</tr>
<tr>
<td><strong>Shift</strong></td>
<td>Show the entire raw data for a chart legend. 
<p>Change the time window of all charts in a dashboard. <p>For example, you can zoom in or zoom out one of the charts and press the <strong>Shift</strong> key at the same time. The time window changes will apply to all charts in the dashboard for which the time window settings are set to <strong>Default to dashboard time window</strong>.</p></p>
</td>
</tr>
<tr>
<td><strong>Ctrl</strong> or <strong>Command</strong> </td>
<td>Temporarily hide the legend when you hover over a chart.
</td>
</tr>
<tr>
<td><strong>Ctrl+Click</strong></td>
<td>Selectively highlight the metrics in a chart, based on series or sources.
</td>
</tr>

</tbody>
</table>
