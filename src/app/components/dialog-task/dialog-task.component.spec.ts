import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTaskComponent } from './dialog-task.component';

describe('DialogTaskComponent', () => {
  let component: DialogTaskComponent;
  let fixture: ComponentFixture<DialogTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogTaskComponent]
    });
    fixture = TestBed.createComponent(DialogTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
