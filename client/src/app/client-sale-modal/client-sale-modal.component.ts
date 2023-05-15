import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-client-sale-modal',
  templateUrl: './client-sale-modal.component.html',
  styleUrls: ['./client-sale-modal.component.scss']
})
export class ClientSaleModalComponent implements OnInit {
  title : string = 'Adicionar Promoção';
  meses : string = '';
  porcentagem : string = '';

  constructor(private httpService : HttpService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if(this.data){
      this.title == 'Editar Promoção';
      this.meses = this.data.meses;
      this.porcentagem = this.data.porcentagem;
    }
  }

  public async change(){
    if (this.data){
      await this.httpService.put('sale', {meses : this.meses, porcentagem : this.porcentagem, id : this.data.id});
    } else {
      await this.httpService.post('sale', {meses : this.meses, porcentagem : this.porcentagem});
    }
  }

}
