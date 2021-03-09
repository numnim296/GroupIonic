import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute ,Router} from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverLoginComponent } from 'src/app/components/popover-login/popover-login.component';

@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
})
export class SeriesPage implements OnInit {
  detailSeries:any;
  selectValue:string;
  listSelectYear:any;
  showAll:string = "show"
  constructor(
    public navCtrl: NavController,
    public actroute: ActivatedRoute,
    public router: Router,
    private popCtrl: PopoverController
  ) { }

  ngOnInit() {
    const dataRev = this.actroute.snapshot.paramMap.get('alldata');
    this.detailSeries = JSON.parse(dataRev);
    console.log('hhhh => ',JSON.parse(dataRev))
  }


  onChange(SelectedValue){ 
    this.showAll = undefined;
    this.listSelectYear = this.detailSeries.filter(
      x=>x.year == this.selectValue
    )} 

  selectDetailSeries(dt){
    let detail = JSON.stringify(dt);
    this.router.navigate(["detail-series", detail]);
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
