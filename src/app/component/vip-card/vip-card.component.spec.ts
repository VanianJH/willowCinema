import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipCardComponent } from './vip-card.component';

describe('VipCardComponent', () => {
  let component: VipCardComponent;
  let fixture: ComponentFixture<VipCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VipCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
