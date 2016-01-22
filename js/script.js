
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

    $greeting.text("You want to live at " + street + " " + city + "?");

    // NYT request

    $.getJSON("http://api.nytimes.com/svc/search/v2/articlesearch.json?[q=" + city + " " + state + "&fq=headline: (" + city + ")&api-key=a767593b8d29d68d271284c53c21504a:4:74049866", function(data) {

        var snippet = data.response.docs[0].snippet;

        console.log(snippet);

        var items = [];

        $.each( data, function( key, val ) {
            items.push( "<li id='" + key + "'>" + val + snippet + "</li>" );
        });

        $( "<ul/>", {
        "class": "nytimes-articles",
        html: items.join( "" )
        }).appendTo( "body" );


    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();
