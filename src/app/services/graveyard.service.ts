import { Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore, getDocs, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GraveyardService {

  constructor(private firestore: Firestore) { }

  addEntry(entry: any){
    const graveyardRef = collection(this.firestore, 'graveyard')
    return addDoc(graveyardRef, entry)
  }
  getAllEntries(){
    const graveyardRef = collection(this.firestore, 'graveyard')
    return getDocs(graveyardRef)
  }
  updateNote(entryId: string, newNote: string){
    const entryRef = doc(this.firestore, 'graveyard', entryId)
    return updateDoc(entryRef, {note: newNote})
  }
}
