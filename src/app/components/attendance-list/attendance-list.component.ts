import { Component, OnInit } from '@angular/core';
import { AttendanceServiceService } from 'src/app/services/attendance-service.service';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss'],
})
export class AttendanceListComponent implements OnInit {

  lists:any = [];
  riderId:any;

  constructor(
    private attendanceService: AttendanceServiceService
  ) { }

  ngOnInit() {
    this.riderId = localStorage.getItem('rider');
    this.attendanceService.getRiderAttendance(this.riderId).subscribe(
      res => { 
        this.lists = res
        console.log(this.lists)
      },
      err => console.log(err)
      )
  }
  


}
