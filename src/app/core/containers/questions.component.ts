import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  constructor(private fb: FormBuilder, private service: ApiService) {}

  formGroup = this.fb.group({
    gender: [0],
    age: [''],
    hypertension: [0],
    heartDisease: [0],
    married: [0],
    work: [0],
    liveIn: [0],
    smoking: [0],
  });

  result$: Observable<string> | undefined;
  submit() {
    const { value, invalid } = this.formGroup;
    const body = {
      ...value,
      age: +value.age,
    };
    this.result$ = this.service.getResult(body);
  }

  ngOnInit(): void {}
}
