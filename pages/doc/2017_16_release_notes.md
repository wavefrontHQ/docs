---
title: 2017-16 Release Notes
keywords: release notes
tags: [release notes]
sidebar: doc_sidebar
permalink: 2017_16_release_notes.html
summary: Learn about new and updated features in the Wavefront 2017-16 release.
---

- The release numbering scheme has changed from **X.Y** to **YYYY-WW** and reflects a shift to a continuous delivery release model. The **WW** component of the release number is the week when development on the set of features delivered in the release was completed. The release number displays in the footer of the Wavefront UI.
- Search metrics in dashboards
- [Proxy metrics](wavefront_monitoring.html) historically had the prefix `~agent`. The query engine now supports both `~proxy` and `~agent` prefixes.  Query errors still refer only to the `~agent` prefix, for example: `No metrics matching: [~agent.points.*.received]`.
- AWS metrics have additional point tags.
