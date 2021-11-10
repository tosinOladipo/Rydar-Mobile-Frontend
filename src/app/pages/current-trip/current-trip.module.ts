import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentTripPageRoutingModule } from './current-trip-routing.module';

import { CurrentTripPage } from './current-trip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentTripPageRoutingModule
  ],
  declarations: [CurrentTripPage]
})
export class CurrentTripPageModule {}
