/* -------------------------- App data model below ------------------------------ */
var model = {
	locations: [
		{
			name: "34 Howard Street",
			position: {lat: 40.719656, lng: -74.000781},
			posName: "mapPoint",
			infoContent: "<h1>34 Howard Street</h1>"
		},
		{
			name: "222 West Broadway",
			position: {lat: 40.719196, lng: -74.006356},
			posName: "mapPoint2",
			infoContent: "<h1>222 West Broadway</h1>"
		},
		{
			name: "5 Crosby Street",
			position: {lat: 40.719606, lng: -74.000221},
			posName: "mapPoint3",
			infoContent: "<h1>5 Crosby Street</h1>"
		},
		{
			name: "59 Elizabeth Street",
			position: {lat: 40.717253, lng: -73.996556},
			posName: "mapPoint4",
			infoContent: "<h1>59 Elizabeth Street</h1>"
		},
		{
			name: "271 Church Street",
			position: {lat: 40.718268, lng: -74.005223},
			posName: "mapPoint5",
			infoContent: "<h1>271 Church Street</h1>"
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

	function toggleBounce() {
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		};
	};

	var infowindow = new google.maps.InfoWindow();

	var markers = [];

	for(i = 0; i < pointList.length; i++ ) {
		markers[i] = new google.maps.Marker({
			position: pointList[i].position,
			map: map,
			title: pointList[i].name,
			draggable: false,
			info: pointList[i].infoContent,
			animation: google.maps.Animation.DROP,
			// test: console.log(google.maps.Marker)
		});

		google.maps.event.addListener(markers[i], 'click', function () {
			console.log("Test log in for loop event listener"); /* test */
			infowindow.setContent(this.info);
			infowindow.open(map, this);
			// toggleBounce(markers[i]);
		});

		console.log(markers[i].title);
	};

	console.log("Now logging: " + markers[3].title);

	console.log(pointList); /* Test */
	console.log(pointList[1].name); /* Test */
};

// var body = $("body");
// var address = $("#address").val();
// var zip = $("#zip").val();
// var state = $("#state").val();
var mapArea = $("#map");
// var locationList = $("#location-list");
// var formContainer = $("#form-container");
// var mapUrl = "https://maps.googleapis.com/maps/api/js?size=1920x1080&location=14612&pitch=45&key=AIzaSyCAYhJSCo97R9osuDm5D82SHs0oEJSzbk8";
// var svKey = "AIzaSyCAYhJSCo97R9osuDm5D82SHs0oEJSzbk8";
// var mapKey = "AIzaSyBk1lO9a-jKHIAPJLO0IG0vJ6cnwEkV5cQ";

var errorFunc = function () {
	alert("Neighborhood MAP HELPER COULD NOT LOAD.");
};

$(document).ready(function(){

	ko.applyBindings(view);

});