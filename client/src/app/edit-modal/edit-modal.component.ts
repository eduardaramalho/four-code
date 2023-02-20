import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  title : string = '';
  descricaoEditada : string = '';
  
  constructor(private httpService : HttpService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.title = 'Adicionar grupo';
    if (this.data){
      this.title = 'Editar grupo';      
      this.descricaoEditada = this.data.descricao
    } 
  }

  public async change(){
    if (this.data){
      await this.httpService.put('grupo', {descricao : this.descricaoEditada, id : this.data.id});
    } else {
      await this.httpService.post('grupo', {descricao : this.descricaoEditada});
    }
  }

  public cancel(){
    this.dialog.closeAll();
  }
}
