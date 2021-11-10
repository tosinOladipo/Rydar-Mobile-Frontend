import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { SMS } from '@ionic-native/sms/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ShipmentServiceService } from 'src/app/services/shipment-service.service';
import { RiderServiceService } from 'src/app/services/rider-service.service';
declare var google:any;


@Component({
  selector: 'app-current-trip',
  templateUrl: './current-trip.page.html',
  styleUrls: ['./current-trip.page.scss'],
})
export class CurrentTripPage implements OnInit {

  shipment:any = {
    orderId: "",
    customerName: "Not available",
    customerPhoneNumber: "Not available",
    customerPackage: "Not available",
    destination: "Ikeja GRA, Ikeja, Nigeria"
  }
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
    this.riderId = localStorage.getItem('rider');
    this.shipmentService.getCurrentShipment(this.riderId)
    .subscribe(
      res => {
        this.shipment = res
        console.log(this.shipment.orderId)
      },
      err => {
        console.log(err)
      }
      )

      setInterval(() => {
        window.location.reload();
      }, 60000*3);

      setTimeout(() => {
        this.updateRider();
     }, 60000*2);
  }


  endTrip() {
    console.log(this.shipment.orderId)
    this.shipment.tripStatus = "completed";
    this.shipmentService.updateShipment(this.shipment, this.shipment.orderId)
  .subscribe(
    res => {
      console.log(res)
      console.log(this.shipment.orderId)
      this.router.navigate(['/dashboard'])
      this.sms.send('+2349152342657', 'Hello from rRYDAR!');
      this.successToast()
    },
    err => console.log(err)
  )
  }


  pendTrip() {
    this.shipment.tripStatus = "pending";
    this.shipmentService.updateShipment(this.shipment, this.shipment.orderId)
  .subscribe(
    res => {
      console.log(res)
      console.log(this.shipment.orderId)
      this.router.navigate(['/dashboard'])
      this.sms.send('+2349152342657', 'Hello from rRYDAR!');
      this.pendingToast()
    },
    err => console.log(err)
  )
  }

  updateRider() {
    this.location.cordsTime = new Date()
    this.riderService.updateRiderLocation(this.location, this.riderId)
    .subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }

  


  ionViewDidEnter() {
    this.geo.getCurrentPosition().then( (res) => {
      this.location.latt = res.coords.latitude;
      this.location.lng = res.coords.longitude;

      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: res.coords.latitude, lng: res.coords.longitude },
        zoom: 12,
      });

      const marker = new google.maps.Marker({
        position: {
          lat: res.coords.latitude, lng: res.coords.longitude
        },
        map: this.map,
        icon:"../../../assets/img/map-marker.png",
      });

      /* Use Geocoder to get address */
      const google_map_pos = new google.maps.LatLng( res.coords.latitude, res.coords.longitude );
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


}).catch((error) => {
  console.log('Error getting location', error);
});


} 


async presentAlertConfirm() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Confirm!',
    message: '<strong>Kindly confirm you would like to pend this trip</strong>!!!',
    buttons: [
      {
        text: 'Dismss',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Proceed',
        handler: () => {
          this.pendTrip()
        }
      }
    ]
  });

  await alert.present();
}


async successToast() {
  const toast = await this.toastController.create({
    message: 'You have completed your trip.',
    color: 'success',
    duration: 2000
  });
  toast.present();
}


async pendingToast() {
  const toast = await this.toastController.create({
    message: 'Trip is now on pending list.',
    color: 'success',
    duration: 2000
  });
  toast.present();
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
