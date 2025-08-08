import { Injectable } from '@angular/core';
import { story } from '../data/story';
import { StoryLevel } from '../interfaces/types';
import { PlayerCharactersService } from './player-characters.service';
import { BehaviorSubject } from 'rxjs';
import { GraveyardService } from './graveyard.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private activeCharacter: any = null
  private deathNoteModalSubject = new BehaviorSubject<boolean>(false)
  deathNoteModal$ = this.deathNoteModalSubject.asObservable()
  private pendingDeathNote: string = ''

  constructor(public playerCharactersService: PlayerCharactersService, private graveyardService: GraveyardService, private router: Router) {}

  setActiveCharacter(character: any){
    this.activeCharacter = character
  }

  getActiveCharacter(){
    return this.activeCharacter
  }

  getCurrentLevelData(): StoryLevel{
    if(!this.activeCharacter){
      throw new Error('No character selected!')
    }
    return story[Number(this.activeCharacter.currentLevel)]
  }
  makeChoice(choice: string, userId: string, characterId: string): Promise<void> {
    const currentLevel = this.activeCharacter.currentLevel;
    let updatedData: any = {};
  
    switch (currentLevel) {
      case 1:
        updatedData.currentLevel = choice === 'Leave the tower' ? '1.1' : 2;
        break;
      case '1.1':
         updatedData.flags = {
          ...(this.activeCharacter.flags || {}),
          hasDied: true,
          deathLevel: Number(currentLevel)
        }
        this.deathNoteModalSubject.next(true)
        break;
      case 2:
        updatedData.currentLevel = 3;
        if (choice === 'Take the rope') {
          updatedData.inventory = [...this.activeCharacter.inventory, 'rope'];
        }
        break;
  
        case 3:
          if (choice === 'Use the rope to climb') {
            updatedData.currentLevel = 5
          } else {
            updatedData.currentLevel = 4
          }
          break;
        
  
      case 4:
        updatedData.currentLevel = 5;
        if(choice === 'Drink the elixir'){
          const currentIntellect = this.activeCharacter.stats.intellect ?? 0
          updatedData.stats = {
            ...this.activeCharacter.stats,
            intellect: currentIntellect + 1
          }
        }
        break;
  
      case 5:
        updatedData.currentLevel = choice === 'Keep looking into the mirror' ? '5.1' : '5.2';
        break;
      case '5.1':
        updatedData.flags = {
          ...(this.activeCharacter.flags || {}),
          hasDied: true,
          deathLevel: Number(currentLevel)
        }
        
        this.deathNoteModalSubject.next(true)
        console.log('you died to mirror')
        break
  
      case '5.2':
        updatedData.currentLevel = 6;
        break;
  
      case 6:
        updatedData.currentLevel =
          choice === 'Investigate the charred remains instead' ? '6.2' : '6.1';
        break;
        case '6.1':
          updatedData.flags = {
            ...(this.activeCharacter.flags || {}),
            hasDied: true,
            deathLevel: Number(currentLevel)
          }
          
          this.deathNoteModalSubject.next(true)
          break;
        case '6.2':
            updatedData.hasEscaped = true
            this.router.navigate(['/list'])
        break;
          
      default:
        return Promise.resolve(); 
    }
  
    return this.playerCharactersService.updateCharacter(userId, characterId, updatedData);
  }

  listenToCharacter(userId: string, characterId: string) {
    this.playerCharactersService.listenToCharacter(userId, characterId, (character) => {
      this.setActiveCharacter(character);
    });
  }
  
  
 
  submitDeathNote(note: string, userId: string, characterId: string): Promise<void> {
  const character = this.activeCharacter;
  const graveyardEntry = {
    characterId,
    userId,
    characterName: character.name,
    deathLevel: character.currentLevel,
    note,
    timestamp: new Date().toISOString()
  };

  return this.graveyardService.addEntry(graveyardEntry).then(() => {
    this.deathNoteModalSubject.next(false);
    this.pendingDeathNote = '';
  });
}

}



 