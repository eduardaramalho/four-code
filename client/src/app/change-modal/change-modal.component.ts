import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-modal',
  templateUrl: './change-modal.component.html',
  styleUrls: ['./change-modal.component.scss']
})
export class ChangeModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }


  cancelClick(){
    this.dialogRef.close();
  }

}
