import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import { ObjectUtils } from '../../utils/ObjectUtils';
import { QuestionService } from 'src/services/question.service';
import {MatDialog} from '@angular/material/dialog';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  produtos     : Array<any> =[]; 
  originalList : Array<any> =[]; 
  filterTerm : string = '';

  constructor(private httpService : HttpService, private question : QuestionService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.list();
  }

  public async list(){    
    this.produtos = await this.httpService.get('produto');
    ObjectUtils.copyArray(this.produtos, this.originalList);
  }

  public filterInput(){
    ObjectUtils.filterArray(this.produtos, this.originalList, this.filterTerm, 'descricao');
  }

  public async deleteProduto(id : number){
    await this.httpService.patch('produto', {id});
    this.list();    
  }  

  public openModal(){
    const dialog = this.dialog.open(ProductModalComponent, {
      width: '450px'
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public openModalEdit(colecao : any){
    const dialog = this.dialog.open(ProductModalComponent, {
      width: '450px',
      data : colecao
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }


}
