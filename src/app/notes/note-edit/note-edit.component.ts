import { Component } from '@angular/core';
import { NotesService } from '../notes.service';
import { NgForm } from '@angular/forms';
import { Note } from '../note.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent {

  onSubmit(form: NgForm) {
    let value = form.value;
    let newNote = new Note(
      null,
      value.title,
      value.content,
    );
    if (this.editMode) {
      this.noteService.updateNote(this.originalNote, newNote);
    } else {
      this.noteService.addNote(newNote.title, newNote.content);
    }
    this.onCancel();
  }

constructor(
  private noteService: NotesService,
  private router: Router,
  private route: ActivatedRoute
) {}

  originalNote: Note;
  note: Note;
  editMode: boolean = false;




  ngOnInit(): void {
    console.log("first");
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }
      
      this.originalNote = this.noteService.getNote(id);
      console.log("first");
      if (
        this.originalNote === undefined ||
        this.originalNote === null
      ) {
        return;
      }
      this.editMode = true;
      this.note = JSON.parse(JSON.stringify(this.originalNote));
    });
  };
 
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
