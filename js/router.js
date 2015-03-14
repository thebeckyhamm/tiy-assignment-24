var App = Backbone.Router.extend({

    initialize: function() {
        // create nav view
        this.nav = new NavView();
        
        // create tracks and favorite tracks
        this.tracks = new TrackCollection();
        this.favoriteTracks = new FavoriteTrackCollection();

        // create search box view
        this.searchBoxView = new SearchBoxView();

        this.currentTrackView = new CurrentTrackView({
            collection: this.tracks
        });

        // create track list
        this.trackListView = new TrackListView({
            collection: this.tracks
        });

        // create favorite track list view
        this.favoriteTrackListView = new FavoriteTrackListView({
            collection: this.favoriteTracks
        });

        // nav listener
        this.listenTo(this.nav, "link:click", function(link) {
            this.navigate(link);

            if ( link === "home" ) {
                this.loadHome();
            }
        });

        // add to favorites listener
        this.listenTo(this.trackListView, 'addToFavorites:track', function(id) {
            this.addFavorite(id);
        });

        // remove from favorites listener for regular track list
        this.listenTo(this.trackListView, 'removeFromFavorites:track', function(id) {
            this.removeFavorite(id);
        });

        // remove from favorites listener for favorite track list
        this.listenTo(this.favoriteTrackListView, 'removeFromFavorites:track', function(id) {
            this.removeFavorite(id);
        });

        // play listeners
        this.listenTo(this.trackListView, 'play:track', function(id) {
            this.playTrack(id);
        });

        this.listenTo(this.currentTrackView, 'play:track', function(id) {
            this.playTrack(id);
        });

        // pause listener
        this.listenTo(this.trackListView, 'pause:track', function(id) {
            this.pauseTrack(id);
        });

        this.listenTo(this.currentTrackView, 'pause:track', function(id) {
            this.pauseTrack(id);
        });


        // search box listener
        this.listenTo(this.searchBoxView, "search:submitted", function(keyword) {
            this.loadHome(keyword);

            this.navigate("search/" + keyword);
        });


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

            $("body").prepend( this.currentTrackView.render().el );
        });

    },

    playTrack: function(id) {
        this.tracks.get(id).play();
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