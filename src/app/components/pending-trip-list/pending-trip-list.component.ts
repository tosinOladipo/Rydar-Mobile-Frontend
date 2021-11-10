import { Component, OnInit } from '@angular/core';
import { ShipmentServiceService } from 'src/app/services/shipment-service.service';

@Component({
  selector: 'app-pending-trip-list',
  templateUrl: './pending-trip-list.component.html',
  styleUrls: ['./pending-trip-list.component.scss'],
})
export class PendingTripListComponent implements OnInit {

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
    this.shipmentService.getPendingShipments(this.riderId)
    .subscribe(
      res => this.shipments = res,
      err => console.log(err)
      )
      console.log(this.riderId);
  }




}
