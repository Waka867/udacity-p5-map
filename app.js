/* -------------------------- App data model below ------------------------------ */
var clientId = "RS2OHMJ3OBNBCLAXXX0BZCPSQ4P2N3ZFVJ2YW1ZUUYBL5WPC";
var	clientSecret = "R3PRHQAUQZ4H5WADS5SL03PNUSN4DQOXEDZ01H5L2EP1PY5E";
var urlCombo = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130806&ll=" + this.position + this.position + "&query=" + this.title;

var model = {
	locations: [
		{
			name: "Foot Locker",
			position: {lat: 40.719849, lng: -74.000165},
			posName: "mapPoint",
			infoUrl: urlCombo,
			infoContent: "<h1>440 Broadway</h1><p class='wikiStuff'></p>"
		},
		{
			name: "Verizon store",
			position: {lat: 40.719441, lng: -74.000855},
			posName: "mapPoint2",
			infoContent: "<h1>277 Canal St</h1><p class='Stuff'></p>"
		},
		{
			name: "Joey Pepperonis Pizza",
			position: {lat: 40.718517, lng: -74.003353},
			posName: "mapPoint3",
			infoContent: "<h1>381 Broadway</h1><p class='Stuff'></p>"
		},
		{
			name: "Tone Academy of Music",
			position: {lat: 40.718193, lng: -73.998766},
			posName: "mapPoint4",
			infoContent: "<h1>118-122 Baxter St #403</h1><p class='Stuff'></p>"
		},
		{
			name: "Blue Man Group Productions",
			position: {lat: 40.718811, lng: -74.001983},
			posName: "mapPoint5",
			infoContent: "<h1>412 Broadway</h1><p class='Stuff'></p>"
		}
	]
};

var locArray = model.locations;

var starter = function() {
	console.log("self deploying function test"); /* self deploying function test */
}();


/* -------------------------- App View below ------------------------------------------------------------ */
var view = function() {

	// var locArray = ko.observableArray(locArray);
	// var query = ko.observable('');

	console.log("View initialized");

	// var search = function(value) {
	// 	view.locArray.removeAll(); // list removal

	// 	for(x in locArray) {
	// 		if(locArray[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
	// 			view.locArray.push(locArray[x]);
	// 		}
	// 	}
	// }
};

// view.query.subscribe(view);

/* -------------------------- App Controller below ------------------------------------------------------ */

var mapPoint = model.locations[0].position;
var mapPoint2 = model.locations[1].position;
var mapPoint3 = model.locations[2].position;
var mapPoint4 = model.locations[3].position;
var mapPoint5 = model.locations[4].position;


var viewModel = {

	self: this,

	test: function() {
		console.log("test")
	}(), /* test */

	map: function() {
		new google.maps.Map(document.getElementById('map'), {
			center: mapPoint,
			zoom: 16,
			// draggable: false,
			noClear: true,
			// scrollwheel: false,
			mapTypeControl: false
		})
	},

	infowindow: function() {
		new google.maps.InfoWindow();
	},

	markers: [],

	addyInfo: [],

	locArray: function() {
		ko.observableArray(locArray)
	},
	// var query = ko.observable('');


	markerMaker: function(){
		for(i = 0; i < locArray.length; i++ ) {
			self.markers[i] = new google.maps.Marker({
				position: locArray[i].position,
				map: map,
				title: locArray[i].name,
				draggable: false,
				info: locArray[i].infoContent,
				animation: google.maps.Animation.DROP,
			});

			console.log(markers[i].title); /* test - NOTE: log lists all address correctly */

			google.maps.event.addListener(markers[i], 'click', function () {
				console.log("Click successful on " + this.title); /* test */
				var ajax = $.ajax({
					// crossDomain: true,
					url: urlCombo,
					headers: { 'Api-User-Agent': 'Example/1.0' },
					dataType: "jsonp",
					// error:
					jsonpCallback:"",
					test: console.log(this.title), /* TEST to make sure correct marker instance is being referred to by this */
					posi: console.log(this.position) /* logs an object with lat and lng methods, however these should just show the valules rather than be methods */
				})
				infowindow.setContent(this.info);
				infowindow.open(map, this);
				// toggleBounce();
			});
		};

		var search = function(value) {
			view.locArray.removeAll(); // list removal

			for(x in locArray) {
				if(locArray[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
					view.locArray.push(locArray[x]);
				}
			}
		};

		// function toggleBounce() {
		// 	console.log(m.animation);
		// 	if (m.getAnimation() !== null) {
		// 		m.setAnimation(null);
		// 	} else {
		// 		m.setAnimation(google.maps.Animation.BOUNCE);
		// 	};
		// };
	},
};

var errorFunc = function () {
	alert("Neighborhood MAP HELPER COULD NOT LOAD.");
};

$(document).ready(function(){
// 	// ko.applyBindings(viewer);
	ko.applyBindings(viewModel);
	// viewModel.markerMaker();
	// view();/* Initializes view variables and methods*/
});