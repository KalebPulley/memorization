import { Component, EventEmitter, Output } from '@angular/core';
import { Quiz } from '../quiz.model';
import { Subscription } from 'rxjs';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent {
  @Output() selectedQuizEvent = new EventEmitter();

  quizs: Quiz[] = [];
  subscription: Subscription = new Subscription;
    
  constructor(private QuizSer: QuizService) {}

  ngOnInit(): void {
    this.quizs = this.QuizSer.getQuizs();
    this.subscription = this.QuizSer.quizListChangedEvent.subscribe(
      (quizs: Quiz[]) => {
        this.quizs = quizs;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

