import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionComponent } from 'src/app/question/question.component';

@Injectable({
  providedIn: 'root'
})
export class QuestionService{

  constructor(public dialog : MatDialog) {
  
  }

  public ask(yesCallback : any, noCallback : any = null){
    const dialog = this.dialog.open(QuestionComponent, {
         width: '30rem',
         height: '10rem'
       })
   
       dialog.afterClosed().subscribe(async (result) => {
        
         if (!result && noCallback){
           noCallback();
         }
   
         if (result && yesCallback){
              yesCallback();
         }
       })      
}
}
