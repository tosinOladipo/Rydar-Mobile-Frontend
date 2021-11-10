import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_SERVER_URL } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AttendanceServiceService {

  private apiUrl = API_SERVER_URL

  constructor(private http: HttpClient) { }

  riderAttendance(attendance:any) {
    return  this.http.post<any>(`${this.apiUrl}/attendance`,attendance)
  }


  getRiderAttendance(riderId: string) {
    return  this.http.get<any>(`${this.apiUrl}/attendance/${riderId}`);
  }


}
