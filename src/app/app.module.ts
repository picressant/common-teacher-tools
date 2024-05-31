import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DictationModule } from '../dictation/dictation.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    DictationModule,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
