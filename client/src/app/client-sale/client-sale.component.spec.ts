import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSaleComponent } from './client-sale.component';

describe('ClientSaleComponent', () => {
  let component: ClientSaleComponent;
  let fixture: ComponentFixture<ClientSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
