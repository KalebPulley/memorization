import { Component, Input } from '@angular/core';
import { Note } from '../note.model';

@Component({
  selector: 'app-note',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent {
  constructor(){}

  @Input()
  note!: Note;
}
