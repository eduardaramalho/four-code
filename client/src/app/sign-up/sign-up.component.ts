import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
// import { QuestionService } from 'src/services/question.service';
import { MatDialog } from '@angular/material/dialog';
// import { LoginComponent } from '../login/login.component';

interface ArrayPermissoes {
  value: string;
  permissao: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  permissoes: ArrayPermissoes[] = [
    { value: 'SuperAdmin', permissao: 'SuperAdmin' },
    { value: 'Admin', permissao: 'Admin' },
    { value: 'Comercial', permissao: 'Comercial' },
    { value: 'Cliente', permissao: 'Cliente' }
  ];

  name: string = '';
  username: string = '';
  password: string = '';
  cpassword: string = '';
  title: string = '';
  cPassword: string = '';
  permissao: string = '';
  isLogin: boolean = false;
  hide: boolean = true;

  constructor(private httpService: HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  async add() {
    await this.httpService.post('user', {
       name: this.name,
       username: this.username,
       password: this.password,
       cpassword: this.cpassword,
       permissao: 'Comercial' });
       console.log("Usuário adicionado ao BD");
  }
}
