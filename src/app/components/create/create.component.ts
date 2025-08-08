import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { PlayerCharactersService } from '../../services/player-characters.service';
import { Router } from '@angular/router';

import {ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { generate } from 'rxjs';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  characterForm: FormGroup
  availablePoints = 1
  router = inject(Router)
  constructor(private fb: FormBuilder, private authService: AuthService, private playerCharacterService: PlayerCharactersService){
    this.characterForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      head: ['1'],
      body: ['1'],
      stats: this.fb.group({
        strength: [1],
        stamina: [1],
        agility: [1],
        intellect: [1]
      })
    }, { validators: this.statPointsValidator.bind(this) })
  }
  increaseStat(stat: string){
    if(this.availablePoints > 0){
      const statsGroup = this.characterForm.get('stats') as FormGroup
      const currentValue = statsGroup.get(stat)?.value || 0
      statsGroup.get(stat)?.setValue(currentValue + 1)
      this.availablePoints--
      this.characterForm.updateValueAndValidity()
    }
  }
  decreaseStat(stat: string){
    const statsGroup = this.characterForm.get('stats') as FormGroup
    const currentValue = statsGroup.get(stat)?.value || 0
    if(currentValue > 1){
      statsGroup.get(stat)?.setValue(currentValue - 1)
      this.availablePoints++
      this.characterForm.updateValueAndValidity()
    }
  }
  statPointsValidator(form: FormGroup) {
    return this.availablePoints === 0 ? null : { statPointsRemaining: true };
  }
  
  createCharacter(){
    if(this.characterForm.valid){
      const userId = this.authService.getUserId()
      if(userId){
        this.playerCharacterService.createCharacter(userId, this.characterForm.value)
        .then(()=>this.router.navigateByUrl('/list'))
        
        .catch(error=>console.error('Error creating: ',error))
      } else {
        console.log('Invalid form')
      }
    }
    
  }
}
