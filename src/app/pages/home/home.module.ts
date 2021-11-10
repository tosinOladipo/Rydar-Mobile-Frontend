import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component'
import { DashboardNavComponent } from 'src/app/components/dashboard-nav/dashboard-nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule

  ],
  declarations: [
    HomePage,
    DashboardHeaderComponent,
    DashboardNavComponent
  ]
})
export class HomePageModule {}
