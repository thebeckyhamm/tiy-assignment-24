var App = Backbone.Router.extend({

    initialize: function() {

        this.nav = new NavView();
        this.tracks = new TrackCollection();


        this.trackListView = new TrackListView({
            collection: this.tracks
        });

        this.listenTo(this.nav, "link:click", function(link) {
            this.navigate(link);

            if ( link === "home" ) {
                this.loadHome();
            }
        });

        $("body").append( this.nav.render().el );
        $("body").append( this.trackListView.el );

    },


    routes: {

        "" : "loadHome",
        "search/:q" : "loadHome",
        "favorites" : "loadFavorites"

    },



    loadHome: function(query) {

        this.tracks.loadTracks(query);

        this.listenTo(this.tracks, "reset", function() {
            $("body").append( this.trackListView.render() );
        });

    }


})