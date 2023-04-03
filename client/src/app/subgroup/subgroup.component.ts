import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog} from '@angular/material/dialog';
import { ObjectUtils } from '../../utils/ObjectUtils';
import { SubgroupModalComponent } from '../subgroup-modal/subgroup-modal.component';
import { QuestionService } from 'src/services/question.service';
import { PromiseService } from 'src/services/promise.service';

@Component({
  selector: 'app-subgroup',
  templateUrl: './subgroup.component.html',
  styleUrls: ['./subgroup.component.scss']
})
export class SubgroupComponent implements OnInit {
  subgrupo     : Array<any> =[]; 
  originalList : Array<any> =[]; 
  filterTerm : string = '';
  
  constructor(private httpService : HttpService, public dialog: MatDialog, public question : QuestionService, private promise : PromiseService) { }

  ngOnInit(): void {
    this.list();
  }

  public async list(){    
    this.subgrupo = await this.promise.execute(this.httpService.get('subgrupo'), false);
    ObjectUtils.copyArray(this.subgrupo, this.originalList);
  }

  public filterInput(){
    ObjectUtils.filterArray(this.subgrupo, this.originalList, this.filterTerm, 'descricao');
  }

  public openModal(){
    const dialog = this.dialog.open(SubgroupModalComponent, {
      width: '450px'
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public openModalEdit(subgroup : any){
    const dialog = this.dialog.open(SubgroupModalComponent, {
      width: '450px',
      data : subgroup
    });
    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public async deleteSubgrupo(id : number){
    this.question.ask(async () => {
      await this.httpService.patch('subgrupo', {id});
      this.list();    
    })
  }

}
