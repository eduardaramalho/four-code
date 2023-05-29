import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { STATUS_CODES } from 'http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username : string = 'usuario';
  password : string = 'usuario';
  hide : boolean = true;
  isLogin : boolean = false;
  noToken : boolean = false;
  

  constructor(private router : Router, private HttpClient : HttpClient) { }

  ngOnInit(): void { 
    setTimeout(() => {
      this.login();
    })
  }

  public login(){
    this.HttpClient.post('http://localhost:3003/logon', {
      username : this.username, password : this.password
    }).toPromise().then((response : any) => {
      if(response.token){
        this.isLogin = true;
        window.localStorage.setItem('token', response.token);
        window.localStorage.setItem('permissao', response.user.permissao);
        this.router.navigateByUrl('');
        console.log("logado");
        console.log(response.user.permissao);
      } 
    })
  }

  //response = token

  
}
