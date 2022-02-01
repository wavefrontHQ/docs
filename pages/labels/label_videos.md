---
title: "Video Pages"
tagName: videos
search: exclude
permalink: label_videos.html
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
                <p>Our most polular videos. Watch co-founder Clement Pang explain important concepts.</p>
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

<!---This is what we had before
<div class="row">
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
                   <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
                   <i class="fa fa-video-camera fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="videos_quickstart.html" class="btn btn-primary btn-block">Quickstart</a></p>
             <p>Our most popular videos. </p>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
                   <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
                   <i class="fa fa-arrow-right fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="videos_data.html" class="btn btn-primary btn-block">Data</a></p>
             <p>Get telemetry data and histograms into Wavefront.  </p>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
             <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
             <i class="fa fa-exclamation fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="videos_alerts.html" class="btn btn-primary btn-block">Alerts</a></p>
             <p>Alerts&mdash;From simple to multi-threshold. </p>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
             <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
             <i class="fa fa-lock fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="/videos_administration.html" class="btn btn-primary btn-block">Administration</a></p>
             <p>Authentication and authorization. </p>
         </div>
     </div>
 </div>
</div>
--->

{% capture c %}{{site.data.labels.videos}}{% endcapture %}

{% include labellogic.html content=c %}
