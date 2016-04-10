var markers = [];

var addyInfo = [];

var infowindow;

var query;

/* -------------------------- App data model below ------------------------------ */
var model = {
	locations: [
		{
			name: "New York Public Library",
			position: {lat: 40.7135559, lng: -74.0077815},
			posName: "mapPoint",
			address: "9 Murray St",
			infoContent: "<h1>9 Murray St</h1><p class='wikiStuff'></p>"
		},
		{
			name: "New York City Hall",
			position: {lat: 40.712705, lng: -74.0059778},
			posName: "mapPoint2",
			address: "City Hall Pk",
			infoContent: "<h1>City Hall Pk</h1><p class='wikiStuff'></p>"
		},
		{
			name: "Woolworth Building",
			position: {lat: 40.7123824, lng: -74.0081218},
			posName: "mapPoint3",
			address: "233 Broadway, 10007",
			infoContent: "<h1>233 Broadway</h1><p class='wikiStuff'></p>"
		},
		{
			name: "One World Trade Center",
			position: {lat: 40.713154, lng: -74.013661},
			posName: "mapPoint4",
			address: "285 Fulton St",
			infoContent: "<h1>285 Fulton St</h1><p class='wikiStuff'></p>"
		},
		{
			name: "St. Peter's Roman Catholic Church",
			position: {lat: 40.7123014, lng: -74.0095246},
			posName: "mapPoint5",
			address: "22 Barclay St",
			infoContent: "<h1>22 Barclay St</h1><p class='wikiStuff'></p>"
		}
	]
};

var locArray = model.locations;

/* -------------------------- App Controller below ------------------------------------------------------ */

var viewModel = {

	self: this,

	// query: ko.observableArray(''),

	knocker: function() {
		// var locArray = ko.observableArray(locArray);

		// var query = ko.observableArray('');

		var search = function(value) {
			// self.locArray.removeAll();

			// for(x in locArray) {
			// 	if(locArray[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
			// 		this.locArray.push(locArray[x]);
			// 	};
			// };
		};
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
				address: locArray[i].address
			});

			console.log(markers[i].title); /* test - NOTE: log lists all address correctly */
			console.log(locArray[i].position); /* Correct */

			var toggleBounce = function(m) {
				if (m.getAnimation() !== null) {
					m.setAnimation(null);
				} else {
					m.setAnimation(google.maps.Animation.BOUNCE);
				};
				setTimeout(function(){
					m.setAnimation(null); /* Limits how long a marker will bounce for when clicked */
				}, 700)
			};

			google.maps.event.addListener(markers[i], 'click', function () {
				toggleBounce(this);
				if(!infowindow) {
					infowindow = new google.maps.InfoWindow({
						// content: "TEST",
					});
				};
				infowindow.setContent(this.info);
				infowindow.open(map, this);

				var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + this.title + '&format=json';

				console.log(this.title);
				// console.log(infowindow);

				var ajax = $.ajax({
					url: wikiUrl,
					dataType: "jsonp",
					headers: { 'Api-User-Agent': 'Example/1.0' }
				}).done(function(response) {
					var respLength = response.length;
					var respTitle = response[0];
					var respSumm = response[2];
					var wikiLinks = response[3];

					console.log(response);
					console.log(wikiUrl);

					/* Appends wikipedia sourced info to the infowindow via the model and each locations infoContent key */
					$(".wikiStuff").append("<h3>" + respTitle + "</h3><p>" + respSumm[0] + "</p><p><a href=" + wikiLinks[0] + " target='_blank'>Learn more about " + respTitle + " here</a></p>");
				});
			});
		};

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
				// scrollwheel: false,
				mapTypeControl: false
		});

		// ko.applyBindings(viewModel);

		viewModel.markerMaker();

		ko.applyBindings(viewModel);

		// viewModel.query.subscribe(viewModel.search());
	},

	GMerrorhandler: function() {
		console.log("Google Maps service encountered a problem and could not load");
	}
};

window.onerror = function () {
	alert("Neighborhood Map Helper encountered an error and could not load. Please check your internet connection or submit a bug report");
};