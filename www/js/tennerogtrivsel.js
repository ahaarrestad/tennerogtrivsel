/**
* scripts for "Tenner og Trivsel" webpage.
*/

/** Called on page reload to keep same page as was reloaded*/
$(document).ready(function() {
    var pageContent = location.hash.replace("#", "");
    if(pageContent == '') {
        pageContent = getUrlParameter('page');
    }
    if(pageContent == undefined) {
        pageContent = "";
    }
    loadContent(pageContent);
});

/** Disable clicks is javascript is enabled*/
$(document).on('click', 'a', function(e) {
    e.preventDefault();
});

/** load content when hash changes */
window.onhashchange = function() {
    loadContent(location.hash.replace("#", ""));
}

/** load content based on tag */
function loadContent(pageContent) {
     if(pageContent == '') {
        /** default to frontpage */
        pageContent = "kontakt";
     }
     if($("#"+pageContent).attr("id") !== undefined) {
        $(".nav").find(".active").removeClass("active");
        $("#"+pageContent).addClass("active");
        $('#pageContent').load(pageContent+".html");

        /* Avoid logging to google analytics from development machine */
        if(location.hostname !== 'localhost') {
            ga('set', 'page', '/index.html?page=' + pageContent);
            ga('send', 'pageview');
        }
    }
};

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
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