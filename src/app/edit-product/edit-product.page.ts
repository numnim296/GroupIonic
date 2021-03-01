import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  detailProduct:any;
  getTitle:string;
  getDescription:string;
  getPrice:number;
  getCompany:string;
  getImage:string;
  getType:string;
  getSize:string


  constructor(public navCtrl: NavController, public actroute: ActivatedRoute) { }

  ngOnInit() {
    const dataRev = this.actroute.snapshot.paramMap.get('pd');
    this.detailProduct = JSON.parse(dataRev);
    this.getTitle = this.detailProduct['title'];
    this.getDescription = this.detailProduct['description'];
    this.getPrice = this.detailProduct['price'];
    this.getCompany = this.detailProduct['company'];
    this.getImage = this.detailProduct['image'];
    this.getType = this.detailProduct['type'];
    this.getSize = this.detailProduct['size']    
  }
 

}
