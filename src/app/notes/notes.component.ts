import { Component } from '@angular/core';
import { Note } from './note.model';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  selectedNote: Note | undefined;


constructor(private notes: NotesService) {}

ngOnInit(){
  this.notes.selectedNote.subscribe(
    (note: Note) => {
    this.selectedNote = note;
  });
}
}
