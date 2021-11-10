import { Component, OnInit } from '@angular/core';
import { ShipmentServiceService } from 'src/app/services/shipment-service.service';


@Component({
  selector: 'app-completed-trip-list',
  templateUrl: './completed-trip-list.component.html',
  styleUrls: ['./completed-trip-list.component.scss'],
})
export class CompletedTripListComponent implements OnInit {

  shipments:any = [];
  riderId:any;


  constructor(
    private shipmentService: ShipmentServiceService
  ) { }

  ngOnInit() {
    this.riderId = localStorage.getItem('rider');
    setTimeout(() => {
      this.refreshPendingList();
   }, 1000);
   this.refreshPendingList();
  }


  refreshPendingList() {
    this.shipmentService.getCompletedShipments(this.riderId)
    .subscribe(
      res => this.shipments = res,
      err => console.log(err)
      )
      console.log(this.riderId);
  }
}
