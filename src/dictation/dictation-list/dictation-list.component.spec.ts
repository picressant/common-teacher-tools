import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictationListComponent } from './dictation-list.component';

describe('DictationListComponent', () => {
  let component: DictationListComponent;
  let fixture: ComponentFixture<DictationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DictationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
