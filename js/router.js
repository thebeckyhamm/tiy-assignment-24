var App = Backbone.Router.extend({

    initialize: function() {
        // create nav view
        this.nav = new NavView();
        
        // create tracks and favorite tracks
        this.tracks = new TrackCollection();
        this.favoriteTracks = new FavoriteTrackCollection();

        // create search box view
        this.searchBoxView = new SearchBoxView({
            el: ".search-box"
        });

        this.currentTrackView = new CurrentTrackView({
            collection: this.tracks,
            el: ".current-track"
        });

        this.infoView = new InfoView({
            collection: this.tracks,
            el: ".info-view"
        });

        // create track list
        this.trackListView = new TrackListView({
            collection: this.tracks,
            el: ".all-tracks"
        });

        // create favorite track list view
        this.favoriteTrackListView = new FavoriteTrackListView({
            collection: this.favoriteTracks,
            el: ".favorite-tracks"
        });

        // nav listener
        this.listenTo(this.nav, "link:click", function(link) {
            this.navigate(link);

            if ( link === "home" ) {
                this.loadHome();
            }
            else {
                console.log("loading favorites");
                this.loadFavorites();
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

        this.listenTo(this.favoriteTrackListView, 'play:track', function(id) {
            this.playTrack(id);
        });

        this.listenTo(this.currentTrackView, 'play:track', function(id) {
            this.playTrack(id);
        });

        // pause listener
        this.listenTo(this.trackListView, 'pause:track', function(id) {
            this.pauseTrack(id);
        });

        this.listenTo(this.favoriteTrackListView, 'pause:track', function(id) {
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


        $("body").prepend( this.nav.render().el );

    },


    routes: {

        "" : "loadHome",
        "search/:q" : "loadHome",
        "favorites" : "loadFavorites"

    },

    loadHome: function(query) {
        this.favoriteTrackListView.$el.detach();
        this.tracks.loadTracks(query);

        this.searchBoxView.render();

        this.listenTo(this.tracks, "reset", function() {
            $(".track-search").append( this.currentTrackView.render().el );
            $(".track-search").append( this.searchBoxView.render().el );
            $("body").append( this.infoView.render().el );
            $("body").append( this.trackListView.render().el );
        });

    },

    loadFavorites: function() {
        this.trackListView.$el.detach();
        this.favoriteTracks.fetch();
        this.favoriteTracks.on('sync', function(collection) {

            console.log('collection is loaded', collection);
            $("body").append( this.favoriteTrackListView.render().el );
            //$("body").prepend( this.currentTrackView.render().el );
        }.bind(this));
    },

    playTrack: function(id) {
        if (this.tracks.length !== 0) {
            this.tracks.get(id).play();
            this.infoView = new InfoView({
                model: this.tracks.get(id)
            });        
        }
        else {
            this.favoriteTracks.get(id).play();
            this.infoView = new InfoView({
                model: this.favoriteTracks.get(id)
            });
        }
        $("body").append( this.infoView.render().el);

    },

    pauseTrack: function(id) {
        if (this.tracks.length !== 0) {
            this.tracks.get(id).pause();   
        }
        else {
            this.favoriteTracks.get(id).pause();   

        }

    },




    addFavorite: function(favoriteTrackID) {
        this.favoriteTracks.add(this.tracks.get(favoriteTrackID));
    },

    removeFavorite: function(favoriteTrackID) {
        this.favoriteTracks.remove(this.favoriteTracks.get(favoriteTrackID));
    }



})