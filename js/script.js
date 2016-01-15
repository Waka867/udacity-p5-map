
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


    // YOUR CODE GOES HERE!
    var street = $("#street").val();
    var city = $("#city").val();

    var addressString = street + city;

    $body.append("<img class='bgimg' src='https://maps.googleapis.com/maps/api/streetview?size=1920x1080&pitch=-10&fov=110&location=" + addressString + "'>");

    $greeting.text("You want to live at " + street + " " + city + "?");

    return false;
};

$('#form-container').submit(loadData);

// loadData();
