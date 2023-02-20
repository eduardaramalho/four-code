import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { ProductSaleModalComponent } from '../product-sale-modal/product-sale-modal.component';
import * as moment from 'moment';
import { ObjectUtils } from 'src/utils/ObjectUtils';

@Component({
  selector: 'app-sale-modal',
  templateUrl: './sale-modal.component.html',
  styleUrls: ['./sale-modal.component.scss']
})
export class SaleModalComponent implements OnInit {
   title        : string = 'Pedido de venda';

   clientes     : Array<any> = []; 
   enderecos    : Array<any> = [];
   originalList : Array<any> = [];

   pedido       : any =  null;

  constructor(private httpService : HttpService, 
              public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) 
              public data: any) { }

 async ngOnInit() {
    this.reset();
    this.loadData();

    setTimeout(async () => {
      this.clientes = await this.httpService.get('cliente');  
    }, 300);
    

    setTimeout(async () => {
      this.enderecos = await this.httpService.get('enderecos');  
    }, 500);
    
   
  }

  private reset(){
    this.pedido = {
      dataEmissao : '',
      dataEntrega : '',
      fkcliente   : '',
      fkendereco  : '' ,
      produtos    : [] 
    }
  }

  public async loadData(){
    if(!this.data){
      return;
    }

    this.title = 'Editar pedido';
    this.pedido = await this.httpService.get('pedido/' + this.data);
    this.pedido.dataEmissao = ObjectUtils.dateToInput(this.pedido.dataEmissao);
    this.pedido.dataEntrega = ObjectUtils.dateToInput(this.pedido.dataEntrega);    
  }


  public async add(){
    const obj : any = {
      dataEmissao  : moment(this.pedido.dataEmissao).format('DD/MM/YYYY'), 
      dataEntrega  : moment(this.pedido.dataEntrega).format('DD/MM/YYYY'),
      fkcliente    : this.pedido.fkcliente,
      fkendereco   : this.pedido.fkendereco,
      produtos     : []
     }

     for(const produto of this.pedido.produtos){
      obj.produtos.push({
        fkproduto      : produto.fkproduto,
        quantidade     : produto.quantidade,
        valorUnitario  : produto.valorUnitario,
        desconto       : produto.desconto,
        acrescimo      : produto.acrescimo,
        total          : produto.total
      })
     }

    if(this.data){
      await this.httpService.put('pedido/' + this.data, obj);
    } 

    if(!this.data){
      await this.httpService.post('pedido', obj);
    }
    
  }
  
  public modalProduto(pedido : any = undefined){
    const dialog = this.dialog.open(ProductSaleModalComponent, {
      data : pedido 
    });

    dialog.afterClosed().subscribe((result : any) => {
      if(!result){
        return;
      }
      
      this.pedido.produtos.push(result);
      this.calc();
    })
  }

  public deleteItem(item : any){
    const index = this.pedido.produtos.indexOf(item);

    if(index <0){
      return;
    }

    this.pedido.produtos.splice(index, 1);
    this.calc();
  }

  private calc(){
    this.pedido.total = this.pedido.produtos.reduce((acumulator : any, value : any) => {
      return acumulator + (value.total * 1);
    }, 0)
  }

  // openModalEdit(data : any){
  //   const dialog = this.dialog.open(ProductSaleModalComponent, {
  //     width: '450px',
  //     data : data
  //   });

  //   dialog.afterClosed().subscribe((result : any) => {
      
  //   })
  // }


}
