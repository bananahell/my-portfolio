import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrayscaleDemo } from './grayscale-demo';

describe('GrayscaleDemo', () => {
  let component: GrayscaleDemo;
  let fixture: ComponentFixture<GrayscaleDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrayscaleDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(GrayscaleDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
