var map;
function initMap() {
	var mapPoint = {lat: 40.719656, lng: -74.000781};
	var mapPoint2 = {lat: 40.716432, lng: -74.000293};

	var map = new google.maps.Map(document.getElementById('map'), {
		center: mapPoint,
		zoom: 16,
		draggable: false,
		noClear: true,
		scrollwheel: false,
		mapTypeControl: false
	});

	var marker = new google.maps.Marker({
		position: mapPoint,
		map: map,
		title: "Location1",
		label: "Location #1",
		draggable: true
	});

	function toggleBounce() {
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		};
	};

	marker.addListener('click', toggleBounce);
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

/* -------------------------- App data model below ------------------------------ */
var model = {

};

/* -------------------------- App View below ------------------------------ */
var view = {

};

/* -------------------------- App Controller below ------------------------------ */
var viewmodel = function() {

	testFunction = function() {
	};

	mapFunction = function() {
		console.log("map function called");
		mapArea.append();
	};

    // EXAMPLE.text("");
    // clear out old data before new request

    clickStuff = function() {
		console.log("chirp submit button click");
		// body.empty();
		// map.append
	};

};

$(document).ready(function(){

	ko.applyBindings(viewmodel);

	viewmodel();

	mapFunction();

	console.log(mapUrl);

});