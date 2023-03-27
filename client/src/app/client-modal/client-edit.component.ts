import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import { ObjectUtils } from 'src/utils/ObjectUtils';
import { AddressEditComponent } from '../address-modal/address-edit.component';
import { ChangeModalComponent } from '../change-modal/change-modal.component';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {

  customer     : any =  null;
  
  title        : string = 'Novo Cliente';
  originalList : Array<any> = [];
  filterTerm   : string = '';

  constructor(private httpService : HttpService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit() {    
    this.reset();
    this.loadData();
  }


  private reset(){
    this.customer = {
      nomeFantasia : '',
      cnpj         : '',
      razaoSocial  : '', 
      clienteDesde : '',
      address : []
    }
  }

  private async loadData(){
    if (!this.data){
      return;
    }

    this.title = 'Editar cliente';
    this.customer = await this.httpService.get('cliente/' + this.data);;
  }

  public async save(){
    const obj : any = {
      nomeFantasia : this.customer.nomeFantasia,
      cnpj         : this.customer.cnpj,
      razaoSocial  : this.customer.razaoSocial,
      clienteDesde : this.customer.clienteDesde,
      enderecos    : []
    }

    for (const addres of this.customer.address){
      obj.enderecos.push({
        cep         : addres.cep,
        rua         : addres.rua,
        numero      : addres.numero,
        complemento : addres.complemento,
        bairro      : addres.bairro,
        logradouro  : addres.logradouro,
        uf          : addres.uf
      })
    }

    if (this.data){
      obj.id = this.data;
      await this.httpService.post('cliente', obj);
    }

    if (!this.data){
      await this.httpService.put('cliente', obj);      
    }
  }

  public filterInput(){
    ObjectUtils.filterArray(this.customer.address, this.originalList, this.filterTerm, 'rua');
  }

  public openModal(){
    const dialog = this.dialog.open(AddressEditComponent, {
      width: '450px'
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.customer.address.push(result);
    })
  }

  public editModal(end : any){
    const dialog = this.dialog.open(AddressEditComponent, {
      width: '450px',
      data: end
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.customer.address.push(result);
    })
  }

 /* public async changeAddress(){
    this.clientes =  await this.httpService.put('cliente',
     {nomeFantasia : this.nomeFantasia, 
      razaoSocial:  this.razaoSocial,
      CNPJ : this.CNPJ,
      clienteDesde : this.clienteDesde, 
      id : this.data.id,
      addresses : this.newAddress  });

    this.dialog.open(ChangeModalComponent, {
      width: '450px'
    });

  }*/

  public cancel(){
    this.dialog.closeAll();
  }


}
