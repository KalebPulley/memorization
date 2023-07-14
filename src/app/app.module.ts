import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';
import { QuizDetailComponent } from './quiz/quiz-detail/quiz-detail.component';
import { QuizEditComponent } from './quiz/quiz-edit/quiz-edit.component';
import { NotesComponent } from './notes/notes.component';
import { NoteComponent } from './notes/note/note.component';
import { TestsComponent } from './tests/tests.component';
import { TestListComponent } from './tests/test-list/test-list.component';
import { TestComponent } from './tests/test/test.component';
import { NoteEditComponent } from './notes/note-edit/note-edit.component';
import { NoteDetailComponent } from './notes/note-detail/note-detail.component';
import { NoteListComponent } from './notes/note-list/note-list.component';
import { TestTakeComponent } from './tests/test-take/test-take.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    QuizComponent,
    QuizEditComponent,
    QuizListComponent,
    QuizDetailComponent,
    TestComponent,
    NotesComponent,
    NoteEditComponent,
    NoteDetailComponent,
    NoteListComponent,
    NoteComponent,
    TestsComponent,
    TestListComponent,
    NoteEditComponent,
    NoteDetailComponent,
    NoteListComponent,
    TestTakeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
