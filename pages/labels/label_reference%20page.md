---
title: "Query Language Reference"
tagName: reference page
search: exclude
permalink: label_reference%20page.html
sidebar: doc_sidebar
folder: labels
---
<p>We have reference doc for each function, but also background info.</p>

<div class="row">
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
                   <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
                   <i class="fa fa-list fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="query_language_reference.html" class="btn btn-primary btn-block">Reference</a></p>
             <p>One line for each function + links. </p>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
                   <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
                   <i class="fa fa-circle fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="query_language_discrete_continuous.html" class="btn btn-primary btn-block">Foundation</a></p>
             <p>Explains concepts like discrete, continuous, and interpolation. </p>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
             <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
             <i class="fa fa-lightbulb-o fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="query_language_point_tags.html" class="btn btn-primary btn-block">Tips & Tricks</a></p>
             <p>Fine tune queries, perform aggregation, and more.  </p>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
             <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
             <i class="fa fa-list-ol fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="/query_language_recipes.html" class="btn btn-primary btn-block">QL Recipes</a></p>
             <p>Sample queries for common tasks.</p>
         </div>
     </div>
 </div>
</div>

{% capture c %}{{site.data.labels.reference_page}}{% endcapture %}

{% include labellogic.html content=c %}
