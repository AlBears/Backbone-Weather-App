
var Weather = Backbone.Model.extend({ 
	
	url: "http://api.openweathermap.org/data/2.5/weather?units=metric&APPID=",
	key: "",

	initialize: function(){
		this.getLocation();
		var self = this;
        setInterval(function() {
        self.fetch();
        }, 30000);

	},

	gotLocation: function(data) {
		var coord = data.loc.split(',');
		var location = {lat:coord[0], lon:coord[1]};
		this.setUrl(location);
		
	},

	getLocation: function(){
		var self = this;
		$.getJSON('http://ipinfo.io', function(location){
		self.gotLocation(location)
		});
		
	},

	setUrl: function(location){
		this.url = this.url + this.key +"&lat="+location.lat+"&lon="+location.lon;
		this.fetch();
	},

	fetch: function(options){
		options = options || {};
		options.dataType = 'jsonp';

		Backbone.Model.prototype.fetch.call(this, options);

	},

	parse: function(data){
		console.log(data);
		return {
			temp: data.main.temp,
			name: data.name,
			pressure: data.main.pressure,
			description: data.weather[0].description,
			humidity: data.main.humidity
		}
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




