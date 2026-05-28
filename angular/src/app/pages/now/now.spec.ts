import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Now } from './now';

describe('Now', () => {
  let component: Now;
  let fixture: ComponentFixture<Now>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Now],
    }).compileComponents();

    fixture = TestBed.createComponent(Now);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
