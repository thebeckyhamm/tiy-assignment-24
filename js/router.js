var App = Backbone.Router.extend({

    initialize: function() {
        // create nav view
        this.nav = new NavView();
        
        // create tracks and favorite tracks
        this.tracks = new TrackCollection();
        this.favoriteTracks = new FavoriteTrackCollection();

        // create search box view
        // this.searchBoxView = new SearchBoxView({
        //     el: ".search-box"
        // });

        // this.currentTrackView = new CurrentTrackView({
        //     collection: this.tracks,
        //     el: ".current-track"
        // });

        // this.infoView = new InfoView({
        //     collection: this.tracks,
        //     el: ".info-view"
        // });

        // create track list
        // this.trackListView = new TrackListView({
        //     collection: this.tracks,
        //     el: ".all-tracks"
        // });

        // create favorite track list view
        // this.favoriteTrackListView = new FavoriteTrackListView({
        //     collection: this.favoriteTracks,
        //     el: ".favorite-tracks"
        // });

        this.homeView = new HomeView({
            collection: this.tracks,
            el: ".home"
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

        this.listenTo(this.homeView, 'play:currentTrack', function(id) {
            this.playTrack(id);
        });

        // pause listener
        this.listenTo(this.homeView, 'pause:track', function(id) {
            this.pauseTrack(id);
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
        this.tracks.loadTracks(query);

        this.listenTo(this.tracks, "reset", function() {
            $("body").append( this.homeView.render() );
        });

    },

    loadFavorites: function() {
        this.favoriteTracks.fetch();
        this.favoriteTracks.on('sync', function(collection) {

            console.log('collection is loaded', collection);
            $("body").append( this.favoriteTrackListView.render().el );
        
        }.bind(this));
    },

    playTrack: function(id) {
        this.tracks.get(id).play();
    },

    pauseTrack: function(id) {
        this.tracks.get(id).pause();   
    },

    addFavorite: function(favoriteTrackID) {
        this.favoriteTracks.add(this.tracks.get(favoriteTrackID));
    },

    removeFavorite: function(favoriteTrackID) {
        this.favoriteTracks.remove(this.favoriteTracks.get(favoriteTrackID));
    }



})