import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quiz } from './quiz.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizs: Quiz[] = [];
  private quizsUpdated = new Subject<Quiz[]>();
  quizListChangedEvent = new Subject<Quiz[]>();
  quizChangedEvent = new EventEmitter<Quiz[]>;
  selectedQuiz = new EventEmitter<Quiz>();

  constructor(private http: HttpClient) {}

  private url = "http://localhost:3000/api/quizs";

  getQuizs(){
    this.http
    .get<{message: string, quizs: any}>(this.url)
    .pipe(map((quizData) => {
      return quizData.quizs.map((quiz: { title: any; question: any; _id: any; answer: any; }) => {
        return {
          title: quiz.title,
          question: quiz.question,
          answer: quiz.answer,
          id: quiz._id
        }
      });
    }))
    .subscribe(quizData => {      
      this.quizs = quizData;
      this.quizsUpdated.next([...this.quizs])
       this.quizs.sort((a, b) => {
         if (a < b) return -1;
         if (a > b) return 1;
         return 0;
       })
      this.quizListChangedEvent.next(this.quizs.slice());
    });
    return  []// this.quizs.slice();
  }

  getQuiz(id: string): Quiz {
    let theQuiz: Quiz = this.quizs.find((n) => n.id === id);   
    return theQuiz;
  }

  getQuizUpdateListener(){
    return this.quizsUpdated.asObservable();
  }

  addQuiz( title: string, question: string, answer: string, id: string = null){
    const quiz: any = { id: id, title: title, question: question, answer: answer };
    this.http
    .post<{ message: string, quizId: string }>("http://localhost:3000/api/quizs", quiz)
    .subscribe(responseData =>{
      const id = responseData.quizId;
      quiz.id = id;
      this.quizs.push(quiz);
      this.quizsUpdated.next([...this.quizs]);
      this.getQuizs();
    });

  }

  deleteQuiz(quizId: string){
    this.http.delete("http://localhost:3000/api/quizs/" + quizId)
    .subscribe(() => {
      const updatedQuizs = this.quizs.filter(quiz => quiz.id !== quizId);
      this.quizs = updatedQuizs;
      this.quizsUpdated.next([...this.quizs]);
      this.getQuizs();
    });
  }
  
  updateQuiz(originalQuiz: Quiz, newQuiz: Quiz) {
    const quiz: any = { id: originalQuiz.id, title: newQuiz.title, question: newQuiz.question, answer: newQuiz.question };
    this.addQuiz(newQuiz.title, newQuiz.question, newQuiz.answer);
    this.deleteQuiz(originalQuiz.id);
  }
  
  getMaxId():any {
    let maxId = 0;
    this.quizs.forEach(n => {
      if (+n.id > maxId) maxId = +n.id
    });
    return maxId;
  }
}

