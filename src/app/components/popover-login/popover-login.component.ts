import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import {

  NavController,

} from "@ionic/angular";

@Component({
  selector: 'app-popover-login',
  templateUrl: './popover-login.component.html',
  styleUrls: ['./popover-login.component.scss'],
})
export class PopoverLoginComponent implements OnInit {

  constructor(
    private popCtrl: PopoverController,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {}
  
  LogIn(){    
      this.navCtrl.navigateRoot("login");   
  }
}
