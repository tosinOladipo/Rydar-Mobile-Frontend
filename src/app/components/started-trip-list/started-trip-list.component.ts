import { Component, OnInit } from '@angular/core';
import { ShipmentServiceService } from 'src/app/services/shipment-service.service';

@Component({
  selector: 'app-started-trip-list',
  templateUrl: './started-trip-list.component.html',
  styleUrls: ['./started-trip-list.component.scss'],
})
export class StartedTripListComponent implements OnInit {

  shipments:any = [];
  riderId:any;


  constructor(
    private shipmentService: ShipmentServiceService
  ) { }

  ngOnInit() {
    this.riderId = localStorage.getItem('rider');
   this.refreshPendingList();
  }


  refreshPendingList() {
    this.shipmentService.getStartedShipments(this.riderId)
    .subscribe(
      res => this.shipments = res,
      err => console.log(err)
      )
      console.log(this.riderId);
  }



}
