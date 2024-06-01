import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import jsPDF from 'jspdf';
import { SelectedWord } from './dictation.model';

@Component({
  selector: 'app-dictation',
  templateUrl: './dictation.component.html',
  styleUrl: './dictation.component.scss',
})
export class DictationComponent implements OnInit {

  configuration: any;

  @ViewChild('tinymce')
  tinymce: any;

  @ViewChild('preview')
  preview: ElementRef | undefined;

  words: string[] = [];
  currentDictation: string = '';

  constructor(
    private cdr: ChangeDetectorRef,
  ) {
    const that = this;
    this.configuration = {
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
    this.currentDictation = "<p>Dictate your text here</p>";
    this.words = ["toto"];
  }

  exportPdf() {


    // const specialElementHandlers = {
    //   '#editor': function (element, renderer) {
    //     return true;
    //   }
    // };

    const pdfTable = this.preview?.nativeElement;

    html2canvas(this.preview?.nativeElement).then(canvas => {
      //const doc = new jsPDF();
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      pdf.save('Filename.pdf');
      // doc.html(pdfTable.innerHTML, {
      //   callback(rst) {
      //     rst.save('dictation.pdf');
      //   },
      //   x: 10,
      //   y: 10
      // });
    });



    //doc.save('dictation.pdf');
  }

  onEditorChange($event: any) {
    const content = $event.event.target.getContent();
    this.words = this.extractCurrentSelectedWords(content);
    this.currentDictation = content;
  }

  extractCurrentSelectedWords(content: string) {
    const selectedWords = content.match(/<span class="selected-word">(.+?)<\/span>/g);
    if (selectedWords) {
      const words = selectedWords.map(word => word.replace(/<span class="selected-word">(.+?)<\/span>/, '$1'));
      return [...new Set(words)];
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
}
