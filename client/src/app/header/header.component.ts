import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObserverService } from 'src/services/observer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private observerService  : ObserverService, private router : Router) { }

  ngOnInit(): void {
  }

  toogle(){
    this.observerService.publish('menu-toggle');
  }

  logout(){
    this.router.navigate(['/login'])
  }

}
