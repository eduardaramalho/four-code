import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import { ObjectUtils } from '../../utils/ObjectUtils';
import { QuestionService } from 'src/services/question.service';
import {MatDialog} from '@angular/material/dialog';
import { CollectionModalComponent } from '../collection-modal/collection-modal.component';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  colecoes     : Array<any> =[]; 
  originalList : Array<any> =[]; 
  filterTerm : string = '';

  constructor(private httpService : HttpService, private question : QuestionService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.list();
  }

  public async list(){    
    this.colecoes = await this.httpService.get('colecao');
    ObjectUtils.copyArray(this.colecoes, this.originalList);
  }

  public filterInput(){
    ObjectUtils.filterArray(this.colecoes, this.originalList, this.filterTerm, 'descricao');
  }

  public async deleteColecao(id : number){
    this.question.ask(async () => {
      await this.httpService.patch('colecao', {id});
      this.list();    
    }) 
  }  
  
  public openModal(){
    const dialog = this.dialog.open(CollectionModalComponent, {
      width: '450px'
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public openModalEdit(colecao : any){
    const dialog = this.dialog.open(CollectionModalComponent, {
      width: '450px',
      data : colecao
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }


}
