import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { SMS } from '@ionic-native/sms/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ShipmentServiceService } from 'src/app/services/shipment-service.service';
import { RiderServiceService } from 'src/app/services/rider-service.service';
declare var google:any;


@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  shipment:any = {}
  rider:any = {}
  orderId:any;
  riderId:any;
  map:any;
  location: any = {
    latt: "",
    lng: "",
    address: "Ikeja GRA, Ikeja, Nigeria"
  }

  constructor(
    public loadingController: LoadingController,
    private geo: Geolocation,
    public alertController: AlertController,
    public toastController: ToastController,
    private riderService: RiderServiceService,
    private shipmentService: ShipmentServiceService,
    private sms: SMS,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.presentLoading()
    this.route.params.subscribe(
      (params: Params) => {
        this.orderId = params.orderId;
      }
    )

    this.presentLoading()
    this.route.params.subscribe(
      (params: Params) => {
        this.riderId = params.riderId;
      }
    )

    this.shipmentService.getShipmentById(this.orderId).subscribe(
      res => {
        this.shipment = res
        console.log(this.shipment)
      },
      err => {
        console.log(err)
      }
    )

    

      setInterval(() => {
        window.location.reload();
      }, 60000*3);

  }

  
  
  ionViewDidEnter() {

    this.riderService.getRider(this.riderId).subscribe(
      res => {
        this.rider = res
        console.log(this.rider)
      
      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: this.rider.cordsLatt , lng: this.rider.cordsLong },
        zoom: 12,
      });

      const marker = new google.maps.Marker({
        position: {
          lat: this.rider.cordsLatt, lng: this.rider.cordsLong
        },
        map: this.map,
        icon:"../../../assets/img/map-marker.png",
      });

      /* Use Geocoder to get address */
      const google_map_pos = new google.maps.LatLng( this.rider.cordsLatt , this.rider.cordsLong );
      const google_maps_geocoder = new google.maps.Geocoder();
      google_maps_geocoder.geocode(
          { 'latLng': google_map_pos },
          ( results, status ) => {
              if ( status == google.maps.GeocoderStatus.OK && results[0] ) {
                console.log( results[0].formatted_address );
              }
          }
      );

  
    //create a DirectionsService object to use the route method and get a result for our request
    var directionsService = new google.maps.DirectionsService();

    //create a DirectionsRenderer object which we will use to display the route
    var directionsDisplay = new google.maps.DirectionsRenderer();

    //bind the DirectionsRenderer to the map
    directionsDisplay.setMap(this.map);


    var request = {
      origin: google_map_pos,
      destination: this.shipment.destination,
      travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
      unitSystem: google.maps.UnitSystem.IMPERIAL
    }


    //pass the request to the route method
    directionsService.route(request, function (result, status) {
      if (status == google.maps.DirectionsStatus.OK) {

          //Get distance and time
          const output = document.querySelector('#output');
          output.innerHTML =  "Duration  : " + result.routes[0].legs[0].duration.text + ".";

          //display route
          directionsDisplay.setDirections(result);
      } else {
          //delete route from map
          directionsDisplay.setDirections({ routes: [] });
          //center map in London

      }
  });

},
err => {
  console.log(err)
}
);


} 




async presentLoading() {
  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...',
    duration: 2000
  });
  await loading.present();

  const { role, data } = await loading.onDidDismiss();
  console.log('Loading dismissed!');
}




}
