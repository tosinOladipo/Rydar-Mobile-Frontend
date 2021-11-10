import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { RiderServiceService } from 'src/app/services/rider-service.service';
import { ShipmentServiceService } from 'src/app/services/shipment-service.service';
declare var google:any;


@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.page.html',
  styleUrls: ['./delivery-form.page.scss'],
})
export class DeliveryFormPage implements OnInit {

  trip: any = {
    _id: "",
    riderId: "",
    destination: "",
    orderId: "",
    tripType: "",
    tripStatus: ""
  }

  location: any = {
    lat: "",
    lng: "",
  };
  map:any;

  @ViewChild('map',  {static: false}) mapElement: ElementRef;

  autocomplete: { input: string; };
  autocompleteItems: any[];
  placeid: any;
  GoogleAutocomplete: any;

  constructor(
    private geolocation: Geolocation,
    private datePipe: DatePipe,
    public zone: NgZone,
    private riderService: RiderServiceService,
    private shipmentService: ShipmentServiceService,
    private router: Router,
    public toastController: ToastController
  ) { 
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  ngOnInit() {
    this.trip.riderId = localStorage.getItem('rider');
    this.riderService.getRider(this.trip.riderId).subscribe(
      res => {
        this.trip = res
        console.log(this.trip)
      },
      err => console.log(err)
      )
  }

  ionViewWillEnter() {
    this.trip._id = Math.floor(Math.random() * 100000000000);
    this.trip.riderId = localStorage.getItem('rider');
    this.trip.orderId = Math.floor(Math.random() * 100000000000);
    this.trip.tripType = "delivery";
    this.trip.tripStatus = "pending";
    this.trip.tripMonth = this.datePipe.transform(Date.now(),'MMMM');;
    this.trip.tripYear = this.datePipe.transform(Date.now(),'y');;


    this.geolocation.getCurrentPosition().then((resp) => {
      this.location.lat = resp.coords.latitude;
      this.location.lng = resp.coords.longitude;

    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: resp.coords.latitude, lng: resp.coords.longitude},
      zoom: 12,
    });

    const marker = new google.maps.Marker({
      position: {
        lat: this.location.lat, lng: this.location.lng
      },
      map: this.map,
      icon:"../../../assets/img/map-marker.png",
    });

  }).catch((error) => {
    console.log('Error getting location', error);
  });
    
  }


  //AUTOCOMPLETE, SIMPLY LOAD THE PLACE USING GOOGLE PREDICTIONS AND RETURNING THE ARRAY.
  UpdateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

  //wE CALL THIS FROM EACH ITEM.
  SelectSearchResult(item) {
    ///WE CAN CONFIGURE MORE COMPLEX FUNCTIONS SUCH AS UPLOAD DATA TO FIRESTORE OR LINK IT TO SOMETHING
    this.placeid = item.place_id
    this.trip.destination = item.description
    this.autocompleteItems = []
    
    /* Use Geocoder to get address */
    const google_maps_geocoder = new google.maps.Geocoder();
    google_maps_geocoder.geocode(
        { 'address': this.trip.destination },
        ( results, status ) => {
            if ( status == google.maps.GeocoderStatus.OK && results[0] ) {
             this.trip.destinationLat = results[0].geometry.location.lat()
             this.trip.destinationLng = results[0].geometry.location.lng()
            }
        }
    );
  }

  //lET'S BE CLEAN! THIS WILL JUST CLEAN THE LIST WHEN WE CLOSE THE SEARCH BAR.
  ClearAutocomplete(){
    this.autocompleteItems = []
    this.autocomplete.input = ''
  }

  addTrip() {
    this.shipmentService.postTrip(this.trip)
    .subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/dashboard'])
        this.successToast()
      },
      err => {
        console.log(err)
        this.failedToast()
      }
    )
  }

  async successToast() {
    const toast = await this.toastController.create({
      message: 'Trip added successfully.',
      color: 'success',
      duration: 2000
    });
    toast.present();
  }

  async failedToast() {
    const toast = await this.toastController.create({
      message: 'Unable to add trip',
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }


}
