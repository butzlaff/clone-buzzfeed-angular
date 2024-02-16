import { Component, OnInit, signal } from '@angular/core';
import { z } from 'zod';
import questionsJson from 'src/assets/data/quizz_questions.json'
import { FinishedComponent } from '../finished/finished.component';
import { TitleComponent } from '../title/title.component';

const optionsSchema = z.object({
  id: z.number(),
  name: z.string(),
  alias: z.string()
})

const questionsSchema = z.object({
  id: z.number(),
  question: z.string(),
  options: z.array(optionsSchema)
});

type Questions = z.infer<typeof questionsSchema>
type Options = z.infer<typeof optionsSchema>

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [FinishedComponent, TitleComponent],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit{
  protected title = signal("");

  protected questions: Questions[] = [] 
  protected questionSelected: Questions = {
    id: 0,
    question: "",
    options: []
  };

  protected answers: string[] = [];
  protected answerSelected = signal("");

  protected finished = signal(false);

  protected questionIndex = 0;
  protected questionMaxIndex = 0;

  protected options: Options[] = [];

  constructor() { }

  ngOnInit() {
    if (questionsJson) {
      this.title.set(questionsJson.title);
      this.questions = questionsJson.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.options = this.questionSelected.options;
      this.questionMaxIndex = this.questions.length - 1;
    }
  }

  calculateResult() {
    const answerCounts = {A: 0, B: 0};
    for (let i = 0; i < this.answers.length; i++) {
      const currentAnswer = this.answers[i];
      
      if (currentAnswer === "A") {
        answerCounts.A++;
      } else {
        answerCounts.B++;
      }
    }
    if (answerCounts.A > answerCounts.B) {
      this.answerSelected.set(questionsJson.results.A);
    } else {
      this.answerSelected.set(questionsJson.results.B);
    }
  }
  // Add the methods to handle the click event
  nextQuestion() {
    if (this.questionIndex < this.questionMaxIndex) {
      this.questionIndex++;

      this.questionSelected = this.questions[this.questionIndex];

      this.options = this.questionSelected.options;

      this.questionMaxIndex;
    }
    else {
      this.finished.update(current => !current);
      this.calculateResult();
    }
  }

  handleClick(alias: string) {
    this.answers.push(alias);
    this.nextQuestion();
  }
}
