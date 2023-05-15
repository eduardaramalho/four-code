import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-client-sales-modal',
  templateUrl: './client-sales-modal.component.html',
  styleUrls: ['./client-sales-modal.component.scss']
})
export class ClientSalesModalComponent implements OnInit {
  porcentagem : string = '';
  meses : string = ''; 
  title : string = '';

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
