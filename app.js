/* -------------------------- App data model below ------------------------------ */
var model = {
	clientId: "RS2OHMJ3OBNBCLAXXX0BZCPSQ4P2N3ZFVJ2YW1ZUUYBL5WPC",
	clientSecret: "R3PRHQAUQZ4H5WADS5SL03PNUSN4DQOXEDZ01H5L2EP1PY5E",
	locations: [
		{
			name: "34 Howard Street",
			position: {lat: 40.719656, lng: -74.000781},
			posName: "mapPoint",
			infoContent: "<h1>34 Howard Street</h1><p class='wikiStuff'></p>"
		},
		{
			name: "222 West Broadway",
			position: {lat: 40.719196, lng: -74.006356},
			posName: "mapPoint2",
			infoContent: "<h1>222 West Broadway</h1><p class='wikiStuff'></p>"
		},
		{
			name: "5 Crosby Street",
			position: {lat: 40.719606, lng: -74.000221},
			posName: "mapPoint3",
			infoContent: "<h1>5 Crosby Street</h1><p class='wikiStuff'></p>"
		},
		{
			name: "59 Elizabeth Street",
			position: {lat: 40.717253, lng: -73.996556},
			posName: "mapPoint4",
			infoContent: "<h1>59 Elizabeth Street</h1><p class='wikiStuff'></p>"
		},
		{
			name: "271 Church Street",
			position: {lat: 40.718268, lng: -74.005223},
			posName: "mapPoint5",
			infoContent: "<h1>271 Church Street</h1><p class='wikiStuff'></p>"
		}
	]
};

/* -------------------------- App View below ------------------------------------------------------------ */
var view = function() {
	this.listLoc1 = ko.observable(model.locations[0].name);
	this.listLoc2 = ko.observable(model.locations[1].name);
	this.listLoc3 = ko.observable(model.locations[2].name);
	this.listLoc4 = ko.observable(model.locations[3].name);
	this.listLoc5 = ko.observable(model.locations[4].name);

	mapFunction = function() {
		console.log("map function called");/* TEST FUNCTION ----------------     --------------    TEST FUNCTION */
		mapArea.append();
	};
};

/* -------------------------- App Controller below ------------------------------------------------------ */


var mapPoint = model.locations[0].position;
var mapPoint2 = model.locations[1].position;
var mapPoint3 = model.locations[2].position;
var mapPoint4 = model.locations[3].position;
var mapPoint5 = model.locations[4].position;

var mapPointname = model.locations[0].name;
var mapPoint2name = model.locations[1].name;
var mapPoint3name = model.locations[2].name;
var mapPoint4name = model.locations[3].name;
var mapPoint5name = model.locations[4].name;

// var pointList = model.locations;

var viewModel = function() {

	var pointList = model.locations;

	var self = this;

	var map = new google.maps.Map(document.getElementById('map'), {
		center: mapPoint,
		zoom: 16,
		// draggable: false,
		noClear: true,
		// scrollwheel: false,
		mapTypeControl: false
	});

	var infowindow = new google.maps.InfoWindow();

	var markers = [];
	var wikiInfo = [];

	for(i = 0; i < pointList.length; i++ ) {
		markers[i] = new google.maps.Marker({
			position: pointList[i].position,
			map: map,
			title: pointList[i].name,
			draggable: false,
			info: pointList[i].infoContent,
			animation: google.maps.Animation.DROP,
		});

		var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + markers[i].title + '&prop=revisions&rvprop=content&format=json';

		console.log(markers[i].title); /* test - NOTE: log lists all address correctly */

		google.maps.event.addListener(markers[i], 'click', function () {
			console.log("Click successful on " + this.title); /* test */
			infowindow.setContent(this.info);
			infowindow.open(map, this);
			// toggleBounce();
			// -------------------------------------------------------
			var ajax = $.ajax({
				url: wikiUrl,
				dataType: "jsonp",
				headers: { 'Api-User-Agent': 'Example/1.0' }
			}).done(function(response) {
				console.log(response);
				// var articleList = response;
				// var wLength = articleList.length;
				// console.log(wikiUrl);
			// for (var i = 0; i < wLength; i++) {
			// };
			});
		});


		// function toggleBounce() {
		// 	console.log(m.animation);
		// 	if (m.getAnimation() !== null) {
		// 		m.setAnimation(null);
		// 	} else {
		// 		m.setAnimation(google.maps.Animation.BOUNCE);
		// 	};
		// };

	// console.log(wikiUrl);

	};

	// var ajax = $.ajax({
	// 	url: wikiUrl,
	// 	dataType: "jsonp",
	// 	headers: { 'Api-User-Agent': 'Example/1.0' }
	// }).done(function(response) {
	// 	var articleList = response;
	// 	var wLength = articleList.length;
	// 	console.log(response);
	// 	for (var i = 0; i < wLength; i++) {
	// 		articleStr = articleList[i];
	// 		var url = 'http://en.wikipedia.org/wiki/' + articleStr;
	// 		// $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li><br>');
	// 	};
	// 	// clearTimeout(wikiErrorTimeout);
	// });

	// for (var i = 0; i < wLength; i++) {
	// 	articleStr = articleList[i];
	// 	var url = 'http://en.wikipedia.org/wiki/' + articleStr;
	// 	$wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li><br>');
	// };
	// 	clearTimeout(wikiErrorTimeout);
	// });
	// return false;
};

var mapArea = $("#map");
// var svKey = "AIzaSyCAYhJSCo97R9osuDm5D82SHs0oEJSzbk8";
// var mapKey = "AIzaSyBk1lO9a-jKHIAPJLO0IG0vJ6cnwEkV5cQ";

var errorFunc = function () {
	alert("Neighborhood MAP HELPER COULD NOT LOAD.");
};

$(document).ready(function(){

	ko.applyBindings(view);

});