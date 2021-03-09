import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AngularFireAuth } from "@angular/fire/auth";
import {

  NavController,
  AlertController

} from "@ionic/angular";

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(
    private popCtrl: PopoverController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    public alertController: AlertController
    ) { }

  ngOnInit() {}
  LogOut(){
    this.afAuth.signOut().then(data=>{
      this.navCtrl.navigateRoot("home");
    } )
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ยืนยันการออกจากระบบ!',
      message: 'คุณต้องการออกจากระบบ',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'ยืนยัน',
          handler: () => {
            this.LogOut()
          }
        }
      ]
    });

    await alert.present();
  }

}
