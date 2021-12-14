import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { interval, timer } from 'rxjs';
import { switchMapTo, takeWhile } from 'rxjs/operators';

@Directive({
  selector: '[textSeq]',
})
export class TextSeqDirective implements OnInit {
  constructor(private elref: ElementRef) {
    this.el = this.elref.nativeElement;
  }
  @Input() interval = 80; // ms
  @Input() delay = 0;
  @HostBinding('style.display') display?: string;
  el!: HTMLElement;
  prevDisplay: string = 'block';

  ngOnInit() {
    this.prevDisplay = this.display!;
    this.display = 'none';
    this.el.style.display = 'none';
    const text = Array.from(this.el.innerText.trim());
    this.el.innerText = '';
    this.display = this.prevDisplay;
    timer(this.delay)
      .pipe(
        switchMapTo(interval(this.interval)),
        takeWhile((idx) => idx < text.length)
      )
      .subscribe({
        next: (idx) => {
          this.el.innerHTML += text[idx];
        },
      });
  }
}
