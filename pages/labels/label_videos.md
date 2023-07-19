---
title: "Video Pages"
tagName: videos
search: exclude
permalink: label_videos.html
published: false
sidebar: doc_sidebar
folder: labels
---

<p>Our doc set includes concept videos, how-to videos, and more!</p>

<div class="row">
    <div class="col-md-3 col-sm-6 quick-links-panel-wrapper">
        <div class="panel panel-default quick-links-panel-container">
            <div class="panel-body quick-links-panel">
                <img src="/images/Launch.png" alt="icon"/>
                <div class="quick-links-panel-title">Quickstart</div>
                <p>Our most popular videos. Watch co-founder Clement Pang explain important concepts.</p>
            </div>
            <div class="panel-footer quick-links-panel-footer">
                <a href="videos_quickstart.html">START HERE</a>
            </div>
        </div>
    </div>
    <div class="col-md-3 col-sm-6 quick-links-panel-wrapper">
        <div class="panel panel-default quick-links-panel-container">
            <div class="panel-body quick-links-panel">
                <img src="/images/data_for_label.png" alt="icon"/>
                <div class="quick-links-panel-title">Data</div>
                <p>Learn how the proxy works, how to get different types of data in, and how to browse data.</p>
            </div>
            <div class="panel-footer quick-links-panel-footer">
                <a href="videos_data.html">START HERE</a>
            </div>
        </div>
    </div>
    <div class="col-md-3 col-sm-6 quick-links-panel-wrapper">
        <div class="panel panel-default quick-links-panel-container">
            <div class="panel-body quick-links-panel">
                <img src="/images/administration.png" alt="icon"/>
                <div class="quick-links-panel-title">Administration</div>
                <p>Learn about using Wavefront Top and several security topics.</p>
            </div>
            <div class="panel-footer quick-links-panel-footer">
                <a href="videos_administration.html">START HERE</a>
            </div>
        </div>
    </div>
    <div class="col-md-3 col-sm-6 quick-links-panel-wrapper">
        <div class="panel panel-default quick-links-panel-container">
            <div class="panel-body quick-links-panel">
                <img src="/images/alert_blue.png" alt="icon"/>
                <div class="quick-links-panel-title">Alerts</div>
                <p>Understand alerts, targets, and notifications and learn about custom alerts.</p>
            </div>
            <div class="panel-footer quick-links-panel-footer">
                <a href="/videos_alerts.html">START HERE</a>
            </div>
        </div>
    </div>
</div>


{% capture c %}{{site.data.labels.videos}}{% endcapture %}

{% include labellogic.html content=c %}
