import { Component } from '@angular/core';
import { Quiz } from '../quiz.model';
import { QuizService } from '../quiz.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WinRefService } from 'src/app/win-ref.service';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css']
})
export class QuizDetailComponent {
  quiz: Quiz;
  nativeWindow: any;

  constructor(
      private quizService: QuizService
    , private router: Router
    , private route: ActivatedRoute
    , private winRef: WinRefService){ }

  ngOnInit(): void {
    this.nativeWindow = this.winRef.getNativeWindow();

  this.route.params.subscribe((params: Params) => {
    this.quiz = this.quizService.getQuiz(params['id']);
  });
}

onDelete() {
  this.quizService.deleteQuiz(this.quiz.id);
  this.router.navigate(['../'], { relativeTo: this.route });
}

}
