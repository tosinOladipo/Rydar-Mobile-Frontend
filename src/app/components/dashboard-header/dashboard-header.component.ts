import { Component, OnInit } from '@angular/core';
import { RiderServiceService } from 'src/app/services/rider-service.service';
import { ShipmentServiceService } from 'src/app/services/shipment-service.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent implements OnInit {

  rider = {};
  riderId:any;
  shipments:any = [];

  constructor(
    private router: Router,
    private riderService: RiderServiceService,
    private shipmentService: ShipmentServiceService
  ) { }

  ngOnInit() {
    this.riderId = localStorage.getItem('rider');
    this.riderService.getRider(this.riderId).subscribe(
      res => this.rider = res,
      err => console.log(err)
      )
      this.shipmentService.getPendingShipments(this.riderId)
      .subscribe(
        res => this.shipments = res,
        err => console.log(err)
        )
        console.log(this.riderId);
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('rider')
    this.router.navigate(['/login'])

  }

}
