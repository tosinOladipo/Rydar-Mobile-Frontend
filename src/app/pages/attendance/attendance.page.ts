import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { RiderServiceService } from 'src/app/services/rider-service.service';
import { AttendanceServiceService } from 'src/app/services/attendance-service.service';
declare var google:any;



@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {

  title = "Attendance";
  lists:any = [];

  rider:any = {
    riderId: ""
  };

  attendance:any = {
    riderId: "",
    companyID: "",
    firstName: "",
    lastName: "",
    attendanceDate: "",
    attendanceTime: "",
    location: ""
  }

  location: any = {
    cordsLatt: "",
    cordsLong: "",
  }



  constructor(
    public loadingController: LoadingController,
    private datePipe: DatePipe,
    private geo: Geolocation,
    private riderService: RiderServiceService,
    private attendanceService: AttendanceServiceService,
    public toastController: ToastController
  ) { }

  

  ngOnInit() {
    this.rider.riderId = localStorage.getItem('rider');
    this.riderService.getRider(this.rider.riderId).subscribe(
      res => {
        this.rider = res
        console.log(this.rider)
      },
      err => console.log(err)
      )
  }

  
  ionViewWillEnter() {
    this.presentLoading()
    this.attendance.riderId = this.rider._id
    this.attendance.companyID = this.rider.companyID
    this.attendance.firstName = this.rider.firstName
    this.attendance.lastName = this.rider.lastName 
    this.attendance.attendanceDate = this.datePipe.transform(Date.now(),'MMM d, y');
    this.attendance.attendanceTime = new Date();
    this.refreshAttendanceList();

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
                this.attendance.location = results[0].formatted_address;
              }
          }
      );

    }).catch((e) => {
      console.log(e)
    });
  }
  

  

  submitAttendance() {
    this.attendanceService.riderAttendance(this.attendance)
    .subscribe(
      res => {
        this.attendance = res
        console.log(this.attendance)
        this.successToast()
        window.location.reload();
      },
      err => {
        console.log(err)
        this.failedToast()
      }
    )
  }

 

  refreshAttendanceList() {
    this.attendanceService.getRiderAttendance(this.attendance.riderId).subscribe(
      res => { 
        this.lists = res
        console.log(this.rider._id)
      },
      err => console.log(err)
      )
  }


  async successToast() {
    const toast = await this.toastController.create({
      message: 'Attendance submitted.',
      color: 'success',
      duration: 2000
    });
    toast.present();
  }

  async failedToast() {
    const toast = await this.toastController.create({
      message: 'You already tapped in.',
      color: 'danger',
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
