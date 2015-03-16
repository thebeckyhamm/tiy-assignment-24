var App = Backbone.Router.extend({

    initialize: function() {
        // create nav view
        this.nav = new NavView();
        
        // create tracks and favorite tracks
        this.tracks = new TrackCollection();
        this.favoriteTracks = new FavoriteTrackCollection();

        this.homeView = new HomeView({
            collection: this.tracks,
            el: ".home"
        });

        this.favoritesView = new FavoritesView({
            collection: this.favoriteTracks,
            el: ".favorites"
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
        this.listenTo(this.homeView, 'addToFavorites:track', function(id) {
            this.addFavorite(id);
        });

        // remove from favorites listener for regular track list
        this.listenTo(this.homeView, 'removeFromFavorites:track', function(id) {
            this.removeFavorite(id);
        });

        // play listeners
        this.listenTo(this.homeView, 'play:track', function(id) {
            this.playTrack(id);
        });

        this.listenTo(this.favoritesView, 'play:track', function(id) {
            this.playFavoriteTrack(id);
        });

        // pause listener
        this.listenTo(this.homeView, 'pause:track', function(id) {
            this.pauseTrack(id);
        });

        this.listenTo(this.favoritesView, 'pause:track', function(id) {
            this.pauseFavoriteTrack(id);
        });

        // search box listener
        this.listenTo(this.homeView, "search:submitted", function(keyword, id) {

            this.loadHome(keyword, id);
            this.navigate("search/" + keyword);
        });


        $("body").prepend( this.nav.render().el );

    },


    routes: {

        "" : "loadHome",
        "home" : "loadHome",
        "search/:q" : "loadHome",
        "favorites" : "loadFavorites"

    },

    loadHome: function(query, id) {
        if(id) {
            this.tracks.get(id).pause();
        }

        this.favoritesView.$el.empty();

        this.tracks.loadTracks(query);

        this.listenTo(this.tracks, "reset", function() {
            $("body").append( this.homeView.render().el );
        });

    },

    loadFavorites: function() {
        this.homeView.$el.empty();
        this.favoriteTracks.on('sync', function(collection) {

            console.log('collection is loaded', collection);
            $("body").append( this.favoritesView.render().el );

        }.bind(this));

        this.favoriteTracks.fetch();
    },

    playTrack: function(id) {
        this.tracks.get(id).play();
    },

    pauseTrack: function(id) {
        this.tracks.get(id).pause();   
    },

    playFavoriteTrack: function(id) {
        this.favoriteTracks.get(id).play();
    },

    pauseFavoriteTrack: function(id) {
        this.favoriteTracks.get(id).pause();   
    },


    addFavorite: function(favoriteTrackID) {
        this.favoriteTracks.add(this.tracks.get(favoriteTrackID));
    },

    removeFavorite: function(favoriteTrackID) {
        this.favoriteTracks.remove(this.favoriteTracks.get(favoriteTrackID));
    }



});