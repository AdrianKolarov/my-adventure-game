import { inject, Injectable } from '@angular/core';
import { addDoc, updateDoc, collection, Firestore, deleteDoc, doc, onSnapshot, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlayerCharactersService {
  firestore = inject(Firestore)
  
  createCharacter(userId: string, characterData: {name: string, gender: string}){
    const userCharactersCollection = collection(this.firestore, `users/${userId}/characters`)
    const enrichedCharacterData = {
      ...characterData,
      currentLevel: 1,
      inventory: [],
      choicesMade: [],
      flags:{
        hasDied: false,
        hasEscaped: false,
        deathLevel: false,
        deathNote: false
      }
    }
    return addDoc(userCharactersCollection, enrichedCharacterData)
  }

  getCharacters(userId: string, callback: (characters: any[]) => void) {
    const userCharactersCollection = collection(this.firestore, `users/${userId}/characters`);
    
    return onSnapshot(userCharactersCollection, (snapshot) => {
      const characters = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(characters); 
    });
  }
  
  getCharacterById(userId: string, characterId: string): Promise<any>{
    const characterDoc = doc(this.firestore,`users/${userId}/characters/${characterId}`)
    return getDoc(characterDoc).then(snapshot => {
      if(snapshot.exists()){
        return {id: snapshot.id, ...snapshot.data()}
      } else {
        throw new Error('Character not found!')
      }
    })
  }
  updateCharacter(userId: string, characterId: string, updatedData: any): Promise<void> {
    const characterDoc = doc(this.firestore, `users/${userId}/characters/${characterId}`);
    return updateDoc(characterDoc, updatedData);
  }
  

  deleteCharacter(userId: string, characterId: string) {
    const characterDoc = doc(this.firestore, `users/${userId}/characters/${characterId}`);
    return deleteDoc(characterDoc);
  }

  listenToCharacter(userId: string, characterId: string, callback: (character: any) => void) {
    const characterDoc = doc(this.firestore, `users/${userId}/characters/${characterId}`);
    return onSnapshot(characterDoc, (snapshot) => {
      if (snapshot.exists()) {
        callback({ id: snapshot.id, ...snapshot.data() });
      } else {
        console.warn('Character document no longer exists');
      }
    });
  }
  
}
