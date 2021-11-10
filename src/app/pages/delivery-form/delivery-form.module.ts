import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryFormPageRoutingModule } from './delivery-form-routing.module';

import { DeliveryFormPage } from './delivery-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryFormPageRoutingModule
  ],
  declarations: [DeliveryFormPage]
})
export class DeliveryFormPageModule {}
