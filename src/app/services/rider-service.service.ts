import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_SERVER_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RiderServiceService {

  private riderUrl = API_SERVER_URL

  constructor(private http: HttpClient) { }

  loginRider(rider) {
    return  this.http.post<any>(`${this.riderUrl}/riders/login`, rider)
  }


  getRider(riderId: string) {
    return  this.http.get<any>(`${this.riderUrl}/riders/${riderId}`);
  }

  updateRiderLocation(rider, riderId: string ) {
    return  this.http.put<any>(`${this.riderUrl}/riders/${riderId}`, rider );
  }

}
