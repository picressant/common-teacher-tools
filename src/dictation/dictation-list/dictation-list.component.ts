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
    localStorage.getItem('dictations') ? this.dictations = JSON.parse(localStorage.getItem('dictations') || '[]') : [];
  }

  edit(d: Dictation) {
    const ref = this.dialog.open(DictationCreatorComponent, {
      width: '90vw', // Set width to 60% of the viewport width
      maxWidth: '100vw',
      height: '90vh', // Set height to 55% of the viewport height
      data: d,
    });

    ref.afterClosed().subscribe(result => {
      if (result.data) {
        d.title = result.data.title;
        d.content = result.data.content;
      }

      this.saveToLocalStorage();
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

      this.saveToLocalStorage();
    });
  }

  delete(d: Dictation) {
    this.dictations = [...this.dictations.filter(dictation => dictation !== d)];
    this.saveToLocalStorage()
  }

  print() {
    this.mode = 'print';
  }

  backFromPrint() {
    this.mode = 'edit';
  }

  private saveToLocalStorage() {
    localStorage.setItem('dictations', JSON.stringify(this.dictations));
  }
}
