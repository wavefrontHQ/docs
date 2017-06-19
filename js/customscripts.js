
$('#mysidebar').height($(".nav").height());


$( document ).ready(function() {

    //this script says, if the height of the viewport is greater than 800px, then insert affix class, which makes the nav bar float in a fixed
    // position as your scroll. if you have a lot of nav items, this height may not work for you.
    var h = $(window).height();
    //console.log (h);
    
    /* if (h > 1200) {
        $( "#mysidebar" ).attr("class", "nav affix");
    }*/
    // activate tooltips. although this is a bootstrap js function, it must be activated this way in your theme.
    $('[data-toggle="tooltip"]').tooltip({
        placement : 'top'
    });

    /**
     * AnchorJS
     */
    anchors.add('h2,h3,h4,h5');

});

// needed for nav tabs on pages. See Formatting > Nav tabs for more details.
// script from http://stackoverflow.com/questions/10523433/how-do-i-keep-the-current-tab-active-with-twitter-bootstrap-after-a-page-reload
$(function() {
    var json, tabsState;
    $('a[data-toggle="pill"], a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var href, json, parentId, tabsState;

        tabsState = localStorage.getItem("tabs-state");
        json = JSON.parse(tabsState || "{}");
        parentId = $(e.target).parents("ul.nav.nav-pills, ul.nav.nav-tabs").attr("id");
        href = $(e.target).attr('href');
        json[parentId] = href;

        return localStorage.setItem("tabs-state", JSON.stringify(json));
    });

    tabsState = localStorage.getItem("tabs-state");
    json = JSON.parse(tabsState || "{}");

    $.each(json, function(containerId, href) {
        return $("#" + containerId + " a[href=" + href + "]").tab('show');
    });

    $("ul.nav.nav-pills, ul.nav.nav-tabs").each(function() {
        var $this = $(this);
        if (!json[$this.attr("id")]) {
            return $this.find("a[data-toggle=tab]:first, a[data-toggle=pill]:first").tab("show");
        }
    });
});


/** Scroll to Top Functionality **/
$(document).ready(function() {
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('#scroll-to-top').fadeIn();
        } else {
            $('#scroll-to-top').fadeOut();
        }
    });

    $('#scroll-to-top').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 400);
        return false;
    });
});


/** Algolia Search Functionality **/
$(document).ready(function() {
    var client = algoliasearch("YJNSO3ALDH", "60754248530461d4b2589e0076132c31");
    var index = client.initIndex('documentation');
    //initialize autocomplete on search input (ID selector must match)

    var $body = $('body');

    var inputContainerId = '#aa-input-container';
    if (window.innerWidth < 991) {
        inputContainerId = '#aa-input-container-mobile'
    }

    $(inputContainerId).append('<input type="text" class="aa-search-input" id="aa-search-input" placeholder="Search..." />');

    var $searchInput = $('#aa-search-input');
    var autoComplete = autocomplete('#aa-search-input',
        {
            hint: false,
            debug: true,
            autoselect: true,
            openOnFocus: true
        }, {
            source: autocomplete.sources.hits(index, {hitsPerPage: 10}),
            //value to be displayed in input control after user's suggestion selection
            displayKey: 'title',
            //hash of templates used when rendering dataset
            templates: {
                //'suggestion' templating function used to render a single suggestion
                empty: function () {
                    return '<p class="wf-docs-no-results">No results</p>';
                },
                suggestion: function (suggestion) {
                    return '<div class="wf-docs-search-autocomplete-suggestion">' +
                        '<a class="wf-suggestion-link" href="' + suggestion.url + '">' + suggestion._highlightResult.title.value + '</a>' +
                        '<p>' + (suggestion.summary || '') + '</p>' +
                        '</div>';
                }
            }
        }).on('autocomplete:selected', function (event, suggestion, dataset) {
            window.location.href = suggestion.url;
        }).on('autocomplete:opened', function () {
            $body.addClass('wf-search-opened');
        }).on('autocomplete:closed', function () {
            $body.removeClass('wf-search-opened');
        });
});