import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartTripFormPageRoutingModule } from './start-trip-form-routing.module';

import { StartTripFormPage } from './start-trip-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartTripFormPageRoutingModule
  ],
  declarations: [StartTripFormPage]
})
export class StartTripFormPageModule {}
