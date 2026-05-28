import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CannyEdge } from './canny-edge';

describe('CannyEdge', () => {
  let component: CannyEdge;
  let fixture: ComponentFixture<CannyEdge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CannyEdge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CannyEdge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
