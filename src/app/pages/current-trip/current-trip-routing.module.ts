import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentTripPage } from './current-trip.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentTripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentTripPageRoutingModule {}
