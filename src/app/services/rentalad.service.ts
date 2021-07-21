import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { RentalAd } from '../domain/rental-ad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentaladService {

  constructor(private afs: AngularFirestore) { }

  save(rentalAd: RentalAd){
    const refSchedule = this.afs.collection('rental-ads');

    if(rentalAd.id == null){
      rentalAd.id = this.afs.createId();
      rentalAd.enabled = true;
    }

    refSchedule.doc(rentalAd.id).set(Object.assign({}, rentalAd));
  }

  getRentalAds(): Observable<any[]> {
    return this.afs.collection('rental-ads',
            ref => ref.where('enabled', '==', true)
            ).valueChanges();
  }

}
