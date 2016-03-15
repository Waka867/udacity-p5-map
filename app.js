/* -------------------------- App data model below ------------------------------ */
var model = {
	locations: [
		{
			name: "34 Howard Street",
			position: {lat: 40.719656, lng: -74.000781}
		},
		{
			name: "222 West Broadway",
			position: {lat: 40.719196, lng: -74.006356}
		},
		{
			name: "5 Crosby Street",
			position: {lat: 40.719606, lng: -74.000221}
		},
		{
			name: "59 Elizabeth Street",
			position: {lat: 40.717253, lng: -73.996556}
		},
		{
			name: "271 Church Street",
			position: {lat: 40.718268, lng: -74.005223}
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
};

/* -------------------------- App Controller below ------------------------------------------------------ */
var viewmodel = function() {

	mapFunction = function() {
		console.log("map function called");/* TEST FUNCTION ----------------     --------------    TEST FUNCTION */
		mapArea.append();
	};
    // EXAMPLE.text("");
    // clear out old data before new request
};

// var map; /* ------ I may need this, not sure yet */

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

function initMap() {

	var map = new google.maps.Map(document.getElementById('map'), {
		center: mapPoint,
		zoom: 16,
		// draggable: false,
		noClear: true,
		// scrollwheel: false,
		mapTypeControl: false
	});

	var marker = new google.maps.Marker({
		position: mapPoint,
		map: map,
		title: mapPointname,
		// label: mapPointname,
		draggable: true
	});

	var marker2 = new google.maps.Marker({
		position: mapPoint2,
		map: map,
		title: mapPoint2name,
		// label: mapPoint2name,
		draggable: true
	});

	var marker3 = new google.maps.Marker({
		position: mapPoint3,
		map: map,
		title: mapPoint3name,
		// label: mapPoint3name,
		draggable: true
	});

	var marker4 = new google.maps.Marker({
		position: mapPoint4,
		map: map,
		title: mapPoint4name,
		// label: mapPoint4name,
		draggable: true
	});

	var marker5 = new google.maps.Marker({
		position: mapPoint5,
		map: map,
		title: mapPoint5name,
		// label: mapPoint5name,
		draggable: true
	});

	function toggleBounce() {
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		};
	};

	var infobox = "<h1>" + mapPointname + "</h1>";

	var infowindow = new google.maps.InfoWindow({
		content: infobox
	});

	marker.addListener('click', function() {
		infowindow.open(map, marker);
		toggleBounce();
	});
};


var body = $("body");
var address = $("#address").val();
var zip = $("#zip").val();
var state = $("#state").val();
var mapArea = $("#map");
var locationList = $("#location-list");
var formContainer = $("#form-container");
var mapUrl = "https://maps.googleapis.com/maps/api/js?size=1920x1080&location=14612&pitch=45&key=AIzaSyCAYhJSCo97R9osuDm5D82SHs0oEJSzbk8";
var svKey = "AIzaSyCAYhJSCo97R9osuDm5D82SHs0oEJSzbk8";
var mapKey = "AIzaSyBk1lO9a-jKHIAPJLO0IG0vJ6cnwEkV5cQ";


$(document).ready(function(){

	ko.applyBindings(view);

	viewmodel();

	view();

	mapFunction();

	console.log(model.locations[2].position);/* TEST FUNCTION ----------------     --------------    TEST FUNCTION */

});