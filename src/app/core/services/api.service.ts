import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import BigNumber from 'bignumber.js';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FormBody } from '../models/api.model';

/** 평균값 */
const mean = [
  0.408491, 42.219747, 0.093595, 0.047524, 0.356219, 0.832538, 0.498698,
  0.474982,
];
/** 표준편차 */
const std = [
  0.49156, 22.52075, 0.291268, 0.212758, 0.478887, 1.106369, 0.500004, 0.742842,
];

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

  /** predict */
  getResult(body: FormBody): Observable<string> {
    return this.isModelReady$.pipe(
      filter((x) => x === true),
      map(() => {
        // 데이터 전처리
        const input = [
          body.gender,
          body.age,
          body.hypertension,
          body.heartDisease,
          body.married,
          body.work,
          body.liveIn,
          body.smoking,
        ].map((value, index) =>
          new BigNumber(value)
            .minus(mean[index])
            .div(std[index])
            .dp(8, BigNumber.ROUND_FLOOR)
            .toNumber()
        );
        const result = this.model.predict(tf.tensor2d([input])) as tf.Tensor;
        return new BigNumber(result.dataSync()[0]).toString(10);
      })
    );
  }
}
