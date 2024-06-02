import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DictationCreatorComponent } from './dictation-creator/dictation-creator.component';
import { DictationListComponent } from './dictation-list/dictation-list.component';
import { DictationPrintComponent } from './dictation-print/dictation-print.component';

@NgModule({
  declarations: [
    DictationCreatorComponent,
    DictationListComponent,
    DictationPrintComponent,
  ],
  imports: [
    CommonModule,
    EditorModule,
    MatListModule,
    MatChipsModule,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatInput,
    MatIcon,
    FormsModule,
    MatFormField,
    MatCardActions,
    MatFabButton,
    MatIconButton,
  ],
  exports: [
    DictationListComponent,
  ],
})
export class DictationModule {
}
