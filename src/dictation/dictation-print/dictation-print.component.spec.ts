import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictationPrintComponent } from './dictation-print.component';

describe('DictationPrintComponent', () => {
  let component: DictationPrintComponent;
  let fixture: ComponentFixture<DictationPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictationPrintComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DictationPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
