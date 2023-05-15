import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSaleModalComponent } from './client-sale-modal.component';

describe('ClientSaleModalComponent', () => {
  let component: ClientSaleModalComponent;
  let fixture: ComponentFixture<ClientSaleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSaleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSaleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
