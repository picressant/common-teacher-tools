import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DictationModule } from '../dictation/dictation.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

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
  providers: [
    provideAnimationsAsync()
  ],
})
export class AppModule {
}
