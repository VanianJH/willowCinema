import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSeatComponent } from './confirm-seat.component';

describe('ConfirmSeatComponent', () => {
  let component: ConfirmSeatComponent;
  let fixture: ComponentFixture<ConfirmSeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmSeatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
