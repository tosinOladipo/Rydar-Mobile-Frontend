import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RiderServiceService } from 'src/app/services/rider-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginRiderData = {}

  constructor(
    public loadingController: LoadingController,
    private riderService: RiderServiceService,
    private router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  loginRider() {
    this.riderService.loginRider(this.loginRiderData)
    .subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token',res.token)
        localStorage.setItem('rider',res.rider._id)
        this.router.navigate(['/dashboard'])
        this.successToast()
        this.presentLoading()
      },
      err => {
        console.log(err)
        this.failedToast()
      }
    )
  }

  async successToast() {
    const toast = await this.toastController.create({
      message: 'You have login successfully.',
      color: 'success',
      duration: 2000
    });
    toast.present();
  }

  async failedToast() {
    const toast = await this.toastController.create({
      message: 'Unable to login. Invalid phone number or PIN',
      color: 'danger',
      duration: 5000
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


}
