import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, getBmi } from '../services/api.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent {
  constructor(
    private fb: FormBuilder,
    private service: ApiService,
    private router: Router
  ) {}

  private group = {
    gender: [null, Validators.required],
    age: [
      null,
      [Validators.required, Validators.pattern(/^\d{2,3}(\.\d{1,2})?$/)],
    ],
    hypertension: [null, Validators.required],
    heartDisease: [null, Validators.required],
    married: [null, Validators.required],
    work: [null, Validators.required],
    liveIn: [null, Validators.required],
    height: [
      null,
      [Validators.required, Validators.pattern(/^\d{2,3}(\.\d{1,2})?$/)],
    ],
    weight: [
      null,
      [Validators.required, Validators.pattern(/^\d{2,3}(\.\d{1,2})?$/)],
    ],
    smoking: [null, Validators.required],
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

  prev() {
    this.currentStep--;
  }
  next() {
    this.currentStep++;
  }
  submit() {
    const { value, invalid } = this.formGroup;
    this.service.setBody(value).then(() => {
      this.router.navigate(['/', 'result']);
    });
    const bmi = getBmi(+value.height, +value.weight);
    const body = {
      ...value,
      age: +value.age,
    };
  }
}
