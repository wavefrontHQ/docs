---
title: Advanced events() Queries 
keywords: events
tags: [events]
sidebar: doc_sidebar
permalink: events_queries_advanced.html
summary: Learn how to use advanced events() operators and functions.
---
Event sets returned from [events() queries](events_queries) support several types of operators and functions. You can combine, compare, and filter events sets. You can generate synthetic events sets, convert events sets to time series, and isolate or create individual events.

## Event Set Combination Operators

You can combine two event sets using <span style="color: #bf5700;">union</span>, <span style="color: #bf5700;">intersect</span>, and <span style="color: #bf5700;">-</span> operators.
 
### Union
The <span style="color: #bf5700;">union</span> operator returns all events that exist in either of the event sets. So, in its simplest form, this expression

<strong>events(<span style="color: #2873ee;">type=maintenanceWindow</span>) <span style="color: #bf5700;">union</span> events(<span style="color: #2873ee;">name="*test*"</span>)</strong>

is equivalent to

<strong>events(<span style="color: #2873ee;">type=maintenanceWindow</span> <span style="color: #bf5700;">or</span> <span style="color: #2873ee;">name="*test*"</span>)

### Intersect
The <span style="color: #bf5700;">intersect</span> operator returns all events that exist in both of the event sets. Similar to the above example,

<strong>events(<span style="color: #2873ee;">type=maintenanceWindow</span>) <span style="color: #bf5700;">intersect</span> events(<span style="color: #2873ee;">name="*test*"</span>)</strong>

is equivalent to

<strong>events(<span style="color: #2873ee;">type=maintenanceWindow</span> <span style="color: #bf5700;">and</span> <span style="color: #2873ee;">name="*test*"</span>)</strong>

### Minus
The <span style="color: #bf5700;">-</span> operator returns the difference between two event sets.  For example, <strong>events() <span style="color: #bf5700;">-</span> closed(events())</strong> returns all ongoing events.
  
## Event Set Comparison Operators

You can use [Allen's interval algebra](https://en.wikipedia.org/wiki/Allen%27s_interval_algebra) operators to compare two event sets. 

- **events(severity=severe) d since(1d)** returns all events with severity severe that occurred in the last day.
- **events(severity=severe) - (events(severity=severe) d since(1d))** returns all events with severity severe older than one day.

## Event Set Filtering Functions

- **closed(\<events\>)** - filters out all ongoing and future events, and returns only events that have ended and instantaneous events that occurred the past.

## Synthetic Event Set Functions

Some functions return a set of *synthetic events* as a function of input events.

- **since(\<events\>)** - returns a synthetic event with the same start time as the input event and no end time (converts all events to ongoing).

  ![Events since](images/since_events.png)
- **until(\<events\>)** - returns a synthetic event that starts at the beginning of time (Jan 1, 1970) and ends where the input event starts.

  ![Events until](images/until_events.png)
- **after(\<events\>)** - returns a synthetic ongoing event that starts the moment the input event ends.

  ![Events after](images/after_events.png)
 
## Event Set to Time Series Conversion Functions

Some functions convert event sets to time series.

- **count(\<events\>)** - aggregates a set of events and converts them into a single time series, where every data point represents the number of events that started at that time minus the number of events that ended at that time. Instantaneous events are represented as a single "0" value: 1 started minus 1 ended (instantaneous events are defined as events having their end time equal to their start time).

  ![Events count](images/count_events.png)
- **ongoing(\<events\>)** - returns a continuous time series (values reported every second), representing the number of ongoing events at any given moment.
 
## Single Event Functions

Some functions return a single event as opposed to a set of events. These functions either create a single synthetic event or isolate a single event from a series. All functions and operations that accept a set of events also accept a single event.

### Isolation Functions

These functions isolate a single event from an event set. In case of multiple events matching the condition the result is non-deterministic, but they always returns just one event.

- **first(\<events\>)** - returns a single event with the earliest start time.
- **last(\<events\>)** - returns a single event with the latest start time.
- **firstEnding(\<events\>)** - returns a single event with the earliest end time.
- **lastEnding(\<events\>)** - returns a single event with the latest end time.
 
### Creation Functions

- **timespan(startTimestamp, endTimestamp)** - creates a single synthetic event with the specified start and end timestamps. A timestamp can be expressed in epoch seconds or using a time expression such as "5 minutes ago". For example, **timespan("5 minutes ago", "2 minutes ago")**.

- **since(timeWindow)** - creates a single synthetic event that started timeWindow ago and ended "now". timeWindow can be specified in seconds, minutes, hours, days or weeks (ex: 1s, 1m, 1h, 1d, 1w). If the time unit is not specified, minutes are assumed.
 


