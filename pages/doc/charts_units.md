---
title: Units in Chart Axes and Legends
keywords: charts
tags: [charts]
sidebar: doc_sidebar
permalink: charts_units.html
summary: Learn how to configure the units displayed in chart axes and legends.
---
Wavefront supports several options to control how units display in chart axes and legends.  All of these option affect only the display of data and do not change the underlying stored data values, or the results of queries made directly against the API.  This also means that any constants used in queries, including thresholds, continue to use the raw underlying data without any unit scaling.

## Unit Prefixes
Charts support two unit prefixes: **SI** and **IEC/Binary**. SI unit prefixes (k, M, G, T, P, E, Z, Y) increment by a factor of 1000 and are used by default. IEC/Binary prefixes (Ki, Mi, Gi, Ti, Pi, Ei, Zi, Yi) increment by a factor of 1024. 

To display data in axes and legends with IEC/Binary unit prefixes rather than SI unit prefixes, select the **IEC/Binary Unit Prefixes** checkbox. A data point with value 1024 x 1024 = 1,048,576 displays as "1.000Mi", instead of "1.049M". 

Options to show raw underlying data are not affected by this option. Legend displays when holding down the shift button while moving the mouse and Tabular View charts with the **Show Raw Values** option selected continue to display raw data without any prefixes.
 
## Dynamic Units
Dynamic units automatically adjusts the scaling prefixes and units assigned to displayed data to favor clearer display.  When enabled, dynamic units causes two types of transformations:
 
- When an axis is labeled with a unit that starts with one of the SI or IEC/Binary prefixes, the display logic first normalizes the data value with the labeled prefix before assigning a new prefix and adjusting the unit as appropriate.  For example, if an axis is labeled "MPPS" (Mega PPS, or 1 million PPS), and the underlying data has a value of 2000, the displayed value with "Dynamic units" enabled would be "2.000B PPS", rather than "2.000k MPPS".

  Options to show raw underlying data are not affected, so the above example displays "2000 MPPS" if, e.g., the shift key is held down while a legend is rendered.

- When an axis is labeled with a unit that exactly matches one of the time units, (ys, zs, as, fs, ps, ns, us, ms, s, min, hr, day, wk, mo, yr), the display logic for axes and legends automatically first normalizes the underlying data to seconds.  Then it displays the data using units ys through s if the normalized data magnitude is < 60, or automatically scales the data using larger time unit if the magnitude is > 60, with the goal of keeping the magnitude as small as possible.  So, if the underlying data is 60,000 and the axis is labeled with ms (milliseconds), this results in a display of "1.000 min".  If data is still 60,000 and the axis is labeled with "s", then the display is "16.67 hr".  If the underlying data is again 60,000 and the axis is labeled with us (microseconds), it displays "60.00m s".

  Options to show raw underlying data are not affected, so the above example displays "60000" with whatever unit label is specified when you specify raw data display.
 
### Example
  
The following chart represents request latency data. The values associated with the displayed series are in hundreds of milliseconds, ranging between 156 and 174 ms. If the data values stay in this range, dynamic units are not needed.

![example_without_units](images/example_with_microseconds.png)

However, what if the values were in the hundred thousands of milliseconds? You can emulate this by multiplying the original ts() expression by 1000:
 
![example_with_high_values](images/example_with_high_values.png)

The values displayed on the Y-axis are still displayed as milliseconds, so they range between 156K milliseconds and 174K milliseconds.

Turn on dynamic units:

1. In the Chart section, select the **Axis** tab.
1. Select the **Dynamic Units** checkbox.

The same chart with the millisecond values in the hundred thousands displays as minutes on the Y-axis:

  ![minute_view](images/example_with_minutes.png)


