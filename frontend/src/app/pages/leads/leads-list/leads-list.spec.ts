import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsList } from './leads-list';

describe('LeadsList', () => {
  let component: LeadsList;
  let fixture: ComponentFixture<LeadsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeadsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
