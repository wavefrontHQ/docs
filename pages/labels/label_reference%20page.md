---
title: "Query Language Reference"
tagName: reference page
search: exclude
permalink: label_reference%20page.html
sidebar: doc_sidebar
folder: labels
---
<p>We have reference doc for each function, but also background (including videos) and examples.</p>

<div class="row">
    <div class="col-md-3 col-sm-6 quick-links-panel-wrapper">
        <div class="panel panel-default quick-links-panel-container">
            <div class="panel-body quick-links-panel">
                <img src="/images/reference.png" alt="icon"/>
                <div class="quick-links-panel-title">QL Reference</div>
                <p>Summary page for all query language operators and functions.</p>
            </div>
            <div class="panel-footer quick-links-panel-footer">
                <a href="query_language_reference.html">START HERE</a>
            </div>
        </div>
    </div>
    <div class="col-md-3 col-sm-6 quick-links-panel-wrapper">
        <div class="panel panel-default quick-links-panel-container">
            <div class="panel-body quick-links-panel">
                <img src="/images/basics.png" alt="icon"/>
                <div class="quick-links-panel-title">Foundation</div>
                <p>Explains concepts like discrete, continuous, and interpolation.</p>
            </div>
            <div class="panel-footer quick-links-panel-footer">
                <a href="query_language_discrete_continuous.html">START HERE</a>
            </div>
        </div>
    </div>
    <div class="col-md-3 col-sm-6 quick-links-panel-wrapper">
        <div class="panel panel-default quick-links-panel-container">
            <div class="panel-body quick-links-panel">
                <img src="/images/tips_tricks.png" alt="icon"/>
                <div class="quick-links-panel-title">Tips & Tricks</div>
                <p>Fine tune queries, perform aggregation, and more.</p>
            </div>
            <div class="panel-footer quick-links-panel-footer">
                <a href="query_language_aggregate_functions.html">START HERE</a>
            </div>
        </div>
    </div>
    <div class="col-md-3 col-sm-6 quick-links-panel-wrapper">
        <div class="panel panel-default quick-links-panel-container">
            <div class="panel-body quick-links-panel">
                <img src="/images/recipe.png" alt="icon"/>
                <div class="quick-links-panel-title">Recipes</div>
                <p>Sample queries for common tasks, e.g. time focus, comparison, etc..</p>
            </div>
            <div class="panel-footer quick-links-panel-footer">
                <a href="/query_language_recipes.html">START HERE</a>
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
             <p><a href="Fine tune queries, perform aggregation, and more. " class="btn btn-primary btn-block">Tips & Tricks</a></p>
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
             <p><a href="/query_language_recipes.html" class="btn btn-primary btn-block">Examples</a></p>
             <p>Sample queries for common tasks.</p>
         </div>
     </div>
 </div>
</div>
--->

{% capture c %}{{site.data.labels.reference_page}}{% endcapture %}

{% include labellogic.html content=c %}
