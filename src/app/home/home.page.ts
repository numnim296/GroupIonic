
import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverLoginComponent } from 'src/app/components/popover-login/popover-login.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private popCtrl: PopoverController) {}

  async _popOver(ev: any) {
    const popOver = await this.popCtrl.create({
      component: PopoverLoginComponent,
      cssClass: 'my-popover-class',
      event: ev,
    })

    return await popOver.present()
  }

}
