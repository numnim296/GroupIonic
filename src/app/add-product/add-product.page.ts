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

  ImageUrl:string;

  fileImageEvent: any;


  // File upload task 
  fileUploadTask: AngularFireUploadTask;

  // Upload progress
  percentageVal: Observable<number>;

  // Track file uploading with snapshot
  trackSnapshot: Observable<any>;

  // Uploaded File URL
  UploadedImageURL: Observable<string>;

  // Uploaded image collection
  files: Observable<imgFile[]>;

  // Image specifications
  imgName: string;
  imgSize: number;

  // File uploading status
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

    // Define uploaded files collection
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


  buildImage(event: FileList){
    this.fileImageEvent = event.item(0)
    
  }

  uploadImage() {
      
    if ( this.fileImageEvent.type.split('/')[0] !== 'image') { 
      console.log('File type is not supported!')
      return;
    }

    this.isFileUploading = true;
    this.isFileUploaded = false;

    this.imgName =  this.fileImageEvent.name;

    // Storage path
    const fileStoragePath = `filesStorage/${new Date().getTime()}_${ this.fileImageEvent.name}`;

    // Image reference
    const imageRef = this.afStorage.ref(fileStoragePath);

    // File upload task
    this.fileUploadTask = this.afStorage.upload(fileStoragePath,  this.fileImageEvent);

    // Show uploading progress
    // this.percentageVal = this.fileUploadTask.percentageChanges();
    this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(
      
      finalize(() => {
        // Retreive uploaded image storage path
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
  newDataProduct['price'] = this.getPrice;
  newDataProduct['image'] = this.ImageUrl;
  newDataProduct['type'] = this.getType;
  newDataProduct['size'] = this.getSize;
  newDataProduct['company'] = this.getCompany;

  

  this.afs.collection('product').add(newDataProduct).then(res=>{
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
    // show toast message
    this.showToast("Enter title");
    return false;
  }

  if (!this.getCompany) {
    // show toast message
    this.showToast("Enter company");
    return false;
  }
  if (!this.getPrice) {
    // show toast message
    this.showToast("Enter price");
    return false;
  }
  if (!this.getDescription
    ) {
    // show toast message
    this.showToast("Enter desciption");
    return false;
  }
  if (!this.getSize
    ) {
    // show toast message
    this.showToast("Enter size");
    return false;
  }
  if (!this.getType) {
    // show toast message
    this.showToast("Enter type");
    return false;
  }
  
  if (!this.fileImageEvent) {
    // show toast message
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


}