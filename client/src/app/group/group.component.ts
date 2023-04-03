import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog} from '@angular/material/dialog';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { QuestionService } from 'src/services/question.service';
import { ObjectUtils } from '../../utils/ObjectUtils';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  grupos     : Array<any> =[]; 
  originalList : Array<any> =[]; 
  filterTerm : string = '';

  constructor(private httpService : HttpService, public dialog: MatDialog, private question: QuestionService) { }

  ngOnInit(): void {
    this.list()
  }

  public async list(){    
      this.grupos = await this.httpService.get('grupo');
      ObjectUtils.copyArray(this.grupos, this.originalList);
  }

  public filterInput(){
    ObjectUtils.filterArray(this.grupos, this.originalList, this.filterTerm, 'descricao');
  }

  public openModal(){
    const dialog = this.dialog.open(EditModalComponent, {
      width: '450px'
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public openModalEdit(grupo : any){
    const dialog = this.dialog.open(EditModalComponent, {
      width: '450px',
      data : grupo
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

   public async deleteGrupo(id : number){
    this.question.ask(async () => {
      await this.httpService.patch('grupo', {id});
      this.list();    
    }) 
  }    
}
