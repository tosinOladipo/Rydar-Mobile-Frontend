import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-trips',
  templateUrl: './pending-trips.page.html',
  styleUrls: ['./pending-trips.page.scss'],
})
export class PendingTripsPage implements OnInit {

  title = "Pending Trips";

  constructor() { }

  ngOnInit() {
  }

}
