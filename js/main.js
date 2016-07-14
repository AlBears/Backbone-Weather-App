
var Weather = Backbone.Model.extend({

	url: "http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&units=metric&APPID=",
	key: "",

	initialize: function(){
		this.setUrl();
		this.fetch();
		var self = this;
        setInterval(function() {
        self.fetch();
        }, 30000);

	},

	setUrl: function(){
		this.url = this.url + this.key;
	},

	fetch: function(options){
		options = options || {};
		options.dataType = 'jsonp';

		Backbone.Model.prototype.fetch.call(this, options);

	},

	parse: function(data){
		console.log(data);
		return data.main;
	}

});

var WeatherView = Backbone.View.extend({
	el: 'div',
	id: 'app',
	template: _.template($("#weather-template").html()),


	initialize: function(){
		_.bindAll(this, 'render');
		this.model.bind('change', this.render);
		this.render();

	},

	render: function(){

		var html = this.template({'weather': this.model.toJSON()});
		this.$el.html(html);
		return this;	
	}
})

var weatherView = new WeatherView({model: new Weather});




