import { Component, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-finished',
  standalone: true,
  imports: [NgIf],
  templateUrl: './finished.component.html',
  styleUrl: './finished.component.css'
})
export class FinishedComponent implements OnInit {

  @Input() finished: boolean = false;
  @Input() answerSelected: string = "";
  constructor() { }
  ngOnInit() {
    console.log('FinishedComponent initialized');
  }
}
