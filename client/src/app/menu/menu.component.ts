import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObserverService } from 'src/services/observer.service';
import { MenuItens } from '../menu-itens';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  opened = true;
  subscription : any = null;
  menu : Array<any> = [];

  constructor(private observer : ObserverService, private router : Router) { 
    this.menu = MenuItens;
  }

  ngOnInit(): void {
    this.subscription = this.observer.subscribe('menu-toggle', (data : any) => {
      this.opened = !this.opened;
    });
  }

  ngOnDestroy(): void {
    this.observer.unsubscribe(this.subscription);
  }
}
