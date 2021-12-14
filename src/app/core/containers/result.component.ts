import { Component, OnInit } from '@angular/core';
import BigNumber from 'bignumber.js';
import { map, pluck, shareReplay } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
enum Severity {
  '정상',
  '주의',
  '경고',
}
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  constructor(private service: ApiService) {}

  private getSeverity(probability: number): Severity {
    const bn = new BigNumber(probability);
    if (bn.gte(0.2)) {
      return Severity.경고;
    } else if (bn.gte(0.05)) {
      return Severity.주의;
    }
    return Severity.정상;
  }

  private result$ = this.service.getResult().pipe(shareReplay(1));
  asis$ = this.result$.pipe(
    pluck('asis'),
    map((prob) => ({
      probability: prob,
      severity: this.getSeverity(prob),
    }))
  );
  in10yrs$ = this.result$.pipe(
    pluck('in10yrs'),
    map((prob) => ({
      probability: prob,
      severity: this.getSeverity(prob),
    }))
  );
  in20yrs$ = this.result$.pipe(
    pluck('in20yrs'),
    map((prob) => ({
      probability: prob,
      severity: this.getSeverity(prob),
    }))
  );
  minus10Kilos$ = this.result$.pipe(
    pluck('minus10Kilos'),
    map((prob) => ({
      probability: prob,
      severity: this.getSeverity(prob),
    }))
  );
  minus20Kilos$ = this.result$.pipe(
    pluck('minus20Kilos'),
    map((prob) => ({
      probability: prob,
      severity: this.getSeverity(prob),
    }))
  );

  ngOnInit() {}
}
