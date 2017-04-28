---
title: Using Statistical Functions to Detect Anomalies
keywords: query language
tags: [query language]
sidebar: doc_sidebar
permalink: query_language_statistical_functions_anomalies.html
summary: Learn how to use statistical functions in Wavefront Query Language expressions to detect anomalies.
---
Anything that is different than "normal" can be an anomaly. Say you have a set of data points that span across a certain range, there are multiple ways to define which points of these set can be treated as normal and which should be identified as abnormal. These abnormal points if cross a certain threshold would in turn create an "anomaly" in the behavior of a certain time-series or a signal. If you are interested and want to learn more about anomaly and its detection see the blog [Why is Operational Anomaly Detection So Hard?](https://www.wavefront.com/why-is-operational-anomaly-detection-so-hard/) and the video 

{% include video.html file="lytshn66rj" %}

Often statistical functions are a good approach to set these definitions of normal and anomalies in your time series. Statistical functions like mean, median, range, standard deviation, and inter-quartile range are great to understand the central tendency and the variability in your dataset. You can then decide how much variability is normal and then whatever datasets cross a certain threshold or do not fall in this normal set would be detected as an anomaly.
 
## Mean and Median
Mean and median functions are used to understand the central tendency of the data. Mean gives you the average of set of values. Median gives you the number found in the exact middle of the set of values.
 
Median is more robust in dealing with outliers as compared to mean as the outliers will tend to move the mean towards the outlier value. And thus mean value is affected and fluctuates easily even with single outlier. You can see here how the mean and median behaves when there are sudden spikes in the http requests hitting a particular host. So if you consider these spikes as anomalies you could use mean as your function which would catch all such deviations or variability but if you consider them as noise and want to ignore one off spikes you can use median which is less sensitive to outliers or variations like these and will only show sustained dips.

![mean_median](images/mean_median.png)

## Standard Deviation (Std Dev) and Inter-Quartile Range (IQR)

While mean and median functions are used to understand the central tendency of the data, Std Dev and IQR are used to measure the spread of the data. If you want to use a level of dispersion or spread of the data as a function to define normal you should use these functions to catch anomalies.
 
Standard deviation and IQR react to outliers (and skewed data to some extent) in a similar way as their centers, mean and median respectively. Std Dev lets you understand the spread of the data over a range but is more sensitive to outliers and skewed data where as IQR is more robust against them. Please review this very simple article that I found which explains both these concepts really well. This should give you a some real world applications of both standard deviation and IQR.
 
A tightly packed data (meaning whose values don't vary over a wide range) would have a low standard deviation value (closer to 0) where as a a data set whose values are spread across a wide range would have a high standard deviation. Standard deviation works really well for a data that is normally distributed. So for uses cases like student grades in a class or the annual income across a set of population which most likely has a normal distribution and tends to create a "bell curve" distribution, standard deviation is a good function to use to detect the outliers which are most likely on the either end of the curve.
 
The inter-quartile range is a measure that indicates the extent to which the central 50% of values within the dataset are dispersed. It is based upon, and related to, the median.In the same way that the median divides a dataset into two halves, it can be further divided into quarters by identifying the upper and lower quartiles. The lower quartile is found one quarter of the way along a dataset when the values have been arranged in order of magnitude; the upper quartile is found three quarters along the dataset. The inter-quartile range provides a clearer picture of the overall dataset by removing/ignoring the outlying values.
 
So it really depends on what your use case is. Based on your use case, you should decide which statistical function works most effectively to define the normal behavior of your system and then use it to detect anomalies.
 
Here are some examples for both Std Dev and IQR that should hopefully give you a good understanding of these functions.
 
## Example 1

In this example, using standard deviation we can identify what series are deviating greatly compared to their usual behavior(2 hour moving window). And when the std dev crosses a certain value (e.g. 10 in this case) it can identified as a anomaly. Also you can here that same function is applied to different / widely scaled time series and it identifies the spread of each series independently to stop the anomalies.


### Data

![before_std_dev](images/before_std_dev.png)

### Std Dev

![after_std_dev](images/after_std_dev.png)

If the data is  distributed asymmetrically or is skewed and this is your "normal" and you want to find out anomaly in this skewed data, standard deviation does not work quite well in which case should try IQR. As you can see in this example, since the time series here are a lot of spikes and trots  and you want to find a sustained spike in this seemingly noisy signals.
 
As you can see, standard deviation shows you the initial spike but starts decaying immediately. But if you use IQR since it has more resistance to the spikes and outliers it shoes a sustained increase making it easy to spot real outliers.

## Example 2

### Data

![network_rate](images/network_rate_data.png)

### Std Dev

![network_rate_std_dev](images/network_rate_std_dev.png)

### IQR

![network_rate_iqr](images/network_rate_iqr.png)

## Example 3

In this second example, the series deviates and keeps on oscillating over a day over range (again which is the normal behavior of the series) and when you try to spot anomaly in this oscillating data using std dev in a 1h or 2h window you see that standard deviation does not really capture the dip as good as IQR because the distribution of data here in a moving 2h window is not normal so standard deviation is not every effective. And if you observe IQR also fluctuates with in the moving 2h window but not to same magnitude as Std Dev, and it spikes up in case of a immediate dip in the oscillating signal.
 
### Data

![webxactions_data](images/webxactions_data.png)

### Std Dev

![webxactions_std_dev](images/webxactions_std_dev.png)

### IQR

![webxactions_iqr](images/webxactions_iqr.png)


The chart below shows the normalized values all these three series to plot them against each other to give you a more better understanding of standard deviation and IQR values behave compared to the underlying data.

![normalized_std_dev_iqr](images/normalized_std_dev_iqr.png)

