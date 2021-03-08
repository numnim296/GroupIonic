import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverLoginComponent } from 'src/app/components/popover-login/popover-login.component';

@Component({
  selector: 'app-detail-series',
  templateUrl: './detail-series.page.html',
  styleUrls: ['./detail-series.page.scss'],
})
export class DetailSeriesPage implements OnInit {
  data:any;

  constructor(
    public navCtrl: NavController,
    public actroute: ActivatedRoute,
    public router: Router,
    private popCtrl: PopoverController) { }

  ngOnInit() {
    const dataRev = this.actroute.snapshot.paramMap.get('detail');
    this.data = JSON.parse(dataRev);
  }
  async _popOver(ev: any) {
    const popOver = await this.popCtrl.create({
      component: PopoverLoginComponent,
      cssClass: 'my-popover-class',
      event: ev,
    })

    return await popOver.present()
  }

  back(){
    this.navCtrl.pop()
  }


}
