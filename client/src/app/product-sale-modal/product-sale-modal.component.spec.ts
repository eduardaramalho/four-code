import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSaleModalComponent } from './product-sale-modal.component';

describe('ProductSaleModalComponent', () => {
  let component: ProductSaleModalComponent;
  let fixture: ComponentFixture<ProductSaleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSaleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSaleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
