import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

interface ArrayUF{
  value: string;
  estado: string;
}

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.scss']
})
export class ClientModalComponent implements OnInit {
  ufs: ArrayUF[] = [
    {value: 'AC',   estado: 'AC'},
    {value: 'AL',   estado: 'AL'},
    {value: 'AP',   estado: 'AP'},
    {value: 'AM',   estado: 'AM'},
    {value: 'BA',   estado: 'BA'},
    {value: 'CE',   estado: 'CE'},
    {value: 'DF',   estado: 'DF'},
    {value: 'ES',   estado: 'ES'},
    {value: 'GO',   estado: 'GO'},
    {value: 'MA',   estado: 'MA'},
    {value: 'MT',   estado: 'MT'},
    {value: 'MS',   estado: 'MS'},
    {value: 'MG',   estado: 'MG'},
    {value: 'PA',   estado: 'PA'},
    {value: 'PB',   estado: 'PB'},
    {value: 'PR',   estado: 'PR'},
    {value: 'PE',   estado: 'PE'},
    {value: 'PI',   estado: 'PI'},
    {value: 'RJ',   estado: 'RJ'},
    {value: 'RN',   estado: 'RN'},
    {value: 'RS',   estado: 'RS'},
    {value: 'RO',   estado: 'RO'},
    {value: 'RR',   estado: 'RR'},
    {value: 'SC',   estado: 'SC'},
    {value: 'SP',   estado: 'SP'},
    {value: 'SE',   estado: 'SE'},
    {value: 'TO',   estado: 'TO'}
  ];

  title          : string = '';

  nomeFantasia   : string = '';
  razaoSocial    : string = '';
  CNPJ           : string = '';
  clienteDesde   : string = '';

  cep            : string = '';
  rua            : string = '';
  numero         : string = '';
  complemento    : string = '';
  bairro         : string = '';
  cidade         : string = '';
  estado         : string = '';
  fkCliente      : string = '';



  enderecos : Array<any> = [];
  clientes : Array<any> = [];
  estados : Array<any> = [];

  constructor(private httpService : HttpService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit() {
    this.clientes = await this.httpService.get('cliente');
    this.estados = await this.httpService.get('uf');
  }


  public async add() {
    console.log({ nomeFantasia: this.nomeFantasia,  razaoSocial: this.razaoSocial, 
    CNPJ: this.CNPJ, clienteDesde: this.clienteDesde });

    this.clientes = await this.httpService.post('cliente', {
      nomeFantasia: this.nomeFantasia,
      razaoSocial: this.razaoSocial, 
      CNPJ: this.CNPJ, 
      clienteDesde: this.clienteDesde,
      addresses : this.enderecos
    }
  )
  
}

  public async addAddress(){
    this.enderecos.push({
      'cep' : this.cep, 
      'rua' : this.rua, 
      'numero' : this.numero,
      'bairro' : this.bairro,
      'cidade' : this.cidade,
      'uf' : this.estado,
      'complemento' : this.complemento
    })
  console.log( this.enderecos)
 }


}
