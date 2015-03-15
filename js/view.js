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
        "submit" : "onSubmit",
        "click .search-icon" : "onSearchClick"
    },

    render: function() {
        this.$el.html( this.template());
        return this;
    },

    onSubmit: function(e) {
        e.preventDefault();

        var keyword = this.$("input").val();

        this.trigger("search:submitted", keyword);

    },

    onSearchClick: function(e) {
        e.preventDefault();

        this.$("form").css("display", "inline-block");
    }

});


var CurrentTrackView = Backbone.View.extend({

    template: JST["currentTrackView"],

    // events: {

    //     "click .track-play" : "onPlayPause",
    // },

    // initialize: function() {
    //     this.listenTo(this.collection, "play:track", this.render);
    // },

    render: function() {
        this.$el.html( this.template ( this.model.toJSON() ));
        return this;
    },

    // getFirst: function() {
    //     return this.collection.first();

    // },

    // onPlayPause: function(e) {
    //     var $trackButton = $(e.currentTarget);
    //     if ($trackButton.data("state") === "play") {
    //         $trackButton.data("state", "pause");
    //         $trackButton.html("&#10074;&#10074;");
    //         var id = $(e.currentTarget).parent().data("id");
    //         this.trigger("play:track", id); 
    //         console.log("play", id);  
    //     }
    //     else {
    //         $trackButton.data("state", "play");
    //         $trackButton.html("&#9658;");
    //         var id = $(e.currentTarget).parent().data("id");
    //         this.trigger("pause:track", id); 
    //         console.log("pause", id);  
    //     }
    // }

});


var InfoView = Backbone.View.extend({

    template: JST["infoView"],


    render: function() {
        if(!this.model) {
            this.model = this.collection.first();
            
        }
        this.model.set({bigArt : this.getBigArt()});
        this.$el.html( this.template( this.model.toJSON() ));
        return this;
    },

    getBigArt: function() {
        if(this.model.get("artwork_url")) {
            var art_url = this.model.get("artwork_url");
            var sliced = art_url.split("").slice(0, art_url.length-9);
            return sliced.join("") + "t500x500.jpg"; 
        }
        else {
            return "http://lorempixel.com/500/500"
        }
    }

});


var TrackView = Backbone.View.extend({

    template: JST["singleTrackView"],

    tagName: "tr",

    className: "track-item",

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ));

        return this;
    },


});


var TrackListView = Backbone.View.extend({

    template: JST["listView"],

    render: function() {
        this.$el.html( this.template() );

        var $list = this.$("tbody");

        this.collection.each(function(track) {
            var trackView = new TrackView({model: track});
            $list.append( trackView.render().el );
        }, this);

        return this;

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
            this.trigger("addToFavorites:track", id);
        }
        
    }

});

var HomeView = Backbone.View.extend({

    template: JST["homeView"],

    events: {

        "click .track-item .track-play" : "onPlayPause",
        "click .track-item .track-star" : "addRemoveFavorites"
    },

    initialize: function() {
        this.listenTo(this.collection, "reset", this.render);
        this.on("play:track", function(id){
            var currentTrackView = new CurrentTrackView({
                model: this.collection.get(id)
            });
            this.$(".current-track").html( currentTrackView.render().el );
            this.$(".current-track .track-play").data("state", "pause");
            this.$(".current-track .track-play").html("&#10074;&#10074;");
        });
        this.on("pause:track", function(id){
            this.$(".current-track .track-play").data("state", "pause");
            this.$(".current-track .track-play").html("&#9658;");
        });
    },


    render: function() {
        this.$el.html( this.template() );

        var firstModel = this.collection.first();

        var trackListView = new TrackListView({
            collection: this.collection
        });
        this.$(".all-tracks").html( trackListView.render().el );

        var currentTrackView = new CurrentTrackView({
            model: firstModel
        });
        this.$(".current-track").html( currentTrackView.render().el );


    },

    onPlayPause: function(e) {
        var $trackButton = $(e.currentTarget);

        if ($trackButton.data("state") === "play") {
            $trackButton.data("state", "pause");
            $trackButton.html("&#10074;&#10074;");
            var id = $(e.currentTarget).data("id");
            this.trigger("play:track", id);   
        }
        else {
            $trackButton.data("state", "play");
            $trackButton.html("&#9658;");
            var id = $(e.currentTarget).data("id");
            this.trigger("pause:track", id);   
        }
    },



});


var FavoriteTrackListView = Backbone.View.extend({

    template: JST["listView"],

    tagName: "table",

    events: {

        "click .track-play" : "onPlayPause",
        "click .track-star" : "removeFavorite"
    },


    render: function() {
        this.$el.html( this.template() );

        var $list = this.$(".track-list");

        this.collection.each(function(track) {
            var trackView = new TrackView({model: track});
            $list.append( trackView.render().el );
            this.$(".track-star").empty().html("&#9733;");
        }, this);

        return this;

    },

    onPlayPause: function(e) {
        var $trackButton = $(e.currentTarget);

        if ($trackButton.data("state") === "play") {
            $trackButton.data("state", "pause");
            $trackButton.html("&#10074;&#10074;");
            var id = $(e.currentTarget).data("id");
            this.trigger("play:track", id);   
        }
        else {
            $trackButton.data("state", "play");
            $trackButton.html("&#9658;");
            var id = $(e.currentTarget).data("id");
            this.trigger("pause:track", id);   
        }
    },

    removeFavorite: function(e) {
        var $trackStar = $(e.currentTarget);
        var id = $trackStar.parent().data("id");
        $trackStar.empty().html("&#9734;");
        this.trigger("removeFromFavorites:track", id);
        
    }

});