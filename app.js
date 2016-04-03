/* -------------------------- App data model below ------------------------------ */
// var clientId = "RS2OHMJ3OBNBCLAXXX0BZCPSQ4P2N3ZFVJ2YW1ZUUYBL5WPC";
// var	clientSecret = "R3PRHQAUQZ4H5WADS5SL03PNUSN4DQOXEDZ01H5L2EP1PY5E";
// var urlCombo = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130806&ll=" + this.position + this.position + "&query=" + this.title;

var model = {
	locations: [
		{
			name: "New York Public Library",
			position: {lat: 40.7135559, lng: -74.0077815},
			posName: "mapPoint",
			// infoUrl: urlCombo,
			infoContent: "<h1>9 Murray St</h1><p class='wikiStuff'></p>"
		},
		{
			name: "New York City Hall",
			position: {lat: 40.712705, lng: -74.0059778},
			posName: "mapPoint2",
			infoContent: "<h1>City Hall Pk</h1><p class='Stuff'></p>"
		},
		{
			name: "The Woolworth Building",
			position: {lat: 40.7123824, lng: -74.0081218},
			posName: "mapPoint3",
			infoContent: "<h1>233 Broadway</h1><p class='Stuff'></p>"
		},
		{
			name: "One World Trade Center",
			position: {lat: 40.713154, lng: -74.013661},
			posName: "mapPoint4",
			infoContent: "<h1>285 Fulton St</h1><p class='Stuff'></p>"
		},
		{
			name: "St. Peter's Roman Catholic Church",
			position: {lat: 40.7123014, lng: -74.0095246},
			posName: "mapPoint5",
			infoContent: "<h1>22 Barclay St</h1><p class='Stuff'></p>"
		}
	]
};

/* -------------------------- App View below ------------------------------------------------------------ */
var view = {

	// var locArray = ko.observableArray(locArray);
	// var query = ko.observable('');

	// console.log("View initialized");

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


var markers = [];

var addyInfo = [];

var locArray = model.locations;

var viewModel = {

	self: this,

	// var query = ko.observable('');

	markerMaker: function(){

		for(i = 0; i < locArray.length; i++ ) {
			markers[i] = new google.maps.Marker({
				position: locArray[i].position,
				map: map,
				title: locArray[i].name,
				draggable: false,
				info: locArray[i].infoContent,
				animation: google.maps.Animation.DROP,
			});

			infowindow = function() {
				new google.maps.InfoWindow();
			};

			console.log(markers[i].title); /* test - NOTE: log lists all address correctly */
			console.log(locArray[i].position); /* Correct */

			google.maps.event.addListener(markers[i], 'click', function () {
				console.log("Click successful on " + this.title); /* test */
				// var ajax = $.ajax({
				// 	// crossDomain: true,
				// 	url: urlCombo,
				// 	headers: { 'Api-User-Agent': 'Example/1.0' },
				// 	dataType: "jsonp",
				// 	// error:
				// 	jsonpCallback:"",
				// 	test: console.log(this.title),  TEST to make sure correct marker instance is being referred to by this
				// 	posi: console.log(this.position) /* logs an object with lat and lng methods, however these should just show the valules rather than be methods */
				// })
				// infowindow.setContent(this.info);
				// infowindow.open(map, this);
				toggleBounce(this);
			});
		};

		// var search = function(value) {
		// 	view.locArray.removeAll(); // list removal

		// 	for(x in locArray) {
		// 		if(locArray[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
		// 			view.locArray.push(locArray[x]);
		// 		}
		// 	}
		// };

		function toggleBounce(m) {
			if (m.getAnimation() !== null) {
				m.setAnimation(null);
			} else {
				m.setAnimation(google.maps.Animation.BOUNCE);
			};
		};
	},
};

// var errorFunc = function () {
// 	alert("Neighborhood MAP HELPER COULD NOT LOAD.");
// };

var starter = function() {
	console.log("starter callback triggered - main map initialized");

	map = new google.maps.Map(document.getElementById('map'), {
			center: locArray[0].position,
			zoom: 17,
			// draggable: false,
			noClear: true,
			// scrollwheel: false,
			mapTypeControl: false
	});

	// viewModel.map();
	viewModel.markerMaker();
	ko.applyBindings(viewModel);
	// viewModel.markerMaker(); /* Was causing double actions because markerMaker runs automatically */
};


$(document).ready(function(){

	// ko.applyBindings(viewModel);

	// viewModel.markerMaker(); /* Previously used to start marker creation */

	// view();/* Initializes view variables and methods*/
});