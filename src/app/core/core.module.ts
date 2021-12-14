import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { TipsComponent } from './components/tips.component';
import { IntroComponent } from './containers/intro.component';
import { QuestionsComponent } from './containers/questions.component';
import { ResultComponent } from './containers/result.component';
import { TextSeqDirective } from './services/text-seq.directive';

@NgModule({
  declarations: [
    QuestionsComponent,
    IntroComponent,
    ResultComponent,
    TextSeqDirective,
    TipsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        component: IntroComponent,
      },
      {
        path: 'begin',
        component: QuestionsComponent,
      },
      {
        path: 'result',
        component: ResultComponent,
      },
      {
        path: 'tips',
        component: TipsComponent,
      },
    ]),
  ],
})
export class CoreModule {}
