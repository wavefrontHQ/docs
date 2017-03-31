---
title: Units in Chart Axes and Legends
keywords: charts
tags: [charts]
sidebar: doc_sidebar
permalink: charts_units.html
summary: This topic describes how to configure units in charts.
---


Wavefront supports several options to control how units display in chart axes and legends.  All of these option affect only the display of data and do not change the underlying stored data values, or the results of queries made directly against the API.  This also means that any constants used in queries, including thresholds, continue to use the raw underlying data without any unit scaling.

## Unit Prefixes
Charts support two unit prefixes: **SI** and **IEC/Binary**. SI unit prefixes (k, M, G, T, P, E, Z, Y) increment with a factor of 1000 and are used by default. IEC/Binary prefixes (Ki, Mi, Gi, Ti, Pi, Ei, Zi, Yi) increment with a factor of 1024. When the IEC/Binary option is checked, data in axes and legends display with IEC/Binary unit prefixes rather than SI unit prefixes, so e.g. a raw data point of value 1024 x 1024 = 1,048,576 show as “1.000Mi”, as opposed to “1.049M”. Options to show raw underlying data are not affected by this option, so legends shown by holding down the shift button while moving the mouse and tables with the **Show raw values** option checked continue to display the raw data without any prefixes.
 
## Dynamic Units
Dynamic units automatically adjusts the scaling prefixes and units assigned to displayed data to favor clearer display.  When enabled, dynamic units causes two types of transformations:
 
When an axis is labeled with a unit that starts with one of the SI or IEC/Binary prefixes, the display logic first normalizes the data value with the labeled prefix before assigning a new prefix and adjusting the unit as appropriate.  For example, if an axis is labeled “Mpps” (Mega pps, or 1 Million pps), and the underlying data has a value of 2000, the displayed value with “Dynamic units” enabled would be “2.000B pps”, rather than “2.000k Mpps” without “Dynamic units” checked.  Again, options to show raw underlying data are not affected, so the above example displays “2000 Mpps” if, e.g., the shift key is held down while a legend is rendered.

When an axis is labeled with a unit that exactly matches one of the time units, (ys, zs, as, fs, ps, ns, us, ms, s, min, hr, day, wk, mo, yr), the display logic for axes and legends automatically first normalizes the underlying data to seconds.  Then it displays the data using units ys through s if the normalized data magnitude is < 60, or else it automatically scales the data using larger time unit if the magnitude is > 60, with the goal of keeping the magnitude as small as possible.  So, if the underlying data is 60,000 and the axis is labeled with ms (milliseconds), this results in a display of “1.000 min”.  If data is still 60,000 and the axis is labeled with “s”, then the display is “16.67 hr”.  If the underlying data is again 60,000 and the axis is instead labeled with us (microseconds), this displays “60.00m s”. Again, options to show raw underlying data are not affected, so the above example displays “60000” with whatever unit label is specified when raw data display is requested.
 
## Example
  
The following chart represents request latency data for a single source. The values associated with the displayed series are in milliseconds. If the data values stay in this range, then dynamic units may not be needed.
 
**ts("requests.latency, source="app-5")**

![example_without_units](images/example_without_units.png)

However, what if the values tend to exceed thousands of milliseconds? This can be emulated by multiplying the original ts() expression by 10,000:
 
**ts("requests.latency", source="app-5") * 10000**

![example_with_high_values](images/example_with_high_values.png)

The values being displayed on the Y-axis are still being displayed as milliseconds by default, so they range between 1M milliseconds and 2.2M milliseconds. In contrast, dynamic units would display the values in minutes for a more usable representation.

To turn on dynamic units:

1. In the Chart section, select the **Axis** tab.
1. Select the **Dynamic units** checkbox.
  ![axis_tab_initial_view](images/axis_tab_initial_view.png)

1. In the **Units** dropdown above the checkbox, select **Time**:
  ![axis_tab_time_option](images/axis_tab_time_option.png)

1. Select **milliseconds (ms)**:

      ![millisecond_option](images/millisecond_option.png)

Now looking back at the same chart with the millisecond values in the thousands displays as seconds on the Y-axis:
 
**ts("requests.latency", source="app-5") * 10000**

  ![minute_view](images/minute_view.png)

{% include links.html %}
