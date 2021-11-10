import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletedTripsPageRoutingModule } from './completed-trips-routing.module';

import { CompletedTripsPage } from './completed-trips.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CompletedTripListComponent } from 'src/app/components/completed-trip-list/completed-trip-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletedTripsPageRoutingModule
  ],
  declarations: [
    CompletedTripsPage,
    HeaderComponent,
    CompletedTripListComponent
  ]
})
export class CompletedTripsPageModule {}
