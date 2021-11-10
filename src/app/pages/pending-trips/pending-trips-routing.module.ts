import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendingTripsPage } from './pending-trips.page';

const routes: Routes = [
  {
    path: '',
    component: PendingTripsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingTripsPageRoutingModule {}
