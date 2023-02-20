import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeModalComponent } from 'src/app/change-modal/change-modal.component';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';

@Injectable({
 providedIn: 'root'
})
export class PromiseService{
 constructor(private dialog: MatDialog) {
 
 }

 public execute(promise : Promise<any>, showMsg = true, onSucess : any = null, onError : any = null) : Promise<any>{
    return new Promise((resolve, reject) => {
      //  Bloquear a tela
      promise.then(response => {
        if (showMsg){
          const dialog = this.dialog.open(ChangeModalComponent, {
            width: '400px'
          });
      
          dialog.afterClosed().subscribe((result : any) => {
            if (onSucess){
              onSucess(response);
            }

            resolve(response);
          })
        }

        if (!showMsg){
          if(onSucess){
            onSucess(response)              
        }
            resolve(response);
          }
      }).catch(error => {     
           const dialog = this.dialog.open(ErrorModalComponent, {
            width: '400px'
          });
      
          dialog.afterClosed().subscribe((result : any) => {
            if (onSucess){
              onSucess(error);
            }

            resolve(error);
          })

          if(onError){
            onError(error);
          }        
      })
    })
 }
}