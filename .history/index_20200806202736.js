var animLoop = false,
    animIndex = 0,
    planePath = false,
    trailPath = false;
var count = 0;

var places = {
    "paris": [48.8566, 2.3522],
    "ambala": [30.3752, 76.7821]
};
var val1 = new google.maps.LatLng(48.8566, 2.3522);
var val2 = new google.maps.LatLng(30.3752, 76.7821);


function loadMap() {
    var options = {
        draggable: false,
        panControl: false,
        streetViewControl: false,
        scrollwheel: false,
        scaleControl: false,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        zoom: 2,
        center: new google.maps.LatLng(38.9637, 35.2433),
        styles: [{
            "featureType": "administrative",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "water",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "transit",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "landscape",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.highway",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.local",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "water",
            "stylers": [{
                "color": "#84afa3"
            }, {
                "lightness": 52
            }]
        }, {
            "stylers": [{
                "saturation": -17
            }, {
                "gamma": 0.36
            }]
        }, {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [{
                "color": "#3f518c"
            }]
        }]
    };
    mapObject = new google.maps.Map(document.getElementById('mapCanvas'), options);
    var marker1 = new google.maps.Marker({
        position: val1,
        title: "Paris"
    });
    var marker2 = new google.maps.Marker({
    position: val2,
    title:"Ambala"
    });
    marker1.setMap(mapObject);
    marker2.setMap(mapObject);
}


var planeSymbol = {
    path: google.maps.,
    fillColor: '#000',
    fillOpacity: 1.5,
    scale: 0.8,
    anchor: new google.maps.Point(11, 11),
    strokeWeight: 0
};

function animate() {
    startPoint = [48.8566, 2.3522];
    endPoint = [30.3752, 76.7821];
    var sP = new google.maps.LatLng(startPoint[0], startPoint[1]);
    var eP = new google.maps.LatLng(endPoint[0], endPoint[1]);


    planePath = new google.maps.Polyline({
        path: [sP, eP],
        strokeColor: '#0f0',
        strokeWeight: 0,
        icons: [{
            icon: planeSymbol,
            offset: '0%'
        }],
        map: mapObject,
        geodesic: true
    });

    trailPath = new google.maps.Polyline({
        path: [sP, sP],
        strokeColor: '#2eacd0',
        strokeWeight: 2,
        map: mapObject,
        geodesic: true
    });

    animLoop = window.requestAnimationFrame(function () {
        tick(sP, eP);
    });
}


function tick(startPoint, endPoint) {
    animIndex += 0.2;

    var nextPoint = google.maps.geometry.spherical.interpolate(startPoint, endPoint, animIndex / 100);
    trailPath.setPath([startPoint, nextPoint]);

    planePath.icons[0].offset = Math.min(animIndex, 100) + '%';
    planePath.setPath(planePath.getPath());

    //mapObject.panTo(nextPoint);

    if (animIndex >= 100) {
        window.cancelAnimationFrame(animLoop);
        animIndex = 0;
    } else {
        animLoop = window.requestAnimationFrame(function () {
            tick(startPoint, endPoint);
        });
    }
}


function go() {
    window.cancelAnimationFrame(animLoop);
    animIndex = 0;
    if (count++ < 5) {
        animate();
    }
    if (count == 5) {
        alert("Rafale Successfully delivered to India");
    }


}

loadMap();