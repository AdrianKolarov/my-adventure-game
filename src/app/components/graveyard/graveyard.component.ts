import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { GraveyardService } from '../../services/graveyard.service';

@Component({
  selector: 'app-graveyard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './graveyard.component.html',
  styleUrl: './graveyard.component.css'
})
export class GraveyardComponent implements OnInit {
  graveyardEntries: any[] = []
  currentUserId: string | null = null
  editingEntryId: string | null = null
  editedNote = ''
  constructor(private authService: AuthService, private graveyardService: GraveyardService){}
  ngOnInit() {
    this.currentUserId = this.authService.getUserId()
    this.graveyardService.getAllEntries().then(snapshot => {
      this.graveyardEntries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      console.log('Current User ID:', this.authService.getUserId())
    });
  }
  isEditing(id:string){
    return this.editingEntryId === id
  }
  startEditing(id: string, note: string){
    this.editingEntryId = id
    this.editedNote = note
  }
  saveNote(id: string) {
    this.graveyardService.updateNote(id, this.editedNote).then(() => {
      const entry = this.graveyardEntries.find(e => e.id === id);
      if (entry) entry.note = this.editedNote;
      this.editingEntryId = null;
      this.editedNote = '';
    });
  }

}
