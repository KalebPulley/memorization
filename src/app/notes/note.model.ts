export class NoteModel { 
  public id: string;
  public subject: string;
  public noteText: string;

  constructor(id: string, subject: string, noteText: string){
    this.id = id;
    this.subject = subject;
    this.noteText = noteText;
  }
}
