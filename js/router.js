var App = Backbone.Router.extend({

    initialize: function() {

        this.nav = new NavView();


        $("body").append( this.nav.render().el);
    }


})