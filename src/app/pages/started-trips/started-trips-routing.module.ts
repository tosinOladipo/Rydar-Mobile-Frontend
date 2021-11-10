import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartedTripsPage } from './started-trips.page';

const routes: Routes = [
  {
    path: '',
    component: StartedTripsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartedTripsPageRoutingModule {}
