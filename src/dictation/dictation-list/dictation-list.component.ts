import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DictationCreatorComponent } from '../dictation-creator/dictation-creator.component';
import { Dictation } from '../dictation.model';

export declare type Mode = 'edit' | 'print';

@Component({
  selector: 'app-dictation-list',
  templateUrl: './dictation-list.component.html',
  styleUrl: './dictation-list.component.scss',
})
export class DictationListComponent {

  dictations: Dictation[] = [];
  mode: Mode = 'edit';

  public constructor(public dialog: MatDialog) {
    this.dictations.push({
      title: 'Test',
      content: '<p>Je suis une super <span class="selected-word">maitresse</span> et j\'ai un <span class="selected-word">b&eacute;b&eacute;</span> orgre dans le ventre. Il aime manger des nouilles et il me fait pleurer devant la télé. Dure dure la vie de Maman</p>',
    });

    this.dictations.push({
      title: 'Test 2',
      content: '<p>Je suis une super <span class="selected-word">maman</span> et j\'aime le <span class="selected-word">piment</span> d\'Espelette.</p>',
    });
  }

  edit(d: Dictation) {
    this.dialog.open(DictationCreatorComponent, {
      width: '90vw', // Set width to 60% of the viewport width
      maxWidth: '100vw',
      height: '90vh', // Set height to 55% of the viewport height
      data: d,
    });
  }

  add() {
    const ref = this.dialog.open(DictationCreatorComponent, {
      width: '90vw', // Set width to 60% of the viewport width
      maxWidth: '100vw',
      height: '90vh', // Set height to 55% of the viewport height
      data: {},
    });

    ref.afterClosed().subscribe(result => {
      if (result.data) {
        this.dictations.push(result.data);
      }
    });
  }

  delete(d: Dictation) {
    this.dictations = [...this.dictations.filter(dictation => dictation !== d)];
  }

  print() {
    this.mode = 'print';
  }

  backFromPrint() {
    this.mode = 'edit';
  }
}
