var App = Backbone.Router.extend({

    initialize: function() {

        this.nav = new NavView();
        
        this.tracks = new TrackCollection();
        this.favoriteTracks = new FavoriteTrackCollection();

        this.searchBoxView = new SearchBoxView();
        //this.infoView = new InfoView();
        this.currentTrackView = new CurrentTrackView();

        this.trackListView = new TrackListView({
            collection: this.tracks
        });

        this.favoriteTrackListView = new FavoriteTrackListView({
            collection: this.favoriteTracks
        });


        this.listenTo(this.nav, "link:click", function(link) {
            this.navigate(link);

            if ( link === "home" ) {
                this.loadHome();
            }
        });

        this.listenTo(this.trackListView, 'addToFavorites:track', function(id) {
            this.addFavorite(id);
        });

        this.listenTo(this.trackListView, 'removeFromFavorites:track', function(id) {
            this.removeFavorite(id);
        });

        this.listenTo(this.favoriteTrackListView, 'removeFromFavorites:track', function(id) {
            this.removeFavorite(id);
        });

        this.listenTo(this.trackListView, 'play:track', function(id) {
            this.playTrack(id);
        });

        this.listenTo(this.trackListView, 'pause:track', function(id) {
            this.pauseTrack(id);
        });

        this.listenTo(this.searchBoxView, "search:submitted", function(keyword) {
            console.log("listen to got it");
            this.loadHome(keyword);

            this.navigate("search/" + keyword);
        })





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

    playTrack: function(id) {
        this.tracks.get(id).play();
        console.log(this.tracks.get(id));
        this.infoView = new InfoView({
            model: this.tracks.get(id)
        });
        $("body").append( this.infoView.render().el);
    },

    pauseTrack: function(id) {
        this.tracks.get(id).pause();
    },

    addFavorite: function(favoriteTrackID) {
        console.log(this.tracks.get(favoriteTrackID));        
        this.favoriteTracks.add(this.tracks.get(favoriteTrackID));
    },

    removeFavorite: function(favoriteTrackID) {
        this.favoriteTracks.remove(this.favoriteTracks.get(favoriteTrackID));
    }



})