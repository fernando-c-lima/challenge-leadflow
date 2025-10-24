import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadTasks } from './lead-tasks';

describe('LeadTasks', () => {
  let component: LeadTasks;
  let fixture: ComponentFixture<LeadTasks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeadTasks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadTasks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
