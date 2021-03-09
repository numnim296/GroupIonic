import { Component, OnInit } from '@angular/core';
import { PopoverController,NavController } from '@ionic/angular';
import { AngularFirestore} from '@angular/fire/firestore';
import { crudApi } from './crudApi';
import { Router } from "@angular/router";
import { PopoverComponent }  from 'src/app/components/popover/popover.component'

@Component({
  selector: 'app-admin-select',
  templateUrl: './admin-select.page.html',
  styleUrls: ['./admin-select.page.scss'],
})
export class AdminSelectPage implements OnInit {

  allSeries:any;
  allSelectType:any;

  constructor(private navCtrl: NavController,private popCtrl: PopoverController,private afs: AngularFirestore,private crudapi:crudApi,public router: Router,) {}

  ngOnInit(){
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



  buttonClick(data){
    if(data=="drama"){
      this.allSelectType = this.allSeries.filter(
        x=>x.type == data
      )
    }
    if(data=="romance"){
      this.allSelectType = this.allSeries.filter(
        x=>x.type == data
      )
    }
    if(data=="action"){
      this.allSelectType = this.allSeries.filter(
        x=>x.type == data
      )
    }
    if(data=="comedy"){
      this.allSelectType = this.allSeries.filter(
        x=>x.type == data
      )
    }
    let alldata = JSON.stringify(this.allSelectType);
    this.router.navigate(["admin-home", alldata]);
  
  }
  addData(){
    this.navCtrl.navigateRoot('add-series')
  }
        
    

}
