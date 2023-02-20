import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-product-sale-modal',
  templateUrl: './product-sale-modal.component.html',
  styleUrls: ['./product-sale-modal.component.scss']
})
export class ProductSaleModalComponent implements OnInit {


  produtos      : Array<any> = [];


  title         : string = '';
  fkproduto     : string = '';

  quantidade    : any = '';
  valorUnitario : any = '';
  desconto      : any = '0'; 
  acrescimo     : any = '0';
  total         : any = '';


  constructor(private httpService : HttpService,  public dialogRef: MatDialogRef<ProductSaleModalComponent>, @Inject(MAT_DIALOG_DATA)
     public data: any) { }

  async ngOnInit() {
    this.title = "Adicionar produto";

     if(this.data){
      this.title = "Editar Produto";
      this.fkproduto      = this.data.fkproduto,
      this.quantidade     = this.data.quantidade;
      this.valorUnitario  = this.data.valorUnitario;
      this.desconto       = this.data.desconto;
      this.acrescimo      = this.data.acrescimo;
      this.total          = this.data.total;
    }

    this.produtos = await this.httpService.get('produto');
    this.somarTotal();

  }

  public somarTotal(){
    const soma = (this.valorUnitario * this.quantidade);
    this.total = soma - ((soma * this.desconto)/100) + ((soma * this.acrescimo)/100);
  }

  public add(){
    const obj = {
      produto_descricao : this.produtos.find(element => element.id == this.fkproduto).descricao,
      fkproduto      : this.fkproduto,
      quantidade     : this.quantidade,
      valorUnitario  : this.valorUnitario,
      desconto       : this.desconto,
      acrescimo      : this.acrescimo,
      total          : this.total
    }

    
    this.dialogRef.close(obj);
  }
  
  public cancel(){
    this.dialogRef.close();
  }

}

