import { Component, Inject, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';

@Component({
  selector: 'app-charge-modal',
  templateUrl: './charge-modal.component.html',
  styleUrls: ['./charge-modal.component.scss']
})
export class ChargeModalComponent implements OnInit {
  title    : string = 'Adicionar frete';
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
    if(this.data){
      this.title = 'Editar frete';
      this.total = this.data.valorTotal 
      this.valor = this.data.valor      
      this.fkProduto = this.data.fkProduto  
      this.desconto = this.data.desconto   
    }
    this.somarTotal();
    
  }

  public somarTotal(){
    this.total = this.valor - ((this.valor * this.desconto)/100);
    console.log(this.total);
 }

  public async add(){
    console.log({valorTotal: this.total,
      valor: this.valor,
      fkProduto: this.fkProduto,
      desconto: this.desconto})


   if(this.data){
    await this.httpService.put('frete', {
      valorTotal: this.total,
      valor: this.valor,
      desconto: this.desconto,
      id: this.data.id}); 
   } else {
     await this.httpService.post('frete', {
      valorTotal: this.total,
      valor: this.valor,
      desconto: this.desconto,
      fkProduto: this.fkProduto
    });    
   }
  }
}

