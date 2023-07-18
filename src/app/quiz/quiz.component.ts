import { Component } from '@angular/core';
import { Quiz } from './quiz.model';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  selectedQuiz: Quiz | undefined;


constructor(private quizs: QuizService) {}

ngOnInit(){
  this.quizs.selectedQuiz.subscribe(
    (quiz: Quiz) => {
    this.selectedQuiz = quiz;
  });
}
}
