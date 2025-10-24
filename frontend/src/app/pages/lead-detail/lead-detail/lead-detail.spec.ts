import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadDetail } from './lead-detail';

describe('LeadDetail', () => {
  let component: LeadDetail;
  let fixture: ComponentFixture<LeadDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeadDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
