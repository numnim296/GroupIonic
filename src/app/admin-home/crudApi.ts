import { Injectable, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
    providedIn:"root",
})
export class crudApi{
    
    constructor(private fs:AngularFirestore){}

    readAllData(){

        return this.fs.collection('product').snapshotChanges();
    }

    deleteProduct(id){
        return this.fs.doc('product/' + id).delete();
    }
}