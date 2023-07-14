import { Injectable } from '@angular/core';
import { NoteModel } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: NoteModel[] = [];

  constructor() { }

  getNote(): NoteModel {
    return {id: '1'
      , subject: 'randSubject'
      , noteText: 'random message'}
  }
  getNotes(): NoteModel[] {
    return [
      {id: '1'
      , subject: 'randSubject'
      , noteText: 'random message'}
      ,{id: '2'
      , subject: 'randSubject2'
      , noteText: 'random message two'}
      ,{id: '3'
      , subject: 'randSubject3'
      , noteText: 'random message three'}
    ]
  }
  addNotes(note: NoteModel){

  }
  getMaxId():any {
    let maxId = 0;
    this.notes.forEach(n => {
      if (+n.id > maxId) maxId = +n.id
    });
    return maxId;
  }
}
