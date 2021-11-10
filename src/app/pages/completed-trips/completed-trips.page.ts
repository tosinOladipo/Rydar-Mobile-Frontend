import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-completed-trips',
  templateUrl: './completed-trips.page.html',
  styleUrls: ['./completed-trips.page.scss'],
})
export class CompletedTripsPage implements OnInit {

  title = "Completed trips"

  constructor() { }

  ngOnInit() {
  }

}
