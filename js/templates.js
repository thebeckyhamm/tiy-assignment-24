this["JST"] = this["JST"] || {};
this["JST"]["currentTrackView"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"current-track\">\n    <span class=\"play\">\n        &#9658;\n    </span>\n    <span>"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n    <span>"
    + alias3(((helper = (helper = helpers.duration || (depth0 != null ? depth0.duration : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"duration","hash":{},"data":data}) : helper)))
    + "</span>\n</div>";
},"useData":true});
this["JST"] = this["JST"] || {};
this["JST"]["infoView"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"info-view\">\n    <div class=\"artwork\">\n        <img src=\""
    + alias3(((helper = (helper = helpers.artwork_large || (depth0 != null ? depth0.artwork_large : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"artwork_large","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\">\n    </div>\n    <ul>\n        <li>"
    + alias3(((helper = (helper = helpers.release_year || (depth0 != null ? depth0.release_year : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"release_year","hash":{},"data":data}) : helper)))
    + "</li>\n        <li>"
    + alias3(((helper = (helper = helpers.genre || (depth0 != null ? depth0.genre : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"genre","hash":{},"data":data}) : helper)))
    + "</li>\n        <li>"
    + alias3(((helper = (helper = helpers.label_name || (depth0 != null ? depth0.label_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label_name","hash":{},"data":data}) : helper)))
    + "</li>\n        <li>"
    + alias3(((helper = (helper = helpers.tag_list || (depth0 != null ? depth0.tag_list : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"tag_list","hash":{},"data":data}) : helper)))
    + "</li>\n        <li><a href=\""
    + alias3(((helper = (helper = helpers.download_url || (depth0 != null ? depth0.download_url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"download_url","hash":{},"data":data}) : helper)))
    + "\">Download</a></li>\n        <li>Favorites: "
    + alias3(((helper = (helper = helpers.favoritings_count || (depth0 != null ? depth0.favoritings_count : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"favoritings_count","hash":{},"data":data}) : helper)))
    + "</li>\n\n    </ul>\n</div>";
},"useData":true});
this["JST"] = this["JST"] || {};
this["JST"]["listView"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<article>\n<div class=\"track-list\">\n    \n</div>\n</article>";
},"useData":true});
this["JST"] = this["JST"] || {};
this["JST"]["navView"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<ul>\n    <li><a href=\"\" data-name=\"home\">Home</a></li>\n    <li><a href=\"\" data-name=\"favorites\">Favorites</a></li>\n</ul>";
},"useData":true});
this["JST"] = this["JST"] || {};
this["JST"]["searchBoxView"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"search-icon\">\n    (icon)\n</div>\n<form class=\"search-field\">\n    <input type=\"text\">\n    <button type=\"submit\">Submit</button>   \n</form>\n";
},"useData":true});
this["JST"] = this["JST"] || {};
this["JST"]["singleTrackView"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "    <span class=\"track-star\">&#9734;</span>\n    <span class=\"track-title\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n    <span class=\"track-duration\">"
    + alias3(((helper = (helper = helpers.duration || (depth0 != null ? depth0.duration : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"duration","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"useData":true});