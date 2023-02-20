import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<QuestionComponent>) { }

  ngOnInit(): void {
  }

  yesClick(){
    this.dialogRef.close(true);
  }

  noClick(){
    this.dialogRef.close(false);
  }

}
