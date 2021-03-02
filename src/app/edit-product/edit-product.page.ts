import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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





  constructor
    (public navCtrl: NavController,
      public actroute: ActivatedRoute,
      private afs: AngularFirestore,
      private afStorage: AngularFireStorage) {
    this.isFileUploading = false;
    this.isFileUploaded = false;

    // Define uploaded files collection
    this.filesCollection = afs.collection<imgFile>('imagesCollection');
    this.files = this.filesCollection.valueChanges();


  }

  ngOnInit() {
    const dataRev = this.actroute.snapshot.paramMap.get('pd');
    this.detailProduct = JSON.parse(dataRev);
    this.getTitle = this.detailProduct['title'];
    this.getDescription = this.detailProduct['description'];
    this.getPrice = this.detailProduct['price'];
    this.getCompany = this.detailProduct['company'];
    this.getImage = this.detailProduct['image'];
    this.getType = this.detailProduct['type'];
    this.getSize = this.detailProduct['size'];
    this.IDProduct = this.detailProduct['id'];
    this.ImageUrl = this.detailProduct['image'];
    


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
  newDataProduct['price'] = this.getPrice;
  newDataProduct['image'] = this.ImageUrl;
  newDataProduct['type'] = this.getType;
  newDataProduct['size'] = this.getSize;
  newDataProduct['company'] = this.getCompany;
  this.afs.doc('product/' + this.IDProduct).update(newDataProduct).then(data=>{
    this.navCtrl.navigateRoot("admin-home");
  }
    
  )
}


}
