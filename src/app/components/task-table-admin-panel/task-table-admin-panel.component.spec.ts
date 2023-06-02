import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTableAdminPanelComponent } from './task-table-admin-panel.component';

describe('TaskTableAdminPanelComponent', () => {
  let component: TaskTableAdminPanelComponent;
  let fixture: ComponentFixture<TaskTableAdminPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskTableAdminPanelComponent]
    });
    fixture = TestBed.createComponent(TaskTableAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
