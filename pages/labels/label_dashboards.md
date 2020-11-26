---
title: "Dashboard Pages"
tagName: dashboards
search: exclude
permalink: label_dashboards.html
sidebar: doc_sidebar
folder: labels
---


<div class="row">
<div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
                <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
                <i class="fa fa-bar-chart fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="label_charts.html" class="btn btn-primary btn-block">Charts</a></p>
             <p>{{site.data.labels.charts}}</p>
         </div>
     </div>
 </div>
</div>

{% capture c %}{{site.data.labels.dashboards}}{% endcapture %}

{% include labellogic.html content=c %}
