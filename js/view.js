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

    className: "z-up",

    render: function() {
        this.$el.html( this.template ( this.model.toJSON() ));
        return this;
    },

});


var InfoView = Backbone.View.extend({

    template: JST["infoView"],

    render: function() {
        this.model.set({
            bigArt : this.getBigArt()
        });
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
            return "http://lorempixel.com/g/500/500"
        }
    }

});


var TrackView = Backbone.View.extend({

    template: JST["singleTrackView"],
    tagName: "tr",
    className: "track-item",

    render: function() {
        this.model.set({
            time: this.durationFormat()
        });
        this.$el.html( this.template( this.model.toJSON() ));

        return this;
    },

    durationFormat: function() {
        var duration = this.model.get("duration");
        var duration = duration / 1000 / 60;
        var minutes = Math.floor(duration);
        var seconds = Math.floor((duration - minutes) * 60);
        if( seconds.toString().split("").length === 1) {
            seconds = "0" + seconds;
        }
        var time = minutes + ":" + seconds;
        return time;
            
    }

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

    }

});



var HomeView = Backbone.View.extend({

    template: JST["homeView"],

    events: {

        "click .track-play" : "onPlayPause",
        "click .track-item .track-star" : "addRemoveFavorites",
        "submit .search-box" : "onSubmit",
        "click .search-icon" : "onSearchClick"

    },

    initialize: function() {
        this.listenTo(this.collection, "reset", this.render);

        this.on("play:track", function(id){
            var currentTrackView = new CurrentTrackView({
                model: this.collection.get(id)
            });
            this.$(".current-track").html( currentTrackView.render().el ); 

            var infoView = new InfoView({
                model: this.collection.get(id)
            });
            this.$(".info-view").html( infoView.render().el );    

            this.$("[data-id='" + id +"']" ).data("state", "pause");
            this.$("[data-id='" + id +"']" ).html("&#10074;&#10074;");

        });

        this.on("pause:track", function(id){
            this.$("[data-id='" + id +"']" ).data("state", "play");
            this.$("[data-id='" + id +"']" ).html("&#9658;");

        });

        this.on("search:submitted", function(){
        });
    },


    render: function() {
        this.$el.html( this.template() );

        this.firstModel = this.collection.first();

        var trackListView = new TrackListView({
            collection: this.collection
        });
        this.$(".all-tracks").html( trackListView.render().el );

        var currentTrackView = new CurrentTrackView({
            model: this.firstModel
        });
        this.$(".current-track").html( currentTrackView.render().el );


        var searchBoxView = new SearchBoxView();

        this.$(".search-box").html( searchBoxView.render().el);

        var infoView = new InfoView({
            model: this.firstModel
        });
        this.$(".info-view").html( infoView.render().el );

    },

    onPlayPause: function(e) {
        var $trackButton = $(e.currentTarget);

        if ($trackButton.data("state") === "play") {
            var id = $(e.currentTarget).data("id");
            this.trigger("play:track", id);   
        }
        else {
            var id = $(e.currentTarget).data("id");
            this.trigger("pause:track", id);   
        }
    },

    onSubmit: function(e) {
        e.preventDefault();

        var keyword = this.$("input").val();
        var id = this.$("[data-state='play']").data("id");

        this.trigger("search:submitted", keyword, id);

    },

    onSearchClick: function(e) {
        e.preventDefault();

        this.$("form").css("display", "inline-block");
        this.$(".current-track div").removeClass("z-up");
    },

    addRemoveFavorites: function(e) {
        var $trackStar = $(e.currentTarget);

        if ($trackStar.html() === "★") {
            var id = $trackStar.prev().data("id");
            $trackStar.empty().html("&#9734;");
            this.trigger("removeFromFavorites:track", id);
        } 
        else {
            var id = $trackStar.prev().data("id");
            console.log(id);
            $trackStar.empty().html("&#9733;");
            this.trigger("addToFavorites:track", id);
        }
        
    }
});



var FavoritesView = Backbone.View.extend({

    template: JST["favoritesView"],

    events: {

        "click .track-play" : "onPlayPause",
        "click .track-item .track-star" : "removeFavorites"

    },

    initialize: function() {
        this.listenTo(this.collection, "removeFromFavorites:track", this.render);

        this.on("play:track", function(id){
            if(this.firstModel !== this.collection.get(id)) {
                var currentTrackView = new CurrentTrackView({
                    model: this.collection.get(id)
                });
                this.$(".current-track").html( currentTrackView.render().el ); 

                var infoView = new InfoView({
                    model: this.collection.get(id)
                });
                this.$(".info-view").html( infoView.render().el );    
            } 

            this.$("[data-id='" + id +"']" ).data("state", "pause");
            this.$("[data-id='" + id +"']" ).html("&#10074;&#10074;");

        });

        this.on("pause:track", function(id){
            this.$("[data-id='" + id +"']" ).data("state", "play");
            this.$("[data-id='" + id +"']" ).html("&#9658;");

        });
    },


    render: function() {
        this.$el.html( this.template() );

        this.firstModel = this.collection.first();

        var trackListView = new TrackListView({
            collection: this.collection
        });
        this.$(".all-tracks").html( trackListView.render().el );
        this.$(".track-star").empty().html("&#9733;");

        var currentTrackView = new CurrentTrackView({
            model: this.firstModel
        });
        this.$(".current-track").html( currentTrackView.render().el );

        var infoView = new InfoView({
            model: this.firstModel
        });
        this.$(".info-view").html( infoView.render().el );

    },

    onPlayPause: function(e) {
        var $trackButton = $(e.currentTarget);

        if ($trackButton.data("state") === "play") {
            var id = $(e.currentTarget).data("id");
            this.trigger("play:track", id);   
        }
        else {
            var id = $(e.currentTarget).data("id");
            this.trigger("pause:track", id);   
        }
    },


    removeFavorites: function(e) {
        var $trackStar = $(e.currentTarget);

        var id = $trackStar.prev().data("id");
        $trackStar.empty().html("&#9734;");
        this.trigger("removeFromFavorites:track", id);
        
    }



});



