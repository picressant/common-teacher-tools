import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../environment/environment';
import { Dictation } from '../dictation.model';
import { SelectedWord } from './dictation.model';

@Component({
  selector: 'app-dictation-creator',
  templateUrl: './dictation-creator.component.html',
  styleUrl: './dictation-creator.component.scss',
})
export class DictationCreatorComponent implements OnInit {

  // @Input()
  // dictation: Dictation | undefined;

  @Output()
  save = new EventEmitter<Dictation>();

  currentDictation: string = '';
  title: string = '';
  apiKey = environment.tinyApiKey;

  configuration: any;

  @ViewChild('tinymce')
  tinymce: any;

  @ViewChild('preview')
  preview: ElementRef | undefined;

  words: string[] = [];


  constructor(
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<DictationCreatorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dictation
  ) {
    const that = this;
    this.configuration = {
      height: '100%',
      plugins: [],
      content_style: 'span.selected-word { background-color: yellow; }',
      style_formats: [
        {title: 'selected-words', selector: 'span', classes: 'selected-word'},
      ],
      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | extractWord',
      setup: function (editor: any) {
        //const action = that.words.push(editor.selection.getContent().split(' ').pop());

        editor.ui.registry.addButton('extractWord', {
          icon: 'browse',
          tooltip: 'Browse Document Repository',
          onAction: function () {
            const selectedContent = editor.selection.getContent();
            const word = that.extractWord(selectedContent);
            if (word) {
              that.toggleWord(word);
            }
            that.words = that.extractCurrentSelectedWords(editor.getContent());
            that.currentDictation = editor.getContent();
            that.cdr.detectChanges();
          },
        });
      },
    };
  }


  ngOnInit(): void {
    if (this.data) {
      this.currentDictation = this.data.content;
      this.title = this.data.title;
      this.words = this.extractCurrentSelectedWords(this.currentDictation);
    }
  }

  onEditorChange($event: any) {
    const content = $event.event.target.getContent();
    this.words = this.extractCurrentSelectedWords(content);
    this.currentDictation = content;
  }

  extractCurrentSelectedWords(content: string) {
    if (content && content !== '') {
      const selectedWords = content.match(/<span class="selected-word">(.+?)<\/span>/g);
      if (selectedWords) {
        const words = selectedWords.map(word => word.replace(/<span class="selected-word">(.+?)<\/span>/, '$1'));
        return [...new Set(words)];
      }
    }
    return [];
  }

  extractWord(content: string): SelectedWord | undefined {
    const matches = content.match(/(\s*)(\S.+\S)(\s*)/);
    if (matches) {
      let word = matches[2];
      if (word.includes('<span class="selected-word">')) {
        word = word.replace(/<span class="selected-word">(.+?)<\/span>/, '$1');
      }
      return {
        prefix: matches[1],
        suffix: matches[3],
        word: word,
      };
    }
    return undefined;
  }

  toggleWord(word: SelectedWord) {
    const content = this.tinymce.editor.getContent();
    const selectedWord = word.prefix + '<span class="selected-word">' + word.word + '</span>' + word.suffix;
    const rebuiltWord = word.prefix + word.word + word.suffix;
    if (content.includes(selectedWord)) {
      this.tinymce.editor.setContent(content.replaceAll(selectedWord, rebuiltWord));
    } else {
      this.tinymce.editor.setContent(content.replaceAll(rebuiltWord, selectedWord));
    }
  }

  export() {
    const dictation: Dictation = {
      title: this.title,
      content: this.currentDictation,
    };

    this.dialogRef.close({event: 'close', data: dictation});
  }
}
