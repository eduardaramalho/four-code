import { Component, Inject, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {
  descricao : string = '';
  precoVenda : string = '';
  grupoId : string = '';
  subgrupoId : string = '';
  colecaoId : string = '';
  title : string = '';

  grupos : Array<any> = [];
  subgrupos : Array<any> = [];
  colecoes : Array<any> = [];

  constructor(private httpService : HttpService, public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit() {
    this.grupos = await this.httpService.get('grupo');
    this.subgrupos = await this.httpService.get('subgrupo');
    this.colecoes = await this.httpService.get('colecao');
    if(this.data){
      this.descricao = this.data.descricao;
      this.precoVenda = this.data.precoVenda;
      this.grupoId = this.data.fkgrupo;
      this.subgrupoId = this.data.fksubGrupo;
      this.colecaoId = this.data.fkColecao;
    }
    this.title = 'Adicionar produto';
    if(this.data){
      this.title = 'Editar produto'
    }
  }

  public async add(){
    console.log({descricao : this.descricao, precoVenda:  this.precoVenda, fkgrupo : this.grupoId, fksubGrupo : this.subgrupoId, fkColecao : this.colecaoId, id: this.data.id})
   if(this.data){
    await this.httpService.put('produto', {descricao : this.descricao, precoVenda:  this.precoVenda, fkgrupo : this.grupoId, fksubGrupo : this.subgrupoId, fkColecao : this.colecaoId, id : this.data.id});
   } else {
    await this.httpService.post('produto', {descricao : this.descricao, precoVenda:  this.precoVenda, fkgrupo : this.grupoId, fksubGrupo : this.subgrupoId, fkColecao : this.colecaoId});    
   }
  }
}
