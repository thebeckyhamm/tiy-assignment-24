var NavView = Backbone.View.extend({

    template: JST["navView"],

    tagName: "nav",

    render: function() {
        this.$el.html( this.template() );

        return this;
    }
});