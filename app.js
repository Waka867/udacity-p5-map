$(document).ready(function(){

	var body = $("body");
	var address = $("#address").val();
	var zip = $("#zip").val();
	var state = $("#state").val();
	var map = $("#map");
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

		// InitPlaceholder: map.append("<img src='https://maps.googleapis.com/maps/api/streetview?size=900x300&location=Statue of liberty&pitch=45&key=AIzaSyCAYhJSCo97R9osuDm5D82SHs0oEJSzbk8'>")
		// Initbackground: body.css('background-image', 'url()'),

	};

	/* -------------------------- App Controller below ------------------------------ */
	var viewmodel = function() {

		testFunction = function() {

		};

		mapFunction = function() {
			console.log("map function called");
			map.append();
		};

        // EXAMPLE.text("");
        // clear out old data before new request

        clickStuff = function() {

			console.log("chirp submit button click");
			// body.empty();
			// map.append
		};

	};

	ko.applyBindings(viewmodel);

	viewmodel();

	mapFunction();

	console.log(mapUrl);

	// var map;
	//   function initMap() {
	//     map = new google.maps.Map(document.getElementById('map'), {
	//       center: {lat: 40.719656, lng: -74.000781},
	//       zoom: 18,
	//       draggable: false,
	//       noClear: true
	//     });
	//   }


});