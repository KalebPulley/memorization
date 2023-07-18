import { Component, EventEmitter, Output } from '@angular/core';
import { Note } from '../note.model';
import { Subscription } from 'rxjs';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent {
  @Output() selectedNoteEvent = new EventEmitter();

  notes: Note[] = [];
  subscription: Subscription = new Subscription;
    
  constructor(private NoteSer: NotesService) {}

  ngOnInit(): void {
    this.notes = this.NoteSer.getNotes();
    this.subscription = this.NoteSer.noteListChangedEvent.subscribe(
      (notes: Note[]) => {
        this.notes = notes;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
