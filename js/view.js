var NavView = Backbone.View.extend({

    template: JST["navView"],

    tagName: "nav",

    events: {
        "click a" : "onLinkClick"
    },

    render: function() {
        this.$el.html( this.template() );

        return this;
    },

    onLinkClick: function(e) {
        e.preventDefault();

        var link = $(e.currentTarget).data("name");
        this.trigger("link:click", link);
    }

});


var TrackView = Backbone.View.extend({

    template: JST["singleTrackView"],

    className: "track",

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ));
        return this;
    }

});