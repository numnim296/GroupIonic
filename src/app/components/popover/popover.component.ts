import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AngularFireAuth } from "@angular/fire/auth";
import {

  NavController,

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
    ) { }

  ngOnInit() {}
  LogOut(){
    this.afAuth.signOut().then(data=>{
      this.navCtrl.navigateRoot("home");
    } )
  }

}
