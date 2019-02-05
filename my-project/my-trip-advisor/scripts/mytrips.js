var MARKER_LABEL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var map;
var markers = {};

$(function() {
    var myTrips = Cookies.getJSON('MYTRIPS');

    if (!myTrips)
        myTrips = [];

    showMap();
    generateMyTripList(myTrips);
});

function generateMyTripList(list) {
    var bounds = new google.maps.LatLngBounds();
    var $list = $('#mytrip-list');

    for (var i = 0; i < list.length; i++) {
        var myTrip = list[i];

        var pos = {
            lat: myTrip.x,
            lng: myTrip.y
        };

        var markerLabel = MARKER_LABEL[i];
        var $item = $('#mytrip-item-template').clone().removeAttr('id');
        
        $item.data('id', myTrip.id);
        $item.find('.item-name').html(markerLabel + '. ' + myTrip.name);
        $item.find('.item-city-name').html(myTrip.cityName);
        $item.find('.item-remove').click(function() {
            var $elem = $(this).closest('.mytrip-item');
            var id = $elem.data('id');

            $elem.remove();

            markers[id].setMap(null);
            markers[id] = null;
        });
        $list.append($item);

        var marker = new google.maps.Marker({
            position: pos,
            label: markerLabel,
            map: map
        });

        markers[myTrip.id] = marker;

        bounds.extend(pos);
    }
    map.fitBounds(bounds);
}

function showMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {
            lat: 33.3617,
            lng: 126.5292
        }
    });
}