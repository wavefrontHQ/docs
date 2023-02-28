---
title: "List of Integrations"
tagName: integrations list
search: exclude
permalink: label_integrations%20list.html
sidebar: doc_sidebar
folder: labels
---
<p>Here's how to learn about the VMware Aria Operations for Applications integrations:</p>


<div class="row">
    <div class="col-md-3 col-sm-6 quick-links-panel-wrapper">
        <div class="panel panel-default quick-links-panel-container">
            <div class="panel-body quick-links-panel">
                <img src="/images/basics.png" alt="icon"/>
                <div class="quick-links-panel-title">Basics</div>
                <p>Learn about different types of integrations, and watch a video that explains the basics.</p>
            </div>
            <div class="panel-footer quick-links-panel-footer">
                <a href="integrations.html">START HERE</a>
            </div>
        </div>
    </div>
    <div class="col-md-3 col-sm-6 quick-links-panel-wrapper">
        <div class="panel panel-default quick-links-panel-container">
            <div class="panel-body quick-links-panel">
                <img src="/images/whats_new.png" alt="icon"/>
                <div class="quick-links-panel-title">What's New?</div>
                <p>List of new and changed integrations, updated with each release.</p>
            </div>
            <div class="panel-footer quick-links-panel-footer">
                <a href="integrations_new_changed.html">START HERE</a>
            </div>
        </div>
    </div>
    <div class="col-md-3 col-sm-6 quick-links-panel-wrapper">
        <div class="panel panel-default quick-links-panel-container">
            <div class="panel-body quick-links-panel">
                <img src="/images/customize.png" alt="icon"/>
                <div class="quick-links-panel-title">Customize</div>
                <p>Details on setting up and customizing some of our key integrations.</p>
            </div>
            <div class="panel-footer quick-links-panel-footer">
                <a href="integrations_aws_overview.html">START HERE</a>
            </div>
        </div>
    </div>
    <div class="col-md-3 col-sm-6 quick-links-panel-wrapper">
        <div class="panel panel-default quick-links-panel-container">
            <div class="panel-body quick-links-panel">
                <img src="/images/kubernetes_icon_for_label.png" alt="icon"/>
                <div class="quick-links-panel-title">Kubernetes</div>
                <p>Tanzu and Kubernetes integration details, troubleshooting, and FAQs.</p>
            </div>
            <div class="panel-footer quick-links-panel-footer">
                <a href="kubernetes.html">START HERE</a>
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
             <p><a href="kubernetes.html" class="btn btn-primary btn-block">Kubernetes</a></p>
             <p>Tanzu and Kubernetes integrations</p>
         </div>
     </div>
 </div>
</div>
--->


{% capture c %}{{site.data.labels.integrations_list}}{% endcapture %}

{% include labellogic.html content=c %}
