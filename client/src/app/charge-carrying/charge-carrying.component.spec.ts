import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeCarryingComponent } from './charge-carrying.component';

describe('ChargeCarryingComponent', () => {
  let component: ChargeCarryingComponent;
  let fixture: ComponentFixture<ChargeCarryingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeCarryingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeCarryingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
