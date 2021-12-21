---
title: "Getting Started Pages"
tagName: getting started
search: exclude
permalink: label_getting%20started.html
sidebar: doc_sidebar
folder: labels
---

<p>Here's how our users get started with Wavefront:</p>

<div class="row">
    <div class="col-md-3 col-sm-6 quick-links-panel-wrapper">
        <div class="panel panel-default quick-links-panel-container">
            <div class="panel-body quick-links-panel">
                <img src="/images/Launch.png" alt="icon"/>
                <div class="quick-links-panel-title">Get Data In!</div>
                <p>Expore our integrations - From Kubernetes to cloud, it's all there!</p>
            </div>
            <div class="panel-footer quick-links-panel-footer">
                <a href="label_integrations%20list.html">LEARN HERE</a>
            </div>
        </div>
    </div>
    <div class="col-md-3 col-sm-6 quick-links-panel-wrapper">
        <div class="panel panel-default quick-links-panel-container">
            <div class="panel-body quick-links-panel">
                <img src="/images/visualize.png" alt="icon"/>
                <div class="quick-links-panel-title">Visualize</div>
                <p>Examine data in dashboards and charts. Drill down to see exactly what you need.</p>
            </div>
            <div class="panel-footer quick-links-panel-footer">
                <a href="ui_examine_data.html">LEARN HERE</a>
            </div>
        </div>
    </div>
    <div class="col-md-3 col-sm-6 quick-links-panel-wrapper">
        <div class="panel panel-default quick-links-panel-container">
            <div class="panel-body quick-links-panel">
                <img src="/images/query.png" alt="icon"/>
                <div class="quick-links-panel-title">Query</div>
                <p>Explore Query Language functions and use them effectively.</p>
            </div>
            <div class="panel-footer quick-links-panel-footer">
                <a href="query_language_reference.html">LEARN HERE</a>
            </div>
        </div>
    </div>
    <div class="col-md-3 col-sm-6 quick-links-panel-wrapper">
        <div class="panel panel-default quick-links-panel-container">
            <div class="panel-body quick-links-panel">
                <img src="/images/alert_blue.png" alt="icon"/>
                <div class="quick-links-panel-title">Alert</div>
                <p>Understand alerts, targets, and notifications and learn about custom alerts.</p>
            </div>
            <div class="panel-footer quick-links-panel-footer">
                <a href="alerts.html">LEARN HERE</a>
            </div>
        </div>
    </div>
</div>

<!---
<div class="row">
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
                   <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
                   <i class="fa fa-rocket fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="label_integrations%20list.html" class="btn btn-primary btn-block">Integrate</a></p>
             <p>Explore our integrations</p>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
                   <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
                   <i class="fa fa-eye fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="ui_examine_data.html" class="btn btn-primary btn-block">Visualize</a></p>
             <p>Get started with charts and dashboards</p>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
             <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
             <i class="fa fa-question fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="query_language_reference.html" class="btn btn-primary btn-block">Query</a></p>
             <p>Understand Wavefront Query Language</p>
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
             <p><a href="/alerts.html" class="btn btn-primary btn-block">Alert</a></p>
             <p>Get started with alerting. </p>
         </div>
     </div>
 </div>
</div>
--->






{% capture c %}{{site.data.labels.getting_started}}{% endcapture %}

{% include labellogic.html content=c %}
