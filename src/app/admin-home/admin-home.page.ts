import { crudApi } from './crudApi';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent }  from 'src/app/components/popover/popover.component'
import {AngularFirestore} from '@angular/fire/firestore';
import { Router } from "@angular/router";


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

  constructor(
    public menu: MenuController,
    private popCtrl: PopoverController,
    private fs:AngularFirestore,
    private crudapi:crudApi,
    public router: Router
    ) { }

  ngOnInit() {
    this.crudapi.readAllData().subscribe(data=>{
      let dd;
      this.allProduct = data.map(e=>{
     
        return {
          id:e.payload.doc.id,
          title:e.payload.doc.data()['title'.toString()],
          description:e.payload.doc.data()['description'.toString()],
          price:e.payload.doc.data()['price'.toString()],
          size:e.payload.doc.data()['size'.toString()],
          company:e.payload.doc.data()['company'.toString()],
          type:e.payload.doc.data()['type'.toString()],
          image:e.payload.doc.data()['image'.toString()],
        }
        
      })
      console.log(this.allProduct);
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

  editProduct(pd:any){
    let dataProduct = JSON.stringify(pd);
    this.router.navigate(["edit-product", dataProduct]);
  }

}
