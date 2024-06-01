import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { EditorModule } from '@tinymce/tinymce-angular';

import { DictationComponent } from './dictation.component';

describe('DictationComponent', () => {
  let component: DictationComponent;
  let fixture: ComponentFixture<DictationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DictationComponent],
      imports: [EditorModule, MatListModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DictationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('extractWord', () => {
    it('should extract word wth space', () => {
      const content = 'Hello World';
      const result = component.extractWord(content);
      expect(result).toEqual({prefix: '', suffix: '', word: 'Hello World'});
    });
    it('should extract word wth space, suffix prefix', () => {
      const content = '  Hello World ';
      const result = component.extractWord(content);
      expect(result).toEqual({prefix: '  ', suffix: ' ', word: 'Hello World'});
    });

    it('should extract word wth prefix and suffix', () => {
      const content = '  Hello ';
      const result = component.extractWord(content);
      expect(result).toEqual({prefix: '  ', suffix: ' ', word: 'Hello'});
    });

    it('should extract word wth prefix', () => {
      const content = '  Hello';
      const result = component.extractWord(content);
      expect(result).toEqual({prefix: '  ', suffix: '', word: 'Hello'});
    });

    it('should extract word wth suffix', () => {
      const content = 'Hello  ';
      const result = component.extractWord(content);
      expect(result).toEqual({prefix: '', suffix: '  ', word: 'Hello'});
    });

    it('should extract word wth span selected', () => {
      const content = ' <span class="selected-word">World</span> ';
      const result = component.extractWord(content);
      expect(result).toEqual({prefix: ' ', suffix: ' ', word: 'World'});
    });

    it('should extract word wth no data', () => {
      const content = '  ';
      const result = component.extractWord(content);
      expect(result).toBeUndefined();
    });
  });

  describe('toggleWord', () => {
    it('should toggle and select word', () => {
      const content = ' Hello World ';
      component.tinymce = {
        editor: {
          getContent: () => content, setContent: () => {
          },
        },
      };
      const spy = spyOn(component.tinymce.editor, 'setContent');
      component.toggleWord({prefix: ' ', suffix: ' ', word: 'Hello World'});
      expect(spy).toHaveBeenCalledWith(' <span class="selected-word">Hello World</span> ');
    });

    it('should toggle and select word in phrase', () => {
      const content = ' Hello World, this is a test ';
      component.tinymce = {
        editor: {
          getContent: () => content, setContent: () => {
          },
        },
      };
      const spy = spyOn(component.tinymce.editor, 'setContent');
      component.toggleWord({prefix: ' ', suffix: '', word: 'World'});
      expect(spy).toHaveBeenCalledWith(' Hello <span class="selected-word">World</span>, this is a test ');
    });

    it('should toggle and unselect select word in phrase', () => {
      const content = ' Hello <span class="selected-word">World</span>, this is a test ';
      component.tinymce = {
        editor: {
          getContent: () => content, setContent: () => {
          },
        },
      };
      const spy = spyOn(component.tinymce.editor, 'setContent');
      component.toggleWord({prefix: ' ', suffix: '', word: 'World'});
      expect(spy).toHaveBeenCalledWith(' Hello World, this is a test ');
    });

    it('should toggle and unselect select word in phrase with already word selected', () => {
      const content = ' Hello <span class="selected-word">World</span> <span class="selected-word">World</span>, this is a <span class="selected-word">test</span> ';
      component.tinymce = {
        editor: {
          getContent: () => content, setContent: () => {
          },
        },
      };
      const spy = spyOn(component.tinymce.editor, 'setContent');
      component.toggleWord({prefix: ' ', suffix: '', word: 'World'});
      expect(spy).toHaveBeenCalledWith(' Hello World World, this is a <span class="selected-word">test</span> ');
    });
  });


});
