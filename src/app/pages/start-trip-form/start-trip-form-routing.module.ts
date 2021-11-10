import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartTripFormPage } from './start-trip-form.page';

const routes: Routes = [
  {
    path: '',
    component: StartTripFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartTripFormPageRoutingModule {}
