import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from './note.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private notes: Note[] = [];
  private notesUpdated = new Subject<Note[]>();

  constructor(private http: HttpClient) {}

  getNotes(){
    this.http
    .get<{message: string, notes: any}>(
      "http://localhost:3000/api/notes"
    )
    .pipe(map((noteData) => {
      return noteData.notes.map((note: { title: any; content: any; _id: any; }) => {
        return {
          title: note.title,
          content: note.content,
          id: note._id
        }
      })
    }))
    .subscribe(noteData => {
      this.notes = noteData.notes;
      this.notesUpdated.next([...this.notes])
    });
  }

  getNoteUpdateListener(){
    return this.notesUpdated.asObservable();
  }


  addNote( title: string, content: string){
    const note: any = { id: null, title: title, content: content };
    this.http
    .post<{ message: string, noteId: string }>("http://localhost:3000/api/notes", note)
    .subscribe(responseData =>{
      const id = responseData.noteId;
      note.id = id;
      this.notes.push(note);
      this.notesUpdated.next([...this.notes]);
    });

  }

  deleteNote(noteId: string){
    this.http.delete("" + noteId)
    .subscribe(() => {
      const updatedNotes = this.notes.filter(note => note.id !== noteId);
      this.notes = updatedNotes;
      this.notesUpdated.next([...this.notes]);
    });
  }

  getMaxId():any {
    let maxId = 0;
    this.notes.forEach(n => {
      if (+n.id > maxId) maxId = +n.id
    });
    return maxId;
  }
}
