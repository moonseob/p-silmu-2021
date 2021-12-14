import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import BigNumber from 'bignumber.js';
import { BehaviorSubject, throwError } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FormBody, FormBodyBmi } from '../models/api.model';

/** 평균값 */
const mean = [
  0.408491, 42.219747, 0.093595, 0.047524, 0.356219, 0.832538, 0.498698,
  28.459043, 0.474982,
];
/** 표준편차 */
const std = [
  0.49156, 22.52075, 0.291268, 0.212758, 0.478887, 1.106369, 0.500004, 7.685942,
  0.742842,
];

export function getBmi(height: number, weight: number): number {
  return new BigNumber(weight)
    .div(new BigNumber(height).div(100).pow(2))
    .dp(2)
    .toNumber();
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {
    this.loadModel();
  }
  /** 모델 준비 */
  private model!: tf.LayersModel;
  private isModelReady$ = new BehaviorSubject<boolean>(false);
  private async loadModel() {
    this.model = await tf.loadLayersModel('./assets/model/model.json');
    // 준비 완료
    this.isModelReady$.next(true);
  }

  private body: FormBody | undefined;
  // private body: FormBody | undefined = {
  //   gender: 0,
  //   age: 30,
  //   hypertension: 1,
  //   heartDisease: 1,
  //   married: 0,
  //   work: 4,
  //   liveIn: 0,
  //   height: 170,
  //   weight: 70,
  //   smoking: 1,
  // };
  public setBody(body: FormBody) {
    this.body = body;
    return Promise.resolve();
  }

  private getPrepedData(
    body: FormBody,
    overrides?: { [key in keyof FormBodyBmi]?: any }
  ): number[] {
    const _body = {
      ...body,
      age: +body.age,
      bmi: getBmi(+body.height, +body.weight),
      ...overrides,
    };
    const asArray = [
      _body.gender,
      _body.age,
      _body.hypertension,
      _body.heartDisease,
      _body.married,
      _body.work,
      _body.liveIn,
      _body.bmi,
      _body.smoking,
    ];
    return asArray.map((value, index) =>
      new BigNumber(value)
        .minus(mean[index])
        .div(std[index])
        .dp(8, BigNumber.ROUND_FLOOR)
        .toNumber()
    );
  }

  private predict(input: number[]): number | -1 {
    const bn = new BigNumber(
      (this.model.predict(tf.tensor2d([input])) as tf.Tensor).dataSync()[0]
    );
    if (bn.isNaN()) {
      return -1;
    }
    return bn.toNumber();
  }

  getResult() {
    if (!this.body) {
      return throwError('body not found');
    }
    const asis = this.getPrepedData(this.body);
    const in10yrs = this.getPrepedData(this.body, {
      age: +this.body.age + 10,
    });
    const in20yrs = this.getPrepedData(this.body, {
      age: +this.body.age + 20,
    });
    const minus10Kilos = this.getPrepedData(this.body, {
      bmi: getBmi(+this.body.height, +this.body.weight - 10),
    });
    const minus20Kilos = this.getPrepedData(this.body, {
      bmi: getBmi(+this.body.height, +this.body.weight - 20),
    });
    return this.isModelReady$.pipe(
      filter((x) => x === true),
      map(() => ({
        asis: this.predict(asis),
        in10yrs: this.predict(in10yrs),
        in20yrs: this.predict(in20yrs),
        minus10Kilos: this.predict(minus10Kilos),
        minus20Kilos: this.predict(minus20Kilos),
      }))
    );
  }
}
