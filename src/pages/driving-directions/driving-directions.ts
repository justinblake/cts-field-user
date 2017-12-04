import {Component, ViewChild, ElementRef} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Geoposition} from 'ionic-native';


import {Utils} from '../../utils/utils';
import {LaunchNavigator, LaunchNavigatorOptions} from '@ionic-native/launch-navigator';

declare var google;
declare var plugin;

@Component({
    selector: 'page-driving-directions',
    templateUrl: 'driving-directions.html'
})
export class DrivingDirectionsPage {

    @ViewChild('map') mapElement: ElementRef;

    directions: any;
    map: any;
    mapInitialised: boolean = false;
    apiKey: any;
    isIos: boolean = false;

    destination: string;
    start: string;

    constructor(private utils: Utils,
                public navCtrl: NavController,
                public plt: Platform,
                private launchNavigator: LaunchNavigator,
                public params: NavParams,
                private platform: Platform,
                private geolocation: Geolocation) {
        this.start = '';
        if (this.plt.is('ios')) {
            // This will only print when on iOS
            this.isIos = true;
        }
        this.directions = this.params.get('directions');
        this.destination = '';

    }

    ionViewDidLoad() {
        this.loadGoogleMaps();
    }

    /** utility function so entire polyline displays on map */
    midpoint(lat1, long1, lat2, long2, per) {
        return [lat1 + (lat2 - lat1) * per, long1 + (long2 - long1) * per];
    }

    /** open the destination in google maps or default mapping app when cordova */
    openInMaps() {

        let endLat = this.directions.routes[0].legs[0].end_location.lat;
        let endLng = this.directions.routes[0].legs[0].end_location.lng;

        if (this.platform.is('cordova')) {


            this.utils.presentLoading();
            this.geolocation.getCurrentPosition().then((position: Geoposition) => {
                this.utils.dismissLoading();

                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                let newStart = [];
                newStart.push(lat);
                newStart.push(lon);

                this.destination = `${endLat},${endLng}`;


                let options = {
                    start: newStart
                };



                this.launchNavigator.navigate(this.destination, options.start)
                    .then(
                        success => console.log("Launched Navigator"),
                        error => console.log('Error launching navigator: ' + error)
                    );


            }).catch((error) => {
                this.utils.presentToast('Could not get current location', true, 'OK');
            })


        }

    }

    /** this builds the map and directions */
    loadGoogleMaps() {

        let bounds = this.directions.routes[0].bounds;
        let midpoint = this.midpoint(
            (bounds.south),
            (bounds.west),
            (bounds.north),
            (bounds.east),
            .5
        );
        let latitude = midpoint[0];
        let longitude = midpoint[1];
        let latLng = new google.maps.LatLng(latitude, longitude);
        let mapOptions = {
            center: latLng,
            //zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            // draggable:false,
            disableDefaultUI: true,
            //disableDoubleClickZoom: true
            styles: [{
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#7c93a3"}, {"lightness": "-10"}]
            }, {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [{"visibility": "on"}]
            }, {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#c2d1d6"}]
            }, {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#dde3e3"}]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#c2d1d6"}]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#a9b4b8"}, {"lightness": "0"}]
            }, {"featureType": "water", "elementType": "geometry.fill", "stylers": [{"color": "#a3c7df"}]}]
        };

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        let latLngBoundsLiteral = {
            'north': bounds.north,
            'east': bounds.east,
            'south': bounds.south,
            'west': bounds.west
        };

        this.map.fitBounds(latLngBoundsLiteral);

        let ion_md_pin = {
            path: 'M160 416c88 0 160 -71 160 -157c0 -118 -160 -291 -160 -291s-160 173 -160 291c0 86 72 157 160 157zM160 203c32 0 57 25 57 56s-25 56 -57 56s-57 -25 -57 -56s25 -56 57 -56z',
            fillColor: '#32db64',
            fillOpacity: 1,
            rotation: 180,
            scale: .065,
            anchor: new google.maps.Point(160, -80)
        };

        let startMarker = new google.maps.Marker({
            position: new google.maps.LatLng(this.directions.routes[0].legs[0].start_location.lat, this.directions.routes[0].legs[0].start_location.lng),
            icon: ion_md_pin,
        });

        // To add the marker to the map, call setMap();
        startMarker.setMap(this.map);

        let route = new google.maps.Polyline({
            path: this.directions.routes[0].overview_path,
            geodesic: true,
            //strokeColor: '#FF0000',
            strokeColor: '#337AF9',
            strokeOpacity: 1.0,
            strokeWeight: 4
        });

        route.setMap(this.map);

        let endMarker = new google.maps.Marker({
            position: {
                lat: this.directions.routes[0].legs[0].end_location.lat,
                lng: this.directions.routes[0].legs[0].end_location.lng
            },
            icon: {
                path: 'M160 416c88 0 160 -71 160 -157c0 -118 -160 -291 -160 -291s-160 173 -160 291c0 86 72 157 160 157zM160 203c32 0 57 25 57 56s-25 56 -57 56s-57 -25 -57 -56s25 -56 57 -56z',
                fillColor: '#f53d3d',
                fillOpacity: 1,
                rotation: 180,
                scale: .065,
                anchor: new google.maps.Point(160, -80)
            }
        });

        // To add the marker to the map, call setMap();
        endMarker.setMap(this.map);
    }
}
