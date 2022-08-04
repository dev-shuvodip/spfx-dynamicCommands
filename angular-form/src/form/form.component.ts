import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-custom',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() metadata!: string

  constructor() { }

  ngOnInit(): void {
    console.log(JSON.parse(this.metadata))
  }
}
