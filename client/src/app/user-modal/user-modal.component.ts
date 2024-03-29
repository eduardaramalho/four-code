import { Component, Inject, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { ChangeModalComponent } from '../change-modal/change-modal.component';
import { QuestionService } from 'src/services/question.service';

interface ArrayPermissoes{
  value: string;
  permissao: string;
}

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  permissoes : ArrayPermissoes[] = [
    {value: 'SuperAdmin',   permissao: 'SuperAdmin'},
    {value: 'Admin',        permissao: 'Admin'},
    {value: 'Comercial',    permissao: 'Comercial'},
    {value: 'Cliente',      permissao: 'Cliente'}
  ];

  name      : string = '';
  username  : string = '';
  password  : string = '';
  cpassword : string = '';
  title     : string = '';
  cPassword : string = ''; 
  permissao : string = '';
  isLogin   : boolean = false;
  hide      : boolean = true;

  constructor(private httpService : HttpService, public dialog: MatDialog, private question : QuestionService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.title = 'Adicionar usuário';
    if(this.data){
      this.title = 'Editar usuário'
      this.name = this.data.name;
      this.username = this.data.username;
    }
  }

  async add (){
    if(this.data){
      this.question.ask(async () => {
        await this.httpService.put('user', {name : this.name, username : this.username, password : this.password,
          id : this.data.id, permissao: this.permissao});   

          const dialog = this.dialog.open(ChangeModalComponent, {
            width: '450px'
          });
      
          dialog.afterClosed().subscribe((result : any) => {
          })
        
      }) 
    } else {
      await this.httpService.post('user', {name : this.name, username : this.username, password : this.password, cpassword : this.cpassword, permissao: this.permissao});
    }
  }

}
