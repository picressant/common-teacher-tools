import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DictationComponent } from './dictation.component';

@NgModule({
  declarations: [
    DictationComponent,
  ],
  imports: [
    CommonModule,
    EditorModule,
    MatListModule,
    MatChipsModule
  ],
  exports: [DictationComponent],
})
export class DictationModule {
}
