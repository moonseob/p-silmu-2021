import { Component, OnInit, ViewChild } from '@angular/core';
import SwiperCore, { EffectCreative, Navigation, Pagination } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
SwiperCore.use([Navigation, Pagination, EffectCreative]);

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss'],
})
export class TipsComponent implements OnInit {
  constructor() {}

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  assetSrcs = Array.from(Array(11).keys()).map((i) => {
    return `assets/images/tips/${(i + 1).toString().padStart(3, '0')}.png`;
  });

  prev() {
    this.swiper?.swiperRef.slidePrev();
  }
  next() {
    this.swiper?.swiperRef.slideNext();
  }

  ngOnInit(): void {}
}
