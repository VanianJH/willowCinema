import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantTestComponent } from './instant-test.component';

describe('InstantTestComponent', () => {
  let component: InstantTestComponent;
  let fixture: ComponentFixture<InstantTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstantTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
