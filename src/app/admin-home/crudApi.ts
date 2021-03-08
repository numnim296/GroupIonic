import { Injectable, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
    providedIn:"root",
})
export class crudApi{
    
    constructor(private fs:AngularFirestore){}

    readAllSeries(){
        return this.fs.collection('k-drama').snapshotChanges();
    }
    deleteSeries(id){
        return this.fs.doc('k-drama/' + id).delete();
    }
}