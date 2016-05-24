var markers = [];

var infowindow;

/* -------------------------- App data model below ------------------------------ */
var model = {
	locations: [
		{
			name: "New York Public Library",
			position: {lat: 40.7135559, lng: -74.0077815},
			posName: "mapPoint",
			address: "9 Murray St",
			infoContent: "<h1>9 Murray St</h1><p class='wikiStuff'></p>",
			markerID: 0
		},
		{
			name: "New York City Hall",
			position: {lat: 40.712705, lng: -74.0059778},
			posName: "mapPoint2",
			address: "City Hall Pk",
			infoContent: "<h1>City Hall Pk</h1><p class='wikiStuff'></p>",
			markerID: 1
		},
		{
			name: "Woolworth Building",
			position: {lat: 40.7123824, lng: -74.0081218},
			posName: "mapPoint3",
			address: "233 Broadway",
			infoContent: "<h1>233 Broadway</h1><p class='wikiStuff'></p>",
			markerID: 2
		},
		{
			name: "One World Trade Center",
			position: {lat: 40.713154, lng: -74.013661},
			posName: "mapPoint4",
			address: "285 Fulton St",
			infoContent: "<h1>285 Fulton St</h1><p class='wikiStuff'></p>",
			markerID: 3
		},
		{
			name: "St. Peter's Roman Catholic Church",
			position: {lat: 40.7123014, lng: -74.0095246},
			posName: "mapPoint5",
			address: "22 Barclay St",
			infoContent: "<h1>22 Barclay St</h1><p class='wikiStuff'></p>",
			markerID: 4
		}
	]
};

var locArray = model.locations;

var locData = [];

var locConstructor = function(data){
	// this.name = ko.observable(data.name);
};

// Function helps turn off subheader when a marker is clicked
var truthy = function() {
	if(viewModel.isSubHeaderVisible() === true) {
		viewModel.isSubHeaderVisible(false);
	};
};

/* -------------------------- App Controller / View Model below ------------------------------------------------------ */

var viewModel = {
	isSubHeaderVisible: ko.observable(''),

	locVis: ko.observable(true),

	query: ko.observable(''),

	places: ko.observableArray(),

	pusher: function(){
		for(i = 0; i < markers.length; i++){
			// console.log("locations are " + locationData.name);
			// console.log(viewModel.locations());

			// Here is where you should push individual markers into locData, although it may not really be necessary because that may be redundant
			console.log(markers[i].title);

		};
	},

	// Makes markers bounce when clicked or activated
	toggleBounce: function(m) {
		if (m.getAnimation() !== null) {
			m.setAnimation(null);
		} else {
			m.setAnimation(google.maps.Animation.BOUNCE);
		};
		// Limits how long a marker will bounce for when clicked or activated
		setTimeout(function(){
			m.setAnimation(null);
		}, 1400)
	},

	// Creates markers and adds click listener
	markerMaker: function(){
		for(i = 0; i < locArray.length; i++ ) {
			markers[i] = new google.maps.Marker({
				position: locArray[i].position,
				map: map,
				title: locArray[i].name,
				draggable: false,
				info: locArray[i].infoContent,
				animation: google.maps.Animation.DROP,
				address: locArray[i].address,
				markerID: locArray[i].markerID,
				bouncy: function() {
					viewModel.toggleBounce(this);
				},
			});

			google.maps.event.addListener(markers[i], 'click', function () {
				viewModel.toggleBounce(this);

				if(!infowindow) {
						infowindow = new google.maps.InfoWindow({
					});
				};
				infowindow.setContent(this.info);
				infowindow.open(map, this);

				var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + this.title + '&format=json';

				truthy();

				var ajax = $.ajax({
					url: wikiUrl,
					dataType: "jsonp",
					headers: { 'Api-User-Agent': 'Example/1.0' }
				}).done(function(response) {
					var respLength = response.length;
					var respTitle = response[0];
					var respSumm = response[2];
					var wikiLinks = response[3];
					/* Appends wikipedia sourced info to the infowindow via the model and each locations infoContent key */
					$(".wikiStuff").append("<h3>" + respTitle + "</h3><p>" + respSumm[0] + "</p><p><a href=" + wikiLinks[0] + " target='_blank'>Learn more about " + respTitle + " here</a></p>");
				});
			});
		};
	},

	// Search function for text input box
	search: function(value) {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		};

		for(var x in markers) {
			if(markers[x].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
			markers[x].setMap(map);
			};
		};

		// Resets map markers when input box becomes empty again
		if(value = undefined) {
			viewModel.markerMaker();
		};
	},

	// Resets map markers and subheader
	listReset: function() {
		if(value = undefined) {
			viewModel.markerMaker();
		};
	},

	// Clears subheader when subheader is clicked
	subheaderClear: function() {
		viewModel.isSubHeaderVisible(false);
	},

	// Puts together subheader when a list item is clicked
	listClick: function() {
		var self = this;

		var id = self.markerID;

		if($("#listClicked") != null) {
			viewModel.subheaderClear();
		};

		$("#listClicked").html("<h3>" + markers[id].title + " - " + markers[id].address + "</h3>");
		// Starts the toggleBounce function located within each marker object
		markers[id].bouncy();

		viewModel.isSubHeaderVisible(true);
	}
};

/* -------------------------- App View below ------------------------------------------------------------ */

var view = {
	viewStarter: function() {
		map = new google.maps.Map(document.getElementById('map'), {
				center: locArray[0].position,
				zoom: 17,
				// draggable: false,
				noClear: true,
				scrollwheel: false,
				mapTypeControl: false
		});

		viewModel.markerMaker();

		viewModel.pusher();
	},

	// Error message
	GMerrorhandler: function() {
		console.log("Google Maps service encountered a problem and could not load");
		alert("Google Maps service encountered a problem and could not load");
	}
};

window.onerror = function () {
	alert("Neighborhood Map Helper encountered an error and could not load. Please check your internet connection or submit a bug report");
};

$(document).ready(function() {
	viewModel.query.subscribe(viewModel.search);

	ko.applyBindings(viewModel);
});