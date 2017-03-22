---
title: Tags Overview
tags: [getting_started]
sidebar: doc_sidebar
permalink: tags.html
summary: This is an overview of Wavefront tags.
---
A tag is custom metadata that adds application-specific meaning to metrics and Wavefront entities such as alerts, dashboards, events, and sources. Tags group together metrics and entities according to categories.
 
The primary use of tags is to limit the number metrics, events, and entities you are querying or working with at once. Limiting the number of metrics and events reduces query time. Limiting the number of entities reduces information overload.

Filtering in Queries
In queries, you can filter:
Metrics with source and point tags
Events with alert and event tags. In addition you can filter events with the system tags added by alerts: severity, subtype, and type.
 
Filtering Entities
In the Wavefront UI and API you can use entity tags to filter alert, dashboard, event, and source entities. In the Wavefront UI, entity tags display as gray labeled icons ( tag.png) in the filter bar and below each entity in the entity browser.


Tag Paths
All tag types support the ability to organize tags in a hierarchy. The hierarchy is defined by separating tag components with a dot '.'. For example: MyService.MyApp.
 
Selecting and Searching Tag Paths
In the UI you operate on tag paths by selecting a component at a specific node in the hierarchy.  For example, you can select all Wavefront dashboards (Examples and GettingStarted) by clicking Wavefront.

In queries you achieve the same effect by using trailing wildcards ".\*" when specifying tag paths. For example, to match all tags starting with alertTagPath., enter alertTagPath.*. This string matches alerts named alertTagPath.tpc1, alertTagPath.tpc1.tpc11, etc. When creating maintenance windows you can use tag paths and wildcards to put a group of of alerts in maintenance.
 
Entity Tags
Adding Entity Tags
To add entity tags you must have the appropriate entity permission. If you do not have permission, UI menu selections and buttons required to perform the tasks will not be visible.
 
To add tags to one or more entities:
Open an entity browser by selecting Browse > <entity>, where <entity> is Alerts, Dashboards, Events, or Sources.
Choose which entities to tag:
Check the checkboxes next to the entities and click the + Tag button.
Click +tag below an entity.
