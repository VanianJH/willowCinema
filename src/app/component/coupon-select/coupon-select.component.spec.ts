import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponSelectComponent } from './coupon-select.component';

describe('CouponSelectComponent', () => {
  let component: CouponSelectComponent;
  let fixture: ComponentFixture<CouponSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
