import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

interface ArrayUF{
  value: string;
  estado: string;
}

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.scss']
})
export class AddressEditComponent implements OnInit {
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

  cep          : string = '';
  rua          : string = '';
  numero       : string = '';
  bairro       : string = '';
  cidade       : string = '';
  complemento  : string = '';
  estado       : string = '';
  title        : string = 'Inserir endereço';

  newAddress     : Array<any> = [];


  constructor(private httpService : HttpService, @Inject(MAT_DIALOG_DATA) private data: any,  private dialogRef: MatDialogRef<AddressEditComponent>) { }

  async ngOnInit () {
    if(this.data){
      this.title = 'Editar endereço';
      this.cep = this.data.cep
      this.rua = this.data.rua
      this.numero = this.data.numero
      this.bairro = this.data.bairro
      this.cidade =  this.data.cidade
      this.estado =  this.data.estado
      this.complemento = this.data.complemento
    }
  
  }

  public async addAddress(){
    this.newAddress.push({
      'cep' : this.cep, 
      'rua' : this.rua, 
      'numero' : this.numero,
      'bairro' : this.bairro,
      'cidade' : this.cidade,
      'uf' : this.estado,
      'complemento' : this.complemento
    })
    console.log( this.newAddress)
 }

 public async save(){
  const obj = {
    cep         : this.cep,
    rua         : this.rua,
    numero      : this.numero,
    bairro      : this.bairro,
    cidade      : this.cidade,
    uf          : this.estado,
    complemento : this.complemento
  };

  console.log(obj)
  await this.httpService.put('cliente', obj);
  

  this.dialogRef.close(obj);
}

  public async changeAddress(){
    this.httpService.put('cliente',
    {
      nomeFantasia  : this.data.nomeFantasia, 
      razaoSocial   :  this.data.razaoSocial,
      CNPJ          : this.data.CNPJ,
      clienteDesde  : this.data.clienteDesde, 
      id            : this.data.id,
      addresses     : this.newAddress 
    });
  }
}
