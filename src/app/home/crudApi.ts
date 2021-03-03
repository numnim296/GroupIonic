import { Injectable, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
    providedIn:"root",
})
export class crudApi{
    
    constructor(private fs:AngularFirestore){}

    readAllProduct(){
        return this.fs.collection('product').snapshotChanges();
    }

    
}