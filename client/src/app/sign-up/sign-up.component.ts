import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  constructor(private httpService: HttpService, public dialog: MatDialog, private router : Router, private HttpClient : HttpClient) { }

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
       this.login();
  }

  public login(){
    this.HttpClient.post('http://localhost:3003/logon', {username : this.username, password : this.password}).toPromise().then((response : any)=> {
      if(response.token){
        this.isLogin = true;
        window.localStorage.setItem('token', response.token);
        
        this.router.navigateByUrl('');
        console.log("Logado");
      }
    })
}
}