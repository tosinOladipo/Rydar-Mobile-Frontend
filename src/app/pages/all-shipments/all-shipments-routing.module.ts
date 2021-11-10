import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllShipmentsPage } from './all-shipments.page';

const routes: Routes = [
  {
    path: '',
    component: AllShipmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllShipmentsPageRoutingModule {}
