
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverLoginComponent } from 'src/app/components/popover-login/popover-login.component';
import { AngularFirestore} from '@angular/fire/firestore';
import { crudApi } from './crudApi';
import { Router } from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // allProduct:any;
  // pd:string;
  // findPD:any;
  // showFind:any;
  // showYes:string="no";

  // showLGF:string="yes"
  allSeries:any;
  allSelectType:any;

  constructor(private popCtrl: PopoverController,private afs: AngularFirestore,private crudapi:crudApi,public router: Router,) {}

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
        }
        
      })
      console.log('home',this.allSeries);
    })
  }

  async _popOver(ev: any) {
    const popOver = await this.popCtrl.create({
      component: PopoverLoginComponent,
      cssClass: 'my-popover-class',
      event: ev,
    })

    return await popOver.present()
  }

  // findProduct(e){
  //   this.showLGF = undefined;
  //   if(e.target.value == ""){
  //     this.findPD = this.allProduct;
  //     this.showYes = "have";
  //   }

  //   else{
  //      this.findPD = this.allProduct.filter(x => x.title.includes(e.target.value) == true);
  //       if(this.findPD.length == 0){
  //         this.showFind = undefined;
  //         this.showYes =  undefined;
  //       }else{
  //         this.showFind = this.findPD
  //         this.showYes = "have";
  //       }

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
    this.router.navigate(["series", alldata]);
  
  }
        
    


  //   }
  // }

}
