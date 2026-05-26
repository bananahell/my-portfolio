import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceDetection } from './face-detection';

describe('FaceDetection', () => {
  let component: FaceDetection;
  let fixture: ComponentFixture<FaceDetection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaceDetection],
    }).compileComponents();

    fixture = TestBed.createComponent(FaceDetection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
