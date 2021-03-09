import { crudApi } from './crudApi';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent }  from 'src/app/components/popover/popover.component'
import {AngularFirestore} from '@angular/fire/firestore';
import { Router } from "@angular/router";
import {
  ToastController,
  LoadingController,
  NavController,
  AlertController
} from "@ionic/angular";


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {
  allProduct:any;
  dataProduct:any;
  ImageUrl:any;

  dtoo:string;
  pd:string;
  findPD:any;
  showFind:any;
  showYes:string="no";
  showAll:string="yes";

  allSeries:any;

  constructor(
    public menu: MenuController,
    private popCtrl: PopoverController,
    private fs:AngularFirestore,
    private crudapi:crudApi,
    public router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    public alertController: AlertController
    ) { }

  ngOnInit() {
    this.crudapi.readAllSeries().subscribe(data=>{
      this.allSeries = data.map(e=>{
        return {
          id:e.payload.doc.id,
          title:e.payload.doc.data()['title'.toString()],
          description:e.payload.doc.data()['description'.toString()],
          year:e.payload.doc.data()['year'.toString()],
          ep:e.payload.doc.data()['ep'.toString()],
          channel:e.payload.doc.data()['channel'.toString()],
          type:e.payload.doc.data()['type'.toString()],
          image:e.payload.doc.data()['image'.toString()],
          actor:e.payload.doc.data()['actor'.toString()],
          sday:e.payload.doc.data()['sday'.toString()],
          eday:e.payload.doc.data()['eday'.toString()],
          end:e.payload.doc.data()['end'.toString()],
          time:e.payload.doc.data()['time'.toString()],
        }
        
      })
    })
    
  }
  
  async _popOver(ev: any) {
    const popOver = await this.popCtrl.create({
      component: PopoverComponent,
      cssClass: 'my-popover-class',
      event: ev,
    })

    return await popOver.present()
  }

  editSeries(sr:any){
    let data = JSON.stringify(sr);
    this.router.navigate(["edit-series", data]);
  }

  deleteProduct(dtPd){
    this.crudapi.deleteSeries(dtPd['id']).then(res=>{
      console.log('delete success')
    }      
    ).catch(err=>{
      console.error(err)
    })
  }
  addData(){
    this.navCtrl.navigateRoot('add-series')
  }

  findProduct(e){
    if(e.target.value == ""){

      this.findPD = this.allProduct;
      this.showYes = "have";
      this.showAll = undefined;
    }

    else{
        this.showAll = undefined;
       this.findPD = this.allProduct.filter(x => x.title.includes(e.target.value) == true);
        if(this.findPD.length == 0){
          this.showFind = undefined;
          this.showYes =  undefined;
        }else{
          this.showFind = this.findPD
          this.showYes = "have";
        }
        
    


    }
  }

  async presentAlertConfirm(sr) {
    console.log(sr)
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ยืนยันการลบ!',
      message: 'คุณต้องการลบซีรีย์เรื่องนี้',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'ลบ',
          handler: () => {
            this.deleteProduct(sr)
          }
        }
      ]
    });

    await alert.present();
  }
  
}
