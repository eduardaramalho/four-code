import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleModalComponent } from './sale-modal.component';

describe('SaleModalComponent', () => {
  let component: SaleModalComponent;
  let fixture: ComponentFixture<SaleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
