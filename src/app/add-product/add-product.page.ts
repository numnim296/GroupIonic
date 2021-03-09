import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent }  from 'src/app/components/popover/popover.component'
import { NavController,ToastController,LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {


  detailProduct: any;
  getTitle: string;
  getDescription: string;
  getPrice: number;
  getCompany: string;
  getImage: string;
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






  constructor(private popCtrl: PopoverController,

    public navCtrl: NavController,
      public actroute: ActivatedRoute,
      private afs: AngularFirestore,
      private afStorage: AngularFireStorage,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController,
    
    ) { 
      this.isFileUploading = false;
    this.isFileUploaded = false;

    this.filesCollection = afs.collection<imgFile>('imagesCollection');
    this.files = this.filesCollection.valueChanges();
    }

  ngOnInit() {
  }

  async _popOver(ev: any) {
    const popOver = await this.popCtrl.create({
      component: PopoverComponent,
      cssClass: 'my-popover-class',
      event: ev,
    })

    return await popOver.present()
  }


  buildImage(event){
    this.fileImageEvent = event.target.files.item(0)
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.ImagePreview = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);  
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

    this.addProduct();
}

checkImage(){
  if (this.fileImageEvent === undefined){
    this.addProduct()
  }else{
    this.uploadImage()
  }
}

 addProduct(){
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
  this.afs.collection('k-drama').add(newDataProduct).then(res=>{
    console.log("add success")
    this.navCtrl.navigateRoot("admin-home");
  }).catch(err=>{
    console.error(err)
  })
}

beforeAddProduct(){
 
  if(this.formValidation){
  
    try {
      this.uploadImage()
      
    } catch (error) {
      console.log(error)
    }
  }
}

formValidation() {
  if (!this.getTitle) {
    this.showToast("Enter title");
    return false;
  }

  if (!this.getCompany) {
    this.showToast("Enter company");
    return false;
  }
  if (!this.getPrice) {
    this.showToast("Enter price");
    return false;
  }
  if (!this.getDescription
    ) {
    this.showToast("Enter desciption");
    return false;
  }
  if (!this.getSize
    ) {
    this.showToast("Enter size");
    return false;
  }
  if (!this.getType) {
    this.showToast("Enter type");
    return false;
  }
  
  if (!this.fileImageEvent) {

    this.showToast("Enter image");
    return false;
  }

  return true;
}


showToast(message: string) {
  this.toastCtrl
    .create({
      message: message,
      duration: 3000
    })
    .then(toastData => toastData.present());
}

onChangeType(e){
  
}
onChangeYear(e){
  
}


back(){
  this.navCtrl.navigateRoot("admin-select")
}

}
