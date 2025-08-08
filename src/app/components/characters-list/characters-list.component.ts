import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { PlayerCharactersService } from '../../services/player-characters.service';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.css'
})
export class CharactersListComponent {
  characters: any[] = []
  
  constructor(
    private authService: AuthService, 
    private playerCharacterService: PlayerCharactersService, 
    private gameService: GameService,
    private router: Router) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    
    if (userId) {
      this.playerCharacterService.getCharacters(userId, (characters) => {
       
        this.characters = characters;
      });
    }
  }
  
  deleteCharacter(characterId: string){
    const userId = this.authService.getUserId()
    if(userId){
      this.playerCharacterService.deleteCharacter(userId, characterId)
      .then(()=>{
        this.characters.filter(char=>char.id !== characterId)
        
      })
      .catch(error=>console.error(error))
    }
  }

  enterWorld(character: any) {
    this.gameService.setActiveCharacter(character);
    this.router.navigate(['/game'])
  }

}
