import { Component, OnInit } from '@angular/core';
import { ObserverService } from 'src/services/observer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private observerService  : ObserverService) { }

  ngOnInit(): void {
  }

  toogle(){
    this.observerService.publish('menu-toggle');
  }

}
