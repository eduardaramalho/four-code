import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-subgroup-modal',
  templateUrl: './subgroup-modal.component.html',
  styleUrls: ['./subgroup-modal.component.scss']
})
export class SubgroupModalComponent implements OnInit {
  descricao : string = '';
  title : string = '';
  fkgrupo : string = '';
  grupos : Array<any> = [];

  constructor(private httpService : HttpService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit() {
    this.grupos = await this.httpService.get('grupo');
    this.title = 'Adicionar subgrupo';
    if (this.data){
      this.title = 'Editar subgrupo';      
      this.descricao = this.data.descricao
    } 
  }

  async add (){
    console.log({descricao : this.descricao});

    if(this.data){
      await this.httpService.put('subgrupo', {descricao : this.descricao, fkgrupo : this.fkgrupo, id: this.data.id});
    } else {
      await this.httpService.post('subgrupo', {descricao : this.descricao, fkgrupo : this.fkgrupo});

    }
  }

}

