import { Component } from '@angular/core';
import { Quiz } from '../quiz.model';
import { QuizService } from '../quiz.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.css']
})
export class QuizEditComponent {
  onSubmit(form: NgForm) {
    let value = form.value;
    let newQuiz = new Quiz(
      null,
      value.title,
      value.question,
      value.answer
    );
    if (this.editMode) {
      this.quizService.updateQuiz(this.originalQuiz, newQuiz);
    } else {
      this.quizService.addQuiz(newQuiz.title, newQuiz.question, newQuiz.answer);
    }
    this.onCancel();
  }

constructor(
  private quizService: QuizService,
  private router: Router,
  private route: ActivatedRoute
) {}

  originalQuiz: Quiz;
  quiz: Quiz;
  editMode: boolean = false;




  ngOnInit(): void {
    console.log("first");
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }
      
      this.originalQuiz = this.quizService.getQuiz(id);
      console.log("first");
      if (
        this.originalQuiz === undefined ||
        this.originalQuiz === null
      ) {
        return;
      }
      this.editMode = true;
      this.quiz = JSON.parse(JSON.stringify(this.originalQuiz));
    });
  };
 
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
