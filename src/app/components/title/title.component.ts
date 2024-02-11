import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent implements OnInit{
  @Input() title: string = ""

  ngOnInit(): void {
      
  }
}
