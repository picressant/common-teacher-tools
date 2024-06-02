import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dictation } from '../dictation.model';

@Component({
  selector: 'app-dictation-print',
  templateUrl: './dictation-print.component.html',
  styleUrl: './dictation-print.component.scss',
})
export class DictationPrintComponent implements OnInit {
  @Input()
  dictations: Dictation[] = [];

  @Output()
  close = new EventEmitter<void>();

  size = 14;

  dictationsToPrint: { dictation: Dictation, selectedWords: string[], levelOneContent: string }[] = [];

  ngOnInit(): void {
    this.dictationsToPrint = this.dictations.map(dictation => {
      return {
        dictation,
        selectedWords: this.extractCurrentSelectedWords(dictation.content),
        levelOneContent: this.buildLevelOneContent(dictation.content),
      };
    });

    setTimeout(() => {
      window.print();
    }, 500);
  }

  buildLevelOneContent(content: string) {
    return content.replace(/<span class="selected-word">(.+?)<\/span>/g, '_____________');
  }

  extractCurrentSelectedWords(content: string) {
    const selectedWords = content.match(/<span class="selected-word">(.+?)<\/span>/g);
    if (selectedWords) {
      const words = selectedWords.map(word => word.replace(/<span class="selected-word">(.+?)<\/span>/, '$1'));
      const array = [...new Set(words)];
      this.shuffle(array);
      return array;
    }
    return [];
  }

  shuffle(array: any[]) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

  backFromPrint() {
    this.close.emit();
  }
}
