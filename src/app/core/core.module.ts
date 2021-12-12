import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IntroComponent } from './containers/intro.component';
import { QuestionsComponent } from './containers/questions.component';
import { ResultComponent } from './containers/result.component';

@NgModule({
  declarations: [QuestionsComponent, IntroComponent, ResultComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        component: QuestionsComponent,
      },
    ]),
  ],
})
export class CoreModule {}
