import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ConnectionService } from 'ng-connection-service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { RiderServiceService } from 'src/app/services/rider-service.service';
declare var google:any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  isConnected = true;

  location: any = {
    cordsLatt: "",
    cordsLong: "",
    cordsAddress: "",
    onlineStatus: ""
  }

  riderId:any;

  constructor(
    private geo: Geolocation,
    private router: Router,
    public alertController: AlertController,
    private connectionService: ConnectionService,
    private riderService: RiderServiceService
  ) { 
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.location.onlineStatus = "offline";
        this.onlineAlert()
        this.router.navigate(['/current-trip'])
      }
      else {
        this.location.onlineStatus = "offline";
        this.offlineAlert()
      }
    })  
  }

  ngOnInit() {
    this.riderId = localStorage.getItem('rider');
    setInterval(() => {         
      this.updateRider()
    }, 60000*3);
  }

  ionViewWillEnter() {

    this.geo.getCurrentPosition().then( (res) => {
      this.location.cordsLatt = res.coords.latitude;
      this.location.cordsLong = res.coords.longitude;


      /* Use Geocoder to get address */
      const google_map_pos = new google.maps.LatLng( this.location.cordsLatt, this.location.cordsLong );
      const google_maps_geocoder = new google.maps.Geocoder();
      google_maps_geocoder.geocode(
          { 'latLng': google_map_pos },
          ( results, status ) => {
              if ( status == google.maps.GeocoderStatus.OK && results[0] ) {
                console.log( results[0].formatted_address );
                this.location.cordsAddress = results[0].formatted_address;
              }
          }
      );

    }).catch((e) => {
      console.log(e)
    });


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

  updateLocation() {
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

  async offlineAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Offline mode!',
      message: '<strong>You are currently offline</strong>!!!',
      buttons: [
        {
         text: 'Okay',
         handler: () => {
           console.log('Confirm Okay');
         }
       }
     ]
    });

    await alert.present();
  }

  async onlineAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Online mode!',
      message: '<strong>You are back online</strong>!!!',
      buttons: [
         {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }


}
