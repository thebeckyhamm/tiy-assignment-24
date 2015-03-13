var App = Backbone.Router.extend({

    initialize: function() {

        this.nav = new NavView();
        
        this.tracks = new TrackCollection();

        this.favoriteTracks = new FavoriteTrackCollection();

        this.searchBoxView = new SearchBoxView();

        this.infoView = new InfoView();

        this.trackListView = new TrackListView({
            collection: this.tracks
        });

        this.favoriteTrackListView = new FavoriteTrackListView({
            collection: this.favoriteTracks
        });

        this.currentTrackView = new CurrentTrackView();

        this.listenTo(this.nav, "link:click", function(link) {
            this.navigate(link);

            if ( link === "home" ) {
                this.loadHome();
            }
        });

        this.listenTo(this.favoriteTracks, 'add:track', this.addFavorite);

        $("body").append( this.nav.render().el );
        $("body").append( this.searchBoxView.el );
        $("body").append( this.trackListView.el );

    },


    routes: {

        "" : "loadHome",
        "search/:q" : "loadHome",
        "favorites" : "loadFavorites"

    },


    loadHome: function(query) {


        this.tracks.loadTracks(query);
        this.searchBoxView.render();

        this.listenTo(this.tracks, "reset", function() {
            $("body").append( this.trackListView.render() );
        });

    },

    addFavorite: function(favoriteTrack) {
        this.favoriteTracks.add(favoriteTrack);


    },

    removeFavorite: function(favoriteTrack) {
        this.favoriteTracks.remove(favoriteTrack);
    }



})