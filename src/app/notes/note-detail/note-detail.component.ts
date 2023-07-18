import { Component } from '@angular/core';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WinRefService } from 'src/app/win-ref.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent {
  note: Note;
  nativeWindow: any;

  constructor(
      private noteService: NotesService
    , private router: Router
    , private route: ActivatedRoute
    , private winRef: WinRefService){ }

  ngOnInit(): void {
    this.nativeWindow = this.winRef.getNativeWindow();

  this.route.params.subscribe((params: Params) => {
    this.note = this.noteService.getNote(params['id']);
  });
}

onDelete() {
  this.noteService.deleteNote(this.note.id);
  this.router.navigate(['../'], { relativeTo: this.route });
}

}

