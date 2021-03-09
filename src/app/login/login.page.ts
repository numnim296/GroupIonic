import { Component, OnInit } from '@angular/core';
import {
  ToastController,
  LoadingController,
  NavController,
  Platform
} from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  getUser:string;
  getPassword:string;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private platform: Platform
  ) {}  
   

  ngOnInit() {
  }

  async Login() {

    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: "กรุณารอสักครู่..."
      });
      loader.present();

      try {
        await this.afAuth.signInWithEmailAndPassword(this.getUser, this.getPassword)
          .then(data => {
            this.navCtrl.navigateRoot("admin-select");
          })
          .catch();
      } catch (e) {
        this.showToast(e);
      }
      loader.dismiss();
    }
  }

  formValidation() {
    if (!this.getUser) {
      this.showToast("Enter email");
      return false;
    }

    if (!this.getPassword) {
      this.showToast("Enter password");
      return false;
    }

    return true;
  }


  showToast(message: string) {
    this.toastCtrl
      .create({
        message: message,
        duration: 3000
      })
      .then(toastData => toastData.present());
  }
  back(){

    this.navCtrl.navigateRoot('home')
  }

}
