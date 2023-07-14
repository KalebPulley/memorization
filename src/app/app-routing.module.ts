import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { QuizEditComponent } from './quiz/quiz-edit/quiz-edit.component';
import { NoteComponent } from './notes/note/note.component';
import { NoteEditComponent } from './notes/note-edit/note-edit.component';
import { NoteDetailComponent } from './notes/note-detail/note-detail.component';
import { QuizDetailComponent } from './quiz/quiz-detail/quiz-detail.component';
import { TestComponent } from './tests/test/test.component';
import { TestTakeComponent } from './tests/test-take/test-take.component';
import { TestListComponent } from './tests/test-list/test-list.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: 'quiz',
    component: QuizComponent,
    children: [
      {path: 'new', component: QuizEditComponent}
    , {path: 'id', component: QuizDetailComponent}
    , {path: 'id/edit', component: QuizEditComponent}
    ]

  },
  {
      path: 'note'
    , component: NoteComponent
    , children: [
        {path: 'new', component: NoteEditComponent}
      , {path: 'id', component: NoteDetailComponent}
      , {path: 'id/edit', component: NoteEditComponent}
    ]
  },
  {
    path: 'test', component: TestComponent,
    children: [
      {path: 'id', component: TestTakeComponent},
      {path: '', component: TestListComponent}
    ]
  },
  {path: '', component: HomeComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
