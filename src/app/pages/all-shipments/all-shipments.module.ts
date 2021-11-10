import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllShipmentsPageRoutingModule } from './all-shipments-routing.module';

import { AllShipmentsPage } from './all-shipments.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TripDetailsComponent } from 'src/app/components/trip-details/trip-details.component';
import { AllTripsListComponent } from 'src/app/components/all-trips-list/all-trips-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllShipmentsPageRoutingModule
  ],
  declarations: [
    AllShipmentsPage,
    HeaderComponent,
    TripDetailsComponent,
    AllTripsListComponent
  ]
})
export class AllShipmentsPageModule {}
