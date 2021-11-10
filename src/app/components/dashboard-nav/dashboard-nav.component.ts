import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SelectTripComponent } from 'src/app/modal/select-trip/select-trip.component';


@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss'],
})
export class DashboardNavComponent implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: SelectTripComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
