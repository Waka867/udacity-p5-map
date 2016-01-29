function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request

    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var street = $("#street").val();
    var city = $("#city").val();
    var state = $("#state").val();

    // console.log(state); /* Test function */

    var addressString = street + city;

    $body.append("<img class='bgimg' src='https://maps.googleapis.com/maps/api/streetview?size=1920x1080&pitch=-10&fov=110&location=" + addressString + "'>");

    // NYT request

    var NYTurl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?[q=" + city + " " + state + "&fq=headline: (" + city + ")&api-key=a767593b8d29d68d271284c53c21504a:4:74049866";

    $greeting.text("You want to live at " + street + " " + city + ", " + state + "?");

    $.getJSON(NYTurl, function(data) {

        $("#nytimes-header").text("New York Times Articles about " + city + ", " + state);

        var docs = [
            data.response.docs[0],
            data.response.docs[1],
            data.response.docs[2],
            data.response.docs[3],
            data.response.docs[4],
            data.response.docs[5],
            data.response.docs[6],
            data.response.docs[7],
            data.response.docs[8],
            data.response.docs[9],
        ];

        var items = [];

        $.each( data, function( key, val ) {
            for(i = 0; i < docs.length; i++){
                items.push( '<a href=' + docs[i].web_url + '>' + "<h3>" + "<li class='headline'>" + docs[i].headline.main + "</li>" + "</h3>" + "</a>", "<li id='" + key + "'>" + docs[i].snippet + "</li>" + "<br>" );
            };
        });

        $( "<ul/>", {
        "class": "nytimes-articles",
        html: items.join( "" )
        }).appendTo( "body" );

        // console.log(docs[1].snippet);/* Test function */

        // console.log(data);/* Test function */

    }).error(function(error){
        $nytHeaderElem.text("ERROR: Article data could not be loaded");
        });


    var success = function(url){
        console.log(ajax.url);
    }

    var ajax = $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?action=query&titles="' + city + '"&format=json',
        dataType: "jsonp",
        beforeSend: function( xhr ) {
            xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
        }
        success: success(),
        headers: { 'Api-User-Agent': 'Example/1.0' },
    });



    return false;

};


$('#form-container').submit(loadData);

// loadData();
