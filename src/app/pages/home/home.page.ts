import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { RiderServiceService } from 'src/app/services/rider-service.service';
declare var google:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private geo: Geolocation,
    private riderService: RiderServiceService
    ) { }

  ngOnInit() {
  }


}
