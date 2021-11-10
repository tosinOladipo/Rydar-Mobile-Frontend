import { Component, OnInit } from '@angular/core';
import { ShipmentServiceService } from 'src/app/services/shipment-service.service';


@Component({
  selector: 'app-all-trips-list',
  templateUrl: './all-trips-list.component.html',
  styleUrls: ['./all-trips-list.component.scss'],
})
export class AllTripsListComponent implements OnInit {

  shipments:any = [];
  riderId:any;

  constructor(
    private shipmentService: ShipmentServiceService
  ) { }

  ngOnInit() {
    this.riderId = localStorage.getItem('rider');
    setTimeout(() => {
      this.refreshAllTripList();
   }, 1000);
   this.refreshAllTripList();
  }

  refreshAllTripList() {
    this.shipmentService.getRiderShipments(this.riderId)
    .subscribe(
      res => this.shipments = res,
      err => console.log(err)
      )
      console.log(this.shipments);
  }

}
