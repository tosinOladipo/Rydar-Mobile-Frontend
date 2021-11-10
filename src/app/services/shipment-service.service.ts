import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_SERVER_URL } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ShipmentServiceService {

  private apiUrl = API_SERVER_URL


  constructor(private http: HttpClient) { }

  postTrip(trip) {
    return  this.http.post<any>(`${this.apiUrl}/shipments`, trip)
  }

  getRiderShipments(riderId: string) {
    return  this.http.get<any>(`${this.apiUrl}/shipments/rider/${riderId}`);
  }

  getShipmentById(orderId: string) {
    return  this.http.get<any>(`${this.apiUrl}/shipments/${orderId}`);
  }

  getPendingShipments(riderId: string) {
    return  this.http.get<any>(`${this.apiUrl}/shipments/pending/${riderId}`);
  }

  getCurrentShipment(riderId: string) {
    return  this.http.get<any>(`${this.apiUrl}/shipments/current/${riderId}`);
  }

  getStartedShipments(riderId: string) {
    return  this.http.get<any>(`${this.apiUrl}/shipments/started/${riderId}`);
  }

  getCompletedShipments(riderId: string) {
    return  this.http.get<any>(`${this.apiUrl}/shipments/completed/${riderId}`);
  }


  startTrip(shipment: any, riderId: any, orderId: any ) {
    return  this.http.put<any>(`${this.apiUrl}/shipments/start-trip/${riderId}/${orderId}`, shipment);
  }

  updateShipment(shipment: any, orderId: any ) {
    return  this.http.put<any>(`${this.apiUrl}/shipments/${orderId}`, shipment);
  }


}
