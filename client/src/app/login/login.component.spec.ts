import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';



fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule, 
        HttpClientModule, 
        RouterTestingModule,
        FormsModule
      ],
      providers: [FormBuilder, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return is form is invalid', () => {
    const result = component.isValidForm();

    expect(result).toBe(false);
  });

  it('should return is form is valid', () => {
    component.form.controls['email'].setValue('eduarda@gmail.com');
    component.form.controls['password'].setValue('123456');

    const result = component.isValidForm();

    expect(result).toBe(true);
  });

  it('should turn button off when form is invalid', () => {
    const button = fixture.debugElement;

    expect(button.nativeElement.querySelector('.btn-login').disabled).toBe(
      true
    );
  });

  it('should turn button on when form is valid', () => {
    component.form.controls['email'].setValue('eduarda@gmail.com');
    component.form.controls['password'].setValue('123456');

    const button = fixture.debugElement;

    fixture.detectChanges();

    expect(button.nativeElement.querySelector('.btn-login').disabled).toBe(
      false
    );
  });
});
