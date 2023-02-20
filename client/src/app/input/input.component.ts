import { Component, OnInit, Input, forwardRef, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef( () => InputComponent),
    multi: true
    }]
})
export class InputComponent implements OnInit {

  @Input() label : string = '';
  @Input() max : number = -1;
  @Input() min : number = -1;  
  @Input() required : boolean = false;
  @Input() type     : string = 'text';
  @Input() disabled : boolean = false;
  @Input() readonly : boolean = false;

  private _value = '';

  public get value() : string{
      return this._value;
  }
  public set value(v : string){
      if(v != this._value){
          this._value = v;
          this.onChange(v);
          this.onTouched();
      }
  }

  constructor() { }

  onChange = (_ : any) => { };
  onTouched = () => { };

  writeValue(value: any): void {
    this._value = value;
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    if (this.required){
      this.label = this.label;
    }
  }

}
