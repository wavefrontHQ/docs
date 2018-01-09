---
title: Detecting Anomalies With Functions and  Statistical Functions
keywords: query language
tags: [query language, videos, best practice]
sidebar: doc_sidebar
permalink: query_language_statistical_functions_anomalies.html
summary: Learn how to use simple functions and statistical functions in Wavefront Query Language expressions to detect anomalies.
---
Anything that is different than "normal" can be an anomaly. Say you have a set of data points that span across a certain range, there are multiple ways to define which points of these set can be treated as normal and which should be identified as abnormal. These abnormal points if cross a certain threshold would in turn create an "anomaly" in the behavior of a certain time-series or a signal. If you are interested and want to learn more about anomaly and its detection see the blog [Why is Operational Anomaly Detection So Hard?](https://www.wavefront.com/why-is-operational-anomaly-detection-so-hard/) and the following video:

{% include video.html file="lytshn66rj" %}

You can examine trends using simple functions or statistical functions.
* Simple functions can give insight into rate of change and trends.
* Statistical functions like mean, median, range, standard deviation, and inter-quartile range are great to understand the central tendency and the variability in your dataset. You can then decide how much variability is normal and then whatever datasets cross a certain threshold or do not fall in this normal set would be detected as an anomaly.

## Simple Functions
A great way to do dynamic anomaly detection based on your own data’s performance is a query like the following:
``${data} / lag(10m.${data})``
The result shows a 10 minute range of change as a ratio. You can change the time period to 1d or 30m to get the information you need.

This query calculates a rate of change between the current data and data from the series’ past performance.  This results in a ratio of the current metric now against the past data.  This ration helps you detect short-term changes, or day-by-day, or even week-by-week changes.

## Mean and Median
The `mean` and `median` functions can help you understand the tendency of the data. Mean gives you the average of set of values. Median gives you the number found in the middle of the set of values.

The `median` function is more robust in dealing with outliers than `mean` because outliers tend to move the mean towards the outlier value. The mean value is affected and fluctuates easily even with single outlier. You can see here how `mean` and `median` behave in case of sudden spikes in the http requests hitting a particular host.
* If you consider these spikes as anomalies, use `mean` as your function to catch all similar deviations or variability.
* If you consider the spikes as noise and want to ignore one-off spikes, use `median`, which is less sensitive to outliers or variations like these, and shows only show sustained dips.

![mean_median](images/mean_median.png)

## Standard Deviation (Std Dev) and Inter-Quartile Range (IQR)

While the `mean` and `median` functions can help you understand the central tendency of the data, Std Dev and IQR are used to measure the spread of the data. If you want to use a level of dispersion or spread of the data as a function to define normal you should use these functions to catch anomalies.

Standard deviation and IQR react to outliers (and skewed data to some extent) in a similar way as their centers, mean and median respectively. Std Dev lets you understand the spread of the data over a range but is more sensitive to outliers and skewed data where as IQR is more robust against them.

Tightly packed data -- data whose values don't vary over a wide range -- have a low standard deviation value (closer to 0). A data set whose values are spread across a wide range has a high standard deviation. Standard deviation works  well for a data that is normally distributed. For uses cases like student grades in a class or the annual income across a set of population which most likely has a normal distribution and tends to create a bell curve distribution, standard deviation is a can help you detect the outliers, which are most likely on the either end of the curve.

The inter-quartile range is a measure that indicates the extent to which the central 50% of values within the dataset are dispersed. It is based upon, and related to, the median. In the same way that the median divides a dataset into two halves, it can be further divided into quarters by identifying the upper and lower quartiles. The lower quartile is found one quarter of the way along a dataset when the values have been arranged in order of magnitude; the upper quartile is found three quarters along the dataset. The inter-quartile range provides a clearer picture of the overall dataset by removing/ignoring the outlying values.

What function you use depends your use case. Decide which statistical function works most effectively to define the normal behavior of your system and then use that function to detect anomalies.

Here are some examples for both Std Dev and IQR that should hopefully give you a good understanding of these functions.

## Example 1

In this example, using standard deviation we can identify what series are deviating greatly compared to their usual behavior(2 hour moving window). When the std dev crosses a certain value (10 in this case) we have an anomaly. You can also see how the same function is applied to different, widely scaled time series and it identifies the spread of each series independently to stop the anomalies.

### Data

![before_std_dev](images/before_std_dev.png)

### Std Dev

![after_std_dev](images/after_std_dev.png)

If the data is always distributed asymmetrically or is skewed, and you want to find  anomalies in this skewed data, standard deviation does not work well, and you can try IQR.

The time series in this example has a lot of spikes and troughs and you want to find a sustained spike in this seemingly noisy signals.

As you can see, standard deviation shows you the initial spike but starts decaying immediately. But if you use IQR, which has more resistance to the spikes and outliers it shows a sustained increase, making it easy to spot real outliers.

## Example 2

### Data

![network_rate](images/network_rate_data.png)

### Std Dev

![network_rate_std_dev](images/network_rate_std_dev.png)

### IQR

![network_rate_iqr](images/network_rate_iqr.png)

## Example 3

In this second example, the series deviates and continues oscillating over a day over range (again which is the normal behavior of the series). When you try to spot an anomaly in the oscillating data using std dev in a 1h or 2h window, standard deviation does not really capture the dip as well as IQR because the distribution of data in a moving 2h window is not normal. If you look at IQR, you see that it also fluctuates in the moving 2h window, but not as much as std dev, and it spikes in case of a immediate dip in the oscillating signal.

### Data

![webxactions_data](images/webxactions_data.png)

### Std Dev

![webxactions_std_dev](images/webxactions_std_dev.png)

### IQR

![webxactions_iqr](images/webxactions_iqr.png)


The chart below shows the normalized values for all the three series. The chart plots the values against each other to give you a better understanding of standard deviation and IQR values.

![normalized_std_dev_iqr](images/normalized_std_dev_iqr.png)
