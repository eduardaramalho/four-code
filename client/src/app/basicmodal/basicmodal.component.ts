import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-basicmodal',
  templateUrl: './basicmodal.component.html',
  styleUrls: ['./basicmodal.component.scss']
})
export class BasicmodalComponent implements OnInit {

  @Input() title : string = '';
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @Output() blur = new EventEmitter<any>();
  @Input() closeOnSave : boolean = true;

  constructor(public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }

  saveClick(){
    this.save.emit();
    if(this.closeOnSave){
      this.dialogRef.close();
    }
    
  }

  cancelClick(){
    this.cancel.emit();
    this.dialogRef.close();
  }

}
