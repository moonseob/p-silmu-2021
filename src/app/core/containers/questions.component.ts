import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import BigNumber from 'bignumber.js';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  constructor(private fb: FormBuilder, private service: ApiService) {}

  private group = {
    gender: [0],
    age: [''],
    hypertension: [0],
    heartDisease: [0],
    married: [0],
    work: [0],
    liveIn: [0],
    height: [''],
    weight: [''],
    smoking: [0],
  };

  public formGroup = this.fb.group(this.group);
  public steps: string[] = [
    'gender',
    'height',
    'weight',
    'age',
    'liveIn',
    'smoking',
    'married',
    'work',
    'hypertension',
    'heartDisease',
  ];
  public currentStep = 0;

  result$: Observable<string> | undefined;
  submit() {
    const { value, invalid } = this.formGroup;
    const bmi = new BigNumber(+value.weight)
      .div(new BigNumber(+value.height).div(100).pow(2))
      .dp(2)
      .toNumber();
    console.log('bmi: ', bmi);
    const body = {
      ...value,
      age: +value.age,
      bmi,
    };
    this.result$ = this.service.getResult(body);
  }

  ngOnInit(): void {
    console.log(this.formGroup);
  }
}
