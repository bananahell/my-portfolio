import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCVDemo } from './opencv-demo';

describe('OpenCVDemo', () => {
  let component: OpenCVDemo;
  let fixture: ComponentFixture<OpenCVDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenCVDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(OpenCVDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
