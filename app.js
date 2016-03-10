$(document).ready(function(){

	var body = $("body");
	var address = $("#address").val();
	var zip = $("#zip").val();
	var state = $("#state").val();
	var map = $("#map");
	var locationList = $("#location-list");
	var formContainer = $("#form-container");

	/* -------------------------- App data model below ------------------------------ */
	var model = function() {
		// address: ko.observable(5),
		this.address = address;
	};

	/* -------------------------- App View below ------------------------------ */
	var view = {

	};

	/* -------------------------- App Controller below ------------------------------ */
	var viewmodel = {

		testFunction: function() {
			console.log("chirp testFunction");
			// console.log(model.address);
		}

        // clear out old data before new request

        // $wikiElem.text("");
        // $nytElem.text("");

        // load map?
	};

	$("#submit-btn").click(function() {
		console.log("button click line 42");
	});

	ko.applyBindings(viewmodel);

	// formContainer.submit(viewmodel);

	// $("#submit-btn").submit(viewmodel);

});