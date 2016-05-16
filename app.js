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

// var trueOrFalse = true;

// var truthy = function() {
// 	if(viewModel.isSubHeaderVisible === true) {
// 		viewModel.isSubHeaderVisible = false;
// 	} else {
// 		viewModel.isSubHeaderVisible = true;
// 	};
// 	console.log("werwerwe");
// };

// var isSubHeaderVisible = ko.observable(trueOrFalse);

// var locVis = ko.observable(trueOrFalse);

/* -------------------------- App Controller below ------------------------------------------------------ */

var viewModel = {

	isSubHeaderVisible: ko.observable(true),

	locVis: ko.observable(true),

	query: ko.observable(''),

	locations: ko.observableArray(markers),

	toggleBounce: function(m) {
		if (m.getAnimation() !== null) {
			m.setAnimation(null);
		} else {
			m.setAnimation(google.maps.Animation.BOUNCE);
		};
		setTimeout(function(){
			m.setAnimation(null); /* Limits how long a marker will bounce for when clicked */
		}, 1400)
	},

	// The truthy function is supposed to get called when a user clicks on a marker, thus closing a subheader if it's open or vice versa
	// It still doesn't seem to work. I'm having trouble finding ways to get this to work

	truthy: function() {
		if(viewModel.isSubHeaderVisible === true) {
			viewModel.isSubHeaderVisible = false;
		} else {
			viewModel.isSubHeaderVisible = true;
		};
		console.log("werwerwe");
	},

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

				viewModel.truthy();

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

	search: function(value) {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		};

		locArray = [];

		console.log("search function fired");

		for(var x in markers) {
			if(markers[x].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
			// locArray.push(viewModel.locations[x]);
			markers[x].setMap(map);
			};
		};

		// Resets map markers when input box becomaes empty again
		if(value = undefined) {
			viewModel.markerMaker();
		};
	},

	listReset: function() {
	// Resets map markers
		if(value = undefined) {
			viewModel.markerMaker();
		};
	},

	listClear: function() {
		console.log("Sub header has been clicked");
	},
};

/* -------------------------- App View below ------------------------------------------------------------ */

var view = {
	viewStarter: function() {
		console.log("starter callback triggered - main map initialized");

		map = new google.maps.Map(document.getElementById('map'), {
				center: locArray[0].position,
				zoom: 17,
				// draggable: false,
				noClear: true,
				scrollwheel: false,
				mapTypeControl: false
		});

		viewModel.markerMaker();
	},

	GMerrorhandler: function() {
		console.log("Google Maps service encountered a problem and could not load");
	},

	listClick: function() {
		var self = this;
		var id = self.markerID;

		console.log(self.name + " is located at " + self.address);
		console.log(markers[id].markerID);

		$("#listClicked").html("<h3>" + markers[id].title + " - " + markers[id].address + "</h3>");

		markers[id].bouncy(); // Starts the toggleBounce function located within each marker object
	},
};

window.onerror = function () {
	alert("Neighborhood Map Helper encountered an error and could not load. Please check your internet connection or submit a bug report");
};

$(document).ready(function() {
	viewModel.query.subscribe(viewModel.search);
	ko.applyBindings(viewModel);
});