import { NgIf, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { z } from 'zod';
import questionsJson from 'src/assets/data/quizz_questions.json'


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

const questionSchema = z.object({
  title: z.string(),
  questions: z.array(questionsSchema),
  results: z.object({
    A: z.string(),
    B: z.string()
  })
});

type Question = z.infer<typeof questionSchema>
type Questions = z.infer<typeof questionsSchema>
type Options = z.infer<typeof optionsSchema>

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit{
  title: string = "";

  questions: Questions[] = [] 
  questionSelected: Questions = {
    id: 0,
    question: "",
    options: []
  };

  answers: string[] = [];
  answerSelected: string = "";

  finished: boolean = false;

  questionIndex = 0;
  questionMaxIndex = 0;

  options: Options[] = [];

  constructor() { }

  ngOnInit() {
    if (questionsJson) {
      this.title = questionsJson.title;
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
      this.answerSelected = questionsJson.results.A;
    } else {
      this.answerSelected = questionsJson.results.B;
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
      this.finished = true;
      this.calculateResult();
    }
  }

  handleClick(alias: string) {
    this.answers.push(alias);
    this.nextQuestion();
  }
}
