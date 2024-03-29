import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import { QuestionService } from 'src/services/question.service';
import { ObjectUtils } from 'src/utils/ObjectUtils';
import { AddressModalComponent } from '../address-modal/address-modal.component';
import { ClientEditComponent } from '../client-edit/client-edit.component';
import { ClientModalComponent } from '../client-modal/client-modal.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clientes : Array<any> = [];
  originalList : Array<any> = [];
  filterTerm : string = '';

  constructor(private httpService : HttpService, public dialog : MatDialog, private question: QuestionService) { }

  ngOnInit(): void {
    this.list();
  }

  public async list(){    
    this.clientes = await this.httpService.get('cliente');
    ObjectUtils.copyArray(this.clientes, this.originalList);
  }

  public filterInput(){
    ObjectUtils.filterArray(this.clientes, this.originalList, this.filterTerm, 'razaoSocial');
  }

  public async deleteCliente(id : number){
    this.question.ask(async () => {
      await this.httpService.patch('cliente', {id});
      this.list();    
    }) 
  }  

  public openModal(){
    const dialog = this.dialog.open(ClientModalComponent, {
      width: '650px',
      height : '470px'
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public openModalEdit(cliente : any){
    const dialog = this.dialog.open(ClientEditComponent, {

      width: '60%',
      height: '75%',

      data : cliente.id
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public openModalEndereco(colecao : any){
    const dialog = this.dialog.open(AddressModalComponent, {
      width: '730px',
      data : colecao
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

}
