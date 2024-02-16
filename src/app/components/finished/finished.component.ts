import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-finished',
  standalone: true,
  imports: [],
  templateUrl: './finished.component.html',
  styleUrl: './finished.component.css'
})
export class FinishedComponent {

  @Input() answerSelected: string = "";

  constructor() { }

}
