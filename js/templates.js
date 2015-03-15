this["JST"] = this["JST"] || {};
this["JST"]["currentTrackView"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div data-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"z-up\">\n    <span class=\"track-play\" data-state=\"play\">\n        &#9658;\n    </span>\n    <span>"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n    <span>"
    + alias3(((helper = (helper = helpers.duration || (depth0 != null ? depth0.duration : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"duration","hash":{},"data":data}) : helper)))
    + "</span>\n</div>";
},"useData":true});
this["JST"] = this["JST"] || {};
this["JST"]["infoView"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "            <li>Released: "
    + this.escapeExpression(((helper = (helper = helpers.release_year || (depth0 != null ? depth0.release_year : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"release_year","hash":{},"data":data}) : helper)))
    + "</li>\n";
},"3":function(depth0,helpers,partials,data) {
    var helper;

  return "            <li>Genre: "
    + this.escapeExpression(((helper = (helper = helpers.genre || (depth0 != null ? depth0.genre : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"genre","hash":{},"data":data}) : helper)))
    + "</li>\n";
},"5":function(depth0,helpers,partials,data) {
    var helper;

  return "            <li>Label: "
    + this.escapeExpression(((helper = (helper = helpers.label_name || (depth0 != null ? depth0.label_name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"label_name","hash":{},"data":data}) : helper)))
    + "</li>\n";
},"7":function(depth0,helpers,partials,data) {
    var helper;

  return "            <li>Tags: "
    + this.escapeExpression(((helper = (helper = helpers.tag_list || (depth0 != null ? depth0.tag_list : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"tag_list","hash":{},"data":data}) : helper)))
    + "</li>\n";
},"9":function(depth0,helpers,partials,data) {
    var helper;

  return "            <li><a href=\""
    + this.escapeExpression(((helper = (helper = helpers.download_url || (depth0 != null ? depth0.download_url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"download_url","hash":{},"data":data}) : helper)))
    + "\">Download</a></li>\n";
},"11":function(depth0,helpers,partials,data) {
    var helper;

  return "            <li>Favorites: "
    + this.escapeExpression(((helper = (helper = helpers.favoritings_count || (depth0 != null ? depth0.favoritings_count : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"favoritings_count","hash":{},"data":data}) : helper)))
    + "</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "    <div class=\"artwork\">\n        <img src=\""
    + alias3(((helper = (helper = helpers.bigArt || (depth0 != null ? depth0.bigArt : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"bigArt","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\">\n    </div>\n    <ul>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.release_year : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.genre : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.label_name : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.tag_list : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.downloadable : depth0),{"name":"if","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.favoritings_count : depth0),{"name":"if","hash":{},"fn":this.program(11, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n    </ul>\n";
},"useData":true});
this["JST"] = this["JST"] || {};
this["JST"]["listView"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<table class=\"track-list\">\n    \n</table>\n";
},"useData":true});
this["JST"] = this["JST"] || {};
this["JST"]["navView"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<ul>\n    <li><a href=\"\" data-name=\"home\">Home</a></li>\n    <li><a href=\"\" data-name=\"favorites\">Favorites</a></li>\n</ul>";
},"useData":true});
this["JST"] = this["JST"] || {};
this["JST"]["searchBoxView"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"search-icon\">\n    <span class=\"fa fa-search\"></span>\n</div>\n<form class=\"search-field\">\n    <input type=\"text\" placeholder=\"Search by genre, artist, or keyword\">\n    <button type=\"submit\">Submit</button>   \n</form>\n";
},"useData":true});
this["JST"] = this["JST"] || {};
this["JST"]["singleTrackView"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "    <td class=\"track-play\" data-state=\"play\" data-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">&#9658;</td>\n    <td class=\"track-star\">&#9734;</td>\n    <td class=\"track-title\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</td>\n    <td class=\"track-duration\">"
    + alias3(((helper = (helper = helpers.duration || (depth0 != null ? depth0.duration : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"duration","hash":{},"data":data}) : helper)))
    + "</td>\n";
},"useData":true});