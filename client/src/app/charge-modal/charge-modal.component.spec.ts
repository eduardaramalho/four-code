import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeModalComponent } from './charge-modal.component';

describe('ChargeModalComponent', () => {
  let component: ChargeModalComponent;
  let fixture: ComponentFixture<ChargeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
