/**
* scripts for "Tenner og Trivsel" webpage.
*
* @author Asbjørn Aarrestad - asbjorn@aarrestad.com
*/

/** Called on page reload to keep same page as was reloaded*/
$(document).ready(function() {
    var pageContent = location.hash.replace("#", "");
    if(location.hash == '' || location.hash == '#') {
        pageContent = "kontakt";
    }
    loadContent(pageContent);
});

/** load content when hash changes */
window.onhashchange = function() {
    var pageContent = location.hash.replace("#", "");
    if(location.hash == '' || location.hash == '#') {
        pageContent = "kontakt";
    }
    loadContent(pageContent);
}

/** load content based on tag */
function loadContent(pageContent) {
    if($("#"+pageContent).attr("id") !== undefined) {
        $(".nav").find(".active").removeClass("active");
        $("#"+pageContent).addClass("active");
        $('#pageContent').load(pageContent+".html");
    }
};

function initMap() {

    var location = new google.maps.LatLng(58.954524, 5.72907);

    var mapCanvas = document.getElementById('map');
    var mapOptions = {
        center: location,
        zoom: 15,
        panControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);

    var marker=new google.maps.Marker({
        position:new google.maps.LatLng(58.954154, 5.735028),
        url: '/',
        animation:google.maps.Animation.DROP
    });

    var contentString = '<div class="info-window">'
    + 'Tenner og Trivsel'
    + '<br>Armauer Hansens vei 11'
    + '<br>4011 Stavanger';

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
    marker.setMap(map);
}
