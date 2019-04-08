import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillupComponent } from './fillup.component';

describe('FillupComponent', () => {
  let component: FillupComponent;
  let fixture: ComponentFixture<FillupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
