import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css'
})
export class GameViewComponent implements OnInit {
  levelData: any;
  currentLineIndex = 0;
  currentLine!: string;
  filteredChoices: string[] = [];
  showDeathNoteModal = false
  deathNoteText = ''
  showInventoryModal = false;
  character: any;
  statKeys: string[] = [];
  backgroundUrl = ''
  portraitUrl = ''

  constructor(private gameService: GameService, private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.levelData = this.gameService.getCurrentLevelData();
    this.currentLineIndex = 0;
    this.currentLine = this.levelData.dialog[0];
    this.filterChoices()
    this.character = this.gameService.getActiveCharacter();
    this.updateBackground()
    this.gameService.deathNoteModal$.subscribe(show => {
      console.log('Modal visibility changed: ', show)
      this.showDeathNoteModal = show;
    })
  }
  normalizeGender(gender?: string): 'male' | 'female' {
    return (gender ?? '').toLowerCase().startsWith('f') ? 'female' : 'male';    
  }
  buildHeadFilename(gender?: string, head?: string): string {
    const g = this.normalizeGender(gender);
    const n = head === '2' ? 2 : 1;
    return `${g}Head${n}.png`;  
  }
  updatePortrait() {
    const c = this.gameService.getActiveCharacter();
    const filename = this.buildHeadFilename(c?.gender, c?.head);
    this.portraitUrl = `/assets/data/${filename}`;
    console.log('portraitUrl:', this.portraitUrl);
  }
  updateBackground() {
    const levelNumber: number = this.gameService.getActiveCharacter()?.currentLevel ?? 1;
    const index = Math.floor(levelNumber);
    const clamped = Math.min(Math.max(index, 1), 6);
    this.backgroundUrl = `url('/assets/data/background_${clamped}.png')`;
    
  }
  
  toggleInventory() {
    this.showInventoryModal = !this.showInventoryModal;
    console.log('Modal')
    if (this.showInventoryModal) {
      this.character = this.gameService.getActiveCharacter();
      this.statKeys = Object.keys(this.character?.stats || {});
    }
  }

  makeChoice(choice: string) {
    const userId = this.authService.getUserId();
    if (!userId) {
      console.error('User ID is null. Cannot proceed.');
      return;
    }
    
    const characterId = this.gameService.getActiveCharacter().id;
  
    this.gameService.makeChoice(choice, userId, characterId).then(() => {
      
      this.gameService.playerCharactersService.getCharacterById(userId, characterId)
        .then(character => {
          this.gameService.setActiveCharacter(character); 
          this.levelData = this.gameService.getCurrentLevelData();
          this.currentLineIndex = 0;
          this.currentLine = this.levelData.dialog[0];
          this.filterChoices();
          this.updateBackground()
        })
        .catch(err => {
          console.error('Failed to reload character:', err);
        });
    });
  }
  


  advanceDialog() {
    const nextIndex = this.currentLineIndex + 1;
    if (nextIndex < this.levelData.dialog.length) {
      this.currentLineIndex = nextIndex;
      this.currentLine = this.levelData.dialog[nextIndex];
      if(this.allDialogShown()){
        this.filterChoices()
      }
    }
  }


  allDialogShown(): boolean {
    return this.currentLineIndex >= this.levelData.dialog.length - 1;
  }

  filterChoices() {
    const character = this.gameService.getActiveCharacter();
    const intellect = character?.stats.intellect ?? 0;
    const inventory = character?.inventory ?? [];
  
    console.log('Character intellect:', intellect); 
    console.log('Inventory:', inventory);
    console.log('Raw choices:', this.levelData.choices);
  
    this.filteredChoices = this.levelData.choices.filter((choice: string) => {
      if (choice === "Investigate the charred remains instead") {
        return intellect >= 2;
      }
  
      if (choice === "Use the rope to climb") {
        return inventory.includes("rope");
      }
      
  
      return true;
    });
  
    console.log('Filtered choices:', this.filteredChoices);
  }
  exitToList() {
  this.router.navigate(['/list']);
  }
  

  submitDeathNote() {
    const userId = this.authService.getUserId();
    const characterId = this.gameService.getActiveCharacter().id;
    if (!userId) {
      console.error('User ID is null. Cannot proceed.');
      return;
    }
    if (!this.deathNoteText.trim()) {
      console.warn('Death note is empty.');
      return;
    }
  
    this.gameService.submitDeathNote(this.deathNoteText, userId, characterId)
      .then(() => {
        this.deathNoteText = '';
        this.showDeathNoteModal = false;
        console.log('Death note submitted.');
        setTimeout(() => {
          this.router.navigate(['/list']);
        }, 500)
      })
      .catch(err => {
        console.error('Failed to submit death note:', err);
      });
  }


}
