import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dictation',
  templateUrl: './dictation.component.html',
  styleUrl: './dictation.component.scss',
})
export class DictationComponent implements OnInit {

  configuration: any;

  @ViewChild('tinymce')
  tinymce: any;

  words: string[] = [];

  constructor(
    private cdr: ChangeDetectorRef
  ) {
    const that = this;
    this.configuration = {
      plugins: [],
      content_style: 'span.selected-word { background-color: yellow; }',
      style_formats: [
        {title: 'selected-words', selector: 'span', classes: 'selected-word'}
      ],
      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | extractWord',
      setup: function (editor: any) {
        //const action = that.words.push(editor.selection.getContent().split(' ').pop());

        editor.ui.registry.addButton('extractWord', {
          icon: 'browse',
          tooltip: 'Browse Document Repository',
          onAction: function() {
            const selectedWord = editor.selection.getContent();
            // alert('Extracting ' + selectedWord);
            editor.selection.setContent('<span class="selected-word">' + selectedWord + '</span>');
            that.words = that.extractCurrentSelectedWords(editor.getContent());
            that.cdr.detectChanges();
          }
        });
      }
    };


  }

  ngOnInit(): void {

  }

  onEditorChange($event: any) {
    const content = $event.event.target.getContent();
    this.words = this.extractCurrentSelectedWords(content);
  }

  extractCurrentSelectedWords(content: string) {
    const selectedWords = content.match(/<span class="selected-word">(.+?)<\/span>/g);
    if (selectedWords) {
      return selectedWords.map(word => word.replace(/<span class="selected-word">(.+?)<\/span>/, '$1'));
    }
    return [];
  }
}
