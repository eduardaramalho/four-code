import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-charge-modal',
  templateUrl: './charge-modal.component.html',
  styleUrls: ['./charge-modal.component.scss']
})
export class ChargeModalComponent implements OnInit {
  title    : string = '';
  valor    : number = 0;
  desconto : number = 0;
  fkProduto  : string = '';
  fkEndereco : string = '';
  total    : any = '';
  
  enderecos: Array<any> = [];
  produtos : Array<any> = [];
  colecoes : Array<any> = [];

  constructor(private httpService : HttpService, public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit() {
    this.produtos = await this.httpService.get('produto'); 
    this.title = 'Adicionar frete';
    if(this.data){
      this.title = 'Editar frete';
      this.valor = this.data.valor;
      this.desconto = this.data.desconto;
    }
    this.somarTotal();
    
  }

  public somarTotal(){
    this.total = this.valor - ((this.valor * this.desconto)/100);
    console.log(this.total);
 }

  public async add(){
    console.log(this.data.id)
   if(this.data){
    await this.httpService.put('frete', {
      valorTotal: this.total,
      valor: this.valor,
      fkProduto: this.fkProduto,
      desconto: this.desconto,
      id : this.data.id
    }); 
   } else {
     await this.httpService.post('frete', {
      valorTotal: this.total,
      valor: this.valor,
      fkProduto: this.fkProduto,
      desconto: this.desconto
    });    
   }
  }
}

