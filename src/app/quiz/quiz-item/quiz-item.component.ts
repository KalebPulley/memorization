import { Component, Input } from '@angular/core';
import { Quiz } from '../quiz.model';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.css']
})
export class QuizItemComponent {
  constructor(){}

  @Input()
  quiz!: Quiz;
}
