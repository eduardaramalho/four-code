import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-collection-modal',
  templateUrl: './collection-modal.component.html',
  styleUrls: ['./collection-modal.component.scss']
})
export class CollectionModalComponent implements OnInit {
  descricao : string = '';
  title     : string = '';
  
  constructor(private httpService : HttpService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.title = 'Adicionar coleção';
    if (this.data){
      this.title = 'Editar coleção';      
      this.descricao = this.data.descricao
    } 
  }

  public async add(){
    console.log({descricao : this.descricao});
    if(this.data){
      await this.httpService.put('colecao', {descricao : this.descricao, id: this.data.id});
    } else {
      await this.httpService.post('colecao', {descricao : this.descricao});
    }
  }

}
