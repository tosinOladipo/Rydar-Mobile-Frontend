import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendancePageRoutingModule } from './attendance-routing.module';

import { AttendancePage } from './attendance.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { AttendanceListComponent } from 'src/app/components/attendance-list/attendance-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendancePageRoutingModule
  ],
  declarations: [
    AttendancePage,
    HeaderComponent,
    AttendanceListComponent
  ]
})
export class AttendancePageModule {}
