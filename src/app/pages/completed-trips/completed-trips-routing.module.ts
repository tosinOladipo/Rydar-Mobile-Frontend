import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletedTripsPage } from './completed-trips.page';

const routes: Routes = [
  {
    path: '',
    component: CompletedTripsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletedTripsPageRoutingModule {}
