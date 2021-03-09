import { Component, OnInit } from '@angular/core';
import { NavController, } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';

import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';



export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  detailProduct: any;
  getTitle: string;
  getDescription: string;
  getPrice: number;
  getCompany: string;
  getImage: any;
  getImage2: any;
  getType: string;
  getSize: string;
  IDProduct: String;

  eday:string;
  ep:number;
  sday:string;
  year:string;
  actor:string;
  channel:string;
  time:string

  typeSend:string;
  typeSelectValue:string;

  yearSelectValue:string;


  ImageUrl:string;
  ImagePreview:any;

  fileImageEvent: any;
  fileUploadTask: AngularFireUploadTask;
  percentageVal: Observable<number>;
  trackSnapshot: Observable<any>;
  UploadedImageURL: Observable<string>;
  files: Observable<imgFile[]>;
  imgName: string;
  imgSize: number;
  isFileUploading: boolean;
  isFileUploaded: boolean;
  private filesCollection: AngularFirestoreCollection<imgFile>;





  constructor
    (public navCtrl: NavController,
      public actroute: ActivatedRoute,
      private afs: AngularFirestore,
      private afStorage: AngularFireStorage,
      public router: Router,) {
    this.isFileUploading = false;
    this.isFileUploaded = false;
    this.filesCollection = afs.collection<imgFile>('imagesCollection');
    this.files = this.filesCollection.valueChanges();


  }

  ngOnInit() {
    const dataRev = this.actroute.snapshot.paramMap.get('pd');
    this.detailProduct = JSON.parse(dataRev);
    console.log('get from edit', JSON.parse(dataRev))
    this.getTitle = this.detailProduct['title'];
    this.getDescription = this.detailProduct['description'];
    // this.getPrice = this.detailProduct['price'];
    // this.getCompany = this.detailProduct['company'];
    this.getImage = this.detailProduct['image'];
    this.getImage2 = this.detailProduct['image'];
    this.getType = this.detailProduct['type'];
    // this.getSize = this.detailProduct['size'];
    this.IDProduct = this.detailProduct['id'];
    this.ImageUrl = this.detailProduct['image'];
    this.year = this.detailProduct['year'];
    this.sday = this.detailProduct['sday'];
    this.eday = this.detailProduct['eday'];
    this.ep = this.detailProduct['ep'];
    this.actor = this.detailProduct['actor'];
    this.time= this.detailProduct['time'];
    this.channel= this.detailProduct['channel'];
    this.typeSend = this.detailProduct['type'];
    


  }
  buildImage(event){
    this.fileImageEvent = event.target.files.item(0)
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.getImage2 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }   
  }

  uploadImage() {
      
    if ( this.fileImageEvent.type.split('/')[0] !== 'image') { 
      console.log('File type is not supported!')
      return;
    }

    this.isFileUploading = true;
    this.isFileUploaded = false;

    this.imgName =  this.fileImageEvent.name;

    const fileStoragePath = `filesStorage/${new Date().getTime()}_${ this.fileImageEvent.name}`;

    const imageRef = this.afStorage.ref(fileStoragePath);

    this.fileUploadTask = this.afStorage.upload(fileStoragePath,  this.fileImageEvent);

    this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(
      
      finalize(() => {
        this.UploadedImageURL = imageRef.getDownloadURL();
        
        this.UploadedImageURL.subscribe(resp=>{
          this.storeFilesFirebase({
            name:  this.fileImageEvent.name,
            filepath: resp,
            size: this.imgSize
          });
          this.isFileUploading = false;
          this.isFileUploaded = true;
        },error=>{
          console.log(error);
        })
      }),
      tap(snap => {
          this.imgSize = snap.totalBytes;
      })
    )
}

storeFilesFirebase(image: imgFile) {
   
    const fileId = this.afs.createId();
    this.getImage = fileId  
    this.ImageUrl = image['filepath']

    this.updateProduct();
}

checkImage(){
  if (this.fileImageEvent === undefined){
    this.updateProduct()
  }else{
    this.uploadImage()
  }
}

updateProduct(){
  let newDataProduct = {};
  newDataProduct['title'] = this.getTitle;
  newDataProduct['description'] = this.getDescription;
  newDataProduct['type'] = this.typeSelectValue;
  newDataProduct['image'] = this.ImageUrl;
  newDataProduct['ep'] = this.ep;
  newDataProduct['eday'] = this.eday;
  newDataProduct['sday'] = this.sday;
  newDataProduct['actor'] = this.actor;
  newDataProduct['time'] = this.time;
  newDataProduct['channel'] = this.channel;
  newDataProduct['year'] = this.yearSelectValue;
  console.log('err_ .',newDataProduct);
  this.afs.doc('k-drama/' + this.IDProduct).update(newDataProduct).then(data=>{  
    // this.router.navigate(["admin-home", this.typeSend]);
    this.navCtrl.navigateRoot('admin-select')
  }    
  )
}

back(){
  this.navCtrl.pop()
}
onChangeType(e){
  console.log("type => ",e);
  
}
onChangeYear(e){
  console.log('year => ',e);  
}


}
