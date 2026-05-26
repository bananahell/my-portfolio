import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdlBreakout } from './sdl-breakout';

describe('SdlBreakout', () => {
  let component: SdlBreakout;
  let fixture: ComponentFixture<SdlBreakout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdlBreakout],
    }).compileComponents();

    fixture = TestBed.createComponent(SdlBreakout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
