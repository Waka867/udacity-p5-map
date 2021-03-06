// Array containing markers after they've been created by viewModel.markerMaker();
var markers = [];

// Defines infowindow for later value assignment
var infowindow;

// Timeout function to be used for ajax jsonp error handling
function apiTimeout() {
	apiTimeout = setTimeout(function(){
		alert("Error: Wikipedia data request could not be completed");
	}, 2000);
};

// To be used to cleear ajax error handler if no problems slow ajax to the threshold of the timeout
function clearTimer() {
	clearTimeout(apiTimeout);
};

/* -------------------------- App data model below ------------------------------ */
var model = {
	locations: [
		{
			name: "New York Public Library",
			position: {lat: 40.7135559, lng: -74.0077815},
			posName: "mapPoint",
			address: "9 Murray St",
			infoContent: "<h1>9 Murray St</h1><p class='wikiStuff'></p>",
			markerID: 0,
			visibility: ko.observable(true)
		},
		{
			name: "New York City Hall",
			position: {lat: 40.712705, lng: -74.0059778},
			posName: "mapPoint2",
			address: "City Hall Pk",
			infoContent: "<h1>City Hall Pk</h1><p class='wikiStuff'></p>",
			markerID: 1,
			visibility: ko.observable(true)
		},
		{
			name: "Woolworth Building",
			position: {lat: 40.7123824, lng: -74.0081218},
			posName: "mapPoint3",
			address: "233 Broadway",
			infoContent: "<h1>233 Broadway</h1><p class='wikiStuff'></p>",
			markerID: 2,
			visibility: ko.observable(true)
		},
		{
			name: "One World Trade Center",
			position: {lat: 40.713154, lng: -74.013661},
			posName: "mapPoint4",
			address: "285 Fulton St",
			infoContent: "<h1>285 Fulton St</h1><p class='wikiStuff'></p>",
			markerID: 3,
			visibility: ko.observable(true)
		},
		{
			name: "St. Peter's Roman Catholic Church",
			position: {lat: 40.7123014, lng: -74.0095246},
			posName: "mapPoint5",
			address: "22 Barclay St",
			infoContent: "<h1>22 Barclay St</h1><p class='wikiStuff'></p>",
			markerID: 4,
			visibility: ko.observable(true)
		}
	]
};

var locArray = model.locations;

// Function helps turn off subheader when a marker is clicked
var truthy = function() {
	if(viewModel.isSubHeaderVisible() === true) {
		viewModel.isSubHeaderVisible(false);
	};
};

/* -------------------------- App Controller / View Model below ------------------------------------------------------ */
var viewModel = {
	isSubHeaderVisible: ko.observable(''),

	query: ko.observable(''),

	// Makes markers bounce when clicked or activated
	toggleBounce: function(m) {
		if (m.getAnimation() !== null) {
			m.setAnimation(null);
		} else {
			m.setAnimation(google.maps.Animation.BOUNCE);
		};

		// Limits how long a marker will bounce for when clicked or activated
		setTimeout(function() {
			m.setAnimation(null);
		}, 1400)
	},

	// Grabs wikipedia info through an ajax request
	infoFetcher: function(currentMarker) {
		var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + currentMarker.title + '&format=json';

		// Ajax request
		var ajax = $.ajax({
			url: wikiUrl,
			dataType: "jsonp",
			headers: { 'Api-User-Agent': 'Example/1.0' },
			error: function(){
				alert("An information request error occurred. Please try again or check the error logs and console for more details");
			}
		}).done(function(response) {
			var respLength = response.length;
			var respTitle = response[0];
			var respSumm = response[2];
			var wikiLinks = response[3];

			// Prepares wikipedia sourced info for the infowindow via the model and each locations infoContent key
			var wContent = "<h3>" + respTitle + "</h3><p>" + respSumm[0] + "</p><p><a href=" + wikiLinks[0] + " target='_blank'>Learn more about " + respTitle + " here</a></p>";

			// Sets infowindow content
			infowindow.setContent(wContent);

			// Clears ajax failure alert which is set on a timeout to trigger
			clearTimer();
		});
	},

	// Creates markers and adds click listener
	markerMaker: function() {
		var ln = locArray.length;

		for(i = 0; i < ln; i++ ) {
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
				openy: function() {
					if(!infowindow) {
						infowindow = new google.maps.InfoWindow({});
					};
					viewModel.infoFetcher(this);
					infowindow.open(map, this);
				},
			});

			// Event listener for when the user clicks on a marker
			google.maps.event.addListener(markers[i], 'click', function () {

				// Activates api timeout so that a failed ajax request in infoFetcher fails gracefully
				apiTimeout();

				// Toggles bounce animation
				viewModel.toggleBounce(this);

				// Pans to current marker
				map.panTo(this.position);

				// Calls infofetcher to grab wikipedia info through an ajax request
				viewModel.infoFetcher(this);

				// Toggles infowindow open and closed
				if(!infowindow) {
						infowindow = new google.maps.InfoWindow({});
				};

				infowindow.open(map, this);

				// Function helps turn off subheader when a marker is clicked
				truthy();
			});
		};
	},

	// Search function for text input box
	search: function(value) {

		// Removes map markers and location list entries before checking for matches among data
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
			locArray[i].visibility(false);
		};

		// Adds markers back in if search box data matches with a location
		for(var x in markers) {
			if(markers[x].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
			markers[x].setMap(map);
			locArray[x].visibility(true);
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

		// Clears current sub header info when subheader is present and user clicks another subheader
		if($("#list-clicked") != null) {
			viewModel.subheaderClear();
		};

		$("#list-clicked").html("<h3>" + markers[id].title + " - " + markers[id].address + "</h3>" + "<sub>click here to close</sub>");

		// Starts the toggleBounce function located within each marker object
		markers[id].bouncy();

		// Opens infowindow on list click
		markers[id].openy();

		viewModel.isSubHeaderVisible(true);
	}
};

/* -------------------------- App View below ------------------------------------------------------------ */

var view = {
	viewStarter: function() {
		map = new google.maps.Map(document.getElementById('map'), {
				center: locArray[0].position,
				zoom: 16,
				noClear: true,
				scrollwheel: false,
				mapTypeControl: false
		});

		// Initiates creation of markers
		viewModel.markerMaker();

		// Subscribes query function to value of search bar
		viewModel.query.subscribe(viewModel.search);

		// Applies knockout bindings
		ko.applyBindings(viewModel);
	},

	// Error message
	GMerrorhandler: function() {
		console.log("Google Maps service encountered a problem and could not load");
		alert("Google Maps service encountered a problem and could not load");
	}
};

/* Neighborhood Map Project by Ledwing Hernandez -- ledwinghernandez.com -- github.com/waka867 */

/* Marker infowindow content provided by Wikipedia and is property of Wikipedia -- Map content provided by Google and is proerty of Google */