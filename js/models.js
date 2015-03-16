var Track = Backbone.Model.extend({

    initialize: function() {
        this.on("track:loaded", this.play);

    },

    play: function() {
        if (!this.stream) {
            this.loadTrack();
        }
        else {
            this.stream.play();
        }
    },

    pause: function() {
        this.stream.pause();
    },

    loadTrack: function() {
        SC.stream('/tracks/' + this.id, function(sound) {
            this.stream = sound;
            this.trigger("track:loaded");
        }.bind(this));
    }

});


var TrackCollection = Backbone.Collection.extend({

    model: Track,

    loadTracks: function(query) {
        SC.get('/tracks', { q: query }, function(data) {
            var streamableData = _.filter(data, function(datum) {
                return datum.streamable;
            });
            this.reset(streamableData);
            this.trigger("tracks:loaded");
        }.bind(this));
    }

});

var FavoriteTrackCollection = Backbone.Firebase.Collection.extend({

    model: Track,
    url: "https://tiy-soundcloud.firebaseio.com/collections/favoriteTracks",
    autoSync: false

});

