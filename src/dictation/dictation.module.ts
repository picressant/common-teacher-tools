import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DictationComponent } from './dictation.component';

@NgModule({
  declarations: [
    DictationComponent,
  ],
  imports: [
    CommonModule,
    EditorModule
  ],
  exports: [DictationComponent],
})
export class DictationModule {
}
