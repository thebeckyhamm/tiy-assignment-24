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

    events: {
        "submit" : "onSubmit"
    },

    render: function() {
        this.$el.html( this.template());
        return this;
    },

    onSubmit: function(e) {
        e.preventDefault();

        var keyword = this.$("input").val();

        this.trigger("search:submitted", keyword);

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

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ));

        return this;
    },


});


var TrackListView = Backbone.View.extend({

    template: JST["listView"],

    className: "track-list-wrapper",

    events: {

        "click .track-play" : "onPlayPause",
        "click .track-star" : "addRemoveFavorites"
    },

    render: function() {
        this.$el.html( this.template() );

        var $list = this.$(".track-list");

        this.collection.each(function(track) {
            var trackView = new TrackView({model: track});
            $list.append( trackView.render().el );
        }, this);

        return this;

    },

    onPlayPause: function(e) {
        var $trackButton = $(e.currentTarget);

        if ($trackButton.data("state") === "play") {
            $trackButton.data("state", "pause");
            $trackButton.html("&#10074;&#10074;");
            var id = $(e.currentTarget).parent().data("id");
            this.trigger("play:track", id);   
        }
        else {
            $trackButton.data("state", "play");
            $trackButton.html("&#9658;");
            var id = $(e.currentTarget).parent().data("id");
            this.trigger("pause:track", id);   
        }
    },

    addRemoveFavorites: function(e) {
        var $trackStar = $(e.currentTarget);

        if ($trackStar.html() === "★") {
            var id = $trackStar.parent().data("id");
            $trackStar.empty().html("&#9734;");
            this.trigger("removeFromFavorites:track", id);
        } 
        else {
            var id = $trackStar.parent().data("id");
            $trackStar.empty().html("&#9733;");
            console.log(id);
            this.trigger("addToFavorites:track", id);
        }
        
    }

});


var FavoriteTrackListView = Backbone.View.extend({

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

    },

    addTrack: function(favoriteTrack) {

        var trackView = new TrackView({model: favoriteTrack});
        this.$el.append(trackView.render().el);

        return this;
    }

});