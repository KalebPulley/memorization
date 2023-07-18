import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from './note.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private notes: Note[] = [];
  private notesUpdated = new Subject<Note[]>();
  noteListChangedEvent = new Subject<Note[]>();
  noteChangedEvent = new EventEmitter<Note[]>;
  selectedNote = new EventEmitter<Note>();

  constructor(private http: HttpClient) {}

  private url = "http://localhost:3000/api/notes";

  getNotes(){
    this.http
    .get<{message: string, notes: any}>(this.url)
    .pipe(map((noteData) => {
      return noteData.notes.map((note: { title: any; content: any; _id: any; }) => {
        return {
          title: note.title,
          content: note.content,
          id: note._id
        }
      });
    }))
    .subscribe(noteData => {
      this.notes = noteData;
      this.notesUpdated.next([...this.notes])
      this.notes.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      })
      this.noteListChangedEvent.next(this.notes.slice());
    });
    return this.notes.slice();
  }

  getNote(id: string): Note {
    let theNote: Note = this.notes.find((n) => n.id === id);   
    return theNote;
  }

  getNoteUpdateListener(){
    return this.notesUpdated.asObservable();
  }

  addNote( title: string, content: string, id: string = null){
    const note: any = { id: id, title: title, content: content };
    this.http
    .post<{ message: string, noteId: string }>("http://localhost:3000/api/notes", note)
    .subscribe(responseData =>{
      const id = responseData.noteId;
      note.id = id;
      this.notes.push(note);
      this.notesUpdated.next([...this.notes]);
      this.getNotes();
    });
  }

  deleteNote(noteId: string){
    this.http.delete("http://localhost:3000/api/notes/" + noteId)
    .subscribe(() => {
      const updatedNotes = this.notes.filter(note => note.id !== noteId);
      this.notes = updatedNotes;
      this.notesUpdated.next([...this.notes]);
    });
    this.getNotes();
  }
  
  updateNote(originalNote: Note, newNote: Note) {
    const note: any = { id: originalNote.id, title: newNote.title, content: newNote.content };
    this.addNote(newNote.title, newNote.content);
    this.deleteNote(originalNote.id);
  }
  
  getMaxId():any {
    let maxId = 0;
    this.notes.forEach(n => {
      if (+n.id > maxId) maxId = +n.id
    });
    return maxId;
  }
}
