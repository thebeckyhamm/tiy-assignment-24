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


var SearchBoxView = Backbone.View.extend({

    template: JST["searchBoxView"],

    render: function() {
        this.$el.html( this.template());
        return this;
    }

});


var CurrentTrackView = Backbone.View.extend({

    template: JST["currentTrackView"],

    render: function() {

        this.$el.html( this.template ( this.model.toJSON() ));
        return this;
    }

});


var InfoView = Backbone.View.extend({

    template: JST["infoView"],

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ));
        return this;
    }
})


var TrackView = Backbone.View.extend({

    template: JST["singleTrackView"],

    className: "track",

    events: {
        "click .track-play" : "onPlayTrack"
    }

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ));

        return this;
    },

    onPlayTrack: function(e) {
        var id = $(e.currentTarget).data("id");
        this.trigger("play:track", id);
    }

});


var TrackListView = Backbone.View.extend({

    template: JST["listView"],

    className: "track-list-wrapper",

    render: function() {
        this.$el.html( this.template() );

        var $list = this.$(".track-list");

        this.collection.each(function(track) {
            var trackView = new TrackView({model: track});
            $list.append( trackView.render().el );
        }, this);

        return this;

    }

});


var FavoriteTrackListView = Backbone.View.extend({

    template: JST["listView"],

    className: "track-list-wrapper",

    events: {

        "click .track-star" : "addTrack"
    }

    render: function() {
        this.$el.html( this.template() );

        var $list = this.$(".track-list");

        this.collection.each(function(track) {
            var trackView = new TrackView({model: track});
            $list.append( trackView.render().el );
        }, this);

        return this;

    },

    addTrack: function(favoriteTrack) {

        var trackView = new TrackView({model: favoriteTrack});
        this.$el.append(trackView.render().el);

        return this;
    }

});