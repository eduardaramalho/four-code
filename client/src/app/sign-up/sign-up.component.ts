import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { error } from 'console';

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
    { value: 'SuperAdmin', permissao: '1' },
    { value: 'Admin', permissao: '2' },
    { value: 'Comercial', permissao: '3' },
    { value: 'Cliente', permissao: '4' }
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
       permissao: '4' 
      });
       console.log("Usuário adicionado");
      this.router.navigate(['/login']);
  }
}