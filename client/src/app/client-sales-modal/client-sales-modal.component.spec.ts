import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSalesModalComponent } from './client-sales-modal.component';

describe('ClientSalesModalComponent', () => {
  let component: ClientSalesModalComponent;
  let fixture: ComponentFixture<ClientSalesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSalesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSalesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
