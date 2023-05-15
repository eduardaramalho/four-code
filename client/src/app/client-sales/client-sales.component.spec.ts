import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSalesComponent } from './client-sales.component';

describe('ClientSalesComponent', () => {
  let component: ClientSalesComponent;
  let fixture: ComponentFixture<ClientSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
