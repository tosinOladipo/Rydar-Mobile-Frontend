import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartedTripsPageRoutingModule } from './started-trips-routing.module';

import { StartedTripsPage } from './started-trips.page';
import { StartedTripListComponent } from 'src/app/components/started-trip-list/started-trip-list.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartedTripsPageRoutingModule
  ],
  declarations: [
    StartedTripsPage,
    HeaderComponent,
    StartedTripListComponent
  ]
})
export class StartedTripsPageModule {}
