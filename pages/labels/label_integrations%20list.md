---
title: "List of Wavefront Integrations"
tagName: integrations list
search: exclude
permalink: label_integrations%20list.html
sidebar: doc_sidebar
folder: labels
---
<p>Here's how to learn about Wavefront integrations:</p>

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
             <p><a href="integrations.html" class="btn btn-primary btn-block">Basics</a></p>
             <p>Watch a video, and learn the basics.</p>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
                   <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
                   <i class="fa fa-rocket fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="integrations_new_changed.html" class="btn btn-primary btn-block">What's New?</a></p>
             <p>List of New and changed integrations.</p>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
             <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
             <i class="fa fa-cloud fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="integrations_aws_metrics.html" class="btn btn-primary btn-block">Customize</a></p>
             <p>Customize AWS and PKS integrations.</p>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
             <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
             <i class="fa fa-code fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="integrations_r.html" class="btn btn-primary btn-block">R and More</a></p>
             <p>Code-driven custom integration setup. </p>
         </div>
     </div>
 </div>
</div>


{% capture c %}{{site.data.labels.integrations_list}}{% endcapture %}

{% include labellogic.html content=c %}
