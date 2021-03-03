
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverLoginComponent } from 'src/app/components/popover-login/popover-login.component';
import { AngularFirestore} from '@angular/fire/firestore';
import { crudApi } from './crudApi';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  allProduct:any;
  pd:string;
  findPD:any;
  showFind:any;
  showYes:string="no";
  constructor(private popCtrl: PopoverController,private afs: AngularFirestore,private crudapi:crudApi,) {}

  ngOnInit(){
    this.crudapi.readAllProduct().subscribe(data=>{
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
      console.log('home',this.allProduct);
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

  findProduct(e){
    if(e.target.value == ""){
    }

    else{
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

}
