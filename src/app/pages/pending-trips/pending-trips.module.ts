import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingTripsPageRoutingModule } from './pending-trips-routing.module';

import { PendingTripsPage } from './pending-trips.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { PendingTripListComponent } from 'src/app/components/pending-trip-list/pending-trip-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingTripsPageRoutingModule
  ],
  declarations: [
    PendingTripsPage,
    HeaderComponent,
    PendingTripListComponent
  ]
})
export class PendingTripsPageModule {}
